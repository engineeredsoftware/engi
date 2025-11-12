-- Migration: Create pipeline recovery and monitoring tables
-- Purpose: Support pipeline health monitoring and automated recovery

-- Pipeline recovery actions log
CREATE TABLE IF NOT EXISTS public.pipeline_recovery_actions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  pipeline_id uuid NOT NULL,
  action_type text NOT NULL CHECK (action_type IN ('retry', 'restart', 'abort', 'escalate')),
  reason text NOT NULL,
  metadata jsonb DEFAULT '{}',
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'executing', 'executed', 'failed')),
  executed_at timestamptz,
  created_at timestamptz DEFAULT now() NOT NULL
);

-- Admin alerts for pipeline issues
CREATE TABLE IF NOT EXISTS public.admin_alerts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL,
  pipeline_id uuid,
  message text NOT NULL,
  metadata jsonb DEFAULT '{}',
  severity text NOT NULL DEFAULT 'medium' CHECK (severity IN ('low', 'medium', 'high', 'critical')),
  status text NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'acknowledged', 'resolved')),
  acknowledged_by uuid REFERENCES auth.users(id),
  acknowledged_at timestamptz,
  resolved_at timestamptz,
  created_at timestamptz DEFAULT now() NOT NULL
);

-- Indexes for efficient querying
CREATE INDEX idx_pipeline_recovery_actions_pipeline ON pipeline_recovery_actions (pipeline_id);
CREATE INDEX idx_pipeline_recovery_actions_status ON pipeline_recovery_actions (status, created_at);
CREATE INDEX idx_admin_alerts_status ON admin_alerts (status, severity, created_at);
CREATE INDEX idx_admin_alerts_type ON admin_alerts (type, created_at);

-- RLS policies
ALTER TABLE pipeline_recovery_actions ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_alerts ENABLE ROW LEVEL SECURITY;

-- Admin/ops access to recovery actions
CREATE POLICY "Admin access to recovery actions" ON pipeline_recovery_actions
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.user_profiles 
      WHERE user_profiles.user_id = auth.uid() 
      AND user_profiles.role IN ('admin', 'ops')
    )
  );

-- Admin/ops access to alerts
CREATE POLICY "Admin access to alerts" ON admin_alerts
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.user_profiles 
      WHERE user_profiles.user_id = auth.uid() 
      AND user_profiles.role IN ('admin', 'ops')
    )
  );

-- Function to process pending recovery actions
CREATE OR REPLACE FUNCTION public.process_pending_recovery_actions()
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  processed_count integer := 0;
  action_record record;
BEGIN
  -- Get pending recovery actions
  FOR action_record IN 
    SELECT * FROM pipeline_recovery_actions 
    WHERE status = 'pending'
    ORDER BY created_at
    LIMIT 10
  LOOP
    -- Mark as executing
    UPDATE pipeline_recovery_actions 
    SET status = 'executing',
        executed_at = now()
    WHERE id = action_record.id;
    
    -- Here external system would process the action
    -- For now, just mark as executed
    UPDATE pipeline_recovery_actions 
    SET status = 'executed'
    WHERE id = action_record.id;
    
    processed_count := processed_count + 1;
  END LOOP;
  
  -- Clean up old completed actions (older than 30 days)
  DELETE FROM pipeline_recovery_actions 
  WHERE status IN ('executed', 'failed')
    AND created_at < now() - interval '30 days';
  
  RETURN processed_count;
END;
$$;

-- Function to create admin alert
CREATE OR REPLACE FUNCTION public.create_admin_alert(
  alert_type text,
  alert_message text,
  alert_pipeline_id uuid DEFAULT NULL,
  alert_metadata jsonb DEFAULT '{}',
  alert_severity text DEFAULT 'medium'
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  alert_id uuid;
BEGIN
  INSERT INTO admin_alerts (type, pipeline_id, message, metadata, severity)
  VALUES (alert_type, alert_pipeline_id, alert_message, alert_metadata, alert_severity)
  RETURNING id INTO alert_id;
  
  RETURN alert_id;
END;
$$;

-- Grant execute permissions
GRANT EXECUTE ON FUNCTION public.process_pending_recovery_actions() TO service_role;
GRANT EXECUTE ON FUNCTION public.create_admin_alert(text, text, uuid, jsonb, text) TO service_role;