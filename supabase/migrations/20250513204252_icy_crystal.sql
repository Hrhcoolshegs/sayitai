/*
  # Create waitlist table

  1. New Tables
    - `waitlist`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `created_at` (timestamp)
  2. Security
    - Enable RLS on `waitlist` table
    - Add policy for authenticated users to read all waitlist entries
    - Add policy for anonymous users to insert into waitlist
*/

CREATE TABLE IF NOT EXISTS waitlist (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users to read waitlist"
  ON waitlist
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow anonymous users to insert into waitlist"
  ON waitlist
  FOR INSERT
  TO anon
  WITH CHECK (true);