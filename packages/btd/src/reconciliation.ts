import { assertNonEmptyString } from './constants';

export type ProjectionRepairKind =
  | 'ledger_finality_state'
  | 'ledger_anchor_root'
  | 'terminal_post_state'
  | 'receipt_root';

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

export interface ProjectionRepairReceipt {
  kind: 'btd.ledger_database_projection_repair';
  repairId: string;
  factId: string;
  repairKind: ProjectionRepairKind;
  before: string;
  after: string;
  blocking: boolean;
  issuedAt: string;
}

export interface LedgerDatabaseReconciliationReport {
  kind: 'btd.ledger_database_reconciliation';
  reconciliationId: string;
  repairs: ProjectionRepairReceipt[];
  blocking: boolean;
}

export function reconcileLedgerDatabaseProjection(input: {
  reconciliationId: string;
  ledgerFacts: LedgerObservedFact[];
  databaseFacts: DatabaseProjectedFact[];
  issuedAt?: string;
}): LedgerDatabaseReconciliationReport {
  const reconciliationId = assertNonEmptyString(input.reconciliationId, 'reconciliationId');
  const databaseByFactId = new Map(input.databaseFacts.map((fact) => [fact.factId, fact]));
  const repairs: ProjectionRepairReceipt[] = [];
  const issuedAt = input.issuedAt ?? new Date().toISOString();

  for (const ledgerFact of input.ledgerFacts) {
    assertLedgerFact(ledgerFact);
    const projected = databaseByFactId.get(ledgerFact.factId);

    if (!projected) {
      repairs.push({
        kind: 'btd.ledger_database_projection_repair',
        repairId: `${reconciliationId}:${ledgerFact.factId}:missing_projection`,
        factId: ledgerFact.factId,
        repairKind: 'ledger_anchor_root',
        before: 'missing',
        after: ledgerFact.ledgerRoot,
        blocking: true,
        issuedAt,
      });
      continue;
    }

    if (projected.projectedLedgerRoot !== ledgerFact.ledgerRoot) {
      repairs.push({
        kind: 'btd.ledger_database_projection_repair',
        repairId: `${reconciliationId}:${ledgerFact.factId}:ledger_root`,
        factId: ledgerFact.factId,
        repairKind: 'ledger_anchor_root',
        before: projected.projectedLedgerRoot,
        after: ledgerFact.ledgerRoot,
        blocking: true,
        issuedAt,
      });
    }

    if (projected.projectedFinalityState !== ledgerFact.finalityState) {
      repairs.push({
        kind: 'btd.ledger_database_projection_repair',
        repairId: `${reconciliationId}:${ledgerFact.factId}:finality`,
        factId: ledgerFact.factId,
        repairKind: 'ledger_finality_state',
        before: projected.projectedFinalityState,
        after: ledgerFact.finalityState,
        blocking: ledgerFact.finalityState === 'reorged' || ledgerFact.finalityState === 'failed',
        issuedAt,
      });
    }
  }

  return {
    kind: 'btd.ledger_database_reconciliation',
    reconciliationId,
    repairs,
    blocking: repairs.some((repair) => repair.blocking),
  };
}

function assertLedgerFact(fact: LedgerObservedFact): void {
  assertNonEmptyString(fact.factId, 'factId');
  assertNonEmptyString(fact.ledgerRoot, 'ledgerRoot');
}
