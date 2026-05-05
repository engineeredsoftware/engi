import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '../types/database';
export declare class OrganizationBtdUsageModel {
    private readonly supabase;
    constructor(supabase: SupabaseClient<Database>);
}
