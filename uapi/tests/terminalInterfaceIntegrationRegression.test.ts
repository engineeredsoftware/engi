import {
  buildTerminalInterfaceIntegrationRegressionRecords,
  buildTerminalInterfaceIntegrationRegressionSummary,
} from '@/app/terminal/terminal-interface-integration-regression';

describe('terminal interface integration regression contract', () => {
  it('keeps Terminal source-safe low-detail proof while listing package-owned consumers', () => {
    const summary = buildTerminalInterfaceIntegrationRegressionSummary();

    expect(summary.surfaces).toEqual([
      'terminal',
      'api',
      'mcp',
      'chatgpt_app',
      'auxillaries_hook',
      'exchange_hook',
    ]);
    expect(summary.objectFamilies).toEqual([
      'btd_registry',
      'read_access',
      'btd_receipts',
      'btc_fee_operation',
      'ledger_projection',
      'source_to_shares_proof',
      'protocol_telemetry',
      'organization_authority',
      'terminal_journal',
    ]);
    expect(summary.lowDetailSourceSafe).toBe(true);
    expect(summary.routeLocalReimplementation).toBe(false);
    expect(summary.transactionCockpitRegression).toBe(false);
    expect(summary.records).toHaveLength(6);
    expect(summary.records.every((record) => record.packageOwned)).toBe(true);
    expect(summary.records.every((record) => record.sourceSafeLowDetailIntact)).toBe(true);
  });

  it('names the current interface hooks without exposing protected AssetPack source', () => {
    const records = buildTerminalInterfaceIntegrationRegressionRecords();

    expect(records.map((record) => record.surface)).toEqual([
      'terminal',
      'api',
      'mcp',
      'chatgpt_app',
      'auxillaries_hook',
      'exchange_hook',
    ]);
    expect(records.flatMap((record) => record.objectFamilies)).toEqual(
      expect.arrayContaining(['source_to_shares_proof', 'protocol_telemetry', 'terminal_journal']),
    );
    expect(JSON.stringify(records)).not.toMatch(/protected source|private source|raw source/i);
  });
});
