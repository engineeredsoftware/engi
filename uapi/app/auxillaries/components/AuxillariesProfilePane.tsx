// Canonical auxillary owner using canonical auxillary internals while support-route retirement proceeds.

import React, { useState, useEffect, useMemo, useRef } from 'react';
import SocialLoginButton from '@/components/base/bitcode/auth/SocialLoginButton';
import SocialAccountLinker from '@/components/base/bitcode/auth/SocialAccountLinker';
import LoadingSpinner from '@/components/base/bitcode/indicators/LoadingSpinner';
import { trackEvent } from '@bitcode/google-analytics';
import { reportError } from '@bitcode/errors';
import { createClient } from '@bitcode/supabase/ssr/client';
// Use Supabase client for OTP flows instead of manual fetch
import { motion, AnimatePresence } from 'framer-motion';
import { AfterOnboardingOverlay } from '@/app/auxillaries/components/shared/AfterOnboardingOverlay';
import stylesProfilePane from '@/app/auxillaries/components/profile-pane.module.css';
import AuxillariesProfilePaneHeader from '@/app/auxillaries/components/headers/AuxillariesProfilePaneHeader';


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
  initialEmail = '',
  initialIsVerified = false,
  isOnboardingComplete = false,
  onCompletionStatusChange
}: AuxillariesProfilePaneProps) {
  // Use Supabase client for OTP flows
  const [authError, setAuthError] = useState<string | null>(null);
  const [email, setEmail] = useState(initialEmail);
  // Update email if initialEmail prop changes (e.g., user session loads)
  useEffect(() => {
    setEmail(initialEmail);
  }, [initialEmail]);
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(initialIsVerified);
  // Ref to avoid repeating completion callbacks
  const verifiedRef = useRef<boolean>(initialIsVerified);
  // Update verification status if initialIsVerified prop changes
  useEffect(() => {
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
  const [selectedAvatar, setSelectedAvatar] = useState(0);
  const [showAvatarSelector, setShowAvatarSelector] = useState(false);

  useEffect(() => {
    _setUsername(initialUsername);
  }, [initialUsername]);

  useEffect(() => {
    setDisplayName(initialDisplayName);
  }, [initialDisplayName]);

  useEffect(() => {
    setBio(initialBio);
  }, [initialBio]);

  useEffect(() => {
    setCompanyName(initialCompanyName);
  }, [initialCompanyName]);

  useEffect(() => {
    setAvatarUrl(initialAvatarUrl);
  }, [initialAvatarUrl]);

  useEffect(() => {
    setWalletAddress(initialWalletAddress);
    setWalletProvider(initialWalletProvider || (initialWalletAddress ? 'manual' : ''));
    setWalletBindingStatus(initialWalletBindingStatus ?? (initialWalletAddress ? 'manual' : null));
  }, [initialWalletAddress, initialWalletBindingStatus, initialWalletProvider]);

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
    setTeamMembers(initialTeamMembers);
  }, [initialTeamMembers]);

  // Sample avatar options
  const avatarOptions = AVATAR_OPTIONS;

  // Update completion status when verification status changes
  const prevIsVerifiedRef = useRef(isVerified);
  useEffect(() => {
    if (onCompletionStatusChange && prevIsVerifiedRef.current !== isVerified) {
      prevIsVerifiedRef.current = isVerified;
      queueMicrotask(() => onCompletionStatusChange(isVerified));
    }
  }, [isVerified, onCompletionStatusChange]);

  const profileAutosavePayload = useMemo(() => {
    const walletBindingStatusForSave =
      !walletAddress
        ? null
        : walletBindingStatus === 'manual' || walletBindingStatus === null
          ? 'manual'
          : undefined;

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
    walletBindingStatus,
    walletProvider,
  ]);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    onSave(profileAutosavePayload);
  };

  useEffect(() => {
    if (!isOnboardingComplete || loading) {
      return;
    }

    const signature = JSON.stringify(profileAutosavePayload);
    if (lastProfileAutosaveSignatureRef.current === null) {
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
                <strong style={{ fontSize: "16px", color: "rgba(255, 255, 255, 0.95)" }}>Step 1: Secure your account</strong>
              </div>
              <p style={{ margin: "0 0 12px 0", fontSize: "15px", lineHeight: "1.5", color: "rgba(255, 255, 255, 0.85)" }}>
                Verify your email to secure your Bitcode account. You’ll be ready to explore features and collaborate in seconds.
              </p>
              <div className="onboarding-focus-note">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" style={{ marginTop: "4px", color: "rgba(103, 254, 183, 0.8)" }}>
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
                </svg>
                <p style={{ margin: "0", fontSize: "14px", color: "rgba(255, 255, 255, 0.8)", lineHeight: "1.5" }}>
                  Once verified, invite your team, connect your projects, and shape your Auxillaries.
                </p>
              </div>
            </motion.div>
          )}
          


          {/* Show compact verified status when verified */}
          {isVerified && (
            <div className="verified-container" style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              background: "rgba(103, 254, 183, 0.1)",
              padding: "16px",
              borderRadius: "12px",
              border: "1px solid rgba(103, 254, 183, 0.2)",
              marginBottom: "24px"
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

          {/* Account Creation Section - Show when not verified */}
          {!isVerified && (
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
                border: "1px solid rgba(103, 254, 183, 0.4)",
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
                {isVerified ? 'Email Verified!' : 'Verify Your Email'}
              </h3>

              {authError && (
                <div data-testid="profile-error" className="text-red-500 mb-2">
                  {authError}
                </div>
              )}
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                {/* First, show email input or social sign-in when no verification in progress */}
                {!isVerifying && !isVerified && (
                  <>
                  <div className="email-input-container" style={{ position: "relative" }}>
                    <label htmlFor="email" className="form-label" style={{ marginBottom: "8px", display: "block" }}>
                      Email Address
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
                          placeholder="Enter your work email"
                          required
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
                  {/* Divider with OR label */}
                  <div className="flex items-center w-full">
                    <div className="flex-grow h-px bg-[linear-gradient(to_right,_#10B981_0%,_#6EE7B7_50%,_#10B981_100%)] drop-shadow-[0_0_6px_rgba(103,254,183,0.5)]" />
                    <span className="px-4 text-base tablet:text-lg font-semibold text-[rgba(103,254,183,0.9)] whitespace-nowrap">
                      or
                    </span>
                    <div className="flex-grow h-px bg-[linear-gradient(to_right,_#10B981_0%,_#6EE7B7_50%,_#10B981_100%)] drop-shadow-[0_0_6px_rgba(103,254,183,0.5)]" />
                  </div>
                  {/* Active provider buttons plus staged wallet carrier */}
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(3, 1fr)', 
                    gap: '8px',
                    width: '100%' 
                  }}>
                    <SocialLoginButton provider="github" variant="icon-square" />
                    <SocialLoginButton provider="google" variant="icon-square" />
                    <SocialLoginButton provider="metamask" variant="icon-square" />
                  </div>
                  <p className="mt-3 text-sm leading-7 text-white/66">
                    GitHub and Google are the active Bitcode sign-in providers here today. Wallet
                    binding opens after access is established inside Profile and $BTD.
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
          )}


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

          <div
            className="orbital-section mt-8"
            style={{
              background: 'linear-gradient(145deg, rgba(12, 24, 39, 0.82), rgba(9, 19, 31, 0.82))',
              border: '1px solid rgba(103, 254, 183, 0.22)',
              borderRadius: '18px',
              padding: '20px',
              boxShadow: '0 18px 40px rgba(0, 0, 0, 0.18)',
            }}
          >
            <div className="bio-label-container" style={{ marginBottom: '12px' }}>
              <label htmlFor="walletAddress" className="form-label">
                Wallet identity
              </label>
            </div>
            <p style={{ margin: '0 0 14px 0', fontSize: '14px', lineHeight: '1.6', color: 'rgba(255, 255, 255, 0.72)' }}>
              Profile owns the wallet identity that transaction readiness, the Bitcode Terminal, and
              <span style={{ color: 'rgba(103, 254, 183, 0.88)' }}> $BTD</span> reread. Manual
              identity binding is active here now; verified wallet-provider signing remains staged
              until the live signature primitive is admitted. Provider-managed pending or verified
              signer posture can be reflected here, but this form does not assert it.
            </p>
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
                  setWalletProvider((current) =>
                    current || nextValue.trim() ? (current || 'manual') : '',
                  );
                }}
                className="form-input"
                placeholder="Bind the wallet address Bitcode should treat as operator identity"
              />
              <div className="input-focus-indicator"></div>
            </div>
            <div style={{ marginTop: '10px', fontSize: '13px', color: 'rgba(255, 255, 255, 0.6)' }}>
              {walletAddress
                ? walletBindingStatus === 'verified'
                  ? `Verified wallet-provider signer: ${walletProvider || 'wallet provider'}`
                  : walletBindingStatus === 'pending'
                    ? `Wallet-provider verification is staged. Current provider: ${walletProvider || 'wallet provider'}`
                    : `Manual wallet identity saved from ${walletProvider || 'manual'}; signed settlement still waits on provider verification.`
                : 'No wallet identity is bound yet. Transaction-bearing actions remain review-only until one is saved here.'}
            </div>
          </div>

          {isOnboardingComplete && (
            <div className="orbital-section mt-12">
              <div className="rounded-[24px] border border-white/10 bg-white/[0.045] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.18)]">
                <div className="mb-5">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-emerald-200/72">
                    Access providers
                  </div>
                  <p className="mt-3 max-w-[44rem] text-sm leading-7 text-white/72">
                    Manage sign-in methods linked to this Bitcode account. Repository and workflow
                    integrations remain in the Connects auxillary.
                  </p>
                </div>
                <div className="grid gap-3 tablet:grid-cols-2">
                  <SocialAccountLinker provider="github" />
                  <SocialAccountLinker provider="google" />
                </div>
              </div>
            </div>
          )}

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
