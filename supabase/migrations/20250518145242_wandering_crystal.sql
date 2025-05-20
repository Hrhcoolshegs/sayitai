/*
  # Create demo requests table

  1. New Tables
    - `demo_requests`
      - `id` (uuid, primary key)
      - `name` (text, not null)
      - `email` (text, not null)
      - `company` (text, not null)
      - `date` (date, not null)
      - `created_at` (timestamp)
      - `status` (text, default: 'pending')
  2. Security
    - Enable RLS on `demo_requests` table
    - Add policy for anonymous users to insert demo requests
    - Add policy for authenticated users to read demo requests
*/

CREATE TABLE IF NOT EXISTS demo_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  company text NOT NULL,
  date date NOT NULL,
  created_at timestamptz DEFAULT now(),
  status text DEFAULT 'pending'
);

ALTER TABLE demo_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can request a demo"
  ON demo_requests
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Authenticated users can read demo requests"
  ON demo_requests
  FOR SELECT
  TO authenticated
  USING (true);