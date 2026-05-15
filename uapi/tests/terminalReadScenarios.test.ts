import {
  normalizeTerminalReadFittingReview,
  normalizeTerminalReadScenarios,
} from '@/app/terminal/terminal-read-scenarios';

describe('normalizeTerminalReadScenarios', () => {
  it('normalizes active scenario cards and read posture from the shell snapshot', () => {
    const state = normalizeTerminalReadScenarios({
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
      readingSurface: {
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
    expect(normalizeTerminalReadScenarios(null)).toBeNull();
  });

  it('normalizes Exchange Read-fitting review state for Terminal review controls', () => {
    const review = normalizeTerminalReadFittingReview({
      scenario: {
        scenarioId: 'auth-issuer-rollback',
      },
      measurement: {
        readId: 'read-auth-issuer-rollback',
        measurementHash: 'sha256:measurement',
        reviewableReadRef: 'sha256:reviewable-read',
      },
      reviewableRead: {
        allowedActions: ['accept', 'reject', 'remeasure-with-feedback'],
        reviewQuestions: ['Is this source-to-shares Read precise enough to fit?'],
      },
      readFittingReview: {
        artifactKind: 'bitcode-read-fitting-review',
        task: 'Restore issuer rollback ordering.',
        reviewStage: 'post-measurement-pre-fit',
        status: 'ready-for-review',
        action: null,
        requiredBefore: 'find-fitting-settlement',
        fitSearchAdmission: {
          admitted: false,
          admissionReason: 'Read must be accepted before fit search begins.',
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
          blockedUntil: 'Read review action=accept',
        },
      },
    });

    expect(review).toMatchObject({
      scenarioId: 'auth-issuer-rollback',
      readId: 'read-auth-issuer-rollback',
      task: 'Restore issuer rollback ordering.',
      reviewStage: 'post-measurement-pre-fit',
      requiredBefore: 'find-fitting-settlement',
      status: 'ready-for-review',
      fitSearchAdmitted: false,
      objectiveContractId: 'bitcode.source-to-shares.quantized-fit-quality-oc.v26',
      settlementReviewStage: 'present-fit-for-settlement-review',
      blockedUntil: 'Read review action=accept',
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
