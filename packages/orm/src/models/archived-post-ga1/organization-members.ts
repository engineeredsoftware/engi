/**
 * Organization Members Model
 * 
 * Manages organization membership and roles.
 * 
 * @doc-code
 * type: model
 * table: organization_members
 */

import { BaseModel } from './base';
import { Tables, Insertable, Updatable } from '../types/database';

export type OrganizationMember = Tables<'organization_members'>;
export type OrganizationMemberInsert = Insertable<'organization_members'>;
export type OrganizationMemberUpdate = Updatable<'organization_members'>;

export type OrganizationRole = 'owner' | 'admin' | 'member' | 'viewer';

export class OrganizationMembersModel extends BaseModel<'organization_members'> {
  constructor() {
    super('organization_members');
  }

  /**
   * Get member by organization and user
   */
  async getMember(orgId: string, userId: string): Promise<OrganizationMember | null> {
    const { data, error } = await this.client
      .from(this.table)
      .select('*')
      .eq('organization_id', orgId)
      .eq('user_id', userId)
      .maybeSingle();

    if (error) throw error;
    return data;
  }

  /**
   * List members for organization
   */
  async listByOrganization(orgId: string): Promise<OrganizationMember[]> {
    const { data, error } = await this.client
      .from(this.table)
      .select(`
        *,
        user:user_profiles!inner(*)
      `)
      .eq('organization_id', orgId)
      .order('joined_at');

    if (error) throw error;
    return data || [];
  }

  /**
   * List organizations for user
   */
  async listByUser(userId: string): Promise<OrganizationMember[]> {
    const { data, error } = await this.client
      .from(this.table)
      .select(`
        *,
        organization:organizations!inner(*)
      `)
      .eq('user_id', userId)
      .order('joined_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  /**
   * Add member to organization
   */
  async addMember(
    orgId: string, 
    userId: string, 
    role: OrganizationRole = 'member'
  ): Promise<OrganizationMember> {
    const { data, error } = await this.client
      .from(this.table)
      .insert({
        organization_id: orgId,
        user_id: userId,
        role
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  /**
   * Update member role
   */
  async updateRole(
    orgId: string, 
    userId: string, 
    role: OrganizationRole
  ): Promise<OrganizationMember> {
    const { data, error } = await this.client
      .from(this.table)
      .update({ 
        role,
        updated_at: new Date().toISOString()
      })
      .eq('organization_id', orgId)
      .eq('user_id', userId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  /**
   * Remove member
   */
  async removeMember(orgId: string, userId: string): Promise<void> {
    const { error } = await this.client
      .from(this.table)
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
    const { data, error } = await this.client
      .from(this.table)
      .select('role')
      .eq('organization_id', orgId);

    if (error) throw error;

    const counts: Record<string, number> = {
      owner: 0,
      admin: 0,
      member: 0,
      viewer: 0
    };

    data?.forEach(m => {
      counts[m.role] = (counts[m.role] || 0) + 1;
    });

    return counts;
  }
}