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

jest.mock('@/app/auxillaries/components/AuxillariesProvider', () => ({
  openAuxillaries: (...args: unknown[]) => mockOpenOrbital(...args),
  prefetchAuxillaries: () => mockPrefetchOrbital(),
}));

jest.mock('@/config/features', () => ({
  FEATURE_FLAGS: {
    DISABLE_USING: false,
  },
}));

jest.mock('@/components/base/engi/branding/bitcode-software-svg-logo', () => ({
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

  it('renders third-gate public labels and opens orbitals access for guests', () => {
    render(<Footer />);

    expect(screen.getByRole('link', { name: 'Network' })).toHaveAttribute(
      'href',
      '/',
    );
    expect(screen.getByRole('link', { name: 'Transactions' })).toHaveAttribute(
      'href',
      '/application',
    );
    expect(screen.getByRole('link', { name: 'Docs' })).toHaveAttribute(
      'href',
      '/docs',
    );
    expect(screen.getByRole('link', { name: 'Bitcode on Bluesky' })).toHaveAttribute(
      'href',
      'https://bsky.app/profile/engicomms.bsky.social',
    );
    expect(screen.getByRole('button', { name: 'Explain Network' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Explain Transactions' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Explain Docs' })).toBeInTheDocument();
    expect(screen.getByText('Public route')).toBeInTheDocument();
    expect(screen.getByText('Bitcode app')).toBeInTheDocument();
    expect(screen.getByText('Docs hub')).toBeInTheDocument();
    expect(screen.getByText('Give')).toBeInTheDocument();
    expect(screen.getByText('Need')).toBeInTheDocument();
    expect(screen.getAllByText('Settle').length).toBeGreaterThan(0);
    const protocolSpecLink = screen.getByRole('link', { name: 'Protocol spec' });
    expect(protocolSpecLink).not.toHaveAttribute('title');
    expect(protocolSpecLink).toHaveAttribute(
      'href',
      'https://github.com/engineeredsoftware/bitcode/blob/main/ENGI_SPEC.txt',
    );
    expect(screen.getByRole('button', { name: 'Explain Protocol specification' })).toBeInTheDocument();

    const button = screen.getByRole('button', { name: 'Open Auxillaries' });
    fireEvent.mouseEnter(button);
    fireEvent.click(button);

    expect(mockPrefetchOrbital).toHaveBeenCalledTimes(1);
    expect(mockOpenOrbital).toHaveBeenCalledWith('login', undefined);
  });
});
