-- Add intro video requirement to cleaner applications
ALTER TABLE cleaner_applications ADD COLUMN IF NOT EXISTS video_url TEXT;
