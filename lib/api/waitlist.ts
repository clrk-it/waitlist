import type { FormSubmissionPayload } from "@/types/form";
import type { WaitlistCountResponse, WaitlistEntryResponse } from "@/types/api";

const API_BASE = "/api/joinWaitList";

/**
 * Fetch the total waitlist count
 */
export async function getWaitlistCount(): Promise<number> {
  const res = await fetch(API_BASE, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch waitlist count");
  }

  const data: WaitlistCountResponse = await res.json();
  return data.item || 0;
}

/**
 * Submit a waitlist entry
 */
export async function submitWaitlistEntry(
  payload: FormSubmissionPayload
): Promise<WaitlistEntryResponse> {
  const res = await fetch(API_BASE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || "Failed to submit form");
  }

  return res.json();
}
