import React from 'react';
import { render, screen } from '@testing-library/react';

import TerminalWorkspaceRailCard from '@/app/terminal/TerminalWorkspaceRailCard';
import { TERMINAL_OPERATOR_EXPLAINERS } from '@/app/terminal/terminal-operator-explainers';

describe('TerminalWorkspaceRailCard', () => {
  it('renders shared rail framing content', () => {
    render(
      <TerminalWorkspaceRailCard
        kicker="Reading modes"
        title="Read here, open deeper modes when needed"
        summary="Stay in the activity ledger by default."
        explainer={TERMINAL_OPERATOR_EXPLAINERS.railModes}
      >
        <button type="button">Open conversations</button>
      </TerminalWorkspaceRailCard>,
    );

    expect(screen.getAllByText('Reading modes').length).toBeGreaterThan(0);
    expect(screen.getByRole('heading', { name: 'Read here, open deeper modes when needed' })).toBeTruthy();
    expect(screen.getByText('Stay in the activity ledger by default.')).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Open conversations' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Explain Read here, open deeper modes when needed' })).toBeTruthy();
  });
});
