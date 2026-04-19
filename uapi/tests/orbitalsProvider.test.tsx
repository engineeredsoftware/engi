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

import AuxillariesProvider, {
  closeAuxillaries,
  openAuxillaries,
} from '@/app/auxillaries/components/AuxillariesProvider';

describe('AuxillariesProvider', () => {
  beforeEach(() => {
    Object.defineProperty(window, '__orbitalPrefetched', {
      configurable: true,
      value: true,
      writable: true,
    });
  });

  afterEach(() => {
    act(() => {
      closeAuxillaries();
    });
  });

  it('creates a portal container and renders auxillaries when opened through the shared event bridge', () => {
    render(
      <AuxillariesProvider>
        <div>Application</div>
      </AuxillariesProvider>,
    );

    expect(document.getElementById('orbital-portal')).toBeTruthy();

    act(() => {
      openAuxillaries('auxillaries', 'connects');
    });

    expect(document.documentElement.classList.contains('orbital-open')).toBe(true);
    expect(screen.getByTestId('orbital-overlay').textContent).toContain('SignUpWindow:connects');

    act(() => {
      closeAuxillaries();
    });

    expect(screen.queryByTestId('orbital-overlay')).toBeNull();
  });

  it('clears deep-linked pane state after close so later opens do not reuse a stale orbital pane', () => {
    render(
      <AuxillariesProvider>
        <div>Application</div>
      </AuxillariesProvider>,
    );

    act(() => {
      openAuxillaries('auxillaries', 'connects');
    });

    expect(screen.getByTestId('orbital-overlay').textContent).toContain('SignUpWindow:connects');

    act(() => {
      closeAuxillaries();
    });

    act(() => {
      openAuxillaries('login');
    });

    expect(screen.getByTestId('orbital-overlay').textContent).toContain('SignInWindow:none');
  });
});
