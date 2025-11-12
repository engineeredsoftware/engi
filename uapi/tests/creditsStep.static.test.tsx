// Mock Supabase client and ProcessingIndicator to isolate SSR rendering
jest.mock('@engi/supabase/ssr/client', () => ({ createClient: () => ({}) }));
jest.mock('@/components/base/engi/indicators/processing-indicator', () => ({ ProcessingIndicator: () => null }));
import React from 'react';
import { renderToString } from 'react-dom/server';
import CreditsStep from '@/app/orbitals/components/OrbitalCredits';

describe('CreditsStep SSR Onboarding View', () => {
  it('renders onboarding header, badge, and Micro plan option', () => {
    const html = renderToString(
      <CreditsStep
        onSave={() => {}}
        loading={false}
        isFirstTimeUser={true}
        onCompletionStatusChange={() => {}}
        initialCredits={0}
      />
    );
    expect(html).toContain('Get Started with Credits');
    expect(html).toContain('Step 4 of 4');
    expect(html).toContain('Micro');
    expect(html).toContain('$10');
  });
});
