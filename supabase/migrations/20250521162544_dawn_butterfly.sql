/*
  # Simplify justsayitai_waitlist table

  1. Changes
    - Drop existing table
    - Recreate table with only id, email, and timestamp
    - Maintain RLS policies
*/

-- Drop the existing table
DROP TABLE IF EXISTS justsayitai_waitlist;

-- Create simplified table
CREATE TABLE justsayitai_waitlist (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE justsayitai_waitlist ENABLE ROW LEVEL SECURITY;

-- Recreate policies
CREATE POLICY "Enable insert access for anonymous users"
  ON justsayitai_waitlist
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Enable read access for authenticated users"
  ON justsayitai_waitlist
  FOR SELECT
  TO authenticated
  USING (true);