/* eslint-disable react/no-multi-comp */

import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';

import ApplicationLayout from '@/app/application/layout';

jest.mock('@/app/ClientLayout', () => ({
  __esModule: true,
  default: ({ children }: React.PropsWithChildren) => <div data-testid="application-shell-frame">{children}</div>,
}));

describe('ApplicationLayout', () => {
  it('keeps application pages inside the persistent workspace shell frame', () => {
    render(
      <ApplicationLayout>
        <div data-testid="application-page-content">Terminal page</div>
      </ApplicationLayout>,
    );

    expect(screen.getByTestId('application-shell-frame')).toContainElement(
      screen.getByTestId('application-page-content'),
    );
  });
});
