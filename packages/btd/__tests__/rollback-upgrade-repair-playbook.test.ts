import {
  buildRollbackUpgradeRepairPlaybookRows,
  buildRollbackUpgradeRepairPlaybookSet,
  type RollbackUpgradeRepairPlaybookInput,
} from '../src/rollback-upgrade-repair-playbook';

describe('RollbackUpgradeRepairPlaybook', () => {
  it('builds every rollback, upgrade, and repair playbook', () => {
    const set = buildRollbackUpgradeRepairPlaybookSet();

    expect(set.kind).toBe('bitcode.rollback_upgrade_repair_playbook_set');
    expect(set.schemaId).toBe('bitcode.rollbackUpgradeRepairPlaybookSet.v1');
    expect(set.playbookCount).toBe(8);
    expect(set.missingPlaybookIds).toEqual([]);
    expect(set.rollbackCovered).toBe(true);
    expect(set.upgradeCovered).toBe(true);
    expect(set.migrationRollbackCovered).toBe(true);
    expect(set.objectStorageRepairCovered).toBe(true);
    expect(set.databaseRepairCovered).toBe(true);
    expect(set.ledgerProjectionRepairCovered).toBe(true);
    expect(set.secretRotationIncidentResponseCovered).toBe(true);
    expect(set.generatedArtifactRepairCovered).toBe(true);
    expect(set.operatorApprovalsCovered).toBe(true);
    expect(set.commandsCovered).toBe(true);
    expect(set.verificationCovered).toBe(true);
    expect(set.proofRootsCovered).toBe(true);
    expect(set.failClosedResultsCovered).toBe(true);
    expect(set.noSerializedSecretValues).toBe(true);
    expect(set.valueBearingMainnetBlocked).toBe(true);
    expect(set.playbooks.every((playbook) => /^v34-rollback-upgrade-repair-playbook:[a-f0-9]{24}$/.test(playbook.playbookRoot))).toBe(true);
  });

  it('keeps every playbook source-safe, lane-bound, commandable, and proof-rooted', () => {
    const set = buildRollbackUpgradeRepairPlaybookSet();

    for (const playbook of set.playbooks) {
      expect(playbook.supportedLaneIds).not.toContain('value-bearing-mainnet');
      expect(playbook.requiredHostIds.length).toBeGreaterThan(0);
      expect(playbook.stateCarriers.length).toBeGreaterThan(0);
      expect(playbook.operatorApproval).toMatch(/approval/i);
      expect(playbook.commandSequence.length).toBeGreaterThan(0);
      expect(playbook.verificationCommands.length).toBeGreaterThan(0);
      expect(playbook.proofRootBasis.length).toBeGreaterThan(0);
      expect(playbook.failClosedResult).toMatch(/blocked|freeze|denied|stay blocked|remains blocked/i);
      expect(playbook.sourceSafety.containsSecret).toBe(false);
    }
  });

  it('fails closed when a required playbook is missing', () => {
    const playbooks = buildRollbackUpgradeRepairPlaybookRows().filter(
      (playbook) => playbook.playbookId !== 'generated_artifact_repair',
    );

    expect(() => buildRollbackUpgradeRepairPlaybookSet({ playbooks })).toThrow(
      /missing required playbooks: generated_artifact_repair/,
    );
  });

  it('fails closed when a playbook is duplicated', () => {
    const rows = buildRollbackUpgradeRepairPlaybookRows();

    expect(() => buildRollbackUpgradeRepairPlaybookSet({ playbooks: [...rows, rows[0]] })).toThrow(
      /duplicate playbook ids: deployment_rollback/,
    );
  });

  it('fails closed when value-bearing mainnet is admitted', () => {
    const rows = buildRollbackUpgradeRepairPlaybookRows();
    const mutated: RollbackUpgradeRepairPlaybookInput = {
      ...rows[0],
      supportedLaneIds: [...rows[0].supportedLaneIds, 'value-bearing-mainnet'],
    };

    expect(() => buildRollbackUpgradeRepairPlaybookSet({ playbooks: [mutated, ...rows.slice(1)] })).toThrow(
      /must not admit value-bearing mainnet/,
    );
  });

  it('fails closed when operator approval is missing', () => {
    const rows = buildRollbackUpgradeRepairPlaybookRows();
    const mutated: RollbackUpgradeRepairPlaybookInput = {
      ...rows[1],
      operatorApproval: 'operator note without maintainer signoff',
    };

    expect(() => buildRollbackUpgradeRepairPlaybookSet({ playbooks: [rows[0], mutated, ...rows.slice(2)] })).toThrow(
      /require operator approval/,
    );
  });

  it('fails closed when command sequence is missing', () => {
    const rows = buildRollbackUpgradeRepairPlaybookRows();
    const mutated: RollbackUpgradeRepairPlaybookInput = {
      ...rows[2],
      commandSequence: [],
    };

    expect(() => buildRollbackUpgradeRepairPlaybookSet({ playbooks: [...rows.slice(0, 2), mutated, ...rows.slice(3)] })).toThrow(
      /require command sequences/,
    );
  });

  it('fails closed when proof roots are missing', () => {
    const rows = buildRollbackUpgradeRepairPlaybookRows();
    const mutated: RollbackUpgradeRepairPlaybookInput = {
      ...rows[3],
      proofRootBasis: [],
    };

    expect(() => buildRollbackUpgradeRepairPlaybookSet({ playbooks: [...rows.slice(0, 3), mutated, ...rows.slice(4)] })).toThrow(
      /require proof roots/,
    );
  });

  it('fails closed on serialized secret-shaped values', () => {
    const rows = buildRollbackUpgradeRepairPlaybookRows();
    const mutated: RollbackUpgradeRepairPlaybookInput = {
      ...rows[4],
      entryCondition: 'database repair saw sb_secret__not_allowed_here',
    };

    expect(() => buildRollbackUpgradeRepairPlaybookSet({ playbooks: [...rows.slice(0, 4), mutated, ...rows.slice(5)] })).toThrow(
      /source-safe rollback upgrade repair metadata/,
    );
  });
});
