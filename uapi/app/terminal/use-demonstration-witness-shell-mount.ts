'use client';

import { useEffect } from 'react';

import { mountBitcodeDemonstrationShell } from '@bitcode/protocol-demonstration/src/client-entry.js';

export const BITCODE_DEMONSTRATION_WITNESS_STYLESHEET_ID = 'bitcode-demonstration-witness-stylesheet';
export const BITCODE_DEMONSTRATION_WITNESS_STYLESHEET_HREF = '/terminal/demonstration-witness-scoped-styles';

type UseBitcodeTerminalShellMountOptions = {
  stylesheetId?: string;
  stylesheetHref?: string;
};

export function useDemonstrationWitnessShellMount({
  stylesheetId = BITCODE_DEMONSTRATION_WITNESS_STYLESHEET_ID,
  stylesheetHref = BITCODE_DEMONSTRATION_WITNESS_STYLESHEET_HREF,
}: UseBitcodeTerminalShellMountOptions = {}) {
  useEffect(() => {
    let disposed = false;
    let cleanup: (() => void) | undefined;
    let stylesheet = document.getElementById(stylesheetId) as HTMLLinkElement | null;
    const createdStylesheet = !stylesheet;

    if (!stylesheet) {
      stylesheet = document.createElement('link');
      stylesheet.id = stylesheetId;
      stylesheet.rel = 'stylesheet';
      document.head.appendChild(stylesheet);
    }

    stylesheet.href = stylesheetHref;

    void mountBitcodeDemonstrationShell()
      .then((dispose) => {
        if (disposed) {
          dispose?.();
          return;
        }
        cleanup = dispose;
      })
      .catch((error) => {
        console.error('Failed to mount Bitcode demonstration shell', error);
      });

    return () => {
      disposed = true;
      cleanup?.();
      if (createdStylesheet) {
        stylesheet?.remove();
      }
    };
  }, [stylesheetHref, stylesheetId]);
}
