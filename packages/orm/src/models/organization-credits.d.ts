import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '../types/database';
export interface OrganizationCreditBalance {
    organization_id: string;
    balance: number;
}
export declare class OrganizationCreditsModel {
    private readonly supabase;
    constructor(supabase: SupabaseClient<Database>);
    getByOrganizationId(organizationId: string): Promise<OrganizationCreditBalance | null>;
}
