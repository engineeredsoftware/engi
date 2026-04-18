import { deriveApplicationFlowGuide } from '@/app/application/application-flow-guide';
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
      tutorialLabel: 'Flow guide',
      tutorialOpen: true,
      tutorialStepIndex: 6,
      tutorialStepCount: 10,
      shellReady: true,
    };

    const guide = deriveApplicationFlowGuide(commandState);

    expect(guide.readinessLabel).toBe('drafting');
    expect(guide.statusSummary).toBe('The flow guide is open at step 7 of 10.');
    expect(guide.stages[0].status).toBe('done');
    expect(guide.stages[3].status).toBe('current');
    expect(guide.stages[4].status).toBe('next');
  });
});
