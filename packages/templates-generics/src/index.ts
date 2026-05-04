/**
 * Templates Generics Package
 * Provides types and business logic for templates system
 * V26 Production Ready
 */

import { log } from '@bitcode/logger';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { ShippableTemplate, ShippableTemplateType } from './types';

// Export all types
export * from './types';
export type {
  ShippableTemplate,
  AIDocumentTemplate,
  UserTemplatePreferences,
  ShippableTemplateType,
  AIDocumentTemplateType,
  CreateShippableTemplatePayload,
  CreateAIDocumentTemplatePayload,
  TemplatesResponse,
  TemplatePreferencesResponse
} from './types';

/**
 * Templates service for business logic
 */
export class TemplatesService {
  constructor(private supabase: SupabaseClient) {}

  private toShippableTemplate(row: Record<string, any>): ShippableTemplate | null {
    const storageType = row.shippable_type ?? row.deliverable_type;
    if (storageType !== 'pullRequests') return null;
    const { deliverable_type: _storageType, ...template } = row;
    return {
      ...template,
      shippable_type: 'pullRequests',
    } as ShippableTemplate;
  }

  /**
   * Get Shippable templates for the current user.
   * Physical table/column names are retained Exchange storage identifiers.
   */
  async getShippableTemplates(userId: string, type?: ShippableTemplateType) {
    try {
      let query = this.supabase
        .from('deliverable_templates')
        .select('*')
        .eq('user_id', userId)
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (type && type !== 'pullRequests') {
        return [];
      }

      if (type) {
        query = query.eq('deliverable_type', type);
      }

      const { data, error } = await query;
      
      if (error) {
        log('[TemplatesService] Error fetching Shippable templates', 'error', { error });
        throw error;
      }

      return ((data || []) as Record<string, any>[])
        .map((row) => this.toShippableTemplate(row))
        .filter((template): template is ShippableTemplate => Boolean(template));
    } catch (error) {
      log('[TemplatesService] Failed to get Shippable templates', 'error', { error });
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
   * Create Shippable templates.
   * Physical table/column names are retained Exchange storage identifiers.
   */
  async createShippableTemplates(
    userId: string,
    name: string,
    types: ShippableTemplateType[],
    templateText: string
  ) {
    try {
      const invalidType = types.find((type) => type !== 'pullRequests');
      if (invalidType) {
        throw new Error(`Unsupported V26 Shippable template type: ${invalidType}`);
      }

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
        log('[TemplatesService] Error creating Shippable templates', 'error', { error });
        throw error;
      }

      return ((data || []) as Record<string, any>[])
        .map((row) => this.toShippableTemplate(row))
        .filter((template): template is ShippableTemplate => Boolean(template));
    } catch (error) {
      log('[TemplatesService] Failed to create Shippable templates', 'error', { error });
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
      default_shippable_template_id: string | null;
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
    type: 'shippable' | 'ai_documents'
  ) {
    try {
      const table = type === 'shippable' ? 'deliverable_templates' : 'ai_document_templates';
      
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
