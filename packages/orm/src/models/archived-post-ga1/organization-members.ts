/**
 * Organization Members Model
 * 
 * Manages organization membership and roles.
 * 
 * @doc-code
 * type: model
 * table: organization_members
 */

import type { Database } from '../../types/database';
import type { SupabaseClient } from '@supabase/supabase-js';

export interface OrganizationMember {
  organization_id: string;
  user_id: string;
  role: string;
  permissions?: Record<string, unknown> | null;
  joined_at?: string | null;
  updated_at?: string | null;
}

export interface OrganizationMemberInsert extends Partial<OrganizationMember> {
  organization_id: string;
  user_id: string;
}

export type OrganizationMemberUpdate = Partial<OrganizationMember>;

export type OrganizationRole = 'owner' | 'admin' | 'member' | 'viewer';

export class OrganizationMembersModel {
  constructor(supabase: SupabaseClient<Database>) {
    this.supabase = supabase;
  }

  private readonly supabase: SupabaseClient<Database>;

  /**
   * Get member by organization and user
   */
  async getMember(orgId: string, userId: string): Promise<OrganizationMember | null> {
    const { data, error } = await this.supabase
      .from('organization_members' as any)
      .select('*')
      .eq('organization_id', orgId)
      .eq('user_id', userId)
      .maybeSingle();

    if (error) throw error;
    return (data as unknown as OrganizationMember | null) || null;
  }

  /**
   * List members for organization
   */
  async listByOrganization(orgId: string): Promise<OrganizationMember[]> {
    const { data, error } = await this.supabase
      .from('organization_members' as any)
      .select('*')
      .eq('organization_id', orgId)
      .order('joined_at');

    if (error) throw error;
    return (data as unknown as OrganizationMember[]) || [];
  }

  /**
   * List organizations for user
   */
  async listByUser(userId: string): Promise<OrganizationMember[]> {
    const { data, error } = await this.supabase
      .from('organization_members' as any)
      .select('*')
      .eq('user_id', userId)
      .order('joined_at', { ascending: false });

    if (error) throw error;
    return (data as unknown as OrganizationMember[]) || [];
  }

  /**
   * Add member to organization
   */
  async addMember(
    orgId: string, 
    userId: string, 
    role: OrganizationRole = 'member'
  ): Promise<OrganizationMember> {
    const { data, error } = await this.supabase
      .from('organization_members' as any)
      .insert({
        organization_id: orgId,
        user_id: userId,
        role
      })
      .select()
      .single();

    if (error) throw error;
    return data as unknown as OrganizationMember;
  }

  /**
   * Update member role
   */
  async updateRole(
    orgId: string, 
    userId: string, 
    role: OrganizationRole
  ): Promise<OrganizationMember> {
    const { data, error } = await this.supabase
      .from('organization_members' as any)
      .update({ 
        role,
        updated_at: new Date().toISOString()
      })
      .eq('organization_id', orgId)
      .eq('user_id', userId)
      .select()
      .single();

    if (error) throw error;
    return data as unknown as OrganizationMember;
  }

  /**
   * Remove member
   */
  async removeMember(orgId: string, userId: string): Promise<void> {
    const { error } = await this.supabase
      .from('organization_members' as any)
      .delete()
      .eq('organization_id', orgId)
      .eq('user_id', userId);

    if (error) throw error;
  }

  /**
   * Check if user has permission
   */
  async hasPermission(
    orgId: string, 
    userId: string, 
    requiredRoles: OrganizationRole[]
  ): Promise<boolean> {
    const member = await this.getMember(orgId, userId);
    return member ? requiredRoles.includes(member.role as OrganizationRole) : false;
  }

  /**
   * Count members by role
   */
  async countByRole(orgId: string): Promise<Record<string, number>> {
    const { data, error } = await this.supabase
      .from('organization_members' as any)
      .select('role')
      .eq('organization_id', orgId);

    if (error) throw error;

    const counts: Record<string, number> = {
      owner: 0,
      admin: 0,
      member: 0,
      viewer: 0
    };

    (data as unknown as OrganizationMember[] | null)?.forEach(m => {
      counts[m.role] = (counts[m.role] || 0) + 1;
    });

    return counts;
  }

  async getMembership(orgId: string, userId: string): Promise<OrganizationMember | null> {
    return this.getMember(orgId, userId);
  }
}
