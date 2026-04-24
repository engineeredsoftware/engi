-- Migration: Templates System, Minimal AI Documents Infrastructure + VCS Connections
-- Creates tables for templates, basic ai_documents support (disabled for V26), and VCS connections

-- Deliverable Templates (ACTIVE FOR V26)
CREATE TABLE IF NOT EXISTS deliverable_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  deliverable_type VARCHAR(50) NOT NULL CHECK (deliverable_type IN (
    'pullRequests',
    'pullRequestReviews', 
    'issues',
    'comments'
  )),
  template_text TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Composite index for efficient queries
  UNIQUE(user_id, name, deliverable_type)
);

-- User Template Preferences (ACTIVE FOR V26)
CREATE TABLE IF NOT EXISTS user_template_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  default_deliverable_template_id UUID REFERENCES deliverable_templates(id) ON DELETE SET NULL,
  -- default_ai_document_template_id removed since ai_document_templates table doesn't exist
  auto_save_templates BOOLEAN DEFAULT false,
  deliverable_templates JSONB DEFAULT '{}',
  ai_document_templates JSONB DEFAULT '{}', -- Keep for future compatibility
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_deliverable_templates_user_id ON deliverable_templates(user_id);
CREATE INDEX IF NOT EXISTS idx_deliverable_templates_type ON deliverable_templates(deliverable_type);

-- Row Level Security (RLS)
ALTER TABLE deliverable_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_template_preferences ENABLE ROW LEVEL SECURITY;

-- RLS Policies for deliverable_templates
CREATE POLICY "Users can view their own deliverable templates" ON deliverable_templates
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own deliverable templates" ON deliverable_templates
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own deliverable templates" ON deliverable_templates
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own deliverable templates" ON deliverable_templates
  FOR DELETE
  USING (auth.uid() = user_id);

-- RLS Policies for user_template_preferences
CREATE POLICY "Users can view their own template preferences" ON user_template_preferences
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own template preferences" ON user_template_preferences
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own template preferences" ON user_template_preferences
  FOR UPDATE
  USING (auth.uid() = user_id);

-- VCS Connections Table
CREATE TABLE IF NOT EXISTS user_vcs_connections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  userId UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  provider VARCHAR(50) NOT NULL CHECK (provider IN ('github', 'gitlab', 'bitbucket')),
  accessToken TEXT NOT NULL,
  refreshToken TEXT,
  expiresAt TIMESTAMP WITH TIME ZONE,
  instanceUrl TEXT,
  metadata JSONB,
  createdAt TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updatedAt TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Ensure one connection per provider per user
  UNIQUE(userId, provider)
);

-- Index for VCS connections
CREATE INDEX IF NOT EXISTS idx_user_vcs_connections_user_id ON user_vcs_connections(userId);

-- RLS for VCS connections
ALTER TABLE user_vcs_connections ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_vcs_connections
CREATE POLICY "Users can view their own VCS connections" ON user_vcs_connections
  FOR SELECT
  USING (auth.uid() = userId);

CREATE POLICY "Users can create their own VCS connections" ON user_vcs_connections
  FOR INSERT
  WITH CHECK (auth.uid() = userId);

CREATE POLICY "Users can update their own VCS connections" ON user_vcs_connections
  FOR UPDATE
  USING (auth.uid() = userId);

CREATE POLICY "Users can delete their own VCS connections" ON user_vcs_connections
  FOR DELETE
  USING (auth.uid() = userId);

-- Minimal AI Documents Infrastructure (DISABLED FOR V26, structure kept for future)
-- These tables maintain basic structure but ai_documents feature is behind feature flag

-- AI Document Runs Table (minimal structure for future use)
CREATE TABLE IF NOT EXISTS ai_document_runs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  items JSONB,
  context JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- AI Documents Table (minimal structure for future use)
CREATE TABLE IF NOT EXISTS ai_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  run_id UUID REFERENCES ai_document_runs(id) ON DELETE CASCADE,
  title TEXT,
  output TEXT,
  repository TEXT,
  ai_document_type VARCHAR(50) CHECK (ai_document_type IN (
    'knowledgeExtension',
    'deliverableFeedback', 
    'mcpIntegration'
  )),
  metrics JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for ai_documents tables
CREATE INDEX IF NOT EXISTS idx_ai_document_runs_user_id ON ai_document_runs(user_id);
CREATE INDEX IF NOT EXISTS idx_ai_documents_user_id ON ai_documents(user_id);
CREATE INDEX IF NOT EXISTS idx_ai_documents_run_id ON ai_documents(run_id);

-- RLS for ai_document tables
ALTER TABLE ai_document_runs ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_documents ENABLE ROW LEVEL SECURITY;

-- RLS Policies for ai_document_runs
CREATE POLICY "Users can view their own ai_document runs" ON ai_document_runs
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own ai_document runs" ON ai_document_runs
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own ai_document runs" ON ai_document_runs
  FOR UPDATE
  USING (auth.uid() = user_id);

-- RLS Policies for ai_documents
CREATE POLICY "Users can view their own ai_documents" ON ai_documents
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own ai_documents" ON ai_documents
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own ai_documents" ON ai_documents
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Triggers for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_deliverable_templates_updated_at
  BEFORE UPDATE ON deliverable_templates
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_template_preferences_updated_at
  BEFORE UPDATE ON user_template_preferences
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_ai_document_runs_updated_at
  BEFORE UPDATE ON ai_document_runs
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_ai_documents_updated_at
  BEFORE UPDATE ON ai_documents
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_vcs_connections_updated_at
  BEFORE UPDATE ON user_vcs_connections
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();