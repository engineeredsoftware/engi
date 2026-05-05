-- Script: Grant first-time user BTD balance
-- Description: Function to grant BTD balance to users and mark the btd auxillary pane as complete
-- Usage: SELECT grant_user_btd_holdings('user@example.com');
--        SELECT grant_user_btd_holdings('user@example.com', 200, 'special_promotion', 'Special promotion BTD holding grant');

-- Create the function for granting non-fungible BTD holding reads.
-- The `user_credits` table name is a V26 storage-compatibility carrier only.
CREATE OR REPLACE FUNCTION grant_user_btd_holdings (
  user_email TEXT,
  btd_amount INTEGER DEFAULT 100,
  btd_source TEXT DEFAULT 'signup_bonus',
  btd_description TEXT DEFAULT 'First-time user BTD holding grant'
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

  -- Insert or update BTD balance for the user
  INSERT INTO user_credits (user_id, balance, updated_at)
  VALUES (v_user_id, btd_amount, NOW())
  ON CONFLICT (user_id) 
  DO UPDATE SET 
    balance = user_credits.balance + EXCLUDED.balance,
    updated_at = NOW()
  RETURNING balance INTO v_new_balance;
  
  -- Update onboarding to mark the btd auxillary pane as complete
  -- Preserves all existing panes and adds 'btd' if not present
  UPDATE user_profiles
  SET 
    onboarded_steps = CASE
      WHEN onboarded_steps IS NULL OR onboarded_steps = '' THEN '["btd"]'
      WHEN NOT (onboarded_steps::jsonb ? 'btd') THEN 
        (onboarded_steps::jsonb || '["btd"]'::jsonb)::text
      ELSE onboarded_steps
    END,
    updated_at = NOW()
  WHERE id = v_user_id;

  RETURN 'Successfully granted ' || btd_amount || ' BTD to ' || user_email || 
         '. New balance: ' || v_new_balance || ' BTD.';
EXCEPTION
  WHEN OTHERS THEN
    RETURN 'Error: ' || SQLERRM;
END;
$$;

-- Grant function execution permission to authenticated users (optional - remove if admin only)
-- GRANT EXECUTE ON FUNCTION grant_user_btd_holdings TO authenticated;

-- Example usage:
-- SELECT grant_user_btd_holdings('user@example.com');
-- SELECT grant_user_btd_holdings('user@example.com', 200, 'special_promotion', 'Special promotion BTD holding grant');

-- One-time script version (if you don't want to create a function)
/*
DO $$
DECLARE
  v_user_email TEXT := 'user@example.com'; -- Change this
  v_btd_amount INTEGER := 100;
  v_user_id UUID;
BEGIN
  -- Find user ID from email
  SELECT id INTO v_user_id FROM auth.users WHERE email = v_user_email;
  
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'User with email % not found', v_user_email;
  END IF;

  -- Insert or update BTD balance
  INSERT INTO user_credits (user_id, balance, updated_at)
  VALUES (v_user_id, v_btd_amount, NOW())
  ON CONFLICT (user_id) 
  DO UPDATE SET 
    balance = user_credits.balance + EXCLUDED.balance,
    updated_at = NOW();
  
  -- Update onboarding panes (preserves all existing panes)
  UPDATE user_profiles
  SET 
    onboarded_steps = CASE
      WHEN onboarded_steps IS NULL OR onboarded_steps = '' THEN '["btd"]'
      WHEN NOT (onboarded_steps::jsonb ? 'btd') THEN 
        (onboarded_steps::jsonb || '["btd"]'::jsonb)::text
      ELSE onboarded_steps
    END,
    updated_at = NOW()
  WHERE id = v_user_id;
  
  RAISE NOTICE 'Successfully granted % BTD to %', v_btd_amount, v_user_email;
END $$;
*/
