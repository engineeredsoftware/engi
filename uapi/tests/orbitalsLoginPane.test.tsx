import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';

jest.mock('@/components/base/engi/auth/LoginForm', () => ({
  __esModule: true,
  default: () => <div data-testid="login-form">Login form</div>,
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
});
