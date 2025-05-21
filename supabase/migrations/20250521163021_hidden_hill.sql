/*
  # Fix waitlist table and policies

  1. Changes
    - Drop existing table and policies
    - Recreate table with simplified structure
    - Set up proper RLS policies for public access
*/

-- Drop existing table and policies
DROP TABLE IF EXISTS justsayitai_waitlist CASCADE;

-- Create simplified table
CREATE TABLE justsayitai_waitlist (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE justsayitai_waitlist ENABLE ROW LEVEL SECURITY;

-- Create policies with public access
CREATE POLICY "Enable public insert access"
  ON justsayitai_waitlist
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Enable public read access"
  ON justsayitai_waitlist
  FOR SELECT
  TO public
  USING (true);