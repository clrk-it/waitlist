"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const BackgroundBeams = dynamic(
  () => import("./background-beams").then((m) => m.BackgroundBeams),
  { ssr: false },
);

type RequestIdleCallbackDeadline = {
  didTimeout: boolean;
  timeRemaining: () => number;
};

type RequestIdleCallbackOptions = {
  timeout?: number;
};

type RequestIdleCallbackHandle = number;

type RequestIdleCallback = (
  callback: (deadline: RequestIdleCallbackDeadline) => void,
  options?: RequestIdleCallbackOptions,
) => RequestIdleCallbackHandle;

type CancelIdleCallback = (handle: RequestIdleCallbackHandle) => void;

export function BackgroundBeamsLazy({ className }: { className?: string }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const show = () => {
      if (!cancelled) setMounted(true);
    };

    // Prefer idle time so the hero hydrates first.
    const ric = (window as unknown as { requestIdleCallback?: RequestIdleCallback })
      .requestIdleCallback;
    const cic = (window as unknown as { cancelIdleCallback?: CancelIdleCallback })
      .cancelIdleCallback;

    if (typeof ric === "function") {
      const id = ric(() => show(), { timeout: 300 });
      return () => {
        cancelled = true;
        if (typeof cic === "function") cic(id);
      };
    }

    const t = window.setTimeout(show, 0);
    return () => {
      cancelled = true;
      window.clearTimeout(t);
    };
  }, []);

  if (!mounted) {
    return (
      <div className={`absolute inset-0 overflow-hidden ${className ?? ""}`}>
        <div className="absolute inset-0 bg-[#030303]" />
      </div>
    );
  }

  return <BackgroundBeams className={className} />;
}

