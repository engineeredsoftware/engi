-- Create user_gitlab_connections table for storing GitLab OAuth tokens and user info
CREATE TABLE IF NOT EXISTS user_gitlab_connections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  access_token text NOT NULL,
  refresh_token text,
  token_expires_at timestamptz,
  gitlab_user_id integer NOT NULL,
  username text NOT NULL,
  name text NOT NULL,
  email text NOT NULL,
  avatar_url text,
  web_url text NOT NULL,
  gitlab_instance_url text NOT NULL DEFAULT 'https://gitlab.com',
  scopes text[] NOT NULL DEFAULT ARRAY['api', 'read_user', 'read_repository'],
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  
  -- Ensure one connection per user per GitLab instance
  UNIQUE(user_id, gitlab_instance_url)
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_user_gitlab_connections_user_id ON user_gitlab_connections(user_id);
CREATE INDEX IF NOT EXISTS idx_user_gitlab_connections_gitlab_user_id ON user_gitlab_connections(gitlab_user_id);
CREATE INDEX IF NOT EXISTS idx_user_gitlab_connections_updated_at ON user_gitlab_connections(updated_at);
CREATE INDEX IF NOT EXISTS idx_user_gitlab_connections_token_expires_at ON user_gitlab_connections(token_expires_at);
CREATE INDEX IF NOT EXISTS idx_user_gitlab_connections_instance_url ON user_gitlab_connections(gitlab_instance_url);

-- Enable Row Level Security
ALTER TABLE user_gitlab_connections ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own GitLab connections" ON user_gitlab_connections
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own GitLab connections" ON user_gitlab_connections
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own GitLab connections" ON user_gitlab_connections
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own GitLab connections" ON user_gitlab_connections
  FOR DELETE USING (auth.uid() = user_id);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_user_gitlab_connections_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update updated_at on row updates
CREATE TRIGGER update_user_gitlab_connections_updated_at
  BEFORE UPDATE ON user_gitlab_connections
  FOR EACH ROW
  EXECUTE FUNCTION update_user_gitlab_connections_updated_at();

-- Comments for documentation
COMMENT ON TABLE user_gitlab_connections IS 'Stores GitLab OAuth connections for users';
COMMENT ON COLUMN user_gitlab_connections.user_id IS 'Reference to the user who owns this connection';
COMMENT ON COLUMN user_gitlab_connections.access_token IS 'GitLab OAuth access token for API calls';
COMMENT ON COLUMN user_gitlab_connections.refresh_token IS 'GitLab OAuth refresh token for token renewal';
COMMENT ON COLUMN user_gitlab_connections.token_expires_at IS 'When the access token expires';
COMMENT ON COLUMN user_gitlab_connections.gitlab_user_id IS 'GitLab user ID';
COMMENT ON COLUMN user_gitlab_connections.username IS 'GitLab username';
COMMENT ON COLUMN user_gitlab_connections.name IS 'GitLab user display name';
COMMENT ON COLUMN user_gitlab_connections.email IS 'GitLab user email address';
COMMENT ON COLUMN user_gitlab_connections.avatar_url IS 'GitLab user avatar URL';
COMMENT ON COLUMN user_gitlab_connections.web_url IS 'GitLab user profile URL';
COMMENT ON COLUMN user_gitlab_connections.gitlab_instance_url IS 'GitLab instance URL (default: gitlab.com)';
COMMENT ON COLUMN user_gitlab_connections.scopes IS 'OAuth scopes granted for this connection';