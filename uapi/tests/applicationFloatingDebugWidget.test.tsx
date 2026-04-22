import '@testing-library/jest-dom';
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import ApplicationFloatingDebugWidget from '@/app/application/ApplicationFloatingDebugWidget';

describe('ApplicationFloatingDebugWidget', () => {
  it('opens the debug surface and forwards environment-mode changes', () => {
    const onDebugEnabledChange = jest.fn();
    const onEnvironmentModeChange = jest.fn();
    const { rerender } = render(
      <ApplicationFloatingDebugWidget
        debugEnabled={false}
        environmentMode={null}
        transactionDataMode="live"
        selectedTransactionId={null}
        hasRepositoryAnchor={false}
        hasVerifiedWalletBinding={false}
        onDebugEnabledChange={onDebugEnabledChange}
        onEnvironmentModeChange={onEnvironmentModeChange}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Debug' }));
    expect(onDebugEnabledChange).toHaveBeenCalledWith(true);

    rerender(
      <ApplicationFloatingDebugWidget
        debugEnabled
        environmentMode={null}
        transactionDataMode="review-fallback"
        selectedTransactionId="tx-42"
        hasRepositoryAnchor
        hasVerifiedWalletBinding
        onDebugEnabledChange={onDebugEnabledChange}
        onEnvironmentModeChange={onEnvironmentModeChange}
      />,
    );

    expect(screen.getByText('Application runtime posture')).toBeInTheDocument();
    expect(screen.getByText('review-fallback')).toBeInTheDocument();
    expect(screen.getByText('tx-42')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Development' }));
    expect(onEnvironmentModeChange).toHaveBeenCalledWith('development');

    fireEvent.click(screen.getByRole('button', { name: 'Close debug widget' }));
    expect(onDebugEnabledChange).toHaveBeenCalledWith(false);
  });
});
