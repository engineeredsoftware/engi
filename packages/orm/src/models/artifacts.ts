/**
 * Artifacts Model
 *
 * Manages file artifacts and attachments stored during pipeline execution.
 * Tracks files in S3/blob storage with metadata.
 *
 * @package @engi/orm
 */

import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/database.generated';

export type Artifact = Database['public']['Tables']['artifacts']['Row'];
export type ArtifactInsert = Database['public']['Tables']['artifacts']['Insert'];
export type ArtifactUpdate = Database['public']['Tables']['artifacts']['Update'];

export type ArtifactType =
  | 'source_file'
  | 'patch'
  | 'attachment'
  | 'screenshot'
  | 'document'
  | 'media';

export interface ArtifactMetadata {
  originalName?: string;
  checksum?: string;
  compressed?: boolean;
  encryption?: string;
  tags?: string[];
  relatedFiles?: string[];
}

/**
 * Artifact model for CRUD operations
 */
export class ArtifactModel {
  constructor(private supabase: ReturnType<typeof createClient<Database>>) {}

  /**
   * Create new artifact
   */
  async create(artifact: ArtifactInsert): Promise<Artifact> {
    const { data, error } = await this.supabase
      .from('artifacts')
      .insert(artifact)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  /**
   * Get artifact by ID
   */
  async getById(id: string): Promise<Artifact | null> {
    const { data, error } = await this.supabase
      .from('artifacts')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw error;
    }

    return data;
  }

  /**
   * List artifacts for an execution
   */
  async listByExecution(executionId: string): Promise<Artifact[]> {
    const { data, error } = await this.supabase
      .from('artifacts')
      .select('*')
      .eq('execution_id', executionId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  /**
   * List artifacts by type
   */
  async listByType(
    userId: string,
    type: string,
    limit: number = 50
  ): Promise<Artifact[]> {
    const { data, error } = await this.supabase
      .from('artifacts')
      .select('*')
      .eq('user_id', userId)
      .eq('type', type)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  }

  /**
   * Delete artifact
   */
  async delete(id: string): Promise<void> {
    const { error } = await this.supabase
      .from('artifacts')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }

  /**
   * Delete all artifacts for an execution
   */
  async deleteByExecution(executionId: string): Promise<void> {
    const { error } = await this.supabase
      .from('artifacts')
      .delete()
      .eq('execution_id', executionId);

    if (error) throw error;
  }

  /**
   * Get total storage size for user
   */
  async getTotalSize(userId: string): Promise<number> {
    const { data, error } = await this.supabase
      .from('artifacts')
      .select('size_bytes')
      .eq('user_id', userId);

    if (error) throw error;

    return (data || []).reduce((sum, a) => sum + (a.size_bytes || 0), 0);
  }

  /**
   * Search artifacts by name
   */
  async search(
    userId: string,
    query: string,
    limit: number = 20
  ): Promise<Artifact[]> {
    const { data, error } = await this.supabase
      .from('artifacts')
      .select('*')
      .eq('user_id', userId)
      .ilike('name', `%${query}%`)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  }
}

/**
 * Singleton instance
 */
let instance: ArtifactModel | null = null;

export function getArtifactModel(supabase: ReturnType<typeof createClient<Database>>): ArtifactModel {
  if (!instance) {
    instance = new ArtifactModel(supabase);
  }
  return instance;
}
