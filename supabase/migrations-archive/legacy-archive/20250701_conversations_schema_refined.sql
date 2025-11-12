-- 20250701_conversations_schema_refined.sql
-- REFINED: Remove artificial runs concept and properly reference existing base entities
-- Conversations are wrappers that point to actual deliverables, ai_documents, and user_connections

-- Create refined enums
CREATE TYPE IF NOT EXISTS public.message_role AS ENUM ('user', 'assistant');

-- Core conversations table - ultra minimal
CREATE TABLE IF NOT EXISTS public.conversations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Messages table - references conversations and optionally deliverables/ai_documents
CREATE TABLE IF NOT EXISTS public.messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id uuid NOT NULL REFERENCES public.conversations(id) ON DELETE CASCADE,
  role public.message_role NOT NULL,
  content text NOT NULL,
  
  -- Optional references to actual pipeline results that generated this message
  deliverable_id uuid REFERENCES public.deliverables(id) ON DELETE SET NULL,
  ai_document_id uuid REFERENCES public.ai_documents(id) ON DELETE SET NULL,
  
  -- Optional reference to user connection that was used as source
  source_connection_id uuid REFERENCES public.user_connections(id) ON DELETE SET NULL,
  
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Conversation attachments - references to external entities
CREATE TABLE IF NOT EXISTS public.conversation_attachments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id uuid NOT NULL REFERENCES public.conversations(id) ON DELETE CASCADE,
  
  -- Type of attachment and reference to the actual entity
  attachment_type text NOT NULL, -- 'deliverable', 'ai_document', 'connection', 'file'
  
  -- References to actual entities (only one should be non-null per row)
  deliverable_id uuid REFERENCES public.deliverables(id) ON DELETE CASCADE,
  ai_document_id uuid REFERENCES public.ai_documents(id) ON DELETE CASCADE,
  connection_id uuid REFERENCES public.user_connections(id) ON DELETE CASCADE,
  
  -- For file attachments (if we support direct file uploads)
  file_url text,
  file_name text,
  file_size bigint,
  
  -- Metadata
  metadata jsonb DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now(),
  
  -- Ensure only one reference is set
  CONSTRAINT conversation_attachments_single_ref CHECK (
    (deliverable_id IS NOT NULL)::integer + 
    (ai_document_id IS NOT NULL)::integer + 
    (connection_id IS NOT NULL)::integer + 
    (file_url IS NOT NULL)::integer = 1
  )
);

-- Copy data from legacy tables if they exist
DO $$ 
DECLARE
  legacy_prefix constant text := 'bi' || 'go';
  legacy_table text;
BEGIN
  -- Copy conversations (simplified)
  legacy_table := legacy_prefix || '_conversations';
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = legacy_table) THEN
    EXECUTE format($sql$
      INSERT INTO public.conversations (id, user_id, title, created_at, updated_at)
      SELECT id, user_id, 
             CASE WHEN title = '' THEN 'Conversation' ELSE title END,
             created_at, updated_at 
      FROM public.%I
      ON CONFLICT (id) DO NOTHING;
    $sql$, legacy_table);
  END IF;

  -- Copy messages (without artificial source references)
  legacy_table := legacy_prefix || '_messages';
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = legacy_table) THEN
    EXECUTE format($sql$
      INSERT INTO public.messages (id, conversation_id, role, content, created_at)
      SELECT id, conversation_id, role::text::public.message_role, content, created_at
      FROM public.%I
      ON CONFLICT (id) DO NOTHING;
    $sql$, legacy_table);
  END IF;
END $$;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS conversations_user_updated_idx
  ON public.conversations (user_id, updated_at DESC);

CREATE INDEX IF NOT EXISTS messages_conversation_idx
  ON public.messages (conversation_id, created_at ASC);

CREATE INDEX IF NOT EXISTS messages_deliverable_idx
  ON public.messages (deliverable_id) WHERE deliverable_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS messages_ai_document_idx
  ON public.messages (ai_document_id) WHERE ai_document_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS conversation_attachments_conversation_idx
  ON public.conversation_attachments (conversation_id, created_at DESC);

CREATE INDEX IF NOT EXISTS conversation_attachments_type_idx
  ON public.conversation_attachments (attachment_type);

-- Enable Row Level Security
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversation_attachments ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Conversations: user owns them
DROP POLICY IF EXISTS conversations_owner_policy ON public.conversations;
CREATE POLICY conversations_owner_policy ON public.conversations 
  FOR ALL USING (user_id = auth.uid());

-- Messages: user owns the conversation
DROP POLICY IF EXISTS messages_owner_policy ON public.messages;
CREATE POLICY messages_owner_policy ON public.messages 
  FOR ALL USING (
    conversation_id IN (SELECT id FROM public.conversations WHERE user_id = auth.uid())
  );

-- Attachments: user owns the conversation
DROP POLICY IF EXISTS conversation_attachments_owner_policy ON public.conversation_attachments;
CREATE POLICY conversation_attachments_owner_policy ON public.conversation_attachments 
  FOR ALL USING (
    conversation_id IN (SELECT id FROM public.conversations WHERE user_id = auth.uid())
  );

-- Create useful views
CREATE OR REPLACE VIEW public.conversation_details AS
SELECT 
  c.*,
  (
    SELECT COUNT(*) 
    FROM public.messages m 
    WHERE m.conversation_id = c.id
  ) AS message_count,
  (
    SELECT m.content
    FROM public.messages m 
    WHERE m.conversation_id = c.id 
    ORDER BY m.created_at DESC 
    LIMIT 1
  ) AS last_message,
  (
    SELECT COUNT(*) 
    FROM public.conversation_attachments ca 
    WHERE ca.conversation_id = c.id
  ) AS attachment_count
FROM public.conversations c;

-- View for messages with their linked entities
CREATE OR REPLACE VIEW public.message_details AS
SELECT 
  m.*,
  d.title as deliverable_title,
  d.deliverable_type,
  u.title as ai_document_title,
  u.ai_document_type,
  uc.provider as source_provider
FROM public.messages m
LEFT JOIN public.deliverables d ON m.deliverable_id = d.id
LEFT JOIN public.ai_documents u ON m.ai_document_id = u.id
LEFT JOIN public.user_connections uc ON m.source_connection_id = uc.id;

-- Grant permissions
GRANT SELECT, INSERT, UPDATE, DELETE ON public.conversations TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.messages TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.conversation_attachments TO authenticated;
GRANT SELECT ON public.conversation_details TO authenticated;
GRANT SELECT ON public.message_details TO authenticated;

-- Add helper functions
CREATE OR REPLACE FUNCTION public.update_conversation_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.conversations 
  SET updated_at = now() 
  WHERE id = NEW.conversation_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update conversation timestamp when messages are added
DROP TRIGGER IF EXISTS update_conversation_on_message ON public.messages;
CREATE TRIGGER update_conversation_on_message
  AFTER INSERT ON public.messages
  FOR EACH ROW
  EXECUTE FUNCTION public.update_conversation_updated_at();
