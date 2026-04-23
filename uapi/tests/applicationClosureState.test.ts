import { normalizeApplicationClosureState } from '@/app/application/application-closure-state';

describe('normalizeApplicationClosureState', () => {
  it('builds native closure panels from the shell closure snapshot', () => {
    const closure = normalizeApplicationClosureState({
      canonLabel: 'production workspace posture',
      closureSurface: {
        needReview: {
          label: 'Need review before fit search',
          needId: 'need-auth-rollback',
          protocolFocus: 'source-to-shares',
          reviewStage: 'post-measurement-pre-fit',
          reviewAction: 'accept',
          reviewStatus: 'accepted',
          reviewer: 'bitcode-system:need-review',
          decisionMode: 'deterministic-fifth-gate-local-review',
          fitSearchAdmitted: true,
          admissionReason: 'Measured Need accepted for source-to-shares fit search.',
          allowedActions: ['accept', 'reject', 'remeasure-with-feedback'],
          measuredTask: 'Recover an auth rollback.',
          measurementHash: 'sha256:measurement',
          reviewableNeedRef: 'sha256:reviewable',
        },
        verification: {
          label: 'Verification + ranked candidates',
          candidateCount: 5,
          selectedAssetCount: 2,
          branchEligibleCount: 2,
          settlementEligibleCount: 1,
          verificationState: 'allowed-with-policy',
          summary: 'Verification separates fit from downstream branch and settlement rights.',
          topCandidates: [
            {
              title: 'rollback runbook',
              artifactKind: 'runbook',
              score: 98,
              useTier: 'selected',
              strongestSignals: ['auth rollback', 'payments'],
              branchEligible: true,
              settlementEligible: true,
            },
          ],
        },
        branch: {
          label: 'Branch artifacts',
          branchName: 'bitcode/auth-rollback',
          branchMode: 'patch',
          needLifecycle: 'ready',
          confidentiality: 'bounded-public',
          projectionPrincipal: 'buyer',
          visibleArtifactCount: 7,
          visibleArtifacts: ['BITCODE_NEED.md', '.bitcode/settlement-preview.json'],
          proofFamilyCount: 4,
          replayArtifactCount: 9,
          summary: 'Materialized closure bundle for the active projection.',
        },
        settlement: {
          label: 'Settlement + proof',
          bundleId: 'bundle-001',
          creditedAssetCount: 2,
          participatingAssetCount: 3,
          debitCount: 2,
          creditCount: 4,
          proofFamilyCount: 4,
          settlementIntentSummary: 'Settlement closes the fit with replayable accounting.',
          protocolFocus: 'source-to-shares',
          reviewStage: 'present-fit-for-settlement-review',
          quantizedObjectiveContractId: 'bitcode.source-to-shares.quantized-fit-quality-oc.v26',
          sourceToSharesRef: 'sha256:source-to-shares',
          fitQualityHash: 'sha256:fit-quality',
          receiptRefs: ['receipt-issuance', 'receipt-allocation', 'receipt-fit-quality'],
          fitQualities: [
            {
              label: 'Weighted source-to-shares bundle fit',
              qualityId: 'bundle-share-score',
              value: '0.328991',
              weightBp: 10000,
              evidenceClass: 'source-to-shares-weighted-objective',
            },
          ],
          proofFamilies: [
            {
              proofFamily: 'selection-materialization',
              proofArtifactPath: '.bitcode/selection-and-materialization-proof.json',
              allTheoremsPassed: true,
              replayArtifactCount: 3,
            },
          ],
        },
        ledger: {
          label: 'Ledger + run history',
          accountCount: 2,
          historyCount: 1,
          accounts: [
            { label: 'buyer pools', value: '120 BTD' },
            { label: 'supplier pending claims', value: '80 BTD' },
          ],
          recentRuns: [
            {
              runId: 'run-001',
              repo: 'bitcode/bitcode',
              branchName: 'bitcode/auth-rollback',
              status: 'completed',
              creditedAssetCount: 2,
            },
          ],
        },
      },
    });

    expect(closure?.verification.metrics.find((entry) => entry.label === 'Candidates')?.value).toBe('5');
    expect(closure?.needReview.metrics.find((entry) => entry.label === 'Fit search admitted')?.value).toBe('yes');
    expect(closure?.needReview.rows.find((entry) => entry.label === 'Allowed actions')?.value).toContain(
      'remeasure-with-feedback',
    );
    expect(closure?.verification.candidates?.[0]?.rights).toContain('branch');
    expect(closure?.branch.rows.find((entry) => entry.label === 'Branch mode')?.value).toBe('patch');
    expect(closure?.settlement.rows.find((entry) => entry.label === 'Bundle')?.value).toBe('bundle-001');
    expect(closure?.settlement.metrics.find((entry) => entry.label === 'Fit qualities')?.value).toBe('1');
    expect(closure?.settlement.rows.find((entry) => entry.label === 'Objective contract')?.value).toBe(
      'bitcode.source-to-shares.quantized-fit-quality-oc.v26',
    );
    expect(closure?.settlement.fitQualities?.[0]?.detail).toContain('source-to-shares-weighted-objective');
    expect(closure?.settlement.proofFamilies?.[0]?.theoremStatus).toBe('passed');
    expect(closure?.ledger.recentRuns?.[0]?.summary).toContain('bitcode/bitcode');
  });

  it('fails safely when closure data is missing', () => {
    const closure = normalizeApplicationClosureState({
      canonLabel: 'production workspace posture',
    });

    expect(closure).toBeNull();
  });
});
