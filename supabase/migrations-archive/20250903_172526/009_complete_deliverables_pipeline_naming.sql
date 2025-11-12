-- Complete the deliverables pipeline table naming standardization
-- All pipeline-related tables should use deliverables_pipeline_ prefix
-- with descriptive suffixes that match the E/E hierarchy

-- 1. Rename deliverable_run_events to deliverables_pipeline_events
ALTER TABLE deliverable_run_events RENAME TO deliverables_pipeline_events;

-- Update the foreign key constraint name
ALTER TABLE deliverables_pipeline_events 
  DROP CONSTRAINT IF EXISTS deliverable_run_events_run_id_fkey,
  ADD CONSTRAINT deliverables_pipeline_events_run_id_fkey 
    FOREIGN KEY (run_id) 
    REFERENCES deliverables_pipeline_runs(id) 
    ON DELETE CASCADE;

-- 2. Rename deliverable_run_phases to deliverables_pipeline_phase_delegations
-- This better reflects that phases delegate work to agents
ALTER TABLE deliverable_run_phases RENAME TO deliverables_pipeline_phase_delegations;

-- Update the foreign key constraint name
ALTER TABLE deliverables_pipeline_phase_delegations
  DROP CONSTRAINT IF EXISTS deliverable_run_phases_run_id_fkey,
  ADD CONSTRAINT deliverables_pipeline_phase_delegations_run_id_fkey 
    FOREIGN KEY (run_id) 
    REFERENCES deliverables_pipeline_runs(id) 
    ON DELETE CASCADE;

-- 3. Rename run_otf_instructions to deliverables_pipeline_otf_instructions
ALTER TABLE run_otf_instructions RENAME TO deliverables_pipeline_otf_instructions;

-- Update the foreign key constraint name
ALTER TABLE deliverables_pipeline_otf_instructions
  DROP CONSTRAINT IF EXISTS run_otf_instructions_run_id_fkey,
  ADD CONSTRAINT deliverables_pipeline_otf_instructions_run_id_fkey 
    FOREIGN KEY (run_id) 
    REFERENCES deliverables_pipeline_runs(id) 
    ON DELETE CASCADE;

-- 4. Rename generated_assets to deliverables_pipeline_generated_assets
ALTER TABLE generated_assets RENAME TO deliverables_pipeline_generated_assets;

-- Update the foreign key constraint name
ALTER TABLE deliverables_pipeline_generated_assets
  DROP CONSTRAINT IF EXISTS generated_assets_run_id_fkey,
  ADD CONSTRAINT deliverables_pipeline_generated_assets_run_id_fkey 
    FOREIGN KEY (run_id) 
    REFERENCES deliverables_pipeline_runs(id) 
    ON DELETE CASCADE;

-- 5. Update indexes with new names
DROP INDEX IF EXISTS idx_deliverable_run_events_run_id;
CREATE INDEX idx_deliverables_pipeline_events_run_id ON deliverables_pipeline_events(run_id);

DROP INDEX IF EXISTS idx_deliverable_run_phases_run_id;
CREATE INDEX idx_deliverables_pipeline_phase_delegations_run_id ON deliverables_pipeline_phase_delegations(run_id);

DROP INDEX IF EXISTS idx_run_otf_instructions_run_id;
CREATE INDEX idx_deliverables_pipeline_otf_instructions_run_id ON deliverables_pipeline_otf_instructions(run_id);

DROP INDEX IF EXISTS idx_generated_assets_run_id;
CREATE INDEX idx_deliverables_pipeline_generated_assets_run_id ON deliverables_pipeline_generated_assets(run_id);

-- 6. Add new tables for complete E/E hierarchy tracking

-- Agent steps within phase delegations
CREATE TABLE IF NOT EXISTS deliverables_pipeline_agent_steps (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  phase_delegation_id UUID NOT NULL REFERENCES deliverables_pipeline_phase_delegations(id) ON DELETE CASCADE,
  agent_name TEXT NOT NULL,
  step_type TEXT NOT NULL CHECK (step_type IN ('plan', 'try', 'refine', 'retry')),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'running', 'completed', 'failed', 'skipped')),
  input_data JSONB DEFAULT '{}',
  output_data JSONB DEFAULT '{}',
  error_data JSONB,
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- SubSteps within agent steps (7 substeps of PTRR)
CREATE TABLE IF NOT EXISTS deliverables_pipeline_substeps (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  agent_step_id UUID NOT NULL REFERENCES deliverables_pipeline_agent_steps(id) ON DELETE CASCADE,
  substep_type TEXT NOT NULL,
  substep_index INTEGER NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'running', 'completed', 'failed', 'skipped')),
  input_data JSONB DEFAULT '{}',
  output_data JSONB DEFAULT '{}',
  error_data JSONB,
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tool executions within substeps
CREATE TABLE IF NOT EXISTS deliverables_pipeline_tool_executions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  substep_id UUID REFERENCES deliverables_pipeline_substeps(id) ON DELETE CASCADE,
  agent_step_id UUID REFERENCES deliverables_pipeline_agent_steps(id) ON DELETE CASCADE,
  tool_name TEXT NOT NULL,
  tool_input JSONB DEFAULT '{}',
  tool_output JSONB DEFAULT '{}',
  tool_error JSONB,
  execution_time_ms INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Generation tracking (LLM/AI model invocations)
CREATE TABLE IF NOT EXISTS deliverables_pipeline_generations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  run_id UUID REFERENCES deliverables_pipeline_runs(id) ON DELETE CASCADE,
  phase_delegation_id UUID REFERENCES deliverables_pipeline_phase_delegations(id) ON DELETE CASCADE,
  agent_step_id UUID REFERENCES deliverables_pipeline_agent_steps(id) ON DELETE CASCADE,
  substep_id UUID REFERENCES deliverables_pipeline_substeps(id) ON DELETE CASCADE,
  model_provider TEXT NOT NULL,
  model_name TEXT NOT NULL,
  messages JSONB NOT NULL,
  response JSONB,
  input_tokens INTEGER,
  output_tokens INTEGER,
  total_tokens INTEGER,
  cost DECIMAL(10, 6),
  latency_ms INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for new tables
CREATE INDEX idx_deliverables_pipeline_agent_steps_phase_id ON deliverables_pipeline_agent_steps(phase_delegation_id);
CREATE INDEX idx_deliverables_pipeline_substeps_step_id ON deliverables_pipeline_substeps(agent_step_id);
CREATE INDEX idx_deliverables_pipeline_tool_executions_substep_id ON deliverables_pipeline_tool_executions(substep_id);
CREATE INDEX idx_deliverables_pipeline_generations_run_id ON deliverables_pipeline_generations(run_id);

-- Add comments documenting the E/E hierarchy
COMMENT ON TABLE deliverables_pipeline_runs IS 'Top-level pipeline executions (PipelineExecution)';
COMMENT ON TABLE deliverables_pipeline_phase_delegations IS 'Phase delegations to agents (PhaseDelegation)';
COMMENT ON TABLE deliverables_pipeline_agent_steps IS 'Agent PTRR steps (AgentExecution)';
COMMENT ON TABLE deliverables_pipeline_substeps IS 'The 7 substeps within each PTRR step (SubStepExecution)';
COMMENT ON TABLE deliverables_pipeline_tool_executions IS 'Tool usage tracking (ToolExecution)';
COMMENT ON TABLE deliverables_pipeline_generations IS 'Generation (LLM/AI model) tracking for cost and performance monitoring';