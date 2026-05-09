ALTER TABLE public.user_connections
  DROP CONSTRAINT IF EXISTS user_connections_provider_check;

COMMENT ON TABLE public.user_connections IS
  'Unified external connection table for GitHub repository scope, wallet-provider authentication posture, and later third-party provider connections. Provider-specific validity lives in connection_data and route-level admission checks.';
