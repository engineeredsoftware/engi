import {
  acceptReadNeed,
  admitNeedFitSearch,
  buildAssetPackSourceSafePreview,
  buildShareToFeePreview,
  isAcceptedReadNeed,
  readNeedToDepositorySearchRead,
  resolveAssetPackReadRightState,
  synthesizeReadNeedForPipelineInput,
} from '../read-need';
import {
  buildDepositoryFitResultEvidence,
  runDepositorySearchForPipelineInput,
} from '../depository-search';

const input = {
  read: {
    id: 'read-1',
    prompt:
      'Find whether the deposited repository has a complete Terminal path through Deposit, Read/Fit, AssetPack evidence, proof readback, and ledger reconciliation.',
  },
  sourceRevision: {
    repositoryFullName: 'engineeredsoftware/ENGI',
    branch: 'main',
    commit: '31bbc0c5227b6b3aed5d107fd8507d35ec22970a',
  },
};

function depositoryAsset() {
  return {
    assetId: 'deposit-asset-1',
    title: 'Deposited repository revision engineeredsoftware/ENGI',
    artifactKind: 'repository-revision',
    repositoryFullName: 'engineeredsoftware/ENGI',
    sourceBranch: 'main',
    sourceCommit: '31bbc0c5227b6b3aed5d107fd8507d35ec22970a',
    contentRoot: 'sha256:content',
    contentUnits: [
      {
        unitId: 'deposit-asset-1:unit-1',
        unitKind: 'repository-revision',
        text:
          'Terminal path Deposit Read Fit AssetPack evidence proof root finality readback Supabase ledger reconciliation.',
      },
    ],
    verificationEvidence: {
      proofRoot: 'sha256:proof',
      measurementRoot: 'sha256:measurement',
      reconciliationReadbackRoot: 'sha256:reconciliation',
    },
    hasWalletOrAttestationProof: true,
    hasAssetMeasurementEvidence: true,
  };
}

describe('Read-Need synthesis and Need-Fit admission', () => {
  it('synthesizes a measured Need that remains pending until accepted', () => {
    const need = synthesizeReadNeedForPipelineInput(input);

    expect(need.schema).toBe('bitcode.read.need');
    expect(need.needId).toMatch(/^need-[a-f0-9]{16}$/);
    expect(need.reviewState).toBe('needs_acceptance');
    expect(need.measurementRoot).toMatch(/^sha256:/);
    expect(need.sourceConstraints).toMatchObject({
      repositoryFullName: 'engineeredsoftware/ENGI',
      sourceBranch: 'main',
      sourceCommit: '31bbc0c5227b6b3aed5d107fd8507d35ec22970a',
      protectedSourceDisclosure: 'forbidden_before_settlement',
    });
    expect(need.pricingMeasurementInputs.measurementVector).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ dimension: 'semantic_relevance' }),
        expect.objectContaining({ dimension: 'source_binding' }),
      ])
    );
  });

  it('accepts a Need as the only admissible input to strict Need-Fit search', () => {
    const accepted = acceptReadNeed(synthesizeReadNeedForPipelineInput(input), '2026-05-18T00:00:00.000Z');

    expect(isAcceptedReadNeed(accepted)).toBe(true);
    expect(admitNeedFitSearch({ acceptedReadNeed: accepted, requireAcceptedReadNeed: true })).toMatchObject({
      admitted: true,
      acceptedNeed: accepted,
      blockers: [],
    });
    expect(readNeedToDepositorySearchRead(accepted)).toMatchObject({
      id: accepted.needId,
      prompt: accepted.read.prompt,
      sourceCommit: '31bbc0c5227b6b3aed5d107fd8507d35ec22970a',
    });
  });

  it('blocks strict Need-Fit search before Need acceptance', async () => {
    const result = await runDepositorySearchForPipelineInput({
      ...input,
      requireAcceptedReadNeed: true,
      depositoryAssets: [depositoryAsset()],
    });

    expect(result.resultState).toBe('blocked_readiness');
    expect(result.resultReasons).toEqual(
      expect.arrayContaining([
        'Need-Fit search requires an accepted Read-Need before depository candidate recall.',
        'accepted_read_need_missing',
      ])
    );
    expect(result.candidateRanking).toHaveLength(0);
  });

  it('uses the accepted Need measurement and source constraints for Fit search', async () => {
    const acceptedReadNeed = acceptReadNeed(
      synthesizeReadNeedForPipelineInput(input),
      '2026-05-18T00:00:00.000Z'
    );

    const result = await runDepositorySearchForPipelineInput({
      ...input,
      acceptedReadNeed,
      requireAcceptedReadNeed: true,
      depositoryAssets: [depositoryAsset()],
    });

    expect(result.resultState).toBe('worthy_fit');
    expect(result.read.id).toBe(acceptedReadNeed.needId);
    expect(result.read.sourceCommit).toBe(acceptedReadNeed.sourceConstraints.sourceCommit);
    expect(result.selectedCandidateAssetIds).toEqual(['deposit-asset-1']);
  });

  it('derives a source-safe Share-to-Fee preview from accepted Need measurements', () => {
    const acceptedReadNeed = acceptReadNeed(synthesizeReadNeedForPipelineInput(input));
    const preview = buildShareToFeePreview({
      need: acceptedReadNeed,
      admittedFitQuality: 0.75,
    });

    expect(preview).toMatchObject({
      formula: 'sum(measurement.weight * measurement.volume * admitted_fit_quality)',
      needId: acceptedReadNeed.needId,
      needMeasurementRoot: acceptedReadNeed.measurementRoot,
      finalityState: 'preview_not_paid',
      payer: 'reader',
    });
    expect(preview.feeSchedule).toMatchObject({
      satsPerWeightedVolume: 1000,
      minimumSats: 546,
      dustFloorSats: 546,
      networkFeePosture: 'reader_wallet_authorized_before_broadcast',
    });
    expect(preview.measurementVector).toBe(acceptedReadNeed.pricingMeasurementInputs.measurementVector);
    expect(preview.quoteRoot).toMatch(/^sha256:/);
    expect(preview.sats).toBeGreaterThanOrEqual(546);
  });

  it('builds a source-safe AssetPack preview without unlocking protected source', async () => {
    const acceptedReadNeed = acceptReadNeed(
      synthesizeReadNeedForPipelineInput(input),
      '2026-05-18T00:00:00.000Z'
    );
    const search = await runDepositorySearchForPipelineInput({
      ...input,
      acceptedReadNeed,
      requireAcceptedReadNeed: true,
      depositoryAssets: [depositoryAsset()],
    });
    const fitResult = buildDepositoryFitResultEvidence(search);
    const preview = buildAssetPackSourceSafePreview({
      need: acceptedReadNeed,
      fitResult,
      rangeStart: 42,
      pullRequestTarget: 'https://github.com/engineeredsoftware/ENGI/pull/6',
      createdAt: '2026-05-18T00:00:00.000Z',
    });

    expect(preview).toMatchObject({
      schema: 'bitcode.asset-pack.source-safe-preview',
      need: {
        needId: acceptedReadNeed.needId,
        measurementRoot: acceptedReadNeed.measurementRoot,
        reviewState: 'accepted',
      },
      fit: {
        resultState: 'worthy_fit',
        selectedCandidateAssetIds: ['deposit-asset-1'],
      },
      disclosurePolicy: {
        protectedSourceDisclosure: 'forbidden_before_settlement',
      },
      settlementBoundary: {
        payer: 'reader',
        payee: 'depositor',
        serverCustody: false,
        ownershipTruth: 'asset_pack_range_and_license_rows',
      },
      unlock: {
        state: 'pending_settlement',
        sourceAvailable: false,
      },
      delivery: {
        pullRequestTarget: 'https://github.com/engineeredsoftware/ENGI/pull/6',
        availableAfterSettlement: true,
      },
    });
    expect(preview.roots.previewRoot).toMatch(/^sha256:/);
    expect(preview.roots.sourceManifestRoot).toMatch(/^sha256:/);
    expect(preview.feeQuote.quoteRoot).toMatch(/^sha256:/);
    expect(preview.rangeProjection).toMatchObject({
      status: 'projected_not_minted',
      rangeStart: 42,
    });
    expect(preview.rangeProjection.rangeEndExclusive).toBe(
      preview.rangeProjection.rangeStart! + preview.rangeProjection.tokenCount
    );
    expect(preview.disclosurePolicy.withheldBeforeSettlement).toContain('protected source content');
  });

  it('keeps owner, licensed, pending-settlement, and denied read rights distinct', () => {
    expect(resolveAssetPackReadRightState({ hasOwnerClaim: true })).toBe('owner_read');
    expect(resolveAssetPackReadRightState({
      hasReadLicense: true,
      settlementReadbackComplete: true,
    })).toBe('licensed_read');
    expect(resolveAssetPackReadRightState({ settlementPending: true })).toBe('pending_settlement');
    expect(resolveAssetPackReadRightState({ policyDenied: true })).toBe('denied');
  });
});
