import { readFileSync } from 'fs';
import path from 'path';
import { BtdRegistryModel } from '../models/btd-registry';
import { OrganizationBtdTreasuryModel } from '../models/organization-btd-treasury';
import { OrganizationBtdUsageModel } from '../models/organization-btd-usage';

const repoRoot = path.resolve(__dirname, '../../../..');
const migrationSource = readFileSync(
  path.join(repoRoot, 'supabase/migrations/002_v27_btd_crypto_registry.sql'),
  'utf8',
);

describe('BtdRegistryModel V27 persistence boundary', () => {
  it('keeps the V27 registry migration on Bitcode-native tables and constraints', () => {
    for (const tableName of [
      'btd_supply_state',
      'btd_semantic_volume_measurements',
      'btd_measure_mint_receipts',
      'btd_asset_pack_ranges',
      'btd_cells',
      'btd_ownership_events',
      'btd_read_licenses',
      'btd_mint_receipts',
      'btd_contributor_allocations',
      'btd_ancestor_edges',
      'btd_licensed_read_revenue_routes',
      'btc_fee_transactions',
      'btd_asset_pack_ledger_anchors',
      'btd_exchange_orders',
      'btd_rights_transfer_receipts',
      'btd_terminal_journal_entries',
      'btd_ledger_database_reconciliation_repairs',
      'btd_protocol_upgrade_receipts',
      'btd_crypto_telemetry_events',
    ]) {
      expect(migrationSource).toContain(`CREATE TABLE IF NOT EXISTS public.${tableName}`);
      expect(migrationSource).toContain(`ALTER TABLE public.${tableName} ENABLE ROW LEVEL SECURITY`);
    }

    expect(migrationSource).toContain('btd_supply_state_cap');
    expect(migrationSource).toContain('btd_asset_pack_ranges_no_overlap');
    expect(migrationSource).toContain('btd_asset_pack_ranges_policy');
    expect(migrationSource).toContain('btd_rights_transfer_non_empty');
    expect(migrationSource).toContain('dispute_holdback_sats');
    expect(migrationSource).toContain('pending_routes');
    expect(migrationSource).toContain('failed_routes');
    expect(migrationSource).toContain('review_id text NOT NULL');
    expect(migrationSource).toContain('source_fingerprint_root text');
    expect(migrationSource).toContain('btd_ancestor_edges_non_supply');
    expect(migrationSource).toContain('btd_ancestor_edges_reviewer_conflict');
    expect(migrationSource).toContain('sats_per_vbyte integer');
    expect(migrationSource).toContain('related_asset_pack_id text');
    expect(migrationSource).toContain('wallet_authorization_proof jsonb NOT NULL');
    expect(migrationSource).toContain('output_index integer');
    expect(migrationSource).toContain('btd_asset_pack_ledger_anchors_method');
    expect(migrationSource).toContain("'taproot'");
    expect(migrationSource).toContain('ledger_anchor_id text NOT NULL');
    expect(migrationSource).toContain('btd_rights_transfer_ledger_anchor');
    expect(migrationSource).toContain('btd_terminal_journal_kind');
    expect(migrationSource).toContain('btd_terminal_journal_exchange_sequence');
    expect(migrationSource).toContain(
      'gross_sats = direct_sats + ancestor_sats + treasury_sats + dispute_holdback_sats',
    );
    expect(migrationSource).not.toContain('user_credits');
    expect(migrationSource).not.toContain('user_credit_usages');
  });

  it('routes reads and writes through the Bitcode-native registry model', async () => {
    const supabase = createSupabaseMock();
    const registry = new BtdRegistryModel(supabase as any);

    await expect(registry.getSupplyState()).resolves.toEqual({ id: 'global' });
    await expect(registry.listAssetPackRanges('asset-pack-1')).resolves.toEqual([
      { asset_pack_id: 'asset-pack-1' },
    ]);
    await expect(
      registry.insertAssetPackRange({ asset_pack_id: 'asset-pack-1' }),
    ).resolves.toEqual({ id: 'row-1' });
    await expect(
      registry.listOwnershipClaims({ walletId: 'wallet-1', assetPackId: 'asset-pack-1' }),
    ).resolves.toEqual([{ asset_pack_id: 'asset-pack-1' }]);
    await expect(
      registry.listReadLicenses({ walletId: 'wallet-1', assetPackId: 'asset-pack-1' }),
    ).resolves.toEqual([{ asset_pack_id: 'asset-pack-1' }]);

    expect(supabase.calls.map((call) => call.table)).toEqual([
      'btd_supply_state',
      'btd_asset_pack_ranges',
      'btd_asset_pack_ranges',
      'btd_ownership_events',
      'btd_read_licenses',
    ]);
  });

  it('derives organization holdings and read-license usage from registry rows', async () => {
    const supabase = createOrganizationRegistrySupabaseMock();
    const treasury = new OrganizationBtdTreasuryModel(supabase as any);
    const usage = new OrganizationBtdUsageModel(supabase as any);

    await expect(treasury.getByOrganizationId('org-1')).resolves.toMatchObject({
      organization_id: 'org-1',
      source: 'btd_registry',
      balance: 8,
      ownedAssetPackCount: 1,
      ownedCellCount: 8,
      activeReadLicenseCount: 1,
      licensedAssetPackCount: 1,
      walletIds: ['wallet-owner', 'wallet-reader'],
    });
    await expect(
      usage.getReadLicenseUsageByOrganizationId('org-1', new Date('2026-05-19T00:00:00.000Z')),
    ).resolves.toMatchObject({
      organization_id: 'org-1',
      source: 'btd_registry',
      licenseCount: 3,
      activeLicenseCount: 1,
      expiredLicenseCount: 1,
      revokedLicenseCount: 1,
      licensedAssetPackIds: ['asset-pack-licensed'],
    });

    expect(supabase.calls.map((call) => call.table)).toEqual([
      'organization_members',
      'user_profiles',
      'user_profiles',
      'btd_ownership_events',
      'btd_read_licenses',
      'organization_members',
      'user_profiles',
      'user_profiles',
      'btd_ownership_events',
      'btd_read_licenses',
    ]);
  });

  it('documents compatibility balance tables as non-canonical read corridors', () => {
    const balanceModel = readFileSync(
      path.join(repoRoot, 'packages/orm/src/models/user-btd-balances.ts'),
      'utf8',
    );
    const transactionModel = readFileSync(
      path.join(repoRoot, 'packages/orm/src/models/user-btd-transactions.ts'),
      'utf8',
    );

    expect(balanceModel).toContain('non-canonical aggregate `$BTD` holding posture');
    expect(balanceModel).toContain('must not mint,');
    expect(balanceModel).toContain('debit, transfer, or settle `$BTD`');
    expect(transactionModel).toContain('non-canonical aggregate `$BTD` usage posture');
    expect(transactionModel).toContain('must not mint,');
    expect(transactionModel).toContain('debit, transfer, or settle `$BTD`');
  });
});

function createSupabaseMock() {
  const calls: Array<{ table: string }> = [];
  const builder = {
    select: jest.fn(() => builder),
    eq: jest.fn(() => builder),
    order: jest.fn(() => builder),
    insert: jest.fn(() => builder),
    update: jest.fn(() => builder),
    maybeSingle: jest.fn(async () => ({ data: { id: 'global' }, error: null })),
    single: jest.fn(async () => ({ data: { id: 'row-1' }, error: null })),
    then: (resolve: (value: unknown) => unknown, reject: (reason?: unknown) => unknown) =>
      Promise.resolve({ data: [{ asset_pack_id: 'asset-pack-1' }], error: null }).then(
        resolve,
        reject,
      ),
  };

  return {
    calls,
    from: jest.fn((table: string) => {
      calls.push({ table });
      return builder;
    }),
  };
}

function createOrganizationRegistrySupabaseMock() {
  const calls: Array<{ table: string }> = [];
  const rowsByTable: Record<string, Array<Record<string, unknown>>> = {
    organization_members: [
      { organization_id: 'org-1', user_id: 'user-owner', role: 'owner' },
      { organization_id: 'org-1', user_id: 'user-reader', role: 'member' },
    ],
    user_profiles: [
      {
        id: 'user-owner',
        display_name: 'Owner',
        settings: {
          walletBinding: {
            address: 'wallet-owner',
            provider: 'test',
            status: 'verified',
            boundAt: '2026-05-01T00:00:00.000Z',
          },
        },
      },
      {
        id: 'user-reader',
        display_name: 'Reader',
        settings: {
          walletBinding: {
            address: 'wallet-reader',
            provider: 'test',
            status: 'verified',
            boundAt: '2026-05-01T00:00:00.000Z',
          },
        },
      },
    ],
    btd_ownership_events: [
      {
        to_wallet_id: 'wallet-owner',
        asset_pack_id: 'asset-pack-owned',
        range_start: 20,
        range_end_exclusive: 28,
      },
    ],
    btd_read_licenses: [
      {
        license_id: 'license-active',
        wallet_id: 'wallet-reader',
        asset_pack_id: 'asset-pack-licensed',
        valid_from: '2020-01-01T00:00:00.000Z',
      },
      {
        license_id: 'license-expired',
        wallet_id: 'wallet-reader',
        asset_pack_id: 'asset-pack-expired',
        valid_from: '2026-04-01T00:00:00.000Z',
        expires_at: '2026-05-01T00:00:00.000Z',
      },
      {
        license_id: 'license-revoked',
        wallet_id: 'wallet-owner',
        asset_pack_id: 'asset-pack-revoked',
        valid_from: '2026-05-01T00:00:00.000Z',
        revoked_at: '2026-05-05T00:00:00.000Z',
      },
    ],
  };

  return {
    calls,
    from: jest.fn((table: string) => {
      calls.push({ table });
      return createTableQuery(table, rowsByTable[table] ?? []);
    }),
  };
}

function createTableQuery(table: string, rows: Array<Record<string, unknown>>) {
  let filteredRows = [...rows];
  const query: any = {
    select: jest.fn(() => query),
    eq: jest.fn((column: string, value: unknown) => {
      filteredRows = filteredRows.filter((row) => row[column] === value);
      return query;
    }),
    in: jest.fn((column: string, values: unknown[]) => {
      filteredRows = filteredRows.filter((row) => values.includes(row[column]));
      return query;
    }),
    order: jest.fn(() => query),
    maybeSingle: jest.fn(async () => ({ data: filteredRows[0] ?? null, error: null })),
    then: (resolve: (value: unknown) => unknown, reject: (reason?: unknown) => unknown) =>
      Promise.resolve({ data: filteredRows, error: null }).then(resolve, reject),
  };

  if (!table) {
    throw new Error('table name is required');
  }

  return query;
}
