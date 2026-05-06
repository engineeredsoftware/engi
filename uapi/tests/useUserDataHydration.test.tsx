import React from 'react';
import { renderHook, waitFor } from '@testing-library/react';
import { renderToString } from 'react-dom/server';

jest.mock('@bitcode/orm', () => ({
  readBitcodeWalletCapabilityFromProfile: () => ({
    hasIdentity: false,
    isVerifiedSigner: false,
    binding: null,
  }),
}));

import { useUserData } from '@/hooks/useUserData';

function BalanceProbe() {
  const { btdBalance } = useUserData();
  return <span>{btdBalance}</span>;
}

describe('useUserData hydration posture', () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    localStorage.clear();
    global.fetch = jest.fn(() => new Promise<Response>(() => {})) as jest.Mock;
  });

  afterEach(() => {
    localStorage.clear();
    global.fetch = originalFetch;
  });

  it('keeps pre-effect balance markup aligned before reading cached wallet state', () => {
    localStorage.setItem('btd_balance_cached', '1200');

    expect(renderToString(<BalanceProbe />)).toContain('<span>0</span>');
  });

  it('hydrates cached wallet state after mount', async () => {
    localStorage.setItem('btd_balance_cached', '1200');

    const { result } = renderHook(() => useUserData());

    await waitFor(() => {
      expect(result.current.btdBalance).toBe(1200);
    });
  });
});
