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
    expect(screen.getByRole('link', { name: 'Read the live Bitcode market frame' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: 'Move into full give-to-settle detail' })).toHaveAttribute('href', '/application');
    expect(screen.getByRole('link', { name: 'Shape identity, interfaces, and $BTD posture' })).toHaveAttribute('href', '/auxillaries/profile');
    expect(screen.getByRole('link', { name: 'Inspect storage, schema, and package owners' })).toHaveAttribute('href', '/edgetimes');
    expect(screen.getByText('Exchange')).toBeInTheDocument();
    expect(screen.getByText('Terminal')).toBeInTheDocument();
    expect(screen.getByText('Inline widgets')).toBeInTheDocument();
    expect(screen.getByText('Guide fallback')).toBeInTheDocument();
  });
});
