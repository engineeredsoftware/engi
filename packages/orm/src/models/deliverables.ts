/**
 * DELIVERABLES MODEL - Deliverable pipeline management
 * 
 * @doc-code
 * type: orm-model
 * table: deliverables
 * capabilities: ["execution", "effectiveness", "scheduling"]
 */

import { BaseModel } from './base';
import { Tables, Database, Insertable, Updatable, Json } from '../types/database';
import { SupabaseClient } from '@supabase/supabase-js';

export type DeliverableCompatibility = Tables<'deliverables'> & {
  name: string;
  metadata?: Record<string, any> | null;
  organization_id?: string | null;
};

function asMetadata(value: Json | null | undefined): Record<string, any> | null {
  return value && typeof value === 'object' && !Array.isArray(value)
    ? (value as Record<string, any>)
    : null;
}

function normalizeDeliverable(row: Tables<'deliverables'>): DeliverableCompatibility {
  return {
    ...row,
    name: row.title,
    metadata: asMetadata(row.config),
    organization_id: asMetadata(row.config)?.organizationId ? String(asMetadata(row.config)?.organizationId) : null,
  };
}

export class DeliverablesModel extends BaseModel<'deliverables'> {
  constructor(supabase: SupabaseClient<Database>) {
    super(supabase, 'deliverables');
  }

  async getById(id: string): Promise<DeliverableCompatibility | null> {
    const row = await super.getById(id);
    return row ? normalizeDeliverable(row) : null;
  }

  async findAll(options?: {
    limit?: number;
    offset?: number;
    orderBy?: keyof Tables<'deliverables'>;
    ascending?: boolean;
  }): Promise<DeliverableCompatibility[]> {
    const rows = await super.findAll(options);
    return rows.map(normalizeDeliverable);
  }

  async getAll(options?: {
    limit?: number;
    offset?: number;
    orderBy?: keyof Tables<'deliverables'>;
    ascending?: boolean;
  }): Promise<DeliverableCompatibility[]> {
    return this.findAll(options);
  }

  async create(
    data: (Insertable<'deliverables'> & {
      name?: string;
      metadata?: Record<string, any>;
      organization_id?: string | null;
    }) | any,
  ): Promise<DeliverableCompatibility> {
    const created = await super.create({
      ...data,
      title: data.title ?? data.name ?? 'Untitled deliverable',
      config: data.config ?? data.metadata ?? null,
      user_id: data.user_id ?? data.organization_id ?? 'unknown-user',
    });
    return normalizeDeliverable(created);
  }

  async update(
    id: string,
    data: (Updatable<'deliverables'> & {
      name?: string;
      metadata?: Record<string, any>;
      organization_id?: string | null;
    }) | any,
  ): Promise<DeliverableCompatibility> {
    const updated = await super.update(id, {
      ...data,
      title: data.title ?? data.name,
      config: data.config ?? data.metadata,
      user_id: data.user_id ?? data.organization_id,
    });
    return normalizeDeliverable(updated);
  }

  /**
   * Find deliverables by organization
   */
  async findByOrganization(
    organizationId: string,
    options?: { status?: Tables<'deliverables'>['status']; limit?: number }
  ): Promise<DeliverableCompatibility[]> {
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
    return (data || []).map(normalizeDeliverable);
  }

  /**
   * Find deliverables by repository
   */
  async findByRepository(repositoryId: string): Promise<DeliverableCompatibility[]> {
    const rows = await this.findBy('template_id', repositoryId);
    return rows.map(normalizeDeliverable);
  }

  /**
   * Update deliverable status
   */
  async updateStatus(
    deliverableId: string,
    status: Tables<'deliverables'>['status']
  ): Promise<DeliverableCompatibility> {
    return this.update(deliverableId, { status });
  }

  /**
   * Update effectiveness score
   */
  async updateEffectiveness(
    deliverableId: string,
    score: number
  ): Promise<DeliverableCompatibility> {
    return this.update(deliverableId, { 
      effectiveness_score: Math.min(1, Math.max(0, score))
    });
  }

  /**
   * Mark as recently run
   */
  async markAsRun(deliverableId: string): Promise<DeliverableCompatibility> {
    return this.update(deliverableId, {
      execution_count: 1,
      updated_at: new Date().toISOString()
    });
  }

  /**
   * Get high-performing deliverables
   */
  async getHighPerformers(limit = 10): Promise<DeliverableCompatibility[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .gte('effectiveness_score', 0.8)
      .order('effectiveness_score', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return (data || []).map(normalizeDeliverable);
  }

  /**
   * Get deliverables needing attention
   */
  async getNeedingAttention(): Promise<DeliverableCompatibility[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .or('status.eq.failed,effectiveness_score.lt.0.5')
      .order('updated_at', { ascending: false });

    if (error) throw error;
    return (data || []).map(normalizeDeliverable);
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
      const status = d.status || 'unknown';
      acc[status] = (acc[status] || 0) + 1;
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
  ): Promise<DeliverableCompatibility> {
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
