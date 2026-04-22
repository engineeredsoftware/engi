/**
 * Organization Members Model
 *
 * Manages organization membership and roles.
 *
 * @doc-code
 * type: model
 * table: organization_members
 */
import type { Database } from '../types/database';
import type { SupabaseClient } from '@supabase/supabase-js';
export interface OrganizationMember {
    organization_id: string;
    user_id: string;
    role: string;
    permissions?: Record<string, unknown> | null;
    credit_budget?: number | null;
    is_active?: boolean | null;
    joined_at?: string | null;
    updated_at?: string | null;
}
export interface OrganizationMemberInsert extends Partial<OrganizationMember> {
    organization_id: string;
    user_id: string;
}
export type OrganizationMemberUpdate = Partial<OrganizationMember>;
export type OrganizationRole = 'owner' | 'admin' | 'member' | 'viewer';
export declare class OrganizationMembersModel {
    constructor(supabase: SupabaseClient<Database>);
    private readonly supabase;
    getMember(orgId: string, userId: string): Promise<OrganizationMember | null>;
    listByOrganization(orgId: string): Promise<OrganizationMember[]>;
    listByUser(userId: string): Promise<OrganizationMember[]>;
    addMember(orgId: string, userId: string, role?: OrganizationRole): Promise<OrganizationMember>;
    updateRole(orgId: string, userId: string, role: OrganizationRole): Promise<OrganizationMember>;
    removeMember(orgId: string, userId: string): Promise<void>;
    hasPermission(orgId: string, userId: string, requiredRoles: OrganizationRole[]): Promise<boolean>;
    countByRole(orgId: string): Promise<Record<string, number>>;
    getMembership(orgId: string, userId: string): Promise<OrganizationMember | null>;
    getMembers(orgId: string): Promise<OrganizationMember[]>;
}
