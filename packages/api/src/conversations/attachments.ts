/**
 * Attachment operations
 * Message-level attachment management
 */

import { supabaseAdmin } from '@bitcode/supabase';
import { AttachmentReference, AttachmentCategory } from '@bitcode/attachments-generics';
import { log } from '@bitcode/logger';
import * as crypto from 'crypto';

export interface MessageAttachment {
  id: string;
  message_id: string;
  attachment_id: string;
  attachment_category: AttachmentCategory | 'pipeline_run';
  attachment_type: string;
  metadata: any;
  created_at: string;
}

function resolveAttachmentReferenceId(attachment: AttachmentReference & { id?: string }) {
  return attachment.attachment_id || attachment.id || crypto.randomUUID();
}

export async function createMessageAttachment(options: {
  message_id: string;
  attachment: AttachmentReference;
  context?: string;
}): Promise<MessageAttachment> {
  const { data, error } = await supabaseAdmin
    .from('message_attachments')
    .insert({
      id: crypto.randomUUID(),
      message_id: options.message_id,
      attachment_id: resolveAttachmentReferenceId(options.attachment as AttachmentReference & { id?: string }),
      attachment_category: options.attachment.category,
      attachment_type: options.attachment.type,
      metadata: {
        ...options.attachment,
        context: options.context
      },
      created_at: new Date().toISOString()
    })
    .select()
    .single();

  if (error) {
    log('[api/attachments] Failed to create message attachment', 'error', { error, options });
    throw error;
  }

  return data;
}

export async function getMessageAttachments(messageId: string): Promise<MessageAttachment[]> {
  const { data, error } = await supabaseAdmin
    .from('message_attachments')
    .select('*')
    .eq('message_id', messageId)
    .order('created_at', { ascending: true });

  if (error) {
    log('[api/attachments] Failed to get message attachments', 'error', { error, messageId });
    throw error;
  }

  return data;
}

export async function getConversationAttachments(conversationId: string, options: {
  limit?: number;
  cursor?: string;
  category?: AttachmentCategory | 'pipeline_run';
} = {}): Promise<{
  data: MessageAttachment[];
  hasMore: boolean;
  nextCursor?: string;
}> {
  const limit = options.limit || 50;
  
  // First get message IDs for this conversation
  const { data: messages, error: msgError } = await supabaseAdmin
    .from('messages')
    .select('id')
    .eq('conversation_id', conversationId);

  if (msgError) {
    log('[api/attachments] Failed to get messages for conversation', 'error', { error: msgError, conversationId });
    throw msgError;
  }

  const messageIds = messages.map(m => m.id);
  
  if (messageIds.length === 0) {
    return { data: [], hasMore: false };
  }

  let query = supabaseAdmin
    .from('message_attachments')
    .select('*')
    .in('message_id', messageIds)
    .order('created_at', { ascending: false })
    .limit(limit + 1);

  if (options.category) {
    query = query.eq('attachment_category', options.category);
  }

  if (options.cursor) {
    query = query.lt('created_at', options.cursor);
  }

  const { data, error } = await query;

  if (error) {
    log('[api/attachments] Failed to get conversation attachments', 'error', { error, conversationId });
    throw error;
  }

  const hasMore = data.length > limit;
  const attachments = hasMore ? data.slice(0, -1) : data;
  const nextCursor = hasMore ? attachments[attachments.length - 1].created_at : undefined;

  return {
    data: attachments,
    hasMore,
    nextCursor
  };
}

export async function deleteMessageAttachment(attachmentId: string): Promise<void> {
  const { error } = await supabaseAdmin
    .from('message_attachments')
    .delete()
    .eq('id', attachmentId);

  if (error) {
    log('[api/attachments] Failed to delete message attachment', 'error', { error, attachmentId });
    throw error;
  }
}

/**
 * Legacy support - will be removed
 * @deprecated Use message-level attachments instead
 */
export async function createConversationAttachment(options: any): Promise<any> {
  log('[api/attachments] Warning: createConversationAttachment is deprecated', 'warn', { options });
  
  // For backwards compatibility, create on first message or stub message
  const { data: messages } = await supabaseAdmin
    .from('messages')
    .select('id')
    .eq('conversation_id', options.conversation_id)
    .order('created_at', { ascending: false })
    .limit(1);
  
  const messageId = messages?.[0]?.id || crypto.randomUUID();
  
  if (!messages?.[0]) {
    // Create stub message for attachment
    await supabaseAdmin
      .from('messages')
      .insert({
        id: messageId,
        conversation_id: options.conversation_id,
        role: 'assistant',
        content: 'Attachment added',
        created_at: new Date().toISOString()
      });
  }
  
  return createMessageAttachment({
    message_id: messageId,
    attachment: {
      id: options.attachment_id || crypto.randomUUID(),
      category: mapLegacyAttachmentType(options.attachment_type),
      type: options.attachment_type,
      ...options
    }
  });
}

function mapLegacyAttachmentType(type: string): AttachmentCategory {
  const mapping: Record<string, AttachmentCategory> = {
    'deliverable': 'integration',
    'ai_document': 'integration', 
    'connection': 'integration',
    'file': 'file',
    'image': 'file',
    'url': 'url',
    'issue': 'vcs',
    'pr': 'vcs',
    'commit': 'vcs'
  };
  
  return mapping[type] || 'file';
}
