-- Migration: Create error reporting and user feedback tables
-- Purpose: Comprehensive error tracking and user communication

-- Error reports for analysis and trending
CREATE TABLE IF NOT EXISTS public.error_reports (
  id text PRIMARY KEY,
  type text NOT NULL,
  severity text NOT NULL CHECK (severity IN ('low', 'medium', 'high', 'critical')),
  message text NOT NULL,
  user_message text NOT NULL,
  technical_details jsonb DEFAULT '{}',
  suggested_actions text[],
  estimated_resolution text,
  affected_services text[],
  user_id uuid REFERENCES auth.users(id),
  pipeline_id uuid,
  correlation_id text,
  metadata jsonb DEFAULT '{}',
  resolved_at timestamptz,
  created_at timestamptz DEFAULT now() NOT NULL
);

-- Pipeline progress tracking
CREATE TABLE IF NOT EXISTS public.pipeline_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  pipeline_id uuid NOT NULL,
  user_id uuid NOT NULL REFERENCES auth.users(id),
  phase text NOT NULL,
  progress integer NOT NULL CHECK (progress >= 0 AND progress <= 100),
  details text,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL,
  UNIQUE(pipeline_id, phase)
);

-- User notification preferences
CREATE TABLE IF NOT EXISTS public.user_notification_preferences (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id),
  email_enabled boolean DEFAULT true,
  in_app_enabled boolean DEFAULT true,
  error_notifications boolean DEFAULT true,
  success_notifications boolean DEFAULT true,
  progress_updates boolean DEFAULT false,
  quiet_hours_start time,
  quiet_hours_end time,
  timezone text DEFAULT 'UTC',
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Indexes for efficient querying
CREATE INDEX idx_error_reports_type_severity ON error_reports (type, severity, created_at);
CREATE INDEX idx_error_reports_user ON error_reports (user_id, created_at);
CREATE INDEX idx_error_reports_pipeline ON error_reports (pipeline_id);
CREATE INDEX idx_error_reports_correlation ON error_reports (correlation_id);
CREATE INDEX idx_error_reports_unresolved ON error_reports (created_at) WHERE resolved_at IS NULL;

CREATE INDEX idx_pipeline_progress_pipeline ON pipeline_progress (pipeline_id, updated_at);
CREATE INDEX idx_pipeline_progress_user ON pipeline_progress (user_id, updated_at);

-- RLS policies
ALTER TABLE error_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE pipeline_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_notification_preferences ENABLE ROW LEVEL SECURITY;

-- Users can view their own error reports
CREATE POLICY "Users can view own error reports" ON error_reports
  FOR SELECT USING (user_id = auth.uid());

-- Admins can view all error reports
CREATE POLICY "Admins can view all error reports" ON error_reports
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.user_profiles 
      WHERE user_profiles.user_id = auth.uid() 
      AND user_profiles.role IN ('admin', 'ops')
    )
  );

-- Users can view their own pipeline progress
CREATE POLICY "Users can view own pipeline progress" ON pipeline_progress
  FOR SELECT USING (user_id = auth.uid());

-- Service role can update pipeline progress
CREATE POLICY "Service can update pipeline progress" ON pipeline_progress
  FOR ALL USING (auth.role() = 'service_role');

-- Users can manage their own notification preferences
CREATE POLICY "Users can manage own notification preferences" ON user_notification_preferences
  FOR ALL USING (user_id = auth.uid());

-- Function to get error report statistics
CREATE OR REPLACE FUNCTION public.get_error_report_stats(
  hours_back integer DEFAULT 24
)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result json;
BEGIN
  SELECT json_build_object(
    'total_errors', COUNT(*),
    'by_severity', json_object_agg(severity, severity_count),
    'by_type', json_object_agg(type, type_count),
    'unresolved', COUNT(*) FILTER (WHERE resolved_at IS NULL),
    'avg_resolution_time_hours', 
      EXTRACT(EPOCH FROM AVG(resolved_at - created_at))/3600
  ) INTO result
  FROM (
    SELECT 
      severity,
      type,
      resolved_at,
      created_at,
      COUNT(*) OVER (PARTITION BY severity) as severity_count,
      COUNT(*) OVER (PARTITION BY type) as type_count
    FROM error_reports 
    WHERE created_at >= now() - (hours_back || ' hours')::interval
  ) stats;
  
  RETURN result;
END;
$$;

-- Function to resolve error reports
CREATE OR REPLACE FUNCTION public.resolve_error_report(
  report_id text,
  resolution_notes text DEFAULT NULL
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE error_reports 
  SET resolved_at = now(),
      metadata = metadata || json_build_object('resolution_notes', resolution_notes)::jsonb
  WHERE id = report_id
    AND resolved_at IS NULL;
  
  RETURN FOUND;
END;
$$;

-- Function to clean up old resolved error reports
CREATE OR REPLACE FUNCTION public.cleanup_old_error_reports()
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  deleted_count integer;
BEGIN
  -- Delete resolved error reports older than 90 days
  DELETE FROM error_reports 
  WHERE resolved_at IS NOT NULL 
    AND resolved_at < now() - interval '90 days';
  
  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  
  -- Delete old pipeline progress records (older than 30 days)
  DELETE FROM pipeline_progress 
  WHERE updated_at < now() - interval '30 days';
  
  RETURN deleted_count;
END;
$$;

-- Grant execute permissions
GRANT EXECUTE ON FUNCTION public.get_error_report_stats(integer) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.resolve_error_report(text, text) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.cleanup_old_error_reports() TO service_role;

-- Insert default notification preferences for existing users
INSERT INTO user_notification_preferences (user_id)
SELECT id FROM auth.users 
WHERE id NOT IN (SELECT user_id FROM user_notification_preferences)
ON CONFLICT (user_id) DO NOTHING;