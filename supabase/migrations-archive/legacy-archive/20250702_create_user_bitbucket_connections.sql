-- Create user_bitbucket_connections table for storing Bitbucket OAuth tokens and workspace info
CREATE TABLE IF NOT EXISTS user_bitbucket_connections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  access_token text NOT NULL,
  refresh_token text,
  token_expires_at timestamptz,
  bitbucket_user_id text NOT NULL,
  username text NOT NULL,
  display_name text NOT NULL,
  email text,
  avatar_url text,
  workspace_slug text NOT NULL,
  workspace_name text NOT NULL,
  scopes text[] NOT NULL DEFAULT ARRAY['repository', 'repository:write', 'pullrequest', 'pullrequest:write'],
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  
  -- Ensure one connection per user per workspace
  UNIQUE(user_id, workspace_slug)
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_user_bitbucket_connections_user_id ON user_bitbucket_connections(user_id);
CREATE INDEX IF NOT EXISTS idx_user_bitbucket_connections_bitbucket_user_id ON user_bitbucket_connections(bitbucket_user_id);
CREATE INDEX IF NOT EXISTS idx_user_bitbucket_connections_workspace_slug ON user_bitbucket_connections(workspace_slug);
CREATE INDEX IF NOT EXISTS idx_user_bitbucket_connections_updated_at ON user_bitbucket_connections(updated_at);
CREATE INDEX IF NOT EXISTS idx_user_bitbucket_connections_token_expires_at ON user_bitbucket_connections(token_expires_at);

-- Enable Row Level Security
ALTER TABLE user_bitbucket_connections ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own Bitbucket connections" ON user_bitbucket_connections
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own Bitbucket connections" ON user_bitbucket_connections
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own Bitbucket connections" ON user_bitbucket_connections
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own Bitbucket connections" ON user_bitbucket_connections
  FOR DELETE USING (auth.uid() = user_id);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_user_bitbucket_connections_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update updated_at on row updates
CREATE TRIGGER update_user_bitbucket_connections_updated_at
  BEFORE UPDATE ON user_bitbucket_connections
  FOR EACH ROW
  EXECUTE FUNCTION update_user_bitbucket_connections_updated_at();

-- Comments for documentation
COMMENT ON TABLE user_bitbucket_connections IS 'Stores Bitbucket OAuth connections for users';
COMMENT ON COLUMN user_bitbucket_connections.user_id IS 'Reference to the user who owns this connection';
COMMENT ON COLUMN user_bitbucket_connections.access_token IS 'Bitbucket OAuth access token for API calls';
COMMENT ON COLUMN user_bitbucket_connections.refresh_token IS 'Bitbucket OAuth refresh token for token renewal';
COMMENT ON COLUMN user_bitbucket_connections.token_expires_at IS 'When the access token expires';
COMMENT ON COLUMN user_bitbucket_connections.bitbucket_user_id IS 'Bitbucket user UUID';
COMMENT ON COLUMN user_bitbucket_connections.username IS 'Bitbucket username';
COMMENT ON COLUMN user_bitbucket_connections.display_name IS 'Bitbucket user display name';
COMMENT ON COLUMN user_bitbucket_connections.email IS 'Bitbucket user email address';
COMMENT ON COLUMN user_bitbucket_connections.avatar_url IS 'Bitbucket user avatar URL';
COMMENT ON COLUMN user_bitbucket_connections.workspace_slug IS 'Bitbucket workspace slug';
COMMENT ON COLUMN user_bitbucket_connections.workspace_name IS 'Human-readable name of the Bitbucket workspace';
COMMENT ON COLUMN user_bitbucket_connections.scopes IS 'OAuth scopes granted for this connection';