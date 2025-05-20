/*
  # Update waitlist table policies

  1. Security Changes
    - Drop existing policies
    - Add new policy for anonymous users to insert into waitlist
    - Add policy for authenticated users to read waitlist entries
*/

-- First, drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Allow authenticated users to read waitlist" ON waitlist;
DROP POLICY IF EXISTS "Allow anonymous users to insert into waitlist" ON waitlist;

-- Recreate the table with proper configuration
CREATE TABLE IF NOT EXISTS waitlist (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Create new policies with proper configuration
CREATE POLICY "Enable insert access for anonymous users"
  ON waitlist
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Enable read access for authenticated users"
  ON waitlist
  FOR SELECT
  TO authenticated
  USING (true);