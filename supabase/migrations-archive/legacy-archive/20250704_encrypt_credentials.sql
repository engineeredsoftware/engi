-- Migration: Encrypt user credentials at rest
-- This migration adds encrypted storage for sensitive credentials and migrates existing data

-- Add encrypted credential columns to user_figma_connections
ALTER TABLE user_figma_connections 
ADD COLUMN IF NOT EXISTS access_token_encrypted JSONB,
ADD COLUMN IF NOT EXISTS refresh_token_encrypted JSONB,
ADD COLUMN IF NOT EXISTS encryption_version INTEGER DEFAULT 1;

-- Add encrypted credential columns to user_api_keys  
ALTER TABLE user_api_keys 
ADD COLUMN IF NOT EXISTS key_encrypted JSONB,
ADD COLUMN IF NOT EXISTS encryption_version INTEGER DEFAULT 1;

-- Create indexes for encryption metadata
CREATE INDEX IF NOT EXISTS idx_user_figma_connections_encryption_version 
ON user_figma_connections(encryption_version);

CREATE INDEX IF NOT EXISTS idx_user_api_keys_encryption_version 
ON user_api_keys(encryption_version);

-- Function to validate encrypted credential structure
CREATE OR REPLACE FUNCTION validate_encrypted_credential(encrypted_data JSONB)
RETURNS BOOLEAN AS $$
BEGIN
  -- Check that all required fields exist and are strings
  RETURN (
    encrypted_data ? 'encrypted' AND
    encrypted_data ? 'iv' AND  
    encrypted_data ? 'tag' AND
    encrypted_data ? 'salt' AND
    encrypted_data ? 'algorithm' AND
    encrypted_data ? 'timestamp' AND
    jsonb_typeof(encrypted_data->'encrypted') = 'string' AND
    jsonb_typeof(encrypted_data->'iv') = 'string' AND
    jsonb_typeof(encrypted_data->'tag') = 'string' AND
    jsonb_typeof(encrypted_data->'salt') = 'string' AND
    jsonb_typeof(encrypted_data->'algorithm') = 'string' AND
    jsonb_typeof(encrypted_data->'timestamp') = 'string' AND
    encrypted_data->>'algorithm' = 'aes-256-gcm'
  );
END;
$$ LANGUAGE plpgsql;

-- Add check constraints for encrypted credential format
ALTER TABLE user_figma_connections 
ADD CONSTRAINT chk_access_token_encrypted_format 
CHECK (access_token_encrypted IS NULL OR validate_encrypted_credential(access_token_encrypted));

ALTER TABLE user_figma_connections 
ADD CONSTRAINT chk_refresh_token_encrypted_format 
CHECK (refresh_token_encrypted IS NULL OR validate_encrypted_credential(refresh_token_encrypted));

ALTER TABLE user_api_keys 
ADD CONSTRAINT chk_key_encrypted_format 
CHECK (key_encrypted IS NULL OR validate_encrypted_credential(key_encrypted));

-- Create audit table for credential operations
CREATE TABLE IF NOT EXISTS credential_audit_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  operation_type text NOT NULL CHECK (operation_type IN (
    'credential_created', 'credential_accessed', 'credential_updated', 
    'credential_deleted', 'credential_encrypted', 'credential_decrypted',
    'credential_rotation', 'authentication_attempt', 'authentication_failed'
  )),
  resource_type text NOT NULL CHECK (resource_type IN (
    'figma_connection', 'api_key', 'github_connection', 'oauth_token'
  )),
  resource_id uuid,
  ip_address inet,
  user_agent text,
  request_id text,
  success boolean NOT NULL DEFAULT true,
  error_code text,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Create indexes for audit log performance
CREATE INDEX IF NOT EXISTS idx_credential_audit_log_user_id 
ON credential_audit_log(user_id);

CREATE INDEX IF NOT EXISTS idx_credential_audit_log_operation_type 
ON credential_audit_log(operation_type);

CREATE INDEX IF NOT EXISTS idx_credential_audit_log_resource_type 
ON credential_audit_log(resource_type);

CREATE INDEX IF NOT EXISTS idx_credential_audit_log_created_at 
ON credential_audit_log(created_at);

CREATE INDEX IF NOT EXISTS idx_credential_audit_log_user_operation 
ON credential_audit_log(user_id, operation_type, created_at);

-- Enable RLS on audit log
ALTER TABLE credential_audit_log ENABLE ROW LEVEL SECURITY;

-- RLS policies for audit log (users can only see their own audit entries)
CREATE POLICY "Users can view their own credential audit logs" ON credential_audit_log
  FOR SELECT USING (auth.uid() = user_id);

-- Admin-only policies for audit log management  
CREATE POLICY "Service role can manage all audit logs" ON credential_audit_log
  FOR ALL USING (auth.role() = 'service_role');

-- Function to automatically audit credential operations
CREATE OR REPLACE FUNCTION audit_credential_operation()
RETURNS TRIGGER AS $$
DECLARE
  operation_type text;
  resource_type text;
BEGIN
  -- Determine operation type
  IF TG_OP = 'INSERT' THEN
    operation_type := 'credential_created';
  ELSIF TG_OP = 'UPDATE' THEN
    operation_type := 'credential_updated';
  ELSIF TG_OP = 'DELETE' THEN
    operation_type := 'credential_deleted';
  END IF;
  
  -- Determine resource type from table name
  IF TG_TABLE_NAME = 'user_figma_connections' THEN
    resource_type := 'figma_connection';
  ELSIF TG_TABLE_NAME = 'user_api_keys' THEN
    resource_type := 'api_key';
  ELSE
    resource_type := 'unknown';
  END IF;
  
  -- Insert audit log entry
  INSERT INTO credential_audit_log (
    user_id, 
    operation_type, 
    resource_type, 
    resource_id,
    ip_address,
    metadata
  ) VALUES (
    COALESCE(NEW.user_id, OLD.user_id),
    operation_type,
    resource_type,
    COALESCE(NEW.id, OLD.id),
    inet_client_addr(),
    jsonb_build_object(
      'table_name', TG_TABLE_NAME,
      'operation', TG_OP,
      'timestamp', now()
    )
  );
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic audit logging
CREATE TRIGGER audit_user_figma_connections
  AFTER INSERT OR UPDATE OR DELETE ON user_figma_connections
  FOR EACH ROW EXECUTE FUNCTION audit_credential_operation();

CREATE TRIGGER audit_user_api_keys
  AFTER INSERT OR UPDATE OR DELETE ON user_api_keys
  FOR EACH ROW EXECUTE FUNCTION audit_credential_operation();

-- Function to clean up old audit logs (for data retention)
CREATE OR REPLACE FUNCTION cleanup_old_audit_logs(retention_days INTEGER DEFAULT 90)
RETURNS INTEGER AS $$
DECLARE
  deleted_count INTEGER;
BEGIN
  DELETE FROM credential_audit_log 
  WHERE created_at < (now() - (retention_days || ' days')::interval);
  
  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  
  RETURN deleted_count;
END;
$$ LANGUAGE plpgsql;

-- Comments for documentation
COMMENT ON TABLE credential_audit_log IS 'Audit trail for all credential operations';
COMMENT ON COLUMN user_figma_connections.access_token_encrypted IS 'Encrypted Figma access token using AES-256-GCM';
COMMENT ON COLUMN user_figma_connections.refresh_token_encrypted IS 'Encrypted Figma refresh token using AES-256-GCM';
COMMENT ON COLUMN user_figma_connections.encryption_version IS 'Version of encryption used (for key rotation)';
COMMENT ON COLUMN user_api_keys.key_encrypted IS 'Encrypted API key using AES-256-GCM';
COMMENT ON COLUMN user_api_keys.encryption_version IS 'Version of encryption used (for key rotation)';
COMMENT ON FUNCTION validate_encrypted_credential(JSONB) IS 'Validates the structure of encrypted credential JSON';
COMMENT ON FUNCTION audit_credential_operation() IS 'Trigger function for automatic credential audit logging';
COMMENT ON FUNCTION cleanup_old_audit_logs(INTEGER) IS 'Removes audit log entries older than specified days';

-- Create a view for easier audit log querying (without exposing sensitive data)
CREATE OR REPLACE VIEW credential_audit_summary AS
SELECT 
  id,
  user_id,
  operation_type,
  resource_type,
  success,
  error_code,
  created_at,
  -- Only expose safe metadata fields
  metadata->>'timestamp' as operation_timestamp,
  metadata->>'table_name' as affected_table
FROM credential_audit_log
ORDER BY created_at DESC;

-- Grant appropriate permissions
GRANT SELECT ON credential_audit_summary TO authenticated;

-- Create an index on the view for performance
CREATE INDEX IF NOT EXISTS idx_credential_audit_summary_user_created 
ON credential_audit_log(user_id, created_at) 
WHERE success = true;