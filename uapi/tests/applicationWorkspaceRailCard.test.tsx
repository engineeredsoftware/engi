import React from 'react';
import { render, screen } from '@testing-library/react';

import ApplicationWorkspaceRailCard from '@/app/application/ApplicationWorkspaceRailCard';

describe('ApplicationWorkspaceRailCard', () => {
  it('renders shared rail framing content', () => {
    render(
      <ApplicationWorkspaceRailCard
        kicker="Workspace modes"
        title="Read here, write in fullscreen"
        summary="Stay in the transaction workspace by default."
      >
        <button type="button">Open conversations fullscreen</button>
      </ApplicationWorkspaceRailCard>,
    );

    expect(screen.getByText('Workspace modes')).toBeTruthy();
    expect(screen.getByRole('heading', { name: 'Read here, write in fullscreen' })).toBeTruthy();
    expect(screen.getByText('Stay in the transaction workspace by default.')).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Open conversations fullscreen' })).toBeTruthy();
  });
});
