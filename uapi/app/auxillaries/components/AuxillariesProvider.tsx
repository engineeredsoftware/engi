"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { AuxillaryPane } from './auxillary-pane-meta';
import { createPortal } from 'react-dom';
import dynamic from 'next/dynamic';

const Orbital = dynamic(() => import('@/app/orbitals/components'), { ssr: false });

if (typeof window !== 'undefined') {
  Orbital.preload?.();
}

const prefetchAuxillaries = () => {
  if (typeof window !== 'undefined' && !(window as any).__auxillariesPrefetched) {
    (window as any).__auxillariesPrefetched = true;
    import('@/app/orbitals/components').catch(() => {});
    import('@/app/orbitals/components/OrbitalsLoginPane').catch(() => {});
    import('@/app/orbitals/components/OrbitalsContent').catch(() => {});
    import('@/hooks/use-auth-query').catch(() => {});
    if (typeof fetch !== 'undefined') {
      fetch('/api/auxillaries/data', { method: 'HEAD', credentials: 'same-origin' }).catch(() => {});
    }
  }
};

type AuxillaryWindow = 'SignInWindow' | 'SignUpWindow';
type AuxillaryOpenMode = AuxillaryWindow | 'login' | 'account' | 'auxillaries' | 'orbitals';

function normalizeAuxillaryWindow(winOrLegacy: AuxillaryOpenMode = 'SignUpWindow'): AuxillaryWindow {
  if (winOrLegacy === 'login') {
    return 'SignInWindow';
  }

  if (winOrLegacy === 'account' || winOrLegacy === 'auxillaries' || winOrLegacy === 'orbitals') {
    return 'SignUpWindow';
  }

  return winOrLegacy;
}

interface AuxillariesContextType {
  isOpen: boolean;
  window: AuxillaryWindow;
  openAuxillaries: (win?: AuxillaryWindow) => void;
  closeAuxillaries: () => void;
  toggleAuxillaries: (win?: AuxillaryWindow) => void;
}

const AuxillariesContext = createContext<AuxillariesContextType | null>(null);

export default function AuxillariesProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [windowState, setWindowState] = useState<AuxillaryWindow>('SignUpWindow');
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null);
  const [deepLinkStep, setDeepLinkStep] = useState<AuxillaryPane | null>(null);

  useEffect(() => {
    const el = document.createElement('div');
    el.id = 'orbital-portal';
    document.body.appendChild(el);
    setPortalContainer(el);
    return () => {
      if (el.parentNode) el.parentNode.removeChild(el);
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

  useEffect(() => {
    const onOpen = (e: Event) => {
      const detail = (e as CustomEvent)?.detail as {
        window?: AuxillaryWindow;
        mode?: 'login' | 'account' | 'auxillaries' | 'orbitals';
        step?: AuxillaryPane;
      } | undefined;

      if (detail?.window) setWindowState(detail.window);
      else if (detail?.mode) setWindowState(normalizeAuxillaryWindow(detail.mode));
      setDeepLinkStep(detail?.step ?? null);
      setIsOpen(true);
    };

    const onClose = () => {
      setIsOpen(false);
      setDeepLinkStep(null);
    };

    window.addEventListener('open-auxillaries', onOpen as EventListener);
    window.addEventListener('close-auxillaries', onClose as EventListener);
    window.addEventListener('open-orbitals', onOpen as EventListener);
    window.addEventListener('close-orbitals', onClose as EventListener);
    window.addEventListener('open-orbital', onOpen as EventListener);
    window.addEventListener('close-orbital', onClose as EventListener);

    return () => {
      window.removeEventListener('open-auxillaries', onOpen as EventListener);
      window.removeEventListener('close-auxillaries', onClose as EventListener);
      window.removeEventListener('open-orbitals', onOpen as EventListener);
      window.removeEventListener('close-orbitals', onClose as EventListener);
      window.removeEventListener('open-orbital', onOpen as EventListener);
      window.removeEventListener('close-orbital', onClose as EventListener);
    };
  }, []);

  const openAuxillaries = useCallback((win: AuxillaryWindow = 'SignUpWindow') => {
    setWindowState(win);
    setIsOpen(true);
  }, []);

  const closeAuxillaries = useCallback(() => {
    setIsOpen(false);
    setDeepLinkStep(null);
  }, []);

  const toggleAuxillaries = useCallback((win?: AuxillaryWindow) => {
    if (typeof win !== 'undefined') setWindowState(win);
    setIsOpen((prev) => {
      const next = !prev;
      if (!next) {
        setDeepLinkStep(null);
      }
      return next;
    });
  }, []);

  const ctx: AuxillariesContextType = {
    isOpen,
    window: windowState,
    openAuxillaries,
    closeAuxillaries,
    toggleAuxillaries,
  };

  return (
    <AuxillariesContext.Provider value={ctx}>
      {children}
      {isOpen && portalContainer
        ? createPortal(
            <div className="orbital-portal orbital-open">
              <Orbital
                window={windowState}
                onClose={closeAuxillaries}
                initialStep={deepLinkStep ?? undefined}
              />
            </div>,
            portalContainer,
          )
        : null}
    </AuxillariesContext.Provider>
  );
}

export function useAuxillaries() {
  const ctx = useContext(AuxillariesContext);
  if (!ctx) throw new Error('useAuxillaries must be used within AuxillariesProvider');
  return ctx;
}

export function openAuxillaries(winOrLegacy: AuxillaryOpenMode = 'SignUpWindow', step?: AuxillaryPane) {
  prefetchAuxillaries();
  const win = normalizeAuxillaryWindow(winOrLegacy);
  const ev = new CustomEvent('open-auxillaries', { detail: { window: win, step } });
  window.dispatchEvent(ev);
}

export function closeAuxillaries() {
  const ev = new CustomEvent('close-auxillaries');
  window.dispatchEvent(ev);
}

export { prefetchAuxillaries };
