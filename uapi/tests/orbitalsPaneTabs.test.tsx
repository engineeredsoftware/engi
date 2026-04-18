import '@testing-library/jest-dom';
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import OrbitalsPaneTabs from '@/app/orbitals/components/shared/OrbitalsPaneTabs';

describe('OrbitalsPaneTabs', () => {
  it('renders calmer application tabs and only fires for available steps', () => {
    const onStepClick = jest.fn();

    render(
      <OrbitalsPaneTabs
        mode="settings"
        steps={['profile', 'connects', 'models', 'credits']}
        currentStep="connects"
        completedSteps={['profile']}
        availableSteps={['profile', 'connects', 'models']}
        onStepClick={onStepClick}
      />,
    );

    expect(screen.getByText('Settings')).toBeTruthy();
    expect(screen.getByText(/Current section:/i)).toBeTruthy();
    expect(screen.getByText('1/4 ready')).toBeTruthy();
    expect(screen.getByRole('button', { name: /2 Connects/i })).toBeTruthy();
    expect(screen.getByRole('button', { name: /4 Credits/i })).toBeDisabled();

    fireEvent.click(screen.getByRole('button', { name: /3 Models/i }));
    fireEvent.click(screen.getByRole('button', { name: /4 Credits/i }));

    expect(onStepClick).toHaveBeenCalledTimes(1);
    expect(onStepClick).toHaveBeenCalledWith('models');
  });
});
