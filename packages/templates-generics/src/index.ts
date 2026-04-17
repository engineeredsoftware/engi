/**
 * Templates Generics Package
 * Provides types and business logic for templates system
 * GA-1 Production Ready
 */

import { log } from '@bitcode/logger';
import type { SupabaseClient } from '@supabase/supabase-js';

// Export all types
export * from './types';
export type {
  DeliverableTemplate,
  AIDocumentTemplate,
  UserTemplatePreferences,
  DeliverableTemplateType,
  AIDocumentTemplateType,
  CreateDeliverableTemplatePayload,
  CreateAIDocumentTemplatePayload,
  TemplatesResponse,
  TemplatePreferencesResponse
} from './types';

/**
 * Templates service for business logic
 */
export class TemplatesService {
  constructor(private supabase: SupabaseClient) {}

  /**
   * Get deliverable templates for the current user
   */
  async getDeliverableTemplates(userId: string, type?: string) {
    try {
      let query = this.supabase
        .from('deliverable_templates')
        .select('*')
        .eq('user_id', userId)
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (type) {
        query = query.eq('deliverable_type', type);
      }

      const { data, error } = await query;
      
      if (error) {
        log('[TemplatesService] Error fetching deliverable templates', 'error', { error });
        throw error;
      }

      return data || [];
    } catch (error) {
      log('[TemplatesService] Failed to get deliverable templates', 'error', { error });
      throw error;
    }
  }

  /**
   * Get AI Document templates for the current user
   */
  async getAIDocumentTemplates(userId: string, type?: string) {
    try {
      let query = this.supabase
        .from('ai_document_templates')
        .select('*')
        .eq('user_id', userId)
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (type) {
        query = query.eq('ai_document_type', type);
      }

      const { data, error } = await query;
      
      if (error) {
        log('[TemplatesService] Error fetching AI Document templates', 'error', { error });
        throw error;
      }

      return data || [];
    } catch (error) {
      log('[TemplatesService] Failed to get AI Document templates', 'error', { error });
      throw error;
    }
  }

  /**
   * Create deliverable templates
   */
  async createDeliverableTemplates(
    userId: string,
    name: string,
    types: string[],
    templateText: string
  ) {
    try {
      const rows = types.map((type) => ({
        user_id: userId,
        name: name.trim(),
        deliverable_type: type,
        template_text: templateText,
        is_active: true
      }));

      const { data, error } = await this.supabase
        .from('deliverable_templates')
        .insert(rows)
        .select();

      if (error) {
        log('[TemplatesService] Error creating deliverable templates', 'error', { error });
        throw error;
      }

      return data;
    } catch (error) {
      log('[TemplatesService] Failed to create deliverable templates', 'error', { error });
      throw error;
    }
  }

  /**
   * Create AI Document templates
   */
  async createAIDocumentTemplates(
    userId: string,
    name: string,
    types: string[],
    templateText: string
  ) {
    try {
      const rows = types.map((type) => ({
        user_id: userId,
        name: name.trim(),
        ai_document_type: type,
        template_text: templateText,
        is_active: true
      }));

      const { data, error } = await this.supabase
        .from('ai_document_templates')
        .insert(rows)
        .select();

      if (error) {
        log('[TemplatesService] Error creating AI Document templates', 'error', { error });
        throw error;
      }

      return data;
    } catch (error) {
      log('[TemplatesService] Failed to create AI Document templates', 'error', { error });
      throw error;
    }
  }

  /**
   * Get user template preferences
   */
  async getUserPreferences(userId: string) {
    try {
      const { data, error } = await this.supabase
        .from('user_template_preferences')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error && error.code !== 'PGRST116') { // Not found is ok
        log('[TemplatesService] Error fetching user preferences', 'error', { error });
        throw error;
      }

      return data;
    } catch (error) {
      log('[TemplatesService] Failed to get user preferences', 'error', { error });
      throw error;
    }
  }

  /**
   * Update user template preferences
   */
  async updateUserPreferences(
    userId: string,
    preferences: Partial<{
      default_deliverable_template_id: string | null;
      default_ai_document_template_id: string | null;
      auto_save_templates: boolean;
    }>
  ) {
    try {
      const { data, error } = await this.supabase
        .from('user_template_preferences')
        .upsert({
          user_id: userId,
          ...preferences,
          updated_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) {
        log('[TemplatesService] Error updating user preferences', 'error', { error });
        throw error;
      }

      return data;
    } catch (error) {
      log('[TemplatesService] Failed to update user preferences', 'error', { error });
      throw error;
    }
  }

  /**
   * Delete a template (soft delete by setting is_active to false)
   */
  async deleteTemplate(
    userId: string,
    templateId: string,
    type: 'deliverable' | 'ai_documents'
  ) {
    try {
      const table = type === 'deliverable' ? 'deliverable_templates' : 'ai_document_templates';
      
      const { error } = await this.supabase
        .from(table)
        .update({ is_active: false, updated_at: new Date().toISOString() })
        .eq('id', templateId)
        .eq('user_id', userId);

      if (error) {
        log(`[TemplatesService] Error deleting ${type} template`, 'error', { error });
        throw error;
      }

      return true;
    } catch (error) {
      log('[TemplatesService] Failed to delete template', 'error', { error });
      throw error;
    }
  }
}
