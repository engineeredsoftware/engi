import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '../types/database';
import { readBitcodeWalletBindingFromProfile } from '../profile-contract';
import { BtdRegistryModel } from './btd-registry';
import { OrganizationMembersModel } from './organization-members';
import { UserProfilesModel, type UserProfileReadModel } from './user-profiles';

type ProfileWalletBindingSource = UserProfileReadModel & Record<string, unknown>;

export interface OrganizationBtdRegistrySource {
  organization_id: string;
  source: 'btd_registry';
  walletIds: string[];
  memberCount: number;
  membersWithWalletCount: number;
}

export interface OrganizationBtdRegistryRows extends OrganizationBtdRegistrySource {
  ownershipRows: Record<string, unknown>[];
  readLicenseRows: Record<string, unknown>[];
}

export async function readOrganizationBtdRegistryRows(
  supabase: SupabaseClient<Database>,
  organizationId: string,
): Promise<OrganizationBtdRegistryRows> {
  const members = await new OrganizationMembersModel(supabase).listByOrganization(organizationId);
  const profiles = await Promise.all(
    members.map((member) => new UserProfilesModel(supabase).getByUserId(member.user_id)),
  );
  const walletIds = uniqueStrings(
    profiles
      .map((profile) =>
        readBitcodeWalletBindingFromProfile(profile as ProfileWalletBindingSource | null)
          ?.address,
      )
      .filter((value): value is string => typeof value === 'string' && value.trim().length > 0),
  );

  const registry = new BtdRegistryModel(supabase);
  const [ownershipRows, readLicenseRows] = await Promise.all([
    registry.listOwnershipClaimsForWallets({ walletIds }),
    registry.listReadLicensesForWallets({ walletIds }),
  ]);

  return {
    organization_id: organizationId,
    source: 'btd_registry',
    walletIds,
    memberCount: members.length,
    membersWithWalletCount: walletIds.length,
    ownershipRows,
    readLicenseRows,
  };
}

export function uniqueStrings(values: Array<string | null | undefined>): string[] {
  return Array.from(
    new Set(
      values
        .map((value) => (typeof value === 'string' ? value.trim() : ''))
        .filter(Boolean),
    ),
  );
}
