/**
 * ORGANIZATIONS MODEL - Organization management
 * 
 * @doc-code
 * type: orm-model
 * table: organizations
 * capabilities: ["settings", "members", "billing"]
 */

import { BaseModel } from './base';
import { Tables, Database } from '../types/database';
import { SupabaseClient } from '@supabase/supabase-js';

export class OrganizationsModel extends BaseModel<'organizations'> {
  constructor(supabase: SupabaseClient<Database>) {
    super(supabase, 'organizations');
  }

  /**
   * Find organization by slug
   */
  async findBySlug(slug: string): Promise<Tables<'organizations'> | null> {
    return this.findOneBy('slug', slug);
  }

  /**
   * Update organization settings
   */
  async updateSettings(
    organizationId: string, 
    settings: Record<string, unknown>
  ): Promise<Tables<'organizations'>> {
    const current = await this.findById(organizationId);
    if (!current) throw new Error('Organization not found');

    return this.update(organizationId, {
      settings: { ...current.settings, ...settings }
    });
  }

  /**
   * Get organization member count
   */
  async getMemberCount(organizationId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('users')
      .select('id', { count: 'exact', head: true })
      .eq('organization_id', organizationId);

    if (error) throw error;
    return count || 0;
  }

  /**
   * Check if slug is available
   */
  async isSlugAvailable(slug: string): Promise<boolean> {
    const existing = await this.findBySlug(slug);
    return !existing;
  }

  /**
   * Get organizations by creation date
   */
  async getRecent(limit = 10): Promise<Tables<'organizations'>[]> {
    return this.findAll({
      limit,
      orderBy: 'created_at',
      ascending: false
    });
  }
}