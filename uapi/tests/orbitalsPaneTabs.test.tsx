import '@testing-library/jest-dom';
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import OrbitalsPaneTabs from '@/app/orbitals/components/shared/OrbitalsPaneTabs';

describe('OrbitalsPaneTabs', () => {
  it('renders calmer application tabs and only fires for available steps', () => {
    const onStepClick = jest.fn();

    render(
      <OrbitalsPaneTabs
        mode="orbitals"
        steps={['profile', 'connects', 'interfaces', 'btd']}
        currentStep="connects"
        completedSteps={['profile']}
        availableSteps={['profile', 'connects', 'interfaces']}
        onStepClick={onStepClick}
      />,
    );

    expect(screen.getByText('Orbitals')).toBeTruthy();
    expect(screen.getByText(/Current section:/i)).toBeTruthy();
    expect(screen.getByText('1/4 ready')).toBeTruthy();
    expect(screen.getByRole('button', { name: /2 Connects/i })).toBeTruthy();
    expect(screen.getByRole('button', { name: /4 \$BTD/i })).toBeDisabled();

    fireEvent.click(screen.getByRole('button', { name: /3 Interfaces/i }));
    fireEvent.click(screen.getByRole('button', { name: /4 \$BTD/i }));

    expect(onStepClick).toHaveBeenCalledTimes(1);
    expect(onStepClick).toHaveBeenCalledWith('interfaces');
  });
});
