-- Create VCS repositories table for provider-agnostic repository storage
CREATE TABLE IF NOT EXISTS vcs_repositories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  provider TEXT NOT NULL CHECK (provider IN ('github', 'gitlab', 'bitbucket')),
  provider_repo_id TEXT NOT NULL,
  repo_name TEXT NOT NULL,
  repo_full_name TEXT NOT NULL,
  repo_owner TEXT NOT NULL,
  repo_description TEXT,
  repo_language TEXT,
  repo_default_branch TEXT,
  repo_private BOOLEAN DEFAULT false,
  repo_url TEXT,
  repo_created_at TIMESTAMP WITH TIME ZONE,
  repo_updated_at TIMESTAMP WITH TIME ZONE,
  repo_data JSONB,
  synced_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, provider, provider_repo_id)
);

-- Create indexes for performance
CREATE INDEX idx_vcs_repositories_user_id ON vcs_repositories(user_id);
CREATE INDEX idx_vcs_repositories_provider ON vcs_repositories(provider);
CREATE INDEX idx_vcs_repositories_synced_at ON vcs_repositories(synced_at);
CREATE INDEX idx_vcs_repositories_repo_full_name ON vcs_repositories(repo_full_name);
CREATE INDEX idx_vcs_repositories_updated_at ON vcs_repositories(updated_at DESC);

-- Enable RLS
ALTER TABLE vcs_repositories ENABLE ROW LEVEL SECURITY;

-- RLS policies
CREATE POLICY "Users can view their own repositories"
  ON vcs_repositories
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own repositories"
  ON vcs_repositories
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own repositories"
  ON vcs_repositories
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own repositories"
  ON vcs_repositories
  FOR DELETE
  USING (auth.uid() = user_id);

-- Function to migrate data from github_user_repos to vcs_repositories
CREATE OR REPLACE FUNCTION migrate_github_repos_to_vcs()
RETURNS void AS $$
BEGIN
  INSERT INTO vcs_repositories (
    user_id,
    provider,
    provider_repo_id,
    repo_name,
    repo_full_name,
    repo_owner,
    repo_description,
    repo_language,
    repo_default_branch,
    repo_private,
    repo_url,
    repo_created_at,
    repo_updated_at,
    repo_data,
    synced_at,
    created_at,
    updated_at
  )
  SELECT 
    user_id,
    'github' as provider,
    repo_id::TEXT as provider_repo_id,
    COALESCE((repo_data->>'name')::TEXT, '') as repo_name,
    COALESCE(repo_full_name, (repo_data->>'full_name')::TEXT, '') as repo_full_name,
    COALESCE((repo_data->'owner'->>'login')::TEXT, '') as repo_owner,
    (repo_data->>'description')::TEXT as repo_description,
    (repo_data->>'language')::TEXT as repo_language,
    COALESCE((repo_data->>'default_branch')::TEXT, 'main') as repo_default_branch,
    COALESCE((repo_data->>'private')::BOOLEAN, false) as repo_private,
    (repo_data->>'html_url')::TEXT as repo_url,
    CASE 
      WHEN repo_data->>'created_at' IS NOT NULL 
      THEN (repo_data->>'created_at')::TIMESTAMP WITH TIME ZONE
      ELSE created_at
    END as repo_created_at,
    CASE 
      WHEN repo_data->>'updated_at' IS NOT NULL 
      THEN (repo_data->>'updated_at')::TIMESTAMP WITH TIME ZONE
      ELSE updated_at
    END as repo_updated_at,
    repo_data,
    updated_at as synced_at,
    created_at,
    updated_at
  FROM github_user_repos
  WHERE NOT EXISTS (
    SELECT 1 FROM vcs_repositories 
    WHERE vcs_repositories.user_id = github_user_repos.user_id 
    AND vcs_repositories.provider = 'github'
    AND vcs_repositories.provider_repo_id = github_user_repos.repo_id::TEXT
  );
END;
$$ LANGUAGE plpgsql;

-- Run the migration
SELECT migrate_github_repos_to_vcs();

-- Create view for backward compatibility during migration
CREATE OR REPLACE VIEW github_user_repos_compat AS
SELECT 
  user_id,
  (provider_repo_id)::BIGINT as repo_id,
  'github' as provider,
  user_id as github_user_id,
  repo_full_name,
  repo_data,
  created_at,
  updated_at
FROM vcs_repositories
WHERE provider = 'github';

-- Add comment explaining the migration
COMMENT ON TABLE vcs_repositories IS 'Provider-agnostic repository storage for GitHub, GitLab, and Bitbucket';
COMMENT ON VIEW github_user_repos_compat IS 'Compatibility view for legacy github_user_repos table - will be removed after migration';

-- Add trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_vcs_repositories_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER vcs_repositories_updated_at
  BEFORE UPDATE ON vcs_repositories
  FOR EACH ROW
  EXECUTE FUNCTION update_vcs_repositories_updated_at();