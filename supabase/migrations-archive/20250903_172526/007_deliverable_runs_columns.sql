-- Add missing columns to deliverable_runs table for storing items and context
-- These columns are needed for the deliverables/history API endpoints

-- Add items column to store deliverable items array
ALTER TABLE deliverable_runs 
ADD COLUMN IF NOT EXISTS items JSONB DEFAULT '[]';

-- Add context column to store run metadata including ai_documents
ALTER TABLE deliverable_runs 
ADD COLUMN IF NOT EXISTS context JSONB DEFAULT '{}';

-- Create index on user_id for better query performance
CREATE INDEX IF NOT EXISTS idx_deliverable_runs_user_id ON deliverable_runs(user_id);

-- Create index on created_at for ordering
CREATE INDEX IF NOT EXISTS idx_deliverable_runs_created_at ON deliverable_runs(created_at DESC);