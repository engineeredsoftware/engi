/**
 * @jest-environment jsdom
 */
/* eslint-disable react/no-multi-comp */
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

jest.mock('@radix-ui/react-dropdown-menu', () => {
  const React = require('react');

  return {
    Root: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    Trigger: ({ asChild, children }: { asChild?: boolean; children: React.ReactNode }) =>
      asChild ? children : <button type="button">{children}</button>,
    Portal: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    Content: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    Item: ({
      children,
      onSelect,
      className,
    }: {
      children: React.ReactNode;
      onSelect?: (event: { preventDefault: () => void }) => void;
      className?: string;
    }) => (
      <button
        type="button"
        className={className}
        onClick={() => onSelect?.({ preventDefault: () => {} })}
      >
        {children}
      </button>
    ),
  };
});

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

    expect(screen.getByText('Workspace account')).toBeInTheDocument();
    expect(screen.getByText('Open Orbitals fullscreen')).toBeInTheDocument();
    expect(screen.getByText('Connects, Interfaces, Profile, $BTD')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Open Orbitals fullscreen'));

    expect(onOpenOrbitals).toHaveBeenCalledTimes(1);
    expect(onSignOut).not.toHaveBeenCalled();
  });
});
