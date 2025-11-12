/**
 * Organization Credits Model
 * 
 * Manages organization credit balances.
 * 
 * @doc-code
 * type: model
 * table: organization_credits
 */

import { BaseModel } from './base';
import { Tables, Insertable, Updatable } from '../types/database';

export type OrganizationCredits = Tables<'organization_credits'>;
export type OrganizationCreditsInsert = Insertable<'organization_credits'>;
export type OrganizationCreditsUpdate = Updatable<'organization_credits'>;

export class OrganizationCreditsModel extends BaseModel<'organization_credits'> {
  constructor() {
    super('organization_credits');
  }

  /**
   * Get credits by organization ID
   */
  async getByOrgId(orgId: string): Promise<OrganizationCredits | null> {
    const { data, error } = await this.client
      .from(this.table)
      .select('*')
      .eq('organization_id', orgId)
      .maybeSingle();

    if (error) throw error;
    return data;
  }

  /**
   * Initialize credits for organization
   */
  async initialize(orgId: string, initialCredits = 0): Promise<OrganizationCredits> {
    const { data, error } = await this.client
      .from(this.table)
      .insert({
        organization_id: orgId,
        credits: initialCredits
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  /**
   * Add or deduct credits
   */
  async adjustCredits(
    orgId: string, 
    amount: number, 
    userId: string, 
    description: string
  ): Promise<number> {
    // Get current balance
    const current = await this.getByOrgId(orgId);
    if (!current) throw new Error('Organization credits not found');

    const newBalance = current.credits + amount;
    if (newBalance < 0) throw new Error('Insufficient credits');

    // Update balance
    const { error } = await this.client
      .from(this.table)
      .update({
        credits: newBalance,
        updated_at: new Date().toISOString()
      })
      .eq('organization_id', orgId);

    if (error) throw error;

    // Record usage (would be in organization_credit_usages table)
    // await this.recordUsage(orgId, userId, amount, newBalance, description);

    return newBalance;
  }
}