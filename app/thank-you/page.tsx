"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowLeft, Home } from "lucide-react";
import Link from "next/link";
import { BackgroundBeams } from "@/components/ui/background-beams";

export default function ThankYouPage() {
  return (
    <div className="relative flex min-h-screen flex-col bg-white">
      <BackgroundBeams />
      <main className="relative z-10 flex flex-1 items-center justify-center px-4 py-8 sm:px-6 sm:py-12 md:px-8">
        <div className="w-full max-w-lg">
          <div className="w-full rounded-2xl border border-gray-200 bg-white p-8 sm:p-10 text-center shadow-lg">
            {/* Success Icon */}
            <div className="mb-6 flex justify-center">
              <div
                className="flex h-16 w-16 items-center justify-center rounded-full"
                style={{ backgroundColor: "#fbbf24" }}
              >
                <CheckCircle2 className="h-8 w-8" style={{ color: "#09090b" }} />
              </div>
            </div>

            {/* Headline */}
            <h1 className="mb-4 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl font-display">
              Thank You!
            </h1>

            {/* Subtext */}
            <p className="mb-8 text-base text-gray-600 sm:text-lg">
              Your submission has been received successfully. We&apos;ll be in
              touch soon with more information about Mivro.
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
          </div>
        </div>
      </main>
    </div>
  );
}
