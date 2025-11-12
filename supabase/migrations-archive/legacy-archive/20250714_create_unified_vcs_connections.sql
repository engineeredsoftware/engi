-- Create unified VCS connections table
CREATE TABLE IF NOT EXISTS user_vcs_connections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  provider TEXT NOT NULL CHECK (provider IN ('github', 'gitlab', 'bitbucket')),
  instance_url TEXT, -- For self-hosted instances
  access_token TEXT NOT NULL,
  refresh_token TEXT,
  token_expires_at TIMESTAMPTZ,
  provider_user_id TEXT NOT NULL,
  provider_username TEXT NOT NULL,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Ensure unique connection per user, provider, instance, and provider user
  UNIQUE(user_id, provider, instance_url, provider_user_id)
);

-- Create indexes for performance
CREATE INDEX idx_user_vcs_connections_user_id ON user_vcs_connections(user_id);
CREATE INDEX idx_user_vcs_connections_provider ON user_vcs_connections(provider);
CREATE INDEX idx_user_vcs_connections_provider_user ON user_vcs_connections(provider, provider_user_id);

-- Enable Row Level Security
ALTER TABLE user_vcs_connections ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their own VCS connections"
  ON user_vcs_connections
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own VCS connections"
  ON user_vcs_connections
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own VCS connections"
  ON user_vcs_connections
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own VCS connections"
  ON user_vcs_connections
  FOR DELETE
  USING (auth.uid() = user_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_vcs_connection_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_vcs_connection_updated_at
  BEFORE UPDATE ON user_vcs_connections
  FOR EACH ROW
  EXECUTE FUNCTION update_vcs_connection_updated_at();

-- Create view for simplified connection data
CREATE OR REPLACE VIEW user_vcs_connections_summary AS
SELECT 
  id,
  user_id,
  provider,
  instance_url,
  provider_username,
  CASE 
    WHEN token_expires_at IS NULL THEN 'valid'
    WHEN token_expires_at > NOW() THEN 'valid'
    ELSE 'expired'
  END as token_status,
  created_at,
  updated_at
FROM user_vcs_connections;

-- Grant permissions on the view
GRANT SELECT ON user_vcs_connections_summary TO authenticated;

-- Create function to migrate existing connections
CREATE OR REPLACE FUNCTION migrate_existing_vcs_connections()
RETURNS void AS $$
BEGIN
  -- Migrate GitHub connections from user_connections table
  INSERT INTO user_vcs_connections (
    user_id,
    provider,
    access_token,
    provider_user_id,
    provider_username,
    metadata,
    created_at,
    updated_at
  )
  SELECT 
    user_id,
    'github',
    (github_connection->>'access_token')::text,
    (github_connection->>'github_user_id')::text,
    (github_connection->>'github_username')::text,
    github_connection - 'access_token' - 'github_user_id' - 'github_username',
    created_at,
    updated_at
  FROM user_connections
  WHERE github_connection IS NOT NULL
  ON CONFLICT (user_id, provider, instance_url, provider_user_id) DO NOTHING;
  
  -- Migrate GitLab connections
  INSERT INTO user_vcs_connections (
    user_id,
    provider,
    instance_url,
    access_token,
    refresh_token,
    token_expires_at,
    provider_user_id,
    provider_username,
    metadata,
    created_at,
    updated_at
  )
  SELECT 
    user_id,
    'gitlab',
    gitlab_instance_url,
    access_token,
    refresh_token,
    expires_at,
    gitlab_user_id::text,
    gitlab_username,
    COALESCE(metadata, '{}'::jsonb),
    created_at,
    updated_at
  FROM user_gitlab_connections
  ON CONFLICT (user_id, provider, instance_url, provider_user_id) DO NOTHING;
  
  -- Note: Bitbucket connections will be new, no migration needed
END;
$$ LANGUAGE plpgsql;

-- Run the migration
SELECT migrate_existing_vcs_connections();

-- Create function to check if user has VCS connection
CREATE OR REPLACE FUNCTION user_has_vcs_connection(
  p_user_id UUID,
  p_provider TEXT,
  p_instance_url TEXT DEFAULT NULL
)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 
    FROM user_vcs_connections
    WHERE user_id = p_user_id 
      AND provider = p_provider
      AND (p_instance_url IS NULL OR instance_url = p_instance_url)
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to get valid VCS connections for a user
CREATE OR REPLACE FUNCTION get_valid_vcs_connections(p_user_id UUID)
RETURNS TABLE (
  id UUID,
  provider TEXT,
  instance_url TEXT,
  provider_username TEXT,
  has_refresh_token BOOLEAN,
  expires_soon BOOLEAN
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    vc.id,
    vc.provider,
    vc.instance_url,
    vc.provider_username,
    vc.refresh_token IS NOT NULL as has_refresh_token,
    CASE 
      WHEN vc.token_expires_at IS NULL THEN false
      WHEN vc.token_expires_at < NOW() + INTERVAL '5 minutes' THEN true
      ELSE false
    END as expires_soon
  FROM user_vcs_connections vc
  WHERE vc.user_id = p_user_id
    AND (vc.token_expires_at IS NULL OR vc.token_expires_at > NOW());
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Add comment for documentation
COMMENT ON TABLE user_vcs_connections IS 'Unified storage for all VCS provider connections (GitHub, GitLab, Bitbucket)';
COMMENT ON COLUMN user_vcs_connections.provider IS 'VCS provider type: github, gitlab, or bitbucket';
COMMENT ON COLUMN user_vcs_connections.instance_url IS 'Base URL for self-hosted instances (null for cloud versions)';
COMMENT ON COLUMN user_vcs_connections.metadata IS 'Provider-specific metadata like scopes, permissions, etc';