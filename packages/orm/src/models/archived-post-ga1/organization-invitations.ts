/**
 * Organization Invitations Model
 * 
 * Manages organization invitations.
 * 
 * @doc-code
 * type: model
 * table: organization_invitations
 */

import { BaseModel } from './base';
import { Tables, Insertable, Updatable } from '../types/database';
import { OrganizationRole } from './organization-members';

export type OrganizationInvitation = Tables<'organization_invitations'>;
export type OrganizationInvitationInsert = Insertable<'organization_invitations'>;
export type OrganizationInvitationUpdate = Updatable<'organization_invitations'>;

export type InvitationStatus = 'pending' | 'accepted' | 'rejected' | 'expired';

export class OrganizationInvitationsModel extends BaseModel<'organization_invitations'> {
  constructor() {
    super('organization_invitations');
  }

  /**
   * Get invitation by code
   */
  async getByCode(inviteCode: string): Promise<OrganizationInvitation | null> {
    const { data, error } = await this.client
      .from(this.table)
      .select('*')
      .eq('invite_code', inviteCode)
      .maybeSingle();

    if (error) throw error;
    return data;
  }

  /**
   * List invitations for organization
   */
  async listByOrganization(
    orgId: string, 
    status?: InvitationStatus
  ): Promise<OrganizationInvitation[]> {
    let query = this.client
      .from(this.table)
      .select('*')
      .eq('organization_id', orgId)
      .order('created_at', { ascending: false });

    if (status) {
      query = query.eq('status', status);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  }

  /**
   * Create invitation
   */
  async create(invitation: OrganizationInvitationInsert): Promise<OrganizationInvitation> {
    const { data, error } = await this.client
      .from(this.table)
      .insert({
        ...invitation,
        status: 'pending'
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  /**
   * Accept invitation
   */
  async accept(inviteCode: string, userId: string): Promise<OrganizationInvitation> {
    const { data, error } = await this.client
      .from(this.table)
      .update({
        status: 'accepted',
        accepted_by: userId,
        accepted_at: new Date().toISOString()
      })
      .eq('invite_code', inviteCode)
      .eq('status', 'pending')
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  /**
   * Cancel invitation
   */
  async cancel(invitationId: string, orgId: string): Promise<void> {
    const { error } = await this.client
      .from(this.table)
      .delete()
      .eq('id', invitationId)
      .eq('organization_id', orgId)
      .eq('status', 'pending');

    if (error) throw error;
  }

  /**
   * Clean up expired invitations
   */
  async cleanupExpired(): Promise<number> {
    const { count, error } = await this.client
      .from(this.table)
      .update({ 
        status: 'expired' 
      }, { 
        count: 'exact' 
      })
      .eq('status', 'pending')
      .lt('expires_at', new Date().toISOString());

    if (error) throw error;
    return count || 0;
  }
}