-- Attribution + tracking columns for applicant funnel analysis.
-- Run once in Supabase SQL editor.

ALTER TABLE cleaner_applications
  ADD COLUMN IF NOT EXISTS utm_source text,
  ADD COLUMN IF NOT EXISTS utm_medium text,
  ADD COLUMN IF NOT EXISTS utm_campaign text,
  ADD COLUMN IF NOT EXISTS referrer text,
  ADD COLUMN IF NOT EXISTS landing_page text,
  ADD COLUMN IF NOT EXISTS visitor_id text,
  ADD COLUMN IF NOT EXISTS session_id text,
  ADD COLUMN IF NOT EXISTS device text,
  ADD COLUMN IF NOT EXISTS user_agent text;

CREATE INDEX IF NOT EXISTS idx_cleaner_apps_visitor_id ON cleaner_applications(visitor_id);
CREATE INDEX IF NOT EXISTS idx_cleaner_apps_utm_source ON cleaner_applications(utm_source);
CREATE INDEX IF NOT EXISTS idx_cleaner_apps_created_at ON cleaner_applications(created_at DESC);
