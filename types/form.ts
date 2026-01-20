import type { UserType } from "@/lib/supabase";

export interface InterestFormData {
  email: string;
  userType: UserType | "";
  club: string;
  ventureName: string;
  ventureCategories: string[];
  interest: string;
  additionalQuestions: string;
}

export interface FormFieldErrors {
  userType?: string;
  email?: string;
  club?: string;
  ventureName?: string;
  ventureCategories?: string;
  interest?: string;
}

export interface UserTypeOption {
  value: UserType;
  label: string;
  description: string;
}

export interface FormSubmissionPayload {
  email: string;
  userType: UserType;
  club?: string;
  ventureName?: string;
  ventureCategories?: string[];
  interest: string;
  additionalQuestions?: string;
}
