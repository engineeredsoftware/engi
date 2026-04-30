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

    expect(screen.getByText('Learn Bitcode from Source Shares to proof.')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Start reading' })).toHaveAttribute('href', '/docs/what-is-bitcode');
    expect(screen.getByText('Read in this order if Bitcode is new.')).toBeInTheDocument();
    expect(screen.getByText('Product docs map back to the canon.')).toBeInTheDocument();
    expect(screen.getByText('Interface API references')).toBeInTheDocument();
    expect(screen.getByText('Build against Bitcode without losing the Exchange contract.')).toBeInTheDocument();
    expect(screen.getByText('00 / Start Here')).toBeInTheDocument();
    expect(screen.getByText('04 / Commercial Interfaces')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /What Bitcode is/ })).toHaveAttribute('href', '/docs/what-is-bitcode');
    expect(screen.getByRole('link', { name: /Source Shares and the Bitcode Exchange/ })).toHaveAttribute('href', '/docs/source-shares');
    expect(screen.getByRole('link', { name: /Understand the Bitcode Exchange/ })).toHaveAttribute('href', '/docs/exchange');
    expect(screen.getByRole('link', { name: /Orient inside the Bitcode Terminal/ })).toHaveAttribute('href', '/docs/terminal');
    expect(screen.getByRole('link', { name: /Terminal actions: what writes and what should read back/ })).toHaveAttribute('href', '/docs/terminal-actions');
    expect(screen.getByRole('link', { name: /Terminal reads, proofs, readiness, and expected results/ })).toHaveAttribute('href', '/docs/read-results');
    expect(screen.getByRole('link', { name: /Operate Bitcode through MCP and API surfaces/ })).toHaveAttribute('href', '/docs/mcp-api');
    expect(screen.getByRole('link', { name: /Use the ChatGPT App as a connected Bitcode interface/ })).toHaveAttribute('href', '/docs/chatgpt-app');
    expect(screen.getByText('Terminal action map')).toBeInTheDocument();
    expect(screen.getByText('Every write has a read-back expectation.')).toBeInTheDocument();
    expect(screen.getByText('Proof and readiness reads')).toBeInTheDocument();
    expect(screen.getByText('Guide fallback')).toBeInTheDocument();
  });
});
