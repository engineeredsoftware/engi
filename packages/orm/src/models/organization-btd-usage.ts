import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '../types/database';

export class OrganizationBtdUsageModel {
  constructor(private readonly supabase: SupabaseClient<Database>) {
    void this.supabase;
  }
}
