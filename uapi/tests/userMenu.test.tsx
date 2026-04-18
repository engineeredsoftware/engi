/**
 * @jest-environment jsdom
 */
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

jest.mock('@/components/base/engi/menus/glassy-menu.module.css', () => ({
  __esModule: true,
  default: {
    menu: 'menu',
    item: 'item',
    danger: 'danger',
    dangerIcon: 'danger-icon',
  },
}));

import { UserMenu } from '@/components/base/engi/layout/user-menu';

describe('UserMenu', () => {
  const mockUser = {
    email: 'operator@example.com',
    user_metadata: {},
  } as any;

  it('opens orbitals through the workspace account menu and keeps orbital naming user-facing', async () => {
    const onOpenOrbitals = jest.fn();
    const onSignOut = jest.fn();

    render(
      <UserMenu user={mockUser} onOpenOrbitals={onOpenOrbitals} onSignOut={onSignOut} />,
    );

    fireEvent.pointerDown(screen.getByRole('button', { name: 'User menu' }));

    expect(await screen.findByText('Workspace account')).toBeInTheDocument();
    expect(screen.getByText('Open Orbitals')).toBeInTheDocument();
    expect(screen.getByText('Connects, Interfaces, Profile, $BTD')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Open Orbitals'));

    expect(onOpenOrbitals).toHaveBeenCalledTimes(1);
    expect(onSignOut).not.toHaveBeenCalled();
  });
});
