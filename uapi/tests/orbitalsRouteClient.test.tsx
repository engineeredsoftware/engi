import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';

jest.mock('@/app/orbitals/components', () => ({
  __esModule: true,
  default: ({ initialStep }: { initialStep: string }) => <div>Orbital {initialStep}</div>,
}));

import OrbitalsRouteClient from '@/app/orbitals/OrbitalsRouteClient';

describe('OrbitalsRouteClient', () => {
  it('renders user-facing contained orbital route copy and deep links each orbital route', () => {
    render(<OrbitalsRouteClient step="profile" />);

    expect(screen.getByText('Profile auxiliary')).toBeTruthy();
    expect(
      screen.getByRole('heading', { name: /Profile in one contained auxiliary read\./i }),
    ).toBeTruthy();
    expect(screen.getByRole('link', { name: /Open transactions/i })).toHaveAttribute(
      'href',
      '/application',
    );
    expect(screen.getAllByRole('link', { name: /Open auxiliary/i }).length).toBeGreaterThan(0);
    expect(screen.getByRole('link', { name: /Current route/i, exact: false })).toHaveAttribute(
      'href',
      '/orbitals/profile',
    );
    expect(screen.getByText('Orbital profile')).toBeTruthy();
  });
});
