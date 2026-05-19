import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '../types/database';
import { readOrganizationBtdRegistryRows } from './organization-btd-registry';

export interface OrganizationBtdTreasuryBalance {
  organization_id: string;
  source: 'btd_registry';
  balance: number;
  ownedAssetPackCount: number;
  ownedCellCount: number;
  activeReadLicenseCount: number;
  licensedAssetPackCount: number;
  walletIds: string[];
}

export class OrganizationBtdTreasuryModel {
  constructor(private readonly supabase: SupabaseClient<Database>) {}

  async getByOrganizationId(organizationId: string): Promise<OrganizationBtdTreasuryBalance | null> {
    const registryRows = await readOrganizationBtdRegistryRows(this.supabase, organizationId);
    const ownedCellCount = registryRows.ownershipRows.reduce(
      (sum, row) => sum + readCellCount(row),
      0,
    );
    const ownedAssetPackIds = uniqueStrings(
      registryRows.ownershipRows.map((row) => readString(row.asset_pack_id)),
    );
    const activeReadLicenseRows = registryRows.readLicenseRows.filter((row) => isActiveReadLicense(row));
    const licensedAssetPackIds = uniqueStrings(
      activeReadLicenseRows.map((row) => readString(row.asset_pack_id)),
    );

    return {
      organization_id: organizationId,
      source: 'btd_registry',
      balance: ownedCellCount,
      ownedAssetPackCount: ownedAssetPackIds.length,
      ownedCellCount,
      activeReadLicenseCount: activeReadLicenseRows.length,
      licensedAssetPackCount: licensedAssetPackIds.length,
      walletIds: registryRows.walletIds,
    };
  }
}

function readCellCount(row: Record<string, unknown>): number {
  const start = readNumber(row.range_start);
  const end = readNumber(row.range_end_exclusive);
  if (typeof start !== 'number' || typeof end !== 'number' || end <= start) {
    return 0;
  }

  return end - start;
}

function isActiveReadLicense(row: Record<string, unknown>, at = new Date()): boolean {
  const validFrom = readDate(row.valid_from);
  const expiresAt = readDate(row.expires_at);
  const revokedAt = readDate(row.revoked_at);

  return Boolean(validFrom && validFrom <= at && !revokedAt && (!expiresAt || expiresAt > at));
}

function readNumber(value: unknown): number | null {
  if (typeof value === 'number' && Number.isSafeInteger(value)) return value;
  if (typeof value === 'string' && value.trim()) {
    const parsed = Number(value);
    if (Number.isSafeInteger(parsed)) return parsed;
  }
  return null;
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
