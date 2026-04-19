/* eslint-disable react/no-multi-comp */

import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import Nav from '@/components/base/engi/layout/nav';

const mockPush = jest.fn();
const mockReplace = jest.fn();
const mockOpenOrbital = jest.fn();
const mockPrefetchOrbital = jest.fn();
const mockUseAuth = jest.fn();
let mockPathname = '/';

jest.mock('next/navigation', () => ({
  usePathname: () => mockPathname,
  useRouter: () => ({ push: mockPush, replace: mockReplace }),
}));

jest.mock('@/components/base/engi/auth/AuthProvider', () => ({
  useAuth: () => mockUseAuth(),
}));

jest.mock('@/hooks/useUserData', () => ({
  useUserData: () => ({ credits: 0 }),
}));

jest.mock('@/app/orbitals/components/OrbitalsProvider', () => ({
  openOrbital: (...args: unknown[]) => mockOpenOrbital(...args),
  prefetchOrbital: () => mockPrefetchOrbital(),
}));

jest.mock('@/config/features', () => ({
  FEATURE_FLAGS: {
    HIDE_CREDITS_TRACKER: false,
    NOTIFICATIONS: true,
    DISABLE_USING: true,
  },
}));

jest.mock('@/components/base/engi/layout/NavBrand', () => ({
  __esModule: true,
  default: ({
    onClick,
    surface,
  }: {
    onClick: () => void;
    surface: string | null;
  }) => (
    <button type="button" onClick={onClick}>
      Brand {surface ?? 'null'}
    </button>
  ),
}));

jest.mock('@/components/base/engi/credits/credits-tracker', () => ({
  CreditsTracker: () => <div>Credits</div>,
}));

jest.mock('@/components/base/engi/notifications/NotificationsWidget', () => ({
  NotificationsWidget: () => <div>Notifications</div>,
}));

jest.mock('@/components/base/engi/layout/user-menu', () => ({
  UserMenu: ({
    onOpenOrbitals,
  }: {
    onOpenOrbitals: () => void;
  }) => (
    <button type="button" onClick={onOpenOrbitals}>
      User menu
    </button>
  ),
}));

jest.mock('@/components/base/engi/overlays/disabled-tooltip-wrapper', () => ({
  DisabledTooltipWrapper: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

jest.mock('@/components/base/engi/nav/OrbitalUseButton', () => ({
  OrbitalUseButton: () => <div>Use button</div>,
}));

describe('Nav public shell', () => {
  beforeEach(() => {
    mockPathname = '/';
    mockPush.mockReset();
    mockReplace.mockReset();
    mockOpenOrbital.mockReset();
    mockPrefetchOrbital.mockReset();
    mockUseAuth.mockReturnValue({ user: null });
  });

  it('shows stable public-route links and guest workspace access actions', () => {
    render(<Nav />);

    const accessButton = screen.getByRole('button', { name: 'Access Workspace' });
    const createButton = screen.getByRole('button', { name: 'Create Account' });

    expect(screen.getByText('Brand public')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Transactions terminal' })).toHaveAttribute('href', '/application');
    expect(screen.getByRole('link', { name: 'Operator guide' })).toHaveAttribute('href', '/demo-video');

    fireEvent.mouseEnter(accessButton);
    fireEvent.click(accessButton);
    fireEvent.click(createButton);

    expect(screen.queryByText('Use button')).toBeNull();
    expect(mockPrefetchOrbital).toHaveBeenCalledTimes(1);
    expect(mockOpenOrbital).toHaveBeenNthCalledWith(1, 'login');
    expect(mockOpenOrbital).toHaveBeenNthCalledWith(2, 'SignUpWindow');
  });

  it('keeps public-route links visible while preserving signed-in menu and notifications', () => {
    mockUseAuth.mockReturnValue({
      user: {
        id: 'user-1',
        email: 'operator@example.com',
      },
    });

    render(<Nav />);

    expect(screen.getByText('Brand public')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Transactions terminal' })).toHaveAttribute('href', '/application');
    expect(screen.getByText('Notifications')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'User menu' }));

    expect(mockOpenOrbital).toHaveBeenCalledWith('orbitals', 'profile');
  });
});
