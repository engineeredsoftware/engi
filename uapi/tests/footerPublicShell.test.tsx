import '@testing-library/jest-dom';
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import Footer from '@/components/base/engi/layout/footer';

const mockGetSession = jest.fn();
const mockOnAuthStateChange = jest.fn();
const mockOpenOrbital = jest.fn();
const mockPrefetchOrbital = jest.fn();

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: Record<string, unknown>) => <img {...props} alt="" />,
}));

jest.mock('@bitcode/supabase/ssr/client', () => ({
  createClient: () => ({
    auth: {
      getSession: () => mockGetSession(),
      onAuthStateChange: () => mockOnAuthStateChange(),
    },
  }),
}));

jest.mock('@/app/orbitals/components/OrbitalsProvider', () => ({
  openOrbital: (...args: unknown[]) => mockOpenOrbital(...args),
  prefetchOrbital: () => mockPrefetchOrbital(),
}));

jest.mock('@/config/features', () => ({
  FEATURE_FLAGS: {
    DISABLE_USING: false,
  },
}));

jest.mock('@/components/base/engi/branding/engi-software-svg-logo', () => ({
  __esModule: true,
  default: () => <div>Software logo</div>,
}));

describe('Footer public shell', () => {
  beforeEach(() => {
    mockGetSession.mockResolvedValue({ data: { session: null } });
    mockOnAuthStateChange.mockReturnValue({
      data: {
        subscription: {
          unsubscribe: jest.fn(),
        },
      },
    });
    mockOpenOrbital.mockReset();
    mockPrefetchOrbital.mockReset();
  });

  it('renders third-gate public labels and opens workspace access for guests', () => {
    render(<Footer />);

    expect(screen.getByRole('link', { name: 'Transactions terminal' })).toHaveAttribute(
      'href',
      '/application',
    );
    expect(screen.getByRole('link', { name: 'Operator guide' })).toHaveAttribute(
      'href',
      '/demo-video',
    );
    expect(screen.getByRole('link', { name: 'Bitcode on Bluesky' })).toHaveAttribute(
      'href',
      'https://bsky.app/profile/engicomms.bsky.social',
    );
    expect(screen.getByRole('button', { name: 'Explain Transactions terminal' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Explain Operator guide' })).toBeInTheDocument();
    expect(screen.getByText('Bitcode app')).toBeInTheDocument();
    expect(screen.getByText('Recorded guide')).toBeInTheDocument();
    expect(screen.getByText('Give')).toBeInTheDocument();
    expect(screen.getByText('Need')).toBeInTheDocument();
    expect(screen.getAllByText('Settle').length).toBeGreaterThan(0);
    const protocolSpecLink = screen.getByRole('link', { name: 'Protocol spec' });
    expect(protocolSpecLink).not.toHaveAttribute('title');
    expect(screen.getByRole('button', { name: 'Explain Protocol specification' })).toBeInTheDocument();

    const button = screen.getByRole('button', { name: 'Access Workspace' });
    fireEvent.mouseEnter(button);
    fireEvent.click(button);

    expect(mockPrefetchOrbital).toHaveBeenCalledTimes(1);
    expect(mockOpenOrbital).toHaveBeenCalledWith('login', undefined);
  });
});
