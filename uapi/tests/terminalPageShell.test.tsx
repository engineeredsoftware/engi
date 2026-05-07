/* eslint-disable react/no-multi-comp */

import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';

import TerminalLayout from '@/app/terminal/layout';

jest.mock('@/app/ClientLayout', () => ({
  __esModule: true,
  default: ({ children }: React.PropsWithChildren) => <div data-testid="terminal-shell-frame">{children}</div>,
}));

describe('TerminalLayout', () => {
  it('keeps Terminal pages inside the persistent workspace shell frame', () => {
    render(
      <TerminalLayout>
        <div data-testid="terminal-page-content">Terminal page</div>
      </TerminalLayout>,
    );

    expect(screen.getByTestId('terminal-shell-frame')).toContainElement(
      screen.getByTestId('terminal-page-content'),
    );
  });
});
