"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useMotionTemplate } from 'framer-motion';
import QuantumEffect from '@/components/base/engi/effects/QuantumEffect';
import TypingAnimation from '@/components/base/engi/typing-animation';

interface LoginCallbackClientProps {
  code: string;
  /** Where to redirect after session established ("/" by default) */
  nextPath?: string;
}

/**
 * Client-side interactive UI for the login callback route.
 * Includes animation effects and copy-to-clipboard.
 */
export default function LoginCallbackClient({ code, nextPath = '/' }: LoginCallbackClientProps) {
  const [copied, setCopied] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Determine if this is an OTP flow (magic-link) or an OAuth redirect
  const isOtpFlow = Boolean(code && code.trim().length > 0);

  // Track mouse for subtle effect
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const mxPx = useMotionTemplate`${mx}px`;
  const myPx = useMotionTemplate`${my}px`;
  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const handleMouse = (e: MouseEvent) => {
      const rect = node.getBoundingClientRect();
      mx.set(e.clientX - (rect.left + rect.width / 2));
      my.set(e.clientY - (rect.top + rect.height / 2));
    };
    node.addEventListener('mousemove', handleMouse);
    return () => node.removeEventListener('mousemove', handleMouse);
  }, [mx, my]);

  /* Focus trap -------------------------------------------------- */
  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    // Focus the container so screen-readers announce it
    root.tabIndex = -1;
    root.focus({ preventScroll: true });

    function handleKey(e: KeyboardEvent) {
      if (e.key !== 'Tab') return;
      const focusable = root.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        // Shift+Tab
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        // Tab
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    root.addEventListener('keydown', handleKey);
    return () => root.removeEventListener('keydown', handleKey);
  }, []);

  /* ------------------------------------------------------------------
   * Automatic redirect for OAuth flows
   * ------------------------------------------------------------------
   * Instead of a one-off poll we now listen for the `SIGNED_IN` auth event so
   * we catch cases where Supabase needs a moment to finish exchanging the
   * hash tokens for a session.  We still perform an immediate check in case
   * the session is already ready, and add a 5-second safety timeout so users
   * are never stranded on this screen.
   */
  useEffect(() => {
    let cleanup: (() => void) | undefined;

    (async () => {
      const { createClient } = await import('@engi/supabase/ssr/client');
      const supabase = createClient();

      let finished = false;

      const complete = () => {
        if (finished) return;
        finished = true;
        setRedirecting(true);

        setTimeout(() => {
          try {
            if (window.opener && !window.opener.closed) {
              window.opener.postMessage({ type: 'oauth-login-complete' }, '*');
            }
          } catch {}

          window.close();
          window.location.href = nextPath || '/';
        }, 600);
      };

      // 1️⃣ First, attempt to capture the session from the URL fragment –
      // this is required for implicit/#access_token flows used by Google.
      // 1️⃣ Attempt to extract tokens from the URL hash (implicit flow
      // `#access_token=…`).  Supabase doesn’t parse the hash automatically in
      // the browser SDK, so we do it manually and call `setSession()`.
      const hash = typeof window !== 'undefined' ? window.location.hash || '' : '';
      if (hash.startsWith('#')) {
        const p = new URLSearchParams(hash.slice(1));
        const access_token = p.get('access_token');
        // Supabase names this key `refresh_token` (not provider_refresh_token)
        const refresh_token = p.get('refresh_token') || p.get('provider_refresh_token');
        if (access_token && refresh_token) {
          try {
            await supabase.auth.setSession({ access_token, refresh_token });
          } catch {/* ignore – falls through to checks below */}
        }
      }

      // 2️⃣ Immediate session check – handles fast flows or the manual set
      // above.
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        complete();
      }

      // 3️⃣ Event listener – fires when Supabase processes the hash in the
      // background (or when the user gets logged in via another tab).
      const { data: listener } = supabase.auth.onAuthStateChange((event) => {
        if (event === 'SIGNED_IN') complete();
      });

      // 4️⃣ Safety net – ensure we leave within 5 seconds regardless.
      const timeout = setTimeout(complete, 5000);

      cleanup = () => {
        listener.subscription.unsubscribe();
        clearTimeout(timeout);
      };
    })();

    return () => {
      cleanup?.();
    };
  }, [nextPath]);

  const handleCopy = () => {
    if (!code) return;
    navigator.clipboard.writeText(code);
    setCopied(true);
  };

  // Allow users to dismiss with ESC
  useEffect(() => {
    const escHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        window.close();
        window.location.href = nextPath || '/';
      }
    };
    window.addEventListener('keydown', escHandler);
    return () => window.removeEventListener('keydown', escHandler);
  }, [nextPath]);

  return (
    <motion.div
      ref={containerRef}
      className="fixed inset-0 z-50 bg-black backdrop-blur-md pointer-events-auto"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      tabIndex={-1}
    >
      <QuantumEffect className="login-quantum-effect" />
      {/* Close button (top-right) */}
      <button
        onClick={() => {
          window.close();
          window.location.href = nextPath || '/';
        }}
        aria-label="Close"
        className="absolute top-4 right-4 text-gray-400 hover:text-white focus:outline-none"
      >
        <span aria-hidden="true">×</span>
      </button>
      {/* Top header/title */}
      {!redirecting && (
        <div className="login-header tracking-tighter text-white font-light select-none">
          {isOtpFlow ? (
            <TypingAnimation
              text="account verification code"
              highlightText="verification code"
              highlightClass="super-shiny-text special-text"
              showCursor={false}
            />
          ) : (
            'Verifying your account…'
          )}
        </div>
      )}

      {/* Sub-text (OTP only) */}
      {isOtpFlow && (
        <div className="absolute inset-x-0 z-30 text-center top-6 text-sm text-gray-400 pointer-events-none select-none">
          You can close this tab to return to onboarding after copying the code.
        </div>
      )}

      {/* Success toast after copy (OTP only) */}
      {isOtpFlow && copied && (
        <div className="absolute inset-x-0 top-80 flex justify-center pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="text-center text-2xl tablet:text-3xl font-bold text-brand-emerald-bright super-shiny-text"
          >
            Code Copied Successfully!
          </motion.div>
        </div>
      )}

      {/* Centre large text */}
      {!redirecting && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-auto select-none">
          {isOtpFlow ? (
            <div className="flex flex-col items-center space-y-6">
              <h2
                onClick={handleCopy}
                className="text-6xl laptop:text-8xl font-bold tracking-wide text-[rgba(103,254,183,0.9)] super-shiny-text cursor-pointer select-none"
              >
                {code}
              </h2>
              <button
                onClick={handleCopy}
                className="px-6 py-3 bg-quantum-particle hover:bg-brand-emerald-bright text-black text-lg rounded-lg shadow-lg transition"
              >
                Copy Code
              </button>
            </div>
          ) : (
            <h2 className="text-5xl laptop:text-7xl font-light text-[rgba(103,254,183,0.9)] super-shiny-text">
              Verifying…
            </h2>
          )}
        </div>
      )}

      {/* Redirecting overlay */}
      {redirecting && (
        <div className="absolute inset-0 flex items-center justify-center select-none">
          <h2 className="text-5xl laptop:text-7xl font-light text-[rgba(103,254,183,0.9)] super-shiny-text">
            Signing you in…
          </h2>
        </div>
      )}
    </motion.div>
  );
}
