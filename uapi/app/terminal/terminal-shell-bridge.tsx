'use client';

import React from 'react';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';

import {
  readBitcodeDemonstrationShellControls,
  readBitcodeDemonstrationShellSnapshot,
} from '@bitcode/protocol-demonstration/src/client-entry.js';

export type BitcodeTerminalShellSnapshot = Awaited<ReturnType<typeof readBitcodeDemonstrationShellSnapshot>>;

export type BitcodeTerminalShellControls = {
  setScenario?: (value: string) => unknown | Promise<unknown>;
  setProjection?: (value: string) => unknown | Promise<unknown>;
  setBranchMode?: (value: string) => unknown | Promise<unknown>;
  setAuthSession?: (value: string) => unknown | Promise<unknown>;
  setInventoryKind?: (value: string) => unknown | Promise<unknown>;
  setInventorySearch?: (value: string) => unknown | Promise<unknown>;
  toggleInventoryEntry?: (entryId: string) => unknown | Promise<unknown>;
  toggleFlowGuide?: () => unknown | Promise<unknown>;
  toggleTutorial?: () => unknown | Promise<unknown>;
  makeBranch?: () => unknown | Promise<unknown>;
  resetTerminal?: () => unknown | Promise<unknown>;
  refresh?: () => unknown | Promise<unknown>;
} | null;

type TerminalShellBridgeContextValue = {
  snapshot: BitcodeTerminalShellSnapshot;
  controls: BitcodeTerminalShellControls;
  lastUpdatedAt: number;
  refresh: () => Promise<BitcodeTerminalShellSnapshot>;
  runControl: <T>(callback: (controls: NonNullable<BitcodeTerminalShellControls>) => T | Promise<T>) => Promise<T | null>;
};

const POLL_INTERVAL_MS = 800;

const TerminalShellBridgeContext = createContext<TerminalShellBridgeContextValue | null>(null);

export function TerminalShellBridgeProvider({ children }: { children: ReactNode }) {
  const [snapshot, setSnapshot] = useState<BitcodeTerminalShellSnapshot>(null);
  const [controls, setControls] = useState<BitcodeTerminalShellControls>(null);
  const [lastUpdatedAt, setLastUpdatedAt] = useState(0);
  const mountedRef = useRef(true);
  const controlsRef = useRef<BitcodeTerminalShellControls>(null);

  const refresh = useCallback(async () => {
    try {
      const [nextSnapshot, nextControls] = await Promise.all([
        readBitcodeDemonstrationShellSnapshot(),
        readBitcodeDemonstrationShellControls(),
      ]);

      if (!mountedRef.current) return nextSnapshot;

      controlsRef.current = nextControls as BitcodeTerminalShellControls;
      setSnapshot(nextSnapshot);
      setControls(nextControls as BitcodeTerminalShellControls);
      setLastUpdatedAt(Date.now());

      return nextSnapshot;
    } catch {
      if (!mountedRef.current) return null;
      controlsRef.current = null;
      setSnapshot(null);
      setControls(null);
      setLastUpdatedAt(Date.now());
      return null;
    }
  }, []);

  const runControl = useCallback<TerminalShellBridgeContextValue['runControl']>(
    async (callback) => {
      const activeControls =
        controlsRef.current ?? ((await readBitcodeDemonstrationShellControls()) as BitcodeTerminalShellControls);

      if (!activeControls) return null;

      controlsRef.current = activeControls;
      setControls(activeControls);
      const result = await callback(activeControls);
      await refresh();
      return result;
    },
    [refresh],
  );

  useEffect(() => {
    mountedRef.current = true;
    void refresh();

    const intervalId = window.setInterval(() => {
      void refresh();
    }, POLL_INTERVAL_MS);

    return () => {
      mountedRef.current = false;
      window.clearInterval(intervalId);
    };
  }, [refresh]);

  const value = useMemo<TerminalShellBridgeContextValue>(
    () => ({
      snapshot,
      controls,
      lastUpdatedAt,
      refresh,
      runControl,
    }),
    [controls, lastUpdatedAt, refresh, runControl, snapshot],
  );

  return <TerminalShellBridgeContext.Provider value={value}>{children}</TerminalShellBridgeContext.Provider>;
}

export function useTerminalShellBridge() {
  const context = useContext(TerminalShellBridgeContext);
  if (!context) {
    throw new Error('useTerminalShellBridge must be used within an TerminalShellBridgeProvider.');
  }
  return context;
}
