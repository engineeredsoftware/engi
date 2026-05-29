import {
  assertPackActivitySourceSafe,
  buildPackActivityDetailProjection,
  buildPackPortfolioMarketIntelligence,
  normalizePackActivityRecord,
  queryPackActivityRecords,
} from '@/components/base/bitcode/activity/pack-activity-model';
import type { BitcodeActivityRecord } from '@/components/base/bitcode/activity/bitcode-activity-model';

describe('pack-activity-model', () => {
  const baseRecord: BitcodeActivityRecord = {
    id: 'pack-activity-1',
    kind: 'execution',
    scope: 'network',
    channel: 'system-surface',
    label: 'Executions',
    title: 'ReadFitsFindingSynthesis preview',
    summary: 'Synthesized a source-safe AssetPack preview for accepted Need.',
    timestamp: '2026-05-28T10:00:00.000Z',
    state: 'completed',
    read: null,
    payload: {
      type: 'pipeline:read-fits',
      repo_snapshot: {
        org: 'engineeredsoftware',
        repo: 'ENGI',
      },
      assetPackTitle: 'Auth rollback proof pack',
      measuredBtd: 42,
      btcFeeSats: 3200,
      finalityState: 'quote_ready',
      compensationState: 'source_to_shares_preview_ready',
      deliveryState: 'locked_until_settlement',
      repairState: 'not_required',
      btdBtcCompensationStatements: {
        schema: 'bitcode.asset-pack.btd-btc-compensation-statements',
        statements: 'BtdBtcCompensationStatements',
        state: 'settlement-accounted',
        btdRange: {
          rangeState: 'transferred-to-reader',
        },
        btcSettlement: {
          state: 'final-settlement-observed',
        },
        treasuryRoutes: [
          {
            schema: 'bitcode.asset-pack.treasury-route-statement',
            routeState: 'routed',
          },
        ],
        reconciliation: {
          state: 'aligned',
        },
        aggregate: {
          contributorCount: 2,
          depositorCount: 2,
          finalSettlementSats: 3200,
          allocatedContributorSats: 3200,
        },
        roots: {
          accountingRoot: 'btd-btc-accounting-root-abc',
        },
      },
      assetPackMeasurementRoot: 'measurement-root-abc',
      settlementReceiptRoot: 'settlement-root-def',
      protectedSource: 'protected source body',
      rawPrompt: 'raw prompt text',
      interpolatedPrompt: 'interpolated prompt text',
      rawProviderResponse: 'raw provider response',
      sourceSnippet: 'source snippet',
      patch: 'diff --git a/protected b/protected',
    },
  };

  it('normalizes source-safe PackActivity records with measurements, values, and proof roots', () => {
    const record = normalizePackActivityRecord(baseRecord);

    expect(record).toMatchObject({
      id: 'pack-activity-1',
      type: 'read-need-fit-preview',
      repository: 'engineeredsoftware/ENGI',
      assetPackTitle: 'Auth rollback proof pack',
      settlementState: 'quote_ready',
      compensationState: 'source_to_shares_preview_ready',
      deliveryState: 'locked_until_settlement',
    });
    expect(record.measurements.some((measurement) => measurement.id === 'measured-btd')).toBe(true);
    expect(record.values.some((value) => value.id === 'btc-fee')).toBe(true);
    expect(record.proofRoots.map((proofRoot) => proofRoot.root)).toContain('settlement-root-def');
    expect(record.accounting).toMatchObject({
      state: 'settlement-accounted',
      btdRangeState: 'transferred-to-reader',
      btcSettlementState: 'final-settlement-observed',
      treasuryRouteState: 'routed',
      contributorCount: 2,
      allocatedContributorSats: 3200,
      statementRoot: 'btd-btc-accounting-root-abc',
    });
    expect(assertPackActivitySourceSafe(record)).toBe(true);
    expect(JSON.stringify(record)).not.toContain('protected source body');
    expect(JSON.stringify(record)).not.toContain('raw prompt text');
    expect(JSON.stringify(record)).not.toContain('raw provider response');
  });

  it('searches, filters, sorts, and projects source-safe detail', () => {
    const records = [
      normalizePackActivityRecord(baseRecord),
      normalizePackActivityRecord({
        ...baseRecord,
        id: 'pack-activity-2',
        title: 'Deposit option repair',
        summary: 'Repair state opened for a deposit AssetPack option.',
        timestamp: '2026-05-28T09:00:00.000Z',
        state: 'running',
        payload: {
          type: 'deposit option synthesis',
          assetPackTitle: 'Vector index cleanup pack',
          repairState: 'open_reconciliation',
          sourceToSharesRoot: 'source-shares-root-xyz',
        },
      }),
    ];

    const result = queryPackActivityRecords(records, {
      search: 'rollback',
      filters: { type: 'read-need-fit-preview' },
      sort: { key: 'value', direction: 'desc' },
    });

    expect(result.records.map((record) => record.id)).toEqual(['pack-activity-1']);
    expect(result.summary.total).toBe(1);

    const detail = buildPackActivityDetailProjection(result.records[0]);
    expect(detail.states.settlement).toBe('quote_ready');
    expect(detail.accounting?.statementRoot).toBe('btd-btc-accounting-root-abc');
    expect(detail.proofRoots.length).toBeGreaterThan(0);
    expect(assertPackActivitySourceSafe(detail)).toBe(true);
  });

  it('projects approved deposit admission receipts as Depository AssetPack activity', () => {
    const record = normalizePackActivityRecord({
      ...baseRecord,
      id: 'pack-activity-deposit-admission',
      title: 'Pipeline execution',
      summary: 'Admitted Repository capability AssetPack option to the Depository.',
      state: 'completed',
      payload: {
        type: 'pipeline:deposit-option-admission',
        assetPackTitle: 'Repository capability AssetPack option',
        optionCount: 3,
        admittedCount: 1,
        admissionState: 'admitted-to-depository',
        compensationState: 'compensation-preview-ready',
        packActivitySyncState: 'synchronized-to-packs',
        admissionReportRoot: 'deposit-admission-report-root',
        protectedSource: 'protected source body',
        rawProviderResponse: 'raw provider response',
      },
    });

    expect(record.type).toBe('depository-assetpack');
    expect(record.assetPackTitle).toBe('Repository capability AssetPack option');
    expect(record.measurements.some((measurement) => measurement.id === 'admitted-count')).toBe(true);
    expect(record.compensationState).toBe('compensation-preview-ready');
    expect(record.proofRoots.map((proofRoot) => proofRoot.root)).toContain('deposit-admission-report-root');
    expect(assertPackActivitySourceSafe(record)).toBe(true);
    expect(JSON.stringify(record)).not.toContain('protected source body');
    expect(JSON.stringify(record)).not.toContain('raw provider response');
  });

  it('builds source-safe portfolio positions, saved filters, market signals, and facets', () => {
    const records = [
      normalizePackActivityRecord(baseRecord),
      normalizePackActivityRecord({
        ...baseRecord,
        id: 'pack-activity-supply',
        title: 'Deposit option admitted',
        summary: 'Supply opportunity admitted to the Depository.',
        state: 'completed',
        payload: {
          type: 'pipeline:deposit-option-admission',
          assetPackTitle: 'Auth rollback proof pack',
          repositoryFullName: 'engineeredsoftware/ENGI',
          admittedCount: 1,
          compensationState: 'allocation_ready',
          settlementState: 'quote_ready',
          deliveryState: 'locked_until_settlement',
          sourceToSharesRoot: 'source-to-shares-root',
          protectedSource: 'protected source body',
        },
      }),
      normalizePackActivityRecord({
        ...baseRecord,
        id: 'pack-activity-unfit',
        title: 'No worthy fit found',
        summary: 'Unfit Need signal preserved for future supply opportunity.',
        state: 'completed',
        payload: {
          type: 'pipeline:read-fits',
          assetPackTitle: 'Latency repair opportunity',
          repositoryFullName: 'engineeredsoftware/ENGI',
          fitResult: 'no_worthy_fit',
          repairState: 'open_reconciliation',
          unfitNeedRoot: 'unfit-need-root',
          rawPrompt: 'raw prompt text',
        },
      }),
    ];

    const market = buildPackPortfolioMarketIntelligence(records);

    expect(market.positions.length).toBeGreaterThanOrEqual(2);
    expect(market.positions[0].sourceSafety.sourceSafeMetadataOnly).toBe(true);
    expect(market.savedFilters.map((filter) => filter.id)).toEqual(
      expect.arrayContaining(['market-demand', 'market-supply', 'economic-settlement']),
    );
    expect(market.signals.map((signal) => signal.kind)).toEqual(
      expect.arrayContaining(['demand', 'supply', 'unfit-need', 'settlement', 'compensation']),
    );
    expect(market.facets.settlement.quote_ready).toBeGreaterThanOrEqual(1);
    expect(market.facets.compensation.allocation_ready).toBe(1);
    expect(JSON.stringify(market)).not.toContain('protected source body');
    expect(JSON.stringify(market)).not.toContain('raw prompt text');
  });
});
