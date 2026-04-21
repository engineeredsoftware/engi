import { normalizeApplicationClosureState } from '@/app/application/application-closure-state';

describe('normalizeApplicationClosureState', () => {
  it('builds native closure panels from the shell closure snapshot', () => {
    const closure = normalizeApplicationClosureState({
      canonLabel: 'production workspace posture',
      closureSurface: {
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
    expect(closure?.verification.candidates?.[0]?.rights).toContain('branch');
    expect(closure?.branch.rows.find((entry) => entry.label === 'Branch mode')?.value).toBe('patch');
    expect(closure?.settlement.rows.find((entry) => entry.label === 'Bundle')?.value).toBe('bundle-001');
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
