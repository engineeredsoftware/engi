import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';

import PublicDocsPageContent from '@/app/(root)/components/PublicDocsPageContent';

jest.mock('@/components/base/bitcode/layout/footer', () => ({
  __esModule: true,
  default: () => <div>Footer</div>,
}));

jest.mock('@/app/(root)/components/MarketingOperatorGuideCard', () => ({
  __esModule: true,
  default: ({ initialSourcePlayable }: { initialSourcePlayable: boolean }) => (
    <div>{initialSourcePlayable ? 'Guide playable' : 'Guide fallback'}</div>
  ),
}));

describe('PublicDocsPageContent', () => {
  it('renders docs-owned public teaching surfaces', () => {
    render(<PublicDocsPageContent sourcePlayable={false} />);

    expect(screen.getByText('Study Bitcode step by step.')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Source Shares and the Bitcode Exchange' })).toHaveAttribute('href', '/docs/source-shares');
    expect(screen.getByRole('link', { name: 'Orient inside the Bitcode Terminal' })).toHaveAttribute('href', '/docs/terminal');
    expect(screen.getByRole('link', { name: 'Terminal actions: what writes and what should read back' })).toHaveAttribute('href', '/docs/terminal-actions');
    expect(screen.getByRole('link', { name: 'Terminal reads, proofs, readiness, and expected results' })).toHaveAttribute('href', '/docs/read-results');
    expect(screen.getByText('Terminal action map')).toBeInTheDocument();
    expect(screen.getByText('Every write has a read-back expectation.')).toBeInTheDocument();
    expect(screen.getByText('Source Shares visual guide')).toBeInTheDocument();
    expect(screen.getByText('Proof and readiness reads')).toBeInTheDocument();
    expect(screen.getByText('Guide fallback')).toBeInTheDocument();
  });
});
