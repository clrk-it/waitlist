-- Supabase Schema for Mivro Waitlist
-- Run this in your Supabase SQL Editor

-- Create waitlist_entries table
CREATE TABLE IF NOT EXISTS waitlist_entries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  user_type TEXT NOT NULL CHECK (user_type IN ('regular', 'journalist', 'venture_owner', 'club_owner')),
  club TEXT,
  venture_name TEXT,
  venture_categories TEXT[],
  interest TEXT NOT NULL,
  additional_questions TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_waitlist_entries_email ON waitlist_entries(email);

-- Create index on user_type for filtering
CREATE INDEX IF NOT EXISTS idx_waitlist_entries_user_type ON waitlist_entries(user_type);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_waitlist_entries_created_at ON waitlist_entries(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE waitlist_entries ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts (for API)
CREATE POLICY "Allow public inserts" ON waitlist_entries
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Create policy to allow reading count (for public display)
CREATE POLICY "Allow public count reads" ON waitlist_entries
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Note: Adjust RLS policies based on your security requirements
-- For production, you may want to restrict SELECT to only count operations
