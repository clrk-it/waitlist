"use client";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Users, ArrowRight } from "lucide-react";
import Link from "next/link";

// Mock EarlyAccessCard component - replace with your actual component
const EarlyAccessCard = () => <div className="mb-6"></div>;

export function WaitlistCard() {
  const [waitListCount, setWaitListCount] = useState(0);
  const [initialLoading, setInitialLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    getNumberOfWaitList();
  }, []);

  const getNumberOfWaitList = async () => {
    try {
      const res = await fetch("/api/joinWaitList", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        const data = await res.json();
        setWaitListCount(data.item || 0);
      }
    } catch (err) {
      console.error("Failed to fetch waitlist count:", err);
    } finally {
      setInitialLoading(false);
    }
  };

  return (
    <div className="w-full rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-lg shadow-2xl sm:p-8 md:p-10 lg:p-12 select-none">
      <EarlyAccessCard />

      {/* Headline */}
      <h1 className="mb-3 text-center text-3xl font-bold tracking-tight text-foreground sm:text-2xl sm:mb-3 md:text-3xl lg:text-4xl font-manrope">
        Something{" "}
        <span className="font-black text-primary font-inter">Extraordinary</span>{" "}
        Is Coming Soon
      </h1>

      {/* Subtext */}
      <p className="mb-8 text-center text-sm text-muted-foreground sm:text-base sm:mb-8 md:text-lg font-manrope">
        Join the waitlist to get early access and exclusive drops from Mivro.
      </p>

      {/* CTA Button */}
      <div className="flex justify-center">
        <Link href="/form">
          <Button className="px-8 py-6 text-lg shadow-[0_0_16px_rgba(255,255,255,0.2)] hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-shadow">
            Express Your Interest
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </div>

      {/* Waitlist Counter - Only render after hydration */}
      {mounted && waitListCount > 0 && !initialLoading && (
        <div className="mt-8 flex items-center justify-center gap-2 text-muted-foreground">
          <Users className="h-4 w-4" />
          <span className="text-sm font-medium">
            <span className="text-primary font-bold">
              {waitListCount.toLocaleString()}+
            </span>{" "}
            people already joined
          </span>
        </div>
      )}
    </div>
  );
}
