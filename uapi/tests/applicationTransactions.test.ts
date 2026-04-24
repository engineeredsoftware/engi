import {
  buildApplicationTransactionFilterOptions,
  buildApplicationTransactionFilters,
  filterApplicationTransactions,
  normalizeApplicationTransactions,
} from '@/app/application/application-transactions';
import type { WorkspaceRun } from '@/app/application/application-run-data';

describe('application-transactions', () => {
  const runs: WorkspaceRun[] = [
    {
      id: 'tx-1',
      created_at: '2026-04-16T12:00:00.000Z',
      type: 'agentic-execution:asset-pack',
      status: 'completed',
      summary: 'Materialized a give-side transaction.',
      repository: 'bitcode/bitcode',
      branch: 'main',
      participant: 'garrett',
      isOwnTransaction: true,
      proofStatus: 'bounded proof ready',
      closureFocus: 'branch artifacts',
      tokenTotal: 400,
      usdTotal: 1.5,
      btdUsed: 12,
    },
    {
      id: 'tx-2',
      created_at: '2026-04-16T11:00:00.000Z',
      type: 'agentic-execution:need-measurement',
      status: 'running',
      summary: 'Completed a need-measurement pass.',
      repository: 'bitcode/research',
      branch: 'fit-review',
      participant: 'research-partner',
      isOwnTransaction: false,
      proofStatus: 'verification in flight',
      closureFocus: 'need measurement',
      tokenTotal: 200,
      usdTotal: 0.75,
      btdUsed: 6,
    },
  ];

  it('normalizes transactions from workspace runs', () => {
    const records = normalizeApplicationTransactions(runs);

    expect(records).toHaveLength(2);
    expect(records[0]).toMatchObject({
      id: 'tx-1',
      type: 'agentic-execution:asset-pack',
      typeLabel: 'AssetPack execution',
      transactionLens: 'give',
      participant: 'garrett',
      repository: 'bitcode/bitcode',
      isOwnTransaction: true,
    });
    expect(records[1]).toMatchObject({
      id: 'tx-2',
      type: 'agentic-execution:need-measurement',
      typeLabel: 'need measurement execution',
      transactionLens: 'need',
      participant: 'research-partner',
      repository: 'bitcode/research',
      isOwnTransaction: false,
    });
  });

  it('filters transactions by search, ownership, and repository', () => {
    const records = normalizeApplicationTransactions(runs);
    const filters = {
      ...buildApplicationTransactionFilters(),
      searchTerm: 'need measurement',
      ownership: 'network' as const,
      repository: 'bitcode/research',
    };

    const filtered = filterApplicationTransactions(records, filters);

    expect(filtered).toHaveLength(1);
    expect(filtered[0].id).toBe('tx-2');
  });

  it('filters transactions by participant and proof posture', () => {
    const records = normalizeApplicationTransactions(runs);
    const filters = {
      ...buildApplicationTransactionFilters(),
      participant: 'garrett',
      proofStatus: 'bounded proof ready',
    };

    const filtered = filterApplicationTransactions(records, filters);

    expect(filtered).toHaveLength(1);
    expect(filtered[0].id).toBe('tx-1');
  });

  it('sorts transactions by highest usd when requested', () => {
    const records = normalizeApplicationTransactions(runs);
    const filters = {
      ...buildApplicationTransactionFilters(),
      sort: 'highest-usd' as const,
    };

    const filtered = filterApplicationTransactions(records, filters);

    expect(filtered.map((record) => record.id)).toEqual(['tx-1', 'tx-2']);
  });

  it('builds filter options from normalized transactions', () => {
    const options = buildApplicationTransactionFilterOptions(normalizeApplicationTransactions(runs));

    expect(options.statuses).toEqual(['completed', 'running']);
    expect(options.repositories).toEqual(['bitcode/bitcode', 'bitcode/research']);
    expect(options.participants).toEqual(['garrett', 'research-partner']);
    expect(options.proofStatuses).toEqual(['bounded proof ready', 'verification in flight']);
  });
});
