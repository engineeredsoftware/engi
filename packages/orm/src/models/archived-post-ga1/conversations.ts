/**
 * CONVERSATIONS MODEL - Conversation management
 * 
 * @doc-code
 * type: orm-model
 * table: conversations
 * capabilities: ["messaging", "context", "history"]
 */

import { BaseModel } from './base';
import { Tables } from '../types/database';
import { SupabaseClient } from '@supabase/supabase-js';

export interface ConversationWithStats extends Tables<'conversations'> {
  message_count: number;
  run_count: number;
  last_message: string | null;
  last_message_at: string | null;
}

export interface ConversationWithMessages extends Tables<'conversations'> {
  messages: Tables<'messages'>[];
}

export interface PaginationParams {
  limit?: number;
  cursor?: string;
  search?: string;
}

export interface PaginatedResult<T> {
  data: T[];
  nextCursor: string | null;
  hasMore: boolean;
}

export class ConversationsModel extends BaseModel<'conversations'> {
  constructor(supabase: SupabaseClient<Database>) {
    super(supabase, 'conversations');
  }

  /**
   * List conversations with stats for a user
   */
  async listWithStats(
    userId: string,
    params: PaginationParams = {}
  ): Promise<PaginatedResult<ConversationWithStats>> {
    const { limit = 50, cursor, search } = params;

    let query = this.supabase
      .from('conversation_details') // This is a view with stats
      .select('*')
      .eq('user_id', userId)
      .order('updated_at', { ascending: false })
      .limit(limit + 1);

    if (cursor) {
      query = query.lt('updated_at', cursor);
    }

    if (search) {
      query = query.or(`title.ilike.%${search}%,last_message.ilike.%${search}%`);
    }

    const { data, error } = await query;
    if (error) throw error;

    const hasMore = data.length > limit;
    const conversations = hasMore ? data.slice(0, limit) : data;
    const nextCursor = hasMore ? conversations[conversations.length - 1].updated_at : null;

    return {
      data: conversations as ConversationWithStats[],
      nextCursor,
      hasMore,
    };
  }

  /**
   * Get conversation by ID for a specific user
   */
  async findByIdForUser(
    conversationId: string,
    userId: string
  ): Promise<Tables<'conversations'> | null> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('id', conversationId)
      .eq('user_id', userId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw error;
    }
    return data;
  }

  /**
   * Get conversation with all messages
   */
  async findWithMessages(
    conversationId: string,
    userId: string
  ): Promise<ConversationWithMessages | null> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select(`
        *,
        messages (*)
      `)
      .eq('id', conversationId)
      .eq('user_id', userId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw error;
    }
    return data as ConversationWithMessages;
  }

  /**
   * Create conversation with initial message
   */
  async createWithMessage(input: {
    userId: string;
    title: string;
    metadata?: Record<string, unknown>;
    initialMessage?: {
      role: 'user' | 'assistant';
      content: string;
    };
  }): Promise<Tables<'conversations'>> {
    // Start a transaction
    const conversation = await this.create({
      user_id: input.userId,
      title: input.title,
      metadata: input.metadata || {}
    });

    // Create initial message if provided
    if (input.initialMessage) {
      await this.supabase
        .from('messages')
        .insert({
          conversation_id: conversation.id,
          role: input.initialMessage.role,
          content: input.initialMessage.content
        });
    }

    return conversation;
  }

  /**
   * Update conversation metadata
   */
  async updateMetadata(
    conversationId: string,
    metadata: Record<string, unknown>
  ): Promise<Tables<'conversations'>> {
    const current = await this.findById(conversationId);
    if (!current) throw new Error('Conversation not found');

    return this.update(conversationId, {
      metadata: { ...current.metadata, ...metadata }
    });
  }

  /**
   * Get recent conversations
   */
  async getRecent(userId: string, limit = 10): Promise<Tables<'conversations'>[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  }

  /**
   * Archive a conversation
   */
  async archive(conversationId: string): Promise<Tables<'conversations'>> {
    return this.update(conversationId, {
      archived_at: new Date().toISOString()
    });
  }

  /**
   * Get conversation statistics
   */
  async getStats(conversationId: string): Promise<{
    messageCount: number;
    runCount: number;
    lastActivity: string | null;
  }> {
    const [messages, runs] = await Promise.all([
      this.supabase
        .from('messages')
        .select('id', { count: 'exact', head: true })
        .eq('conversation_id', conversationId),
      this.supabase
        .from('conversation_runs')
        .select('id', { count: 'exact', head: true })
        .eq('conversation_id', conversationId)
    ]);

    const lastMessage = await this.supabase
      .from('messages')
      .select('created_at')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    return {
      messageCount: messages.count || 0,
      runCount: runs.count || 0,
      lastActivity: lastMessage.data?.created_at || null
    };
  }
}