-- ============================================================================
-- MIGRATION 034: Credits Functions (Atomic)
-- Creates SQL functions for atomic credit debit/credit with ledger entries
-- ============================================================================

-- Deduct credits: decrements balance and inserts a ledger row in a single TX
CREATE OR REPLACE FUNCTION public.deduct_credits(p_user_id uuid, p_amount numeric)
RETURNS numeric
LANGUAGE plpgsql
AS $$
DECLARE
  v_prev numeric;
  v_new numeric;
BEGIN
  IF p_amount <= 0 THEN
    RAISE EXCEPTION 'Invalid amount %', p_amount USING ERRCODE = '22003';
  END IF;

  SELECT balance INTO v_prev FROM public.user_credits WHERE user_id = p_user_id FOR UPDATE;

  IF v_prev IS NULL THEN
    v_prev := 0;
    INSERT INTO public.user_credits(user_id, balance, total_purchased, total_used)
      VALUES (p_user_id, 0, 0, 0)
      ON CONFLICT (user_id) DO NOTHING;
  END IF;

  IF v_prev < p_amount THEN
    RAISE EXCEPTION 'Insufficient credits: have %, need %', v_prev, p_amount USING ERRCODE = 'PAYS0';
  END IF;

  UPDATE public.user_credits
    SET balance = balance - p_amount,
        total_used = total_used + p_amount,
        updated_at = NOW()
    WHERE user_id = p_user_id
    RETURNING balance INTO v_new;

  INSERT INTO public.user_credit_usages(user_id, amount, operation_type, metadata)
    VALUES (p_user_id, p_amount, 'debit', jsonb_build_object('reason', 'pipeline_run'));

  RETURN v_new;
END;
$$;

-- Add credits: increments balance and inserts a ledger row in a single TX
CREATE OR REPLACE FUNCTION public.add_credits(p_user_id uuid, p_amount numeric)
RETURNS numeric
LANGUAGE plpgsql
AS $$
DECLARE
  v_prev numeric;
  v_new numeric;
BEGIN
  IF p_amount <= 0 THEN
    RAISE EXCEPTION 'Invalid amount %', p_amount USING ERRCODE = '22003';
  END IF;

  SELECT balance INTO v_prev FROM public.user_credits WHERE user_id = p_user_id FOR UPDATE;

  IF v_prev IS NULL THEN
    INSERT INTO public.user_credits(user_id, balance, total_purchased, total_used)
      VALUES (p_user_id, p_amount, p_amount, 0)
      ON CONFLICT (user_id) DO UPDATE SET balance = public.user_credits.balance + EXCLUDED.balance,
                                          total_purchased = public.user_credits.total_purchased + EXCLUDED.balance,
                                          updated_at = NOW()
      RETURNING public.user_credits.balance INTO v_new;
  ELSE
    UPDATE public.user_credits
      SET balance = balance + p_amount,
          total_purchased = total_purchased + p_amount,
          updated_at = NOW()
      WHERE user_id = p_user_id
      RETURNING balance INTO v_new;
  END IF;

  INSERT INTO public.user_credit_usages(user_id, amount, operation_type, metadata)
    VALUES (p_user_id, p_amount, 'credit', jsonb_build_object('reason', 'top_up'));

  RETURN v_new;
END;
$$;

-- Permissions: service_role executes these RPCs
GRANT EXECUTE ON FUNCTION public.deduct_credits(uuid, numeric) TO service_role;
GRANT EXECUTE ON FUNCTION public.add_credits(uuid, numeric) TO service_role;

