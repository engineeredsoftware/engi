"use client";

// Centralised user data fetch & cache so all UI surfaces (Nav, the BTD balance
// tracker, auxillaries, etc.) share a single source of truth and avoid
// inconsistent intermediate states.

import { useState, useEffect, useCallback } from 'react';

import { normalizeAuxillarySteps } from '@/app/auxillaries/components/auxillary-pane-meta';
import { readBitcodeWalletCapabilityFromProfile } from '@bitcode/orm';

type UserRepositoryInventorySource =
  | 'stored_repository_inventory'
  | 'live_provider_inventory'
  | 'mock_repository_inventory';

export interface AggregatedUserData {
  profile?: any | null;
  vcsConnections?: any[];
  githubConnection?: any | null;
  repositories?: any[];
  repositoryInventorySource?: UserRepositoryInventorySource | null;
  organizations?: string[];
  btdBalance?: number;
  modelPreferences?: any | null;
  onboardedPanes?: string[];
  onboarded_steps?: string[];
  isOnboardingComplete?: boolean;
}

const ANONYMOUS_USER_DATA: AggregatedUserData = {
  profile: null,
  githubConnection: null,
  repositories: [],
  repositoryInventorySource: null,
  organizations: [],
  btdBalance: 0,
  modelPreferences: null,
  onboardedPanes: [],
  onboarded_steps: [],
  isOnboardingComplete: false,
};

function readRepositoryOwnerUsername(repository: unknown) {
  if (!repository || typeof repository !== 'object') return null;
  const repositoryRecord = repository as Record<string, unknown>;
  const owner = repositoryRecord.owner;

  if (owner && typeof owner === 'object') {
    const ownerRecord = owner as Record<string, unknown>;
    if (typeof ownerRecord.username === 'string' && ownerRecord.username.trim()) {
      return ownerRecord.username.trim();
    }
    if (typeof ownerRecord.login === 'string' && ownerRecord.login.trim()) {
      return ownerRecord.login.trim();
    }
  }

  const fullNameCandidate =
    typeof repositoryRecord.fullName === 'string'
      ? repositoryRecord.fullName
      : typeof repositoryRecord.full_name === 'string'
        ? repositoryRecord.full_name
        : null;
  if (!fullNameCandidate || !fullNameCandidate.includes('/')) return null;

  const [ownerUsername] = fullNameCandidate.split('/');
  return ownerUsername?.trim() || null;
}

function readRepositoryOwnerType(repository: unknown) {
  if (!repository || typeof repository !== 'object') return null;
  const owner = (repository as Record<string, unknown>).owner;
  if (!owner || typeof owner !== 'object') return null;

  const ownerType = (owner as Record<string, unknown>).type;
  return typeof ownerType === 'string' && ownerType.trim() ? ownerType.trim().toLowerCase() : null;
}

function deriveConnectedOrganizations(
  repositories: unknown[],
  fallbackOrganizations: unknown,
) {
  if (Array.isArray(fallbackOrganizations)) {
    const normalizedOrganizations = fallbackOrganizations
      .map((organization) => (typeof organization === 'string' ? organization.trim() : ''))
      .filter(Boolean);
    if (normalizedOrganizations.length > 0) {
      return Array.from(new Set(normalizedOrganizations));
    }
  }

  return Array.from(
    new Set(
      repositories
        .filter((repository) => readRepositoryOwnerType(repository) === 'organization')
        .map((repository) => readRepositoryOwnerUsername(repository))
        .filter((organization): organization is string => Boolean(organization)),
    ),
  );
}

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
  // Seed the BTD balance from localStorage synchronously so we can render an immediate
  // non-zero balance while the network request is pending.
  const hydratedBtdBalance = (() => {
    try {
      if (typeof window === 'undefined') return 0;
      const raw = localStorage.getItem('btd_balance_cached');
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
      const balance = typeof fresh.btdBalance === 'number' ? fresh.btdBalance : null;
      if (typeof balance === 'number') {
        try {
          localStorage.setItem('btd_balance_cached', String(balance));
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
          const balance = typeof d.btdBalance === 'number' ? d.btdBalance : null;
          if (typeof balance === 'number') {
            try {
              localStorage.setItem('btd_balance_cached', String(balance));
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
  const walletCapability = readBitcodeWalletCapabilityFromProfile(
    (data?.profile as Record<string, unknown> | null | undefined) ?? null,
  );
  const hasWalletConnection = walletCapability.hasIdentity;
  const hasVerifiedWalletConnection = walletCapability.isVerifiedSigner;
  const walletBindingStatus = walletCapability.binding?.status ?? null;
  const repositories = Array.isArray(data?.repositories) ? data.repositories : [];
  const repositoryInventorySource =
    typeof data?.repositoryInventorySource === 'string'
      ? (data.repositoryInventorySource as UserRepositoryInventorySource)
      : null;
  const organizations = deriveConnectedOrganizations(repositories, data?.organizations);
  const btdBalance = typeof data?.btdBalance === 'number' ? data.btdBalance : hydratedBtdBalance;

  const onboardedSteps = normalizeAuxillarySteps(data?.onboardedPanes ?? data?.onboarded_steps ?? []);
  const isOnboardingComplete = data?.isOnboardingComplete || false;

  return {
    data,
    hasGitHubConnection,
    hasWalletConnection,
    hasVerifiedWalletConnection,
    walletBindingStatus,
    repositories,
    repositoryInventorySource,
    organizations,
    btdBalance,
    isLoading,
    error,
    refresh,
    isOnboardingComplete,
    onboardedSteps
  } as const;
}
