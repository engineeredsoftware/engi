/**
 * ORGANIZATIONS MODEL - Organization management
 * 
 * @doc-code
 * type: orm-model
 * table: organizations
 * capabilities: ["settings", "members", "billing"]
 */

import type { Database } from '../../types/database';
import type { SupabaseClient } from '@supabase/supabase-js';

export interface OrganizationRecord {
  id: string;
  name: string;
  slug?: string | null;
  settings?: Record<string, unknown> | null;
  created_at?: string | null;
}

export class OrganizationsModel {
  constructor(supabase: SupabaseClient<Database>) {
    this.supabase = supabase;
  }

  private readonly supabase: SupabaseClient<Database>;

  async getById(id: string): Promise<OrganizationRecord | null> {
    const { data, error } = await this.supabase
      .from('organizations' as any)
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    return (data as unknown as OrganizationRecord | null) || null;
  }

  /**
   * Find organization by slug
   */
  async findBySlug(slug: string): Promise<OrganizationRecord | null> {
    const { data, error } = await this.supabase
      .from('organizations' as any)
      .select('*')
      .eq('slug', slug)
      .maybeSingle();

    if (error) throw error;
    return (data as unknown as OrganizationRecord | null) || null;
  }

  /**
   * Update organization settings
   */
  async updateSettings(
    organizationId: string, 
    settings: Record<string, unknown>
  ): Promise<OrganizationRecord> {
    const current = await this.getById(organizationId);
    if (!current) throw new Error('Organization not found');

    const { data, error } = await this.supabase
      .from('organizations' as any)
      .update({
        settings: { ...(current.settings || {}), ...settings }
      } as any)
      .eq('id', organizationId)
      .select('*')
      .single();

    if (error) throw error;
    return data as unknown as OrganizationRecord;
  }

  /**
   * Get organization member count
   */
  async getMemberCount(organizationId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('organization_members' as any)
      .select('user_id', { count: 'exact', head: true })
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
  async getRecent(limit = 10): Promise<OrganizationRecord[]> {
    const { data, error } = await this.supabase
      .from('organizations' as any)
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return ((data || []) as unknown) as OrganizationRecord[];
  }
}
