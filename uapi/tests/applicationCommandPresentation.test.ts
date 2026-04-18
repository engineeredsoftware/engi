import {
  deriveApplicationCommandPresentation,
} from '@/app/application/application-command-presentation';
import type { ApplicationCommandState } from '@/app/application/application-command-state';

describe('deriveApplicationCommandPresentation', () => {
  it('returns loading copy when controls are not ready', () => {
    expect(deriveApplicationCommandPresentation(null)).toEqual({
      draftSummary: 'Loading the current Bitcode working flow.',
      continuationStatus: 'Controls are syncing to the current workspace state.',
      continuationTip:
        'Stay in the transaction terminal while scenario, projection, and branch mode become available.',
    });
  });

  it('derives user-facing working draft and guide copy from the current control state', () => {
    const state: ApplicationCommandState = {
      scenario: 'need-1',
      projection: 'reviewer',
      branchMode: 'patch',
      scenarioOptions: [{ value: 'need-1', label: 'priority need · producer' }],
      projectionOptions: [{ value: 'reviewer', label: 'reviewer' }],
      branchOptions: [{ value: 'patch', label: 'patch' }],
      heroLede: 'legacy shell copy',
      heroTip: 'legacy shell tip',
      status: 'legacy shell status',
      tutorialLabel: 'Flow guide',
      tutorialOpen: false,
      tutorialStepIndex: 1,
      tutorialStepCount: 4,
      shellReady: true,
    };

    const presentation = deriveApplicationCommandPresentation(state);

    expect(presentation.draftSummary).toContain('priority need · producer');
    expect(presentation.draftSummary).toContain('reviewer projection');
    expect(presentation.draftSummary).toContain('patch branch handling');
    expect(presentation.continuationStatus).toBe('Flow guide is saved at step 2 of 4.');
    expect(presentation.continuationTip).toContain('Use the flow guide');
  });
});
