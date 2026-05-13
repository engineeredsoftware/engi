import '@testing-library/jest-dom';
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import AuxillariesWorkspacePanels from '@/app/auxillaries/components/shared/AuxillariesWorkspacePanels';

describe('AuxillariesWorkspacePanels', () => {
  it('renders contained orbital panels with user-facing layer labels and only opens ready orbitals', () => {
    const onStepClick = jest.fn();

    render(
      <AuxillariesWorkspacePanels
        steps={['externals', 'interfaces', 'profile', 'wallet']}
        currentStep="interfaces"
        availableSteps={['externals', 'interfaces', 'profile']}
        onStepClick={onStepClick}
      />,
    );

    expect(screen.getByRole('button', { name: 'Externals auxillary' })).toBeEnabled();
    expect(screen.getByRole('button', { name: 'Interfaces auxillary' })).toBeEnabled();
    expect(screen.getByRole('button', { name: 'Profile auxillary' })).toBeEnabled();
    expect(screen.getByRole('button', { name: '$BTD auxillary' })).toBeDisabled();
    expect(screen.getByText('outer ring')).toBeTruthy();
    expect(screen.getByText('core ring')).toBeTruthy();

    fireEvent.click(screen.getByRole('button', { name: 'Externals auxillary' }));
    fireEvent.click(screen.getByRole('button', { name: '$BTD auxillary' }));

    expect(onStepClick).toHaveBeenCalledTimes(1);
    expect(onStepClick).toHaveBeenCalledWith('externals');
  });
});
