"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import type { InterestFormData, FormFieldErrors, FormSubmissionPayload } from "@/types/form";
import type { UserType } from "@/lib/supabase";
import { validateEmailForUserType } from "@/lib/utils";
import { UTD_EMAIL_REQUIRED_TYPES } from "@/constants/user-types";

interface UseInterestFormReturn {
  formData: InterestFormData;
  errors: FormFieldErrors;
  emailWarning: string;
  loading: boolean;
  error: string;
  updateField: <K extends keyof InterestFormData>(
    field: K,
    value: InterestFormData[K]
  ) => void;
  setUserType: (userType: UserType | "") => void;
  toggleVentureCategory: (category: string) => void;
  validateForm: () => boolean;
  submitForm: () => Promise<void>;
  clearError: () => void;
}

const initialFormData: InterestFormData = {
  email: "",
  userType: "",
  club: "",
  ventureName: "",
  ventureCategories: [],
  interest: "",
  additionalQuestions: "",
};

export function useInterestForm(): UseInterestFormReturn {
  const router = useRouter();
  const [formData, setFormData] = useState<InterestFormData>(initialFormData);
  const [errors, setErrors] = useState<FormFieldErrors>({});
  const [emailWarning, setEmailWarning] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const updateField = useCallback(
    <K extends keyof InterestFormData>(field: K, value: InterestFormData[K]) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      // Clear field error when user starts typing
      if (errors[field as keyof FormFieldErrors]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
      // Clear email warning when email changes
      if (field === "email") {
        setEmailWarning("");
      }
    },
    [errors]
  );

  const setUserType = useCallback((userType: UserType | "") => {
    setFormData((prev) => ({ ...prev, userType }));
    setErrors((prev) => ({ ...prev, userType: undefined }));
  }, []);

  const toggleVentureCategory = useCallback((category: string) => {
    setFormData((prev) => {
      const categories = prev.ventureCategories.includes(category)
        ? prev.ventureCategories.filter((c) => c !== category)
        : [...prev.ventureCategories, category];
      return { ...prev, ventureCategories: categories };
    });
    if (errors.ventureCategories) {
      setErrors((prev) => ({ ...prev, ventureCategories: undefined }));
    }
  }, [errors]);

  const validateForm = useCallback((): boolean => {
    const newErrors: FormFieldErrors = {};

    if (!formData.userType) {
      newErrors.userType = "Please select how you'd like to use Mivro";
    }

    // Email validation based on user type
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (formData.userType) {
      const emailValidation = validateEmailForUserType(formData.email, formData.userType);
      if (!emailValidation.isValid) {
        newErrors.email = emailValidation.error || "Invalid email";
      } else if (
        formData.userType === "regular" &&
        !formData.email.includes("@utdallas.edu")
      ) {
        setEmailWarning("UTD email preferred but not required");
      }
    }

    // Club validation for club owners
    if (formData.userType === "club_owner" && !formData.club.trim()) {
      newErrors.club = "Please tell us what club you represent";
    }

    // Venture name validation for venture owners
    if (formData.userType === "venture_owner") {
      if (!formData.ventureName.trim()) {
        newErrors.ventureName = "Please enter your venture name";
      }
      if (formData.ventureCategories.length === 0) {
        newErrors.ventureCategories = "Please select at least one category";
      }
    }

    // Interest validation
    if (!formData.interest.trim()) {
      newErrors.interest = "Please tell us why you're interested";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const submitForm = useCallback(async () => {
    setError("");
    setEmailWarning("");

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    const payload: FormSubmissionPayload = {
      email: formData.email.trim().toLowerCase(),
      userType: formData.userType as UserType,
      interest: formData.interest.trim(),
      additionalQuestions: formData.additionalQuestions.trim() || undefined,
      ...(formData.userType === "club_owner" && formData.club
        ? { club: formData.club }
        : {}),
      ...(formData.userType === "venture_owner" && formData.ventureName
        ? {
            ventureName: formData.ventureName,
            ventureCategories: formData.ventureCategories,
          }
        : {}),
    };

    try {
      const res = await fetch("/api/joinWaitList", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (res.status === 201) {
        router.push("/thank-you");
      } else {
        const errorData = await res.json().catch(() => ({}));
        setError(errorData.error || "Failed to submit form");
      }
    } catch (err) {
      setError("Network error. Please try again.");
      console.error("Form submission error:", err);
    } finally {
      setLoading(false);
    }
  }, [formData, router, validateForm]);

  const clearError = useCallback(() => {
    setError("");
  }, []);

  return {
    formData,
    errors,
    emailWarning,
    loading,
    error,
    updateField,
    setUserType,
    toggleVentureCategory,
    validateForm,
    submitForm,
    clearError,
  };
}
