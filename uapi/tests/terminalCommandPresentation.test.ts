import {
  deriveTerminalCommandPresentation,
} from '@/app/terminal/terminal-command-presentation';
import type { TerminalCommandState } from '@/app/terminal/terminal-command-state';

describe('deriveTerminalCommandPresentation', () => {
  it('returns loading copy when controls are not ready', () => {
    expect(deriveTerminalCommandPresentation(null)).toEqual({
      draftSummary: 'Loading the current Bitcode working flow.',
      continuationStatus: 'Controls are syncing to the current Bitcode activity.',
      continuationTip: 'Stay in the Bitcode Terminal while scenario, projection, and branch mode become available.',
    });
  });

  it('derives user-facing working draft and guide copy from the current control state', () => {
    const state: TerminalCommandState = {
      scenario: 'need-1',
      projection: 'reviewer',
      branchMode: 'patch',
      scenarioOptions: [{ value: 'need-1', label: 'priority need · producer' }],
      projectionOptions: [{ value: 'reviewer', label: 'reviewer' }],
      branchOptions: [{ value: 'patch', label: 'patch' }],
      heroLede: 'former shell copy',
      heroTip: 'former shell tip',
      status: 'former shell status',
      flowGuideLabel: 'Flow guide',
      flowGuideOpen: false,
      flowGuideStepIndex: 1,
      flowGuideStepCount: 4,
      shellReady: true,
    };

    const presentation = deriveTerminalCommandPresentation(state);

    expect(presentation.draftSummary).toContain('priority need · producer');
    expect(presentation.draftSummary).toContain('reviewer projection');
    expect(presentation.draftSummary).toContain('patch branch handling');
    expect(presentation.continuationStatus).toBe('Flow guide is saved at step 2 of 4.');
    expect(presentation.continuationTip).toContain('Use the flow guide');
  });
});
