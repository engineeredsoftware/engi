-- Script: Grant first-time user credits
-- Description: Function to grant credits to users and mark the credits onboarding step as complete
-- Usage: SELECT grant_user_credits('user@example.com');
--        SELECT grant_user_credits('user@example.com', 200, 'special_promotion', 'Special promotion credits');

-- Create the function for granting credits
CREATE OR REPLACE FUNCTION grant_user_credits (
  user_email TEXT,
  credit_amount INTEGER DEFAULT 100,
  credit_source TEXT DEFAULT 'signup_bonus',
  credit_description TEXT DEFAULT 'First-time user bonus credits'
) RETURNS TEXT 
LANGUAGE plpgsql 
SECURITY DEFINER 
AS $$
DECLARE
  v_user_id UUID;
  v_current_balance NUMERIC;
  v_new_balance NUMERIC;
BEGIN
  -- Find user ID from email
  SELECT id INTO v_user_id
  FROM auth.users
  WHERE email = user_email;
  
  -- Check if user exists
  IF v_user_id IS NULL THEN
    RETURN 'Error: User with email ' || user_email || ' not found.';
  END IF;

  -- Insert or update credits for the user
  INSERT INTO user_credits (user_id, balance, updated_at)
  VALUES (v_user_id, credit_amount, NOW())
  ON CONFLICT (user_id) 
  DO UPDATE SET 
    balance = user_credits.balance + EXCLUDED.balance,
    updated_at = NOW()
  RETURNING balance INTO v_new_balance;
  
  -- Update onboarding to mark credits step as complete
  -- Preserves all existing steps and adds 'credits' if not present
  UPDATE user_profiles
  SET 
    onboarded_steps = CASE
      -- If null or empty, start with models and credits
      WHEN onboarded_steps IS NULL OR onboarded_steps = '' THEN '["models","credits"]'
      -- If valid JSON but missing credits, add it (preserving all existing steps)
      WHEN NOT (onboarded_steps::jsonb ? 'credits') THEN 
        (onboarded_steps::jsonb || '["credits"]'::jsonb)::text
      -- Otherwise keep as is (credits already present)
      ELSE onboarded_steps
    END,
    updated_at = NOW()
  WHERE id = v_user_id;

  RETURN 'Successfully granted ' || credit_amount || ' credits to ' || user_email || 
         '. New balance: ' || v_new_balance || ' credits.';
EXCEPTION
  WHEN OTHERS THEN
    RETURN 'Error: ' || SQLERRM;
END;
$$;

-- Grant function execution permission to authenticated users (optional - remove if admin only)
-- GRANT EXECUTE ON FUNCTION grant_user_credits TO authenticated;

-- Example usage:
-- SELECT grant_user_credits('user@example.com');
-- SELECT grant_user_credits('user@example.com', 200, 'special_promotion', 'Special promotion credits');

-- One-time script version (if you don't want to create a function)
/*
DO $$
DECLARE
  v_user_email TEXT := 'user@example.com'; -- Change this
  v_credit_amount INTEGER := 100;
  v_user_id UUID;
BEGIN
  -- Find user ID from email
  SELECT id INTO v_user_id FROM auth.users WHERE email = v_user_email;
  
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'User with email % not found', v_user_email;
  END IF;

  -- Insert or update credits
  INSERT INTO user_credits (user_id, balance, updated_at)
  VALUES (v_user_id, v_credit_amount, NOW())
  ON CONFLICT (user_id) 
  DO UPDATE SET 
    balance = user_credits.balance + EXCLUDED.balance,
    updated_at = NOW();
  
  -- Update onboarding steps (preserves all existing steps)
  UPDATE user_profiles
  SET 
    onboarded_steps = CASE
      WHEN onboarded_steps IS NULL OR onboarded_steps = '' THEN '["models","credits"]'
      WHEN NOT (onboarded_steps::jsonb ? 'credits') THEN 
        (onboarded_steps::jsonb || '["credits"]'::jsonb)::text
      ELSE onboarded_steps
    END,
    updated_at = NOW()
  WHERE id = v_user_id;
  
  RAISE NOTICE 'Successfully granted % credits to %', v_credit_amount, v_user_email;
END $$;
*/