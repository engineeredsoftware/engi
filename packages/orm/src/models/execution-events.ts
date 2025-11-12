import { SupabaseClient } from '@supabase/supabase-js';
import { BaseModel } from './base';
import type { Database, Tables, Insertable } from '../types/database';

export type ExecutionEvent = Tables<'execution_events'>;
export type ExecutionEventInsert = Insertable<'execution_events'>;

export class ExecutionEventsModel extends BaseModel<'execution_events'> {
  constructor(supabase: SupabaseClient<Database>) {
    super(supabase, 'execution_events');
  }

  /**
   * Retrieve events for a run ordered by creation time.
   */
  async getByRunId(runId: string, options?: { since?: string; limit?: number }) {
    let query = this.supabase
      .from(this.tableName)
      .select('*')
      .eq('run_id', runId)
      .order('created_at');

    if (options?.since) {
      query = query.gt('created_at', options.since);
    }

    if (options?.limit) {
      query = query.limit(options.limit);
    }

    const { data, error } = await query;
    if (error) throw error;
    return (data || []) as ExecutionEvent[];
  }
}
