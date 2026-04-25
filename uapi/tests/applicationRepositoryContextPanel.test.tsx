import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

import ApplicationRepositoryContextPanel from '@/app/application/ApplicationRepositoryContextPanel';

const mockReplace = jest.fn();
let mockSearchParams = new URLSearchParams('provider=github&repo=bitcode/bitcode');
const mockJumpToShellSection = jest.fn();

jest.mock('next/navigation', () => ({
  usePathname: () => '/application',
  useRouter: () => ({ replace: mockReplace }),
  useSearchParams: () => mockSearchParams,
}));

jest.mock('@/app/application/ApplicationWorkspaceCard', () => ({
  __esModule: true,
  default: function MockApplicationWorkspaceCard({
    title,
    children,
  }: {
    title: string;
    children: React.ReactNode;
  }) {
    return (
      <section>
        <h2>{title}</h2>
        {children}
      </section>
    );
  },
}));

jest.mock('@/components/base/bitcode/execution/BitcodeInlineExplainer', () => ({
  __esModule: true,
  default: function MockBitcodeInlineExplainer() {
    return null;
  },
}));

jest.mock('@/components/base/bitcode/vcs/VCSRepositorySelector', () => ({
  VCSRepositorySelector: function MockVCSRepositorySelector({
    repositories,
    value,
    placeholder,
  }: {
    repositories?: Array<{ fullName: string }>;
    value?: string;
    placeholder?: string;
  }) {
    return (
      <div data-testid="mock-repository-selector">
        {(value || placeholder || 'repository selector').toString()} :: {repositories?.length ?? 0}
      </div>
    );
  },
}));

jest.mock('@/app/application/ApplicationOpenOrbitalsButton', () => ({
  __esModule: true,
  default: function MockApplicationOpenOrbitalsButton({
    label,
  }: {
    label?: string;
  }) {
    return <button type="button">{label || 'Open Connects'}</button>;
  },
}));

jest.mock('@/app/application/application-shell-reading', () => ({
  jumpToShellSection: (...args: unknown[]) => mockJumpToShellSection(...args),
}));

describe('ApplicationRepositoryContextPanel', () => {
  beforeEach(() => {
    mockReplace.mockReset();
    mockJumpToShellSection.mockReset();
    mockSearchParams = new URLSearchParams('provider=github&repo=bitcode/bitcode');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('keeps stored repository inventory readable when the saved provider session must reconnect', async () => {
    global.fetch = jest
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        headers: { get: () => 'application/json' },
        json: async () => ({
          connected: true,
          provider: 'github',
          valid: false,
          username: 'bitcode-operator',
          metadata: {
            repositories: 1,
            status: 'reconnect required',
          },
        }),
      })
      .mockResolvedValueOnce({
        ok: true,
        headers: { get: () => 'application/json' },
        json: async () => ({
          repositories: [
            {
              id: 'repo-1',
              name: 'bitcode',
              fullName: 'bitcode/bitcode',
              defaultBranch: 'main',
              private: true,
              url: 'https://github.com/bitcode/bitcode',
              language: 'TypeScript',
              topics: ['shares'],
              owner: {
                username: 'bitcode',
                id: 'org-1',
              },
            },
          ],
          inventorySource: 'stored_repository_inventory',
        }),
      }) as jest.Mock;

    render(<ApplicationRepositoryContextPanel />);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/vcs/github/connection');
      expect(global.fetch).toHaveBeenCalledWith('/api/vcs/github/repositories');
    });
    await waitFor(() => {
      expect(screen.getAllByText('stored Exchange inventory').length).toBeGreaterThan(0);
    });

    expect(
      screen.getByText(/Saved GitHub attachment found, but the live provider session must reconnect/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Bitcode can keep rereading stored repository inventory from Exchange/i),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Reconnect Connects to restore live write admission/i }),
    ).toBeInTheDocument();
    expect(screen.getByText('bitcode/bitcode')).toBeInTheDocument();
    expect(
      screen.getByText(/Stored repository inventory remains readable from Exchange/i),
    ).toBeInTheDocument();
    expect(screen.queryByText(/No active GitHub connection is available/i)).not.toBeInTheDocument();
  });

  it('treats a fully disconnected provider as no inventory-bearing repository context', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      headers: { get: () => 'application/json' },
      json: async () => ({
        connected: false,
        provider: 'github',
        valid: false,
      }),
    }) as jest.Mock;

    render(<ApplicationRepositoryContextPanel />);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith('/api/vcs/github/connection');
    });
    await waitFor(() => {
      expect(screen.getByText(/No active GitHub connection is available/i)).toBeInTheDocument();
    });

    expect(screen.getByTestId('mock-repository-selector')).toHaveTextContent(
      'Connect a repository provider first... :: 0',
    );
    expect(screen.queryByText(/Saved GitHub attachment found, but the live provider session must reconnect/i)).toBeNull();
  });
});
