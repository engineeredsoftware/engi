/* eslint-disable react/no-multi-comp */

import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';

import MarketingLandingPage from '@/app/(root)/components/MarketingLandingPage';

jest.mock('framer-motion', () => {
  const makeComponent = () =>
    ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) =>
      <div {...props}>{children}</div>;

  return {
    motion: new Proxy(
      {},
      {
        get: () => makeComponent(),
      },
    ),
  };
});

jest.mock('@/components/base/engi/layout/footer', () => ({
  __esModule: true,
  default: () => <div>Footer</div>,
}));

jest.mock('@/components/base/engi/branding/engi-pill', () => ({
  __esModule: true,
  default: ({ children }: React.PropsWithChildren) => <div>{children}</div>,
}));

jest.mock('@/components/base/engi/branding/engi-software-svg-logo', () => ({
  __esModule: true,
  default: () => <div>Software logo</div>,
}));

jest.mock('@/components/base/engi/branding/logo', () => ({
  __esModule: true,
  default: () => <div>Logo</div>,
}));

jest.mock('@/components/base/engi/effects/quantum-orb', () => ({
  QuantumOrb: () => <div>QuantumOrb</div>,
  minimalPreset: {},
}));

jest.mock('@/components/base/engi/multi-line-typing-animation', () => ({
  __esModule: true,
  default: ({ text }: { text: string }) => <>{text}</>,
}));

describe('MarketingLandingPage', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(() => ({
        matches: false,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      })),
    });
  });

  it('renders Bitcode-facing landing CTAs and operator guide copy', () => {
    render(<MarketingLandingPage />);

    expect(
      screen.getByText('Bitcode is the transactions terminal for engineering value.'),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Open transactions terminal' }),
    ).toHaveAttribute('href', '/application');
    expect(screen.getByRole('link', { name: 'Review operator guide' })).toHaveAttribute(
      'href',
      '/demo-video',
    );
    expect(screen.getByText('Start with the transactions terminal')).toBeInTheDocument();
    expect(screen.getByText('Operator frame')).toBeInTheDocument();
    expect(screen.getByText('Source to settlement')).toBeInTheDocument();
  });
});
