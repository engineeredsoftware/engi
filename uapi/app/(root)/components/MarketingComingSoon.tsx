'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import '../../../styles/coming-soon-fix.css'; // Up 3 levels to uapi root
import '../../../styles/coming-soon-glow-fix.css'; // Up 3 levels to uapi root

export default function MarketingComingSoon() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [shake, setShake] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<Array<{ id: number, x: number, y: number, delay: number, size: number }>>([]);

  // Generate quantum particles
  useEffect(() => {
    const particlesArray = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
      size: 2 + Math.random() * 4
    }));
    setParticles(particlesArray);

    // Mark as loaded after a short delay for entrance animations
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Track mouse movement for interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Create staggered word animation
  const words = ["Coming", "very", "soon"];

  // Apply shine animation to text
  useEffect(() => {
    const applyShineAnimation = () => {
      const elements = document.querySelectorAll('.super-shiny-text');
      elements.forEach((el, index) => {
        (el as HTMLElement).style.animation = window.innerWidth <= 768 ? "" : `coming-soon-neon-pulse 3s infinite ease-in-out, coming-soon-shine 8s infinite ease-out ${index * 0.5}s`;
      });
    };

    // Apply after component is mounted
    if (isLoaded) {
      setTimeout(applyShineAnimation, 500);
    }
  }, [isLoaded]);

  // Handle password submission
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.trim() === 'engi/acc') {
      setSuccess(true);
      try {
        localStorage.setItem('mid_launch_auth', 'true');
      } catch {
        /* ignore */
      }
      // Visual confirmation before refreshing the page to show unlocked content
      setTimeout(() => {
        // Full page reload ensures the gate picks up the stored auth flag
        window.location.reload();
      }, 650);
    } else {
      setError('Wrong incantation.');
      setShake(true);
      // Reset shake state after animation completes so it can retrigger
      setTimeout(() => setShake(false), 700);
    }
  };

  return (
    <>
      <svg width="0" height="0" style={{ position: "absolute", top: "-9999px" }}>
        <defs>
          <filter id="glow-filter" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feFlood floodColor="#67feb7" floodOpacity="0.8" result="glowColor" />
            <feComposite in="glowColor" in2="coloredBlur" operator="in" result="softGlow" />
            <feMerge>
              <feMergeNode in="softGlow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>
      <div
        ref={containerRef}
        className="coming-soon-container min-h-screen w-full flex flex-col items-center justify-center relative bg-[#030816]"
        style={{
          '--mouse-x': `${mousePosition.x}%`,
          '--mouse-y': `${mousePosition.y}%`,
          overflow: 'hidden' // Ensure no scrollbars at the root level
        } as React.CSSProperties}
      >
        {/* Orbital system background */}
        <div className="absolute inset-0 orbital-system opacity-70">
          <div className="orbital-ring" style={{ '--size': '70%', '--delay': '0s', '--rotation': '' } as React.CSSProperties}></div>
          <div className="orbital-ring" style={{ '--size': '50%', '--delay': '2s', '--rotation': '' } as React.CSSProperties}></div>
          <div className="orbital-ring" style={{ '--size': '30%', '--delay': '4s', '--rotation': '' } as React.CSSProperties}></div>
        </div>

        {/* Quantum particles */}
        {particles.map(particle => (
          <motion.div
            key={particle.id}
            className="quantum-particle absolute rounded-full bg-[#67feb7] z-10"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              boxShadow: `0 0 ${particle.size * 3}px rgba(103, 254, 183, 0.6)`,
            }}
            animate={{
              opacity: [0, 0.8, 0],
              scale: [0, 1, 0],
              x: [0, (Math.random() - 0.5) * 100],
              y: [0, (Math.random() - 0.5) * 100],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Radial gradient that follows mouse */}
        <div
          className="mouse-gradient absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(103, 254, 183, 0.15) 0%, transparent 50%)`,
            transition: 'background 0.3s ease'
          }}
        />

        {/* Main content */}
        <div className="main-content z-20 text-center px-4">
          <AnimatePresence>
            {isLoaded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2 }}
                className="mb-8"
              >
                <div className="relative inline-block">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 1.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="h-px bg-gradient-to-r from-transparent via-[#67feb7] to-transparent absolute -top-6 left-0"
                  />
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 1.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="h-px bg-gradient-to-r from-transparent via-[#67feb7] to-transparent absolute -bottom-6 left-0"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Staggered text animation */}
          <div className="staggered-text flex flex-wrap justify-center items-center overflow-visible" style={{ margin: '0 auto', gap: '8px' }}>
            {words.map((word, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.3 + index * 0.2,
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="staggered-word inline-block"
              >
                <span
                  className="super-shiny-text text-2xl laptop:text-4xl desktop:text-5xl font-light tracking-wide"
                  style={{
                    animationDelay: `${index * 0.3}s`,
                  }}
                >
                  {word}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Animated ellipsis */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="animated-ellipsis flex justify-center items-center"
          >
            {[0, 1, 2].map((dot) => (
              <motion.div
                key={dot}
                className="ellipsis-dot mx-1 rounded-full bg-[#67feb7]"
                animate={{
                  opacity: [0.3, 1, 0.3],
                  scale: [0.8, 1.2, 0.8],
                  boxShadow: [
                    '0 0 5px rgba(103, 254, 183, 0.3)',
                    '0 0 10px rgba(103, 254, 183, 0.6)',
                    '0 0 5px rgba(103, 254, 183, 0.3)'
                  ]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: dot * 0.3,
                  ease: "easeInOut"
                }}
              />
            ))}
          </motion.div>

          {/* Subtle tagline */}
          <AnimatePresence>
            {isLoaded && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8, duration: 1 }}
                className="tagline mt-8 text-white/60 text-sm laptop:text-base max-w-md mx-auto"
              >
                We're crafting something extraordinary.
                <br className="hidden tablet:block" />
                The future of engineering intelligence awaits.
              </motion.p>
            )}
          </AnimatePresence>

          {/* Password gate – now reveals below the tagline */}
          <AnimatePresence>
            {isLoaded && (
              <motion.form
                onSubmit={handlePasswordSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.4, duration: 0.8 }}
                className="mt-10 flex flex-col items-center"
              >
                <motion.div
                  animate={shake ? { x: [-8, 8, -6, 6, -3, 3, 0] } : {}}
                  transition={{ duration: 0.6 }}
                >
                  <input
                    type="password"
                    placeholder="access code"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (error) setError('');
                    }}
                    disabled={success}
                    className="bg-transparent border-b border-[#67feb7] focus:outline-none text-center placeholder-white/50 text-lg laptop:text-xl px-2 py-1 tracking-wide w-48 laptop:w-64 disabled:opacity-60"
                  />
                </motion.div>

                {/* Error message */}
                {error && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-2 text-sm text-red-400 dark:text-red-300"
                  >
                    {error}
                  </motion.span>
                )}

                {/* Success message */}
                {success && (
                  <motion.span
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: [0, 1.2, 1], opacity: 1 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="mt-4 flex items-center text-green-400 font-medium"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-5 h-5 mr-1"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                    Access granted
                  </motion.span>
                )}
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
