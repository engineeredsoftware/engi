
'use client';

import { useEffect, useState, useMemo, useRef, useLayoutEffect } from 'react';
import { useAuth } from '@/components/base/bitcode/auth/AuthProvider';
import { createClient } from '@bitcode/supabase/ssr/client';
import Logo from '@/components/base/bitcode/branding/logo';
import { motion, AnimatePresence } from 'framer-motion';

interface BTDTrackerProps {
  btdBalance: number;
}

export function BTDTracker({ btdBalance }: BTDTrackerProps) {
  const [displayedBtdBalance, setDisplayedBtdBalance] = useState(btdBalance);
  const [isHovered, setIsHovered] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  // Track buy action state: idle, loading, success, error
  const [buyState, setBuyState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  // Show Buy More only on hover
  const shouldShowBuyNow = isHovered;
  // Measure max text width of "Buy More" vs "XXX $BTD" for static sizing
  const buyRef = useRef<HTMLSpanElement>(null);
  const btdRef = useRef<HTMLSpanElement>(null);
  const [textWidth, setTextWidth] = useState(0);
  useLayoutEffect(() => {
    if (buyRef.current && btdRef.current) {
      const buyW = buyRef.current.offsetWidth;
      const btdW = btdRef.current.offsetWidth;
      setTextWidth(Math.ceil(Math.max(buyW, btdW)));
    }
  }, [displayedBtdBalance]);
  // Compute static container min-width: icon + gap + text + horizontal paddings
  const paddingPx = 24; // px-6
  const iconWidthPx = 16; // w-4
  const gapPx = 10; // gap-x-2.5
  const minWidth = iconWidthPx + gapPx + textWidth + paddingPx * 2;

  // Animate BTD balance changes
  useEffect(() => {
    if (btdBalance !== displayedBtdBalance) {
      setDisplayedBtdBalance(btdBalance);
    }
  }, [btdBalance, displayedBtdBalance]);

  // Ref to manage hover-end timeout
  const hoverEndTimeoutRef = useRef<number>();
  // Handle hover state
  const handleHoverStart = () => {
    // Cancel any pending hoverEnd timeout
    if (hoverEndTimeoutRef.current) {
      clearTimeout(hoverEndTimeoutRef.current);
    }
    setIsHovered(true);
    setIsAnimating(true);
  };

  const handleHoverEnd = () => {
    setIsHovered(false);
    // Delay ending animation
    if (hoverEndTimeoutRef.current) {
      clearTimeout(hoverEndTimeoutRef.current);
    }
    hoverEndTimeoutRef.current = window.setTimeout(() => {
      setIsAnimating(false);
    }, 600);
  };
  // Clean up hover-end timer on unmount
  useEffect(() => {
    return () => {
      if (hoverEndTimeoutRef.current) clearTimeout(hoverEndTimeoutRef.current);
    };
  }, []);

  // Use shared auth context so we don't open duplicate listeners.
  const { user } = useAuth();
  const isSignedIn = Boolean(user);
  const supabase = useMemo(() => createClient(), []);

  // Particle state for dynamic burst
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    opacity: number;
    speed: number;
    angle: number;
  }>>([]);
  const particleCount = 12;
  const intervalParticlesRef = useRef<number | null>(null);

  // Generate, animate, and fade particles based solely on hover state
  useEffect(() => {
    const goldenRatio = 1.618033988749895;
    // On hover start: generate initial burst and begin movement
    if (isHovered) {
      // Create new particles in a golden-ratio spiral
      const newParticles = Array.from({ length: particleCount }, (_, i) => {
        const goldenAngle = i * goldenRatio * Math.PI * 2;
        const distance = Math.sqrt(i / particleCount) * 80;
        return {
          id: i,
          x: 50 + Math.cos(goldenAngle) * distance,
          y: 50 + Math.sin(goldenAngle) * distance,
          size: (1 + (i % 3) / 2) * (Math.sin(i * goldenRatio) * 0.5 + 2.5),
          opacity: 0.3 + (Math.sin(i * goldenRatio) * 0.2 + 0.3),
          speed: 0.5 + Math.sin(i * goldenRatio) * 0.5 + 0.5,
          angle: goldenAngle * (180 / Math.PI),
        };
      });
      setParticles(newParticles);
      // Animate outward movement, fade, and shrink
      intervalParticlesRef.current = window.setInterval(() => {
        setParticles(prev =>
          prev.map(p => {
            const angleMod = Math.sin(p.id * goldenRatio) * 0.1;
            return {
              ...p,
              x: p.x + Math.cos((p.angle + angleMod) * (Math.PI / 180)) * p.speed * 0.2,
              y: p.y + Math.sin((p.angle + angleMod) * (Math.PI / 180)) * p.speed * 0.2,
              opacity: p.opacity > 0.1 ? p.opacity - 0.01 : 0.1,
              size: p.size > 0.5 ? p.size - 0.02 : 0.5,
            };
          })
        );
      }, 50);
    } else {
      // On hover end: stop movement and fade out particles
      if (intervalParticlesRef.current) {
        window.clearInterval(intervalParticlesRef.current);
        intervalParticlesRef.current = null;
      }
      // Fade to opacity 0 via CSS transition
      setParticles(prev => prev.map(p => ({ ...p, opacity: 0 })));
      // Remove particles after fade completes
      const timeout = window.setTimeout(() => setParticles([]), 300);
      return () => clearTimeout(timeout);
    }
    // Cleanup on re-run or unmount
    return () => {
      if (intervalParticlesRef.current) {
        window.clearInterval(intervalParticlesRef.current);
        intervalParticlesRef.current = null;
      }
    };
  }, [isHovered]);

  /**
   * Handle Buy More click: check auth, update BTD balance, then open Stripe Checkout
   */
  const handleBuyMore = async () => {
    // Prevent duplicate clicks and enter loading state
    if (buyState !== 'idle') return;
    setBuyState('loading');
    // Ensure user is authenticated
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setBuyState('idle');
        window.dispatchEvent(new Event('start-onboarding'));
        return;
      }
    } catch (err) {
      console.error('Auth check failed:', err);
      setBuyState('idle');
      window.dispatchEvent(new Event('start-onboarding'));
      return;
    }
    // Refresh displayed BTD balance from server
    try {
      const res = await fetch('/api/auxillaries/data');
      if (res.ok) {
        const data = await res.json();
        const nextBalance =
          typeof data.btdBalance === 'number' ? data.btdBalance : null;
        if (typeof nextBalance === 'number') {
          setDisplayedBtdBalance(nextBalance);
        }
      }
    } catch (err) {
      console.error('Error fetching user BTD balance:', err);
    }
    // Create Stripe Checkout session for a default BTD purchase.
    const defaultBtdBalance = 1000;
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planId: 'ultra', customCredits: defaultBtdBalance }),
      });
      const result = await response.json();
      if (result.url) {
        // Success: show confirmation and open Stripe Checkout
        setBuyState('success');
        window.open(result.url, '_blank', 'noopener,noreferrer');
        setTimeout(() => setBuyState('idle'), 2000);
      } else {
        console.error('Failed to create checkout session:', result.error);
        setBuyState('error');
        setTimeout(() => setBuyState('idle'), 2000);
        window.dispatchEvent(new Event('start-onboarding'));
      }
    } catch (err) {
      console.error('Error creating checkout session:', err);
      setBuyState('error');
      setTimeout(() => setBuyState('idle'), 2000);
      window.dispatchEvent(new Event('start-onboarding'));
    }
  };

  return (
    <motion.div
      className={`relative group inline-block ${isSignedIn ? 'cursor-pointer' : 'cursor-not-allowed opacity-50 pointer-events-none'}`}
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      onClick={isSignedIn ? handleBuyMore : undefined}
      aria-disabled={!isSignedIn}
    >
      <motion.div
        className="relative inline-flex items-center justify-between gap-x-2.5 px-6 h-8 border rounded-full border-emerald-500/30 shadow-[0_0_12px_rgba(103,254,183,0.15)] bg-emerald-500/5 transition-colors transition-shadow duration-500 ease-out overflow-hidden group-hover:border-emerald-400/50 group-hover:shadow-[0_0_18px_rgba(103,254,183,0.25)] group-hover:bg-emerald-500/10"
        style={{ backfaceVisibility: 'hidden', minWidth: `${minWidth}px` }}
      >
        {/* Quantum field effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/[0.07] to-emerald-500/0 animate-shimmer" />
          <div className="absolute inset-0 bg-gradient-radial from-emerald-500/[0.07] to-transparent" />
        </div>

        {/* Orbital rings - appear on hover */}
        {isAnimating && [...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute inset-0 rounded-full border border-emerald-400/20 transition-all duration-1000"
            style={{
              animation: `orbitRotation${i + 1} 3s infinite linear`,
              opacity: isHovered ? 0.4 : 0,
              transform: `scale(${1 + (i * 0.1)}) rotate(${i * 45}deg)`,
            }}
          />
        ))}

        {/* Quantum-style particles */}
        {particles.map(particle => (
          <div
            key={`ct-particle-${particle.id}`}
            className="absolute rounded-full bg-emerald-400 quantum-particle-button"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
              boxShadow: `0 0 ${particle.size * 3}px ${particle.size}px rgba(103,254,183,${particle.opacity})`,
            }}
          />
        ))}

        {/* Icon + Text fixed layout */}
        <div
          className="absolute inset-y-0 left-6 right-6 grid items-center gap-x-2.5 pointer-events-none"
          style={{ gridTemplateColumns: `auto ${textWidth}px` }}
        >
          {/* Hidden measurement spans */}
          <div style={{ position: 'absolute', visibility: 'hidden', pointerEvents: 'none' }}>
            <span ref={buyRef} className="whitespace-nowrap font-normal tracking-wide text-sm">Buy More</span>
            <span ref={btdRef} className="whitespace-nowrap font-medium tracking-wide text-sm">{displayedBtdBalance.toLocaleString()} $BTD</span>
          </div>
          {/* Icon slot */}
          <AnimatePresence initial={false} mode="wait">
            {buyState === 'loading' ? (
              <motion.div
                key="spinner"
                className="flex items-center justify-center w-4 h-4"
                initial={{ opacity: 0, rotateX: 90 }}
                animate={{ opacity: 1, rotateX: 0 }}
                exit={{ opacity: 0, rotateX: -90 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                <svg
                  className="animate-spin h-4 w-4 text-emerald-400/90"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={4} className="opacity-25" />
                  <path fill="currentColor" className="opacity-75" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                </svg>
              </motion.div>
            ) : (
              <motion.div
                key="logo"
                className="relative w-4 h-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                <div
                  className="tracker-logo relative w-4 h-4 transform rotate-0 origin-center transition-all duration-300 ease-out filter group-hover:rotate-90 group-hover:drop-shadow-[0_0_8px_rgba(103,254,183,0.8)]"
                  style={{ backfaceVisibility: 'hidden', willChange: 'transform', transformBox: 'fill-box', transformOrigin: 'center center' }}
                >
                  <Logo height="h-4" width="w-4" fill={isHovered ? '#67feb7' : '#67feb780'} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          {/* Text slot */}
          <AnimatePresence initial={false} mode="wait">
            {buyState === 'loading' ? (
              <motion.span
                key="loading"
                className="w-full text-center whitespace-nowrap font-normal tracking-wide text-sm text-emerald-400/90"
                initial={{ opacity: 0, rotateX: -90 }}
                animate={{ opacity: 1, rotateX: 0 }}
                exit={{ opacity: 0, rotateX: 90 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >Preparing...</motion.span>
            ) : buyState === 'idle' && shouldShowBuyNow ? (
              <motion.span
                key="buy"
                className="w-full text-center whitespace-nowrap font-normal tracking-wide text-sm text-emerald-400/90"
                initial={{ opacity: 0, rotateX: -90 }}
                animate={{ opacity: 1, rotateX: 0 }}
                exit={{ opacity: 0, rotateX: 90 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >Buy More</motion.span>
            ) : (
              <motion.span
                key="btd"
                className="w-full text-center whitespace-nowrap font-medium tracking-wide text-sm text-emerald-400/90 leading-none"
                initial={{ opacity: 0, rotateX: -90 }}
                animate={{ opacity: 1, rotateX: 0 }}
                exit={{ opacity: 0, rotateX: 90 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >{displayedBtdBalance.toLocaleString()} $BTD</motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Enhanced ambient glow effects */}
        <div className="absolute inset-0 -z-10 transition-all duration-500">
          {/* Base ambient glow */}
          <div className="absolute inset-[-1px] rounded-full bg-gradient-to-r from-emerald-500/0 via-emerald-500/10 to-emerald-500/0" />
          <div className="absolute inset-[-1px] rounded-full bg-gradient-radial from-emerald-500/10 to-transparent blur-sm" />
          {/* Subtle pulse effect */}
          <div className="absolute inset-[-1px] rounded-full bg-gradient-to-r from-emerald-500/0 via-emerald-500/5 to-emerald-500/0 animate-pulse-subtle" />

          {/* Hover state enhancements */}
          <motion.div
            className="absolute inset-[-2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            animate={isHovered ? {
              scale: [1, 1.05, 1],
            } : {}}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-500/0 via-emerald-500/20 to-emerald-500/0 animate-shimmer" />
            <div className="absolute inset-0 rounded-full bg-gradient-conic from-emerald-500/0 via-emerald-500/10 to-emerald-500/0 animate-spin-slow" />
            <div className="absolute inset-0 rounded-full bg-gradient-radial from-emerald-500/20 to-transparent blur-md" />
          </motion.div>
        </div>

        {/* Click effect ripple */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 rounded-full group-active:bg-emerald-500/10 transition-colors duration-150" />
        </div>
      </motion.div>
    </motion.div>
  );
}

// Add these keyframes and styles
const styles = `
  @keyframes orbitRotation1 {
    from { transform: scale(1.1) rotate(0deg); }
    to { transform: scale(1.1) rotate(360deg); }
  }
  @keyframes orbitRotation2 {
    from { transform: scale(1.2) rotate(120deg); }
    to { transform: scale(1.2) rotate(480deg); }
  }
  @keyframes orbitRotation3 {
    from { transform: scale(1.3) rotate(240deg); }
    to { transform: scale(1.3) rotate(600deg); }
  }
  
  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    50% { transform: translateX(100%); }
    100% { transform: translateX(100%); }
  }
  
  @keyframes ping-slow {
    75%, 100% {
      transform: scale(1.5);
      opacity: 0;
    }
  }
  
  @keyframes spin-slow {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes pulse-subtle {
    0%, 100% { opacity: 0.4; }
    50% { opacity: 0.6; }
  }

  .animate-pulse-subtle {
    animation: pulse-subtle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }

  /* Enhanced hover transition */
  .btd-tracker-hover {
    transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1);
  }

  /* Quantum shimmer effect */
  .quantum-shimmer {
    background: linear-gradient(
      to right,
      transparent,
      rgba(103, 254, 183, 0.1),
      transparent
    );
    animation: shimmer 2s linear infinite;
    transform: translateX(-100%);
  }
`;

// Add styles to document
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}
