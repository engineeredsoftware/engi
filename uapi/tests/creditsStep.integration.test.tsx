import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, act } from '@testing-library/react';
import CreditsStep from '@/app/orbitals/components/OrbitalCredits';

describe('CreditsStep interactions', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });
  afterAll(() => {
    jest.useRealTimers();
  });

  it('applies promo code and triggers completion callback', () => {
    const onCompletionStatusChange = jest.fn();
    render(
      <CreditsStep
        onSave={() => {}}
        isFirstTimeUser={false}
        isDevMode={false}
        onCompletionStatusChange={onCompletionStatusChange}
        initialCredits={0}
      />
    );
    // Promo code input and button
    const input = screen.getByPlaceholderText('Enter promo code');
    const applyButton = screen.getByRole('button', { name: 'Apply' });
    // Enter code
    fireEvent.change(input, { target: { value: 'PROMO123' } });
    // Click apply
    fireEvent.click(applyButton);
    // Should show loading spinner
    expect(screen.getByRole('button')).toContainElement(screen.getByText((_, el) => el.classList.contains('loading-spinner')));
    // Advance timers to simulate async
    act(() => { jest.advanceTimersByTime(1500); });
    // After application, button shows 'Applied'
    expect(screen.getByText('Applied')).toBeInTheDocument();
    // Completion callback called
    expect(onCompletionStatusChange).toHaveBeenCalledWith(true);
  });
});
