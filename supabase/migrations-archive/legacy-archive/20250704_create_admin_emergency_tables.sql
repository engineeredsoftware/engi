-- Migration: Create admin emergency controls and system settings tables
-- Purpose: Support emergency admin controls and system configuration

-- System settings for global configuration
CREATE TABLE IF NOT EXISTS public.system_settings (
  key text PRIMARY KEY,
  value jsonb NOT NULL,
  description text,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Admin emergency actions log
CREATE TABLE IF NOT EXISTS public.admin_emergency_actions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  action text NOT NULL,
  target text,
  params jsonb DEFAULT '{}',
  result jsonb DEFAULT '{}',
  executed_by uuid REFERENCES auth.users(id),
  executed_at timestamptz DEFAULT now() NOT NULL
);

-- RLS policies
ALTER TABLE system_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_emergency_actions ENABLE ROW LEVEL SECURITY;

-- Admin access to system settings
CREATE POLICY "Admin access to system settings" ON system_settings
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.user_profiles 
      WHERE user_profiles.user_id = auth.uid() 
      AND user_profiles.role IN ('admin', 'ops')
    )
  );

-- Public read access to specific system settings (like maintenance mode)
CREATE POLICY "Public read access to maintenance settings" ON system_settings
  FOR SELECT USING (key IN ('maintenance_mode', 'system_status'));

-- Admin access to emergency actions
CREATE POLICY "Admin access to emergency actions" ON admin_emergency_actions
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.user_profiles 
      WHERE user_profiles.user_id = auth.uid() 
      AND user_profiles.role IN ('admin', 'ops')
    )
  );

-- Indexes
CREATE INDEX idx_system_settings_key ON system_settings (key);
CREATE INDEX idx_admin_emergency_actions_action ON admin_emergency_actions (action, executed_at);
CREATE INDEX idx_admin_emergency_actions_executed_by ON admin_emergency_actions (executed_by, executed_at);

-- Function to get system health summary
CREATE OR REPLACE FUNCTION public.get_system_health_summary()
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result json;
  error_count integer;
  stuck_pipeline_count integer;
  maintenance_enabled boolean;
BEGIN
  -- Get error counts from last 24 hours
  SELECT COUNT(*) INTO error_count
  FROM error_reports 
  WHERE created_at >= now() - interval '24 hours'
    AND severity IN ('high', 'critical');
  
  -- Get stuck pipeline count
  SELECT COUNT(*) INTO stuck_pipeline_count
  FROM pipeline_recovery_actions 
  WHERE action_type = 'escalate'
    AND created_at >= now() - interval '2 hours';
  
  -- Check maintenance mode
  SELECT COALESCE((value->>'enabled')::boolean, false) INTO maintenance_enabled
  FROM system_settings 
  WHERE key = 'maintenance_mode';
  
  SELECT json_build_object(
    'timestamp', now(),
    'overall_health', CASE 
      WHEN maintenance_enabled THEN 'maintenance'
      WHEN error_count > 10 OR stuck_pipeline_count > 5 THEN 'degraded'
      WHEN error_count > 0 OR stuck_pipeline_count > 0 THEN 'warning'
      ELSE 'healthy'
    END,
    'error_count_24h', error_count,
    'stuck_pipelines', stuck_pipeline_count,
    'maintenance_mode', maintenance_enabled,
    'last_emergency_action', (
      SELECT json_build_object(
        'action', action,
        'executed_at', executed_at
      )
      FROM admin_emergency_actions 
      ORDER BY executed_at DESC 
      LIMIT 1
    )
  ) INTO result;
  
  RETURN result;
END;
$$;

-- Function to enable/disable maintenance mode
CREATE OR REPLACE FUNCTION public.set_maintenance_mode(
  enabled boolean,
  reason text DEFAULT NULL,
  estimated_duration text DEFAULT NULL
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Check if user has admin role
  IF NOT EXISTS (
    SELECT 1 FROM public.user_profiles 
    WHERE user_profiles.user_id = auth.uid() 
    AND user_profiles.role IN ('admin', 'ops')
  ) THEN
    RAISE EXCEPTION 'Insufficient permissions';
  END IF;
  
  INSERT INTO system_settings (key, value)
  VALUES ('maintenance_mode', json_build_object(
    'enabled', enabled,
    'reason', reason,
    'estimatedDuration', estimated_duration,
    'updatedAt', now(),
    'updatedBy', auth.uid()
  ))
  ON CONFLICT (key) 
  DO UPDATE SET 
    value = EXCLUDED.value,
    updated_at = now();
  
  -- Log the action
  INSERT INTO admin_emergency_actions (action, target, params, executed_by)
  VALUES (
    CASE WHEN enabled THEN 'enable_maintenance_mode' ELSE 'disable_maintenance_mode' END,
    'system',
    json_build_object('reason', reason, 'estimatedDuration', estimated_duration),
    auth.uid()
  );
  
  RETURN true;
END;
$$;

-- Grant execute permissions
GRANT EXECUTE ON FUNCTION public.get_system_health_summary() TO authenticated, anon;
GRANT EXECUTE ON FUNCTION public.set_maintenance_mode(boolean, text, text) TO authenticated;

-- Insert default system settings
INSERT INTO system_settings (key, value, description) 
VALUES 
  ('maintenance_mode', '{"enabled": false}', 'Global maintenance mode flag'),
  ('system_status', '{"initialized": true}', 'System initialization status')
ON CONFLICT (key) DO NOTHING;