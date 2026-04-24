import {
  normalizeApplicationNeedFittingReview,
  normalizeApplicationNeedScenarios,
} from '@/app/application/application-need-scenarios';

describe('normalizeApplicationNeedScenarios', () => {
  it('normalizes active scenario cards and need posture from the shell snapshot', () => {
    const state = normalizeApplicationNeedScenarios({
      selection: {
        scenarioId: 'scenario-auth',
      },
      scenarios: [
        {
          scenarioId: 'scenario-auth',
          scenarioFamily: 'monorepo-auth-rollback',
          repo: 'bitcode/bitcode',
          profileShortLabel: 'Targeted deposit',
          selected: true,
        },
        {
          scenarioId: 'scenario-policy',
          scenarioFamily: 'policy-precedence-restore',
          repo: 'bitcode/bitcode',
          profileShortLabel: 'Normalization deposit',
          selected: false,
        },
      ],
      needingSurface: {
        parserKind: 'benchmark-parser',
        closureCriteria: ['session validity restored', 'audit receipt emitted'],
        targetArtifactKinds: ['runbook', 'patch'],
      },
    });

    expect(state?.selectedScenarioId).toBe('scenario-auth');
    expect(state?.parserKind).toBe('benchmark-parser');
    expect(state?.closureCriteriaCount).toBe(2);
    expect(state?.targetKindCount).toBe(2);
    expect(state?.scenarios[0]?.label).toBe('monorepo-auth-rollback');
  });

  it('returns null for empty snapshots', () => {
    expect(normalizeApplicationNeedScenarios(null)).toBeNull();
  });

  it('normalizes Exchange Need-fitting review state for Terminal review controls', () => {
    const review = normalizeApplicationNeedFittingReview({
      scenario: {
        scenarioId: 'auth-issuer-rollback',
      },
      measurement: {
        needId: 'need-auth-issuer-rollback',
        measurementHash: 'sha256:measurement',
        reviewableNeedRef: 'sha256:reviewable-need',
      },
      reviewableNeed: {
        allowedActions: ['accept', 'reject', 'remeasure-with-feedback'],
        reviewQuestions: ['Is this source-to-shares Need precise enough to fit?'],
      },
      needFittingReview: {
        artifactKind: 'bitcode-need-fitting-review',
        task: 'Restore issuer rollback ordering.',
        reviewStage: 'post-measurement-pre-fit',
        status: 'ready-for-review',
        action: null,
        requiredBefore: 'find-fitting-settlement',
        fitSearchAdmission: {
          admitted: false,
          admissionReason: 'Need must be accepted before fit search begins.',
          blockedStages: ['candidate-recall', 'find-fitting-settlement'],
        },
        settlementReview: {
          reviewStage: 'present-fit-for-settlement-review',
          quantizedObjectiveContractId: 'bitcode.source-to-shares.quantized-fit-quality-oc.v26',
          receiptCarryThrough: [
            'objectiveContractId',
            'sourceToSharesRef',
            'fitQualityHash',
            'receiptRefs',
          ],
        },
        candidateFitRequirements: {
          requiredStages: [
            'candidate-recall',
            'find-fitting-settlement',
            'asset-pack-assembly',
            'present-fit-for-settlement-review',
          ],
          blockedUntil: 'Need review action=accept',
        },
      },
    });

    expect(review).toMatchObject({
      scenarioId: 'auth-issuer-rollback',
      needId: 'need-auth-issuer-rollback',
      task: 'Restore issuer rollback ordering.',
      reviewStage: 'post-measurement-pre-fit',
      requiredBefore: 'find-fitting-settlement',
      status: 'ready-for-review',
      fitSearchAdmitted: false,
      objectiveContractId: 'bitcode.source-to-shares.quantized-fit-quality-oc.v26',
      settlementReviewStage: 'present-fit-for-settlement-review',
      blockedUntil: 'Need review action=accept',
    });
    expect(review?.allowedActions).toEqual(['accept', 'reject', 'remeasure-with-feedback']);
    expect(review?.blockedStages).toEqual(['candidate-recall', 'find-fitting-settlement']);
    expect(review?.receiptCarryThrough).toEqual([
      'objectiveContractId',
      'sourceToSharesRef',
      'fitQualityHash',
      'receiptRefs',
    ]);
    expect(review?.requiredFitStages).toEqual([
      'candidate-recall',
      'find-fitting-settlement',
      'asset-pack-assembly',
      'present-fit-for-settlement-review',
    ]);
  });
});
