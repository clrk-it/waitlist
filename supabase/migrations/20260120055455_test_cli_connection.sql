CREATE TABLE IF NOT EXISTS test_connection (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now()
);
