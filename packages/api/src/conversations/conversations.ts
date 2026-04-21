/**
 * Conversation operations
 * All conversation CRUD operations
 */

import { supabaseAdmin } from '@bitcode/supabase';
import { Conversation } from '@bitcode/conversations-generics';
import { log } from '@bitcode/logger';
import * as crypto from 'crypto';

export async function createConversation(userId: string, title?: string): Promise<Conversation> {
  const id = crypto.randomUUID();
  
  const { data, error } = await supabaseAdmin
    .from('conversations')
    .insert({
      id,
      user_id: userId,
      title: title || 'New Conversation',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    })
    .select()
    .single();

  if (error) {
    log('[api/conversations] Failed to create conversation', 'error', { error, userId });
    throw error;
  }

  return data;
}

export async function getConversation(conversationId: string, userId: string): Promise<Conversation | null> {
  const { data, error } = await supabaseAdmin
    .from('conversations')
    .select('*')
    .eq('id', conversationId)
    .eq('user_id', userId)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null; // Not found
    }
    log('[api/conversations] Failed to get conversation', 'error', { error, conversationId, userId });
    throw error;
  }

  return data;
}

export async function listConversations(userId: string, options: {
  limit?: number;
  cursor?: string;
  search?: string;
} = {}): Promise<{
  data: Array<Conversation & {
    message_count: number;
    last_message: string | null;
    attachment_count: number;
  }>;
  hasMore: boolean;
  nextCursor?: string;
}> {
  const limit = options.limit || 50;
  let query = supabaseAdmin
    .from('conversations')
    .select(`
      *,
      messages!conversation_id (
        id,
        content,
        created_at,
        message_attachments (
          id
        )
      )
    `)
    .eq('user_id', userId)
    .order('updated_at', { ascending: false })
    .limit(limit + 1);

  if (options.search && options.search.trim()) {
    // Simple title search; can be extended to last message later
    query = query.ilike('title', `%${options.search.trim()}%`);
  }

  if (options.cursor) {
    query = query.lt('updated_at', options.cursor);
  }

  const { data, error } = await query;

  if (error) {
    log('[api/conversations] Failed to list conversations', 'error', { error, userId });
    throw error;
  }

  const hasMore = data.length > limit;
  const conversations = hasMore ? data.slice(0, -1) : data;
  const nextCursor = hasMore ? conversations[conversations.length - 1].updated_at : undefined;
  const enrichedConversations = conversations.map((conversation: any) => {
    const messages = Array.isArray(conversation.messages) ? [...conversation.messages] : [];
    const lastMessage = messages.sort((left, right) => right.created_at.localeCompare(left.created_at))[0];

    return {
      ...conversation,
      message_count: messages.length,
      last_message: lastMessage?.content || null,
      attachment_count: messages.reduce((count, message) => {
        return count + (Array.isArray(message.message_attachments) ? message.message_attachments.length : 0);
      }, 0),
    };
  });

  return {
    data: enrichedConversations,
    hasMore,
    nextCursor
  };
}

/**
 * Branch an existing conversation into a new conversation.
 * - Creates a new conversation with optional title
 * - Optionally copies all messages up to a specified message ID (inclusive)
 * - Records parent and branch metadata on the new conversation
 */
export async function branchConversation(
  userId: string,
  sourceConversationId: string,
  options: { title?: string; branchMessageId?: string; copyMessages?: boolean } = {}
): Promise<Conversation & { copiedCount?: number } > {
  // Verify source conversation ownership
  const { data: source, error: sourceErr } = await supabaseAdmin
    .from('conversations')
    .select('*')
    .eq('id', sourceConversationId)
    .eq('user_id', userId)
    .single();
  if (sourceErr || !source) {
    log('[api/conversations] Branch failed: source conversation not found or not owned', 'error', { userId, sourceConversationId, error: sourceErr });
    throw new Error('Source conversation not found');
  }

  // Create destination conversation with parent metadata
  const newId = crypto.randomUUID();
  const now = new Date().toISOString();
  const { data: dest, error: destErr } = await supabaseAdmin
    .from('conversations')
    .insert({
      id: newId,
      user_id: userId,
      title: options.title || `${source.title} (branch)` ,
      parent_conversation_id: sourceConversationId,
      branched_from_message_id: options.branchMessageId || null,
      created_at: now,
      updated_at: now
    })
    .select('*')
    .single();
  if (destErr) {
    log('[api/conversations] Branch failed: cannot create destination conversation', 'error', { userId, sourceConversationId, error: destErr });
    throw destErr;
  }

  let copiedCount = 0;
  if (options.copyMessages !== false) {
    // Copy messages from source → dest, optionally up to branchMessageId
    // Fetch in ascending order
    const { data: msgs, error: msgsErr } = await supabaseAdmin
      .from('messages')
      .select('*')
      .eq('conversation_id', sourceConversationId)
      .order('created_at', { ascending: true });
      if (msgsErr) {
        log('[api/conversations] Branch warning: could not load source messages', 'warn', { userId, sourceConversationId, error: msgsErr });
    } else {
      const untilId = options.branchMessageId;
      const toCopy = untilId ? msgs.filter(m => true).reduce<{copy:boolean; arr:any[]}>((acc, m) => {
        if (!acc.copy) acc.copy = true; // always true until we hit untilId and include it
        acc.arr.push(m);
        if (m.id === untilId) acc.copy = false;
        return acc;
      }, { copy: true, arr: [] as any[] }).arr : msgs;

      if (toCopy.length) {
        // Insert copied messages; generate new IDs and set destination conversation
      const rows = toCopy.map(m => ({
        id: crypto.randomUUID(),
        conversation_id: dest.id,
        role: m.role,
        content: m.content,
        created_at: m.created_at
      }));
        const { error: insertErr } = await supabaseAdmin
          .from('messages')
          .insert(rows);
        if (insertErr) {
          log('[api/conversations] Branch warning: failed to copy messages', 'warn', { error: insertErr, count: rows.length });
        } else {
          copiedCount = rows.length;
        }
      }
    }
  }

  return { ...dest, copiedCount } as any;
}

export async function updateConversation(
  conversationId: string, 
  userId: string,
  updates: Partial<Pick<Conversation, 'title'>>
): Promise<Conversation> {
  const { data, error } = await supabaseAdmin
    .from('conversations')
    .update({
      ...updates,
      updated_at: new Date().toISOString()
    })
    .eq('id', conversationId)
    .eq('user_id', userId)
    .select()
    .single();

  if (error) {
    log('[api/conversations] Failed to update conversation', 'error', { error, conversationId, userId });
    throw error;
  }

  return data;
}

export async function deleteConversation(conversationId: string, userId: string): Promise<void> {
  const { error } = await supabaseAdmin
    .from('conversations')
    .delete()
    .eq('id', conversationId)
    .eq('user_id', userId);

  if (error) {
    log('[api/conversations] Failed to delete conversation', 'error', { error, conversationId, userId });
    throw error;
  }
}

export async function findOrCreateConversationForPipeline(
  userId: string,
  pipelineType: string,
  pipelineId: string
): Promise<Conversation> {
  // For current schema (no conversation.metadata), simply create a new conversation
  // Caller can decide reuse semantics at a higher level if needed.
  return createConversation(userId, `${pipelineType} Pipeline`);
}

export async function getConversationWithAll(conversationId: string, userId: string): Promise<any> {
  // Get conversation
  const conversation = await getConversation(conversationId, userId);
  if (!conversation) return null;

  // Get all messages with attachments
  const { data: messages } = await supabaseAdmin
    .from('messages')
    .select(`
      *,
      message_attachments (
        id,
        attachment_id,
        attachment_category,
        attachment_type,
        metadata
      )
    `)
    .eq('conversation_id', conversationId)
    .order('created_at', { ascending: true });

  return {
    ...conversation,
    messages: messages || []
  };
}
