import {
  TERMINAL_ENTERPRISE_READING_FORBIDDEN_FIELDS,
  TERMINAL_ENTERPRISE_READING_STEPS,
  assertTerminalEnterpriseReadingUxStateSourceSafe,
  buildTerminalEnterpriseReadingUxState,
  inferTerminalEnterpriseReadingActiveStep,
} from '@/app/terminal/terminal-enterprise-reading-ux-state';

describe('terminal-enterprise-reading-ux-state', () => {
  it('locks the enterprise Reading UX to five source-safe stages', () => {
    expect(TERMINAL_ENTERPRISE_READING_STEPS.map((step) => step.id)).toEqual([
      'request-read',
      'review-synthesized-need',
      'request-fit',
      'review-synthesized-asset-pack',
      'buy-asset-pack-settle',
    ]);
    expect(TERMINAL_ENTERPRISE_READING_STEPS).toHaveLength(5);
    expect(
      TERMINAL_ENTERPRISE_READING_STEPS.every((step) =>
        TERMINAL_ENTERPRISE_READING_FORBIDDEN_FIELDS.every((field) => step.forbiddenFields.includes(field)),
      ),
    ).toBe(true);
  });

  it('infers the active stage from enterprise Reading progress', () => {
    expect(inferTerminalEnterpriseReadingActiveStep({ hasRepositorySource: true })).toBe('request-read');
    expect(
      inferTerminalEnterpriseReadingActiveStep({
        hasRepositorySource: true,
        hasReadMeasurement: true,
        hasSynthesizedNeed: true,
      }),
    ).toBe('review-synthesized-need');
    expect(
      inferTerminalEnterpriseReadingActiveStep({
        hasRepositorySource: true,
        hasReadMeasurement: true,
        hasSynthesizedNeed: true,
        hasAcceptedNeed: true,
      }),
    ).toBe('request-fit');
    expect(
      inferTerminalEnterpriseReadingActiveStep({
        hasRepositorySource: true,
        hasReadMeasurement: true,
        hasSynthesizedNeed: true,
        hasAcceptedNeed: true,
        hasSourceSafePreview: true,
      }),
    ).toBe('review-synthesized-asset-pack');
    expect(
      inferTerminalEnterpriseReadingActiveStep({
        hasRepositorySource: true,
        hasReadMeasurement: true,
        hasSynthesizedNeed: true,
        hasAcceptedNeed: true,
        hasSourceSafePreview: true,
        hasSettlementReadback: true,
      }),
    ).toBe('buy-asset-pack-settle');
  });

  it('blocks unsafe or premature stages without exposing protected payload classes', () => {
    const state = buildTerminalEnterpriseReadingUxState({
      hasRepositorySource: false,
      hasReadMeasurement: true,
      hasSynthesizedNeed: true,
      hasAcceptedNeed: false,
      hasSourceSafePreview: true,
      disclosureLeakageDetected: true,
    });

    expect(state.stageCount).toBe(5);
    expect(state.disclosure.lowDetailDefault).toBe(true);
    expect(state.disclosure.expandableSourceSafeDetail).toBe(true);
    expect(state.disclosure.protectedSourceVisible).toBe(false);
    expect(state.disclosure.unpaidAssetPackSourceVisible).toBe(false);
    expect(state.disclosure.hiddenBeforeSettlement).toEqual(TERMINAL_ENTERPRISE_READING_FORBIDDEN_FIELDS);
    expect(state.steps.find((step) => step.id === 'request-read')?.blockers).toContain(
      'repository source required',
    );
    expect(state.steps.find((step) => step.id === 'request-fit')?.blockers).toContain(
      'accepted Need required',
    );
    expect(state.steps.find((step) => step.id === 'review-synthesized-asset-pack')?.blockers).toContain(
      'source-safety disclosure review blocked',
    );
  });

  it('admits only source-safe low-detail and expandable metadata before settlement', () => {
    const state = buildTerminalEnterpriseReadingUxState({
      transactionId: 'reading-transaction-1',
      hasRepositorySource: true,
      hasReadMeasurement: true,
      hasSynthesizedNeed: true,
      hasAcceptedNeed: true,
      findingFitsRunning: true,
    });

    expect(state.activeStepId).toBe('request-fit');
    expect(state.routeState.transactionId).toBe('reading-transaction-1');
    expect(state.routeState.transactionIdPresent).toBe(true);
    expect(state.routeState.readingStageQueryParam).toBe('readingStage');
    expect(state.routeContract.acceptedNeedRequiredBeforeFindingFits).toBe(true);
    expect(state.routeContract.sourceSafePreviewRequiredBeforeSettlement).toBe(true);
    expect(state.routeContract.deliveryRequiresSettlementUnlock).toBe(true);
    expect(state.routeContract.restartRestoresReadingStage).toBe(true);
    expect(state.routeContract.retryPreservesSourceSafeLineage).toBe(true);
    expect(state.routeContract.failureStatesSourceSafe).toBe(true);
    expect(state.proofRoot).toMatch(/^terminal-enterprise-reading-ux:/u);
    expect(assertTerminalEnterpriseReadingUxStateSourceSafe(state)).toEqual({
      admitted: true,
      reason: 'source_safe_enterprise_reading_ux_metadata',
    });
  });

  it('hydrates later route stages, retry posture, and source-safe failure repair actions', () => {
    const state = buildTerminalEnterpriseReadingUxState({
      transactionId: 'reading-transaction-2',
      routeReadingStage: 'buy-asset-pack-settle',
      hasRepositorySource: true,
      hasReadMeasurement: true,
      hasSynthesizedNeed: true,
      hasAcceptedNeed: true,
      retryRequested: true,
      restartRequested: true,
      failureKind: 'settlement_blocked',
    });

    expect(state.activeStepId).toBe('buy-asset-pack-settle');
    expect(state.routeState.routeReadingStage).toBe('buy-asset-pack-settle');
    expect(state.routeState.activeStageHydratedFromRoute).toBe(true);
    expect(state.routeState.retryRequested).toBe(true);
    expect(state.routeState.retryPreservesNeedLineage).toBe(true);
    expect(state.routeState.retryPreservesSettlementBoundary).toBe(true);
    expect(state.routeState.restartRequested).toBe(true);
    expect(state.routeState.restartRestoresActiveStage).toBe(true);
    expect(state.routeState.failureKind).toBe('settlement_blocked');
    expect(state.routeState.failureStateSourceSafe).toBe(true);
    expect(state.routeState.failureRepairActions).toContain('repair-settlement-readback');
    expect(state.steps.find((step) => step.id === 'buy-asset-pack-settle')?.blockers).toContain(
      'source-safe AssetPack preview required',
    );
    expect(assertTerminalEnterpriseReadingUxStateSourceSafe(state).admitted).toBe(true);
  });
});
