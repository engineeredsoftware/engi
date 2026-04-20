"use client";

import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useMotionTemplate } from 'framer-motion';
import QuantumEffect from '@/components/base/bitcode/effects/QuantumEffect';
import TypingAnimation from '@/components/base/bitcode/typing-animation';
import OrbitalLogo from '@/components/base/bitcode/branding/OrbitalLogo';

interface CheckoutCallbackClientProps {
  success: boolean;
  credits?: number;
  sessionId?: string;
}

/**
 * Interactive overlay displayed after Stripe redirects back to /tps/stripe/checkout.
 * It handles both success and cancellation states, mirroring the aesthetic of
 * the other callback pages while changing colours / content appropriately.
 */
export default function CheckoutCallbackClient({ success, credits, sessionId }: CheckoutCallbackClientProps) {
  // Fallback fulfillment: trigger server-side credit update if webhook failed
  React.useEffect(() => {
    if (success && sessionId) {
      fetch(`/api/fulfill-checkout-session?session_id=${encodeURIComponent(sessionId)}`, { method: 'POST' })
        .then(res => res.json())
        .then(data => console.log('Fulfill session response:', data))
        .catch(err => console.error('Error fulfilling checkout session:', err));
    }
  }, [success, sessionId]);
  // Mouse-tracking for subtle parallax motion
  const containerRef = useRef<HTMLDivElement>(null);
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

  // Dynamic colours / text for both states
  const highlightClassSuccess = 'super-shiny-text special-text text-[rgba(103,254,183,0.9)]';
  const highlightClassFail = 'super-shiny-text special-text text-red-400';

  return (
    <motion.div
      ref={containerRef}
      className="fixed inset-0 z-50 bg-black backdrop-blur-md pointer-events-auto"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
    >
      {/* Background particle effect */}
      <QuantumEffect className="login-quantum-effect" />

      {/* Animated header */}
      <div className="login-header tracking-tighter text-white font-light">
        {success ? (
          <TypingAnimation
            text={`successfully purchased ${credits ? `${credits} ` : ''}credits!`}
            highlightText="credits"
            highlightClass={highlightClassSuccess}
            showCursor={false}
          />
        ) : (
          <TypingAnimation
            text="checkout failed"
            highlightText="failed"
            highlightClass={highlightClassFail}
            showCursor={false}
          />
        )}
      </div>

      {/* Subtitle */}
      <div className="absolute inset-x-0 z-30 text-center top-6 text-sm text-gray-400 pointer-events-none">
        {success
          ? 'You can close this tab – your credits are ready to use.'
          : 'Something went wrong – try the purchase again.'}
      </div>

      {/* Centre content */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-auto">
        {success ? (
          <motion.div
            style={{ x: mxPx, y: myPx }}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20, mass: 0.8 }}
            className="select-none pointer-events-none"
          >
            {/* Oversized animated logo */}
            <div className="scale-[3] tablet:scale-[4] laptop:scale-[5]">
              <OrbitalLogo />
            </div>
          </motion.div>
        ) : (
          <motion.button
            style={{ x: mxPx, y: myPx }}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20, mass: 0.8 }}
            className="px-8 py-4 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-lg text-xl font-semibold transition"
            onClick={() => {
              // Kick the user back to pricing to start a new purchase flow
              window.location.href = '/#pricing';
            }}
          >
            Retry Checkout
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}
