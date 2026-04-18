import { normalizeApplicationCommandState } from '@/app/application/application-command-state';

describe('normalizeApplicationCommandState', () => {
  it('derives command options and posture from the shell snapshot', () => {
    const state = normalizeApplicationCommandState({
      selection: {
        scenarioId: 'scenario-auth',
        projectionPrincipal: 'reviewer',
        branchMode: 'context',
      },
      scenarios: [
        {
          scenarioId: 'scenario-auth',
          scenarioFamily: 'monorepo-auth-rollback',
          profileShortLabel: 'Targeted deposit',
          selected: true,
        },
      ],
      commandSurface: {
        heroLede: 'V25 active canon / V26 second-gate',
        heroTip: 'Current appendix posture is aligned.',
        status: 'Viewing reviewer projection.',
        flowGuideLabel: 'Hide flow guide',
        flowGuideOpen: true,
        flowGuideStepIndex: 2,
        flowGuideStepCount: 7,
        projectionOptions: [
          { value: 'buyer', label: 'buyer' },
          { value: 'reviewer', label: 'reviewer' },
        ],
        branchModeOptions: [
          { value: 'patch', label: 'patch' },
          { value: 'context', label: 'context' },
        ],
      },
    });

    expect(state?.scenario).toBe('scenario-auth');
    expect(state?.scenarioOptions[0]?.label).toBe('monorepo-auth-rollback · Targeted deposit');
    expect(state?.projection).toBe('reviewer');
    expect(state?.branchMode).toBe('context');
    expect(state?.flowGuideOpen).toBe(true);
    expect(state?.flowGuideStepCount).toBe(7);
    expect(state?.shellReady).toBe(true);
  });

  it('falls back safely when command-surface data is sparse', () => {
    const state = normalizeApplicationCommandState({
      selection: {
        projectionPrincipal: 'buyer',
      },
      scenarios: [],
      commandSurface: {},
    });

    expect(state?.projection).toBe('buyer');
    expect(state?.branchMode).toBe('patch');
    expect(state?.heroLede).toBe('Awaiting current Bitcode posture…');
    expect(state?.heroTip).toBe('The current flow guidance and runtime signals are loading.');
    expect(state?.flowGuideLabel).toBe('Flow guide');
  });
});
