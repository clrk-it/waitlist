"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowLeft, Home } from "lucide-react";
import Link from "next/link";
import { MeshGradientBackground } from "@/components/mesh-gradient-background";
import { Navbar } from "@/components/navbar";

export default function ThankYouPage() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <MeshGradientBackground />
      <main className="flex flex-1 items-center justify-center px-4 py-8 sm:px-6 sm:py-12 md:px-8">
        <div className="w-full max-w-sm sm:max-w-md md:max-w-lg">
          <div className="w-full rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-lg shadow-2xl sm:p-8 md:p-10 text-center select-none">
            {/* Success Icon */}
            <div className="mb-6 flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20 ring-1 ring-green-500/30">
                <CheckCircle2 className="h-8 w-8 text-green-500" />
              </div>
            </div>

            {/* Headline */}
            <h1 className="mb-3 text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl font-manrope">
              Thank You!
            </h1>

            {/* Subtext */}
            <p className="mb-8 text-sm text-muted-foreground sm:text-base font-manrope">
              Your submission has been received successfully. We&apos;ll be in
              touch soon with more information about UTD Club Store.
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
