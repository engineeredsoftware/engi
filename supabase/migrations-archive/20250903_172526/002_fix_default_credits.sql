-- Fix default credits for new users from 10.00 to 0.00
-- This updates the handle_new_user function to initialize new users with 0 credits

CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Create user profile
  INSERT INTO public.user_profiles (id, created_at, updated_at)
  VALUES (NEW.id, NOW(), NOW())
  ON CONFLICT (id) DO NOTHING;
  
  -- Initialize user credits with 0 balance
  INSERT INTO public.user_credits (user_id, balance, created_at, updated_at)
  VALUES (NEW.id, 0.00, NOW(), NOW()) -- Start with 0 credits
  ON CONFLICT (user_id) DO NOTHING;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;