"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { OrbitalPane } from './orbital-pane-meta';
import { createPortal } from 'react-dom';
import dynamic from 'next/dynamic';

// Lazy load the Orbital overlay - but preload on mount for instant open
const Orbital = dynamic(() => import('./index'), { ssr: false });

// Preload immediately in browser
if (typeof window !== 'undefined') {
  Orbital.preload?.();
}

// Prefetch the Orbital chunk and warm up critical resources
const prefetchOrbital = () => {
  if (typeof window !== 'undefined' && !(window as any).__orbitalPrefetched) {
    (window as any).__orbitalPrefetched = true;
    import('./index').catch(() => {});
    import('./OrbitalsLoginPane').catch(() => {});
    import('./OrbitalsContent').catch(() => {});
    import('@/hooks/use-auth-query').catch(() => {});
    if (typeof fetch !== 'undefined') {
      fetch('/api/orbitals/data', { method: 'HEAD', credentials: 'same-origin' }).catch(() => {});
    }
  }
};

type OrbitalWindow = 'SignInWindow' | 'SignUpWindow';

interface OrbitalContextType {
  isOpen: boolean;
  window: OrbitalWindow;
  openOrbital: (win?: OrbitalWindow) => void;
  closeOrbital: () => void;
  toggleOrbital: (win?: OrbitalWindow) => void;
}

  const OrbitalContext = createContext<OrbitalContextType | null>(null);

export default function OrbitalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [windowState, setWindowState] = useState<OrbitalWindow>('SignUpWindow');
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null);
  const [deepLinkStep, setDeepLinkStep] = useState<OrbitalPane | null>(null);

  useEffect(() => {
    const el = document.createElement('div');
    el.id = 'orbital-portal';
    document.body.appendChild(el);
    setPortalContainer(el);
    return () => {
      if (el && el.parentNode) el.parentNode.removeChild(el);
      setPortalContainer(null);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.documentElement.classList.add('orbital-open', 'overflow-hidden');
    } else {
      document.documentElement.classList.remove('orbital-open', 'overflow-hidden');
    }
  }, [isOpen]);

  // Listen for global open/close events
  useEffect(() => {
    const onOpen = (e: Event) => {
      // @ts-ignore detail may carry window/step (or legacy mode)
      const detail = (e as CustomEvent)?.detail as { window?: OrbitalWindow, mode?: 'login' | 'account', step?: OrbitalPane } | undefined;
      if (detail?.window) setWindowState(detail.window);
      else if (detail?.mode) setWindowState(detail.mode === 'login' ? 'SignInWindow' : 'SignUpWindow');
      setDeepLinkStep(detail?.step ?? null);
      setIsOpen(true);
    };
    const onClose = () => {
      setIsOpen(false);
      setDeepLinkStep(null);
    };
    // Support both new and legacy event names for backwards-compat
    window.addEventListener('open-orbitals', onOpen as EventListener);
    window.addEventListener('close-orbitals', onClose as EventListener);
    window.addEventListener('open-orbital', onOpen as EventListener);
    window.addEventListener('close-orbital', onClose as EventListener);
    return () => {
      window.removeEventListener('open-orbitals', onOpen as EventListener);
      window.removeEventListener('close-orbitals', onClose as EventListener);
      window.removeEventListener('open-orbital', onOpen as EventListener);
      window.removeEventListener('close-orbital', onClose as EventListener);
    };
  }, []);

  const openOrbital = useCallback((win: OrbitalWindow = 'SignUpWindow') => {
    setWindowState(win);
    setIsOpen(true);
  }, []);

  const closeOrbital = useCallback(() => {
    setIsOpen(false);
    setDeepLinkStep(null);
  }, []);

  const toggleOrbital = useCallback((win?: OrbitalWindow) => {
    if (typeof win !== 'undefined') setWindowState(win);
    setIsOpen((prev) => {
      const next = !prev;
      if (!next) {
        setDeepLinkStep(null);
      }
      return next;
    });
  }, []);

  const ctx: OrbitalContextType = {
    isOpen,
    window: windowState,
    openOrbital,
    closeOrbital,
    toggleOrbital,
  };

  return (
    <OrbitalContext.Provider value={ctx}>
      {children}
      {isOpen && portalContainer
        ? createPortal(
            <div className="orbital-portal orbital-open">
              <Orbital window={windowState} onClose={closeOrbital} initialStep={deepLinkStep ?? undefined} />
            </div>,
            portalContainer,
          )
        : null}
    </OrbitalContext.Provider>
  );
}

export function useOrbital() {
  const ctx = useContext(OrbitalContext);
  if (!ctx) throw new Error('useOrbital must be used within OrbitalProvider');
  return ctx;
}

export function openOrbital(winOrLegacy: OrbitalWindow | 'login' | 'account' = 'SignUpWindow', step?: OrbitalPane) {
  prefetchOrbital();
  const win: OrbitalWindow = winOrLegacy === 'login' ? 'SignInWindow' : winOrLegacy === 'account' ? 'SignUpWindow' : winOrLegacy;
  const ev = new CustomEvent('open-orbitals', { detail: { window: win, step } });
  window.dispatchEvent(ev);
}

export function closeOrbital() {
  const ev = new CustomEvent('close-orbitals');
  window.dispatchEvent(ev);
}

export { prefetchOrbital };
