"use client";

import React, { FormEvent, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useInterestForm } from "@/hooks/use-interest-form";
import { UserTypeSelector } from "./user-type-selector";
import { EmailField } from "./email-field";
import { ClubField } from "./club-field";
import { VentureFields } from "./venture-fields";
import { InterestField } from "./interest-field";
import { AdditionalQuestionsField } from "./additional-questions-field";
import { FormActions } from "./form-actions";
import { DecryptedText } from "@/components/ui/decrypted-text";

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

  return (
    <div className="w-full rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 md:p-10 shadow-lg">
      {/* Back Link */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        <span className="text-sm">Back to Home</span>
      </Link>

      {/* Headline with DecryptedText effect */}
      <h1 className="mb-3 text-center text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl font-display">
        <DecryptedText
          text="Join Mivro"
          speed={50}
          maxIterations={6}
          sequential={false}
          className="inline"
        />
      </h1>

      {/* Subtext */}
      <p className="mb-8 text-center text-sm text-gray-600 sm:text-base">
        Tell us how you'd like to use Mivro and we'll be in touch soon!
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <UserTypeSelector
          value={formData.userType}
          onChange={setUserType}
          error={errors.userType}
          disabled={loading}
        />

        <EmailField
          value={formData.email}
          onChange={(value) => updateField("email", value)}
          userType={formData.userType}
          error={errors.email}
          warning={emailWarning}
          disabled={loading}
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
          />
        )}

        <InterestField
          value={formData.interest}
          onChange={(value) => updateField("interest", value)}
          error={errors.interest}
          disabled={loading}
        />

        <AdditionalQuestionsField
          value={formData.additionalQuestions}
          onChange={(value) => updateField("additionalQuestions", value)}
          disabled={loading}
        />

        <FormActions loading={loading} error={error} onSubmit={submitForm} />
      </form>
    </div>
  );
}
