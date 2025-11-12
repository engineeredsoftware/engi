-- Rename deliverable_runs to deliverable_pipeline_runs for clarity
-- This better describes what these records actually are

-- Rename the main table
ALTER TABLE deliverable_runs RENAME TO deliverable_pipeline_runs;

-- Update foreign key constraints to reference the new table name
ALTER TABLE deliverable_run_events 
  DROP CONSTRAINT IF EXISTS deliverable_run_events_run_id_fkey,
  ADD CONSTRAINT deliverable_run_events_run_id_fkey 
    FOREIGN KEY (run_id) 
    REFERENCES deliverable_pipeline_runs(id) 
    ON DELETE CASCADE;

ALTER TABLE deliverable_run_phases
  DROP CONSTRAINT IF EXISTS deliverable_run_phases_run_id_fkey,
  ADD CONSTRAINT deliverable_run_phases_run_id_fkey 
    FOREIGN KEY (run_id) 
    REFERENCES deliverable_pipeline_runs(id) 
    ON DELETE CASCADE;

ALTER TABLE run_otf_instructions
  DROP CONSTRAINT IF EXISTS run_otf_instructions_run_id_fkey,
  ADD CONSTRAINT run_otf_instructions_run_id_fkey 
    FOREIGN KEY (run_id) 
    REFERENCES deliverable_pipeline_runs(id) 
    ON DELETE CASCADE;

-- Update any indexes
DROP INDEX IF EXISTS idx_deliverable_runs_user_id;
CREATE INDEX idx_deliverable_pipeline_runs_user_id ON deliverable_pipeline_runs(user_id);

DROP INDEX IF EXISTS idx_deliverable_runs_status;
CREATE INDEX idx_deliverable_pipeline_runs_status ON deliverable_pipeline_runs(status);

DROP INDEX IF EXISTS idx_deliverable_runs_created_at;
CREATE INDEX idx_deliverable_pipeline_runs_created_at ON deliverable_pipeline_runs(created_at);

-- Add comment to clarify purpose
COMMENT ON TABLE deliverable_pipeline_runs IS 'Tracks executions of the deliverable pipeline with SDIVS phases';