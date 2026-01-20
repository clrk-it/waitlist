# Supabase Setup Instructions

## 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Note your project URL and anon key

## 2. Set Environment Variables

Add these to your `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 3. Run Database Schema

1. Open your Supabase project dashboard
2. Go to SQL Editor
3. Run the SQL from `supabase-schema.sql`

Or copy and paste this:

```sql
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

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_waitlist_entries_email ON waitlist_entries(email);
CREATE INDEX IF NOT EXISTS idx_waitlist_entries_user_type ON waitlist_entries(user_type);
CREATE INDEX IF NOT EXISTS idx_waitlist_entries_created_at ON waitlist_entries(created_at DESC);

-- Enable Row Level Security
ALTER TABLE waitlist_entries ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public inserts" ON waitlist_entries
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Allow public count reads" ON waitlist_entries
  FOR SELECT
  TO anon, authenticated
  USING (true);
```

## 4. Verify Setup

After running the schema, verify:
- Table `waitlist_entries` exists
- Indexes are created
- RLS policies are active

## 5. Test the API

The API routes should now work with Supabase instead of MongoDB.
