/* eslint-disable react/no-multi-comp */

import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import Nav from '@/components/base/bitcode/layout/nav';

const mockPush = jest.fn();
const mockReplace = jest.fn();
const mockOpenOrbital = jest.fn();
const mockPrefetchOrbital = jest.fn();
const mockUseAuth = jest.fn();

jest.mock('next/navigation', () => ({
  usePathname: () => '/application',
  useRouter: () => ({ push: mockPush, replace: mockReplace }),
}));

jest.mock('@/components/base/bitcode/auth/AuthProvider', () => ({
  useAuth: () => mockUseAuth(),
}));

jest.mock('@/hooks/useUserData', () => ({
  useUserData: () => ({ btdBalance: 0 }),
}));

jest.mock('@/app/auxillaries/components/AuxillariesProvider', () => ({
  openAuxillaries: (...args: unknown[]) => mockOpenOrbital(...args),
  prefetchAuxillaries: () => mockPrefetchOrbital(),
}));

jest.mock('@/config/features', () => ({
  FEATURE_FLAGS: {
    HIDE_CREDITS_TRACKER: false,
    NOTIFICATIONS: true,
    DISABLE_USING: true,
  },
}));

jest.mock('@/components/base/bitcode/layout/NavBrand', () => ({
  __esModule: true,
  default: ({ onClick }: { onClick: () => void }) => (
    <button type="button" onClick={onClick}>
      Brand
    </button>
  ),
}));

jest.mock('@/components/base/bitcode/btd/btd-tracker', () => ({
  BTDTracker: () => <div>BTD</div>,
}));

jest.mock('@/components/base/bitcode/notifications/NotificationsWidget', () => ({
  NotificationsWidget: () => <div>Notifications</div>,
}));

jest.mock('@/components/base/bitcode/layout/user-menu', () => ({
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

jest.mock('@/components/base/bitcode/overlays/disabled-tooltip-wrapper', () => ({
  DisabledTooltipWrapper: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

jest.mock('@/components/base/bitcode/nav/OrbitalUseButton', () => ({
  OrbitalUseButton: () => <div>Use button</div>,
}));

describe('Nav workspace chrome', () => {
  beforeEach(() => {
    mockPush.mockReset();
    mockReplace.mockReset();
    mockOpenOrbital.mockReset();
    mockPrefetchOrbital.mockReset();
    mockUseAuth.mockReturnValue({ user: null });
  });

  it('shows focused workspace access actions for unauthenticated application routes', () => {
    render(<Nav />);

    const accessButton = screen.getByRole('button', { name: 'Open Auxillaries' });
    const createButton = screen.getByRole('button', { name: 'Create Account' });

    fireEvent.mouseEnter(accessButton);
    fireEvent.click(accessButton);
    fireEvent.click(createButton);

    expect(screen.queryByText('Use button')).toBeNull();
    expect(mockPrefetchOrbital).toHaveBeenCalledTimes(1);
    expect(mockOpenOrbital).toHaveBeenNthCalledWith(1, 'login');
    expect(mockOpenOrbital).toHaveBeenNthCalledWith(2, 'SignUpWindow');
  });

  it('reopens auxillaries from signed-in workspace chrome through the canonical auxillaries mode', () => {
    mockUseAuth.mockReturnValue({
      user: {
        id: 'user-1',
        email: 'operator@example.com',
      },
    });

    render(<Nav />);

    expect(screen.queryByRole('button', { name: 'Open Auxillaries' })).toBeNull();
    expect(screen.getByText('Notifications')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'User menu' }));

    expect(mockOpenOrbital).toHaveBeenCalledWith('auxillaries', 'profile');
  });
});
