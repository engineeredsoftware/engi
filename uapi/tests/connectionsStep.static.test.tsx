import React from 'react';
import { renderToString } from 'react-dom/server';
import ConnectionsStep from '@/app/orbitals/components/OrbitalConnects';

describe('ConnectionsStep SSR Onboarding View', () => {
  it('renders onboarding header, badge, and connect button', () => {
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
    expect(html).toContain('Install GitHub App');
    expect(html).toContain('Step 2 of 4');
    expect(html).toContain('Enter verification code');
    // Verify that the GitHub App marketplace link is present
    expect(html).toContain('https://github.com/marketplace/engi-github-app');
  });
});
