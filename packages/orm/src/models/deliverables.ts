/**
 * DELIVERABLES MODEL - Deliverable pipeline management
 * 
 * @doc-code
 * type: orm-model
 * table: deliverables
 * capabilities: ["execution", "effectiveness", "scheduling"]
 */

import { BaseModel } from './base';
import { Tables, Database } from '../types/database';
import { SupabaseClient } from '@supabase/supabase-js';

export class DeliverablesModel extends BaseModel<'deliverables'> {
  constructor(supabase: SupabaseClient<Database>) {
    super(supabase, 'deliverables');
  }

  /**
   * Find deliverables by organization
   */
  async findByOrganization(
    organizationId: string,
    options?: { status?: Tables<'deliverables'>['status']; limit?: number }
  ): Promise<Tables<'deliverables'>[]> {
    let query = this.supabase
      .from(this.tableName)
      .select('*')
      .eq('user_id', organizationId)
      .order('updated_at', { ascending: false });

    if (options?.status) {
      query = query.eq('status', options.status);
    }

    if (options?.limit) {
      query = query.limit(options.limit);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  }

  /**
   * Find deliverables by repository
   */
  async findByRepository(repositoryId: string): Promise<Tables<'deliverables'>[]> {
    return this.findBy('template_id', repositoryId);
  }

  /**
   * Update deliverable status
   */
  async updateStatus(
    deliverableId: string,
    status: Tables<'deliverables'>['status']
  ): Promise<Tables<'deliverables'>> {
    return this.update(deliverableId, { status });
  }

  /**
   * Update effectiveness score
   */
  async updateEffectiveness(
    deliverableId: string,
    score: number
  ): Promise<Tables<'deliverables'>> {
    return this.update(deliverableId, { 
      effectiveness_score: Math.min(1, Math.max(0, score))
    });
  }

  /**
   * Mark as recently run
   */
  async markAsRun(deliverableId: string): Promise<Tables<'deliverables'>> {
    return this.update(deliverableId, {
      execution_count: 1,
      updated_at: new Date().toISOString()
    });
  }

  /**
   * Get high-performing deliverables
   */
  async getHighPerformers(limit = 10): Promise<Tables<'deliverables'>[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .gte('effectiveness_score', 0.8)
      .order('effectiveness_score', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  }

  /**
   * Get deliverables needing attention
   */
  async getNeedingAttention(): Promise<Tables<'deliverables'>[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .or('status.eq.failed,effectiveness_score.lt.0.5')
      .order('updated_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  /**
   * Get deliverable statistics by organization
   */
  async getStatsByOrganization(organizationId: string): Promise<{
    total: number;
    byStatus: Record<string, number>;
    avgEffectiveness: number;
  }> {
    const deliverables = await this.findByOrganization(organizationId);
    
    const byStatus = deliverables.reduce((acc, d) => {
      acc[d.status] = (acc[d.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const withScores = deliverables.filter(d => d.effectiveness_score !== null);
    const avgEffectiveness = withScores.length > 0
      ? withScores.reduce((sum, d) => sum + (d.effectiveness_score || 0), 0) / withScores.length
      : 0;

    return {
      total: deliverables.length,
      byStatus,
      avgEffectiveness
    };
  }

  /**
   * Clone a deliverable
   */
  async clone(
    deliverableId: string,
    overrides?: Partial<Tables<'deliverables'>>
  ): Promise<Tables<'deliverables'>> {
    const original = await this.findById(deliverableId);
    if (!original) throw new Error('Deliverable not found');

    const { id, created_at, updated_at, ...cloneData } = original;
    
    return this.create({
      ...cloneData,
      title: `${cloneData.title} (Copy)`,
      status: 'pending',
      effectiveness_score: null,
      execution_count: 0,
      ...overrides
    });
  }
}
