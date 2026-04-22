import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '../types/database';
import { OrganizationMembersModel } from './organization-members';
import { UserBtdBalancesModel } from './user-btd-balances';

export interface OrganizationCreditBalance {
  organization_id: string;
  balance: number;
}

export class OrganizationCreditsModel {
  constructor(private readonly supabase: SupabaseClient<Database>) {}

  async getByOrganizationId(organizationId: string): Promise<OrganizationCreditBalance | null> {
    const members = await new OrganizationMembersModel(this.supabase).listByOrganization(organizationId);
    if (members.length === 0) {
      return {
        organization_id: organizationId,
        balance: 0,
      };
    }

    const balances = await Promise.all(
      members.map((member) => new UserBtdBalancesModel(this.supabase).getByUserId(member.user_id)),
    );

    return {
      organization_id: organizationId,
      balance: balances.reduce((sum, balance) => sum + (balance?.balance || 0), 0),
    };
  }
}
