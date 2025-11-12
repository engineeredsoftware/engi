-- Migration: Fix attachments to be message-level instead of conversation-level
-- Date: 2025-08-17
-- Description: Attachments belong to messages, not conversations. This enables:
--   - User messages to have source attachments (VCS, files, URLs, integrations)
--   - Assistant messages to have pipeline run references

-- Drop old conversation_attachments table and its policies/indexes
DROP POLICY IF EXISTS "Users can view attachments in own conversations" ON conversation_attachments;
DROP POLICY IF EXISTS "Users can create attachments in own conversations" ON conversation_attachments;
DROP POLICY IF EXISTS "Users can delete attachments in own conversations" ON conversation_attachments;
DROP TABLE IF EXISTS conversation_attachments CASCADE;

-- Create new message_attachments table
CREATE TABLE message_attachments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  message_id UUID NOT NULL REFERENCES messages(id) ON DELETE CASCADE,
  
  -- Attachment reference (all attachments stored in separate attachments table)
  attachment_id UUID NOT NULL,
  attachment_category TEXT NOT NULL CHECK (attachment_category IN ('vcs', 'file', 'url', 'integration', 'pipeline_run')),
  attachment_type TEXT, -- Sub-type within category (e.g., 'issue', 'pull_request' for VCS)
  
  -- Context for this specific usage
  context TEXT, -- How this attachment relates to the message
  metadata JSONB DEFAULT '{}', -- Message-specific metadata
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create the universal attachments table
CREATE TABLE IF NOT EXISTS attachments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  category TEXT NOT NULL CHECK (category IN ('vcs', 'file', 'url', 'integration', 'pipeline_run')),
  
  -- Common fields
  title TEXT NOT NULL,
  description TEXT,
  url TEXT,
  metadata JSONB DEFAULT '{}',
  
  -- VCS-specific fields
  vcs_provider TEXT, -- 'github', 'gitlab', 'bitbucket'
  vcs_type TEXT, -- 'issue', 'pull_request'
  vcs_repository JSONB, -- {owner, name, full_name}
  vcs_issue JSONB, -- {number, state, author, labels, assignees}
  vcs_pull_request JSONB, -- {number, state, source_branch, target_branch, author, reviewers}
  
  -- File-specific fields
  file_type TEXT, -- 'image', 'text', 'pdf', 'audio', 'video', 'code', 'other'
  file_name TEXT,
  file_size INTEGER,
  file_url TEXT,
  mime_type TEXT,
  
  -- URL-specific fields
  domain TEXT,
  path TEXT,
  page_metadata JSONB, -- {title, description, image, favicon, author, published_at}
  
  -- Integration-specific fields
  integration_provider TEXT, -- 'notion', 'figma', 'jira', 'linear'
  integration_type TEXT, -- 'notion_page', 'figma_artboard', etc.
  connection_id UUID REFERENCES user_connections(id) ON DELETE SET NULL,
  integration_data JSONB, -- Provider-specific data
  
  -- Pipeline run reference
  pipeline_run_id UUID, -- References pipeline_runs(id) when category = 'pipeline_run'
  pipeline_type TEXT, -- 'deliverable', 'ai_document', 'measure', etc.
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add indexes for performance
CREATE INDEX idx_message_attachments_message_id ON message_attachments(message_id);
CREATE INDEX idx_message_attachments_attachment_id ON message_attachments(attachment_id);
CREATE INDEX idx_attachments_user_id ON attachments(user_id);
CREATE INDEX idx_attachments_category ON attachments(category);
CREATE INDEX idx_attachments_pipeline_run_id ON attachments(pipeline_run_id) WHERE pipeline_run_id IS NOT NULL;

-- Add RLS policies
ALTER TABLE message_attachments ENABLE ROW LEVEL SECURITY;
ALTER TABLE attachments ENABLE ROW LEVEL SECURITY;

-- Message attachments: Users can only see attachments for messages in their conversations
CREATE POLICY "Users can view message attachments in own conversations" ON message_attachments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM messages
      JOIN conversations ON conversations.id = messages.conversation_id
      WHERE messages.id = message_attachments.message_id 
      AND conversations.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create message attachments in own conversations" ON message_attachments
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM messages
      JOIN conversations ON conversations.id = messages.conversation_id
      WHERE messages.id = message_attachments.message_id 
      AND conversations.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete message attachments in own conversations" ON message_attachments
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM messages
      JOIN conversations ON conversations.id = messages.conversation_id
      WHERE messages.id = message_attachments.message_id 
      AND conversations.user_id = auth.uid()
    )
  );

-- Attachments: Users can only see their own attachments
CREATE POLICY "Users can view own attachments" ON attachments
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own attachments" ON attachments
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own attachments" ON attachments
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own attachments" ON attachments
  FOR DELETE USING (auth.uid() = user_id);

-- Remove entity references from messages table (they're now in attachments)
ALTER TABLE messages 
  DROP COLUMN IF EXISTS deliverable_id,
  DROP COLUMN IF EXISTS ai_document_id,
  DROP COLUMN IF EXISTS source_connection_id;

-- Add helpful comments
COMMENT ON TABLE message_attachments IS 'Links messages to their attachments - user messages have sources, assistant messages have pipeline runs';
COMMENT ON TABLE attachments IS 'Universal attachment storage - VCS (issues/PRs), files, URLs, integrations (Notion/Figma), pipeline runs';
COMMENT ON COLUMN attachments.category IS 'Main attachment category: vcs, file, url, integration, or pipeline_run';
COMMENT ON COLUMN message_attachments.context IS 'How this attachment relates to the specific message';
COMMENT ON COLUMN attachments.pipeline_run_id IS 'Reference to pipeline run when assistant message triggers a pipeline';