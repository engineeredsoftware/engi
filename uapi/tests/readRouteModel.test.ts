import {
  assertReadRouteSessionSourceSafe,
  buildReadRouteSession,
  readReadRouteStage,
  writeReadRouteStage,
} from '@/app/read/read-route-model';

describe('read-route-model', () => {
  it('builds a source-safe five-step ReadRouteSession', () => {
    const session = buildReadRouteSession({
      transactionId: 'read-run-1',
      repositoryFullName: 'engineeredsoftware/ENGI',
      sourceBranch: 'main',
      sourceCommit: '31bbc0c5227b6b3aed5d107fd8507d35ec22970a',
      hasRepositorySource: true,
      hasReadMeasurement: true,
      hasSynthesizedNeed: true,
      hasAcceptedNeed: true,
      hasSourceSafePreview: true,
    });

    expect(session.schema).toBe('bitcode.read.route-session');
    expect(session.route).toBe('/read');
    expect(session.stageCount).toBe(5);
    expect(session.steps.map((step) => step.id)).toEqual([
      'request-read',
      'review-synthesized-need',
      'request-fit',
      'review-synthesized-asset-pack',
      'buy-asset-pack-settle',
    ]);
    expect(session.pipelineOwnership.readNeedPipeline).toBe('ReadNeedComprehensionSynthesis');
    expect(session.pipelineOwnership.findingFitsPipeline).toBe('ReadFitsFindingSynthesis');
    expect(session.pipelineOwnership.acceptedNeedRequiredBeforeFindingFits).toBe(true);
    expect(session.pipelineOwnership.previewSourceSafeBeforeSettlement).toBe(true);
    expect(session.pipelineOwnership.deliveryRequiresPaidReadRights).toBe(true);
    expect(session.disclosure.protectedSourceVisible).toBe(false);
    expect(session.disclosure.unpaidAssetPackSourceVisible).toBe(false);
    expect(session.disclosure.rawPromptVisible).toBe(false);
    expect(session.disclosure.interpolatedPromptVisible).toBe(false);
    expect(session.disclosure.rawProviderResponseVisible).toBe(false);
    expect(session.proofRoot).toMatch(/^read-route-session:/u);
    expect(assertReadRouteSessionSourceSafe(session)).toEqual({
      admitted: true,
      reason: 'source_safe_read_route_metadata',
    });
  });

  it('keeps Finding Fits blocked until a synthesized Need is accepted', () => {
    const session = buildReadRouteSession({
      routeReadingStage: 'request-fit',
      repositoryFullName: 'engineeredsoftware/ENGI',
      hasRepositorySource: true,
      hasReadMeasurement: true,
      hasSynthesizedNeed: true,
      hasAcceptedNeed: false,
    });

    expect(session.activeStepId).toBe('request-fit');
    expect(session.readObjects.acceptedNeedPresent).toBe(false);
    expect(session.steps.find((step) => step.id === 'request-fit')?.blockers).toContain('accepted Need required');
    expect(session.steps.find((step) => step.id === 'review-synthesized-asset-pack')?.blockers).toContain(
      'accepted Need required',
    );
    expect(assertReadRouteSessionSourceSafe(session).admitted).toBe(true);
  });

  it('reads and writes the route-owned readingStage query parameter', () => {
    const params = new URLSearchParams('transactionId=read-run-2');
    const withStage = writeReadRouteStage(params, 'review-synthesized-asset-pack');

    expect(withStage.get('readingStage')).toBe('review-synthesized-asset-pack');
    expect(readReadRouteStage(withStage)).toBe('review-synthesized-asset-pack');
    expect(readReadRouteStage(new URLSearchParams('readingStage=unsafe-stage'))).toBeNull();
    expect(writeReadRouteStage(withStage, null).has('readingStage')).toBe(false);
  });
});
