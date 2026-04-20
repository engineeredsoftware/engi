import React, { type ReactNode } from 'react';
import { act, renderHook, waitFor } from '@testing-library/react';

import {
  ApplicationShellBridgeProvider,
  useApplicationShellBridge,
} from '@/app/application/application-shell-bridge';

jest.mock('@bitcode/protocol-demonstration/src/client-entry.js', () => ({
  readBitcodeApplicationShellSnapshot: jest.fn(),
  readBitcodeApplicationShellControls: jest.fn(),
}));

const {
  readBitcodeApplicationShellSnapshot,
  readBitcodeApplicationShellControls,
} = jest.requireMock('@bitcode/protocol-demonstration/src/client-entry.js') as {
  readBitcodeApplicationShellSnapshot: jest.Mock;
  readBitcodeApplicationShellControls: jest.Mock;
};

describe('ApplicationShellBridgeProvider', () => {
  const wrapper = ({ children }: { children: ReactNode }) => (
    <ApplicationShellBridgeProvider>{children}</ApplicationShellBridgeProvider>
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('hydrates snapshot and controls into one shared bridge', async () => {
    readBitcodeApplicationShellSnapshot.mockResolvedValue({
      commandSurface: { status: 'ready' },
    });
    readBitcodeApplicationShellControls.mockResolvedValue({
      refresh: jest.fn(),
    });

    const { result } = renderHook(() => useApplicationShellBridge(), { wrapper });

    await waitFor(() => {
      expect(result.current.snapshot).toEqual({ commandSurface: { status: 'ready' } });
      expect(result.current.controls).toBeTruthy();
    });
  });

  it('runs control actions and refreshes the shared snapshot', async () => {
    const makeBranch = jest.fn();
    readBitcodeApplicationShellSnapshot
      .mockResolvedValueOnce({ commandSurface: { status: 'before' } })
      .mockResolvedValueOnce({ commandSurface: { status: 'after' } });
    readBitcodeApplicationShellControls.mockResolvedValue({
      makeBranch,
    });

    const { result } = renderHook(() => useApplicationShellBridge(), { wrapper });

    await waitFor(() => {
      expect(result.current.snapshot).toEqual({ commandSurface: { status: 'before' } });
    });

    await act(async () => {
      await result.current.runControl(async (controls) => controls.makeBranch?.());
    });

    expect(makeBranch).toHaveBeenCalled();
    await waitFor(() => {
      expect(result.current.snapshot).toEqual({ commandSurface: { status: 'after' } });
    });
  });

  it('fails closed to an empty bridge when snapshot refresh throws', async () => {
    readBitcodeApplicationShellSnapshot.mockRejectedValue(new Error('snapshot unavailable'));
    readBitcodeApplicationShellControls.mockResolvedValue({
      refresh: jest.fn(),
    });

    const { result } = renderHook(() => useApplicationShellBridge(), { wrapper });

    await waitFor(() => {
      expect(result.current.snapshot).toBeNull();
      expect(result.current.controls).toBeNull();
      expect(result.current.lastUpdatedAt).toBeGreaterThan(0);
    });
  });
});
