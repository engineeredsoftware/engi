import '@testing-library/jest-dom';
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import TerminalFloatingDebugWidget from '@/app/terminal/TerminalFloatingDebugWidget';

describe('TerminalFloatingDebugWidget', () => {
  it('opens the debug surface and forwards environment-mode changes', () => {
    const onDebugEnabledChange = jest.fn();
    const onEnvironmentModeChange = jest.fn();
    const { rerender } = render(
      <TerminalFloatingDebugWidget
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
      <TerminalFloatingDebugWidget
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

    expect(screen.getByText('Terminal runtime posture')).toBeInTheDocument();
    expect(screen.getByText('review-fallback')).toBeInTheDocument();
    expect(screen.getByText('tx-42')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Development' }));
    expect(onEnvironmentModeChange).toHaveBeenCalledWith('development');

    fireEvent.click(screen.getByRole('button', { name: 'Close debug widget' }));
    expect(onDebugEnabledChange).toHaveBeenCalledWith(false);
  });
});
