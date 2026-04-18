import '@testing-library/jest-dom';
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import OrbitalsWorkspacePanels from '@/app/orbitals/components/shared/OrbitalsWorkspacePanels';

describe('OrbitalsWorkspacePanels', () => {
  it('renders contained orbital panels with user-facing layer labels and only opens ready orbitals', () => {
    const onStepClick = jest.fn();

    render(
      <OrbitalsWorkspacePanels
        steps={['connects', 'interfaces', 'profile', 'btd']}
        currentStep="interfaces"
        availableSteps={['connects', 'interfaces', 'profile']}
        onStepClick={onStepClick}
      />,
    );

    expect(screen.getByRole('button', { name: 'Connects orbital' })).toBeEnabled();
    expect(screen.getByRole('button', { name: 'Interfaces orbital' })).toBeEnabled();
    expect(screen.getByRole('button', { name: 'Profile orbital' })).toBeEnabled();
    expect(screen.getByRole('button', { name: '$BTD orbital' })).toBeDisabled();
    expect(screen.getByText('outer ring')).toBeTruthy();
    expect(screen.getByText('core ring')).toBeTruthy();

    fireEvent.click(screen.getByRole('button', { name: 'Connects orbital' }));
    fireEvent.click(screen.getByRole('button', { name: '$BTD orbital' }));

    expect(onStepClick).toHaveBeenCalledTimes(1);
    expect(onStepClick).toHaveBeenCalledWith('connects');
  });
});
