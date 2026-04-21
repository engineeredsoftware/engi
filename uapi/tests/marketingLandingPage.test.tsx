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

jest.mock('@/components/base/bitcode/layout/footer', () => ({
  __esModule: true,
  default: () => <div>Footer</div>,
}));

jest.mock('@/components/base/bitcode/branding/bitcode-pill', () => ({
  __esModule: true,
  default: ({ children }: React.PropsWithChildren) => <div>{children}</div>,
}));

jest.mock('@/components/base/bitcode/branding/bitcode-software-svg-logo', () => ({
  __esModule: true,
  default: () => <div>Software logo</div>,
}));

jest.mock('@/components/base/bitcode/branding/logo', () => ({
  __esModule: true,
  default: () => <div>Logo</div>,
}));

jest.mock('@/components/base/bitcode/effects/quantum-orb', () => ({
  QuantumOrb: () => <div>QuantumOrb</div>,
  minimalPreset: {},
}));

jest.mock('@/components/base/bitcode/multi-line-typing-animation', () => ({
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
      screen.getByText('Bitcode is auditable market infrastructure for technical knowledge.'),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Open Bitcode Terminal' }),
    ).toHaveAttribute('href', '/application');
    expect(screen.getByRole('link', { name: 'Read docs' })).toHaveAttribute(
      'href',
      '/docs',
    );
    expect(screen.getByText('Study the docs before you transact')).toBeInTheDocument();
    expect(screen.getByText('Compact network view')).toBeInTheDocument();
    expect(screen.getAllByText('Bitcode Terminal').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Source to settlement').length).toBeGreaterThan(0);
    expect(screen.getByTestId('landing-orbital-ambience')).toHaveClass('hidden', 'laptop:block');
    expect(screen.getByTestId('landing-pointer-glow')).toHaveClass('hidden', 'laptop:block');
    expect(screen.getByTestId('landing-ambient-glow')).toHaveClass('hidden', 'laptop:block');
  });
});
