"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mutateUserData = mutateUserData;
exports.useUserData = useUserData;
// Centralised user data fetch & cache so all UI surfaces (Nav, the BTD balance
// tracker, auxillaries, etc.) share a single source of truth and avoid
// inconsistent intermediate states.
const react_1 = require("react");
const auxillary_pane_meta_1 = require("@/app/auxillaries/components/auxillary-pane-meta");
const profile_contract_1 = require("@bitcode/orm/src/profile-contract");
const ANONYMOUS_USER_DATA = {
    profile: null,
    githubConnection: null,
    btdBalance: 0,
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
let cached = null;
let inFlight = null;
async function fetchUserData() {
    // Return the cached object immediately if available so callers can render
    // synchronously while we start a background revalidation (handled in the
    // hook).
    if (cached)
        return cached;
    // If a request is already in-flight, return the shared promise.
    if (inFlight)
        return inFlight;
    inFlight = (async () => {
        try {
            const res = await fetch('/api/auxillaries/data');
            if (res.status === 401) {
                cached = ANONYMOUS_USER_DATA;
                return cached;
            }
            if (!res.ok)
                throw new Error(`Status ${res.status}`);
            const data = (await res.json());
            cached = data;
            return data;
        }
        finally {
            inFlight = null;
        }
    })();
    return inFlight;
}
// Force refresh (invalidates cache).  Returned promise resolves to the fresh
// value so callers can await.
async function mutateUserData() {
    cached = null;
    return fetchUserData();
}
/**
 * React hook that returns the aggregated user data plus derived convenience
 * booleans.  All components that call this hook receive the same object
 * reference (after the first fetch) which prevents divergent state and the
 * “flipping” nav bug where different widgets would overwrite each other.
 */
function useUserData() {
    // Seed the BTD balance from localStorage synchronously so we can render an immediate
    // non-zero balance while the network request is pending.
    const hydratedBtdBalance = (() => {
        try {
            if (typeof window === 'undefined')
                return 0;
            const raw = localStorage.getItem('btd_balance_cached');
            return raw ? parseInt(raw, 10) || 0 : 0;
        }
        catch {
            return 0;
        }
    })();
    const [data, setData] = (0, react_1.useState)(cached);
    const [error, setError] = (0, react_1.useState)(null);
    const isLoading = data === null && error === null;
    const refresh = (0, react_1.useCallback)(async () => {
        try {
            const fresh = await mutateUserData();
            setData(fresh);
            const balance = typeof fresh.btdBalance === 'number' ? fresh.btdBalance : null;
            if (typeof balance === 'number') {
                try {
                    localStorage.setItem('btd_balance_cached', String(balance));
                }
                catch {
                    // ignore quota / privacy errors
                }
            }
        }
        catch (err) {
            setError(err);
        }
    }, []);
    (0, react_1.useEffect)(() => {
        let cancelled = false;
        fetchUserData()
            .then((d) => {
            if (!cancelled) {
                setData(d);
                const balance = typeof d.btdBalance === 'number' ? d.btdBalance : null;
                if (typeof balance === 'number') {
                    try {
                        localStorage.setItem('btd_balance_cached', String(balance));
                    }
                    catch {
                        // ignore
                    }
                }
            }
        })
            .catch((err) => {
            if (!cancelled)
                setError(err);
        });
        return () => {
            cancelled = true;
        };
    }, []);
    const hasGitHubConnection = Boolean(data?.githubConnection || data?.vcsConnections?.some(conn => conn.provider === 'github'));
    const walletCapability = (0, profile_contract_1.readBitcodeWalletCapabilityFromProfile)(data?.profile ?? null);
    const hasWalletConnection = walletCapability.hasIdentity;
    const hasVerifiedWalletConnection = walletCapability.isVerifiedSigner;
    const walletBindingStatus = walletCapability.binding?.status ?? null;
    const btdBalance = typeof data?.btdBalance === 'number' ? data.btdBalance : hydratedBtdBalance;
    const onboardedSteps = (0, auxillary_pane_meta_1.normalizeAuxillarySteps)(data?.onboardedPanes ?? data?.onboarded_steps ?? []);
    const isOnboardingComplete = data?.isOnboardingComplete || false;
    return {
        data,
        hasGitHubConnection,
        hasWalletConnection,
        hasVerifiedWalletConnection,
        walletBindingStatus,
        btdBalance,
        isLoading,
        error,
        refresh,
        isOnboardingComplete,
        onboardedSteps
    };
}
