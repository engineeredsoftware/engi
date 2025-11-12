-- Migration: Create conversations tables
-- Date: 2025-08-17
-- Description: Creates tables for conversation system - minimal wrappers around existing entities

-- Create conversations table
CREATE TABLE IF NOT EXISTS conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL DEFAULT 'New Conversation',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  
  -- Optional references to entities that generated this message
  deliverable_id UUID REFERENCES deliverables(id) ON DELETE SET NULL,
  -- ai_document_id UUID REFERENCES ai_documents(id) ON DELETE SET NULL, -- Disabled for GA-1 (ai_documents table not created yet)
  ai_document_id UUID, -- Column exists but no FK constraint for GA-1
  source_connection_id UUID REFERENCES user_connections(id) ON DELETE SET NULL,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create conversation_attachments table
CREATE TABLE IF NOT EXISTS conversation_attachments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  attachment_type TEXT NOT NULL CHECK (attachment_type IN ('deliverable', 'ai_document', 'connection', 'file')),
  
  -- References to actual entities (only one will be non-null)
  deliverable_id UUID REFERENCES deliverables(id) ON DELETE CASCADE,
  -- ai_document_id UUID REFERENCES ai_documents(id) ON DELETE CASCADE, -- Disabled for GA-1 (ai_documents table not created yet)
  ai_document_id UUID, -- Column exists but no FK constraint for GA-1
  connection_id UUID REFERENCES user_connections(id) ON DELETE CASCADE,
  
  -- For direct file uploads
  file_url TEXT,
  file_name TEXT,
  file_size INTEGER,
  
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add indexes for performance
CREATE INDEX idx_conversations_user_id ON conversations(user_id);
CREATE INDEX idx_conversations_created_at ON conversations(created_at DESC);
CREATE INDEX idx_messages_conversation_id ON messages(conversation_id);
CREATE INDEX idx_messages_created_at ON messages(created_at DESC);
CREATE INDEX idx_conversation_attachments_conversation_id ON conversation_attachments(conversation_id);

-- Add RLS (Row Level Security) policies
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversation_attachments ENABLE ROW LEVEL SECURITY;

-- Conversations: Users can only see their own conversations
CREATE POLICY "Users can view own conversations" ON conversations
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own conversations" ON conversations
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own conversations" ON conversations
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own conversations" ON conversations
  FOR DELETE USING (auth.uid() = user_id);

-- Messages: Users can only see messages in their conversations
CREATE POLICY "Users can view messages in own conversations" ON messages
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM conversations 
      WHERE conversations.id = messages.conversation_id 
      AND conversations.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create messages in own conversations" ON messages
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM conversations 
      WHERE conversations.id = messages.conversation_id 
      AND conversations.user_id = auth.uid()
    )
  );

-- Attachments: Users can only see attachments in their conversations
CREATE POLICY "Users can view attachments in own conversations" ON conversation_attachments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM conversations 
      WHERE conversations.id = conversation_attachments.conversation_id 
      AND conversations.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create attachments in own conversations" ON conversation_attachments
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM conversations 
      WHERE conversations.id = conversation_attachments.conversation_id 
      AND conversations.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete attachments in own conversations" ON conversation_attachments
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM conversations 
      WHERE conversations.id = conversation_attachments.conversation_id 
      AND conversations.user_id = auth.uid()
    )
  );

-- Add trigger to update conversations.updated_at when messages are added
CREATE OR REPLACE FUNCTION update_conversation_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE conversations 
  SET updated_at = NOW() 
  WHERE id = NEW.conversation_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_conversation_on_new_message
AFTER INSERT ON messages
FOR EACH ROW
EXECUTE FUNCTION update_conversation_updated_at();

-- Add helpful comments
COMMENT ON TABLE conversations IS 'Lightweight conversation wrappers for organizing messages and attachments';
COMMENT ON TABLE messages IS 'Messages within conversations, can reference deliverables/ai_documents that generated them';
COMMENT ON TABLE conversation_attachments IS 'References to existing entities (deliverables, ai_documents, connections) attached to conversations';
COMMENT ON COLUMN messages.role IS 'Either "user" for user messages or "assistant" for AI responses';
COMMENT ON COLUMN conversation_attachments.attachment_type IS 'Type of attachment: deliverable, ai_document, connection, or file';