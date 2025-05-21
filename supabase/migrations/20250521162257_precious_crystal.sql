/*
  # Fix waitlist RLS policies

  1. Changes
    - Drop existing INSERT policies that aren't working correctly
    - Create new INSERT policy to allow public inserts
    - Maintain existing SELECT policy for authenticated users
  
  2. Security
    - Enables proper public access for waitlist signups
    - Maintains read restriction to authenticated users only
*/

-- Drop existing problematic INSERT policies
DROP POLICY IF EXISTS "Allow public to insert waitlist entries" ON waitlist;
DROP POLICY IF EXISTS "Enable insert access for anonymous users" ON waitlist;

-- Create new INSERT policy that properly allows public access
CREATE POLICY "Enable public waitlist signups"
ON waitlist
FOR INSERT
TO public
WITH CHECK (true);

-- Note: We're keeping the existing SELECT policy:
-- "Enable read access for authenticated users"
-- which allows authenticated users to read the data