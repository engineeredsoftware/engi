import { SupabaseClient } from '@supabase/supabase-js';
import { BaseModel } from './base';
import type { Database, Tables, Insertable, Updatable } from '../types/database';

export type PipelineExecution = Tables<'executions'>;
export type PipelineExecutionInsert = Insertable<'executions'>;
export type PipelineExecutionUpdate = Updatable<'executions'>;

export class PipelineExecutionsModel extends BaseModel<'executions'> {
  constructor(supabase: SupabaseClient<Database>) {
    super(supabase, 'executions');
  }
}

