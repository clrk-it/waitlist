import type { UserType } from "@/lib/supabase";
import type { UserTypeOption } from "@/types/form";

/**
 * User type options for the interest form
 */
export const USER_TYPE_OPTIONS: UserTypeOption[] = [
  {
    value: "regular",
    label: "Student",
    description: "I'm a student interested in Mivro",
  },
  {
    value: "journalist",
    label: "Journalist",
    description: "I want to write for Mivro",
  },
  {
    value: "venture_owner",
    label: "Venture Owner",
    description: "I run a student business",
  },
  {
    value: "club_owner",
    label: "Club Owner",
    description: "I represent a student organization",
  },
] as const;

/**
 * User types that require UTD email
 */
export const UTD_EMAIL_REQUIRED_TYPES: UserType[] = [
  "journalist",
  "venture_owner",
  "club_owner",
];
