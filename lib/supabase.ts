import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// Only throw error at runtime, not during build
if (typeof window !== "undefined" && (!supabaseUrl || !supabaseAnonKey)) {
  console.warn(
    "Missing Supabase environment variables. Please add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to your .env.local"
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);


// Database types
export type UserType = "regular" | "journalist" | "venture_owner" | "club_owner";

export interface WaitlistEntry {
  id?: string;
  email: string;
  user_type: UserType;
  club?: string; // For club owners
  venture_name?: string; // For venture owners
  venture_categories?: string[]; // For venture owners
  interest: string;
  additional_questions?: string;
  created_at?: string;
}
