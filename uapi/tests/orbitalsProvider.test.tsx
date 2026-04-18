import React from 'react';
import { act, render, screen } from '@testing-library/react';

jest.mock('next/dynamic', () => {
  const React = require('react');

  return () => {
    const MockOrbital = ({
      window,
      initialStep,
      onClose,
    }: {
      window: string;
      initialStep?: string;
      onClose: () => void;
    }) =>
      React.createElement(
        'div',
        { 'data-testid': 'orbital-overlay' },
        `${window}:${initialStep ?? 'none'}`,
        React.createElement('button', { onClick: onClose, type: 'button' }, 'Close orbital'),
      );

    MockOrbital.preload = jest.fn();
    return MockOrbital;
  };
});

import OrbitalsProvider, {
  closeOrbital,
  openOrbital,
} from '@/app/orbitals/components/OrbitalsProvider';

describe('OrbitalsProvider', () => {
  beforeEach(() => {
    Object.defineProperty(window, '__orbitalPrefetched', {
      configurable: true,
      value: true,
      writable: true,
    });
  });

  afterEach(() => {
    act(() => {
      closeOrbital();
    });
  });

  it('creates a portal container and renders orbitals when opened through the shared event bridge', () => {
    render(
      <OrbitalsProvider>
        <div>Application</div>
      </OrbitalsProvider>,
    );

    expect(document.getElementById('orbital-portal')).toBeTruthy();

    act(() => {
      openOrbital('orbitals', 'connects');
    });

    expect(document.documentElement.classList.contains('orbital-open')).toBe(true);
    expect(screen.getByTestId('orbital-overlay').textContent).toContain('SignUpWindow:connects');

    act(() => {
      closeOrbital();
    });

    expect(screen.queryByTestId('orbital-overlay')).toBeNull();
  });

  it('clears deep-linked pane state after close so later opens do not reuse a stale orbital pane', () => {
    render(
      <OrbitalsProvider>
        <div>Application</div>
      </OrbitalsProvider>,
    );

    act(() => {
      openOrbital('orbitals', 'connects');
    });

    expect(screen.getByTestId('orbital-overlay').textContent).toContain('SignUpWindow:connects');

    act(() => {
      closeOrbital();
    });

    act(() => {
      openOrbital('login');
    });

    expect(screen.getByTestId('orbital-overlay').textContent).toContain('SignInWindow:none');
  });
});
