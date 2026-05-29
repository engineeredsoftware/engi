import {
  assertPackActivitySourceSafe,
  buildPackActivityDetailProjection,
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
});
