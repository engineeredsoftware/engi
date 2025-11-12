"use client";

import React, { useEffect, useState, useMemo, useCallback } from "react";
import Logo from "@/components/base/engi/branding/logo";
import { CreditsTracker } from "@/components/base/engi/credits/credits-tracker";
import { useAuth } from '@/components/base/engi/auth/AuthProvider';
import { useUserData } from '@/hooks/useUserData';
import { openOrbital, prefetchOrbital } from '@/app/orbitals/components/OrbitalsProvider';
import { NotificationsWidget } from "@/components/base/engi/notifications/NotificationsWidget"
import { OrbitalUseButton } from "@/components/base/engi/nav/OrbitalUseButton";
import { FEATURE_FLAGS } from "@/config/features"
import { ENABLE_MEASURE } from "@/config/featureFlags";
import { UserMenu } from "@/components/base/engi/layout/user-menu";
import Image from "next/image";
import { usePathname, useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { DisabledTooltipWrapper } from "@/components/base/engi/overlays/disabled-tooltip-wrapper";

const MemoCreditsTracker = React.memo(CreditsTracker);
const MemoNotificationsWidget = React.memo(NotificationsWidget);

const NavProcessingIndicator = dynamic(
  () => import('@/components/base/engi/indicators/NavProcessingIndicator').then(m => ({ default: m.NavProcessingIndicator })),
  { ssr: false, loading: () => null }
);

const baseShadow = '[text-shadow:_0_0_6px_rgba(255,255,255,0.33)]';
const hoverShadowClass = 'hover:[text-shadow:_0_0_12px_rgba(101,254,183,0.66),_0_0_20px_rgba(101,254,183,0.66)]';

function useScrollPosition() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const isScrolled = window.scrollY > 10;
          setScrolled((prev) => (prev !== isScrolled ? isScrolled : prev));
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrolled;
}

function shouldApplyCollapseAnimation(pathname: string | null): boolean {
  if (!pathname) return false;
  return pathname.startsWith('/executions');
}

export default function Nav() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading: loadingSession } = useAuth();
  const { data: aggregatedData, credits, hasGitHubConnection, isLoading: userDataLoading } = useUserData();

  const [showNavUse, setShowNavUse] = useState(false);
  const [isAnimated, setIsAnimated] = useState(false);

  // Decorative elements for use button
  const orbitalElements = useMemo(() => [...Array(3)].map((_, i) => (
    <div key={i} className="orbital-neo" style={{ '--index': i } as React.CSSProperties} />
  )), []);
  const particleElements = useMemo(() => [...Array(5)].map((_, i) => (
    <div key={i} className="neo-particle" style={{ '--index': i } as React.CSSProperties} />
  )), []);

  const isMidOnboarding = useMemo(() => {
    if (!user || userDataLoading) return false;
    return !hasGitHubConnection || credits <= 0;
  }, [user, userDataLoading, hasGitHubConnection, credits]);

  // Initialize nav use visibility
  useEffect(() => {
    if (localStorage.getItem('hasVisitedSite')) {
      setShowNavUse(true);
    } else {
      localStorage.setItem('hasVisitedSite', 'true');
    }
  }, []);

  // Global event listeners for opening orbital
  useEffect(() => {
    const openLogin = () => openOrbital('SignInWindow');
    const openOnboarding = () => openOrbital('SignUpWindow');
    document.addEventListener('open-orbitals', openLogin);
    document.addEventListener('start-onboarding', openOnboarding);
    return () => {
      document.removeEventListener('open-orbitals', openLogin);
      document.removeEventListener('start-onboarding', openOnboarding);
    };
  }, []);

  // Handle notification callbacks
  const handleMarkAsRead = useCallback((id: string) => {
    console.log('Marked as read:', id);
  }, []);

  const handleMarkAllAsRead = useCallback(() => {
    console.log('Marked all as read');
  }, []);

  const handleNotificationClick = useCallback((notification: any) => {
    console.log('Clicked notification:', notification);
  }, []);

  // Animation timing
  useEffect(() => {
    const timer = setTimeout(() => setIsAnimated(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const isScrolled = useScrollPosition();
  const shouldCollapse = shouldApplyCollapseAnimation(pathname);

  // Determine if the nav should be fixed
  const shouldBeFixed = useMemo(() => {
    if (user) return true;
    if (!pathname) return true;
    if (pathname === '/') return false;
    return true;
  }, [user, pathname]);

  // Determine if the nav should be visually collapsed
  const isCollapsed = shouldCollapse && isScrolled;

  // Compute positioning class
  const positionClass = shouldBeFixed
    ? 'fixed inset-x-0 top-0 mx-auto'
    : 'relative';

  // Compute translateY for expanded (offset) or collapsed (pinned) state
  const transformValue = isCollapsed ? 'translateY(0)' : 'translateY(calc(var(--banner-offset,0px) + 4rem))';

  const handleLogoClick = () => {
    router.push('/')
  }

  return (
    <div className="relative">
      <div
        className={`nav-container-global ${positionClass} z-50 ${isCollapsed ? 'nav-scrolled-bg' : ''} ${isAnimated ? 'nav-container-animated' : 'opacity-0'} ${isCollapsed ? 'w-[80%]' : 'w-full'}`}
        style={{
          transformOrigin: 'center top',
          transform: transformValue,
          width: isCollapsed ? '80%' : '100%',
          transition: shouldCollapse
            ? isCollapsed
              ? 'transform 500ms ease-in-out, width 250ms ease-in-out'
              : 'transform 250ms ease-in-out, width 500ms ease-in-out'
            : undefined,
          padding: '2px',
          paddingBottom: '16px',
          isolation: 'isolate',
          border: 'none',
        }}
      >
        <div className="flex items-center justify-between px-4 tablet:px-6 laptop:px-8 desktop:px-12 wide:px-16 py-4 pb-6 max-w-7xl mx-auto">
          <div className="flex items-center w-full">
            <div onClick={handleLogoClick} className={`cursor-pointer ${isAnimated ? 'nav-logo-animated' : 'opacity-0'}`}>
              <Logo beta />
            </div>
            {/* Nav links shown only when signed in */}
            {!user && <div className="flex-1" />}
            {user && (
              <ul className="flex items-center space-x-2 phone:space-x-4 tablet:space-x-6 text-sm phone:text-base tablet:text-lg w-full justify-center tablet:ml-[130px]">
                {[
                  { href: '/executions?type=pipeline:deliverables&postprocessingType=pipeline:deliverables', label: 'deliverables' },
                  { href: '/executions?type=pipeline:measure&postprocessingType=pipeline:measure', label: 'measure' },
                ].map(({ href, label }, index) => {
                  // Check if this nav item should be disabled
                  const isMeasureItem = label === 'measure';
                  const isDisabledByFeatureFlag = isMeasureItem && !ENABLE_MEASURE;
                  const isDisabled = isMidOnboarding || isDisabledByFeatureFlag;
                  const shouldAnimate = !isDisabled;
                  return (
                    <li key={href}
                      className={`${shouldAnimate ? 'nav-item-animated' : ''}`.trim()}
                      style={{ '--item-index': index } as React.CSSProperties}
                    >
                      <div className="group relative">
                        {isDisabled ? (
                          <span
                            data-testid={`nav-${label}-link`}
                            className={`
                          text-xl font-light text-neutral-700 dark:text-neutral-300
                          relative transition-all duration-200 ease-in-out
                          px-1 py-2 inline-block origin-left
                          ${baseShadow} opacity-50 pointer-events-none
                        `}
                          >
                            <span className="inline-block">{label}</span>
                            <div className="absolute left-1/2 -translate-x-1/2 -bottom-8 hidden group-hover:block">
                              <div className="bg-black/90 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                                {isDisabledByFeatureFlag ? 'Coming Soon' : 'Complete Onboarding'}
                              </div>
                              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-black/90 rotate-45"></div>
                            </div>
                          </span>
                        ) : (
                          <a
                            data-testid={`nav-${label}-link`}
                            href={href}
                            className={`
                          text-xl font-light relative transition-all duration-200 ease-in-out 
                          px-1 py-2 inline-block origin-left 
                          ${pathname?.startsWith('/executions')
                                ? 'nav-item-active !text-emerald-400'
                                : `text-neutral-700 dark:text-neutral-300 nav-item-hover-effect ${hoverShadowClass}`}
                          ${pathname !== href && baseShadow}
                        `}
                          >
                            <span className={`
                          inline-block transition-transform duration-200 ease-in-out
                          ${pathname === href ? 'nav-item-active-text' : ''}
                        `}>
                              {label}
                            </span>

                            {pathname?.startsWith('/executions') && FEATURE_FLAGS.NAV_PROCESSING_INDICATOR && (
                              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 scale-75 opacity-80">
                                <NavProcessingIndicator
                                  isActive={false}
                                  isAuthenticated={Boolean(user)}
                                />
                              </div>
                            )}
                          </a>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          <div className="flex items-center justify-center space-x-4">
            {user ? (
              <div className={isAnimated ? 'nav-controls-animated flex space-x-4' : 'opacity-0 flex space-x-4'}>
                {!FEATURE_FLAGS.HIDE_CREDITS_TRACKER && (
                  <MemoCreditsTracker
                    credits={credits}
                    isActive={credits > 0}
                  />
                )}

                {FEATURE_FLAGS.NOTIFICATIONS && (
                  <MemoNotificationsWidget
                    onMarkAsRead={handleMarkAsRead}
                    onMarkAllAsRead={handleMarkAllAsRead}
                    onNotificationClick={handleNotificationClick}
                  />
                )}

                <UserMenu
                  user={user}
                  onManageAccount={() => openOrbital('account')}
                  onSignOut={() => {
                    import('@engi/supabase/ssr/client').then(({ createClient }) => {
                      const client = createClient();
                      client.auth.signOut().finally(() => {
                        // Show login pane after sign out
                        openOrbital('login');
                        // Redirect from authenticated pages
                        if (pathname && (pathname.startsWith('/deliverables') || pathname.startsWith('/upgrades'))) {
                          router.replace('/');
                        }
                      });
                    });
                  }}
                />
              </div>
            ) : (
              showNavUse && (
                <div className={isAnimated ? 'opacity-100 transition-opacity duration-500 delay-300' : 'opacity-0'}>
                  {FEATURE_FLAGS.DISABLE_USING ? (
                    <DisabledTooltipWrapper tooltip="Coming Soon" className="inline-block">
                      <OrbitalUseButton isDisabled orbitals={orbitalElements} particles={particleElements} />
                    </DisabledTooltipWrapper>
                  ) : (
                    <OrbitalUseButton
                      onHoverPrefetch={() => prefetchOrbital()}
                      onClick={() => openOrbital(user ? 'account' : 'login')}
                      orbitals={orbitalElements}
                      particles={particleElements}
                    />
                  )}
                </div>
              )
            )}
          </div>
        </div>
      </div>

      {/* Spacer below the nav */}
      <div
        className={`transition-all duration-500 ease-out ${shouldBeFixed ? (isCollapsed ? 'h-28' : 'h-36') : 'h-0'
          }`}
      />
    </div>
  );
}
