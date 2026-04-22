/**
 * USERS MODEL - User management with production features
 *
 * @doc-code
 * type: orm-model
 * table: users
 * capabilities: ["auth", "profile", "organization"]
 */
import type { Database } from '../types/database';
import type { SupabaseClient } from '@supabase/supabase-js';
export interface UserRecord {
    id: string;
    email?: string | null;
    full_name?: string | null;
    avatar_url?: string | null;
    organization_id?: string | null;
    updated_at?: string | null;
    metadata?: Record<string, unknown> | null;
}
export declare class UsersModel {
    constructor(supabase: SupabaseClient<Database>);
    private readonly supabase;
    getById(id: string): Promise<UserRecord | null>;
    findByEmail(email: string): Promise<UserRecord | null>;
    findByOrganization(organizationId: string): Promise<UserRecord[]>;
    updateProfile(userId: string, profile: {
        full_name?: string;
        avatar_url?: string;
        metadata?: Record<string, unknown>;
    }): Promise<UserRecord>;
    assignToOrganization(userId: string, organizationId: string): Promise<UserRecord>;
    getActiveUsers(limit?: number): Promise<UserRecord[]>;
}
