import { normalizeTerminalSectionAtlas } from '@/app/terminal/terminal-section-atlas';

describe('normalizeTerminalSectionAtlas', () => {
  it('builds section previews from semantic core and closure surfaces', () => {
    const atlas = normalizeTerminalSectionAtlas({
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
        reading: {
          label: 'Reading + measured demand',
          cards: [
            {
              title: 'Reading surface',
              subtitle: 'The active measured demand surface.',
            },
          ],
        },
        fit: {
          label: 'Depositing-to-reading fit',
          cards: [
            {
              title: 'Depositing-to-reading surface',
              subtitle: 'Why this deposit fits this read before deeper closure inspection.',
            },
          ],
        },
      },
      closureSurface: {
        readReview: {
          label: 'Read review before Finding Fits',
          reviewAction: 'accept',
          reviewStatus: 'accepted',
          protocolFocus: 'source-to-shares',
          fitSearchAdmitted: true,
          allowedActions: ['accept', 'reject', 'remeasure-with-feedback'],
          admissionReason: 'Measured Read accepted for source-to-shares Finding Fits.',
        },
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
          visibleArtifacts: ['BITCODE_READ.md'],
          summary: 'Branch artifacts are the materialized closure bundle behind the active Bitcode projection.',
        },
        settlement: {
          label: 'Settlement + proof',
          creditedAssetCount: 2,
          participatingAssetCount: 3,
          debitCount: 2,
          settlementEntryCount: 4,
          proofFamilyCount: 4,
          bundleId: 'bundle-001',
          settlementIntentSummary: 'Settlement closes the active fit with replayable source-to-shares and proof-bearing accounting.',
          fitQualities: [{ label: 'Weighted source-to-shares bundle fit', qualityId: 'bundle-share-score', value: '0.32' }],
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
    expect(atlas[2]?.label).toBe('Read review before Finding Fits');
    expect(atlas[2]?.subheads).toContain('Finding Fits admitted');
    expect(atlas[4]?.label).toBe('Verification + ranked candidates');
    expect(atlas[4]?.subheads).toContain('Candidates');
    expect(atlas[6]?.badge).toBe('selection-materialization');
  });

  it('falls back safely when section state is missing', () => {
    const atlas = normalizeTerminalSectionAtlas(null);

    expect(atlas).toHaveLength(8);
    expect(atlas[0]?.preview).toBe('Waiting for this transaction stage to populate.');
  });
});
