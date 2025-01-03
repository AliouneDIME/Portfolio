/*
  # Add visit tracking

  1. New Tables
    - `page_visits`
      - `id` (uuid, primary key)
      - `page` (text) - The visited page/section
      - `visited_at` (timestamp) - When the visit occurred
      - `user_agent` (text) - Browser information
      - `ip_hash` (text) - Hashed IP for privacy

  2. Security
    - Enable RLS
    - Allow anonymous inserts
    - Allow authenticated users to view statistics
*/

CREATE TABLE IF NOT EXISTS page_visits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page text NOT NULL,
  visited_at timestamptz DEFAULT now(),
  user_agent text,
  ip_hash text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE page_visits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert visits"
  ON page_visits
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view visits"
  ON page_visits
  FOR SELECT
  TO authenticated
  USING (true);