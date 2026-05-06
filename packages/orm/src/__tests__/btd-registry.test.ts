import { readFileSync } from 'fs';
import path from 'path';
import { BtdRegistryModel } from '../models/btd-registry';

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

    expect(supabase.calls.map((call) => call.table)).toEqual([
      'btd_supply_state',
      'btd_asset_pack_ranges',
      'btd_asset_pack_ranges',
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
