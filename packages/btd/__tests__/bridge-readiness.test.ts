import {
  BRIDGE_READINESS_RESEARCH_PATHS,
  assertNoBridgeChainOfRecordAdmission,
  bridgeReadinessPostureToPolicySummary,
  buildBridgeReadinessResearchPosture,
} from '../src';

const issuedAt = '2026-05-21T00:00:00.000Z';

describe('bridge readiness research boundaries', () => {
  it('records Taproot, BitVM, BSC/opBNB, Binance Web3 Wallet, and future paths as research-only', () => {
    const posture = buildBridgeReadinessResearchPosture({
      postureId: 'bridge-readiness-v30-gate7',
      issuedAt,
    });

    expect(posture.kind).toBe('btd.bridge_readiness_research_posture');
    expect(posture.records.map((record) => record.path)).toEqual(
      BRIDGE_READINESS_RESEARCH_PATHS,
    );
    expect(posture.allRequiredPathsCovered).toBe(true);
    expect(posture.allNonAdmitted).toBe(true);
    expect(posture.activeBtdChainOfRecord).toBe('bitcoin_btd_registry');
    expect(posture.bridgeChainOfRecordTruth).toBe('no_bridge_chain_of_record');
    expect(posture.records.every((record) => record.currentAdmissionState === 'research_only')).toBe(
      true,
    );
    expect(posture.records.every((record) => record.chainOfRecordAdmitted === false)).toBe(
      true,
    );
    expect(posture.admissionBlockers.length).toBeGreaterThanOrEqual(
      BRIDGE_READINESS_RESEARCH_PATHS.length,
    );
    expect(posture.proofRoot).toMatch(/^btd-proof-root:bridge-readiness-posture:/);
  });

  it('keeps policy summaries source-safe and non-authoritative', () => {
    const posture = buildBridgeReadinessResearchPosture({
      postureId: 'bridge-readiness-policy-summary',
      issuedAt,
    });
    const summary = bridgeReadinessPostureToPolicySummary(posture);

    expect(summary).toEqual({
      postureId: 'bridge-readiness-policy-summary',
      activeBtdChainOfRecord: 'bitcoin_btd_registry',
      bridgeChainOfRecordTruth: 'no_bridge_chain_of_record',
      pathCount: 5,
      allNonAdmitted: true,
      admissionBlockerCount: posture.admissionBlockers.length,
      proofRoot: posture.proofRoot,
    });
  });

  it('fails closed if a path attempts chain-of-record admission', () => {
    expect(() =>
      buildBridgeReadinessResearchPosture({
        postureId: 'bridge-readiness-illegal-admission',
        records: [
          {
            path: 'bsc_opbnb_distribution',
            chainOfRecordAdmitted: true,
          },
        ],
        issuedAt,
      }),
    ).toThrow(/cannot be current BTD chain-of-record truth/);
  });

  it('fails closed on duplicate paths and secret-looking research text', () => {
    expect(() =>
      buildBridgeReadinessResearchPosture({
        postureId: 'bridge-readiness-duplicate',
        records: [
          { path: 'bitvm_execution_bridge' },
          { path: 'bitvm_execution_bridge' },
        ],
        issuedAt,
      }),
    ).toThrow(/Duplicate bridge-readiness research path/);

    expect(() =>
      buildBridgeReadinessResearchPosture({
        postureId: 'bridge-readiness-secret',
        records: [
          {
            path: 'binance_web3_wallet_distribution',
            summary: 'provider key sb_secret__not-for-proof',
          },
        ],
        issuedAt,
      }),
    ).toThrow(/must not contain secret material/);
  });

  it('requires every record to keep non-admission proof posture', () => {
    const posture = buildBridgeReadinessResearchPosture({
      postureId: 'bridge-readiness-assertion',
      issuedAt,
    });
    const mutated = {
      ...posture,
      allNonAdmitted: false,
    };

    expect(() => assertNoBridgeChainOfRecordAdmission(mutated)).toThrow(
      /contains an admitted bridge path/,
    );
  });
});
