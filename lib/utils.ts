import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

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
