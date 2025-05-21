/*
  # Fix waitlist table policies

  1. Security Changes
    - Drop existing policies
    - Add new policies for both waitlist tables that properly handle public access
    - Ensure consistent policy naming and permissions
*/

-- First, drop all existing policies to avoid conflicts
DROP POLICY IF EXISTS "Enable insert access for anonymous users" ON justsayitai_waitlist;
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON justsayitai_waitlist;
DROP POLICY IF EXISTS "Enable public waitlist signups" ON waitlist;
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON waitlist;

-- Recreate policies for justsayitai_waitlist
CREATE POLICY "Enable insert access for anonymous users"
  ON justsayitai_waitlist
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Enable read access for authenticated users"
  ON justsayitai_waitlist
  FOR SELECT
  TO authenticated
  USING (true);

-- Recreate policies for waitlist
CREATE POLICY "Enable insert access for anonymous users"
  ON waitlist
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Enable read access for authenticated users"
  ON waitlist
  FOR SELECT
  TO authenticated
  USING (true);