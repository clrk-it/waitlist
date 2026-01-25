"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowLeft, Home } from "lucide-react";
import Link from "next/link";
import { MarketingShell } from "@/components/layout/marketing-shell";
import { GlassCard } from "@/components/ui/glass-card";
import { MivroLogo } from "@/components/ui/mivro-logo";

export default function ThankYouPage() {
  return (
    <MarketingShell maxWidth="lg">
      <GlassCard contentClassName="p-8 sm:p-10 text-center">
        <div className="flex justify-center mb-4">
          <MivroLogo className="text-3xl sm:text-4xl" />
        </div>

        {/* Success Icon */}
        <div className="mb-6 flex justify-center">
          <div
            className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 border border-white/10"
            style={{ boxShadow: "0 0 20px -5px rgba(251, 191, 36, 0.25)" }}
          >
            <CheckCircle2 className="h-8 w-8 text-[#fbbf24]" />
          </div>
        </div>

        {/* Headline */}
        <h1 className="mb-3 text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl font-display">
          Thank You!
        </h1>

        {/* Subtext */}
        <p className="mb-8 text-base text-white/70 sm:text-lg">
          Your submission has been received successfully. We&apos;ll be in touch
          soon with more information about Mivro.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link href="/">
            <Button className="w-full sm:w-auto px-6">
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <Link href="/form">
            <Button variant="outline" className="w-full sm:w-auto px-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Submit Another
            </Button>
          </Link>
        </div>
      </GlassCard>
    </MarketingShell>
  );
}
