import {
  assertDepositRouteSessionSourceSafe,
  buildDepositRouteSession,
  readDepositRouteStage,
  writeDepositRouteStage,
} from '@/app/deposit/deposit-route-model';

describe('deposit-route-model', () => {
  it('builds a source-safe five-step DepositRouteSession with option synthesis ownership', () => {
    const session = buildDepositRouteSession({
      transactionId: 'deposit-run-1',
      depositStage: 'review-options',
      repositoryFullName: 'engineeredsoftware/ENGI',
      sourceBranch: 'main',
      sourceCommit: '31bbc0c5227b6b3aed5d107fd8507d35ec22970a',
      depositorInstructions: 'Create bounded source-safe AssetPack options for review.',
      sourcePathHints: ['uapi/app/deposit/DepositPageClient.tsx'],
      sourceCriticalitySignals: [
        {
          id: 'sub-critical-route-test',
          label: 'Route test source is sub-critical.',
          severity: 'sub-critical',
          weight: 0.75,
        },
      ],
      depositorWalletId: 'wallet-depositor-1',
      optionsRequested: true,
    });

    expect(session.schema).toBe('bitcode.deposit.route-session');
    expect(session.route).toBe('/deposit');
    expect(session.stageCount).toBe(5);
    expect(session.steps.map((step) => step.id)).toEqual([
      'connect-source',
      'synthesize-options',
      'review-options',
      'submit-deposit',
      'read-depository-state',
    ]);
    expect(session.activeStepId).toBe('review-options');
    expect(session.pipelineOwnership).toMatchObject({
      depositOptionPipeline: 'DepositAssetPackOptionSynthesis',
      depositOptionPolicy: 'DepositAssetPackOptionPolicy',
      reviewRequiredBeforeDepositAdmission: true,
      sourceCriticalityDemandRoiPolicyOwnedByGate6: true,
      sourceCriticalityDemandRoiPolicyDeferredToGate6: true,
      admissionAndIndexingDeferredToGate7: true,
      retainedTerminalDebugCompatible: true,
    });
    expect(session.synthesis.schema).toBe('bitcode.deposit.asset-pack-option-synthesis');
    expect(session.synthesis.optionCount).toBe(3);
    expect(session.policy.schema).toBe('bitcode.deposit.asset-pack-option-policy-report');
    expect(session.policy.reviewablePositiveRoiCount).toBeGreaterThan(0);
    expect(session.policy.aggregatePolicy.compensationPolicy).toBe('future-reader-btc-source-to-shares-route-preview');
    expect(session.synthesis.options[0].reviewBoundary.state).toBe('reviewable-source-safe-option');
    expect(session.disclosure).toMatchObject({
      sourceSafetyClass: 'source_safe_deposit_option_route_metadata',
      protectedSourceVisible: false,
      rawSourceTextVisible: false,
      unpaidAssetPackSourceVisible: false,
      rawPromptVisible: false,
      interpolatedPromptVisible: false,
      rawProviderResponseVisible: false,
      walletPrivateMaterialVisible: false,
    });
    expect(session.proofRoot).toMatch(/^deposit-route-session:/u);
    expect(assertDepositRouteSessionSourceSafe(session)).toEqual({
      admitted: true,
      reason: 'source_safe_deposit_option_route_metadata',
    });
  });

  it('keeps deposit submission blocked until option review is present', () => {
    const session = buildDepositRouteSession({
      depositStage: 'submit-deposit',
      repositoryFullName: 'engineeredsoftware/ENGI',
      sourceBranch: 'main',
      sourceCommit: '31bbc0c5227b6b3aed5d107fd8507d35ec22970a',
      sourcePathHints: ['packages/pipelines/asset-pack/src/deposit-asset-pack-options.ts'],
      sourceCriticalitySignals: [{ id: 'warning', severity: 'warning', weight: 0.5 }],
      optionsRequested: true,
      hasReviewedOption: false,
    });

    expect(session.activeStepId).toBe('submit-deposit');
    expect(session.steps.find((step) => step.id === 'submit-deposit')?.blockers).toContain(
      'depositor option review required',
    );
    expect(session.steps.find((step) => step.id === 'read-depository-state')?.blockers).toContain(
      'submitted deposit required',
    );
    expect(assertDepositRouteSessionSourceSafe(session).admitted).toBe(true);
  });

  it('keeps critical or negative-value policy blocked before Gate 7 admission', () => {
    const session = buildDepositRouteSession({
      repositoryFullName: 'engineeredsoftware/ENGI',
      sourceBranch: 'main',
      sourceCommit: '31bbc0c5227b6b3aed5d107fd8507d35ec22970a',
      sourcePathHints: ['packages/pipelines/asset-pack/src/deposit-asset-pack-option-policy.ts'],
      sourceCriticalitySignals: [{ id: 'critical', severity: 'critical', weight: 1 }],
      developmentCostSats: 9000,
      expectedSettlementSats: 1000,
      optionsRequested: true,
    });

    expect(session.policy.blockedCount).toBe(3);
    expect(session.policy.evaluations.every((evaluation) => evaluation.policyDecision === 'blocked-before-admission')).toBe(true);
    expect(session.pipelineOwnership.admissionAndIndexingDeferredToGate7).toBe(true);
    expect(assertDepositRouteSessionSourceSafe(session).admitted).toBe(true);
  });

  it('reads and writes the route-owned depositStage query parameter', () => {
    const params = new URLSearchParams('transactionId=deposit-run-2');
    const withStage = writeDepositRouteStage(params, 'submit-deposit');

    expect(withStage.get('depositStage')).toBe('submit-deposit');
    expect(readDepositRouteStage(withStage)).toBe('submit-deposit');
    expect(readDepositRouteStage(new URLSearchParams('depositStage=unsafe-stage'))).toBeNull();
    expect(writeDepositRouteStage(withStage, null).has('depositStage')).toBe(false);
  });
});
