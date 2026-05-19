import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '../types/database';
import { readOrganizationBtdRegistryRows } from './organization-btd-registry';

export interface OrganizationBtdReadLicenseUsage {
  organization_id: string;
  source: 'btd_registry';
  walletIds: string[];
  licenseCount: number;
  activeLicenseCount: number;
  expiredLicenseCount: number;
  revokedLicenseCount: number;
  licensedAssetPackIds: string[];
}

export class OrganizationBtdUsageModel {
  constructor(private readonly supabase: SupabaseClient<Database>) {
  }

  async getByOrganizationId(organizationId: string): Promise<OrganizationBtdReadLicenseUsage> {
    return this.getReadLicenseUsageByOrganizationId(organizationId);
  }

  async getReadLicenseUsageByOrganizationId(
    organizationId: string,
    at = new Date(),
  ): Promise<OrganizationBtdReadLicenseUsage> {
    const registryRows = await readOrganizationBtdRegistryRows(this.supabase, organizationId);
    const activeRows = registryRows.readLicenseRows.filter((row) => readLicenseState(row, at) === 'active');
    const expiredRows = registryRows.readLicenseRows.filter((row) => readLicenseState(row, at) === 'expired');
    const revokedRows = registryRows.readLicenseRows.filter((row) => readLicenseState(row, at) === 'revoked');

    return {
      organization_id: organizationId,
      source: 'btd_registry',
      walletIds: registryRows.walletIds,
      licenseCount: registryRows.readLicenseRows.length,
      activeLicenseCount: activeRows.length,
      expiredLicenseCount: expiredRows.length,
      revokedLicenseCount: revokedRows.length,
      licensedAssetPackIds: uniqueStrings(activeRows.map((row) => readString(row.asset_pack_id))),
    };
  }
}

function readLicenseState(
  row: Record<string, unknown>,
  at: Date,
): 'active' | 'expired' | 'revoked' | 'pending' {
  const validFrom = readDate(row.valid_from);
  const expiresAt = readDate(row.expires_at);
  const revokedAt = readDate(row.revoked_at);

  if (revokedAt) return 'revoked';
  if (validFrom && validFrom > at) return 'pending';
  if (expiresAt && expiresAt <= at) return 'expired';
  return 'active';
}

function readDate(value: unknown): Date | null {
  if (typeof value !== 'string' || !value.trim()) return null;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function readString(value: unknown): string | null {
  return typeof value === 'string' && value.trim() ? value.trim() : null;
}

function uniqueStrings(values: Array<string | null>): string[] {
  return Array.from(new Set(values.filter((value): value is string => Boolean(value))));
}
