import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';

jest.mock('@/components/base/engi/auth/LoginForm', () => ({
  __esModule: true,
  default: ({ surfaceVariant }: { surfaceVariant?: string }) => (
    <div data-testid="login-form" data-surface-variant={surfaceVariant || 'default'}>
      Login form
    </div>
  ),
}));

import OrbitalsLoginPane from '@/app/orbitals/components/OrbitalsLoginPane';

describe('OrbitalsLoginPane', () => {
  it('renders the application-owned workspace access shell', () => {
    render(<OrbitalsLoginPane />);

    expect(screen.getByText('Open your Bitcode workspace')).toBeTruthy();
    expect(screen.getByText('Primary access')).toBeTruthy();
    expect(screen.getByText('Active providers')).toBeTruthy();
    expect(screen.getByText('What opens next')).toBeTruthy();
    expect(screen.getByTestId('login-form')).toBeTruthy();
  });

  it('passes the contained surface contract into the login form when requested', () => {
    render(<OrbitalsLoginPane surfaceVariant="contained" />);

    expect(screen.getByTestId('login-form')).toHaveAttribute('data-surface-variant', 'contained');
  });
});
