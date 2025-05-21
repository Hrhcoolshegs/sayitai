/*
  # Create JustSayItAI waitlist table

  1. New Tables
    - `justsayitai_waitlist`
      - `id` (uuid, primary key)
      - `name` (text, not null)
      - `email` (text, unique, not null)
      - `location` (text)
      - `cultural_background` (text)
      - `health_interest` (text)
      - `created_at` (timestamp)
  2. Security
    - Enable RLS on `justsayitai_waitlist` table
    - Add policy for anonymous users to insert into waitlist
    - Add policy for authenticated users to read waitlist entries
*/

CREATE TABLE IF NOT EXISTS justsayitai_waitlist (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  location text,
  cultural_background text,
  health_interest text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE justsayitai_waitlist ENABLE ROW LEVEL SECURITY;

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