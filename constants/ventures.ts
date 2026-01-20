/**
 * Venture categories for student businesses
 * Used in the interest form for venture owners
 */
export const VENTURE_CATEGORIES = [
  "Technology",
  "E-commerce",
  "Food & Beverage",
  "Fashion & Apparel",
  "Health & Wellness",
  "Education",
  "Entertainment",
  "Finance",
  "Real Estate",
  "Services",
  "Social Impact",
  "Other",
] as const;

export type VentureCategory = (typeof VENTURE_CATEGORIES)[number];
