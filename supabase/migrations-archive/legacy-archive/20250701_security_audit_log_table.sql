-- Security Audit Log Table
-- Creates a comprehensive audit trail for security-related events
-- including authentication, authorization, and cross-system operations

CREATE TABLE security_audit_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type text NOT NULL,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  request_id text NOT NULL,
  metadata jsonb,
  ip_address inet,
  user_agent text,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX idx_security_audit_log_user_id_created_at ON security_audit_log(user_id, created_at DESC);
CREATE INDEX idx_security_audit_log_event_type_created_at ON security_audit_log(event_type, created_at DESC);
CREATE INDEX idx_security_audit_log_request_id ON security_audit_log(request_id);

-- Enable Row Level Security
ALTER TABLE security_audit_log ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Users can only view their own audit logs
CREATE POLICY "Users can view own audit logs" ON security_audit_log
  FOR SELECT
  USING (auth.uid() = user_id);

-- RLS Policy: Only authenticated users can insert audit logs
CREATE POLICY "Authenticated users can insert audit logs" ON security_audit_log
  FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

-- Add helpful comments
COMMENT ON TABLE security_audit_log IS 'Comprehensive audit trail for security events including authentication, authorization, and cross-system operations';
COMMENT ON COLUMN security_audit_log.event_type IS 'Type of security event (e.g., cross_system_otf_instruction, login_attempt, etc.)';
COMMENT ON COLUMN security_audit_log.request_id IS 'Unique identifier for the request that triggered this audit event';
COMMENT ON COLUMN security_audit_log.metadata IS 'Additional context data specific to the event type';
COMMENT ON COLUMN security_audit_log.ip_address IS 'IP address of the client making the request';
COMMENT ON COLUMN security_audit_log.user_agent IS 'User agent string from the client request';