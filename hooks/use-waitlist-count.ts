"use client";

import { useState, useEffect } from "react";
import type { WaitlistCountResponse } from "@/types/api";

interface UseWaitlistCountReturn {
  count: number;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useWaitlistCount(): UseWaitlistCountReturn {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCount = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/joinWaitList", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        const data: WaitlistCountResponse = await res.json();
        setCount(data.item || 0);
      } else {
        setError("Failed to fetch waitlist count");
      }
    } catch (err) {
      console.error("Failed to fetch waitlist count:", err);
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCount();
  }, []);

  return {
    count,
    loading,
    error,
    refetch: fetchCount,
  };
}
