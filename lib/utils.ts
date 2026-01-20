import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { UserType } from "./supabase";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Email validation
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// UTD email validation - checks if email ends with @utdallas.edu
export function isUTDEmail(email: string): boolean {
  const utdRegex = /^[^\s@]+@utdallas\.edu$/i;
  return utdRegex.test(email.trim());
}

// Conditional email validation based on user type
export function validateEmailForUserType(
  email: string,
  userType: UserType
): { isValid: boolean; error?: string } {
  if (!email.trim()) {
    return { isValid: false, error: "Email is required" };
  }

  if (!isValidEmail(email)) {
    return { isValid: false, error: "Please enter a valid email address" };
  }

  // UTD email required for journalists, venture owners, and club owners
  const requiresUTD = ["journalist", "venture_owner", "club_owner"].includes(userType);
  
  if (requiresUTD && !isUTDEmail(email)) {
    return {
      isValid: false,
      error: "Please use a UTD email address (@utdallas.edu)",
    };
  }

  // Preferred but not required for regular users
  if (userType === "regular" && !isUTDEmail(email)) {
    // This is a warning, not an error - we'll show it but allow submission
    return { isValid: true };
  }

  return { isValid: true };
}
