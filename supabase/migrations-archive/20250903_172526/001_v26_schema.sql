-- ============================================================================
-- ENGI V26 SCHEMA - Single Source of Truth
-- Version: 1.0.0
-- Date: 2025-01-10
-- Description: Production schema for V26 release
-- ============================================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "vector";
CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";

-- ============================================================================
-- SECTION 1: CORE USER & AUTHENTICATION
-- ============================================================================

-- User profiles extending Supabase auth
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE,
  display_name TEXT,
  bio TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin', 'developer')),
  
  -- Onboarding tracking
  onboarding_completed BOOLEAN DEFAULT false,
  onboarding_step TEXT,
  onboarding_data JSONB DEFAULT '{}',
  
  -- Settings
  settings JSONB DEFAULT '{}',
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- User connections for VCS (GitHub primary for MVP)
CREATE TABLE IF NOT EXISTS user_connections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  provider TEXT NOT NULL CHECK (provider IN ('github')), -- Only GitHub for MVP
  connection_data JSONB NOT NULL DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, provider)
);

-- User model preferences
CREATE TABLE IF NOT EXISTS user_model_preferences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  model_provider TEXT NOT NULL,
  model_name TEXT NOT NULL,
  is_default BOOLEAN DEFAULT false,
  settings JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, model_provider, model_name)
);

-- User credits and usage tracking
CREATE TABLE IF NOT EXISTS user_credits (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  balance DECIMAL(10, 2) DEFAULT 0.00,
  total_purchased DECIMAL(10, 2) DEFAULT 0.00,
  total_used DECIMAL(10, 2) DEFAULT 0.00,
  stripe_customer_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id)
);

CREATE TABLE IF NOT EXISTS user_credit_usages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  amount DECIMAL(10, 4) NOT NULL,
  operation_type TEXT NOT NULL,
  operation_id UUID,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- SECTION 2: VCS INTEGRATION (GitHub for MVP)
-- ============================================================================

CREATE TABLE IF NOT EXISTS vcs_repositories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  provider TEXT NOT NULL DEFAULT 'github',
  provider_repo_id TEXT NOT NULL,
  repo_name TEXT NOT NULL,
  repo_full_name TEXT NOT NULL,
  repo_owner TEXT NOT NULL,
  repo_description TEXT,
  repo_language TEXT,
  repo_default_branch TEXT DEFAULT 'main',
  repo_private BOOLEAN DEFAULT false,
  repo_url TEXT,
  repo_data JSONB DEFAULT '{}',
  repo_created_at TIMESTAMPTZ,
  repo_updated_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, provider, provider_repo_id)
);

CREATE TABLE IF NOT EXISTS user_github_connections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  github_user_id BIGINT,
  github_username TEXT,
  access_token TEXT, -- Should be encrypted in production
  installation_id BIGINT,
  installation_data JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id)
);

-- ============================================================================
-- SECTION 3: DELIVERABLES SYSTEM
-- ============================================================================

CREATE TABLE IF NOT EXISTS deliverables (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'completed', 'archived')),
  
  -- Configuration
  config JSONB DEFAULT '{}',
  template_id TEXT,
  
  -- Metrics
  effectiveness_score DECIMAL(3, 2),
  execution_count INTEGER DEFAULT 0,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS deliverable_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  deliverable_id UUID NOT NULL REFERENCES deliverables(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  item_type TEXT,
  config JSONB DEFAULT '{}',
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Vector storage for deliverable search/matching
CREATE TABLE IF NOT EXISTS deliverable_vectors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  deliverable_id UUID NOT NULL REFERENCES deliverables(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  embedding vector(1536), -- OpenAI embedding size
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(deliverable_id)
);

-- ============================================================================
-- SECTION 4: PIPELINE EXECUTION
-- ============================================================================

CREATE TABLE IF NOT EXISTS deliverable_runs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  deliverable_id UUID REFERENCES deliverables(id) ON DELETE SET NULL,
  
  -- Execution details
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'running', 'completed', 'failed', 'cancelled')),
  pipeline_type TEXT DEFAULT 'deliverable',
  
  -- Configuration and results
  config JSONB DEFAULT '{}',
  input_data JSONB DEFAULT '{}',
  output_data JSONB DEFAULT '{}',
  error_data JSONB,
  
  -- Metrics
  total_tokens INTEGER DEFAULT 0,
  total_cost DECIMAL(10, 4) DEFAULT 0.00,
  duration_ms INTEGER,
  
  -- Timestamps
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS deliverable_run_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  run_id UUID NOT NULL REFERENCES deliverable_runs(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  event_data JSONB DEFAULT '{}',
  phase TEXT,
  agent_name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS deliverable_run_phases (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  run_id UUID NOT NULL REFERENCES deliverable_runs(id) ON DELETE CASCADE,
  phase_name TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'running', 'completed', 'failed', 'skipped')),
  input_data JSONB DEFAULT '{}',
  output_data JSONB DEFAULT '{}',
  error_data JSONB,
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Long-running job management
CREATE TABLE IF NOT EXISTS run_jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  job_type TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'claimed', 'running', 'completed', 'failed')),
  claimed_by TEXT,
  claimed_at TIMESTAMPTZ,
  payload JSONB DEFAULT '{}',
  result JSONB,
  error_message TEXT,
  retry_count INTEGER DEFAULT 0,
  max_retries INTEGER DEFAULT 3,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- On-the-fly instructions
CREATE TABLE IF NOT EXISTS run_otf_instructions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  run_id UUID NOT NULL REFERENCES deliverable_runs(id) ON DELETE CASCADE,
  instruction_type TEXT NOT NULL,
  instruction_data JSONB NOT NULL,
  is_processed BOOLEAN DEFAULT false,
  processed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- General pipeline metadata
CREATE TABLE IF NOT EXISTS pipeline_runs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  pipeline_type TEXT NOT NULL,
  pipeline_config JSONB DEFAULT '{}',
  status TEXT DEFAULT 'pending',
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Stream logs for real-time updates
CREATE TABLE IF NOT EXISTS stream_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  stream_id TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  log_type TEXT NOT NULL,
  log_data JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Generated assets tracking
CREATE TABLE IF NOT EXISTS generated_assets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  run_id UUID REFERENCES deliverable_runs(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  asset_type TEXT NOT NULL,
  asset_name TEXT NOT NULL,
  asset_url TEXT,
  asset_data JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- SECTION 5: ESSENTIAL INFRASTRUCTURE
-- ============================================================================

-- Notifications
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT,
  data JSONB DEFAULT '{}',
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- System events for telemetry
CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  event_category TEXT,
  event_data JSONB DEFAULT '{}',
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Error tracking
CREATE TABLE IF NOT EXISTS error_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  error_type TEXT NOT NULL,
  error_message TEXT NOT NULL,
  error_stack TEXT,
  context JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Token usage and costs
CREATE TABLE IF NOT EXISTS token_costs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  run_id UUID REFERENCES deliverable_runs(id) ON DELETE CASCADE,
  model_provider TEXT NOT NULL,
  model_name TEXT NOT NULL,
  input_tokens INTEGER DEFAULT 0,
  output_tokens INTEGER DEFAULT 0,
  total_tokens INTEGER DEFAULT 0,
  cost DECIMAL(10, 6) DEFAULT 0.00,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- SECTION 6: INDEXES FOR PERFORMANCE
-- ============================================================================

-- User indexes
CREATE INDEX idx_user_profiles_username ON user_profiles(username);
CREATE INDEX idx_user_connections_user_provider ON user_connections(user_id, provider);
CREATE INDEX idx_user_credits_user_id ON user_credits(user_id);
CREATE INDEX idx_user_credit_usages_user_id ON user_credit_usages(user_id);
CREATE INDEX idx_user_credit_usages_created_at ON user_credit_usages(created_at);

-- VCS indexes
CREATE INDEX idx_vcs_repositories_user_provider ON vcs_repositories(user_id, provider);
CREATE INDEX idx_vcs_repositories_repo_full_name ON vcs_repositories(repo_full_name);

-- Deliverables indexes
CREATE INDEX idx_deliverables_user_id ON deliverables(user_id);
CREATE INDEX idx_deliverables_status ON deliverables(status);
CREATE INDEX idx_deliverable_items_deliverable_id ON deliverable_items(deliverable_id);
CREATE INDEX idx_deliverable_vectors_embedding ON deliverable_vectors USING ivfflat (embedding vector_cosine_ops);

-- Pipeline execution indexes
CREATE INDEX idx_deliverable_runs_user_id ON deliverable_runs(user_id);
CREATE INDEX idx_deliverable_runs_status ON deliverable_runs(status);
CREATE INDEX idx_deliverable_runs_created_at ON deliverable_runs(created_at DESC);
CREATE INDEX idx_deliverable_run_events_run_id ON deliverable_run_events(run_id);
CREATE INDEX idx_deliverable_run_phases_run_id ON deliverable_run_phases(run_id);
CREATE INDEX idx_run_jobs_status ON run_jobs(status);
CREATE INDEX idx_run_jobs_job_type ON run_jobs(job_type);

-- Infrastructure indexes
CREATE INDEX idx_notifications_user_id_read ON notifications(user_id, is_read);
CREATE INDEX idx_events_user_id ON events(user_id);
CREATE INDEX idx_events_created_at ON events(created_at DESC);
CREATE INDEX idx_error_logs_created_at ON error_logs(created_at DESC);
CREATE INDEX idx_token_costs_user_id ON token_costs(user_id);
CREATE INDEX idx_token_costs_run_id ON token_costs(run_id);

-- ============================================================================
-- SECTION 7: ROW LEVEL SECURITY
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_model_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_credits ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_credit_usages ENABLE ROW LEVEL SECURITY;
ALTER TABLE vcs_repositories ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_github_connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE deliverables ENABLE ROW LEVEL SECURITY;
ALTER TABLE deliverable_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE deliverable_vectors ENABLE ROW LEVEL SECURITY;
ALTER TABLE deliverable_runs ENABLE ROW LEVEL SECURITY;
ALTER TABLE deliverable_run_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE deliverable_run_phases ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE error_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE token_costs ENABLE ROW LEVEL SECURITY;
ALTER TABLE generated_assets ENABLE ROW LEVEL SECURITY;

-- User can only access their own data
CREATE POLICY "Users can view own profile" ON user_profiles FOR ALL USING (auth.uid() = id);
CREATE POLICY "Users can manage own connections" ON user_connections FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own model preferences" ON user_model_preferences FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can view own credits" ON user_credits FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can view own credit usage" ON user_credit_usages FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own repositories" ON vcs_repositories FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own GitHub connection" ON user_github_connections FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own deliverables" ON deliverables FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own deliverable items" ON deliverable_items 
  FOR ALL USING (EXISTS (SELECT 1 FROM deliverables WHERE deliverables.id = deliverable_items.deliverable_id AND deliverables.user_id = auth.uid()));
CREATE POLICY "Users can manage own runs" ON deliverable_runs FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can view own run events" ON deliverable_run_events 
  FOR SELECT USING (EXISTS (SELECT 1 FROM deliverable_runs WHERE deliverable_runs.id = deliverable_run_events.run_id AND deliverable_runs.user_id = auth.uid()));
CREATE POLICY "Users can view own run phases" ON deliverable_run_phases 
  FOR SELECT USING (EXISTS (SELECT 1 FROM deliverable_runs WHERE deliverable_runs.id = deliverable_run_phases.run_id AND deliverable_runs.user_id = auth.uid()));
CREATE POLICY "Users can manage own notifications" ON notifications FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can view own events" ON events FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can view own token costs" ON token_costs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can view own assets" ON generated_assets FOR SELECT USING (auth.uid() = user_id);

-- Service role has full access (for backend operations)
CREATE POLICY "Service role has full access" ON run_jobs FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role has full access" ON stream_logs FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role has full access" ON pipeline_runs FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role has full access" ON run_otf_instructions FOR ALL USING (auth.role() = 'service_role');

-- ============================================================================
-- SECTION 8: FUNCTIONS AND TRIGGERS
-- ============================================================================

-- Update timestamp trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply update trigger to relevant tables
CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_user_connections_updated_at BEFORE UPDATE ON user_connections
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_deliverables_updated_at BEFORE UPDATE ON deliverables
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_deliverable_runs_updated_at BEFORE UPDATE ON deliverable_runs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Handle new user creation
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Create user profile
  INSERT INTO public.user_profiles (id, created_at, updated_at)
  VALUES (NEW.id, NOW(), NOW())
  ON CONFLICT (id) DO NOTHING;
  
  -- Initialize user credits
  INSERT INTO public.user_credits (user_id, balance, created_at, updated_at)
  VALUES (NEW.id, 0.00, NOW(), NOW()) -- Start with 0 credits
  ON CONFLICT (user_id) DO NOTHING;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Vector search function for deliverables
CREATE OR REPLACE FUNCTION match_deliverable_vectors(
  query_embedding vector(1536),
  match_threshold float DEFAULT 0.7,
  match_count int DEFAULT 10
)
RETURNS TABLE (
  deliverable_id uuid,
  content text,
  similarity float
)
LANGUAGE sql STABLE
AS $$
  SELECT 
    deliverable_id,
    content,
    1 - (embedding <=> query_embedding) as similarity
  FROM deliverable_vectors
  WHERE 1 - (embedding <=> query_embedding) > match_threshold
  ORDER BY embedding <=> query_embedding
  LIMIT match_count;
$$;

-- Job claiming function for long-runner
CREATE OR REPLACE FUNCTION claim_run_job(
  p_job_type text,
  p_worker_id text
)
RETURNS uuid AS $$
DECLARE
  v_job_id uuid;
BEGIN
  UPDATE run_jobs
  SET 
    status = 'claimed',
    claimed_by = p_worker_id,
    claimed_at = NOW()
  WHERE id = (
    SELECT id 
    FROM run_jobs 
    WHERE job_type = p_job_type 
      AND status = 'pending'
    ORDER BY created_at
    LIMIT 1
    FOR UPDATE SKIP LOCKED
  )
  RETURNING id INTO v_job_id;
  
  RETURN v_job_id;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- SECTION 9: GRANTS AND PERMISSIONS
-- ============================================================================

-- Grant necessary permissions to authenticated users
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO authenticated;

-- Grant permissions to service role
GRANT ALL ON ALL TABLES IN SCHEMA public TO service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO service_role;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO service_role;

-- ============================================================================
-- END OF V26 SCHEMA
-- ============================================================================

-- Note: This schema focuses on core V26 functionality.
-- Additional features will be added in future migrations as needed.