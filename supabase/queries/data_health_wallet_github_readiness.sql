-- Saved query name: Bitcode Data Health - Wallet and GitHub Readiness
-- Purpose: inspect wallet-backed profile parity and GitHub installation readiness.

WITH profile_wallets AS (
  SELECT
    id AS user_id,
    coalesce(
      settings #>> '{bitcodeProfile,walletBinding,provider}',
      settings #>> '{walletBinding,provider}'
    ) AS profile_wallet_provider,
    coalesce(
      settings #>> '{bitcodeProfile,walletBinding,address}',
      settings #>> '{walletBinding,address}'
    ) AS profile_wallet_address,
    coalesce(
      settings #>> '{bitcodeProfile,walletBinding,status}',
      settings #>> '{walletBinding,status}'
    ) AS profile_wallet_status,
    coalesce(
      settings #>> '{bitcodeProfile,walletBinding,network}',
      settings #>> '{walletBinding,network}'
    ) AS profile_wallet_network,
    updated_at AS profile_updated_at
  FROM public.user_profiles
  WHERE
    settings #> '{bitcodeProfile,walletBinding}' IS NOT NULL
    OR settings ? 'walletBinding'
),
wallet_connections AS (
  SELECT
    id AS wallet_connection_id,
    user_id,
    provider AS connection_wallet_provider,
    coalesce(
      connection_data ->> 'address',
      connection_data ->> 'wallet_address',
      connection_data ->> 'provider_user_id'
    ) AS connection_wallet_address,
    connection_data ->> 'network' AS connection_wallet_network,
    coalesce(connection_data ->> 'verification_state', connection_data ->> 'status') AS connection_verification_state,
    connection_data ->> 'proof_kind' AS connection_proof_kind,
    is_active,
    updated_at AS connection_updated_at
  FROM public.user_connections
  WHERE provider IN ('bitcoin-wallet', 'unisat', 'leather', 'okx-bitcoin', 'xverse', 'manual-bitcoin')
),
github_connections AS (
  SELECT
    id AS github_connection_id,
    user_id,
    coalesce(
      connection_data ->> 'installation_id',
      connection_data ->> 'installationId',
      connection_data ->> 'connectionId',
      connection_data ->> 'provider_user_id'
    ) AS installation_id,
    connection_data ->> 'account_login' AS account_login,
    is_active,
    updated_at AS github_updated_at
  FROM public.user_connections
  WHERE provider = 'github'
)
SELECT
  coalesce(p.user_id, w.user_id, g.user_id) AS user_id,
  p.profile_wallet_provider,
  p.profile_wallet_address,
  p.profile_wallet_status,
  p.profile_wallet_network,
  w.wallet_connection_id,
  w.connection_wallet_provider,
  w.connection_wallet_address,
  w.connection_wallet_network,
  w.connection_verification_state,
  w.connection_proof_kind,
  CASE
    WHEN p.user_id IS NULL THEN 'missing_profile_wallet_binding'
    WHEN w.wallet_connection_id IS NULL THEN 'missing_wallet_connection'
    WHEN p.profile_wallet_provider IS DISTINCT FROM w.connection_wallet_provider THEN 'wallet_provider_drift'
    WHEN p.profile_wallet_address IS DISTINCT FROM w.connection_wallet_address THEN 'wallet_address_drift'
    ELSE 'wallet_ready'
  END AS wallet_readiness,
  g.github_connection_id,
  g.installation_id,
  g.account_login,
  CASE
    WHEN g.github_connection_id IS NULL THEN 'github_not_connected'
    WHEN nullif(trim(coalesce(g.installation_id, '')), '') IS NULL THEN 'github_installation_missing'
    ELSE 'github_ready'
  END AS github_readiness,
  p.profile_updated_at,
  w.connection_updated_at,
  g.github_updated_at
FROM profile_wallets p
FULL OUTER JOIN wallet_connections w
  ON w.user_id = p.user_id
  AND w.connection_wallet_provider = p.profile_wallet_provider
FULL OUTER JOIN github_connections g
  ON g.user_id = coalesce(p.user_id, w.user_id)
ORDER BY coalesce(p.profile_updated_at, w.connection_updated_at, g.github_updated_at) DESC NULLS LAST;
