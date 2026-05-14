-- Saved query name: v28_qa_01b_backfill_profile_wallet_projection_from_connection
-- Purpose: repair staging/testnet profile walletBinding projections from the active
-- wallet provider connection without touching auth rows, GitHub rows, or raw proofs.

WITH active_wallet_connection AS (
  SELECT
    c.user_id,
    c.provider,
    coalesce(
      c.connection_data ->> 'address',
      c.connection_data ->> 'wallet_address',
      c.connection_data ->> 'provider_user_id'
    ) AS wallet_address,
    c.connection_data ->> 'network' AS wallet_network,
    coalesce(c.connection_data ->> 'authAddress', c.connection_data ->> 'auth_address') AS auth_address,
    coalesce(c.connection_data ->> 'paymentAddress', c.connection_data ->> 'payment_address') AS payment_address,
    coalesce(c.connection_data ->> 'proofKind', c.connection_data ->> 'proof_kind') AS proof_kind,
    coalesce(c.connection_data ->> 'addressType', c.connection_data ->> 'address_type') AS address_type,
    coalesce(c.connection_data ->> 'verification_state', c.connection_data ->> 'status') AS wallet_status,
    coalesce(c.connection_data ->> 'connected_at', c.connection_data ->> 'persisted_at') AS bound_at,
    c.updated_at AS connection_updated_at
  FROM public.user_connections c
  WHERE c.is_active IS TRUE
    AND c.provider IN ('bitcoin-wallet', 'unisat', 'leather', 'okx-bitcoin', 'xverse', 'manual-bitcoin')
),
repair_candidates AS (
  SELECT
    p.id AS profile_user_id,
    p.settings,
    w.provider,
    w.wallet_address,
    w.wallet_network,
    w.auth_address,
    w.payment_address,
    w.proof_kind,
    w.address_type,
    w.wallet_status,
    w.bound_at,
    w.connection_updated_at
  FROM public.user_profiles p
  JOIN active_wallet_connection w ON w.user_id = p.id
  WHERE nullif(trim(coalesce(w.wallet_address, '')), '') IS NOT NULL
    AND nullif(trim(coalesce(p.settings #>> '{bitcodeProfile,walletBinding,address}', '')), '') = w.wallet_address
    AND (
      (w.wallet_network IS NOT NULL AND p.settings #>> '{bitcodeProfile,walletBinding,network}' IS DISTINCT FROM w.wallet_network)
      OR (w.auth_address IS NOT NULL AND p.settings #>> '{bitcodeProfile,walletBinding,authAddress}' IS DISTINCT FROM w.auth_address)
      OR (w.payment_address IS NOT NULL AND p.settings #>> '{bitcodeProfile,walletBinding,paymentAddress}' IS DISTINCT FROM w.payment_address)
      OR (w.proof_kind IS NOT NULL AND p.settings #>> '{bitcodeProfile,walletBinding,proofKind}' IS DISTINCT FROM w.proof_kind)
      OR (w.address_type IS NOT NULL AND p.settings #>> '{bitcodeProfile,walletBinding,addressType}' IS DISTINCT FROM w.address_type)
    )
),
repaired AS (
  UPDATE public.user_profiles p
  SET
    settings = jsonb_set(
      jsonb_set(
        coalesce(p.settings, '{}'::jsonb),
        '{bitcodeProfile}',
        coalesce(p.settings -> 'bitcodeProfile', '{}'::jsonb),
        true
      ),
      '{bitcodeProfile,walletBinding}',
      coalesce(p.settings #> '{bitcodeProfile,walletBinding}', '{}'::jsonb)
        || jsonb_strip_nulls(jsonb_build_object(
          'address', r.wallet_address,
          'provider', r.provider,
          'status', coalesce(nullif(r.wallet_status, ''), 'pending'),
          'boundAt', coalesce(r.bound_at, r.connection_updated_at::text),
          'network', r.wallet_network,
          'authAddress', r.auth_address,
          'paymentAddress', r.payment_address,
          'proofKind', r.proof_kind,
          'addressType', r.address_type
        )),
      true
    ),
    updated_at = now()
  FROM repair_candidates r
  WHERE p.id = r.profile_user_id
  RETURNING
    p.id AS user_id,
    p.settings #>> '{bitcodeProfile,walletBinding,provider}' AS wallet_provider,
    p.settings #>> '{bitcodeProfile,walletBinding,address}' AS wallet_address,
    p.settings #>> '{bitcodeProfile,walletBinding,network}' AS wallet_network,
    p.settings #>> '{bitcodeProfile,walletBinding,authAddress}' AS auth_address,
    p.settings #>> '{bitcodeProfile,walletBinding,paymentAddress}' AS payment_address,
    p.settings #>> '{bitcodeProfile,walletBinding,proofKind}' AS proof_kind,
    p.settings #>> '{bitcodeProfile,walletBinding,addressType}' AS address_type,
    p.updated_at
)
SELECT *
FROM repaired
ORDER BY updated_at DESC;
