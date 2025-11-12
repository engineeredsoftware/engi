/**
 * VCS Repositories Model
 *
 * Manages version control system repository metadata for connected repos.
 * Supports GitHub, GitLab, Bitbucket integration.
 *
 * @package @engi/orm
 */

import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/database.generated';

export type VCSRepository = Database['public']['Tables']['vcs_repositories']['Row'];
export type VCSRepositoryInsert = Database['public']['Tables']['vcs_repositories']['Insert'];
export type VCSRepositoryUpdate = Database['public']['Tables']['vcs_repositories']['Update'];

export interface VCSRepositoryMetadata {
  description?: string;
  language?: string;
  topics?: string[];
  stars?: number;
  forks?: number;
  isPrivate?: boolean;
  lastSyncedAt?: string;
}

/**
 * Repository model for CRUD operations
 */
export class VCSRepositoryModel {
  constructor(private supabase: ReturnType<typeof createClient<Database>>) {}

  /**
   * Find repository by full name (owner/repo)
   */
  async findByFullName(
    userId: string,
    provider: string,
    fullName: string
  ): Promise<VCSRepository | null> {
    const { data, error } = await this.supabase
      .from('vcs_repositories')
      .select('*')
      .eq('user_id', userId)
      .eq('provider', provider)
      .eq('full_name', fullName)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null; // Not found
      throw error;
    }

    return data;
  }

  /**
   * List all repositories for a user
   */
  async listByUser(
    userId: string,
    provider?: string
  ): Promise<VCSRepository[]> {
    let query = this.supabase
      .from('vcs_repositories')
      .select('*')
      .eq('user_id', userId)
      .order('updated_at', { ascending: false });

    if (provider) {
      query = query.eq('provider', provider);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data || [];
  }

  /**
   * Create or update repository
   */
  async upsert(repo: VCSRepositoryInsert): Promise<VCSRepository> {
    const { data, error } = await this.supabase
      .from('vcs_repositories')
      .upsert(repo, {
        onConflict: 'user_id,provider,full_name',
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  /**
   * Update repository metadata
   */
  async updateMetadata(
    id: string,
    metadata: Partial<VCSRepositoryMetadata>
  ): Promise<VCSRepository> {
    const { data, error } = await this.supabase
      .from('vcs_repositories')
      .update({ metadata: metadata as any })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  /**
   * Delete repository
   */
  async delete(id: string): Promise<void> {
    const { error } = await this.supabase
      .from('vcs_repositories')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }

  /**
   * Search repositories by name
   */
  async search(
    userId: string,
    query: string,
    limit: number = 20
  ): Promise<VCSRepository[]> {
    const { data, error } = await this.supabase
      .from('vcs_repositories')
      .select('*')
      .eq('user_id', userId)
      .or(`full_name.ilike.%${query}%,name.ilike.%${query}%`)
      .limit(limit);

    if (error) throw error;
    return data || [];
  }
}

/**
 * Singleton instance for convenience
 */
let instance: VCSRepositoryModel | null = null;

export function getVCSRepositoryModel(supabase: ReturnType<typeof createClient<Database>>): VCSRepositoryModel {
  if (!instance) {
    instance = new VCSRepositoryModel(supabase);
  }
  return instance;
}
