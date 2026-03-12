"use client";

import React from 'react'
import Image from 'next/image';



// Icons are inlined where needed to avoid pulling extra JS from icon packs.
// import "../styles/footer-animations.css";
// import ShimmerButtonDemo from './button-shimmer';
// import { DisabledTooltipWrapper } from './disabled-tooltip-wrapper';
// import AudioPlayer from './AudioPlayer';
import { FEATURE_FLAGS } from '@/config/features';
import { useEffect, useState, useMemo } from 'react';
import { createClient } from '@engi/supabase/ssr/client';
import EngiSoftwareSvgLogo from '@/components/base/engi/branding/engi-software-svg-logo';

const footerNavs = [
  {
    label: "Product",
    items: [
      {
        //href: "https://github.com/apps/the-engi-app-beta",
        href: "https://github.com/marketplace/engi-github-app",
        name: "GitHub App",
      },
      {
        href: "#pricing",
        name: "Pricing",
      },
      {
        href: "#faq",
        name: "FAQ",
      },
    ],
  },
  //{
  //label: "Company",
  //items: [
  //{
  //href: "/about",
  //name: "About Us",
  //},
  //{
  //href: "/support",
  //name: "Support",
  //},
  //{
  //href: "/contact",
  //name: "Contact",
  //},
  //],
  //},
  {
    label: "Resources",
    items: [
      //{
      //href: "/lightpaper",
      //name: "Lightpaper",
      //},
      {
        href: "/terms",
        name: "Terms",
      },
      //{
      //href: "/blog",
      //name: "Blog",
      //},
    ],
  },
  //{
  //label: "Legal",
  //items: [
  //],
  //},
];

const footerSocials = [
  {
    name: 'Bluesky',
    label: (
      <>
        <span className="super-shiny-text special-text font-semibold text-[rgba(103,254,183,0.95)]">
          $ENGI
        </span>
        <span>&apos;s Social Media</span>
      </>
    ),
    href: 'https://bsky.app/profile/engicomms.bsky.social',
    icon: (
      <span
        className="inline-flex items-center justify-center"
        style={{
          filter: 'drop-shadow(0 0 6px rgba(61,131,246,0.66)) drop-shadow(0 0 15px rgba(61,131,246,0.33))',
        }}
      >
        <Image
          src="/Bluesky_butterfly-logo.svg"
          alt=""
          width={14}
          height={14}
          className="h-[14px] w-[14px]"
        />
      </span>
    ),
  },
];

interface FooterProps {
  showPrimaryContent?: boolean;
  className?: string;
}

export default function Footer({ showPrimaryContent = true, className = '' }: FooterProps) {
  // Supabase client and user state for authentication CTA
  const supabase = useMemo(() => createClient(), []);
  const [user, setUser] = useState<import('@supabase/supabase-js').User | null>(null);
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => {
      listener.subscription.unsubscribe();
    };
  }, [supabase]);
  const text = user ? 'Subscribe' : 'Use';

  return (
    <>
      <footer className={`w-full border-t ${showPrimaryContent ? 'mt-10 px-4 tablet:px-6 laptop:px-8 desktop:px-12 wide:px-16' : 'mt-0'} ${className}`}>
        <div className={showPrimaryContent ? 'mx-auto w-full max-w-7xl' : 'w-full px-4 tablet:px-6 laptop:px-8 desktop:px-12 wide:px-16'}>
          {showPrimaryContent && (
            <div className="gap-4 p-4 py-16 tablet:pb-16 laptop:flex laptop:justify-between">
              <div className="mb-12 flex flex-col gap-4">
                <a href="/" className="flex items-center gap-8">
                  <EngiSoftwareSvgLogo
                    width="115px"
                    height="auto"
                    softwareOffsetY='-12px'
                  />
                </a>
                <div className="max-w-lg">
                  <div className="z-10 mt-2 flex w-full flex-col items-start text-left whitespace-nowrap">
                    <ol className="mt-2 flex gap-x-2 text-base">
                      <li className="step-item">
                        <span className="text-green-primary step-number">1.</span>
                        <span className="step-text">Install</span>
                      </li>
                      <li className="step-item">
                        <span className="text-green-primary step-number">2.</span>
                        <span className="step-text">Fund</span>
                      </li>
                      <li className="step-item">
                        <span className="dragon-icon [filter:drop-shadow(0_0_6px_rgba(101,254,183,0.66))_drop-shadow(0_0_15px_rgba(101,254,183,0.33))]" style={{ display: 'inline-block', transform: 'scaleX(-1)' }}>🐉</span>
                        <span className="relative inline-block">
                          <span className="relative z-10 engi-text">Accelerate</span>
                          <span className="absolute left-0 top-0 z-0 engi-text-glow">Accelerate</span>
                        </span>
                      </li>
                    </ol>
                  </div>
                </div>
                {FEATURE_FLAGS.DISABLE_USING && !user ? (
                  <div className="w-full">
                    <button
                      disabled
                      className="w-full mt-3 opacity-50 cursor-not-allowed pointer-events-none filter grayscale px-4 py-2 bg-blue-600 text-white rounded flex items-center justify-center gap-1"
                    >
                      {text}
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="ml-1 size-4"
                      >
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => document.dispatchEvent(new Event('open-orbitals'))}
                    className="mt-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded flex items-center gap-1 font-medium"
                  >
                    {text}
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="ml-1 size-4 transition-all duration-300 ease-out group-hover:translate-x-1"
                    >
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 gap-8 tablet:grid-cols-2 tablet:gap-6">
                {footerNavs.map((nav) => (
                  <div key={nav.label}>
                    <h2 className="mb-6 text-sm font-semibold uppercase text-gray-900 dark:text-white">
                      {nav.label}
                    </h2>
                    <ul className="grid gap-2">
                      {nav.items.map((item) => {
                        const isDisabled = item.name === 'Terms';
                        return (
                          <li key={item.name}>
                            <a
                              href={item.href}
                              className={
                                isDisabled
                                  ? 'inline-flex items-center justify-start gap-1 text-gray-400 dark:text-gray-400 opacity-50 cursor-default pointer-events-none'
                                  : 'group inline-flex cursor-pointer items-center justify-start gap-1 text-gray-400 duration-200 hover:text-gray-600 hover:opacity-90 dark:text-gray-400 dark:hover:text-gray-200'
                              }
                              target={item.href.startsWith('http') ? '_blank' : undefined}
                              rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                            >
                              {item.name}
                              {!isDisabled && (
                                <svg
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="h-4 w-4 translate-x-0 transform opacity-0 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:opacity-100"
                                >
                                  <polyline points="9 18 15 12 9 6" />
                                </svg>
                              )}
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className={`${showPrimaryContent ? 'border-t' : ''} w-full py-4`}>
            <div className="flex w-full items-center justify-between gap-4">
              <div className="flex items-center space-x-5">
                {footerSocials.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target={social.href.startsWith('http') ? '_blank' : undefined}
                    rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="group inline-flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300"
                  >
                    {social.icon}
                    <span className="whitespace-nowrap">{social.label}</span>
                    <span className="sr-only">{social.name}</span>
                  </a>
                ))}
                {/* FEATURE_FLAGS.FOOTER_MUSIC_PLAYER && (
                  <AudioPlayer
                    src="/audio/footer-vibe.mp3"
                    songName="Right Right Right (Paris) * Nils Frahm"
                  />
                ) */}
              </div>
              <a href="/" className="cursor-pointer">
                <EngiSoftwareSvgLogo
                  width="50px"
                  height="auto"
                  className="-mb-0.5"
                  softwareClassName="ml-0.5 font-light text-xs tracking-wide bg-gradient-to-r from-[#65FEB7] via-white to-[#65FEB7] text-transparent bg-clip-text"
                  softwareOffsetY="-6px"
                />
              </a>
            </div>
            <div className="mt-2 flex w-full items-center justify-between gap-4">
              <span className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <span
                  className="[filter:drop-shadow(0_0_6px_rgba(101,254,183,0.66))_drop-shadow(0_0_15px_rgba(101,254,183,0.33))]"
                  style={{ display: 'inline-block', transform: 'scaleX(-1)' }}
                >
                  🐉
                </span>
                <span>
                  Advanced Engineered Software, Inc. <span className="font-light">{new Date().getFullYear()}</span>
                </span>
              </span>
              {process.env.NEXT_PUBLIC_APP_VERSION && (
                <span className="text-[10px] text-gray-400/70 select-none">
                  v{process.env.NEXT_PUBLIC_APP_VERSION}
                  {process.env.NEXT_PUBLIC_APP_VERSION_DATE && (
                    <>
                      {" "}
                      ({new Date(process.env.NEXT_PUBLIC_APP_VERSION_DATE).toLocaleDateString(undefined, {
                        year: '2-digit',
                        month: 'short',
                        day: 'numeric',
                      })})
                    </>
                  )}
                </span>
              )}
            </div>
          </div>
        </div>
      </footer>

      {/* Styles moved to global CSS for better caching */}
    </>
  );
}
