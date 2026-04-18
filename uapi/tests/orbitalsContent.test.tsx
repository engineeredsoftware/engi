import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';

import OrbitalsContent from '@/app/orbitals/components/OrbitalsContent';

describe('OrbitalsContent', () => {
  it('keeps the contained orbital workspace layout active even when access uses tab navigation', () => {
    render(
      <OrbitalsContent
        mode="onboarding"
        steps={['profile', 'connects', 'interfaces', 'btd']}
        currentStep="connects"
        completedSteps={['profile']}
        availableSteps={['profile', 'connects']}
        showContent
        showSuccessAnimation={false}
        navigationMode="tabs"
        surfaceVariant="contained"
        onStepClick={() => {}}
        renderStepContent={(step) => <div>Pane {step}</div>}
      />,
    );

    expect(screen.getAllByText('Orbitals access')).toHaveLength(2);
    expect(screen.getByText(/sign in once, then keep profile, connects, interfaces, and \$btd in one contained orbital workspace/i)).toBeTruthy();
    expect(screen.getByText(/Active orbital:/i)).toBeTruthy();
    expect(screen.getByText('Pane connects')).toBeTruthy();
  });
});
