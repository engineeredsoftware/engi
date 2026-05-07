"use client"
/* eslint-disable react/no-multi-comp */

import React, { ReactNode } from 'react'
import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'
import { createClient } from '@bitcode/supabase/ssr/client'
import type { Session, User } from '@supabase/supabase-js'
import { AuthProvider } from '@/components/base/bitcode/auth/AuthProvider'
import AuxillariesProvider from '@/app/auxillaries/components/AuxillariesProvider'
import { useQueryClient } from '@tanstack/react-query'
import { prefetchAuthData, updateCachedUser, useOnboarding } from '@/hooks/use-auth-query'
import { FEATURE_FLAGS } from '@/config/features'
import { buildMockReviewUser, isAuxillariesMockMode } from '@/lib/mock-review-mode'
import { shouldHideWorkspaceFooter } from '@/components/base/bitcode/layout/workspace-surface'

// Lazy-load toast infrastructure to avoid increasing initial JS bundle – the
// component itself is tiny but pulls in Radix primitives.
const Toaster = dynamic(
  () => import('@/components/base/shadcn/sonner').then(m => m.Toaster),
  { ssr: false }
)

// Runtime utility to surface cross-page auth errors via toast.
function useLoginErrorToast() {
  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const err = params.get('loginError');
    if (err) {
      // Remove the param from the URL so the toast doesn't repeat on refresh.
      params.delete('loginError');
      const newUrl = window.location.pathname + (params.toString() ? `?${params.toString()}` : '') + window.location.hash;
      window.history.replaceState({}, '', newUrl);
      import('@/components/base/shadcn/sonner').then(({ toast }) => {
        toast.error(decodeURIComponent(err));
      }).catch(() => {});
    }
  }, []);
}

// Dynamically import Conversations overlay with loading optimization
const Conversation = dynamic(() => import('@/app/conversations/components/ConversationsOverlay'), {
  ssr: false,
  loading: () => null,
  suspense: true,
})

// Prefetch heavy components for instant loading
const prefetchHeavyComponents = () => {
  if (typeof window !== 'undefined') {
    // Prefetch Conversations after 2 seconds (lower priority than Orbital)
    setTimeout(() => {
      if (!(window as any).__conversationsPrefetched) {
        (window as any).__conversationsPrefetched = true;
        import('@/app/conversations/components/ConversationsOverlay').catch(() => {});
      }
    }, 2000);
    
    // Prefetch sidebars after 3 seconds
    setTimeout(() => {
      if (!window.__sidebarsPrefetched) {
        window.__sidebarsPrefetched = true;
        import('@/components/base/bitcode/layout/sidebars/left-sidebar').catch(() => {});
        import('@/components/base/bitcode/layout/sidebars/right-sidebar').catch(() => {});
      }
    }, 3000);
  }
}

declare global {
  interface Window {
    __conversationsPrefetched?: boolean;
    __sidebarsPrefetched?: boolean;
  }
}

// Dynamically import sidebar components with lazy loading
const LeftSidebar = dynamic(
  () => import('@/components/base/bitcode/layout/sidebars/left-sidebar'),
  { ssr: false, loading: () => null }
)
const RightSidebar = dynamic(
  () => import('@/components/base/bitcode/layout/sidebars/right-sidebar'),
  { ssr: false, loading: () => null }
)

// Nav skeleton placeholder
// eslint-disable-next-line react/no-multi-comp
const NavSkeleton = () => (
  <div className="h-36 w-full skeleton-shine" />
);
const Nav = dynamic(
  () => import('@/components/base/bitcode/layout/nav'),
  { ssr: false, loading: () => <NavSkeleton /> }
)
const Footer = dynamic(() => import('@/components/base/bitcode/layout/footer'), { ssr: false })

// Content skeleton
// eslint-disable-next-line react/no-multi-comp
const ContentSkeleton = () => (
  <div className="w-full min-h-[calc(100vh-9rem)] skeleton-shine" />
)
const PageContent = dynamic(
  () => Promise.resolve({ default: ({ children }: { children: ReactNode }) => <>{children}</> }),
  { ssr: false, loading: () => <ContentSkeleton /> }
)

// Preload nav
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
Nav.preload?.();

export default function ClientLayoutInner({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const queryClient = useQueryClient();
  const mockMode = isAuxillariesMockMode();
  const supabase = createClient()
  const [user, setUser] = React.useState<null | import('@supabase/supabase-js').User>(mockMode ? buildMockReviewUser() : null)
  const [authLoaded, setAuthLoaded] = React.useState(mockMode)
  
  // Prefetch auth data IMMEDIATELY for instant Orbital open
  React.useLayoutEffect(() => {
    // Prefetch in microtask to not block render
    Promise.resolve().then(() => {
      prefetchAuthData(queryClient).catch(() => {});
    });
  }, [queryClient]);
  
  React.useEffect(() => {
    prefetchHeavyComponents();
  }, []);
  
  // Global error listener: capture client-side errors and send to telemetry backend
  React.useEffect(() => {
    function handleErrorEvent(event: ErrorEvent) {
      try {
        const { message, filename, lineno, colno, error } = event;
        const payload = {
          message,
          source: filename,
          lineno,
          colno,
          errorStack: error?.stack,
          metadata: {
            url: window.location.href,
            userAgent: navigator.userAgent
          }
        };
        fetch('/api/client-error', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } catch (e) {
        console.error('Failed to report client error', e);
      }
    }
    function handleRejection(event: PromiseRejectionEvent) {
      try {
        const reason = event.reason;
        const message = reason?.message || String(reason);
        const payload = {
          message,
          source: '',
          lineno: 0,
          colno: 0,
          errorStack: reason?.stack || null,
          metadata: {
            url: window.location.href,
            userAgent: navigator.userAgent
          }
        };
        fetch('/api/client-error', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } catch (e) {
        console.error('Failed to report unhandled rejection', e);
      }
    }
    window.addEventListener('error', handleErrorEvent);
    window.addEventListener('unhandledrejection', handleRejection);
    return () => {
      window.removeEventListener('error', handleErrorEvent);
      window.removeEventListener('unhandledrejection', handleRejection);
    };
  }, []);

  // Show toast if redirected back with an auth error
  useLoginErrorToast();
  React.useEffect(() => {
    if (mockMode) {
      const mockUser = buildMockReviewUser();
      setUser(mockUser);
      updateCachedUser(queryClient, mockUser);
      setAuthLoaded(true);
      return;
    }

    // Get initial user from Supabase (React Query will cache this)
    supabase.auth.getUser().then(({ data }: { data: { user: User | null } }) => {
      setUser(data.user)
      setAuthLoaded(true)
    }).catch(() => {
      setAuthLoaded(true)
    })
    // Listen for auth changes and update React Query cache
    const { data: listener } = supabase.auth.onAuthStateChange((_event: string, session: Session | null) => {
      setUser(session?.user ?? null)
      updateCachedUser(queryClient, session?.user ?? null)
      setAuthLoaded(true)
    })
    return () => { listener.subscription.unsubscribe() }
  }, [mockMode, supabase, queryClient])

  // State for Conversations sidebar open/close (desktop)
  const [isConversationSidebarOpen, setIsConversationSidebarOpen] = React.useState(false);
  
  // Get onboarding status to determine if Conversations should show
  const { data: onboardingData } = useOnboarding();
  const isOnboardingComplete = onboardingData?.isOnboardingComplete ?? false;
  const hideFooter = shouldHideWorkspaceFooter(pathname);

  return (
    <AuthProvider>
      <AuxillariesProvider>
        <>
        {FEATURE_FLAGS.NAV_BAR && <Nav />}
        <PageContent>{children}</PageContent>
        {pathname !== '/' && !hideFooter && <Footer />}
        <React.Suspense fallback={null}>
          {/* Sidebars on desktop (md+): left runs/items and right Conversations chat */}
          <div className="hidden laptop:block">
            {authLoaded && user && !mockMode && FEATURE_FLAGS.SIDEBAR_LEFT && (
              <LeftSidebar />
            )}
            {authLoaded && user && !mockMode && pathname !== '/application' && pathname !== '/conversations' && isOnboardingComplete && FEATURE_FLAGS.CONVERSATIONS_WIDGET && (
              <>
                <Conversation
                  position="bottom-right"
                  size={60}
                  inSidebar={false}
                  isOpen={isConversationSidebarOpen}
                  onToggle={() => setIsConversationSidebarOpen(open => !open)}
                />
                <RightSidebar
                  inSidebar
                  isOpen={isConversationSidebarOpen}
                  onToggle={() => setIsConversationSidebarOpen(open => !open)}
                />
              </>
            )}
          </div>
        </React.Suspense>

        {/* Global toast portal */}
        <Toaster />
        </>
      </AuxillariesProvider>
    </AuthProvider>
  )
}
