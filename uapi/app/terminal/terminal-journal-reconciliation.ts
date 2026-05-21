import type {
  TerminalJournalEntrySnapshot,
  TerminalJournalReadbackSnapshot,
  TerminalJsonRecord,
  TerminalLedgerSettlementSnapshot,
  TerminalReconciliationRepairSnapshot,
  TerminalRunDetailSnapshot,
} from './terminal-transaction-detail-snapshot';

export type TerminalJournalReconciliationState =
  | 'aligned'
  | 'retryable'
  | 'repairable'
  | 'approval_required'
  | 'blocked'
  | 'unavailable';

export type TerminalJournalReconciliationFact = {
  id: string;
  label: string;
  value: string;
  state: string;
  source: 'ledger_observed' | 'database_projected' | 'metaphysical_canonical';
  blocksContradictoryProjection: boolean;
};

export type TerminalJournalReconciliationSnapshot = {
  state: TerminalJournalReconciliationState;
  stateLabel: string;
  summary: string;
  metrics: Array<{ label: string; value: string }>;
  observedFacts: TerminalJournalReconciliationFact[];
  projectedFacts: TerminalJournalReconciliationFact[];
  canonicalFacts: TerminalJournalReconciliationFact[];
  journalEntries: Array<{ id: string; title: string; summary: string; supportingText?: string }>;
  repairReceipts: Array<{ id: string; title: string; summary: string; supportingText?: string }>;
  repairActions: Array<{ id: string; title: string; summary: string; supportingText?: string }>;
  proofRoots: Array<{ id: string; title: string; summary: string; supportingText?: string }>;
  driftKindCounts: Array<{ label: string; value: string }>;
  blockingReasons: string[];
  payload: unknown;
};

const BLOCKING_FINALITY_STATES = new Set(['confirmed', 'reorged', 'failed']);
const FAILED_FINALITY_STATES = new Set(['reorged', 'failed']);

function asString(value: unknown) {
  return typeof value === 'string' && value.trim() ? value : null;
}

function asNumber(value: unknown) {
  return typeof value === 'number' && Number.isFinite(value) ? value : null;
}

function asIntegerAmount(value: unknown) {
  if (typeof value === 'number' && Number.isInteger(value)) return value;
  if (typeof value === 'bigint') return Number(value);
  if (typeof value === 'string' && /^[0-9]+$/u.test(value)) return Number(value);
  return null;
}

function formatBoolean(value: boolean | undefined) {
  if (value === true) return 'present';
  if (value === false) return 'missing';
  return 'unknown';
}

function formatCount(value: number) {
  return new Intl.NumberFormat('en-US').format(value);
}

function firstRow(rows: TerminalJsonRecord[] | undefined) {
  return rows && rows.length ? rows[0] : null;
}

function readFinality(row: TerminalJsonRecord | null, fallback?: unknown) {
  return asString(row?.finality_state) || asString(row?.finalityState) || asString(fallback) || 'unknown';
}

function formatRange(range: TerminalJsonRecord | null) {
  const start = asNumber(range?.start) ?? asNumber(range?.range_start);
  const endExclusive = asNumber(range?.endExclusive) ?? asNumber(range?.range_end_exclusive);
  const tokenCount = asNumber(range?.tokenCount) ?? asNumber(range?.token_count);

  if (start === null || endExclusive === null) return null;
  return `${start}..${endExclusive} (${tokenCount ?? endExclusive - start} cell${(tokenCount ?? endExclusive - start) === 1 ? '' : 's'})`;
}

function fact(input: TerminalJournalReconciliationFact): TerminalJournalReconciliationFact {
  return input;
}

function buildObservedFacts(
  settlement: TerminalLedgerSettlementSnapshot | null,
  journal: TerminalJournalReadbackSnapshot | null,
): TerminalJournalReconciliationFact[] {
  const btcFeeRow = firstRow(journal?.ledgerRows.btcFeeTransactions);
  const anchorRow = firstRow(journal?.ledgerRows.ledgerAnchors);
  const btcFeeFinality = readFinality(btcFeeRow, settlement?.btcFee?.finalityState);
  const anchorFinality = readFinality(anchorRow, 'unknown');

  return [
    fact({
      id: 'btc-fee-finality',
      label: 'BTC fee finality',
      value: btcFeeFinality,
      state: btcFeeFinality,
      source: 'ledger_observed',
      blocksContradictoryProjection: BLOCKING_FINALITY_STATES.has(btcFeeFinality),
    }),
    fact({
      id: 'ledger-anchor-finality',
      label: 'Ledger anchor finality',
      value: anchorFinality,
      state: anchorFinality,
      source: 'ledger_observed',
      blocksContradictoryProjection: BLOCKING_FINALITY_STATES.has(anchorFinality),
    }),
    fact({
      id: 'terminal-journal-entries',
      label: 'Terminal journal entries',
      value: formatCount(journal?.entries.length || 0),
      state: journal?.entries.length ? 'present' : 'missing',
      source: 'ledger_observed',
      blocksContradictoryProjection: Boolean(journal?.entries.length),
    }),
    fact({
      id: 'repair-receipts',
      label: 'Repair receipts',
      value: formatCount(journal?.repairs.length || 0),
      state: journal?.repairs.some((repair) => repair.blocking) ? 'blocking' : journal?.repairs.length ? 'present' : 'none',
      source: 'ledger_observed',
      blocksContradictoryProjection: Boolean(journal?.repairs.some((repair) => repair.blocking)),
    }),
  ];
}

function buildProjectedFacts(settlement: TerminalLedgerSettlementSnapshot | null): TerminalJournalReconciliationFact[] {
  const readback = settlement?.readback || {};
  const preferredOrder = [
    'assetPackRange',
    'btdCell',
    'ownershipEvent',
    'readLicense',
    'btcFeeTransaction',
    'ledgerAnchor',
    'terminalJournal',
    'cryptoTelemetry',
  ];
  const keys = [
    ...preferredOrder.filter((key) => key in readback),
    ...Object.keys(readback).filter((key) => !preferredOrder.includes(key)),
  ];

  if (!keys.length) {
    return [
      fact({
        id: 'database-readback',
        label: 'Database readback',
        value: 'not projected',
        state: 'missing',
        source: 'database_projected',
        blocksContradictoryProjection: false,
      }),
    ];
  }

  return keys.map((key) =>
    fact({
      id: `readback-${key}`,
      label: key,
      value: formatBoolean(readback[key]),
      state: formatBoolean(readback[key]),
      source: 'database_projected',
      blocksContradictoryProjection: false,
    }),
  );
}

function buildCanonicalFacts(
  settlement: TerminalLedgerSettlementSnapshot | null,
  journal: TerminalJournalReadbackSnapshot | null,
): TerminalJournalReconciliationFact[] {
  const assetPackRange = firstRow(journal?.ledgerRows.assetPackRanges);
  const anchorRow = firstRow(journal?.ledgerRows.ledgerAnchors);
  const btcFeeRow = firstRow(journal?.ledgerRows.btcFeeTransactions);
  const range = formatRange(settlement?.btdRange || assetPackRange);

  return [
    fact({
      id: 'asset-pack-id',
      label: 'AssetPack id',
      value: settlement?.assetPackId || asString(assetPackRange?.asset_pack_id) || 'n/a',
      state: settlement?.assetPackId || assetPackRange ? 'root-bound' : 'missing',
      source: 'metaphysical_canonical',
      blocksContradictoryProjection: false,
    }),
    fact({
      id: 'btd-range',
      label: 'BTD range',
      value: range || 'n/a',
      state: range ? 'root-bound' : 'missing',
      source: 'metaphysical_canonical',
      blocksContradictoryProjection: false,
    }),
    fact({
      id: 'settlement-journal-root',
      label: 'Settlement journal root',
      value: asString(btcFeeRow?.terminal_journal_root) || asString(anchorRow?.commitment_root) || 'n/a',
      state: btcFeeRow?.terminal_journal_root || anchorRow?.commitment_root ? 'root-bound' : 'missing',
      source: 'metaphysical_canonical',
      blocksContradictoryProjection: false,
    }),
    fact({
      id: 'access-policy-hash',
      label: 'Access policy hash',
      value: asString(assetPackRange?.access_policy_hash) || asString(anchorRow?.access_policy_hash) || 'n/a',
      state: assetPackRange?.access_policy_hash || anchorRow?.access_policy_hash ? 'root-bound' : 'missing',
      source: 'metaphysical_canonical',
      blocksContradictoryProjection: false,
    }),
  ];
}

function buildJournalItems(entries: TerminalJournalEntrySnapshot[]) {
  return entries.map((entry) => ({
    id: entry.journalEntryId,
    title: entry.transactionKind,
    summary: `${entry.actorId} · ${entry.exchangeSequence ?? 'unsequenced'} · ${entry.postStateRoot}`,
    supportingText: entry.issuedAt || undefined,
  }));
}

function buildRepairItems(repairs: TerminalReconciliationRepairSnapshot[]) {
  return repairs.map((repair) => ({
    id: repair.repairId,
    title: repair.blocking ? `${repair.repairKind} blocks projection` : repair.repairKind,
    summary: `${repair.factId}: ${repair.beforeValue} -> ${repair.afterValue}`,
    supportingText:
      repair.proofRoot ||
      repair.driftKind ||
      repair.issuedAt ||
      repair.reconciliationId,
  }));
}

function deriveDriftKind(repair: TerminalReconciliationRepairSnapshot) {
  if (repair.driftKind) return repair.driftKind;
  if (repair.beforeValue === 'missing') return 'missing_database_projection';
  if (repair.repairKind.includes('finality')) return 'ledger_finality_mismatch';
  if (repair.repairKind.includes('conservation')) return 'settlement_conservation_drift';
  if (repair.afterValue.includes('quarantined')) return 'database_orphan_projection';
  return 'ledger_root_mismatch';
}

function deriveRepairActionKind(repair: TerminalReconciliationRepairSnapshot) {
  if (repair.repairActionKind) return repair.repairActionKind;
  if (repair.afterValue === 'reorged' || repair.afterValue === 'failed') return 'pause_settlement_unlock';
  if (repair.repairKind.includes('conservation')) return 'pause_settlement_unlock';
  if (repair.beforeValue === 'missing') return 'project_ledger_fact';
  if (repair.repairKind.includes('finality')) return 'update_finality_state';
  if (repair.afterValue.includes('quarantined')) return 'quarantine_database_projection';
  return 'project_ledger_fact';
}

function summarizeRepairAction(repair: TerminalReconciliationRepairSnapshot) {
  const actionKind = deriveRepairActionKind(repair);
  switch (actionKind) {
    case 'project_ledger_fact':
      return `Project ${repair.factId} from ledger observation into the database projection.`;
    case 'update_finality_state':
      return `Update ${repair.factId} finality from ${repair.beforeValue} to ${repair.afterValue}.`;
    case 'quarantine_database_projection':
      return `Quarantine ${repair.factId} until a matching ledger observation is available.`;
    case 'pause_settlement_unlock':
      return `Pause settlement unlock for ${repair.factId} until this drift is resolved.`;
    case 'recover_delivery':
      return `Recover delivery for ${repair.factId} after settlement state is aligned.`;
    case 'retry_database_readback':
      return `Retry database readback for ${repair.factId}.`;
    default:
      return `Repair ${repair.factId}.`;
  }
}

function buildRepairActions(
  settlement: TerminalLedgerSettlementSnapshot | null,
  journal: TerminalJournalReadbackSnapshot | null,
  detail: TerminalRunDetailSnapshot | null,
  observedFacts: TerminalJournalReconciliationFact[],
  missingJournalEntryIds: string[],
) {
  const actions = (journal?.repairs || []).map((repair) => ({
    id: `${repair.repairId}:${deriveRepairActionKind(repair)}`,
    title: deriveRepairActionKind(repair),
    summary: summarizeRepairAction(repair),
    supportingText:
      repair.requiresOperatorApproval || repair.blocking
        ? 'operator approval required'
        : repair.proofRoot || repair.issuedAt || undefined,
  }));

  for (const entryId of missingJournalEntryIds) {
    actions.push({
      id: `${entryId}:retry_database_readback`,
      title: 'retry_database_readback',
      summary: `Retry Terminal journal readback for expected entry ${entryId}.`,
      supportingText: 'missing journal projection',
    });
  }

  for (const readError of journal?.readErrors || []) {
    actions.push({
      id: `read-error:${actions.length}`,
      title: 'retry_database_readback',
      summary: readError,
      supportingText: 'readback error',
    });
  }

  const readback = settlement?.readback || {};
  const btcFeeFinality = observedFacts.find((entry) => entry.id === 'btc-fee-finality')?.state || 'unknown';
  const anchorFinality = observedFacts.find((entry) => entry.id === 'ledger-anchor-finality')?.state || 'unknown';
  if (anchorFinality === 'confirmed' && readback.ledgerAnchor === false) {
    actions.push({
      id: `${settlement?.ledgerAnchorId || 'ledger-anchor'}:project_ledger_fact`,
      title: 'project_ledger_fact',
      summary: 'Project the confirmed ledger anchor into the database before unlock or delivery continues.',
      supportingText: 'operator approval required',
    });
  }
  if (btcFeeFinality === 'confirmed' && readback.btcFeeTransaction === false) {
    actions.push({
      id: `${settlement?.btcFeeReceiptId || 'btc-fee'}:project_ledger_fact`,
      title: 'project_ledger_fact',
      summary: 'Project the confirmed BTC fee transaction into the database before unlock or delivery continues.',
      supportingText: 'operator approval required',
    });
  }
  if ((journal?.entries.length || 0) > 0 && readback.terminalJournal === false) {
    actions.push({
      id: 'terminal-journal:project_ledger_fact',
      title: 'project_ledger_fact',
      summary: 'Project observed Terminal journal entries into the database readback projection.',
      supportingText: 'operator approval required',
    });
  }
  const conservationReason = buildSettlementConservationReason(settlement, journal);
  if (conservationReason) {
    actions.push({
      id: `${settlement?.btcFeeReceiptId || 'btc-fee'}:pause_settlement_unlock`,
      title: 'pause_settlement_unlock',
      summary: conservationReason,
      supportingText: 'settlement conservation drift',
    });
  }

  if (
    settlement?.status === 'settled' &&
    settlement.settlementAdmissible === true &&
    Boolean(detail?.deliveryMechanism) &&
    !detail?.shippables?.pullRequest?.url
  ) {
    actions.push({
      id: `${settlement.assetPackId || 'asset-pack'}:recover_delivery`,
      title: 'recover_delivery',
      summary: 'Settlement is aligned, but pull-request delivery is not visible in the transaction detail.',
      supportingText: 'delivery recovery',
    });
  }

  return actions;
}

function buildDriftKindCounts(
  repairs: TerminalReconciliationRepairSnapshot[],
  missingJournalEntryIds: string[],
) {
  const counts = new Map<string, number>();
  for (const repair of repairs) {
    const kind = deriveDriftKind(repair);
    counts.set(kind, (counts.get(kind) || 0) + 1);
  }
  if (missingJournalEntryIds.length) {
    counts.set(
      'missing_database_projection',
      (counts.get('missing_database_projection') || 0) + missingJournalEntryIds.length,
    );
  }
  return Array.from(counts.entries())
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([label, value]) => ({ label, value: formatCount(value) }));
}

function uniqueProofRootItems(entries: Array<{ title: string; root: string; supportingText?: string }>) {
  const seen = new Set<string>();
  return entries
    .filter((entry) => entry.root && entry.root !== 'n/a')
    .filter((entry) => {
      if (seen.has(entry.root)) return false;
      seen.add(entry.root);
      return true;
    })
    .map((entry, index) => ({
      id: `${entry.title}:${entry.root}:${index}`,
      title: entry.title,
      summary: entry.root,
      supportingText: entry.supportingText,
    }));
}

function buildProofRoots(
  journal: TerminalJournalReadbackSnapshot | null,
  canonicalFacts: TerminalJournalReconciliationFact[],
) {
  const repairRoots =
    journal?.repairs.flatMap((repair) =>
      repair.proofRoot
        ? [{
            title: `${deriveDriftKind(repair)} repair root`,
            root: repair.proofRoot,
            supportingText: repair.repairId,
          }]
        : [],
    ) || [];
  const journalRoots =
    journal?.entries.flatMap((entry) => [
      { title: 'pre-state root', root: entry.preStateRoot, supportingText: entry.journalEntryId },
      { title: 'post-state root', root: entry.postStateRoot, supportingText: entry.journalEntryId },
      ...entry.receiptRoots.map((root) => ({
        title: 'receipt root',
        root,
        supportingText: entry.journalEntryId,
      })),
    ]) || [];
  const canonicalRoots = canonicalFacts
    .filter((entry) => entry.state === 'root-bound')
    .map((entry) => ({
      title: entry.label,
      root: entry.value,
      supportingText: entry.source,
    }));

  return uniqueProofRootItems([...repairRoots, ...journalRoots, ...canonicalRoots]);
}

function findMissingExpectedJournalEntries(journal: TerminalJournalReadbackSnapshot | null) {
  if (!journal?.expectedJournalEntryIds.length) return [];
  const observedIds = new Set(journal.entries.map((entry) => entry.journalEntryId));
  return journal.expectedJournalEntryIds.filter((entryId) => !observedIds.has(entryId));
}

function buildBlockingReasons(
  settlement: TerminalLedgerSettlementSnapshot | null,
  journal: TerminalJournalReadbackSnapshot | null,
  observedFacts: TerminalJournalReconciliationFact[],
) {
  const reasons: string[] = [];
  const readback = settlement?.readback || {};
  const btcFeeFinality = observedFacts.find((entry) => entry.id === 'btc-fee-finality')?.state || 'unknown';
  const anchorFinality = observedFacts.find((entry) => entry.id === 'ledger-anchor-finality')?.state || 'unknown';

  if (FAILED_FINALITY_STATES.has(btcFeeFinality)) {
    reasons.push(`BTC fee finality is ${btcFeeFinality}; database projection cannot unlock until repaired.`);
  }
  if (FAILED_FINALITY_STATES.has(anchorFinality)) {
    reasons.push(`Ledger anchor finality is ${anchorFinality}; database projection cannot unlock until repaired.`);
  }
  if (anchorFinality === 'confirmed' && readback.ledgerAnchor === false) {
    reasons.push('Confirmed ledger anchor contradicts the missing database projection.');
  }
  if (btcFeeFinality === 'confirmed' && readback.btcFeeTransaction === false) {
    reasons.push('Confirmed BTC fee transaction contradicts the missing database projection.');
  }
  if ((journal?.entries.length || 0) > 0 && readback.terminalJournal === false) {
    reasons.push('Observed Terminal journal entries contradict the missing journal projection.');
  }
  const settlementConservationReason = buildSettlementConservationReason(settlement, journal);
  if (settlementConservationReason) {
    reasons.push(settlementConservationReason);
  }
  for (const repair of journal?.repairs || []) {
    if (repair.blocking) {
      reasons.push(`Repair ${repair.repairId} blocks ${repair.factId}.`);
    }
  }
  for (const readError of journal?.readErrors || []) {
    reasons.push(readError);
  }

  return reasons;
}

function buildSettlementConservationReason(
  settlement: TerminalLedgerSettlementSnapshot | null,
  journal: TerminalJournalReadbackSnapshot | null,
) {
  const quotedSats =
    asIntegerAmount(settlement?.btcFee?.sats) ??
    asIntegerAmount(settlement?.btcFee?.satsPaid) ??
    asIntegerAmount(settlement?.btcFee?.sats_paid);
  const feeRow = firstRow(journal?.ledgerRows.btcFeeTransactions);
  const observedSats =
    asIntegerAmount(feeRow?.sats_paid) ??
    asIntegerAmount(feeRow?.satsPaid) ??
    asIntegerAmount(feeRow?.sats) ??
    null;

  if (quotedSats === null || observedSats === null || quotedSats === observedSats) return null;
  return `BTC fee sats do not conserve across settlement quote and database readback (${quotedSats} quoted, ${observedSats} observed).`;
}

function deriveState(
  settlement: TerminalLedgerSettlementSnapshot | null,
  journal: TerminalJournalReadbackSnapshot | null,
  blockingReasons: string[],
  missingJournalEntryIds: string[],
): TerminalJournalReconciliationState {
  if (!settlement && !journal) return 'unavailable';
  if (
    blockingReasons.some(
      (reason) =>
        reason.includes('finality is reorged') ||
        reason.includes('finality is failed') ||
        reason.includes('do not conserve') ||
        reason.startsWith('Repair '),
    )
  ) {
    return 'blocked';
  }
  if (blockingReasons.some((reason) => reason.includes('Confirmed') || reason.includes('Observed Terminal journal'))) {
    return 'approval_required';
  }
  if ((journal?.repairs.length || 0) > 0) return 'repairable';
  if (missingJournalEntryIds.length || Object.values(settlement?.readback || {}).some((value) => value === false) || (journal?.readErrors.length || 0) > 0) {
    return 'retryable';
  }
  if (settlement?.settlementAdmissible && settlement.status === 'settled') return 'aligned';
  return settlement?.status === 'blocked' ? 'blocked' : 'retryable';
}

function stateLabel(state: TerminalJournalReconciliationState) {
  switch (state) {
    case 'aligned':
      return 'Aligned';
    case 'retryable':
      return 'Retryable';
    case 'repairable':
      return 'Repairable';
    case 'approval_required':
      return 'Approval required';
    case 'blocked':
      return 'Blocked';
    case 'unavailable':
      return 'Unavailable';
  }
}

export function buildTerminalJournalReconciliation(
  detail: TerminalRunDetailSnapshot | null,
): TerminalJournalReconciliationSnapshot {
  const settlement = detail?.ledgerSettlement || null;
  const journal = detail?.terminalJournal || null;
  const observedFacts = buildObservedFacts(settlement, journal);
  const projectedFacts = buildProjectedFacts(settlement);
  const canonicalFacts = buildCanonicalFacts(settlement, journal);
  const missingJournalEntryIds = findMissingExpectedJournalEntries(journal);
  const blockingReasons = buildBlockingReasons(settlement, journal, observedFacts);
  if (missingJournalEntryIds.length) {
    blockingReasons.push(`Missing Terminal journal entries: ${missingJournalEntryIds.join(', ')}`);
  }
  const state = deriveState(settlement, journal, blockingReasons, missingJournalEntryIds);
  const repairActions = buildRepairActions(
    settlement,
    journal,
    detail,
    observedFacts,
    missingJournalEntryIds,
  );
  const proofRoots = buildProofRoots(journal, canonicalFacts);
  const driftKindCounts = buildDriftKindCounts(journal?.repairs || [], missingJournalEntryIds);

  return {
    state,
    stateLabel: stateLabel(state),
    summary:
      state === 'aligned'
        ? 'Ledger observations, database projections, and canonical roots agree for this activity.'
        : 'Journal reconciliation separates observed ledger facts, projected database rows, and canonical root facts so drift can be retried, repaired, approved, or blocked explicitly.',
    metrics: [
      { label: 'State', value: stateLabel(state) },
      { label: 'Journal entries', value: formatCount(journal?.entries.length || 0) },
      { label: 'Projected facts', value: formatCount(projectedFacts.length) },
      { label: 'Repair receipts', value: formatCount(journal?.repairs.length || 0) },
      { label: 'Repair actions', value: formatCount(repairActions.length) },
      { label: 'Proof roots', value: formatCount(proofRoots.length) },
    ],
    observedFacts,
    projectedFacts,
    canonicalFacts,
    journalEntries: buildJournalItems(journal?.entries || []),
    repairReceipts: buildRepairItems(journal?.repairs || []),
    repairActions,
    proofRoots,
    driftKindCounts,
    blockingReasons,
    payload: {
      ledgerSettlement: settlement,
      terminalJournal: journal,
      observedFacts,
      projectedFacts,
      canonicalFacts,
      missingJournalEntryIds,
      repairActions,
      proofRoots,
      driftKindCounts,
      blockingReasons,
    },
  };
}
