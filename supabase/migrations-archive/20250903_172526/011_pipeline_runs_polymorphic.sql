-- Implement polymorphic pipeline runs architecture
-- Base table: pipeline_runs (common fields)
-- Extension tables: deliverable_pipeline_runs, ai_document_pipeline_runs (specific fields)

-- First, modify pipeline_runs to have all common fields
ALTER TABLE pipeline_runs 
  ADD COLUMN IF NOT EXISTS execution_id UUID UNIQUE,
  ADD COLUMN IF NOT EXISTS pipeline_name TEXT,
  ADD COLUMN IF NOT EXISTS pipeline_version TEXT,
  ADD COLUMN IF NOT EXISTS started_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS completed_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS duration_ms INTEGER,
  ADD COLUMN IF NOT EXISTS error_data JSONB,
  ADD COLUMN IF NOT EXISTS metrics JSONB,
  ADD COLUMN IF NOT EXISTS artifacts JSONB,
  ADD COLUMN IF NOT EXISTS validation JSONB,
  ADD COLUMN IF NOT EXISTS execution_state JSONB,
  ADD COLUMN IF NOT EXISTS input JSONB,
  ADD COLUMN IF NOT EXISTS output JSONB,
  ADD COLUMN IF NOT EXISTS correlation_id UUID;

-- Add index for execution_id (primary lookup key)
CREATE INDEX IF NOT EXISTS idx_pipeline_runs_execution_id ON pipeline_runs(execution_id);
CREATE INDEX IF NOT EXISTS idx_pipeline_runs_correlation_id ON pipeline_runs(correlation_id);

-- Now modify deliverable_pipeline_runs to reference pipeline_runs
-- and only contain deliverable-specific fields
ALTER TABLE deliverable_pipeline_runs 
  ADD COLUMN IF NOT EXISTS pipeline_run_id UUID REFERENCES pipeline_runs(id) ON DELETE CASCADE;

-- Create index for the foreign key
CREATE INDEX IF NOT EXISTS idx_deliverable_pipeline_runs_pipeline_run_id 
  ON deliverable_pipeline_runs(pipeline_run_id);

-- Add comment to clarify the relationship
COMMENT ON TABLE pipeline_runs IS 'Base table for all pipeline executions with common fields';
COMMENT ON TABLE deliverable_pipeline_runs IS 'Deliverable-specific extension of pipeline_runs';
COMMENT ON COLUMN deliverable_pipeline_runs.pipeline_run_id IS 'References the base pipeline_runs record';

-- Future: ai_document_pipeline_runs will follow the same pattern
-- CREATE TABLE ai_document_pipeline_runs (
--   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
--   pipeline_run_id UUID REFERENCES pipeline_runs(id) ON DELETE CASCADE,
--   ai_document_type TEXT,
--   ai_document_config JSONB,
--   -- other ai_document-specific fields
-- );