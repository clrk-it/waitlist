export interface ApiResponse<T = unknown> {
  data?: T;
  error?: string;
}

export interface WaitlistCountResponse {
  item: number;
}

export interface WaitlistEntryResponse {
  id: string;
  email: string;
  user_type: string;
  club?: string;
  venture_name?: string;
  venture_categories?: string[];
  interest: string;
  additional_questions?: string;
  created_at: string;
}
