import React from 'react';
import { render, screen } from '@testing-library/react';
import ModelsPane from '@/app/orbitals/components/OrbitalModelsPane';
import { SUPPORTED_LLM_MODELS } from '@/utils/model-pricing';

describe('Models Pane uses centralized model catalog', () => {
  test('renders entries for each provider first model', () => {
    const initialModelPreferences = { };
    render(
      <ModelsPane
        onSave={jest.fn()}
        loading={false}
        isOnboardingComplete={true}
        initialModelPreferences={initialModelPreferences}
      />
    );

    // For robustness, assert at least one entry per provider is rendered
    SUPPORTED_LLM_MODELS.forEach((prov) => {
      const first = prov.models[0];
      if (!first) return;
      const expected = `${prov.provider.toUpperCase()} · ${first.id}`;
      expect(screen.getByText(expected)).toBeInTheDocument();
    });
  });
});
