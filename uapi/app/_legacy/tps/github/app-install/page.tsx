"use client"

import React, { useState, useRef, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, useMotionValue, useMotionTemplate } from 'framer-motion';
import QuantumEffect from '@/components/base/engi/effects/QuantumEffect';
import TypingAnimation from '@/components/base/engi/typing-animation';

export default function GitHubAppInstallPage() {
  return (
    <Suspense fallback={<div />}>
      <GitHubAppInstallClient />
    </Suspense>
  );
}

function GitHubAppInstallClient() {
  const searchParams = useSearchParams();
  const installationId = searchParams.get('installation_id') || searchParams.get('connection_id') || '';
  const code = searchParams.get('code') || '';
  const combined = installationId && code ? `${installationId}-${code}` : '';

  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    if (!combined) return;
    navigator.clipboard.writeText(combined);
    setCopied(true);
  };

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

  return (
    <motion.div
      ref={containerRef}
      className="fixed inset-0 z-50 bg-black backdrop-blur-md pointer-events-auto"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
    >
      <QuantumEffect className="login-quantum-effect" />
      <div className="login-header tracking-tighter text-white font-light">
        <TypingAnimation
          text="GitHub App installation"
          highlightText="installation"
          highlightClass="super-shiny-text special-text"
          showCursor={false}
        />
      </div>
      <div className="absolute inset-x-0 z-30 text-center top-6 text-sm text-gray-400 pointer-events-none">
        You can close this tab after copying the code.
      </div>
      {copied && (
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
      <div className="absolute inset-0 z-20 mx-auto max-w-4xl flex flex-col items-center justify-center pointer-events-auto">
        <div className="flex flex-col items-center space-y-6">
          <h2
            onClick={handleCopy}
            className="mx-auto text-center text-6xl laptop:text-8xl font-bold tracking-wide cursor-pointer select-none break-all"
          >
            <span className="super-shiny-text text-[rgba(103,254,183,0.9)]">{combined}</span>
          </h2>
          <button
            onClick={handleCopy}
            className="px-6 py-3 bg-quantum-particle hover:bg-brand-emerald-bright text-black text-lg rounded-lg shadow-lg transition"
          >
            Copy Code
          </button>
        </div>
      </div>
    </motion.div>
  );
}
