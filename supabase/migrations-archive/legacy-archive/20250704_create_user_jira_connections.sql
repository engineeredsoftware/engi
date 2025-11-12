-- Create user_jira_connections table for storing Jira OAuth tokens and API credentials
CREATE TABLE IF NOT EXISTS user_jira_connections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  base_url text NOT NULL,
  cloud_id text,
  access_token text,
  refresh_token text,
  token_expires_at timestamptz,
  email text,
  api_token text,
  account_id text NOT NULL,
  display_name text NOT NULL,
  email_address text NOT NULL,
  auth_type text NOT NULL CHECK (auth_type IN ('oauth', 'api_token')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  
  -- Ensure one connection per user
  UNIQUE(user_id),
  
  -- Ensure proper auth configuration
  CONSTRAINT check_oauth_auth CHECK (
    auth_type != 'oauth' OR (
      access_token IS NOT NULL AND 
      cloud_id IS NOT NULL
    )
  ),
  CONSTRAINT check_api_token_auth CHECK (
    auth_type != 'api_token' OR (
      email IS NOT NULL AND 
      api_token IS NOT NULL
    )
  )
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_user_jira_connections_user_id ON user_jira_connections(user_id);
CREATE INDEX IF NOT EXISTS idx_user_jira_connections_base_url ON user_jira_connections(base_url);
CREATE INDEX IF NOT EXISTS idx_user_jira_connections_cloud_id ON user_jira_connections(cloud_id);
CREATE INDEX IF NOT EXISTS idx_user_jira_connections_account_id ON user_jira_connections(account_id);
CREATE INDEX IF NOT EXISTS idx_user_jira_connections_auth_type ON user_jira_connections(auth_type);
CREATE INDEX IF NOT EXISTS idx_user_jira_connections_updated_at ON user_jira_connections(updated_at);
CREATE INDEX IF NOT EXISTS idx_user_jira_connections_token_expires_at ON user_jira_connections(token_expires_at);

-- Enable Row Level Security
ALTER TABLE user_jira_connections ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own Jira connections" ON user_jira_connections
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own Jira connections" ON user_jira_connections
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own Jira connections" ON user_jira_connections
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own Jira connections" ON user_jira_connections
  FOR DELETE USING (auth.uid() = user_id);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_user_jira_connections_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update updated_at on row updates
CREATE TRIGGER update_user_jira_connections_updated_at
  BEFORE UPDATE ON user_jira_connections
  FOR EACH ROW
  EXECUTE FUNCTION update_user_jira_connections_updated_at();

-- Comments for documentation
COMMENT ON TABLE user_jira_connections IS 'Stores Jira OAuth and API token connections for users';
COMMENT ON COLUMN user_jira_connections.user_id IS 'Reference to the user who owns this connection';
COMMENT ON COLUMN user_jira_connections.base_url IS 'Base URL of the Jira instance (e.g., https://company.atlassian.net)';
COMMENT ON COLUMN user_jira_connections.cloud_id IS 'Atlassian Cloud ID for OAuth connections';
COMMENT ON COLUMN user_jira_connections.access_token IS 'OAuth access token for API calls';
COMMENT ON COLUMN user_jira_connections.refresh_token IS 'OAuth refresh token for token renewal';
COMMENT ON COLUMN user_jira_connections.token_expires_at IS 'When the OAuth access token expires';
COMMENT ON COLUMN user_jira_connections.email IS 'Email address for API token authentication';
COMMENT ON COLUMN user_jira_connections.api_token IS 'Jira API token for basic authentication';
COMMENT ON COLUMN user_jira_connections.account_id IS 'Jira user account ID';
COMMENT ON COLUMN user_jira_connections.display_name IS 'Jira user display name';
COMMENT ON COLUMN user_jira_connections.email_address IS 'Jira user email address';
COMMENT ON COLUMN user_jira_connections.auth_type IS 'Authentication method used (oauth or api_token)';