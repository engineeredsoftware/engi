// Canonical auxillary owner using canonical auxillary internals while support-route retirement proceeds.

import React, { useState, useEffect, useMemo, useRef } from 'react';
import LoadingSpinner from '@/components/base/bitcode/indicators/LoadingSpinner';
import { trackEvent } from '@bitcode/google-analytics';
import { reportError } from '@bitcode/errors';
import { createClient } from '@bitcode/supabase/ssr/client';
// Use Supabase client for OTP flows instead of manual fetch
import { motion, AnimatePresence } from 'framer-motion';
import { AfterOnboardingOverlay } from '@/app/auxillaries/components/shared/AfterOnboardingOverlay';
import AuxillariesProfilePaneHeader from '@/app/auxillaries/components/headers/AuxillariesProfilePaneHeader';
import { mutateUserData } from '@/hooks/useUserData';
import {
  connectBitcoinWallet,
  inspectBitcoinWalletProviders,
  type BitcoinWalletConnection,
  type BitcoinWalletProviderId,
  type BitcoinWalletProviderSummary,
} from '@/lib/bitcoin-wallet-client';
import {
  isPlausibleBitcoinAddress,
  readLocalBitcodeWalletIdentity,
  writeLocalBitcodeWalletIdentity,
  type LocalBitcodeWalletIdentity,
} from '@/lib/bitcode-wallet-local';
import { bitcodeQaTelemetry, compactBitcodeAddress } from '../../../lib/bitcode-qa-telemetry';


interface TeamMember {
  id: string;
  username: string;
  displayName: string;
  avatarUrl: string;
  /**
   * Role within the organisation.  Besides the immutable `owner` role we now
   * surface the product-level roles requested by the business: `admin`,
   * `lead` and `dev`.
   */
  role: 'owner' | 'admin' | 'lead' | 'dev';
  /** Invitation / membership status so admins can track onboarding */
  status?: 'invited' | 'accepted';
  btcFeeBudget?: number;
}

/**
 * Data-share posture per GitHub repository: consent toggle and last analysis results.
 */
interface DataShareRepo {
  fullName: string;
  branch: string;
  commit: string;
  enabled: boolean;
  lastAnalysisAt: string | null;
  latestAnalysisResult: any;
}

type SupabaseAuthSession = {
  user?: {
    email?: string | null;
  } | null;
} | null;

const BITCODE_BITCOIN_SUPABASE_PROVIDER = 'custom:bitcode-bitcoin';
const BITCODE_BITCOIN_SUPABASE_SCOPES = 'profile wallet:bitcoin';

function readSupabaseClientReadiness() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !anonKey) {
    return {
      ready: false as const,
      error: 'Supabase staging credentials are not configured for server wallet persistence.',
    };
  }

  if (/your-project\.supabase\.co/i.test(url) || /your[-_]?anon[-_]?key/i.test(anonKey)) {
    return {
      ready: false as const,
      error: 'Supabase staging credentials still use placeholder values.',
    };
  }

  return { ready: true as const };
}

function formatWalletProviderLabel(provider: string | null | undefined) {
  if (!provider) return 'Not connected';
  if (provider === 'xverse') return 'Xverse';
  if (provider === 'leather') return 'Leather';
  if (provider === 'unisat') return 'UniSat';
  if (provider === 'okx-bitcoin') return 'OKX Bitcoin';
  if (provider === 'manual-bitcoin') return 'Manual Bitcoin address';
  if (provider === 'walletconnect') return 'Wallet provider';
  return provider
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function formatWalletReadout(value: string | null | undefined) {
  if (!value) return 'Not provided';
  if (value.length > 24) return compactBitcodeAddress(value, 8) ?? value;
  return value;
}

function buildAvatarDataUri(seed: string, background: string, accent: string) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" fill="none">
      <rect width="96" height="96" rx="28" fill="${background}"/>
      <circle cx="48" cy="34" r="16" fill="${accent}" fill-opacity="0.94"/>
      <path d="M20 80c3-18 16-28 28-28s25 10 28 28" fill="${accent}" fill-opacity="0.76"/>
      <text x="48" y="88" text-anchor="middle" font-family="Arial, sans-serif" font-size="10" fill="white" fill-opacity="0.72">${seed}</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

const AVATAR_OPTIONS = [
  buildAvatarDataUri('A1', '#0f172a', '#67feb7'),
  buildAvatarDataUri('A2', '#111827', '#38bdf8'),
  buildAvatarDataUri('A3', '#1f2937', '#f9c855'),
  buildAvatarDataUri('A4', '#172033', '#c084fc'),
  buildAvatarDataUri('A5', '#0b1324', '#fb7185'),
  buildAvatarDataUri('A6', '#112131', '#22d3ee'),
];

export interface AuxillariesProfilePaneProps {
  onSave: (data: any) => void;
  loading: boolean;
  initialTeamMembers?: TeamMember[];
  /** Initial profile field values */
  initialUsername?: string;
  initialDisplayName?: string;
  initialBio?: string;
  initialCompanyName?: string;
  initialAvatarUrl?: string;
  initialWalletAddress?: string;
  initialWalletProvider?: string;
  initialWalletBindingStatus?: 'pending' | 'manual' | 'verified' | null;
  initialWalletBoundAt?: string | null;
  /** Initial email for account creation and verification */
  initialEmail?: string;
  /** Initial email verification status */
  initialIsVerified?: boolean;
  /** Whether all onboarding steps are completed */
  isOnboardingComplete?: boolean;
  onCompletionStatusChange?: (isComplete: boolean) => void; // Add callback for completion status
}

export default function AuxillariesProfilePane({ onSave,
  loading,
  initialTeamMembers = [],
  initialUsername = '',
  initialDisplayName = '',
  initialBio = '',
  initialCompanyName = '',
  initialAvatarUrl = '',
  initialWalletAddress = '',
  initialWalletProvider = '',
  initialWalletBindingStatus = null,
  initialWalletBoundAt = null,
  initialEmail = '',
  initialIsVerified = false,
  isOnboardingComplete = false,
  onCompletionStatusChange
}: AuxillariesProfilePaneProps) {
  // Use Supabase client for OTP flows
  const [authError, setAuthError] = useState<string | null>(null);
  const [email, setEmail] = useState(initialEmail);
  const suppressProfileAutosaveRef = useRef(false);
  // Update email if initialEmail prop changes (e.g., user session loads)
  useEffect(() => {
    suppressProfileAutosaveRef.current = true;
    setEmail(initialEmail);
  }, [initialEmail]);
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(initialIsVerified);
  // Ref to avoid repeating completion callbacks
  const verifiedRef = useRef<boolean>(initialIsVerified);
  // Update verification status if initialIsVerified prop changes
  useEffect(() => {
    suppressProfileAutosaveRef.current = true;
    setIsVerified(initialIsVerified);
    verifiedRef.current = initialIsVerified;
  }, [initialIsVerified]);
  const [verificationLoading, setVerificationLoading] = useState(false);

  /* ------------------------------------------------------------------
   * Supabase session integration (OAuth / existing login)
   * ------------------------------------------------------------------
   * When the user arrives here after an OAuth flow (Google/GitHub/etc.) the
   * Supabase session will already be initialised and the email is guaranteed
   * to be verified by the provider.  We therefore:
   *   1. Hydrate the component with the session email on mount.
   *   2. Listen for auth state changes so that if the user completes an OAuth
   *      login in a separate tab / popup the profile step updates
   *      reactively without requiring a full page refresh.
   *
   * Updating `email` + `isVerified` triggers the upstream
   * `onCompletionStatusChange` callback which in turn lets the parent flow
   * auto-advance to the next onboarding step.
   */
  useEffect(() => {
    const supabase = createClient();

    // Helper to sync state from the active session.
    const syncFromSession = async () => {
      const { data } = await supabase.auth.getSession();
      const user = data.session?.user;
      if (user && user.email) {
        suppressProfileAutosaveRef.current = true;
        setEmail(user.email);
        // Ensure we trigger completion once.  Track via ref so effect
        // doesn’t depend on `isVerified` which would re-create listeners.
        if (!verifiedRef.current) {
          verifiedRef.current = true;
          setIsVerified(true);
        }
      }
    };

    // Initial sync on mount.
    syncFromSession().catch(() => {});

    // Also listen for explicit postMessage notifications from the OAuth
    // callback popup so that we can refresh instantly even if the Supabase
    // BroadcastChannel lags (Safari private windows etc.).
    const msgHandler = (e: MessageEvent) => {
      if (e.data && e.data.type === 'oauth-login-complete') {
        syncFromSession();
      }
    };
    window.addEventListener('message', msgHandler);

    // Subscribe to future auth changes so we react when the callback page
    // sets the session in localStorage/BroadcastChannel.
    const { data: listener } = supabase.auth.onAuthStateChange((_event: unknown, session: SupabaseAuthSession) => {
      if (session?.user?.email) {
        suppressProfileAutosaveRef.current = true;
        setEmail(session.user.email);
        if (!verifiedRef.current) {
          verifiedRef.current = true;
          setIsVerified(true);
        }
      }
    });

    return () => {
      window.removeEventListener('message', msgHandler);
      listener.subscription.unsubscribe();
    };
  }, []);
  // Handlers for OTP authentication
  const handleSendCode = async () => {
    setAuthError(null);
    setVerificationLoading(true);
    trackEvent('onboarding_profile_verify_code_attempt');
    trackEvent('onboarding_profile_send_code');
    try {
      const supabase = createClient();
      // First attempt: try to create a new account automatically.  Supabase
      // will fail with "User already registered" when the email already
      // exists.  To avoid leaking this information we intercept that specific
      // error and silently retry without `shouldCreateUser`, effectively
      // sending a normal login code instead.

      const { error: createError } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: true,
        },
      });

      if (createError && /already\s+registered/i.test(createError.message)) {
        // Existing user – resend OTP without creating a new account.  Ignore
        // any error from this secondary call to keep the response opaque.
        await supabase.auth.signInWithOtp({
          email,
          options: {
            shouldCreateUser: false,
          },
        });
        setIsVerifying(true);
      } else if (createError) {
        // Other errors – surface a generic message (do not reveal account
        // existence).
        setAuthError('Failed to send verification code. Please try again.');
      } else {
        // Success – verification code sent for a brand-new account.
        setIsVerifying(true);
      }
    } catch (err: any) {
      setAuthError(err.message || 'Error sending code');
    } finally {
      setVerificationLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    setAuthError(null);
    setVerificationLoading(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.verifyOtp({
        email,
        token: verificationCode,
        type: 'email',
      });
      if (error) {
        setAuthError(error.message);
        trackEvent('onboarding_profile_verify_code_error', { message: error.message });
      } else {
        setIsVerified(true);
        verifiedRef.current = true;
        trackEvent('onboarding_profile_verified');
        
        // Save verification status to profile
        try {
          await fetch('/api/auxillaries/profile', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              username: email.split('@')[0], // Use email prefix as default username
              email,
              is_verified: true
            }),
          });
        } catch (saveErr) {
          console.error('Failed to save verification status:', saveErr);
        }
      }
    } catch (err: any) {
      reportError(err);
      setAuthError(err.message || 'Error verifying code');
      trackEvent('onboarding_profile_verify_code_error', { message: err?.message });
    } finally {
      setVerificationLoading(false);
    }
  };
  // Using underscore prefix to indicate intentionally unused state setter
  const [username, _setUsername] = useState(initialUsername);
  const [displayName, setDisplayName] = useState(initialDisplayName);
  const [bio, setBio] = useState(initialBio);
  const [companyName, setCompanyName] = useState(initialCompanyName); // Add company name field
  const [avatarUrl, setAvatarUrl] = useState(initialAvatarUrl);
  const [walletAddress, setWalletAddress] = useState(initialWalletAddress);
  const [walletProvider, setWalletProvider] = useState(
    initialWalletProvider || (initialWalletAddress ? 'manual' : ''),
  );
  const [walletBindingStatus, setWalletBindingStatus] = useState<'pending' | 'manual' | 'verified' | null>(
    initialWalletBindingStatus ?? (initialWalletAddress ? 'manual' : null),
  );
  const [walletBoundAt, setWalletBoundAt] = useState<string | null>(initialWalletBoundAt ?? null);
  const [selectedAvatar, setSelectedAvatar] = useState(0);
  const [showAvatarSelector, setShowAvatarSelector] = useState(false);
  const [walletAuthError, setWalletAuthError] = useState<string | null>(null);
  const [walletAuthNotice, setWalletAuthNotice] = useState<string | null>(null);
  const [walletAuthStatus, setWalletAuthStatus] = useState<'idle' | 'requesting' | 'signed'>('idle');
  const [walletProviderOptions, setWalletProviderOptions] = useState<BitcoinWalletProviderSummary[]>([]);
  const [walletProviderScanStatus, setWalletProviderScanStatus] = useState<'checking' | 'ready' | 'none'>('checking');
  const [walletIdentityDetails, setWalletIdentityDetails] = useState<LocalBitcodeWalletIdentity | null>(() =>
    readLocalBitcodeWalletIdentity(),
  );
  const walletServerPersistenceRef = useRef<string | null>(null);

  useEffect(() => {
    suppressProfileAutosaveRef.current = true;
    _setUsername(initialUsername);
  }, [initialUsername]);

  useEffect(() => {
    suppressProfileAutosaveRef.current = true;
    setDisplayName(initialDisplayName);
  }, [initialDisplayName]);

  useEffect(() => {
    suppressProfileAutosaveRef.current = true;
    setBio(initialBio);
  }, [initialBio]);

  useEffect(() => {
    suppressProfileAutosaveRef.current = true;
    setCompanyName(initialCompanyName);
  }, [initialCompanyName]);

  useEffect(() => {
    suppressProfileAutosaveRef.current = true;
    setAvatarUrl(initialAvatarUrl);
  }, [initialAvatarUrl]);

  useEffect(() => {
    suppressProfileAutosaveRef.current = true;
    setWalletAddress(initialWalletAddress);
    setWalletProvider(initialWalletProvider || (initialWalletAddress ? 'manual' : ''));
    setWalletBindingStatus(initialWalletBindingStatus ?? (initialWalletAddress ? 'manual' : null));
    setWalletBoundAt(initialWalletBoundAt ?? null);
    setWalletIdentityDetails((previous) => {
      if (previous?.address === initialWalletAddress) return previous;
      return readLocalBitcodeWalletIdentity();
    });
  }, [initialWalletAddress, initialWalletBindingStatus, initialWalletProvider, initialWalletBoundAt]);

  useEffect(() => {
    if (initialWalletAddress) return;
    const localWallet = readLocalBitcodeWalletIdentity();
    if (!localWallet) return;

    suppressProfileAutosaveRef.current = true;
    setWalletAddress(localWallet.address);
    setWalletProvider(localWallet.provider);
    setWalletBindingStatus(localWallet.status);
    setWalletBoundAt(localWallet.connectedAt);
    setWalletIdentityDetails(localWallet);
  }, [initialWalletAddress]);

  const refreshBitcoinWalletProviders = React.useCallback(async () => {
    setWalletProviderScanStatus('checking');
    try {
      const providers = await inspectBitcoinWalletProviders();
      setWalletProviderOptions(providers);
      setWalletProviderScanStatus(providers.length > 0 ? 'ready' : 'none');
      bitcodeQaTelemetry('info', 'profile-wallet', 'provider-scan', providers);
    } catch {
      setWalletProviderOptions([]);
      setWalletProviderScanStatus('none');
      bitcodeQaTelemetry('warn', 'profile-wallet', 'provider-scan-failed');
    }
  }, []);

  useEffect(() => {
    refreshBitcoinWalletProviders();
  }, [refreshBitcoinWalletProviders]);

  // Repository knowledge sharing now lives under the $BTD auxillary.

  // Team management state
  /* 
   * New users automatically get admin role
   * Enterprise users should get owner role
   */
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(
    initialTeamMembers.length > 0 ? initialTeamMembers : [
      {
        id: '1',
        username: username || 'current_user',
        displayName: displayName || 'Current User',
        avatarUrl: avatarUrl || '',
        role: 'admin',
        status: 'accepted',
        btcFeeBudget: 50000,
      }
    ]
  );
  const [teamSectionExpanded, setTeamSectionExpanded] = useState(false);
  const lastProfileAutosaveSignatureRef = useRef<string | null>(null);

  useEffect(() => {
    if (initialTeamMembers.length === 0) return;
    suppressProfileAutosaveRef.current = true;
    setTeamMembers(initialTeamMembers);
  }, [initialTeamMembers]);

  // Sample avatar options
  const avatarOptions = AVATAR_OPTIONS;

  const hasWalletIdentity = Boolean(walletAddress && walletBindingStatus);
  const hasProviderWalletIdentity = Boolean(
    walletAddress && (walletBindingStatus === 'verified' || walletBindingStatus === 'pending'),
  );
  const walletReadout = useMemo(() => {
    const provider = walletIdentityDetails?.provider ?? walletProvider;
    return {
      providerLabel: formatWalletProviderLabel(provider),
      network: walletIdentityDetails?.network ?? null,
      proofKind: walletIdentityDetails?.proofKind ?? null,
      persistence: walletIdentityDetails?.persistence ?? null,
      paymentAddress: walletIdentityDetails?.paymentAddress ?? null,
      authAddress: (walletIdentityDetails?.authAddress ?? walletAddress) || null,
      addressType: walletIdentityDetails?.addressType ?? null,
    };
  }, [walletAddress, walletIdentityDetails, walletProvider]);
  // Profile completion is wallet-first in V28. Email verification is optional
  // notification posture and must not gate account identity.
  const prevWalletCompletionRef = useRef(hasWalletIdentity);
  useEffect(() => {
    if (onCompletionStatusChange && prevWalletCompletionRef.current !== hasWalletIdentity) {
      prevWalletCompletionRef.current = hasWalletIdentity;
      queueMicrotask(() => onCompletionStatusChange(hasWalletIdentity));
    }
  }, [hasWalletIdentity, onCompletionStatusChange]);

  const profileAutosavePayload = useMemo(() => {
    const walletBindingStatusForSave =
      !walletAddress
        ? null
        : walletBindingStatus ?? 'manual';

    return {
      username,
      displayName,
      bio,
      companyName, // Include company name in save data
      avatarUrl: avatarUrl || avatarOptions[selectedAvatar],
      teamMembers, // Include team members in save data
      isVerified, // Include verification status
      walletAddress: walletAddress || null,
      walletProvider: walletAddress ? walletProvider || 'manual' : null,
      walletBindingStatus: walletBindingStatusForSave,
      walletBoundAt,
    };
  }, [
    avatarOptions,
    avatarUrl,
    bio,
    companyName,
    displayName,
    isVerified,
    selectedAvatar,
    teamMembers,
    username,
    walletAddress,
    walletBoundAt,
    walletBindingStatus,
    walletProvider,
  ]);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    onSave(profileAutosavePayload);
  };

  const ensureWalletBackedSession = async (providerId?: BitcoinWalletProviderId) => {
    const supabaseReadiness = readSupabaseClientReadiness();
    if (!supabaseReadiness.ready) {
      return supabaseReadiness;
    }

    const supabase = createClient();
    try {
      const existing = await supabase.auth.getUser();
      if (existing.data.user) {
        return { ready: true as const };
      }

      const redirectTo = `${window.location.origin}/tps/supabase/callback?next=${encodeURIComponent('/auxillaries/profile')}`;
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: BITCODE_BITCOIN_SUPABASE_PROVIDER as any,
        options: {
          redirectTo,
          scopes: BITCODE_BITCOIN_SUPABASE_SCOPES,
          queryParams: {
            bitcode_wallet_provider: providerId ?? '',
            wallet_provider: providerId ?? '',
            bitcode_auth_surface: 'auxillaries_profile',
          },
        },
      });

      if (error) {
        return {
          ready: false as const,
          error: `Supabase Bitcoin wallet auth failed: ${error.message}`,
        };
      }

      if (data?.url) {
        window.location.assign(data.url);
      }

      return { ready: false as const, pendingRedirect: true as const };
    } catch (error) {
      return {
        ready: false as const,
        error: error instanceof Error ? error.message : 'Bitcode session creation failed.',
      };
    }
  };

  const handleStageBitcoinAddress = async () => {
    setWalletAuthError(null);
    const address = walletAddress.trim();
    if (!isPlausibleBitcoinAddress(address)) {
      setWalletAuthError('Enter a valid Bitcoin address before staging wallet identity.');
      return;
    }

    const connectedAt = new Date().toISOString();
    writeLocalBitcodeWalletIdentity({
      address,
      provider: 'manual-bitcoin',
      network: address.startsWith('bc1') ? 'mainnet' : address.startsWith('bcrt1') ? 'regtest' : 'testnet',
      status: 'manual',
      connectedAt,
      proofKind: 'manual_address',
      persistence: 'local',
    });
    setWalletIdentityDetails(readLocalBitcodeWalletIdentity());
    setWalletProvider('manual-bitcoin');
    setWalletBindingStatus('manual');
    setWalletBoundAt(connectedAt);
    setWalletAuthStatus('signed');
    bitcodeQaTelemetry('info', 'profile-wallet', 'manual-stage', {
      address: compactBitcodeAddress(address),
    });
    await mutateUserData();
  };

  const persistBitcoinWalletConnection = async (connection: BitcoinWalletConnection) => {
    const response = await fetch('/api/wallet/authenticate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        address: connection.address,
        provider: connection.provider,
        network: connection.network,
        message: connection.message,
        signature: connection.signature,
        proofKind: connection.proofKind,
        paymentAddress: connection.paymentAddress,
        authAddress: connection.authAddress,
        addressType: connection.addressType,
        connectedAt: connection.connectedAt,
        issuedAt: connection.connectedAt,
      }),
    });

    const payload = await response.json().catch(() => null);
    if (!response.ok) {
      setWalletAuthError(
        typeof payload?.error === 'string'
          ? `Bitcoin wallet connected locally; server persistence is pending: ${payload.error}`
          : 'Bitcoin wallet connected locally; server persistence is pending.',
      );
      bitcodeQaTelemetry('warn', 'profile-wallet', 'server-persistence-pending', {
        provider: connection.provider,
        status: response.status,
        error: typeof payload?.error === 'string' ? payload.error : null,
      });
      return false;
    }

    const savedAddress = typeof payload?.walletConnectionStatus?.address === 'string'
      ? payload.walletConnectionStatus.address
      : connection.address;
    const savedAt = typeof payload?.walletConnectionStatus?.metadata?.connectedAt === 'string'
      ? payload.walletConnectionStatus.metadata.connectedAt
      : connection.connectedAt;
    const savedStatus =
      payload?.walletConnectionStatus?.verificationState === 'verified'
        ? 'verified'
        : payload?.walletConnectionStatus?.verificationState === 'manual'
          ? 'manual'
          : 'pending';

    writeLocalBitcodeWalletIdentity({
      address: savedAddress,
      provider: connection.provider,
      network: connection.network,
      status: savedStatus,
      connectedAt: savedAt,
      proofKind: connection.proofKind,
      paymentAddress: connection.paymentAddress,
      authAddress: connection.authAddress,
      addressType: connection.addressType,
      message: connection.message,
      signature: connection.signature,
      persistence: 'server',
    });
    setWalletIdentityDetails(readLocalBitcodeWalletIdentity());
    setWalletAddress(savedAddress);
    setWalletProvider(connection.provider);
    setWalletBindingStatus(savedStatus);
    setWalletBoundAt(savedAt);
    setWalletAuthNotice(`${connection.providerLabel} wallet identity saved for this Bitcode profile.`);
    bitcodeQaTelemetry('info', 'profile-wallet', 'server-persisted', {
      provider: connection.provider,
      status: savedStatus,
      address: compactBitcodeAddress(savedAddress),
    });
    return true;
  };

  useEffect(() => {
    const identity = walletIdentityDetails ?? readLocalBitcodeWalletIdentity();
    if (!identity || identity.persistence === 'server') return;
    if (identity.proofKind !== 'bitcoin_message_signature' || !identity.signature || !identity.message) return;

    const persistenceKey = `${identity.provider}:${identity.address}:${identity.signature}`;
    if (walletServerPersistenceRef.current === persistenceKey) return;
    walletServerPersistenceRef.current = persistenceKey;

    let cancelled = false;
    (async () => {
      const readiness = readSupabaseClientReadiness();
      if (!readiness.ready || cancelled) return;

      const supabase = createClient();
      const existing = await supabase.auth.getUser();
      if (!existing.data.user || cancelled) return;

      await persistBitcoinWalletConnection({
        address: identity.address,
        provider: identity.provider,
        providerLabel: formatWalletProviderLabel(identity.provider),
        network: identity.network,
        paymentAddress: identity.paymentAddress,
        authAddress: identity.authAddress,
        addressType: identity.addressType,
        message: identity.message ?? '',
        signature: identity.signature ?? null,
        connectedAt: identity.connectedAt,
        proofKind: 'bitcoin_message_signature',
      });
      if (!cancelled) {
        await mutateUserData();
      }
    })().catch((error) => {
      if (cancelled) return;
      bitcodeQaTelemetry('warn', 'profile-wallet', 'oauth-session-persistence-pending', {
        message: error instanceof Error ? error.message : 'unknown',
      });
    });

    return () => {
      cancelled = true;
    };
  }, [walletIdentityDetails]);

  const handleConnectBitcoinWallet = async (providerId?: BitcoinWalletProviderId) => {
    setWalletAuthError(null);
    const providerLabel =
      walletProviderOptions.find((provider) => provider.id === providerId)?.label ??
      (providerId ? providerId : 'first available Bitcoin wallet');
    setWalletAuthNotice(
      `Preparing ${providerLabel}. Supabase will open Bitcode Bitcoin authentication, then the wallet will ask for a signed Bitcode message.`,
    );
    setWalletAuthStatus('requesting');
    bitcodeQaTelemetry('info', 'profile-wallet', 'connect-request', {
      provider: providerId ?? 'first-available',
    });

    try {
      const sessionReadiness = await ensureWalletBackedSession(providerId);
      if (!sessionReadiness.ready) {
        if ('pendingRedirect' in sessionReadiness && sessionReadiness.pendingRedirect) {
          setWalletAuthNotice('Opening Bitcode Bitcoin authentication with Supabase.');
          return;
        }
        setWalletAuthStatus('idle');
        setWalletAuthError(
          `Bitcoin wallet authentication cannot establish the Supabase session yet: ${sessionReadiness.error}`,
        );
        bitcodeQaTelemetry('warn', 'profile-wallet', 'session-persistence-unavailable', {
          reason: sessionReadiness.error,
        });
        return;
      }

      const connection = await connectBitcoinWallet(providerId);
      setWalletAuthNotice(`${connection.providerLabel} signed wallet proof. Staging Bitcode profile identity.`);
      writeLocalBitcodeWalletIdentity({
        address: connection.address,
        provider: connection.provider,
        network: connection.network,
        status: 'pending',
        connectedAt: connection.connectedAt,
        proofKind: connection.proofKind,
        paymentAddress: connection.paymentAddress,
        authAddress: connection.authAddress,
        addressType: connection.addressType,
        message: connection.message,
        signature: connection.signature,
        persistence: 'local',
      });
      setWalletIdentityDetails(readLocalBitcodeWalletIdentity());
      setWalletAddress(connection.address);
      setWalletProvider(connection.provider);
      setWalletBindingStatus('pending');
      setWalletBoundAt(connection.connectedAt);
      bitcodeQaTelemetry('info', 'profile-wallet', 'connect-local-staged', {
        provider: connection.provider,
        network: connection.network,
        proofKind: connection.proofKind,
        address: compactBitcodeAddress(connection.address),
        paymentAddress: compactBitcodeAddress(connection.paymentAddress),
        authAddress: compactBitcodeAddress(connection.authAddress),
      });

      await persistBitcoinWalletConnection(connection);
      setWalletAuthStatus('signed');
      await mutateUserData();
    } catch (error) {
      setWalletAuthStatus('idle');
      setWalletAuthNotice(null);
      setWalletAuthError(error instanceof Error ? error.message : 'Bitcoin wallet connection was cancelled or failed.');
      bitcodeQaTelemetry('warn', 'profile-wallet', 'connect-failed', {
        provider: providerId ?? 'first-available',
        message: error instanceof Error ? error.message : 'unknown',
      });
      await refreshBitcoinWalletProviders();
    }
  };

  useEffect(() => {
    if (!isOnboardingComplete || loading) {
      return;
    }

    const signature = JSON.stringify(profileAutosavePayload);
    if (lastProfileAutosaveSignatureRef.current === null || suppressProfileAutosaveRef.current) {
      suppressProfileAutosaveRef.current = false;
      lastProfileAutosaveSignatureRef.current = signature;
      return;
    }
    if (lastProfileAutosaveSignatureRef.current === signature) {
      return;
    }

    const timer = window.setTimeout(() => {
      lastProfileAutosaveSignatureRef.current = signature;
      onSave(profileAutosavePayload);
    }, 550);

    return () => window.clearTimeout(timer);
  }, [isOnboardingComplete, loading, onSave, profileAutosavePayload]);

  const toggleAvatarSelector = () => {
    setShowAvatarSelector(!showAvatarSelector);
  };

  // (repository-sharing state removed; the control now lives under $BTD)

  const selectAvatar = (index: number) => {

    setSelectedAvatar(index);
    setAvatarUrl(avatarOptions[index]);
    setShowAvatarSelector(false);

    // Update the owner's avatar in team members
    setTeamMembers(prevMembers =>
      prevMembers.map(member =>
        member.role === 'owner'
          ? { ...member, avatarUrl: avatarOptions[index] }
          : member
      )
    );
  };

  // Update team member details when profile details change
  React.useEffect(() => {
    // Only update if this is the initial user (owner)
    if (teamMembers.length === 1 && teamMembers[0].role === 'owner') {
      setTeamMembers(prevMembers => [
        {
          ...prevMembers[0],
          displayName: displayName || prevMembers[0].displayName,
          username: username || prevMembers[0].username,
          avatarUrl: avatarUrl || avatarOptions[selectedAvatar] || prevMembers[0].avatarUrl,
        }
      ]);
    }
  }, [displayName, username, avatarUrl, selectedAvatar]);

  return (
    <div data-testid="profile-step-container">
      <motion.div
        className="orbital-step-content profile-step"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="step-header">
          <AuxillariesProfilePaneHeader
            isOnboardingComplete={isOnboardingComplete}
            isVerified={isVerified}
          />
        </div>

        <form onSubmit={handleSubmit} className="step-form">

          {!isOnboardingComplete && (
          <motion.div
              className="onboarding-info"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              style={{
                background: "linear-gradient(145deg, rgba(15, 30, 50, 0.7), rgba(10, 20, 35, 0.7))",
                borderRadius: "16px",
                padding: "20px",
                marginBottom: "24px",
                border: "1px solid rgba(103, 254, 183, 0.3)",
                boxShadow: "0 8px 25px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(103, 254, 183, 0.1)",
                position: "relative"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", marginBottom: "12px" }}>
                <div className="info-icon" style={{
                  background: "rgba(103, 254, 183, 0.15)",
                  color: "rgba(103, 254, 183, 0.9)",
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: "16px",
                  flexShrink: "0",
                  boxShadow: "0 0 15px rgba(103, 254, 183, 0.2)",
                  border: "1px solid rgba(103, 254, 183, 0.3)"
                }}>
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
                  </svg>
                </div>
                <strong style={{ fontSize: "16px", color: "rgba(255, 255, 255, 0.95)" }}>Step 1: Connect your Bitcoin wallet</strong>
              </div>
              <p style={{ margin: "0 0 12px 0", fontSize: "15px", lineHeight: "1.5", color: "rgba(255, 255, 255, 0.85)" }}>
                Bitcoin wallet identity is the minimum Bitcode authentication path. Connect a Bitcoin-capable browser wallet first, then connect GitHub for Give and Need work. Email is optional for notifications.
              </p>
              <div className="onboarding-focus-note">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" style={{ marginTop: "4px", color: "rgba(103, 254, 183, 0.8)" }}>
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
                </svg>
                <p style={{ margin: "0", fontSize: "14px", color: "rgba(255, 255, 255, 0.8)", lineHeight: "1.5" }}>
                  Wallet authentication requests read/sign proof only. Bitcode never receives your private keys.
                </p>
              </div>
            </motion.div>
          )}
          


          <section
            className="orbital-section mb-5"
            style={{
              background: 'linear-gradient(145deg, rgba(42, 25, 11, 0.86), rgba(14, 22, 36, 0.86))',
              border: hasWalletIdentity
                ? '1px solid rgba(103, 254, 183, 0.34)'
                : '1px solid rgba(251, 146, 60, 0.36)',
              borderRadius: '20px',
              padding: '20px',
              boxShadow: '0 18px 44px rgba(0, 0, 0, 0.2)',
            }}
          >
            <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-orange-100/76">
                  1. Required identity
                </p>
                <h3 className="mt-2 text-xl font-semibold text-white">Connect Bitcoin wallet</h3>
                <p className="mt-2 max-w-[48rem] text-sm leading-7 text-white/70">
                  Bitcoin wallet connection is the first Bitcode identity action. It binds the
                  operator address for BTC fee readiness, BTD read-right posture, and the rest of
                  Profile onboarding. Ethereum account prompts are not used for this step.
                </p>
              </div>
              <span
                className={`rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${
                  hasWalletIdentity
                    ? 'border-emerald-300/26 bg-emerald-400/12 text-emerald-100'
                    : 'border-orange-300/26 bg-orange-400/12 text-orange-100'
                }`}
              >
                {hasWalletIdentity ? 'Connected' : 'Required first'}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              {walletProviderOptions.length > 0 ? (
                walletProviderOptions.map((provider) => (
                  <button
                    key={provider.id}
                    type="button"
                    data-testid={`profile-connect-${provider.id}`}
                    onClick={() => handleConnectBitcoinWallet(provider.id)}
                    disabled={walletAuthStatus === 'requesting'}
                    className="inline-flex items-center justify-center rounded-full border border-orange-300/34 bg-orange-400/14 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-orange-50 transition hover:border-orange-300/54 hover:bg-orange-400/22 disabled:cursor-wait disabled:opacity-60"
                  >
                    {walletAuthStatus === 'requesting'
                      ? `Opening ${provider.label}`
                      : hasProviderWalletIdentity
                        ? `Reconnect ${provider.label}`
                        : `Connect ${provider.label}`}
                  </button>
                ))
              ) : (
                <button
                  type="button"
                  data-testid="profile-connect-bitcoin-wallet"
                  onClick={() => handleConnectBitcoinWallet()}
                  disabled={walletAuthStatus === 'requesting'}
                  className="inline-flex items-center justify-center rounded-full border border-orange-300/34 bg-orange-400/14 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-orange-50 transition hover:border-orange-300/54 hover:bg-orange-400/22 disabled:cursor-wait disabled:opacity-60"
                >
                  {walletAuthStatus === 'requesting'
                    ? 'Opening Bitcoin wallet'
                    : hasProviderWalletIdentity
                      ? 'Reconnect Bitcoin wallet'
                      : 'Connect Bitcoin wallet'}
                </button>
              )}
              <button
                type="button"
                onClick={refreshBitcoinWalletProviders}
                disabled={walletAuthStatus === 'requesting'}
                className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/6 px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/66 transition hover:border-white/24 hover:bg-white/10 disabled:cursor-wait disabled:opacity-45"
              >
                Rescan wallets
              </button>
              <button
                type="button"
                onClick={handleStageBitcoinAddress}
                disabled={walletAuthStatus === 'requesting' || !walletAddress.trim()}
                className="inline-flex items-center justify-center rounded-full border border-white/14 bg-white/7 px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/76 transition hover:border-white/24 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-45"
              >
                Stage Bitcoin address
              </button>
              {walletAuthError ? (
                <p className="text-sm leading-6 text-amber-200/82">{walletAuthError}</p>
              ) : null}
            </div>
            <div className="mt-3 rounded-2xl border border-white/10 bg-black/18 px-4 py-3 text-sm leading-6 text-white/68">
              <span className="font-semibold text-white/82">
                {walletProviderScanStatus === 'checking'
                  ? 'Checking installed Bitcoin wallets'
                  : walletProviderOptions.length > 0
                    ? `Detected ${walletProviderOptions.map((provider) => provider.label).join(', ')}`
                    : 'No compatible Bitcoin wallet detected'}
              </span>
              {walletAuthNotice ? (
                <span className="ml-2 text-orange-100/82">{walletAuthNotice}</span>
              ) : walletProviderScanStatus === 'none' ? (
                <span className="ml-2">
                  Xverse or Leather must be unlocked, enabled on this site, and set to Testnet4 for this QA pass.
                </span>
              ) : null}
            </div>
            <div className="mt-4 grid gap-3 tablet:grid-cols-[1fr_0.95fr]">
              <div className="orbitals-users-input-container enterprise">
                <input
                  data-testid="profile-wallet-address-input"
                  id="walletAddress"
                  type="text"
                  value={walletAddress}
                  onChange={(e) => {
                    const nextValue = e.target.value;
                    setWalletAddress(nextValue);
                    setWalletBindingStatus(nextValue.trim() ? 'manual' : null);
                    setWalletProvider(nextValue.trim() ? 'manual-bitcoin' : '');
                    setWalletBoundAt(null);
                  }}
                  className="form-input"
                  placeholder="Bitcoin address appears here after wallet connection"
                  aria-label="Bitcode Bitcoin wallet address"
                />
                <div className="input-focus-indicator"></div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/22 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/58">
                  Current wallet state
                </p>
                <p className="mt-2 text-sm font-medium text-white">
                  {walletAddress
                    ? walletBindingStatus === 'verified'
                      ? 'Verified Bitcoin signer'
                      : walletBindingStatus === 'pending'
                        ? 'Bitcoin provider connected'
                        : 'Manual Bitcoin address staged'
                    : 'No Bitcoin wallet connected'}
                </p>
                {walletBoundAt ? (
                  <p className="mt-1 text-xs text-white/54">
                    Bound {new Date(walletBoundAt).toLocaleString()}
                  </p>
                ) : null}
                <dl className="mt-3 grid gap-2 text-xs leading-5 text-white/66">
                  <div className="grid grid-cols-[6.75rem_minmax(0,1fr)] gap-2">
                    <dt className="text-white/42">Provider</dt>
                    <dd className="min-w-0 break-words text-white/86">{walletReadout.providerLabel}</dd>
                  </div>
                  <div className="grid grid-cols-[6.75rem_minmax(0,1fr)] gap-2">
                    <dt className="text-white/42">Network</dt>
                    <dd className="min-w-0 break-words text-white/80">{walletReadout.network ?? 'Not provided'}</dd>
                  </div>
                  <div className="grid grid-cols-[6.75rem_minmax(0,1fr)] gap-2">
                    <dt className="text-white/42">Auth address</dt>
                    <dd className="min-w-0 break-all text-white/80">{formatWalletReadout(walletReadout.authAddress)}</dd>
                  </div>
                  <div className="grid grid-cols-[6.75rem_minmax(0,1fr)] gap-2">
                    <dt className="text-white/42">Payment</dt>
                    <dd className="min-w-0 break-all text-white/80">{formatWalletReadout(walletReadout.paymentAddress)}</dd>
                  </div>
                  <div className="grid grid-cols-[6.75rem_minmax(0,1fr)] gap-2">
                    <dt className="text-white/42">Address type</dt>
                    <dd className="min-w-0 break-words text-white/80">{walletReadout.addressType ?? 'Not provided'}</dd>
                  </div>
                  <div className="grid grid-cols-[6.75rem_minmax(0,1fr)] gap-2">
                    <dt className="text-white/42">Proof</dt>
                    <dd className="min-w-0 break-words text-white/80">{walletReadout.proofKind ?? 'Not provided'}</dd>
                  </div>
                  <div className="grid grid-cols-[6.75rem_minmax(0,1fr)] gap-2">
                    <dt className="text-white/42">Persistence</dt>
                    <dd className="min-w-0 break-words text-white/80">{walletReadout.persistence ?? 'profile'}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </section>

          <section
            className="orbital-section mb-5"
            style={{
              background: 'linear-gradient(145deg, rgba(12, 24, 39, 0.82), rgba(9, 19, 31, 0.82))',
              border: '1px solid rgba(103, 254, 183, 0.22)',
              borderRadius: '20px',
              padding: '20px',
              boxShadow: '0 18px 44px rgba(0, 0, 0, 0.18)',
            }}
          >
            <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-emerald-200/72">
                  2. Repository connection
                </p>
                <h3 className="mt-2 text-xl font-semibold text-white">Connect GitHub in Connects</h3>
                <p className="mt-2 max-w-[48rem] text-sm leading-7 text-white/70">
                  Profile owns wallet identity and personal profile values. Connects owns GitHub
                  attachment because repository scope is shared by Terminal, conversations,
                  Exchange rereads, and future external interfaces.
                </p>
              </div>
              <span
                className={`rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${
                  hasWalletIdentity
                    ? 'border-emerald-300/24 bg-emerald-400/10 text-emerald-100'
                    : 'border-white/10 bg-white/5 text-white/46'
                }`}
              >
                {hasWalletIdentity ? 'Ready to connect' : 'Wallet first'}
              </span>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-7 text-white/68">
              {hasWalletIdentity
                ? 'Wallet identity is ready. Open Connects next to attach GitHub for Give and Need source access.'
                : 'Connect or stage a Bitcoin wallet first. Connects will unlock GitHub attachment after wallet identity exists.'}
              <div className="mt-3">
                <a
                  href="/auxillaries/connects"
                  className="inline-flex items-center justify-center rounded-full border border-emerald-300/24 bg-emerald-400/12 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-50 transition-colors hover:border-emerald-300/42 hover:bg-emerald-400/18"
                >
                  Open Connects
                </a>
              </div>
            </div>
          </section>

          {/* Optional notification email */}
          <motion.div
              className="account-creation-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              style={{
                background: "linear-gradient(145deg, rgba(15, 30, 50, 0.8), rgba(10, 20, 35, 0.8))",
                borderRadius: "16px",
                padding: "28px",
                marginBottom: "32px",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                boxShadow: "0 12px 30px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(103, 254, 183, 0.15)",
                position: "relative"
              }}
            >
              <h3 style={{
                margin: "0 0 20px 0",
                fontSize: "22px",
                fontWeight: "700",
                color: "white",
                display: "flex",
                alignItems: "center",
                gap: "12px"
              }}>
                <div style={{
                  background: "rgba(103, 254, 183, 0.15)",
                  color: "rgba(103, 254, 183, 0.9)",
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: "0",
                  boxShadow: "0 0 15px rgba(103, 254, 183, 0.2)",
                  border: "1px solid rgba(103, 254, 183, 0.3)"
                }}>
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </div>
                Optional email notifications
              </h3>

              {authError && (
                <div data-testid="profile-error" className="text-red-500 mb-2">
                  {authError}
                </div>
              )}
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                {/* Email is optional notification posture after wallet and GitHub prerequisites */}
                {!isVerifying && !isVerified && (
                  <>
                  <div className="email-input-container" style={{ position: "relative" }}>
                    <label htmlFor="email" className="form-label" style={{ marginBottom: "8px", display: "block" }}>
                      Email Address
                      <span style={{ marginLeft: '8px', fontSize: '12px', color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>
                        Optional
                      </span>
                    </label>
                    <div className="orbitals-users-input-row-responsive" style={{ display: "flex", gap: "12px", alignItems: "flex-start", flexWrap: "wrap" }}>
                      <div className="orbitals-users-input-container enterprise" style={{ flex: "1" }}>
                        <input
                          data-testid="profile-email-input"
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="form-input"
                          placeholder="Receive notifications and Bitcode updates"
                        />
                        <div className="input-focus-indicator"></div>
                      </div>
                      <button
                        data-testid="profile-send-code"
                        type="button"
                        onClick={handleSendCode}
                        style={{
                          background: (!email || email.trim() === '' || verificationLoading) ? "rgba(103, 254, 183, 0.05)" : "rgba(103, 254, 183, 0.15)",
                          border: "1px solid rgba(103, 254, 183, 0.3)",
                          borderRadius: "12px",
                          padding: "0 24px",
                          color: (!email || email.trim() === '' || verificationLoading) ? "rgba(103, 254, 183, 0.4)" : "rgba(103, 254, 183, 0.9)",
                          fontWeight: "600",
                          cursor: (!email || email.trim() === '' || verificationLoading) ? "not-allowed" : "pointer",
                          transition: "all 0.3s ease",
                          whiteSpace: "nowrap",
                          minWidth: "120px",
                          height: "56px", // Increased height to match input with little margin
                          marginTop: "1px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          alignSelf: "flex-start", // Align to top of row
                          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(103, 254, 183, 0.1)",
                          opacity: (!email || email.trim() === '' || verificationLoading) ? 0.5 : 1
                        }}
                        disabled={!email || email.trim() === '' || verificationLoading}
                      >
                        {verificationLoading ? (
                          <LoadingSpinner size={20} thickness={2} color="rgba(103,254,183,0.8)" trackColor="rgba(103,254,183,0.2)" />
                        ) : (
                          "Send Code"
                        )}
                      </button>
                    </div>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-white/66">
                    Email does not authenticate Bitcode in V28. It only adds a notification and
                    account-recovery contact after wallet identity is established.
                  </p>
                  </>
                )}
                {/* When a code is being verified, show verification input */}
                {isVerifying && !isVerified && (
                  <div className="verification-container" style={{ position: "relative" }}>
                    <label htmlFor="verificationCode" className="form-label" style={{ marginBottom: "8px", display: "block" }}>
                      Verification Code
                      <span style={{
                        fontSize: "13px",
                        color: "rgba(255, 255, 255, 0.6)",
                        fontWeight: "normal",
                        marginLeft: "8px"
                      }}>
                        Sent to {email}
                      </span>
                    </label>
                    <div className="orbitals-users-input-row-responsive" style={{ display: "flex", gap: "12px", alignItems: "flex-start", flexWrap: "wrap" }}>
                      <div className="orbitals-users-input-container enterprise" style={{ flex: "1" }}>
                        <input
                          data-testid="profile-otp-input"
                          id="verificationCode"
                          type="text"
                          value={verificationCode}
                          onChange={(e) => setVerificationCode(e.target.value)}
                          className="form-input"
                          placeholder="Enter 6-digit code"
                          required
                        />
                        <div className="input-focus-indicator"></div>
                      </div>
                      <button
                        data-testid="profile-verify-code"
                        type="button"
                        onClick={handleVerifyCode}
                        style={{
                          background: (!/^\d{6}$/.test(verificationCode) || verificationLoading) 
                            ? "rgba(103, 254, 183, 0.05)" 
                            : "linear-gradient(135deg, rgba(103, 254, 183, 0.9), rgba(80, 227, 194, 0.9))",
                          border: "1px solid rgba(103, 254, 183, 0.3)",
                          borderRadius: "12px",
                          padding: "0 24px",
                          color: (!/^\d{6}$/.test(verificationCode) || verificationLoading)
                            ? "rgba(103, 254, 183, 0.4)"
                            : "rgba(0, 20, 40, 1)",
                          fontWeight: "600",
                          cursor: (!/^\d{6}$/.test(verificationCode) || verificationLoading) ? "not-allowed" : "pointer",
                          transition: "all 0.3s ease",
                          whiteSpace: "nowrap",
                          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(103, 254, 183, 0.1)",
                          height: "56px", // Increased height to match input with little margin
                          marginTop: "1px",
                          alignSelf: "flex-start", // Align to top of row
                          opacity: (!/^\d{6}$/.test(verificationCode) || verificationLoading) ? 0.5 : 1
                        }}
                        disabled={!/^\d{6}$/.test(verificationCode) || verificationLoading}
                      >
                        {verificationLoading ? (
                          <LoadingSpinner size={20} thickness={2} color="rgba(0,30,60,0.9)" trackColor="rgba(0,30,60,0.3)" />
                        ) : (
                          "Verify"
                        )}
                      </button>
                    </div>

                    <div style={{
                      marginTop: "12px",
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "13px",
                      color: "rgba(255, 255, 255, 0.6)"
                    }}>
                      <button
                        data-testid="profile-change-email-button"
                        type="button"
                        onClick={() => setIsVerifying(false)}
                        style={{
                          background: "none",
                          border: "none",
                          color: "rgba(103, 254, 183, 0.8)",
                          cursor: "pointer",
                          padding: "0",
                          fontSize: "13px",
                          textDecoration: "underline"
                        }}
                      >
                        Change email
                      </button>
                      <button
                        data-testid="profile-resend-code-button"
                        type="button"
                        onClick={handleSendCode}
                        style={{
                          background: "none",
                          border: "none",
                          color: "rgba(103, 254, 183, 0.8)",
                          cursor: "pointer",
                          padding: "0",
                          fontSize: "13px",
                          textDecoration: "underline"
                        }}
                      >
                        Resend code
                      </button>
                    </div>
                  </div>
                )}
                {/* When verified, show verified confirmation */}
                {isVerified && (
                  <div className="verified-container" style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    background: "rgba(103, 254, 183, 0.1)",
                    padding: "16px",
                    borderRadius: "12px",
                    border: "1px solid rgba(103, 254, 183, 0.2)"
                  }}>
                    <div style={{
                      background: "rgba(103, 254, 183, 0.2)",
                      color: "rgba(103, 254, 183, 1)",
                      width: "24px",
                      height: "24px",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}>
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                      </svg>
                    </div>
                    <div>
                      <div style={{ fontWeight: "600", color: "rgba(103, 254, 183, 0.9)" }}>
                        Email Verified
                      </div>
                      <div style={{ fontSize: "13px", color: "rgba(255, 255, 255, 0.7)" }}>
                        {email}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>


          {/* Enhanced form layout for enterprise users */}
          <div className="enterprise-form-section">
            <div className="form-fields-grid">

              <div className="form-group role-form-group">
                <label htmlFor="role" className="form-label disabled-label" style={{ cursor: 'default' }}>
                  Role
                </label>
                <div className="orbitals-users-input-container role-container mt-1">
                  <input
                    id="role"
                    type="text"
                    value="Admin"
                    className="form-input role-input"
                    disabled
                  />
                  <div className="role-badge">Default</div>
                </div>
              </div>

              <AfterOnboardingOverlay disabled={!isOnboardingComplete}>
                <div className="form-group">
                  <div className="bio-label-container">
                    <label htmlFor="displayName" className="form-label">
                      Display Name
                    </label>
                  </div>
                  <div className="orbitals-users-input-container enterprise">
                    <input
                      id="displayName"
                      type="text"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      className="form-input"
                      placeholder="Your name as seen by your team"
                      required
                      
                    />
                    <div className="input-focus-indicator"></div>
                  </div>
                </div>
              </AfterOnboardingOverlay>

              {/* Company Name field - only shown for admins */}
              {!isVerified && (
                <AfterOnboardingOverlay disabled={!isOnboardingComplete}>
                  <div className="form-group">
                    <div className="bio-label-container">
                      <label htmlFor="companyName" className="form-label">
                        Company Name
                      </label>
                    </div>
                    <div className="orbitals-users-input-container enterprise">
                      <input
                        id="companyName"
                        type="text"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        className="form-input"
                        placeholder="Your organization name"
                        
                      />
                      <div className="input-focus-indicator"></div>
                    </div>
                  </div>
                </AfterOnboardingOverlay>
              )}
            </div>

            <div className="bio-avatar-row">
              {/* Avatar section */}
              <AfterOnboardingOverlay disabled={!isOnboardingComplete}>
                <div className="avatar-section">
                  <div
                    className="avatar-preview"
                    onClick={toggleAvatarSelector}
                    style={{ backgroundImage: `url(${avatarUrl || avatarOptions[selectedAvatar]})` }}
                  >
                    {(
                      <div className="avatar-change-overlay">
                        <span className="avatar-change-text">Change</span>
                      </div>
                    )}
                    
                  </div>

                  {showAvatarSelector && (
                  <motion.div
                    className="avatar-selector"
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {/* Avatar options with improved selection indication */}
                    <div className="avatars-grid">
                      {avatarOptions.map((avatar, index) => (
                        <div
                          key={index}
                          className={`avatar-option ${selectedAvatar === index ? 'avatar-selected' : ''}`}
                          style={{ backgroundImage: `url(${avatar})` }}
                          onClick={() => selectAvatar(index)}
                        >
                          {selectedAvatar === index && (
                            <div className="avatar-selected-indicator">
                              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                              </svg>
                            </div>
                          )}
                        </div>
                      ))}
                      <div className="avatar-upload">
                        <label htmlFor="avatar-upload">
                          <span className="upload-icon">+</span>
                          <span className="upload-text">Upload</span>
                        </label>
                        <input
                          id="avatar-upload"
                          type="file"
                          accept="image/*"
                          className="hidden-input"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const url = URL.createObjectURL(file);
                              setAvatarUrl(url);
                              setShowAvatarSelector(false);
                            }
                          }}
                        />
                      </div>
                    </div>
                  </motion.div>
                  )}
                </div>
              </AfterOnboardingOverlay>

              {/* Bio section */}
              <AfterOnboardingOverlay disabled={!isOnboardingComplete}>
                <div className="form-group bio-group">
                  <div className="bio-section-wrapper">
                    <div className="bio-label-container">
                      <label htmlFor="bio" className="form-label bio-label">
                        Professional Bio
                      </label>
                    </div>
                    <div className="orbitals-users-input-container bio-container">
                      <textarea
                        id="bio"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        className="form-textarea"
                        placeholder="Describe your role and expertise"
                        rows={3}
                        
                      />
                      <div className="input-focus-indicator"></div>
                    </div>
                  </div>
                </div>
              </AfterOnboardingOverlay>
            </div>
          </div>

          {/* Hidden submit button that will be triggered by the global action button */}
          <button
            type="submit"
            id="profile-submit-button"
            style={{ display: 'none' }}
          />
          {isOnboardingComplete && (
            <div className="mt-6 rounded-[18px] border border-white/10 bg-black/20 px-4 py-3 text-sm leading-6 text-white/66">
              Profile edits save automatically as identity, wallet, and provider posture changes.
            </div>
          )}
        </form>
      </motion.div>
    </div>
  );
}
