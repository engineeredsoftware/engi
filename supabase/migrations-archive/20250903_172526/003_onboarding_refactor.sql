-- Migration: Refactor onboarding to use single onboarded_steps field
-- Date: 2025-08-13
-- Description: Consolidates onboarding tracking to a single JSON array field

-- Add new onboarded_steps column
ALTER TABLE user_profiles 
ADD COLUMN IF NOT EXISTS onboarded_steps TEXT DEFAULT '["models"]';

-- Migrate existing data
UPDATE user_profiles
SET onboarded_steps = 
  CASE
    -- If already completed all steps
    WHEN onboarding_completed = true THEN '["models","profile","connects","credits"]'::jsonb::text
    -- Parse existing onboarding_step if it exists and is valid JSON
    WHEN onboarding_step IS NOT NULL AND onboarding_step != '[]' AND onboarding_step != '' THEN
      CASE
        -- Ensure models is always included
        WHEN onboarding_step::jsonb ? 'models' THEN onboarding_step
        ELSE (jsonb_build_array('models') || COALESCE(onboarding_step::jsonb, '[]'::jsonb))::text
      END
    -- Default for new users or invalid data
    ELSE '["models"]'
  END
WHERE onboarded_steps IS NULL OR onboarded_steps = '["models"]';

-- Drop old columns after migration
-- Note: Commented out for safety - run manually after verification
-- ALTER TABLE user_profiles DROP COLUMN IF EXISTS onboarding_completed;
-- ALTER TABLE user_profiles DROP COLUMN IF EXISTS onboarding_step;
-- ALTER TABLE user_profiles DROP COLUMN IF EXISTS onboarding_data;

-- Add comment for documentation
COMMENT ON COLUMN user_profiles.onboarded_steps IS 'JSON array of completed onboarding steps. Default includes "models" as it is optional. Valid steps: profile, connects, models, credits';