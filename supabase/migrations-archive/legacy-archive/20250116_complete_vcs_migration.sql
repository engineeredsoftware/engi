-- Complete VCS Migration Script
-- This migration completes the removal of all GitHub-specific legacy code

-- 1. Add UUID column to user_connections if not exists
ALTER TABLE user_connections ADD COLUMN IF NOT EXISTS id UUID DEFAULT uuid_generate_v4();
CREATE INDEX IF NOT EXISTS idx_user_connections_id ON user_connections(id);

-- 2. Migrate data from github_user_repos to vcs_repositories
INSERT INTO vcs_repositories (
  user_id, provider, provider_repo_id, repo_name, repo_full_name,
  repo_owner, repo_description, repo_language, repo_default_branch,
  repo_private, repo_url, repo_created_at, repo_updated_at, repo_data
)
SELECT 
  user_id,
  'github' as provider,
  repo_id::text as provider_repo_id,
  repo_data->>'name' as repo_name,
  repo_full_name,
  repo_data->'owner'->>'login' as repo_owner,
  repo_data->>'description' as repo_description,
  repo_data->>'language' as repo_language,
  repo_data->>'default_branch' as repo_default_branch,
  (repo_data->>'private')::boolean as repo_private,
  repo_data->>'html_url' as repo_url,
  (repo_data->>'created_at')::timestamp with time zone as repo_created_at,
  (repo_data->>'updated_at')::timestamp with time zone as repo_updated_at,
  repo_data
FROM github_user_repos
ON CONFLICT (user_id, provider, provider_repo_id) DO UPDATE
SET 
  repo_data = EXCLUDED.repo_data,
  repo_updated_at = EXCLUDED.repo_updated_at,
  updated_at = now();

-- 3. Create view for backward compatibility (temporary)
CREATE OR REPLACE VIEW github_user_repos AS
SELECT 
  user_id,
  provider_repo_id::bigint as repo_id,
  repo_full_name,
  repo_data,
  updated_at
FROM vcs_repositories
WHERE provider = 'github';

-- 4. Update connection_data to ensure connectionId exists
-- This helps with the transition from installationId to connectionId
UPDATE user_connections
SET connection_data = jsonb_set(
  connection_data,
  '{connectionId}',
  connection_data->'installationId'
)
WHERE provider = 'github' 
AND connection_data ? 'installationId'
AND NOT connection_data ? 'connectionId';

-- 5. Create helper function to get auth by installation ID (for migration period)
CREATE OR REPLACE FUNCTION get_auth_by_installation_id(p_installation_id bigint)
RETURNS TABLE (
  connection_id uuid,
  user_id uuid,
  provider text,
  access_token text
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    uc.id as connection_id,
    uc.user_id,
    uc.provider,
    uc.connection_data->>'accessToken' as access_token
  FROM user_connections uc
  WHERE uc.provider = 'github'
  AND (uc.connection_data->>'connectionId')::bigint = p_installation_id
  OR (uc.connection_data->>'installationId')::bigint = p_installation_id
  LIMIT 1;
END;
$$ LANGUAGE plpgsql;

-- 6. Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_vcs_repositories_provider ON vcs_repositories(provider);
CREATE INDEX IF NOT EXISTS idx_vcs_repositories_user_provider ON vcs_repositories(user_id, provider);
CREATE INDEX IF NOT EXISTS idx_user_connections_provider ON user_connections(provider);
CREATE INDEX IF NOT EXISTS idx_user_connections_connection_data_connectionId ON user_connections((connection_data->>'connectionId'));

-- 7. Create migration status table to track progress
CREATE TABLE IF NOT EXISTS vcs_migration_status (
  id SERIAL PRIMARY KEY,
  migration_step text NOT NULL,
  status text NOT NULL CHECK (status IN ('pending', 'in_progress', 'completed', 'failed')),
  started_at timestamp with time zone,
  completed_at timestamp with time zone,
  error_message text,
  metadata jsonb,
  created_at timestamp with time zone DEFAULT now()
);

-- 8. Insert migration steps
INSERT INTO vcs_migration_status (migration_step, status) VALUES
  ('github_user_repos_migration', 'completed'),
  ('connection_id_update', 'completed'),
  ('installationId_replacement', 'completed'),
  ('legacy_code_removal', 'completed'),
  ('environment_variable_update', 'pending');

-- 9. Add comment to track migration
COMMENT ON TABLE vcs_repositories IS 'Unified VCS repository storage supporting GitHub, GitLab, and Bitbucket';
COMMENT ON VIEW github_user_repos IS 'DEPRECATED: Backward compatibility view. Will be removed after migration completion.';

-- 10. Grant appropriate permissions
GRANT SELECT ON github_user_repos TO authenticated;
GRANT ALL ON vcs_repositories TO authenticated;
GRANT EXECUTE ON FUNCTION get_auth_by_installation_id TO authenticated;

-- Migration complete!
-- Next steps:
-- 1. Update environment variables to remove GitHub-specific configs
-- 2. Monitor application logs for any legacy code usage
-- 3. After verification period, drop the github_user_repos view
-- 4. Remove the get_auth_by_installation_id helper function