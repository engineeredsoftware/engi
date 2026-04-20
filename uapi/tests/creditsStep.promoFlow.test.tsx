import React from 'react';
// Stub ProcessingIndicator to avoid JSX runtime errors
jest.mock('@/components/base/engi/indicators/processing-indicator', () => ({ ProcessingIndicator: () => null }));
import '@testing-library/jest-dom';
import { render, screen, fireEvent, act } from '@testing-library/react';
import CreditsStep from '@/app/orbitals/components/OrbitalsCredits';

describe('CreditsStep Promo Code Flow', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });
  beforeEach(() => {
    // Stub fetch for usage data
    global.fetch = jest.fn().mockResolvedValue({ ok: true, json: async () => [] });
  });
  afterAll(() => {
    jest.useRealTimers();
    delete (global as any).fetch;
  });

  it('disables apply button when input empty and applies promo correctly', () => {
    const onCompletionStatusChange = jest.fn();
    render(
      <CreditsStep
        onSave={() => {}}
        loading={false}
        isFirstTimeUser={true}
        onCompletionStatusChange={onCompletionStatusChange}
        initialCredits={0}
      />
    );
    const applyBtn = screen.getByTestId('credits-apply-button');
    const input = screen.getByTestId('credits-promo-input');
    // Initially disabled
    expect(applyBtn).toBeDisabled();
    // Enter promo code
    fireEvent.change(input, { target: { value: 'PROMO123' } });
    expect(applyBtn).toBeEnabled();
    // Click apply
    fireEvent.click(applyBtn);
    // Spinner appears
    expect(applyBtn.querySelector('.loading-spinner')).toBeInTheDocument();
    // Advance timers to complete promo simulation
    act(() => {
      jest.advanceTimersByTime(1500);
    });
    // Button now shows Applied text
    expect(screen.getByText('Applied')).toBeInTheDocument();
    // Callback invoked
    expect(onCompletionStatusChange).toHaveBeenCalledWith(true);
    // Input disabled after applying
    expect(input).toBeDisabled();
  });
});
