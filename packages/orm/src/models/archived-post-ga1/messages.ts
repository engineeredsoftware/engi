/**
 * MESSAGES MODEL - Message management for conversations
 * 
 * @doc-code
 * type: orm-model
 * table: messages
 * capabilities: ["streaming", "attachments", "metadata"]
 */

import { BaseModel } from './base';
import { Tables, Database } from '../types/database';
import { SupabaseClient } from '@supabase/supabase-js';

export class MessagesModel extends BaseModel<'messages'> {
  constructor(supabase: SupabaseClient<Database>) {
    super(supabase, 'messages');
  }

  /**
   * Get messages for a conversation
   */
  async findByConversation(
    conversationId: string,
    options?: {
      limit?: number;
      before?: string;
      after?: string;
    }
  ): Promise<Tables<'messages'>[]> {
    let query = this.supabase
      .from(this.tableName)
      .select('*')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true });

    if (options?.limit) {
      query = query.limit(options.limit);
    }

    if (options?.before) {
      query = query.lt('created_at', options.before);
    }

    if (options?.after) {
      query = query.gt('created_at', options.after);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  }

  /**
   * Create a message with optional attachments
   */
  async createWithAttachments(input: {
    conversationId: string;
    role: 'user' | 'assistant' | 'system';
    content: string;
    metadata?: Record<string, unknown>;
    attachments?: Array<{
      name: string;
      type: string;
      size: number;
      url: string;
    }>;
  }): Promise<Tables<'messages'>> {
    const message = await this.create({
      conversation_id: input.conversationId,
      role: input.role,
      content: input.content,
      metadata: input.metadata
    });

    // Create attachments if provided
    if (input.attachments && input.attachments.length > 0) {
      await this.supabase
        .from('message_attachments')
        .insert(
          input.attachments.map(att => ({
            message_id: message.id,
            name: att.name,
            type: att.type,
            size: att.size,
            url: att.url
          }))
        );
    }

    return message;
  }

  /**
   * Stream a message (update content progressively)
   */
  async streamUpdate(
    messageId: string,
    content: string,
    isComplete = false
  ): Promise<Tables<'messages'>> {
    return this.update(messageId, {
      content,
      metadata: {
        streaming: !isComplete,
        lastStreamUpdate: new Date().toISOString()
      }
    });
  }

  /**
   * Get the last message in a conversation
   */
  async getLastMessage(conversationId: string): Promise<Tables<'messages'> | null> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw error;
    }
    return data;
  }

  /**
   * Count messages by role
   */
  async countByRole(conversationId: string): Promise<{
    user: number;
    assistant: number;
    system: number;
  }> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('role')
      .eq('conversation_id', conversationId);

    if (error) throw error;

    const counts = { user: 0, assistant: 0, system: 0 };
    (data || []).forEach(msg => {
      counts[msg.role as keyof typeof counts]++;
    });

    return counts;
  }

  /**
   * Search messages
   */
  async search(params: {
    conversationId?: string;
    userId?: string;
    query: string;
    limit?: number;
  }): Promise<Tables<'messages'>[]> {
    let query = this.supabase
      .from(this.tableName)
      .select('*, conversations!inner(user_id)')
      .ilike('content', `%${params.query}%`)
      .order('created_at', { ascending: false })
      .limit(params.limit || 20);

    if (params.conversationId) {
      query = query.eq('conversation_id', params.conversationId);
    }

    if (params.userId) {
      query = query.eq('conversations.user_id', params.userId);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  }

  /**
   * Delete all messages in a conversation
   */
  async deleteByConversation(conversationId: string): Promise<void> {
    const { error } = await this.supabase
      .from(this.tableName)
      .delete()
      .eq('conversation_id', conversationId);

    if (error) throw error;
  }
}