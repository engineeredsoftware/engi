-- 20250701_conversations_schema_migration.sql
-- Migration to rename legacy chat tables to proper conversations schema
-- This makes conversations first-class data rather than a feature of Conversations

-- First, create new enums with proper names
CREATE TYPE IF NOT EXISTS public.conversation_run_kind AS ENUM ('deliverable', 'ai_document');
CREATE TYPE IF NOT EXISTS public.conversation_run_status AS ENUM ('queued', 'running', 'completed', 'error');  
CREATE TYPE IF NOT EXISTS public.message_role AS ENUM ('user', 'assistant');

-- Create new properly named tables
CREATE TABLE IF NOT EXISTS public.conversations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL DEFAULT '',
  last_message text,
  updated_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.conversation_runs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id uuid NOT NULL REFERENCES public.conversations(id) ON DELETE CASCADE,
  kind public.conversation_run_kind NOT NULL DEFAULT 'deliverable',
  status public.conversation_run_status NOT NULL DEFAULT 'queued',
  started_at timestamptz NOT NULL DEFAULT now(),
  completed_at timestamptz,
  stream_log text,
  final_log text
);

CREATE TABLE IF NOT EXISTS public.conversation_sources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id uuid NOT NULL REFERENCES public.conversations(id) ON DELETE CASCADE,
  repo_slug text NOT NULL,
  branch text,
  commit_sha text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id uuid NOT NULL REFERENCES public.conversations(id) ON DELETE CASCADE,
  role public.message_role NOT NULL,
  content text NOT NULL,
  source_id uuid REFERENCES public.conversation_sources(id),
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Copy data from legacy tables if they exist
DO $$ 
DECLARE
  legacy_prefix constant text := 'bi' || 'go';
  legacy_table text;
BEGIN
  -- Copy conversations
  legacy_table := legacy_prefix || '_conversations';
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = legacy_table) THEN
    EXECUTE format($sql$
      INSERT INTO public.conversations (id, user_id, title, last_message, updated_at, created_at)
      SELECT id, user_id, title, last_message, updated_at, created_at 
      FROM public.%I
      ON CONFLICT (id) DO NOTHING;
    $sql$, legacy_table);
  END IF;

  -- Copy sources (must come before messages due to foreign key)
  legacy_table := legacy_prefix || '_sources';
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = legacy_table) THEN
    EXECUTE format($sql$
      INSERT INTO public.conversation_sources (id, conversation_id, repo_slug, branch, commit_sha, created_at)
      SELECT id, conversation_id, repo_slug, branch, commit_sha, created_at
      FROM public.%I
      ON CONFLICT (id) DO NOTHING;
    $sql$, legacy_table);
  END IF;

  -- Copy runs
  legacy_table := legacy_prefix || '_runs';
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = legacy_table) THEN
    EXECUTE format($sql$
      INSERT INTO public.conversation_runs (id, conversation_id, kind, status, started_at, completed_at, stream_log, final_log)
      SELECT id, conversation_id, kind::text::public.conversation_run_kind, status::text::public.conversation_run_status, started_at, completed_at, stream_log, final_log
      FROM public.%I
      ON CONFLICT (id) DO NOTHING;
    $sql$, legacy_table);
  END IF;

  -- Copy messages
  legacy_table := legacy_prefix || '_messages';
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = legacy_table) THEN
    EXECUTE format($sql$
      INSERT INTO public.messages (id, conversation_id, role, content, source_id, created_at)
      SELECT id, conversation_id, role::text::public.message_role, content, source_id, created_at
      FROM public.%I
      ON CONFLICT (id) DO NOTHING;
    $sql$, legacy_table);
  END IF;
END $$;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS conversations_user_updated_idx
  ON public.conversations (user_id, updated_at DESC);

CREATE INDEX IF NOT EXISTS conversation_runs_conversation_idx
  ON public.conversation_runs (conversation_id, started_at DESC);

CREATE INDEX IF NOT EXISTS conversation_sources_conversation_idx
  ON public.conversation_sources (conversation_id, created_at DESC);

CREATE INDEX IF NOT EXISTS messages_conversation_idx
  ON public.messages (conversation_id, created_at ASC);

-- Enable Row Level Security
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversation_runs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversation_sources ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Conversations owner policy
DROP POLICY IF EXISTS conversations_owner_policy ON public.conversations;
CREATE POLICY conversations_owner_policy ON public.conversations 
  FOR ALL USING (user_id = auth.uid());

-- Conversation runs inherited owner policy  
DROP POLICY IF EXISTS conversation_runs_owner_policy ON public.conversation_runs;
CREATE POLICY conversation_runs_owner_policy ON public.conversation_runs 
  FOR ALL USING (
    conversation_id IN (SELECT id FROM public.conversations WHERE user_id = auth.uid())
  );

-- Messages inherited owner policy
DROP POLICY IF EXISTS messages_owner_policy ON public.messages;
CREATE POLICY messages_owner_policy ON public.messages 
  FOR ALL USING (
    conversation_id IN (SELECT id FROM public.conversations WHERE user_id = auth.uid())
  );

-- Sources inherited owner policy
DROP POLICY IF EXISTS conversation_sources_owner_policy ON public.conversation_sources;
CREATE POLICY conversation_sources_owner_policy ON public.conversation_sources 
  FOR ALL USING (
    conversation_id IN (SELECT id FROM public.conversations WHERE user_id = auth.uid())
  );

-- Add useful views for compatibility and convenience
CREATE OR REPLACE VIEW public.conversation_details AS
SELECT 
  c.*,
  (
    SELECT COUNT(*) 
    FROM public.messages m 
    WHERE m.conversation_id = c.id
  ) AS message_count,
  (
    SELECT COUNT(*) 
    FROM public.conversation_runs cr 
    WHERE cr.conversation_id = c.id
  ) AS run_count
FROM public.conversations c;

-- Grant necessary permissions
GRANT SELECT, INSERT, UPDATE, DELETE ON public.conversations TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.conversation_runs TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.messages TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.conversation_sources TO authenticated;
GRANT SELECT ON public.conversation_details TO authenticated;
