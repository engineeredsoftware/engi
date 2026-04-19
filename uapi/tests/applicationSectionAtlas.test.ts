import { normalizeApplicationSectionAtlas } from '@/app/application/application-section-atlas';

describe('normalizeApplicationSectionAtlas', () => {
  it('builds section previews from semantic core and closure surfaces', () => {
    const atlas = normalizeApplicationSectionAtlas({
      coreSurface: {
        operatingPicture: {
          label: 'Operating picture',
          cards: [
            {
              title: 'Repo supply',
              help: 'The canonical shell starts from repo supply.',
              metrics: [{ label: 'Authenticated repos', value: '7' }],
            },
          ],
        },
        depositing: {
          label: 'Depositing',
          badge: 'Targeted deposit',
          cards: [
            {
              title: 'Depositing surface',
              subtitle: 'The active repo-authenticated deposit.',
            },
          ],
        },
        needing: {
          label: 'Needing + measured demand',
          cards: [
            {
              title: 'Needing surface',
              subtitle: 'The active measured demand surface.',
            },
          ],
        },
        fit: {
          label: 'Depositing-to-needing fit',
          cards: [
            {
              title: 'Depositing-to-needing surface',
              subtitle: 'Why this deposit fits this need before deeper closure inspection.',
            },
          ],
        },
      },
      closureSurface: {
        verification: {
          label: 'Verification + ranked candidates',
          summary: 'Verification remains the gate between fit and downstream branch or settlement rights.',
          candidateCount: 5,
          selectedAssetCount: 2,
          branchEligibleCount: 2,
          settlementEligibleCount: 1,
          verificationState: 'allowed-with-policy',
          topCandidates: [
            { title: 'rollback runbook', artifactKind: 'runbook', score: 97, branchEligible: true },
          ],
        },
        branch: {
          label: 'Branch artifacts',
          visibleArtifactCount: 7,
          proofFamilyCount: 4,
          replayArtifactCount: 9,
          projectionPrincipal: 'buyer',
          visibleArtifacts: ['BITCODE_NEED.md'],
          summary: 'Branch artifacts are the materialized closure bundle behind the active Bitcode projection.',
        },
        settlement: {
          label: 'Settlement + proof',
          creditedAssetCount: 2,
          participatingAssetCount: 3,
          debitCount: 2,
          creditCount: 4,
          proofFamilyCount: 4,
          bundleId: 'bundle-001',
          settlementIntentSummary: 'Settlement closes the active fit with replayable source-to-shares and proof-bearing accounting.',
          proofFamilies: [{ proofFamily: 'selection-materialization', allTheoremsPassed: true, replayArtifactCount: 6 }],
        },
        ledger: {
          label: 'Ledger + run history',
          accountCount: 2,
          historyCount: 1,
          accounts: [{ label: 'buyer pools', value: '120 BTD' }],
          recentRuns: [{ runId: 'run-001', status: 'completed', repo: 'bitcode/bitcode', bundleId: 'bundle-001' }],
        },
      },
    });

    expect(atlas).toHaveLength(8);
    expect(atlas[0]?.label).toBe('Operating picture');
    expect(atlas[0]?.subheads).toContain('Repo supply');
    expect(atlas[1]?.badge).toBe('Targeted deposit');
    expect(atlas[4]?.label).toBe('Verification + ranked candidates');
    expect(atlas[4]?.subheads).toContain('Candidates');
    expect(atlas[6]?.badge).toBe('selection-materialization');
  });

  it('falls back safely when section state is missing', () => {
    const atlas = normalizeApplicationSectionAtlas(null);

    expect(atlas).toHaveLength(8);
    expect(atlas[0]?.preview).toBe('Waiting for this transaction stage to populate.');
  });
});
