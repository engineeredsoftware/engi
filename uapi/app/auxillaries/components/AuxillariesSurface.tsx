"use client";

import React, { startTransition, useCallback, useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createClient } from '@bitcode/supabase/ssr/client';

import { useOnboarding, useProfile, useUser } from '@/hooks/use-auth-query';
import OrbitalRings from "@/components/base/engi/orbitals/orbital-rings";
import { GPUAcceleration } from '@/components/base/engi/perf/GPUAcceleration';
import { ContentVisibility } from '@/components/base/engi/perf/ContentVisibility';
import {
  getAuxillaryRingIndex,
  isAuxillariesPath,
  isOrbitalsCompatibilityPath,
  normalizeAuxillaryPane,
  normalizeAuxillarySteps,
  AUXILLARY_FLOW_STEPS,
  AUXILLARY_RING_STEPS,
  type ConcreteAuxillaryPane,
  type AuxillaryPane,
} from './auxillary-pane-meta';

export type { ConcreteAuxillaryPane, AuxillaryPane } from './auxillary-pane-meta';

const trackEvent = (...args: any[]) => {
  import('@bitcode/google-analytics').then((module) => module.trackEvent(...args));
};

const reportError = (...args: any[]) => {
  import('@bitcode/errors').then((module) => module.reportError(...args));
};

const FlipText = dynamic(() => import("@/components/base/engi/layout/sidebars/FlipText"), {
  ssr: false,
  loading: () => <span className="inline-block">Login</span>,
});

const AuxillariesLoginPane = dynamic(() => import("./AuxillariesLoginPane"), {
  ssr: false,
  loading: () => <div className="animate-pulse h-96 w-full" />,
});

const AuxillariesContent = dynamic(() => import("./AuxillariesContent"), {
  ssr: false,
  loading: () => <div className="animate-pulse h-96 w-full" />,
});

const ProfilePane = dynamic(() => import("@/app/orbitals/components/OrbitalsProfilePane"), {
  ssr: false,
  loading: () => <div className="animate-pulse h-64 w-full" />,
});

const ConnectsPane = dynamic(() => import("@/app/orbitals/components/OrbitalsConnectsPane"), {
  ssr: false,
  loading: () => <div className="animate-pulse h-64 w-full" />,
});

const BTDPane = dynamic(() => import("@/app/orbitals/components/OrbitalsBTDPane"), {
  ssr: false,
  loading: () => <div className="animate-pulse h-64 w-full" />,
});

const InterfacesPane = dynamic(() => import("@/app/orbitals/components/OrbitalsInterfacesPane"), {
  ssr: false,
  loading: () => <div className="animate-pulse h-64 w-full" />,
});

function parseAuxillaryPath(pathname: string | null): ConcreteAuxillaryPane | null {
  if (!pathname) return null;
  const match = pathname.match(/\/(?:auxillaries|orbitals)\/(profile|users|connects|interfaces|btd|models|credits)\b/i);
  if (!match) return null;
  return normalizeAuxillaryPane(match[1]);
}

export interface AuxillariesSurfaceProps {
  window?: 'SignInWindow' | 'SignUpWindow';
  onClose?: () => void;
  className?: string;
  initialStep?: AuxillaryPane | null;
}

export default function AuxillariesSurface({
  window: windowProp = 'SignInWindow',
  onClose,
  className = "",
  initialStep = null,
}: AuxillariesSurfaceProps) {
  const [animationsEnabled, setAnimationsEnabled] = useState(false);
  const deferredAnimationsEnabled = useDeferredValue(animationsEnabled);
  const containerRef = useRef<HTMLDivElement>(null);

  const queryClient = useQueryClient();
  const { data: sessionUser, isLoading: userLoading } = useUser();
  const { data: profileData, isLoading: profileLoading } = useProfile();
  const { data: onboardingData } = useOnboarding();

  const authLoaded = !userLoading;
  const [supabaseClient] = useState(() => createClient());
  const router = useRouter();
  const pathname = usePathname();
  const routeStep = useMemo(() => parseAuxillaryPath(pathname), [pathname]);
  const isApplicationRoute = Boolean(pathname?.startsWith('/application'));
  const isDedicatedAuxillariesRoute = isAuxillariesPath(pathname) || isOrbitalsCompatibilityPath(pathname);

  const [activeWindow, setActiveWindow] = useState<'SignInWindow' | 'SignUpWindow'>(windowProp);
  const [currentStep, setCurrentStep] = useState<ConcreteAuxillaryPane>(
    normalizeAuxillaryPane(initialStep) ?? routeStep ?? 'profile',
  );
  const [completedSteps, setCompletedSteps] = useState<ConcreteAuxillaryPane[]>([]);
  const [stepCompletionStates, setStepCompletionStates] = useState<Record<ConcreteAuxillaryPane, boolean>>({
    profile: false,
    connects: false,
    interfaces: false,
    btd: false,
  });
  const [isCompletingStep, setIsCompletingStep] = useState(false);

  const canonicalOnboardingComplete = onboardingData?.isOnboardingComplete || false;
  const isAuxillariesSurface = Boolean(sessionUser);
  const isUnlockedSurface = canonicalOnboardingComplete || isAuxillariesSurface;
  const visibleSteps = isAuxillariesSurface ? AUXILLARY_RING_STEPS : AUXILLARY_FLOW_STEPS;

  useEffect(() => {
    requestAnimationFrame(() => {
      containerRef.current?.focus();
      setAnimationsEnabled(true);
    });
  }, []);

  useEffect(() => {
    const { data: authListener } = supabaseClient.auth.onAuthStateChange((_event, session) => {
      queryClient.setQueryData(['auth', 'user'], session?.user ?? null);

      if (session?.user) {
        queryClient.invalidateQueries({ queryKey: ['auth', 'profile'] });
        queryClient.invalidateQueries({ queryKey: ['auth', 'onboarding'] });
      } else {
        queryClient.removeQueries({ queryKey: ['auth'] });
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [supabaseClient, queryClient]);

  useEffect(() => {
    setActiveWindow(windowProp);
  }, [windowProp]);

  useEffect(() => {
    const requestedStep = normalizeAuxillaryPane(initialStep) ?? routeStep;
    if (!requestedStep) return;

    if (sessionUser) {
      setActiveWindow('SignUpWindow');
    }
    setCurrentStep(requestedStep);
  }, [initialStep, routeStep, sessionUser]);

  useEffect(() => {
    if (sessionUser && activeWindow === 'SignInWindow') {
      setActiveWindow('SignUpWindow');
    }
  }, [activeWindow, sessionUser]);

  useEffect(() => {
    if (!onboardingData) return;

    setCompletedSteps(normalizeAuxillarySteps(onboardingData.completedSteps));

    if (!isAuxillariesSurface && onboardingData.currentStep && !initialStep && !routeStep) {
      setCurrentStep(normalizeAuxillaryPane(onboardingData.currentStep) || 'profile');
    }
  }, [onboardingData, isAuxillariesSurface, initialStep, routeStep]);

  const handleStepCompletionChange = useCallback((step: ConcreteAuxillaryPane, isComplete: boolean) => {
    queueMicrotask(() => {
      startTransition(() => {
        setStepCompletionStates((previous) => ({ ...previous, [step]: isComplete }));
      });
    });
  }, []);

  const availableSteps = useMemo(() => {
    if (isAuxillariesSurface) {
      return visibleSteps;
    }

    const available: ConcreteAuxillaryPane[] = [];

    for (const step of completedSteps) {
      if (step === 'interfaces') {
        if (completedSteps.includes('connects')) {
          available.push('interfaces');
        }
      } else {
        available.push(step);
      }
    }

    if (completedSteps.includes('connects')) {
      if (!available.includes('interfaces')) {
        available.push('interfaces');
      }
      if (!available.includes('btd')) {
        available.push('btd');
      }
    }

    if (!available.includes(currentStep)) {
      available.push(currentStep);
    }

    return available;
  }, [completedSteps, currentStep, isAuxillariesSurface, visibleSteps]);

  const updateOnboardingMutation = useMutation({
    mutationFn: async (step: ConcreteAuxillaryPane) => {
      const response = await fetch('/api/auxillaries/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completedStep: step }),
      });

      if (!response.ok) {
        throw new Error(`Failed to update onboarding: ${response.status}`);
      }

      return response.json();
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['auth', 'onboarding'], data);
    },
    onError: (_error, step) => {
      setCompletedSteps((previous) => previous.filter((existingStep) => existingStep !== step));
      if (step) {
        setStepCompletionStates((previous) => ({ ...previous, [step]: false }));
      }
    },
  });

  const updateProfileMutation = useMutation({
    mutationFn: async (updated: any) => {
      const response = await fetch('/api/auxillaries/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      return updated;
    },
    onSuccess: (updated) => {
      queryClient.setQueryData(['auth', 'profile'], (old: any) => ({ ...old, ...updated }));
    },
  });

  const handleSignOut = useCallback(async () => {
    try {
      await supabaseClient.auth.signOut();
      trackEvent('auth_sign_out');
      queryClient.removeQueries({ queryKey: ['auth'] });
    } catch (err) {
      reportError(err);
    } finally {
      setActiveWindow('SignInWindow');
      if (pathname && pathname.startsWith('/executions')) {
        router.replace('/');
      }
    }
  }, [pathname, queryClient, router, supabaseClient]);

  const handleStepComplete = useCallback(async (step: ConcreteAuxillaryPane) => {
    if (completedSteps.includes(step) || isCompletingStep) {
      return;
    }

    setIsCompletingStep(true);
    const newCompletedSteps = [...completedSteps, step];
    setCompletedSteps(newCompletedSteps);
    trackEvent(isAuxillariesSurface ? 'orbital_step_completed' : 'onboarding_step_completed', { step });

    try {
      await updateOnboardingMutation.mutateAsync(step);
    } catch (error) {
      console.error('Step completion failed:', error);
    } finally {
      setIsCompletingStep(false);
    }

    if (!isAuxillariesSurface) {
      if (!newCompletedSteps.includes('profile')) {
        setCurrentStep('profile');
      } else if (!newCompletedSteps.includes('connects')) {
        setCurrentStep('connects');
      } else if (!newCompletedSteps.includes('interfaces')) {
        setCurrentStep('interfaces');
      } else if (!newCompletedSteps.includes('btd')) {
        setCurrentStep('btd');
      }
    }
  }, [completedSteps, isCompletingStep, isAuxillariesSurface, updateOnboardingMutation]);

  const handleStepClick = useCallback((step: AuxillaryPane) => {
    if (!step || !availableSteps.includes(step as ConcreteAuxillaryPane)) {
      return;
    }

    setCurrentStep(step as ConcreteAuxillaryPane);
    trackEvent(isAuxillariesSurface ? 'orbital_step_click' : 'onboarding_step_click', { step });
  }, [availableSteps, isAuxillariesSurface]);

  const toggleWindow = useCallback(() => {
    setActiveWindow((value) => (value === 'SignInWindow' ? 'SignUpWindow' : 'SignInWindow'));
  }, []);

  const showSignup = useCallback(() => {
    setActiveWindow('SignUpWindow');
  }, []);

  useEffect(() => {
    if (
      !isAuxillariesSurface &&
      stepCompletionStates[currentStep] &&
      !completedSteps.includes(currentStep) &&
      !isCompletingStep
    ) {
      handleStepComplete(currentStep);
    }
  }, [completedSteps, currentStep, handleStepComplete, isCompletingStep, isAuxillariesSurface, stepCompletionStates]);

  useEffect(() => {
    if (canonicalOnboardingComplete) {
      trackEvent('onboarding_complete');
    }
  }, [canonicalOnboardingComplete]);

  const renderStepContent = useCallback((step: AuxillaryPane) => {
    switch (step) {
      case 'profile':
        return (
          <ProfilePane
            loading={profileLoading}
            initialEmail={profileData?.email || sessionUser?.email}
            initialUsername={profileData?.username}
            initialDisplayName={profileData?.display_name}
            initialBio={profileData?.bio}
            initialCompanyName={profileData?.company_name}
            initialAvatarUrl={profileData?.avatar_url}
            initialTeamMembers={profileData?.team_members}
            initialIsVerified={profileData?.is_verified ?? !!sessionUser?.email_confirmed_at}
            isOnboardingComplete={isUnlockedSurface}
            onCompletionStatusChange={
              isAuxillariesSurface ? undefined : (isComplete) => handleStepCompletionChange('profile', isComplete)
            }
            onSave={async (updated) => {
              try {
                await updateProfileMutation.mutateAsync(updated);
                await handleStepComplete('profile');
              } catch (err) {
                console.error('Profile save error:', err);
              }
            }}
          />
        );
      case 'connects':
        return (
          <ConnectsPane
            loading={false}
            isOnboardingComplete={isUnlockedSurface}
            onCompletionStatusChange={
              isAuxillariesSurface ? undefined : (isComplete) => handleStepCompletionChange('connects', isComplete)
            }
            onSave={async () => {
              await handleStepComplete('connects');
            }}
          />
        );
      case 'btd':
        return (
          <BTDPane
            loading={false}
            isOnboardingComplete={isUnlockedSurface}
            onCompletionStatusChange={
              isAuxillariesSurface ? undefined : (isComplete) => handleStepCompletionChange('btd', isComplete)
            }
            onSave={async (updated) => {
              try {
                await fetch('/api/auxillaries/model-preferences', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(updated),
                });
                await handleStepComplete('btd');
              } catch (err) {
                console.error('BTD defaults save error:', err);
              }
            }}
          />
        );
      case 'interfaces':
        return (
          <InterfacesPane
            loading={false}
            isOnboardingComplete={isUnlockedSurface}
            onCompletionStatusChange={
              isAuxillariesSurface ? undefined : (isComplete) => handleStepCompletionChange('interfaces', isComplete)
            }
            onSave={async (updated) => {
              try {
                await fetch('/api/auxillaries/model-preferences', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(updated),
                });
                queryClient.invalidateQueries({ queryKey: ['auth', 'profile'] });
                await handleStepComplete('interfaces');
              } catch (err) {
                console.error('Model preferences save error:', err);
              }
            }}
          />
        );
      default:
        return null;
    }
  }, [
    handleStepComplete,
    handleStepCompletionChange,
    isAuxillariesSurface,
    isUnlockedSurface,
    profileData,
    profileLoading,
    queryClient,
    sessionUser,
    updateProfileMutation,
  ]);

  const showLoginPane = activeWindow === 'SignInWindow' && !sessionUser;
  const usesApplicationOverlay = isApplicationRoute;
  const usesContainedAuxillariesSurface = usesApplicationOverlay || isDedicatedAuxillariesRoute;
  const auxillariesSurfaceClass = isDedicatedAuxillariesRoute ? 'orbital-system-route' : 'orbital-system-overlay';
  const auxillariesBackgroundClass = usesContainedAuxillariesSurface
    ? 'orbital-application-background'
    : showLoginPane
      ? 'login-background-glow'
      : 'account-background-highlight';
  const auxillariesBackgroundAnimationClass =
    !usesContainedAuxillariesSurface && deferredAnimationsEnabled ? 'animations-enabled' : '';

  return (
    <div
      ref={containerRef}
      className={`orbital-system ${auxillariesSurfaceClass} ${activeWindow === 'SignUpWindow' && !isAuxillariesSurface && !usesApplicationOverlay ? 'orbital-system-onboarding' : ''} ${usesApplicationOverlay ? 'orbital-system-application' : ''} ${isDedicatedAuxillariesRoute ? 'orbital-system-route-surface' : ''} ${deferredAnimationsEnabled ? '' : 'animations-disabled'} ${className}`}
      tabIndex={0}
      onKeyDown={(event) => event.key === 'Escape' && onClose?.()}
    >
      <div className="orbital-header-buttons">
        {onClose && (
          <button
            data-orbital-testid="orbital-close-button"
            onClick={onClose}
            className="orbital-close-button"
            aria-label="Close"
          >
            <svg viewBox="0 0 24 24" width={24} height={24} fill="currentColor">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg>
          </button>
        )}

        {authLoaded && !sessionUser && (
          <button
            data-orbital-testid="orbital-toggle-button"
            onClick={toggleWindow}
            className="orbital-toggle-button"
            aria-label={activeWindow === 'SignInWindow' ? 'Create Account' : 'Sign in'}
          >
            <FlipText
              text={activeWindow === 'SignInWindow' ? 'Create Account' : 'Sign in'}
              className="inline-block"
            />
          </button>
        )}

        {authLoaded && sessionUser && (
          <button
            onClick={handleSignOut}
            className="orbital-signout-button"
            aria-label="Sign Out"
          >
            Sign Out
          </button>
        )}
      </div>

      <GPUAcceleration>
        <OrbitalRings
          count={4}
          baseSize={30}
          sizeIncrement={15}
          activeIndex={showLoginPane ? 0 : getAuxillaryRingIndex(currentStep)}
          className={`${auxillariesBackgroundClass} ${auxillariesBackgroundAnimationClass}`.trim()}
        />
      </GPUAcceleration>

      <ContentVisibility containSize="600px 400px">
        {showLoginPane ? (
          <motion.div
            key="login"
            className="orbital-content-container orbital-auth-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25 }}
          >
            <AuxillariesLoginPane
              onClose={onClose}
              onToggle={showSignup}
              surfaceVariant={usesContainedAuxillariesSurface ? 'contained' : 'default'}
            />
          </motion.div>
        ) : (
          <AuxillariesContent
            mode={isAuxillariesSurface ? 'auxillaries' : 'onboarding'}
            steps={visibleSteps}
            currentStep={currentStep}
            completedSteps={completedSteps}
            availableSteps={availableSteps}
            showContent
            showSuccessAnimation={!isAuxillariesSurface}
            navigationMode="tabs"
            surfaceVariant={usesContainedAuxillariesSurface ? 'contained' : 'default'}
            onStepClick={handleStepClick}
            renderStepContent={renderStepContent}
            isOnboardingComplete={canonicalOnboardingComplete}
          />
        )}
      </ContentVisibility>
    </div>
  );
}
