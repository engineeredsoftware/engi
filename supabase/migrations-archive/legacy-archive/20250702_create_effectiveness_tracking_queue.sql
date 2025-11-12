-- 20250702_create_effectiveness_tracking_queue.sql
-- Create table for queuing ai_document effectiveness tracking requests

CREATE TABLE IF NOT EXISTS public.ai_document_effectiveness_tracking_queue (
  -- Primary key
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- References
  ai_document_id uuid NOT NULL REFERENCES public.ai_documents(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Context
  repository text NOT NULL,
  ai_document_type text NOT NULL,
  
  -- Tracking status
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  
  -- Tracking window for measuring before/after deliverables
  tracking_window_start timestamptz NOT NULL,
  tracking_window_end timestamptz NOT NULL,
  
  -- Processing metadata
  attempts integer NOT NULL DEFAULT 0,
  last_attempt_at timestamptz,
  error_message text,
  
  -- Timestamps
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  completed_at timestamptz
);

-- Indexes for efficient processing
CREATE INDEX IF NOT EXISTS effectiveness_tracking_queue_status_idx 
  ON public.ai_document_effectiveness_tracking_queue (status);

CREATE INDEX IF NOT EXISTS effectiveness_tracking_queue_ai_document_id_idx 
  ON public.ai_document_effectiveness_tracking_queue (ai_document_id);

CREATE INDEX IF NOT EXISTS effectiveness_tracking_queue_user_id_idx 
  ON public.ai_document_effectiveness_tracking_queue (user_id);

CREATE INDEX IF NOT EXISTS effectiveness_tracking_queue_repository_idx 
  ON public.ai_document_effectiveness_tracking_queue (repository);

CREATE INDEX IF NOT EXISTS effectiveness_tracking_queue_window_end_idx 
  ON public.ai_document_effectiveness_tracking_queue (tracking_window_end);

-- Composite index for queue processing
CREATE INDEX IF NOT EXISTS effectiveness_tracking_queue_processing_idx 
  ON public.ai_document_effectiveness_tracking_queue (status, tracking_window_end, attempts);

-- Enable Row Level Security
ALTER TABLE public.ai_document_effectiveness_tracking_queue ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Users can only see their own tracking requests
CREATE POLICY effectiveness_tracking_queue_owner_policy ON public.ai_document_effectiveness_tracking_queue
  FOR ALL USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Grant permissions
GRANT SELECT, INSERT, UPDATE, DELETE ON public.ai_document_effectiveness_tracking_queue TO authenticated;

-- Add trigger for updated_at
CREATE TRIGGER update_effectiveness_tracking_queue_updated_at 
  BEFORE UPDATE ON public.ai_document_effectiveness_tracking_queue
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Function to process effectiveness tracking queue
CREATE OR REPLACE FUNCTION public.process_effectiveness_tracking_queue()
RETURNS TABLE (
  processed_count integer,
  failed_count integer,
  details jsonb
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  queue_item RECORD;
  processed integer := 0;
  failed integer := 0;
  result_details jsonb := '[]'::jsonb;
BEGIN
  -- Process items where tracking window has ended and status is pending
  FOR queue_item IN 
    SELECT id, ai_document_id, user_id, repository, ai_document_type, tracking_window_start, tracking_window_end
    FROM public.ai_document_effectiveness_tracking_queue
    WHERE status = 'pending' 
      AND tracking_window_end <= NOW()
      AND attempts < 3 -- Max 3 attempts
    ORDER BY created_at
    LIMIT 50 -- Process in batches
  LOOP
    BEGIN
      -- Update status to processing
      UPDATE public.ai_document_effectiveness_tracking_queue 
      SET 
        status = 'processing',
        last_attempt_at = NOW(),
        attempts = attempts + 1,
        updated_at = NOW()
      WHERE id = queue_item.id;
      
      -- TODO: This would call the effectiveness tracking logic
      -- For now, mark as completed (the actual tracking would be done by a worker)
      UPDATE public.ai_document_effectiveness_tracking_queue 
      SET 
        status = 'completed',
        completed_at = NOW(),
        updated_at = NOW()
      WHERE id = queue_item.id;
      
      processed := processed + 1;
      result_details := result_details || jsonb_build_object(
        'id', queue_item.id,
        'ai_document_id', queue_item.ai_document_id,
        'status', 'completed'
      );
      
    EXCEPTION WHEN OTHERS THEN
      -- Mark as failed and log error
      UPDATE public.ai_document_effectiveness_tracking_queue 
      SET 
        status = 'failed',
        error_message = SQLERRM,
        updated_at = NOW()
      WHERE id = queue_item.id;
      
      failed := failed + 1;
      result_details := result_details || jsonb_build_object(
        'id', queue_item.id,
        'ai_document_id', queue_item.ai_document_id,
        'status', 'failed',
        'error', SQLERRM
      );
    END;
  END LOOP;
  
  RETURN QUERY SELECT processed, failed, result_details;
END;
$$;

-- Function to get queue statistics
CREATE OR REPLACE FUNCTION public.get_effectiveness_tracking_queue_stats()
RETURNS TABLE (
  status text,
  count bigint,
  oldest_pending_age interval
)
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT 
    q.status,
    COUNT(*) as count,
    CASE 
      WHEN q.status = 'pending' THEN MAX(NOW() - q.created_at)
      ELSE NULL 
    END as oldest_pending_age
  FROM public.ai_document_effectiveness_tracking_queue q
  GROUP BY q.status
  ORDER BY 
    CASE q.status 
      WHEN 'pending' THEN 1 
      WHEN 'processing' THEN 2 
      WHEN 'completed' THEN 3 
      WHEN 'failed' THEN 4 
    END;
$$;