import {
  buildRuntimeObserverRepairJobRows,
  buildRuntimeObserverRepairJobSet,
  type RuntimeObserverRepairJobInput,
} from '../src/runtime-observer-repair-job';

describe('RuntimeObserverRepairJob', () => {
  it('builds the complete runtime observer, broadcaster, and repair job set', () => {
    const set = buildRuntimeObserverRepairJobSet();

    expect(set.kind).toBe('bitcode.runtime_observer_repair_job_set');
    expect(set.schemaId).toBe('bitcode.runtimeObserverRepairJobSet.v1');
    expect(set.jobCount).toBe(7);
    expect(set.missingJobIds).toEqual([]);
    expect(set.settlementObserversCovered).toBe(true);
    expect(set.ledgerBroadcastersCovered).toBe(true);
    expect(set.finalityWatchersCovered).toBe(true);
    expect(set.databaseProjectionRepairCovered).toBe(true);
    expect(set.objectStorageRepairCovered).toBe(true);
    expect(set.generatedProofJobsCovered).toBe(true);
    expect(set.queueConsumersCovered).toBe(true);
    expect(set.runtimeReceiptsCovered).toBe(true);
    expect(set.laneContractsCovered).toBe(true);
    expect(set.replayCommandsCovered).toBe(true);
    expect(set.repairCommandsCovered).toBe(true);
    expect(set.unsafeDriftBlocksUnlock).toBe(true);
    expect(set.proofRootsCovered).toBe(true);
    expect(set.noSerializedSecretValues).toBe(true);
    expect(set.valueBearingMainnetBlocked).toBe(true);
    expect(set.sourceSafety.sourceSafe).toBe(true);
    expect(set.jobs.every((job) => /^v34-runtime-observer-repair-job:[a-f0-9]{24}$/.test(job.jobRoot))).toBe(true);
  });

  it('keeps every job bound to non-value lanes and replayable receipt roots', () => {
    const set = buildRuntimeObserverRepairJobSet();

    for (const job of set.jobs) {
      expect(job.supportedLaneIds).not.toContain('value-bearing-mainnet');
      expect(job.requiredHostIds.length).toBeGreaterThan(0);
      expect(job.receiptWorkKinds.length).toBeGreaterThan(0);
      expect(job.runtimeReceiptPolicy).toMatch(/receipt|root/i);
      expect(job.replayCommand).toContain('check:v34-runtime-observers-broadcasters-repair-jobs');
      expect(job.repairCommand).toMatch(/repair|replay|regenerate|rewrite|recompute|refresh/i);
      expect(job.proofRootBasis.length).toBeGreaterThan(0);
      expect(job.sourceSafety.containsSecret).toBe(false);
    }
  });

  it('fails closed when a required job is missing', () => {
    const jobs = buildRuntimeObserverRepairJobRows().filter(
      (job) => job.jobId !== 'queue_consumer',
    );

    expect(() => buildRuntimeObserverRepairJobSet({ jobs })).toThrow(
      /missing required jobs: queue_consumer/,
    );
  });

  it('fails closed when a required job id is duplicated', () => {
    const rows = buildRuntimeObserverRepairJobRows();
    const duplicate = { ...rows[0] };

    expect(() => buildRuntimeObserverRepairJobSet({ jobs: [...rows, duplicate] })).toThrow(
      /duplicate job ids: settlement_observer/,
    );
  });

  it('fails closed when value-bearing mainnet is admitted', () => {
    const jobs = buildRuntimeObserverRepairJobRows();
    const mutated: RuntimeObserverRepairJobInput = {
      ...jobs[0],
      supportedLaneIds: [...jobs[0].supportedLaneIds, 'value-bearing-mainnet'],
    };

    expect(() => buildRuntimeObserverRepairJobSet({ jobs: [mutated, ...jobs.slice(1)] })).toThrow(
      /must not admit value-bearing mainnet/,
    );
  });

  it('fails closed when replay commands are missing', () => {
    const jobs = buildRuntimeObserverRepairJobRows();
    const mutated: RuntimeObserverRepairJobInput = {
      ...jobs[1],
      replayCommand: '',
    };

    expect(() => buildRuntimeObserverRepairJobSet({ jobs: [jobs[0], mutated, ...jobs.slice(2)] })).toThrow(
      /replayCommand must be a non-empty string/,
    );
  });

  it('fails closed when repair commands are missing', () => {
    const jobs = buildRuntimeObserverRepairJobRows();
    const mutated: RuntimeObserverRepairJobInput = {
      ...jobs[2],
      repairCommand: '',
    };

    expect(() => buildRuntimeObserverRepairJobSet({ jobs: [...jobs.slice(0, 2), mutated, ...jobs.slice(3)] })).toThrow(
      /repairCommand must be a non-empty string/,
    );
  });

  it('fails closed when unsafe drift does not block a boundary', () => {
    const jobs = buildRuntimeObserverRepairJobRows();
    const mutated = {
      ...jobs[3],
      unsafeDriftPosture: 'observes_only',
    } as unknown as RuntimeObserverRepairJobInput;

    expect(() => buildRuntimeObserverRepairJobSet({ jobs: [...jobs.slice(0, 3), mutated, ...jobs.slice(4)] })).toThrow(
      /Unsupported runtime observer drift posture/,
    );
  });

  it('fails closed on serialized secret-shaped values', () => {
    const jobs = buildRuntimeObserverRepairJobRows();
    const mutated: RuntimeObserverRepairJobInput = {
      ...jobs[4],
      trigger: 'object repair saw sb_secret__not_allowed_here',
    };

    expect(() => buildRuntimeObserverRepairJobSet({ jobs: [...jobs.slice(0, 4), mutated, ...jobs.slice(5)] })).toThrow(
      /source-safe runtime observer repair metadata/,
    );
  });
});
