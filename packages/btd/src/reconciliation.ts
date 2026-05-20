import { assertNonEmptyString } from './constants';

export type ProjectionRepairKind =
  | 'ledger_finality_state'
  | 'ledger_anchor_root'
  | 'terminal_post_state'
  | 'receipt_root'
  | 'settlement_conservation'
  | 'delivery_recovery';

export type ProjectionDriftKind =
  | 'missing_database_projection'
  | 'ledger_root_mismatch'
  | 'ledger_finality_mismatch'
  | 'database_orphan_projection'
  | 'settlement_conservation_drift';

export type ProjectionRepairActionKind =
  | 'retry_database_readback'
  | 'project_ledger_fact'
  | 'update_finality_state'
  | 'quarantine_database_projection'
  | 'pause_settlement_unlock'
  | 'recover_delivery';

export type LedgerDatabaseReconciliationState =
  | 'aligned'
  | 'retryable'
  | 'repairable'
  | 'approval_required'
  | 'blocked';

export interface ProjectionRepairAction {
  actionId: string;
  repairId?: string;
  factId: string;
  actionKind: ProjectionRepairActionKind;
  driftKind: ProjectionDriftKind;
  summary: string;
  blocking: boolean;
  requiresOperatorApproval: boolean;
  proofRoot: string;
  issuedAt: string;
}

export interface LedgerObservedFact {
  factId: string;
  ledgerRoot: string;
  finalityState: 'prepared' | 'broadcast' | 'confirmed' | 'reorged' | 'failed';
}

export interface DatabaseProjectedFact {
  factId: string;
  projectedLedgerRoot: string;
  projectedFinalityState: 'prepared' | 'broadcast' | 'confirmed' | 'reorged' | 'failed';
}

export type MetaphysicalCanonicalFactKind =
  | 'private_source_metadata'
  | 'need_fit_context'
  | 'access_policy_document'
  | 'encrypted_storage_pointer'
  | 'dispute_record'
  | 'telemetry_context';

export interface MetaphysicalCanonicalFact {
  factId: string;
  factKind: MetaphysicalCanonicalFactKind;
  canonicalRoot: string;
  receiptRoot?: string;
  private: boolean;
}

export interface ProjectionRepairReceipt {
  kind: 'btd.ledger_database_projection_repair';
  repairId: string;
  factId: string;
  repairKind: ProjectionRepairKind;
  driftKind: ProjectionDriftKind;
  repairActionKind: ProjectionRepairActionKind;
  before: string;
  after: string;
  blocking: boolean;
  requiresOperatorApproval: boolean;
  proofRoot: string;
  issuedAt: string;
}

export interface SettlementConservationCheck {
  checkId: string;
  expectedDebitSats: number;
  observedDebitSats: number;
  expectedCreditSats: number;
  observedCreditSats: number;
  feeQuoteRoot?: string;
  paymentReceiptRoot?: string;
}

export interface SettlementConservationProjection {
  status: 'not_checked' | 'balanced' | 'drifted';
  checks: SettlementConservationCheck[];
  proofRoot: string;
}

export interface LedgerDatabaseReconciliationProofRoots {
  ledgerObservedRoot: string;
  databaseProjectionRoot: string;
  metaphysicalCanonicalRoot: string;
  repairPlanRoot: string;
  settlementConservationRoot: string;
}

export interface LedgerDatabaseReconciliationReport {
  kind: 'btd.ledger_database_reconciliation';
  reconciliationId: string;
  state: LedgerDatabaseReconciliationState;
  repairs: ProjectionRepairReceipt[];
  repairActions: ProjectionRepairAction[];
  driftKindCounts: Record<ProjectionDriftKind, number>;
  proofRoots: LedgerDatabaseReconciliationProofRoots;
  settlementConservation: SettlementConservationProjection;
  metaphysicalFacts: MetaphysicalCanonicalFact[];
  blocking: boolean;
}

export function reconcileLedgerDatabaseProjection(input: {
  reconciliationId: string;
  ledgerFacts: LedgerObservedFact[];
  databaseFacts: DatabaseProjectedFact[];
  metaphysicalFacts?: MetaphysicalCanonicalFact[];
  settlementConservationChecks?: SettlementConservationCheck[];
  issuedAt?: string;
}): LedgerDatabaseReconciliationReport {
  const reconciliationId = assertNonEmptyString(input.reconciliationId, 'reconciliationId');
  const databaseByFactId = new Map(input.databaseFacts.map((fact) => [fact.factId, fact]));
  const ledgerFactIds = new Set(input.ledgerFacts.map((fact) => fact.factId));
  const metaphysicalFacts = (input.metaphysicalFacts ?? []).map(assertMetaphysicalFact);
  const settlementConservationChecks = (input.settlementConservationChecks ?? []).map(
    assertSettlementConservationCheck,
  );
  const repairs: ProjectionRepairReceipt[] = [];
  const issuedAt = input.issuedAt ?? new Date().toISOString();

  for (const ledgerFact of input.ledgerFacts) {
    assertLedgerFact(ledgerFact);
    const projected = databaseByFactId.get(ledgerFact.factId);

    if (!projected) {
      repairs.push(buildRepairReceipt({
        reconciliationId,
        factId: ledgerFact.factId,
        suffix: 'missing_projection',
        repairKind: 'ledger_anchor_root',
        driftKind: 'missing_database_projection',
        repairActionKind: 'project_ledger_fact',
        before: 'missing',
        after: ledgerFact.ledgerRoot,
        blocking: true,
        requiresOperatorApproval: true,
        issuedAt,
      }));
      continue;
    }

    if (projected.projectedLedgerRoot !== ledgerFact.ledgerRoot) {
      repairs.push(buildRepairReceipt({
        reconciliationId,
        factId: ledgerFact.factId,
        suffix: 'ledger_root',
        repairKind: 'ledger_anchor_root',
        driftKind: 'ledger_root_mismatch',
        repairActionKind: 'project_ledger_fact',
        before: projected.projectedLedgerRoot,
        after: ledgerFact.ledgerRoot,
        blocking: true,
        requiresOperatorApproval: true,
        issuedAt,
      }));
    }

    if (projected.projectedFinalityState !== ledgerFact.finalityState) {
      const finalityBlocks =
        ledgerFact.finalityState === 'confirmed' ||
        ledgerFact.finalityState === 'reorged' ||
        ledgerFact.finalityState === 'failed';
      repairs.push(buildRepairReceipt({
        reconciliationId,
        factId: ledgerFact.factId,
        suffix: 'finality',
        repairKind: 'ledger_finality_state',
        driftKind: 'ledger_finality_mismatch',
        repairActionKind:
          ledgerFact.finalityState === 'reorged' || ledgerFact.finalityState === 'failed'
            ? 'pause_settlement_unlock'
            : 'update_finality_state',
        before: projected.projectedFinalityState,
        after: ledgerFact.finalityState,
        blocking: finalityBlocks,
        requiresOperatorApproval: finalityBlocks,
        issuedAt,
      }));
    }
  }

  for (const databaseFact of input.databaseFacts) {
    assertDatabaseFact(databaseFact);
    if (ledgerFactIds.has(databaseFact.factId)) continue;
    repairs.push(buildRepairReceipt({
      reconciliationId,
      factId: databaseFact.factId,
      suffix: 'orphan_projection',
      repairKind: 'terminal_post_state',
      driftKind: 'database_orphan_projection',
      repairActionKind: 'quarantine_database_projection',
      before: databaseFact.projectedLedgerRoot,
      after: 'quarantined_until_ledger_observation',
      blocking: true,
      requiresOperatorApproval: true,
      issuedAt,
    }));
  }

  for (const check of settlementConservationChecks) {
    if (isConservationBalanced(check)) continue;
    repairs.push(buildRepairReceipt({
      reconciliationId,
      factId: check.checkId,
      suffix: 'settlement_conservation',
      repairKind: 'settlement_conservation',
      driftKind: 'settlement_conservation_drift',
      repairActionKind: 'pause_settlement_unlock',
      before: conservationSnapshot(check, 'expected'),
      after: conservationSnapshot(check, 'observed'),
      blocking: true,
      requiresOperatorApproval: true,
      issuedAt,
    }));
  }

  const repairActions = repairs.map((repair) => buildRepairAction(repair));
  const driftKindCounts = countDriftKinds(repairs);
  const settlementConservation = buildSettlementConservationProjection(
    reconciliationId,
    settlementConservationChecks,
  );
  const proofRoots = {
    ledgerObservedRoot: stableProofRoot('ledger-observed', input.ledgerFacts),
    databaseProjectionRoot: stableProofRoot('database-projected', input.databaseFacts),
    metaphysicalCanonicalRoot: stableProofRoot('metaphysical-canonical', metaphysicalFacts),
    repairPlanRoot: stableProofRoot('repair-plan', repairs),
    settlementConservationRoot: settlementConservation.proofRoot,
  };
  const blocking = repairs.some((repair) => repair.blocking);

  return {
    kind: 'btd.ledger_database_reconciliation',
    reconciliationId,
    state: deriveReconciliationState(repairs),
    repairs,
    repairActions,
    driftKindCounts,
    proofRoots,
    settlementConservation,
    metaphysicalFacts,
    blocking,
  };
}

function assertLedgerFact(fact: LedgerObservedFact): void {
  assertNonEmptyString(fact.factId, 'factId');
  assertNonEmptyString(fact.ledgerRoot, 'ledgerRoot');
}

function assertDatabaseFact(fact: DatabaseProjectedFact): void {
  assertNonEmptyString(fact.factId, 'factId');
  assertNonEmptyString(fact.projectedLedgerRoot, 'projectedLedgerRoot');
}

function assertMetaphysicalFact(fact: MetaphysicalCanonicalFact): MetaphysicalCanonicalFact {
  assertNonEmptyString(fact.factId, 'factId');
  assertNonEmptyString(fact.factKind, 'factKind');
  assertNonEmptyString(fact.canonicalRoot, 'canonicalRoot');
  if (fact.receiptRoot !== undefined) {
    assertNonEmptyString(fact.receiptRoot, 'receiptRoot');
  }
  if (fact.private !== true) {
    throw new Error('Metaphysical canonical facts must be marked private.');
  }

  return fact;
}

function assertSettlementConservationCheck(
  check: SettlementConservationCheck,
): SettlementConservationCheck {
  assertNonEmptyString(check.checkId, 'checkId');
  assertNonNegativeSats(check.expectedDebitSats, 'expectedDebitSats');
  assertNonNegativeSats(check.observedDebitSats, 'observedDebitSats');
  assertNonNegativeSats(check.expectedCreditSats, 'expectedCreditSats');
  assertNonNegativeSats(check.observedCreditSats, 'observedCreditSats');
  if (check.feeQuoteRoot !== undefined) assertNonEmptyString(check.feeQuoteRoot, 'feeQuoteRoot');
  if (check.paymentReceiptRoot !== undefined) {
    assertNonEmptyString(check.paymentReceiptRoot, 'paymentReceiptRoot');
  }
  return check;
}

function assertNonNegativeSats(value: number, field: string): void {
  if (!Number.isInteger(value) || value < 0) {
    throw new Error(`${field} must be a non-negative integer sat amount.`);
  }
}

function buildRepairReceipt(input: {
  reconciliationId: string;
  factId: string;
  suffix: string;
  repairKind: ProjectionRepairKind;
  driftKind: ProjectionDriftKind;
  repairActionKind: ProjectionRepairActionKind;
  before: string;
  after: string;
  blocking: boolean;
  requiresOperatorApproval: boolean;
  issuedAt: string;
}): ProjectionRepairReceipt {
  const repairId = `${input.reconciliationId}:${input.factId}:${input.suffix}`;
  return {
    kind: 'btd.ledger_database_projection_repair',
    repairId,
    factId: input.factId,
    repairKind: input.repairKind,
    driftKind: input.driftKind,
    repairActionKind: input.repairActionKind,
    before: input.before,
    after: input.after,
    blocking: input.blocking,
    requiresOperatorApproval: input.requiresOperatorApproval,
    proofRoot: stableProofRoot('projection-repair', [
      repairId,
      input.repairKind,
      input.driftKind,
      input.before,
      input.after,
    ]),
    issuedAt: input.issuedAt,
  };
}

function buildRepairAction(repair: ProjectionRepairReceipt): ProjectionRepairAction {
  return {
    actionId: `${repair.repairId}:action:${repair.repairActionKind}`,
    repairId: repair.repairId,
    factId: repair.factId,
    actionKind: repair.repairActionKind,
    driftKind: repair.driftKind,
    summary: describeRepairAction(repair),
    blocking: repair.blocking,
    requiresOperatorApproval: repair.requiresOperatorApproval,
    proofRoot: stableProofRoot('projection-repair-action', [
      repair.repairId,
      repair.repairActionKind,
      repair.proofRoot,
    ]),
    issuedAt: repair.issuedAt,
  };
}

function describeRepairAction(repair: ProjectionRepairReceipt): string {
  switch (repair.repairActionKind) {
    case 'project_ledger_fact':
      return `Project ledger fact ${repair.factId} into the database from ${repair.before} to ${repair.after}.`;
    case 'update_finality_state':
      return `Update database finality for ${repair.factId} from ${repair.before} to ${repair.after}.`;
    case 'quarantine_database_projection':
      return `Quarantine database projection ${repair.factId} until a matching ledger observation exists.`;
    case 'pause_settlement_unlock':
      return `Pause settlement unlock for ${repair.factId} until the drift is reconciled.`;
    case 'recover_delivery':
      return `Recover post-settlement delivery for ${repair.factId}.`;
    case 'retry_database_readback':
      return `Retry database readback for ${repair.factId}.`;
  }
}

function countDriftKinds(repairs: ProjectionRepairReceipt[]): Record<ProjectionDriftKind, number> {
  const counts: Record<ProjectionDriftKind, number> = {
    missing_database_projection: 0,
    ledger_root_mismatch: 0,
    ledger_finality_mismatch: 0,
    database_orphan_projection: 0,
    settlement_conservation_drift: 0,
  };
  for (const repair of repairs) {
    counts[repair.driftKind] += 1;
  }
  return counts;
}

function deriveReconciliationState(
  repairs: ProjectionRepairReceipt[],
): LedgerDatabaseReconciliationState {
  if (!repairs.length) return 'aligned';
  if (
    repairs.some(
      (repair) =>
        repair.repairActionKind === 'pause_settlement_unlock' ||
        repair.driftKind === 'settlement_conservation_drift',
    )
  ) {
    return 'blocked';
  }
  if (repairs.some((repair) => repair.requiresOperatorApproval)) return 'approval_required';
  if (repairs.some((repair) => repair.blocking)) return 'repairable';
  return 'retryable';
}

function buildSettlementConservationProjection(
  reconciliationId: string,
  checks: SettlementConservationCheck[],
): SettlementConservationProjection {
  const status = !checks.length
    ? 'not_checked'
    : checks.every(isConservationBalanced)
      ? 'balanced'
      : 'drifted';
  return {
    status,
    checks,
    proofRoot: stableProofRoot('settlement-conservation', [reconciliationId, checks]),
  };
}

function isConservationBalanced(check: SettlementConservationCheck): boolean {
  return (
    check.expectedDebitSats === check.observedDebitSats &&
    check.expectedCreditSats === check.observedCreditSats &&
    check.observedDebitSats === check.observedCreditSats
  );
}

function conservationSnapshot(
  check: SettlementConservationCheck,
  side: 'expected' | 'observed',
): string {
  if (side === 'expected') {
    return `debit:${check.expectedDebitSats};credit:${check.expectedCreditSats}`;
  }
  return `debit:${check.observedDebitSats};credit:${check.observedCreditSats}`;
}

function stableProofRoot(scope: string, value: unknown): string {
  return `btd-proof-root:${scope}:${stableHash(stableSerialize(value))}`;
}

function stableSerialize(value: unknown): string {
  if (value === null || value === undefined) return String(value);
  if (Array.isArray(value)) return `[${value.map(stableSerialize).join(',')}]`;
  if (typeof value === 'object') {
    return `{${Object.entries(value as Record<string, unknown>)
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([key, entry]) => `${JSON.stringify(key)}:${stableSerialize(entry)}`)
      .join(',')}}`;
  }
  return JSON.stringify(value);
}

function stableHash(value: string): string {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(16).padStart(8, '0');
}
