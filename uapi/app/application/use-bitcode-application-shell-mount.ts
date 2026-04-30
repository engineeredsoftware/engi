'use client';

import { useEffect } from 'react';

import { mountBitcodeApplicationShell } from '@bitcode/protocol-demonstration/src/client-entry.js';

export const BITCODE_APPLICATION_STYLESHEET_ID = 'bitcode-first-gate-stylesheet';
export const BITCODE_APPLICATION_STYLESHEET_HREF = '/application/first-gate-scoped-styles';

type UseBitcodeApplicationShellMountOptions = {
  stylesheetId?: string;
  stylesheetHref?: string;
};

export function useBitcodeApplicationShellMount({
  stylesheetId = BITCODE_APPLICATION_STYLESHEET_ID,
  stylesheetHref = BITCODE_APPLICATION_STYLESHEET_HREF,
}: UseBitcodeApplicationShellMountOptions = {}) {
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

    void mountBitcodeApplicationShell()
      .then((dispose) => {
        if (disposed) {
          dispose?.();
          return;
        }
        cleanup = dispose;
      })
      .catch((error) => {
        console.error('Failed to mount Bitcode application shell', error);
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
