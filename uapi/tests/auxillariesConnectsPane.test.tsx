import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';

import AuxillariesConnectsPane from '@/app/auxillaries/components/AuxillariesConnectsPane';
import { useAuth } from '@/components/base/bitcode/auth/AuthProvider';
import { useUserData } from '@/hooks/useUserData';

jest.mock('@/components/base/bitcode/auth/AuthProvider', () => ({
  useAuth: jest.fn(),
}));

jest.mock('@/hooks/useUserData', () => ({
  useUserData: jest.fn(),
}));

jest.mock('@/components/base/bitcode/vcs/VCSIntegrationPanel', () => ({
  VCSIntegrationPanel: function MockVCSIntegrationPanel() {
    return <div data-testid="mock-vcs-integration-panel">VCS integration panel</div>;
  },
}));

jest.mock('@/app/auxillaries/components/headers/AuxillariesConnectsPaneHeader', () => ({
  __esModule: true,
  default: function MockAuxillariesConnectsPaneHeader() {
    return <div data-testid="mock-connects-header">Connects header</div>;
  },
}));

const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;
const mockUseUserData = useUserData as jest.MockedFunction<typeof useUserData>;

describe('AuxillariesConnectsPane', () => {
  beforeEach(() => {
    mockUseAuth.mockReturnValue({
      user: {
        id: 'user-1',
        email: 'operator@bitcode.ai',
      },
      loading: false,
    } as any);

    mockUseUserData.mockReturnValue({
      data: {
        profile: {
          wallet_address: 'bc1qbitcodeoperator',
        },
      },
      hasGitHubConnection: true,
      hasValidGitHubConnection: true,
      hasWalletConnection: true,
      hasVerifiedWalletConnection: false,
      walletBindingStatus: 'manual',
      repositoryConnectionStatus: {
        connected: true,
        provider: 'github',
        valid: true,
      },
      repositories: [
        {
          id: 'repo-1',
          name: 'bitcode',
          fullName: 'bitcode/bitcode',
          defaultBranch: 'main',
          owner: { username: 'bitcode', type: 'organization' },
        },
        {
          id: 'repo-2',
          name: 'bitcode-core',
          fullName: 'bitcode/bitcode-core',
          defaultBranch: 'main',
          owner: { username: 'bitcode', type: 'organization' },
        },
      ],
      repositoryInventorySource: 'stored_repository_inventory',
      organizations: ['bitcode'],
      btdBalance: 1200,
      isLoading: false,
      error: null,
      refresh: jest.fn(),
      isOnboardingComplete: true,
      onboardedSteps: ['profile', 'connects', 'interfaces', 'btd'],
    } as any);
  });

  it('surfaces the canonical repository inventory basis alongside connected scope', () => {
    render(
      <AuxillariesConnectsPane
        onSave={jest.fn()}
        loading={false}
        isOnboardingComplete
      />,
    );

    expect(screen.getByText('Inventory source')).toBeInTheDocument();
    expect(screen.getAllByText('stored Exchange inventory').length).toBeGreaterThan(0);
    expect(
      screen.getByText(/the current source of truth is stored Exchange inventory/i),
    ).toBeInTheDocument();
    expect(screen.getByText('Connected Repositories (2)')).toBeInTheDocument();
    expect(screen.getByText('bitcode/bitcode')).toBeInTheDocument();
    expect(screen.getByText('bitcode/bitcode-core')).toBeInTheDocument();
    expect(
      screen.getByText(/same stored-first or live-fallback inventory contract/i),
    ).toBeInTheDocument();
  });

  it('treats an invalid saved provider session as reconnect-required readiness', () => {
    mockUseUserData.mockReturnValue({
      data: {
        profile: {
          wallet_address: 'bc1qbitcodeoperator',
        },
      },
      hasGitHubConnection: true,
      hasValidGitHubConnection: false,
      hasWalletConnection: true,
      hasVerifiedWalletConnection: true,
      walletBindingStatus: 'verified',
      repositoryConnectionStatus: {
        connected: true,
        provider: 'github',
        valid: false,
      },
      repositories: [
        {
          id: 'repo-1',
          name: 'bitcode',
          fullName: 'bitcode/bitcode',
          defaultBranch: 'main',
          owner: { username: 'bitcode', type: 'organization' },
        },
      ],
      repositoryInventorySource: 'stored_repository_inventory',
      organizations: ['bitcode'],
      btdBalance: 1200,
      isLoading: false,
      error: null,
      refresh: jest.fn(),
      isOnboardingComplete: true,
      onboardedSteps: ['profile', 'connects', 'interfaces', 'btd'],
    } as any);

    render(
      <AuxillariesConnectsPane
        onSave={jest.fn()}
        loading={false}
        isOnboardingComplete
      />,
    );

    expect(screen.getByText('Reconnect required')).toBeInTheDocument();
    expect(screen.getByText(/repository-provider attachment, but the live provider session is no longer valid/i)).toBeInTheDocument();
    expect(screen.getByText(/write admission will fail closed until the live provider connection is restored/i)).toBeInTheDocument();
  });
});
