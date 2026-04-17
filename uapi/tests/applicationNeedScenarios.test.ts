import { normalizeApplicationNeedScenarios } from '@/app/application/application-need-scenarios';

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
});
