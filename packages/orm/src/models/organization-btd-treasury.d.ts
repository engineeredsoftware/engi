import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '../types/database';
export interface OrganizationBtdTreasuryBalance {
    organization_id: string;
    balance: number;
}
export declare class OrganizationBtdTreasuryModel {
    private readonly supabase;
    constructor(supabase: SupabaseClient<Database>);
    getByOrganizationId(organizationId: string): Promise<OrganizationBtdTreasuryBalance | null>;
}
