-- Create VCS webhooks table
CREATE TABLE IF NOT EXISTS vcs_webhooks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider TEXT NOT NULL CHECK (provider IN ('github', 'gitlab', 'bitbucket')),
  webhook_id TEXT NOT NULL, -- Provider's webhook ID
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  owner TEXT NOT NULL, -- Repository owner/organization
  repo TEXT NOT NULL, -- Repository name
  webhook_url TEXT NOT NULL,
  events TEXT[] NOT NULL,
  secret TEXT, -- Webhook secret for signature verification
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Ensure unique webhook per provider, owner, repo
  UNIQUE(provider, owner, repo, webhook_id)
);

-- Create indexes
CREATE INDEX idx_vcs_webhooks_provider ON vcs_webhooks(provider);
CREATE INDEX idx_vcs_webhooks_user_id ON vcs_webhooks(user_id);
CREATE INDEX idx_vcs_webhooks_repo ON vcs_webhooks(provider, owner, repo);
CREATE INDEX idx_vcs_webhooks_active ON vcs_webhooks(active) WHERE active = true;

-- Enable RLS
ALTER TABLE vcs_webhooks ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their own webhooks"
  ON vcs_webhooks
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own webhooks"
  ON vcs_webhooks
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own webhooks"
  ON vcs_webhooks
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own webhooks"
  ON vcs_webhooks
  FOR DELETE
  USING (auth.uid() = user_id);

-- Create webhook events table for tracking
CREATE TABLE IF NOT EXISTS vcs_webhook_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  webhook_id UUID NOT NULL REFERENCES vcs_webhooks(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  common_event_type TEXT,
  payload JSONB NOT NULL,
  processed BOOLEAN DEFAULT false,
  processing_result JSONB,
  received_at TIMESTAMPTZ DEFAULT NOW(),
  processed_at TIMESTAMPTZ,
  
  -- Add constraint to set processed_at when processed is true
  CONSTRAINT processed_at_check CHECK (
    (processed = false AND processed_at IS NULL) OR
    (processed = true AND processed_at IS NOT NULL)
  )
);

-- Create indexes for webhook events
CREATE INDEX idx_vcs_webhook_events_webhook_id ON vcs_webhook_events(webhook_id);
CREATE INDEX idx_vcs_webhook_events_event_type ON vcs_webhook_events(event_type);
CREATE INDEX idx_vcs_webhook_events_received_at ON vcs_webhook_events(received_at DESC);
CREATE INDEX idx_vcs_webhook_events_processed ON vcs_webhook_events(processed);

-- Enable RLS
ALTER TABLE vcs_webhook_events ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for webhook events
CREATE POLICY "Users can view webhook events for their webhooks"
  ON vcs_webhook_events
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM vcs_webhooks
      WHERE vcs_webhooks.id = vcs_webhook_events.webhook_id
      AND vcs_webhooks.user_id = auth.uid()
    )
  );

-- Function to update webhook timestamp
CREATE OR REPLACE FUNCTION update_vcs_webhook_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for webhook updates
CREATE TRIGGER update_vcs_webhook_updated_at
  BEFORE UPDATE ON vcs_webhooks
  FOR EACH ROW
  EXECUTE FUNCTION update_vcs_webhook_updated_at();

-- Function to set processed_at when marking event as processed
CREATE OR REPLACE FUNCTION set_webhook_event_processed_at()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.processed = true AND OLD.processed = false THEN
    NEW.processed_at = NOW();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for webhook event processing
CREATE TRIGGER set_webhook_event_processed_at
  BEFORE UPDATE ON vcs_webhook_events
  FOR EACH ROW
  WHEN (NEW.processed IS DISTINCT FROM OLD.processed)
  EXECUTE FUNCTION set_webhook_event_processed_at();

-- Create view for webhook statistics
CREATE OR REPLACE VIEW vcs_webhook_stats AS
SELECT 
  w.id,
  w.provider,
  w.owner,
  w.repo,
  w.active,
  COUNT(DISTINCT e.id) as total_events,
  COUNT(DISTINCT e.id) FILTER (WHERE e.processed = true) as processed_events,
  COUNT(DISTINCT e.id) FILTER (WHERE e.processed = false) as pending_events,
  MAX(e.received_at) as last_event_at,
  w.created_at
FROM vcs_webhooks w
LEFT JOIN vcs_webhook_events e ON w.id = e.webhook_id
GROUP BY w.id, w.provider, w.owner, w.repo, w.active, w.created_at;

-- Grant permissions on the view
GRANT SELECT ON vcs_webhook_stats TO authenticated;

-- Function to clean up old webhook events (retention: 30 days)
CREATE OR REPLACE FUNCTION cleanup_old_webhook_events()
RETURNS void AS $$
BEGIN
  DELETE FROM vcs_webhook_events
  WHERE received_at < NOW() - INTERVAL '30 days'
  AND processed = true;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Add comments for documentation
COMMENT ON TABLE vcs_webhooks IS 'Stores webhook configurations for VCS providers';
COMMENT ON TABLE vcs_webhook_events IS 'Tracks received webhook events and their processing status';
COMMENT ON VIEW vcs_webhook_stats IS 'Aggregated statistics for webhook usage and processing';