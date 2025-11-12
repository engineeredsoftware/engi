-- Create user_figma_connections table for storing Figma OAuth tokens and team info
CREATE TABLE IF NOT EXISTS user_figma_connections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  access_token text NOT NULL,
  refresh_token text,
  token_expires_at timestamptz,
  team_id text NOT NULL,
  team_name text NOT NULL,
  user_name text NOT NULL,
  user_email text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  
  -- Ensure one connection per user
  UNIQUE(user_id)
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_user_figma_connections_user_id ON user_figma_connections(user_id);
CREATE INDEX IF NOT EXISTS idx_user_figma_connections_team_id ON user_figma_connections(team_id);
CREATE INDEX IF NOT EXISTS idx_user_figma_connections_updated_at ON user_figma_connections(updated_at);
CREATE INDEX IF NOT EXISTS idx_user_figma_connections_token_expires_at ON user_figma_connections(token_expires_at);

-- Enable Row Level Security
ALTER TABLE user_figma_connections ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own Figma connections" ON user_figma_connections
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own Figma connections" ON user_figma_connections
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own Figma connections" ON user_figma_connections
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own Figma connections" ON user_figma_connections
  FOR DELETE USING (auth.uid() = user_id);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_user_figma_connections_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update updated_at on row updates
CREATE TRIGGER update_user_figma_connections_updated_at
  BEFORE UPDATE ON user_figma_connections
  FOR EACH ROW
  EXECUTE FUNCTION update_user_figma_connections_updated_at();

-- Comments for documentation
COMMENT ON TABLE user_figma_connections IS 'Stores Figma OAuth connections for users';
COMMENT ON COLUMN user_figma_connections.user_id IS 'Reference to the user who owns this connection';
COMMENT ON COLUMN user_figma_connections.access_token IS 'Figma OAuth access token for API calls';
COMMENT ON COLUMN user_figma_connections.refresh_token IS 'Figma OAuth refresh token for token renewal';
COMMENT ON COLUMN user_figma_connections.token_expires_at IS 'When the access token expires';
COMMENT ON COLUMN user_figma_connections.team_id IS 'Figma team ID where the integration is installed';
COMMENT ON COLUMN user_figma_connections.team_name IS 'Human-readable name of the Figma team';
COMMENT ON COLUMN user_figma_connections.user_name IS 'Figma user display name';
COMMENT ON COLUMN user_figma_connections.user_email IS 'Figma user email address';