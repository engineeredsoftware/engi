/**
 * RUNS MODEL - Pipeline run tracking
 * 
 * @doc-code
 * type: orm-model
 * table: runs
 * capabilities: ["status", "metrics", "results"]
 */

import { BaseModel } from './base';
import { Tables, Database } from '../types/database';
import { SupabaseClient } from '@supabase/supabase-js';

export class RunsModel extends BaseModel<'runs'> {
  constructor(supabase: SupabaseClient<Database>) {
    super(supabase, 'runs');
  }

  /**
   * Get runs for a deliverable
   */
  async findByDeliverable(
    deliverableId: string,
    options?: { limit?: number; status?: Tables<'runs'>['status'] }
  ): Promise<Tables<'runs'>[]> {
    let query = this.supabase
      .from(this.tableName)
      .select('*')
      .eq('deliverable_id', deliverableId)
      .order('created_at', { ascending: false });

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
   * Start a run
   */
  async start(runId: string): Promise<Tables<'runs'>> {
    return this.update(runId, {
      status: 'running',
      started_at: new Date().toISOString()
    });
  }

  /**
   * Complete a run
   */
  async complete(
    runId: string, 
    result: Record<string, unknown>
  ): Promise<Tables<'runs'>> {
    const run = await this.findById(runId);
    if (!run) throw new Error('Run not found');

    const startTime = run.started_at ? new Date(run.started_at).getTime() : Date.now();
    const executionTime = Date.now() - startTime;

    return this.update(runId, {
      status: 'completed',
      completed_at: new Date().toISOString(),
      execution_time_ms: executionTime,
      result
    });
  }

  /**
   * Fail a run
   */
  async fail(runId: string, error: string): Promise<Tables<'runs'>> {
    return this.update(runId, {
      status: 'failed',
      completed_at: new Date().toISOString(),
      error_message: error
    });
  }

  /**
   * Get run statistics
   */
  async getStats(deliverableId: string): Promise<{
    total: number;
    successful: number;
    failed: number;
    avgExecutionTime: number;
  }> {
    const runs = await this.findByDeliverable(deliverableId);
    
    const successful = runs.filter(r => r.status === 'completed').length;
    const failed = runs.filter(r => r.status === 'failed').length;
    
    const completedRuns = runs.filter(r => r.execution_time_ms !== null);
    const avgExecutionTime = completedRuns.length > 0
      ? completedRuns.reduce((sum, r) => sum + (r.execution_time_ms || 0), 0) / completedRuns.length
      : 0;

    return {
      total: runs.length,
      successful,
      failed,
      avgExecutionTime
    };
  }

  /**
   * Get recent runs across all deliverables
   */
  async getRecent(limit = 50): Promise<Tables<'runs'>[]> {
    return this.findAll({
      limit,
      orderBy: 'created_at',
      ascending: false
    });
  }

  /**
   * Cancel a run
   */
  async cancel(runId: string): Promise<Tables<'runs'>> {
    return this.update(runId, {
      status: 'cancelled',
      completed_at: new Date().toISOString()
    });
  }
}