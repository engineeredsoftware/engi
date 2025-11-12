-- Create run_jobs table for pipeline execution queue
CREATE TABLE IF NOT EXISTS public.run_jobs (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    run_id uuid NOT NULL,
    status text NOT NULL DEFAULT 'queued' CHECK (status IN ('queued', 'running', 'completed', 'failed', 'cancelled')),
    locked_by text,
    created_at timestamptz DEFAULT now() NOT NULL,
    started_at timestamptz,
    completed_at timestamptz,
    error_message text,
    metadata jsonb DEFAULT '{}',
    
    -- Add index for queue polling
    CONSTRAINT run_jobs_run_id_fkey FOREIGN KEY (run_id) REFERENCES public.deliverable_runs(id) ON DELETE CASCADE
);

-- Indexes for efficient queue operations
CREATE INDEX idx_run_jobs_status_created ON public.run_jobs(status, created_at) WHERE status = 'queued';
CREATE INDEX idx_run_jobs_run_id ON public.run_jobs(run_id);
CREATE INDEX idx_run_jobs_locked_by ON public.run_jobs(locked_by) WHERE locked_by IS NOT NULL;

-- Function to atomically claim a job
CREATE OR REPLACE FUNCTION public.claim_run_job(p_worker_id text)
RETURNS TABLE(id uuid, run_id uuid) AS $$
DECLARE
    v_job_id uuid;
    v_run_id uuid;
BEGIN
    -- Select and lock the oldest queued job
    SELECT j.id, j.run_id INTO v_job_id, v_run_id
    FROM public.run_jobs j
    WHERE j.status = 'queued'
    ORDER BY j.created_at ASC
    LIMIT 1
    FOR UPDATE SKIP LOCKED;
    
    -- If no job found, return empty
    IF v_job_id IS NULL THEN
        RETURN;
    END IF;
    
    -- Update the job status
    UPDATE public.run_jobs
    SET status = 'running',
        locked_by = p_worker_id,
        started_at = now()
    WHERE id = v_job_id;
    
    -- Return the claimed job
    RETURN QUERY SELECT v_job_id as id, v_run_id as run_id;
END;
$$ LANGUAGE plpgsql;

-- Grant permissions
GRANT ALL ON public.run_jobs TO authenticated;
GRANT ALL ON public.run_jobs TO service_role;
GRANT EXECUTE ON FUNCTION public.claim_run_job TO authenticated;
GRANT EXECUTE ON FUNCTION public.claim_run_job TO service_role;

-- Add RLS policies
ALTER TABLE public.run_jobs ENABLE ROW LEVEL SECURITY;

-- Service role can do anything
CREATE POLICY "Service role full access" ON public.run_jobs
    FOR ALL TO service_role
    USING (true)
    WITH CHECK (true);

-- Users can view their own jobs
CREATE POLICY "Users can view own jobs" ON public.run_jobs
    FOR SELECT TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.deliverable_runs dr
            WHERE dr.id = run_jobs.run_id
            AND dr.user_id = auth.uid()
        )
    );