"use client";

// Centralised user data fetch & cache so all UI surfaces (Nav, CreditsTracker,
// orbitals, etc.) share a single source of truth and avoid inconsistent
// intermediate states.

import { useState, useEffect, useCallback } from 'react';

import { normalizeAuxillarySteps } from '@/app/auxillaries/components/auxillary-pane-meta';

export interface AggregatedUserData {
  profile?: any | null;
  vcsConnections?: any[];
  githubConnection?: any | null;
  credits?: number;
  modelPreferences?: any | null;
  onboardedPanes?: string[];
  onboarded_steps?: string[];
  isOnboardingComplete?: boolean;
}

const ANONYMOUS_USER_DATA: AggregatedUserData = {
  profile: null,
  githubConnection: null,
  credits: 0,
  modelPreferences: null,
  onboardedPanes: [],
  onboarded_steps: [],
  isOnboardingComplete: false,
};

// ---------------------------------------------------------------------------
// Very lightweight shared cache (module-level).  We intentionally avoid adding
// a new runtime dependency (e.g. SWR or React Query) to keep the patch
// footprint minimal.
// ---------------------------------------------------------------------------

let cached: AggregatedUserData | null = null;
let inFlight: Promise<AggregatedUserData> | null = null;

async function fetchUserData(): Promise<AggregatedUserData> {
  // Return the cached object immediately if available so callers can render
  // synchronously while we start a background revalidation (handled in the
  // hook).
  if (cached) return cached;

  // If a request is already in-flight, return the shared promise.
  if (inFlight) return inFlight;

  inFlight = (async () => {
    try {
      const res = await fetch('/api/auxillaries/data');
      if (res.status === 401) {
        cached = ANONYMOUS_USER_DATA;
        return cached;
      }
      if (!res.ok) throw new Error(`Status ${res.status}`);
      const data = (await res.json()) as AggregatedUserData;
      cached = data;
      return data;
    } finally {
      inFlight = null;
    }
  })();

  return inFlight;
}

// Force refresh (invalidates cache).  Returned promise resolves to the fresh
// value so callers can await.
export async function mutateUserData(): Promise<AggregatedUserData> {
  cached = null;
  return fetchUserData();
}

/**
 * React hook that returns the aggregated user data plus derived convenience
 * booleans.  All components that call this hook receive the same object
 * reference (after the first fetch) which prevents divergent state and the
 * “flipping” nav bug where different widgets would overwrite each other.
 */
export function useUserData() {
  // Seed credits from localStorage synchronously so we can render an immediate
  // non-zero balance while the network request is pending.
  const hydratedCredits = (() => {
    try {
      if (typeof window === 'undefined') return 0;
      const raw = localStorage.getItem('credits_cached');
      return raw ? parseInt(raw, 10) || 0 : 0;
    } catch {
      return 0;
    }
  })();

  const [data, setData] = useState<AggregatedUserData | null>(cached);
  const [error, setError] = useState<unknown>(null);
  const isLoading = data === null && error === null;

  const refresh = useCallback(async () => {
    try {
      const fresh = await mutateUserData();
      setData(fresh);
      if (typeof fresh.credits === 'number') {
        try {
          localStorage.setItem('credits_cached', String(fresh.credits));
        } catch {
          // ignore quota / privacy errors
        }
      }
    } catch (err) {
      setError(err);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    fetchUserData()
      .then((d) => {
        if (!cancelled) {
          setData(d);
          if (typeof d.credits === 'number') {
            try {
              localStorage.setItem('credits_cached', String(d.credits));
            } catch {
              // ignore
            }
          }
        }
      })
      .catch((err) => {
        if (!cancelled) setError(err);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const hasGitHubConnection = Boolean(
    data?.githubConnection || data?.vcsConnections?.some(conn => conn.provider === 'github')
  );
  const credits = typeof data?.credits === 'number' ? data.credits : hydratedCredits;

  const onboardedSteps = normalizeAuxillarySteps(data?.onboardedPanes ?? data?.onboarded_steps ?? []);
  const isOnboardingComplete = data?.isOnboardingComplete || false;

  return {
    data,
    hasGitHubConnection,
    credits,
    isLoading,
    error,
    refresh,
    isOnboardingComplete,
    onboardedSteps
  } as const;
}
