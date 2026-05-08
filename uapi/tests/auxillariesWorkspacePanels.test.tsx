import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';

import AuxillariesWorkspacePanels from '@/app/auxillaries/components/shared/AuxillariesWorkspacePanels';

describe('AuxillariesWorkspacePanels', () => {
  it('renders lane state as visual indicators instead of joined raw state text', () => {
    render(
      <AuxillariesWorkspacePanels
        steps={['connects', 'interfaces', 'profile', 'btd']}
        currentStep="profile"
        availableSteps={['connects', 'interfaces', 'profile', 'btd']}
        onStepClick={jest.fn()}
      />,
    );

    expect(screen.queryByText(/laneactive/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/laneready/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/^active$/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/^ready$/i)).not.toBeInTheDocument();
    expect(screen.getByLabelText('Active auxillary')).toHaveAttribute('data-state', 'active');
    expect(screen.getAllByLabelText('Ready auxillary')).toHaveLength(3);
  });
});
