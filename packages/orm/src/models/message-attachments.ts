/**
 * MESSAGE ATTACHMENTS MODEL - V26 Attachment management
 * 
 * Manages attachment references at the message level for conversations
 * Each attachment reference belongs to a specific message
 * 
 * Type: orm-model
 * Table: message_attachments
 * Capabilities: crud, message-scoped, attachment-refs
 */

import { BaseModel } from './base';
import { Database, Tables } from '../types/database';
import { SupabaseClient } from '@supabase/supabase-js';
import {
  MessageAttachment,
  CreateMessageAttachmentInput
} from '@bitcode/conversations-generics';
import { AttachmentReference } from '@bitcode/attachments-generics';

export class MessageAttachmentsModel extends BaseModel<'message_attachments'> {
  constructor(supabase: SupabaseClient<Database>) {
    super(supabase, 'message_attachments');
  }

  /**
   * Get attachments for a specific message
   */
  async findByMessage(messageId: string): Promise<ConversationAttachment[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('message_id', messageId)
      .order('created_at', { ascending: true });

    if (error) throw error;
    return data || [];
  }

  /**
   * Get attachments for an entire conversation
   */
  async findByConversation(conversationId: string): Promise<ConversationAttachment[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select(`
        *,
        messages!inner(conversation_id)
      `)
      .eq('messages.conversation_id', conversationId)
      .order('created_at', { ascending: true });

    if (error) throw error;
    return data || [];
  }

  /**
   * Create an attachment for a message
   */
  async createForMessage(
    messageId: string,
    input: Omit<CreateAttachmentInput, 'message_id'>
  ): Promise<ConversationAttachment> {
    return this.create({
      message_id: messageId,
      attachment_type: input.attachment_type,
      deliverable_id: input.deliverable_id || null,
      ai_document_id: input.ai_document_id || null,
      connection_id: input.connection_id || null,
      pipeline_run_id: input.pipeline_run_id || null,
      file_url: input.file_url || null,
      file_name: input.file_name || null,
      file_size: input.file_size || null,
      metadata: input.metadata || {}
    });
  }

  /**
   * Create multiple attachments for a message
   */
  async createManyForMessage(
    messageId: string,
    attachments: Array<Omit<CreateAttachmentInput, 'message_id'>>
  ): Promise<ConversationAttachment[]> {
    const data = attachments.map(att => ({
      message_id: messageId,
      attachment_type: att.attachment_type,
      deliverable_id: att.deliverable_id || null,
      ai_document_id: att.ai_document_id || null,
      connection_id: att.connection_id || null,
      pipeline_run_id: att.pipeline_run_id || null,
      file_url: att.file_url || null,
      file_name: att.file_name || null,
      file_size: att.file_size || null,
      metadata: att.metadata || {}
    }));

    return this.createMany(data);
  }

  /**
   * Get attachments of a specific type for a conversation
   */
  async findByType(
    conversationId: string,
    attachmentType: string
  ): Promise<ConversationAttachment[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select(`
        *,
        messages!inner(conversation_id)
      `)
      .eq('messages.conversation_id', conversationId)
      .eq('attachment_type', attachmentType)
      .order('created_at', { ascending: true });

    if (error) throw error;
    return data || [];
  }

  /**
   * Count attachments by type for a message
   */
  async countByTypeForMessage(messageId: string): Promise<{
    deliverable: number;
    ai_document: number;
    connection: number;
    pipeline_run: number;
    file: number;
  }> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('attachment_type')
      .eq('message_id', messageId);

    if (error) throw error;

    const counts = {
      deliverable: 0,
      ai_document: 0,
      connection: 0,
      pipeline_run: 0,
      file: 0
    };

    (data || []).forEach(att => {
      if (att.attachment_type in counts) {
        counts[att.attachment_type as keyof typeof counts]++;
      }
    });

    return counts;
  }

  /**
   * Get all pipeline executions referenced in a conversation
   */
  async getPipelineRunsForConversation(conversationId: string): Promise<string[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select(`
        pipeline_run_id,
        messages!inner(conversation_id)
      `)
      .eq('messages.conversation_id', conversationId)
      .eq('attachment_type', 'pipeline_run')
      .not('pipeline_run_id', 'is', null);

    if (error) throw error;

    // Return unique pipeline execution IDs
    const runIds = new Set<string>();
    (data || []).forEach(att => {
      if (att.pipeline_run_id) {
        runIds.add(att.pipeline_run_id);
      }
    });

    return Array.from(runIds);
  }

  /**
   * Delete all attachments for a message
   */
  async deleteByMessage(messageId: string): Promise<void> {
    const { error } = await this.supabase
      .from(this.tableName)
      .delete()
      .eq('message_id', messageId);

    if (error) throw error;
  }
}
