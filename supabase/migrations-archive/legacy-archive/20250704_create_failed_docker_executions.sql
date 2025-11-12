-- Migration: Create failed Docker executions table for resilience
-- Purpose: Queue failed Docker executions for retry during system recovery

CREATE TABLE IF NOT EXISTS public.failed_docker_executions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  installation_id text NOT NULL,
  repository text NOT NULL,
  owner text NOT NULL,
  issue_number integer NOT NULL,
  task_type text NOT NULL,
  trigger text,
  command text NOT NULL,
  correlation_id text NOT NULL,
  failure_reason text,
  retry_count integer DEFAULT 0,
  scheduled_for timestamptz NOT NULL,
  processed_at timestamptz,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Indexes for efficient querying
CREATE INDEX idx_failed_docker_executions_scheduled ON failed_docker_executions (scheduled_for)
  WHERE processed_at IS NULL;

CREATE INDEX idx_failed_docker_executions_correlation ON failed_docker_executions (correlation_id);

CREATE INDEX idx_failed_docker_executions_repo ON failed_docker_executions (owner, repository);

-- RLS policy
ALTER TABLE failed_docker_executions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin access to failed executions" ON failed_docker_executions
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.user_profiles 
      WHERE user_profiles.user_id = auth.uid() 
      AND user_profiles.role IN ('admin', 'ops')
    )
  );

-- Function to process queued executions
CREATE OR REPLACE FUNCTION public.process_queued_docker_executions()
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  processed_count integer := 0;
  exec_record record;
BEGIN
  -- Get executions ready for retry
  FOR exec_record IN 
    SELECT * FROM failed_docker_executions 
    WHERE processed_at IS NULL 
      AND scheduled_for <= now()
      AND retry_count < 3
    ORDER BY scheduled_for
    LIMIT 10
  LOOP
    -- Mark as processed (will be handled by external retry mechanism)
    UPDATE failed_docker_executions 
    SET processed_at = now(),
        retry_count = retry_count + 1,
        updated_at = now()
    WHERE id = exec_record.id;
    
    processed_count := processed_count + 1;
  END LOOP;
  
  -- Clean up old processed records (older than 7 days)
  DELETE FROM failed_docker_executions 
  WHERE processed_at IS NOT NULL 
    AND processed_at < now() - interval '7 days';
  
  RETURN processed_count;
END;
$$;

-- Grant execute permission to service role
GRANT EXECUTE ON FUNCTION public.process_queued_docker_executions() TO service_role;