import '@testing-library/jest-dom';
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import OrbitalsPaneTabs from '@/app/orbitals/components/shared/OrbitalsPaneTabs';

describe('OrbitalsPaneTabs', () => {
  it('renders calmer application tabs and only fires for available steps', () => {
    const onStepClick = jest.fn();

    render(
      <OrbitalsPaneTabs
        mode="auxillaries"
        steps={['connects', 'interfaces', 'profile', 'btd']}
        currentStep="connects"
        completedSteps={['connects']}
        availableSteps={['connects', 'interfaces', 'profile']}
        onStepClick={onStepClick}
      />,
    );

    expect(screen.getByText('Auxillaries')).toBeTruthy();
    expect(screen.getByText(/Active auxillary:/i)).toBeTruthy();
    expect(screen.getByText('1/4 complete')).toBeTruthy();
    expect(screen.getByRole('button', { name: /1 Connects/i })).toBeTruthy();
    expect(screen.getByRole('button', { name: /4 \$BTD/i })).toBeDisabled();

    fireEvent.click(screen.getByRole('button', { name: /2 Interfaces/i }));
    fireEvent.click(screen.getByRole('button', { name: /4 \$BTD/i }));

    expect(onStepClick).toHaveBeenCalledTimes(1);
    expect(onStepClick).toHaveBeenCalledWith('interfaces');
  });
});
