"use client";
// Orbitals overlay root (plural experience)

import React, { useState, useEffect, useRef, useCallback, useMemo, useDeferredValue } from "react";
import { useRouter, usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';
import { useUser, useProfile, useOnboarding } from '@/hooks/use-auth-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createClient } from '@engi/supabase/ssr/client';

// Lazy load everything except React
const trackEvent = (...args: any[]) => {
  import('@engi/google-analytics').then(m => m.trackEvent(...args));
};
const reportError = (...args: any[]) => {
  import('@engi/errors').then(m => m.reportError(...args));
};

// Import OrbitalRings directly - it's needed immediately and lightweight
import OrbitalRings from "@/components/base/engi/orbitals/orbital-rings";
import { GPUAcceleration } from '@/components/base/engi/perf/GPUAcceleration';
import { ContentVisibility } from '@/components/base/engi/perf/ContentVisibility';

// Lazy load FlipText - it has framer-motion but only used for toggle button
const FlipText = dynamic(() => import("@/components/base/engi/layout/sidebars/FlipText"), { 
  ssr: false,
  loading: () => <span className="inline-block">Login</span> // Simple fallback
});

// Dynamically import heavy pane components
const LoginPane = dynamic(() => import("./OrbitalsLoginPane"), {
  ssr: false,
  loading: () => <div className="animate-pulse h-96 w-full" />
});
const OrbitalContent = dynamic(() => import("./OrbitalsContent"), {
  ssr: false,
  loading: () => <div className="animate-pulse h-96 w-full" />
});
const ProfilePane = dynamic(() => import("./OrbitalsProfilePane"), {
  ssr: false,
  loading: () => <div className="animate-pulse h-64 w-full" />
});
const ConnectsPane = dynamic(() => import("./OrbitalsConnectsPane"), {
  ssr: false,
  loading: () => <div className="animate-pulse h-64 w-full" />
});
const CreditsPane = dynamic(() => import("./OrbitalsCreditsPane"), {
  ssr: false,
  loading: () => <div className="animate-pulse h-64 w-full" />
});
const ModelsPane = dynamic(() => import("./OrbitalsModelsPane"), {
  ssr: false,
  loading: () => <div className="animate-pulse h-64 w-full" />
});

export type OrbitalPane = "profile" | "connects" | "credits" | "models" | null;

// Simple, clean interface - no complex props
export interface OrbitalProps {
  window?: 'SignInWindow' | 'SignUpWindow';
  onClose?: () => void;
  className?: string;
  initialStep?: OrbitalPane | null;
}

// This is the ONLY component - always works the same way
export default function Orbital({
  window: windowProp = 'SignInWindow',
  onClose,
  className = "",
  initialStep = null,
}: OrbitalProps) {
  // Defer animations for instant initial render
  const [animationsEnabled, setAnimationsEnabled] = useState(false);
  const deferredAnimationsEnabled = useDeferredValue(animationsEnabled);
  
  // Focus management
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // Enable animations after first paint
    requestAnimationFrame(() => {
      containerRef.current?.focus();
      setAnimationsEnabled(true);
    });
  }, []);

  // Use React Query for instant cached auth data
  const queryClient = useQueryClient();
  const { data: sessionUser, isLoading: userLoading } = useUser();
  const { data: profileData, isLoading: profileLoading } = useProfile();
  const { data: onboardingData, isLoading: onboardingLoading } = useOnboarding();
  
  // Auth state is loaded when user query completes
  const authLoaded = !userLoading;
  
  // Get Supabase client singleton
  const [supabaseClient] = useState(() => createClient());
  const router = useRouter();
  const pathname = usePathname();
  
  // Listen for auth changes and update React Query cache
  useEffect(() => {
    const { data: authListener } = supabaseClient.auth.onAuthStateChange((_event, session) => {
      // Update React Query cache when auth changes
      queryClient.setQueryData(['auth', 'user'], session?.user ?? null);
      // Invalidate profile and onboarding queries to refetch
      if (session?.user) {
        queryClient.invalidateQueries({ queryKey: ['auth', 'profile'] });
        queryClient.invalidateQueries({ queryKey: ['auth', 'onboarding'] });
      } else {
        // Clear all auth data on sign out
        queryClient.removeQueries({ queryKey: ['auth'] });
      }
    });

    return () => { authListener.subscription.unsubscribe(); };
  }, [supabaseClient, queryClient]);

  const handleSignOut = useCallback(async () => {
    try {
      await supabaseClient.auth.signOut();
      trackEvent('auth_sign_out');
      // Clear React Query cache on sign out
      queryClient.removeQueries({ queryKey: ['auth'] });
    } catch (err) {
      reportError(err);
    } finally {
      // Keep orbital open and switch to login view
      setActiveView('login');
      // If currently on an authenticated page, redirect to home
      if (pathname && pathname.startsWith('/executions')) {
        router.replace('/');
      }
    }
  }, [supabaseClient, queryClient, pathname, router]);

  // View state: login or account (the 4 tabs)
  const [activeWindow, setActiveWindow] = useState<'SignInWindow' | 'SignUpWindow'>(windowProp);
  
  // Onboarding state - use React Query data with local state for UI
  const [currentStep, setCurrentStep] = useState<OrbitalPane>(initialStep ?? 'profile');
  const [completedSteps, setCompletedSteps] = useState<OrbitalPane[]>([]);
  const [stepCompletionStates, setStepCompletionStates] = useState<Record<OrbitalPane, boolean>>({ 
    'profile': false,
    'connects': false,
    'models': true, // Always completable (optional)
    'credits': false
  });
  const isOnboardingComplete = onboardingData?.isOnboardingComplete || false;
  const [isCompletingStep, setIsCompletingStep] = useState(false);
  
  // Update local state when React Query data changes
  useEffect(() => {
    if (onboardingData) {
      setCompletedSteps(onboardingData.completedSteps || []);
      if (onboardingData.currentStep) {
        setCurrentStep(onboardingData.currentStep);
      }
    }
  }, [onboardingData]);

  // Steps are ALWAYS in this order
  const STEPS: OrbitalPane[] = ['profile', 'connects', 'models', 'credits'];

  // Current step index for rings animation
  const currentStepIndex = useMemo(() => {
    return currentStep ? STEPS.indexOf(currentStep) : 0;
  }, [currentStep]);

  // Available steps (sequential unlock)
  const availableSteps = useMemo(() => {
    const available: OrbitalPane[] = [];
    
    // Add completed steps EXCEPT models (which has special rules)
    for (const step of completedSteps) {
      if (step === 'models') {
        // Models is only available after connects is completed
        if (completedSteps.includes('connects')) {
          available.push('models');
        }
      } else {
        // All other completed steps are always available
        available.push(step);
      }
    }
    
    // After connects is completed, both models AND credits become available
    // (since models is optional, users can skip to credits)
    if (completedSteps.includes('connects')) {
      if (!available.includes('models')) {
        available.push('models');
      }
      if (!available.includes('credits')) {
        available.push('credits');
      }
    }
    
    // Always include the current step (next uncompleted step)
    if (currentStep && !available.includes(currentStep)) {
      available.push(currentStep);
    }
    
    return available;
  }, [completedSteps, currentStep]);

  // Use mutation for updating onboarding status
  const updateOnboardingMutation = useMutation({
    mutationFn: async (step: OrbitalPane) => {
      const response = await fetch('/api/orbitals/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completedStep: step })
      });
      
      if (!response.ok) {
        throw new Error(`Failed to update onboarding: ${response.status}`);
      }
      
      return response.json();
    },
    onSuccess: (data) => {
      // Update React Query cache with new onboarding data
      queryClient.setQueryData(['auth', 'onboarding'], data);
    },
    onError: (error, step) => {
      console.error('Failed to update onboarding status:', error);
      // Revert local state on failure
      setCompletedSteps(prev => prev.filter(s => s !== step));
      if (step !== 'models') {
        setStepCompletionStates(prev => ({ ...prev, [step]: false }));
      }
    }
  });
  
  // Use mutation for updating profile
  const updateProfileMutation = useMutation({
    mutationFn: async (updated: any) => {
      const response = await fetch('/api/orbitals/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated)
      });
      
      if (!response.ok) {
        throw new Error('Failed to update profile');
      }
      
      return updated;
    },
    onSuccess: (updated) => {
      // Update React Query cache with new profile data
      queryClient.setQueryData(['auth', 'profile'], (old: any) => ({ ...old, ...updated }));
    }
  });

  // Handle step completion with React Query mutation
  const handleStepComplete = useCallback(async (step: OrbitalPane) => {
    if (step && !completedSteps.includes(step) && !isCompletingStep) {
      setIsCompletingStep(true);
      const newCompletedSteps = [...completedSteps, step];
      setCompletedSteps(newCompletedSteps);
      trackEvent('onboarding_step_completed', { step });

      try {
        // Update backend using mutation
        await updateOnboardingMutation.mutateAsync(step);
      } catch (error) {
        // Error already handled by mutation onError
        console.error('Step completion failed:', error);
      } finally {
        setIsCompletingStep(false);
      }

      // Auto-advance to next uncompleted step
      if (!newCompletedSteps.includes('profile')) {
        setCurrentStep('profile');
      } else if (!newCompletedSteps.includes('connects')) {
        setCurrentStep('connects');
      } else if (!newCompletedSteps.includes('credits')) {
        setCurrentStep('credits');
      }
    }
  }, [completedSteps, isCompletingStep, updateOnboardingMutation]);

  // Handle step click
  const handleStepClick = useCallback((step: OrbitalPane) => {
    if (step && availableSteps.includes(step)) {
      setCurrentStep(step);
      trackEvent('onboarding_step_click', { step });
    }
  }, [availableSteps]);

  // Toggle between login and account views
  const toggleWindow = useCallback(() => {
    setActiveWindow(v => v === 'SignInWindow' ? 'SignUpWindow' : 'SignInWindow');
  }, []);

  const showSignup = useCallback(() => {
    setActiveWindow('SignUpWindow');
  }, []);

  // Auto-advance when current step becomes completable
  useEffect(() => {
    if (currentStep && stepCompletionStates[currentStep] && !completedSteps.includes(currentStep) && !isCompletingStep) {
      handleStepComplete(currentStep);
    }
  }, [stepCompletionStates, currentStep, completedSteps, handleStepComplete, isCompletingStep]);

  // Track onboarding completion
  useEffect(() => {
    if (isOnboardingComplete) {
      trackEvent('onboarding_complete');
    }
  }, [isOnboardingComplete]);

  // Render step content
  const renderStepContent = useCallback((step: OrbitalPane) => {
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
            isOnboardingComplete={isOnboardingComplete}
            onCompletionStatusChange={(isComplete) => setStepCompletionStates(prev => ({ ...prev, 'profile': isComplete }))}
            onSave={async (updated) => {
              try {
                await updateProfileMutation.mutateAsync(updated);
                handleStepComplete('profile');
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
            isOnboardingComplete={isOnboardingComplete}
            onCompletionStatusChange={(isComplete) => setStepCompletionStates(prev => ({ ...prev, 'connects': isComplete }))}
            onSave={() => handleStepComplete('connects')}
          />
        );
      case 'credits':
        return (
          <CreditsPane
            loading={false}
            isOnboardingComplete={isOnboardingComplete}
            onCompletionStatusChange={(isComplete) => setStepCompletionStates(prev => ({ ...prev, 'credits': isComplete }))}
            onSave={() => handleStepComplete('credits')}
          />
        );
      case 'models':
        return (
          <ModelsPane
            loading={false}
            isOnboardingComplete={isOnboardingComplete}
            onCompletionStatusChange={(isComplete) => setStepCompletionStates(prev => ({ ...prev, 'models': isComplete }))}
            onSave={async (updated) => {
              try {
                // Use a separate mutation for model preferences
                await fetch('/api/orbitals/model-preferences', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(updated)
                });
                // Invalidate profile query to get updated preferences
                queryClient.invalidateQueries({ queryKey: ['auth', 'profile'] });
                handleStepComplete('models');
              } catch (err) {
                console.error('Model preferences save error:', err);
              }
            }}
          />
        );
      default:
        return null;
    }
  }, [profileLoading, profileData, sessionUser, isOnboardingComplete, handleStepComplete]);

  return (
    <div
      ref={containerRef}
      className={`orbital-system orbital-system-overlay ${activeWindow === 'SignUpWindow' ? 'orbital-system-onboarding' : ''} ${deferredAnimationsEnabled ? '' : 'animations-disabled'} ${className}`}
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Escape' && onClose?.()}
    >
      {/* Header buttons - absolutely positioned top left */}
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
            aria-label={activeWindow === 'SignInWindow' ? 'Create Account' : 'Login'}
          >
            <FlipText 
              text={activeWindow === 'SignInWindow' ? 'Create Account' : 'Login'}
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

      {/* Background Rings */}
      <GPUAcceleration>
        <OrbitalRings
        count={4}
        baseSize={30}
        sizeIncrement={15}
        activeIndex={activeWindow === 'SignInWindow' ? 0 : currentStepIndex}
        className={`orbital-system-background ${activeWindow === 'SignInWindow' ? 'login-background-glow' : 'account-background-highlight'} ${deferredAnimationsEnabled ? 'animations-enabled' : ''}`}
        />
      </GPUAcceleration>

      {/* Content - No AnimatePresence initially for performance */}
      <ContentVisibility containSize="600px 400px">
        {activeWindow === 'SignInWindow' ? (
          <LoginPane 
            key="login"
            onClose={onClose} 
            onToggle={showSignup} 
          />
        ) : (
          <OrbitalContent
            key="account"
            steps={STEPS}
            currentStep={currentStep}
            completedSteps={completedSteps}
            availableSteps={availableSteps}
            showContent={true}
            showSuccessAnimation={false}
            onStepClick={handleStepClick}
            renderStepContent={renderStepContent}
            isOnboardingComplete={isOnboardingComplete}
          />
        )}
      </ContentVisibility>
    </div>
  );
}
  // Update active view when mode prop changes
  useEffect(() => {
    setActiveWindow(windowProp);
  }, [windowProp]);

  // Respond to deep-link step changes
  useEffect(() => {
    if (initialStep) {
      setActiveWindow('SignUpWindow');
      setCurrentStep(initialStep);
    }
  }, [initialStep]);

  // Parse pathname for /orbitals/<orbital> deep links as a fallback
  useEffect(() => {
    const path = pathname || '';
    const m = path.match(/\/orbitals\/(users|connects|models|credits)\b/i);
    if (m) {
      const step = (m[1] === 'users' ? 'profile' : m[1]) as OrbitalPane;
      setActiveWindow('SignUpWindow');
      setCurrentStep(step);
    }
  }, [pathname]);
