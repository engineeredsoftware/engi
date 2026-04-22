import { deriveApplicationFlowGuide } from '@/app/application/application-flow-guide';
import { deriveBitcodeTransactionReadiness } from '@/app/application/bitcode-transaction-readiness';
import type { ApplicationCommandState } from '@/app/application/application-command-state';

describe('deriveApplicationFlowGuide', () => {
  it('returns syncing posture when command state is not ready', () => {
    const guide = deriveApplicationFlowGuide(null);

    expect(guide.readinessLabel).toBe('syncing');
    expect(guide.stages[0].status).toBe('current');
    expect(guide.stages[1].status).toBe('next');
  });

  it('maps tutorial progress into resumable give-to-closure stages', () => {
    const commandState: ApplicationCommandState = {
      scenario: 'need-1',
      projection: 'reviewer',
      branchMode: 'patch',
      scenarioOptions: [{ value: 'need-1', label: 'priority need · producer' }],
      projectionOptions: [{ value: 'reviewer', label: 'reviewer' }],
      branchOptions: [{ value: 'patch', label: 'patch' }],
      heroLede: 'shell posture',
      heroTip: 'shell tip',
      status: 'ready',
      flowGuideLabel: 'Flow guide',
      flowGuideOpen: true,
      flowGuideStepIndex: 6,
      flowGuideStepCount: 10,
      shellReady: true,
    };

    const guide = deriveApplicationFlowGuide(commandState);

    expect(guide.readinessLabel).toBe('drafting');
    expect(guide.statusSummary).toBe('The flow guide is open at step 7 of 10.');
    expect(guide.stages[0].status).toBe('done');
    expect(guide.stages[3].status).toBe('current');
    expect(guide.stages[4].status).toBe('next');
  });

  it('switches to review-only posture when transactional readiness is incomplete', () => {
    const commandState: ApplicationCommandState = {
      scenario: 'need-1',
      projection: 'reviewer',
      branchMode: 'patch',
      scenarioOptions: [{ value: 'need-1', label: 'priority need · producer' }],
      projectionOptions: [{ value: 'reviewer', label: 'reviewer' }],
      branchOptions: [{ value: 'patch', label: 'patch' }],
      heroLede: 'shell posture',
      heroTip: 'shell tip',
      status: 'ready',
      flowGuideLabel: 'Flow guide',
      flowGuideOpen: false,
      flowGuideStepIndex: 0,
      flowGuideStepCount: 0,
      shellReady: true,
    };

    const guide = deriveApplicationFlowGuide(
      commandState,
      deriveBitcodeTransactionReadiness({
        signedIn: true,
        hasRepositoryProvider: true,
        hasWalletBinding: false,
        requiresRepositoryAnchor: true,
        hasRepositoryAnchor: false,
      }),
    );

    expect(guide.readinessLabel).toBe('review-only');
    expect(guide.statusSummary).toContain('review-only mode');
  });

  it('keeps a draft-only posture when verified signing is still staged', () => {
    const commandState: ApplicationCommandState = {
      scenario: 'need-1',
      projection: 'reviewer',
      branchMode: 'patch',
      scenarioOptions: [{ value: 'need-1', label: 'priority need · producer' }],
      projectionOptions: [{ value: 'reviewer', label: 'reviewer' }],
      branchOptions: [{ value: 'patch', label: 'patch' }],
      heroLede: 'shell posture',
      heroTip: 'shell tip',
      status: 'ready',
      flowGuideLabel: 'Flow guide',
      flowGuideOpen: true,
      flowGuideStepIndex: 4,
      flowGuideStepCount: 10,
      shellReady: true,
    };

    const guide = deriveApplicationFlowGuide(
      commandState,
      deriveBitcodeTransactionReadiness({
        signedIn: true,
        hasRepositoryProvider: true,
        hasWalletBinding: true,
        hasVerifiedWalletBinding: false,
        requiresRepositoryAnchor: true,
        hasRepositoryAnchor: true,
      }),
    );

    expect(guide.readinessLabel).toBe('draft-only');
    expect(guide.statusSummary).toContain('signed settlement remains staged');
    expect(guide.statusSummary).toContain('step 5 of 10');
  });
});
