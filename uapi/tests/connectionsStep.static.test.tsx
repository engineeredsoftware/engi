import React from 'react';
import { renderToString } from 'react-dom/server';
import ConnectionsStep from '@/app/auxillaries/components/AuxillariesConnects';

jest.mock('@/components/base/engi/auth/AuthProvider', () => ({
  useAuth: () => ({ user: null }),
}));

jest.mock('@/hooks/useUserData', () => ({
  useUserData: () => ({
    data: null,
    hasGitHubConnection: false,
    isLoading: false,
    refresh: jest.fn(),
  }),
}));

jest.mock('@/components/base/engi/vcs/VCSIntegrationPanel', () => ({
  VCSIntegrationPanel: () => <div>GitHub panel</div>,
}));

describe('ConnectionsStep SSR Onboarding View', () => {
  it('renders Bitcode connects access posture for signed-out readers', () => {
    const html = renderToString(
      <ConnectionsStep
        loading={false}
        isFirstTimeUser={true}
        isDevMode={false}
        initialConnectionData={null}
        onCompletionStatusChange={() => {}}
        onSave={() => {}}
      />
    );
    expect(html).toContain('Connects Auxillary');
    expect(html).toContain('Orbital step <!-- -->2');
    expect(html).toContain('Sign in to open Connects');
    expect(html).toContain('Open Profile orbital');
  });
});
