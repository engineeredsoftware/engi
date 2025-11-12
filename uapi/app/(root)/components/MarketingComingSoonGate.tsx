"use client";

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Lazy-load the heavy animation bundle only when we actually need to render
// the ComingSoon screen.  This keeps the JS footprint for authenticated
// visitors minimal and avoids executing the animation code path at all once
// the password has been entered.
const ComingSoon = dynamic(() => import('./MarketingComingSoon'), {
  // Disable SSR for the animation component – we will already have rendered a
  // server copy during the first request, subsequent visits are client only.
  ssr: false,
});

import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

/**
 * Client-side gate that decides whether to render the public "Coming Soon"
 * splash screen or the actual application based on a value stored in
 * `localStorage` after a successful password entry.
 *
 * The server has no access to the browser's storage so during Server-Side
 * Rendering we always return the splash screen.  Once hydrated in the browser
 * we re-evaluate the flag and immediately switch to the real content if the
 * visitor is already authorised.
 */
export default function MarketingComingSoonGate({ children }: Props) {
  const [authorised, setAuthorised] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      setAuthorised(localStorage.getItem('mid_launch_auth') === 'true');
    } catch {
      // Accessing localStorage can throw in edge cases (e.g. privacy mode).
      setAuthorised(false);
    }
    setHydrated(true);
  }, []);

  // During SSR we cannot know the auth status – default to splash screen.  We
  // keep showing it until after the first client render to avoid layout
  // flicker.
  if (!hydrated) {
    return <ComingSoon />;
  }

  return authorised ? <>{children}</> : <ComingSoon />;
}
