-- Create user_notion_connections table for storing Notion OAuth tokens and workspace info
CREATE TABLE IF NOT EXISTS user_notion_connections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  access_token text NOT NULL,
  bot_id text NOT NULL,
  workspace_id text NOT NULL,
  workspace_name text NOT NULL,
  workspace_icon text,
  owner_type text NOT NULL CHECK (owner_type IN ('user', 'workspace')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  
  -- Ensure one connection per user
  UNIQUE(user_id)
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_user_notion_connections_user_id ON user_notion_connections(user_id);
CREATE INDEX IF NOT EXISTS idx_user_notion_connections_workspace_id ON user_notion_connections(workspace_id);
CREATE INDEX IF NOT EXISTS idx_user_notion_connections_updated_at ON user_notion_connections(updated_at);

-- Enable Row Level Security
ALTER TABLE user_notion_connections ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own Notion connections" ON user_notion_connections
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own Notion connections" ON user_notion_connections
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own Notion connections" ON user_notion_connections
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own Notion connections" ON user_notion_connections
  FOR DELETE USING (auth.uid() = user_id);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_user_notion_connections_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update updated_at on row updates
CREATE TRIGGER update_user_notion_connections_updated_at
  BEFORE UPDATE ON user_notion_connections
  FOR EACH ROW
  EXECUTE FUNCTION update_user_notion_connections_updated_at();

-- Comments for documentation
COMMENT ON TABLE user_notion_connections IS 'Stores Notion OAuth connections for users';
COMMENT ON COLUMN user_notion_connections.user_id IS 'Reference to the user who owns this connection';
COMMENT ON COLUMN user_notion_connections.access_token IS 'Notion OAuth access token for API calls';
COMMENT ON COLUMN user_notion_connections.bot_id IS 'Notion bot ID associated with the integration';
COMMENT ON COLUMN user_notion_connections.workspace_id IS 'Notion workspace ID where the integration is installed';
COMMENT ON COLUMN user_notion_connections.workspace_name IS 'Human-readable name of the Notion workspace';
COMMENT ON COLUMN user_notion_connections.workspace_icon IS 'Optional icon URL for the workspace';
COMMENT ON COLUMN user_notion_connections.owner_type IS 'Whether the integration was added by a user or workspace admin';