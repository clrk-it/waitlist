"use client";

import React, { FormEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ChevronDown, ChevronUp } from "lucide-react";
import { useInterestForm } from "@/hooks/use-interest-form";
import { UserTypeSelector } from "./user-type-selector";
import { EmailField } from "./email-field";
import { ClubField } from "./club-field";
import { VentureFields } from "./venture-fields";
import { InterestField } from "./interest-field";
import { AdditionalQuestionsField } from "./additional-questions-field";
import { FormActions } from "./form-actions";
import { GlassCard } from "@/components/ui/glass-card";
import { MivroLogo } from "@/components/ui/mivro-logo";

export function InterestForm() {
  const {
    formData,
    errors,
    emailWarning,
    loading,
    error,
    updateField,
    setUserType,
    toggleVentureCategory,
    submitForm,
  } = useInterestForm();

  const [useOtherClub, setUseOtherClub] = useState(false);
  const [otherClub, setOtherClub] = useState("");
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [scrollHints, setScrollHints] = useState({ up: false, down: false });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await submitForm();
  };

  const handleClubChange = (club: string) => {
    updateField("club", club);
  };

  const handleOtherClubChange = (value: string) => {
    setOtherClub(value);
    updateField("club", value);
  };

  const handleToggleOther = (useOther: boolean) => {
    setUseOtherClub(useOther);
    if (!useOther) {
      setOtherClub("");
      updateField("club", "");
    }
  };

  const isVentureOwner = formData.userType === "venture_owner";

  const updateScrollHints = () => {
    const el = scrollRef.current;
    if (!el) return;

    const thresholdPx = 8;
    const canScroll = el.scrollHeight - el.clientHeight > thresholdPx;
    if (!canScroll) {
      setScrollHints((prev) => (prev.up || prev.down ? { up: false, down: false } : prev));
      return;
    }

    const up = el.scrollTop > thresholdPx;
    const down = el.scrollTop + el.clientHeight < el.scrollHeight - thresholdPx;
    setScrollHints((prev) => (prev.up === up && prev.down === down ? prev : { up, down }));
  };

  useEffect(() => {
    if (!isVentureOwner) return;
    updateScrollHints();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isVentureOwner,
    formData.userType,
    formData.email,
    formData.club,
    formData.ventureName,
    formData.ventureCategories,
    formData.interest,
    formData.additionalQuestions,
    useOtherClub,
    otherClub,
    errors,
    emailWarning,
  ]);

  useEffect(() => {
    if (!isVentureOwner) return;
    const el = scrollRef.current;
    if (!el) return;

    const onScrollOrResize = () => updateScrollHints();
    el.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);

    // Initial calculation after layout.
    requestAnimationFrame(updateScrollHints);

    return () => {
      el.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVentureOwner]);

  return (
    <GlassCard>
      <div className="relative">
        {isVentureOwner && scrollHints.up && (
          <div className="pointer-events-none absolute left-1/2 top-3 z-20 -translate-x-1/2 opacity-80 transition-opacity motion-safe:animate-pulse">
            <div className="rounded-full border border-white/10 bg-black/35 px-2 py-1 backdrop-blur">
              <ChevronUp className="h-4 w-4 text-white/80" aria-hidden="true" />
            </div>
          </div>
        )}

        {isVentureOwner && scrollHints.down && (
          <div className="pointer-events-none absolute left-1/2 bottom-3 z-20 -translate-x-1/2 opacity-80 transition-opacity motion-safe:animate-pulse">
            <div className="rounded-full border border-white/10 bg-black/35 px-2 py-1 backdrop-blur">
              <ChevronDown className="h-4 w-4 text-white/80" aria-hidden="true" />
            </div>
          </div>
        )}

        <div
          ref={scrollRef}
          className="max-h-[85dvh] overflow-y-auto no-scrollbar p-4 sm:p-8 md:p-10"
        >
          <div>
            {/* Back Link */}
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-4 sm:mb-6"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="text-xs sm:text-sm">Back to Home</span>
            </Link>

            <div className="flex justify-center mb-3 sm:mb-4">
              <MivroLogo className="text-2xl sm:text-4xl" />
            </div>

            {/* Subtext */}
            <p className="mb-4 sm:mb-8 text-center text-xs text-white/70 sm:text-base">
              Tell us how you&apos;d like to use Mivro and we&apos;ll be in touch soon!
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className={isVentureOwner ? "space-y-3 sm:space-y-5" : "space-y-4 sm:space-y-6"}
          >
            <UserTypeSelector
              value={formData.userType}
              onChange={setUserType}
              error={errors.userType}
              disabled={loading}
              compact={isVentureOwner}
            />

            <EmailField
              value={formData.email}
              onChange={(value) => updateField("email", value)}
              userType={formData.userType}
              error={errors.email}
              warning={emailWarning}
              disabled={loading}
              compact={isVentureOwner}
            />

            {formData.userType === "club_owner" && (
              <ClubField
                value={formData.club}
                useOther={useOtherClub}
                otherValue={otherClub}
                onChange={handleClubChange}
                onOtherChange={handleOtherClubChange}
                onToggleOther={handleToggleOther}
                error={errors.club}
                disabled={loading}
              />
            )}

            {formData.userType === "venture_owner" && (
              <VentureFields
                ventureName={formData.ventureName}
                categories={formData.ventureCategories}
                onNameChange={(value) => updateField("ventureName", value)}
                onCategoryToggle={toggleVentureCategory}
                nameError={errors.ventureName}
                categoriesError={errors.ventureCategories}
                disabled={loading}
                compact
              />
            )}

            <InterestField
              value={formData.interest}
              onChange={(value) => updateField("interest", value)}
              error={errors.interest}
              disabled={loading}
              rows={isVentureOwner ? 2 : 4}
              compact={isVentureOwner}
            />

            <AdditionalQuestionsField
              value={formData.additionalQuestions}
              onChange={(value) => updateField("additionalQuestions", value)}
              disabled={loading}
              rows={isVentureOwner ? 2 : 3}
              compact={isVentureOwner}
            />

            <FormActions loading={loading} error={error} onSubmit={submitForm} />
          </form>
        </div>
      </div>
    </GlassCard>
  );
}
