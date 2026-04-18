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
  readBitcodeApplicationShellControls,
  readBitcodeApplicationShellSnapshot,
} from '@bitcode/bitcode/src/client-entry.js';

export type BitcodeApplicationShellSnapshot = Awaited<ReturnType<typeof readBitcodeApplicationShellSnapshot>>;

export type BitcodeApplicationShellControls = {
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
  resetApplication?: () => unknown | Promise<unknown>;
  refresh?: () => unknown | Promise<unknown>;
} | null;

type ApplicationShellBridgeContextValue = {
  snapshot: BitcodeApplicationShellSnapshot;
  controls: BitcodeApplicationShellControls;
  lastUpdatedAt: number;
  refresh: () => Promise<BitcodeApplicationShellSnapshot>;
  runControl: <T>(callback: (controls: NonNullable<BitcodeApplicationShellControls>) => T | Promise<T>) => Promise<T | null>;
};

const POLL_INTERVAL_MS = 800;

const ApplicationShellBridgeContext = createContext<ApplicationShellBridgeContextValue | null>(null);

export function ApplicationShellBridgeProvider({ children }: { children: ReactNode }) {
  const [snapshot, setSnapshot] = useState<BitcodeApplicationShellSnapshot>(null);
  const [controls, setControls] = useState<BitcodeApplicationShellControls>(null);
  const [lastUpdatedAt, setLastUpdatedAt] = useState(0);
  const mountedRef = useRef(true);
  const controlsRef = useRef<BitcodeApplicationShellControls>(null);

  const refresh = useCallback(async () => {
    try {
      const [nextSnapshot, nextControls] = await Promise.all([
        readBitcodeApplicationShellSnapshot(),
        readBitcodeApplicationShellControls(),
      ]);

      if (!mountedRef.current) return nextSnapshot;

      controlsRef.current = nextControls as BitcodeApplicationShellControls;
      setSnapshot(nextSnapshot);
      setControls(nextControls as BitcodeApplicationShellControls);
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

  const runControl = useCallback<ApplicationShellBridgeContextValue['runControl']>(
    async (callback) => {
      const activeControls =
        controlsRef.current ?? ((await readBitcodeApplicationShellControls()) as BitcodeApplicationShellControls);

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

  const value = useMemo<ApplicationShellBridgeContextValue>(
    () => ({
      snapshot,
      controls,
      lastUpdatedAt,
      refresh,
      runControl,
    }),
    [controls, lastUpdatedAt, refresh, runControl, snapshot],
  );

  return <ApplicationShellBridgeContext.Provider value={value}>{children}</ApplicationShellBridgeContext.Provider>;
}

export function useApplicationShellBridge() {
  const context = useContext(ApplicationShellBridgeContext);
  if (!context) {
    throw new Error('useApplicationShellBridge must be used within an ApplicationShellBridgeProvider.');
  }
  return context;
}
