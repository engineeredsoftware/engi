import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';

import TerminalWorkspaceRail from '@/app/terminal/TerminalWorkspaceRail';

jest.mock('@/app/terminal/TerminalWorkspaceRailCard', () => ({
  __esModule: true,
  default: function MockTerminalWorkspaceRailCard({
    title,
    children,
  }: {
    title: string;
    children: React.ReactNode;
  }) {
    return (
      <section>
        <h2>{title}</h2>
        {children}
      </section>
    );
  },
}));

jest.mock('@/app/terminal/TerminalOpenAuxillariesButton', () => ({
  __esModule: true,
  default: function MockTerminalOpenAuxillariesButton() {
    return <button type="button">Open Auxillaries</button>;
  },
}));

describe('TerminalWorkspaceRail', () => {
  it('hides conversations entry when conversations are disabled', () => {
    render(
      <TerminalWorkspaceRail
        conversationsEnabled={false}
        onOpenConversations={jest.fn()}
        runs={[]}
        isLoadingRuns={false}
        runsError={null}
        selectedRun={null}
        transactionDataMode="live"
      />,
    );

    expect(screen.queryByRole('button', { name: 'Open conversations' })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Open Auxillaries' })).toBeInTheDocument();
  });
});
