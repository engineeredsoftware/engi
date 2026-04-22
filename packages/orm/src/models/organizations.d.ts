/**
 * ORGANIZATIONS MODEL - Organization management
 *
 * @doc-code
 * type: orm-model
 * table: organizations
 * capabilities: ["settings", "members", "billing"]
 */
import type { Database } from '../types/database';
import type { SupabaseClient } from '@supabase/supabase-js';
export interface OrganizationRecord {
    id: string;
    name: string;
    slug?: string | null;
    settings?: Record<string, unknown> | null;
    created_at?: string | null;
}
export declare class OrganizationsModel {
    constructor(supabase: SupabaseClient<Database>);
    private readonly supabase;
    getById(id: string): Promise<OrganizationRecord | null>;
    findBySlug(slug: string): Promise<OrganizationRecord | null>;
    updateSettings(organizationId: string, settings: Record<string, unknown>): Promise<OrganizationRecord>;
    getMemberCount(organizationId: string): Promise<number>;
    isSlugAvailable(slug: string): Promise<boolean>;
    getRecent(limit?: number): Promise<OrganizationRecord[]>;
}
