import {
  MIGRATION_APPROVAL_GATE_IDS,
  MIGRATION_APPROVAL_GATE_REQUIRED_FIELDS,
  buildMigrationApprovalGate,
  buildMigrationApprovalGateRows,
  buildMigrationApprovalGateSet,
} from '../src/migration-approval-gate';

describe('migration approval gate', () => {
  it('catalogs required schema, type, route, build, artifact, lane, and promotion approvals', () => {
    const gateSet = buildMigrationApprovalGateSet();

    expect(gateSet.kind).toBe('bitcode.migration_approval_gate_set');
    expect(gateSet.schemaId).toBe('bitcode.migrationApprovalGateSet.v1');
    expect(gateSet.gateCount).toBe(8);
    expect(gateSet.missingGateIds).toEqual([]);
    expect(gateSet.requiredGateIds).toEqual([...MIGRATION_APPROVAL_GATE_IDS].sort());
    expect(gateSet.observedGateIds).toEqual([...MIGRATION_APPROVAL_GATE_IDS]);
    expect(gateSet.gateSetRoot).toMatch(/^migration-approval-gate-set:[a-f0-9]{24}$/);
    expect(gateSet.sourceSafety.sourceSafe).toBe(true);
    expect(gateSet.sourceSafety.containsSecret).toBe(false);
    expect(gateSet.sourceSafety.protectedSourceVisible).toBe(false);
  });

  it('requires owner, host, lane, root, dry-run, validation, approval, rollback, workflow, audit, and proof fields', () => {
    const gateSet = buildMigrationApprovalGateSet();

    for (const gate of gateSet.gates) {
      for (const field of MIGRATION_APPROVAL_GATE_REQUIRED_FIELDS) {
        expect(gate[field]).toBeTruthy();
      }
      expect(gate.requiredHostIds.length).toBeGreaterThan(0);
      expect(gate.supportedLaneIds.length).toBeGreaterThan(0);
      expect(gate.supportedLaneIds).not.toContain('value-bearing-mainnet');
      expect(gate.dryRunCommand.toLowerCase()).toContain('dry-run');
      expect(gate.reviewerApprovalEvidence.toLowerCase()).toContain('approval');
      expect(gate.rollbackPlan.toLowerCase()).toContain('rollback');
      expect(gate.auditEventName).toMatch(/^migration_cicd_approval\./);
      expect(gate.proofRootBasis.length).toBeGreaterThan(0);
      expect(gate.gateRoot).toMatch(/^migration-approval-gate:[a-f0-9]{24}$/);
      expect(gate.sourceSafety.containsSecret).toBe(false);
    }
  });

  it('proves all closure booleans without admitting value-bearing mainnet', () => {
    const gateSet = buildMigrationApprovalGateSet();

    expect(gateSet.schemaMigrationApprovalCovered).toBe(true);
    expect(gateSet.generatedTypeRefreshCovered).toBe(true);
    expect(gateSet.routeScansCovered).toBe(true);
    expect(gateSet.buildTestGatesCovered).toBe(true);
    expect(gateSet.generatedArtifactFreshnessCovered).toBe(true);
    expect(gateSet.vercelLaneChecksCovered).toBe(true);
    expect(gateSet.supabaseLaneChecksCovered).toBe(true);
    expect(gateSet.promotionCommitsCovered).toBe(true);
    expect(gateSet.reviewerApprovalCovered).toBe(true);
    expect(gateSet.rollbackPlansCovered).toBe(true);
    expect(gateSet.dryRunsCovered).toBe(true);
    expect(gateSet.proofRootsCovered).toBe(true);
    expect(gateSet.noSerializedSecretValues).toBe(true);
    expect(gateSet.valueBearingMainnetBlocked).toBe(true);
  });

  it('fails closed when a required approval gate is missing', () => {
    const gates = buildMigrationApprovalGateRows().filter(
      (gate) => gate.gateId !== 'schema_migration_approval',
    );

    expect(() => buildMigrationApprovalGateSet({ gates })).toThrow(
      /missing gate ids: schema_migration_approval/,
    );
  });

  it('fails closed on duplicate approval gate ids', () => {
    const gates = buildMigrationApprovalGateRows();

    expect(() => buildMigrationApprovalGateSet({ gates: [...gates, gates[0]] })).toThrow(
      /duplicate gate ids: schema_migration_approval/,
    );
  });

  it('fails closed when a gate admits value-bearing mainnet before future canon', () => {
    const [gate] = buildMigrationApprovalGateRows();

    expect(() =>
      buildMigrationApprovalGate({
        ...gate,
        supportedLaneIds: [...gate.supportedLaneIds, 'value-bearing-mainnet'],
      }),
    ).toThrow(/must not admit value-bearing-mainnet/);
  });

  it('fails closed when reviewer approval evidence is missing', () => {
    const gates = buildMigrationApprovalGateRows().map((gate) =>
      gate.gateId === 'route_scan_approval'
        ? {
            ...gate,
            reviewerApprovalEvidence: 'route scan was checked without review evidence',
          }
        : gate,
    );

    expect(() => buildMigrationApprovalGateSet({ gates })).toThrow(/reviewer approval/);
  });

  it('fails closed when rollback plan is missing', () => {
    const gates = buildMigrationApprovalGateRows().map((gate) =>
      gate.gateId === 'supabase_lane_check'
        ? {
            ...gate,
            rollbackPlan: 'manual repair plan only',
          }
        : gate,
    );

    expect(() => buildMigrationApprovalGateSet({ gates })).toThrow(/rollback plan/);
  });

  it('fails closed on serialized secret-shaped values', () => {
    const [gate] = buildMigrationApprovalGateRows();
    const secretShapedText = `${['sk', 'proj'].join('-')}-${'abcdefghijklmnop1234567890'}`;

    expect(() =>
      buildMigrationApprovalGate({
        ...gate,
        dryRunCommand: secretShapedText,
      }),
    ).toThrow(/must not contain serialized secret values/);
  });
});
