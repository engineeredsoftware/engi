import { buildTerminalJournalReconciliation } from '@/app/terminal/terminal-journal-reconciliation';
import type { TerminalRunDetailSnapshot } from '@/app/terminal/terminal-transaction-detail-snapshot';

function detail(overrides: Partial<TerminalRunDetailSnapshot>): TerminalRunDetailSnapshot {
  return {
    summary: 'Journal detail.',
    shippables: null,
    repoSnapshot: null,
    processingStats: {
      time: null,
      tokenTotal: null,
      measuredBtd: null,
      btcFeeUsdEquivalent: null,
      averageLatencyMs: null,
    },
    proofStatus: null,
    closureFocus: null,
    closureFollowThrough: null,
    closureState: null,
    ledgerSettlement: null,
    terminalJournal: null,
    bitcodeActivityState: null,
    historyItemCount: 0,
    eventCount: 0,
    ...overrides,
  };
}

describe('terminal journal reconciliation', () => {
  it('separates aligned observed, projected, and canonical facts', () => {
    const result = buildTerminalJournalReconciliation(
      detail({
        ledgerSettlement: {
          status: 'settled',
          settlementAdmissible: true,
          reason: 'readback ok',
          assetPackId: 'asset-pack-run-1',
          btdRange: { start: 0, endExclusive: 1, tokenCount: 1 },
          ledgerAnchorId: 'ledger-anchor-run-1',
          btcFeeReceiptId: 'btc-fee-run-1',
          depositorWalletId: 'depositor-wallet',
          readerWalletId: 'reader-wallet',
          btcFee: { finalityState: 'prepared' },
          ownershipBoundary: null,
          readback: {
            assetPackRange: true,
            btcFeeTransaction: true,
            ledgerAnchor: true,
            terminalJournal: true,
          },
          journalEntryIds: ['journal-mint-run-1'],
          ownershipEventId: 'ownership-mint-run-1',
          readLicenseId: 'read-license-run-1',
        },
        terminalJournal: {
          expectedJournalEntryIds: ['journal-mint-run-1'],
          entries: [
            {
              journalEntryId: 'journal-mint-run-1',
              transactionKind: 'asset_pack_mint',
              actorId: 'depositor-wallet',
              preStateRoot: 'sha256:before',
              postStateRoot: 'sha256:after',
              receiptRoots: ['sha256:receipt'],
              ledgerAnchorIds: ['ledger-anchor-run-1'],
              exchangeSequence: 10,
              issuedAt: '2026-05-18T12:00:00.000Z',
              raw: {},
            },
          ],
          repairs: [],
          ledgerRows: {
            assetPackRanges: [{ asset_pack_id: 'asset-pack-run-1', access_policy_hash: 'sha256:policy' }],
            btcFeeTransactions: [{ receipt_id: 'btc-fee-run-1', finality_state: 'prepared' }],
            ledgerAnchors: [{ anchor_id: 'ledger-anchor-run-1', finality_state: 'confirmed', commitment_root: 'sha256:journal' }],
            ownershipEvents: [],
            readLicenses: [],
          },
          readErrors: [],
        },
      }),
    );

    expect(result.state).toBe('aligned');
    expect(result.observedFacts.every((fact) => fact.source === 'ledger_observed')).toBe(true);
    expect(result.projectedFacts.every((fact) => fact.source === 'database_projected')).toBe(true);
    expect(result.canonicalFacts.every((fact) => fact.source === 'metaphysical_canonical')).toBe(true);
    expect(result.blockingReasons).toEqual([]);
  });

  it('requires approval when confirmed ledger facts contradict database projection', () => {
    const result = buildTerminalJournalReconciliation(
      detail({
        ledgerSettlement: {
          status: 'blocked',
          settlementAdmissible: false,
          reason: 'missing anchor projection',
          assetPackId: 'asset-pack-run-2',
          btdRange: null,
          ledgerAnchorId: 'ledger-anchor-run-2',
          btcFeeReceiptId: 'btc-fee-run-2',
          depositorWalletId: null,
          readerWalletId: null,
          btcFee: { finalityState: 'prepared' },
          ownershipBoundary: null,
          readback: { ledgerAnchor: false, terminalJournal: true },
          journalEntryIds: ['journal-anchor-run-2'],
          ownershipEventId: null,
          readLicenseId: null,
        },
        terminalJournal: {
          expectedJournalEntryIds: ['journal-anchor-run-2'],
          entries: [
            {
              journalEntryId: 'journal-anchor-run-2',
              transactionKind: 'asset_pack_anchor',
              actorId: 'depositor-wallet',
              preStateRoot: 'sha256:before',
              postStateRoot: 'sha256:after',
              receiptRoots: [],
              ledgerAnchorIds: ['ledger-anchor-run-2'],
              exchangeSequence: 12,
              issuedAt: null,
              raw: {},
            },
          ],
          repairs: [],
          ledgerRows: {
            assetPackRanges: [],
            btcFeeTransactions: [],
            ledgerAnchors: [{ anchor_id: 'ledger-anchor-run-2', finality_state: 'confirmed' }],
            ownershipEvents: [],
            readLicenses: [],
          },
          readErrors: [],
        },
      }),
    );

    expect(result.state).toBe('approval_required');
    expect(result.blockingReasons).toContain('Confirmed ledger anchor contradicts the missing database projection.');
  });

  it('blocks reorged or failed ledger facts and surfaces repair receipts', () => {
    const result = buildTerminalJournalReconciliation(
      detail({
        ledgerSettlement: {
          status: 'blocked',
          settlementAdmissible: false,
          reason: 'fee reorg',
          assetPackId: 'asset-pack-run-3',
          btdRange: null,
          ledgerAnchorId: 'ledger-anchor-run-3',
          btcFeeReceiptId: 'btc-fee-run-3',
          depositorWalletId: null,
          readerWalletId: null,
          btcFee: { finalityState: 'reorged' },
          ownershipBoundary: null,
          readback: { btcFeeTransaction: true },
          journalEntryIds: [],
          ownershipEventId: null,
          readLicenseId: null,
        },
        terminalJournal: {
          expectedJournalEntryIds: [],
          entries: [],
          repairs: [
            {
              repairId: 'repair-run-3',
              reconciliationId: 'reconciliation-run-3',
              factId: 'btc-fee-run-3',
              repairKind: 'fee_finality_repair',
              beforeValue: 'confirmed',
              afterValue: 'reorged',
              blocking: true,
              issuedAt: '2026-05-18T12:30:00.000Z',
              raw: {},
            },
          ],
          ledgerRows: {
            assetPackRanges: [],
            btcFeeTransactions: [{ receipt_id: 'btc-fee-run-3', finality_state: 'reorged' }],
            ledgerAnchors: [],
            ownershipEvents: [],
            readLicenses: [],
          },
          readErrors: [],
        },
      }),
    );

    expect(result.state).toBe('blocked');
    expect(result.repairReceipts[0].title).toBe('fee_finality_repair blocks projection');
    expect(result.blockingReasons).toEqual(
      expect.arrayContaining([
        'BTC fee finality is reorged; database projection cannot unlock until repaired.',
        'Repair repair-run-3 blocks btc-fee-run-3.',
      ]),
    );
  });
});
