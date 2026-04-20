import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';

import OrbitalsContent from '@/app/auxillaries/components/AuxillariesContent';

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

    expect(screen.getAllByText('Auxillaries access')).toHaveLength(2);
    expect(
      screen.getByText(
        /sign in once, then keep connects, interfaces, profile, and \$btd in one contained auxillary read/i,
      ),
    ).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Connects auxillary' })).toBeTruthy();
    expect(screen.queryByText(/Ring 1/i)).toBeNull();
    expect(screen.getByText(/Active auxillary:/i)).toBeTruthy();
    expect(screen.getByText('Pane connects')).toBeTruthy();
  });
});
