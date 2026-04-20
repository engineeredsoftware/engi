import React from 'react';
import { renderToString } from 'react-dom/server';
import CreditsStep from '@/app/orbitals/components/OrbitalsCredits';

describe('CreditsStep (SSR)', () => {
  it('renders credit plan options, promo code section, and initial credits display', () => {
    const html = renderToString(
      <CreditsStep
        onSave={() => {}}
        isFirstTimeUser={false}
        isDevMode={false}
        onCompletionStatusChange={() => {}}
        initialCredits={250}
      />
    );
    // Check common credit plan names
    expect(html).toContain('Micro');
    expect(html).toContain('Mini');
    expect(html).toContain('Starter');
    expect(html).toContain('Production');
    expect(html).toContain('Industry');
    // Promo code card
    expect(html).toContain('Have a Promo Code?');
    expect(html).toContain('Enter promo code');
    // Initial credits should appear in usage chart or header
    expect(html).toContain('250');
  });
});
