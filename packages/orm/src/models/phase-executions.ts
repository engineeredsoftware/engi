import { SupabaseClient } from '@supabase/supabase-js';
import { BaseModel } from './base';
import type { Database, Tables, Insertable, Updatable } from '../types/database';

export type PhaseExecution = Tables<'phase_executions'>;
export type PhaseExecutionInsert = Insertable<'phase_executions'>;
export type PhaseExecutionUpdate = Updatable<'phase_executions'>;

export class PhaseExecutionsModel extends BaseModel<'phase_executions'> {
  constructor(supabase: SupabaseClient<Database>) {
    super(supabase, 'phase_executions');
  }
}

