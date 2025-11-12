"use client";

import React from 'react'



// Icons are inlined where needed to avoid pulling extra JS from icon packs.
// import "../styles/footer-animations.css";
// import ShimmerButtonDemo from './button-shimmer';
// import { DisabledTooltipWrapper } from './disabled-tooltip-wrapper';
// import AudioPlayer from './AudioPlayer';
import { FEATURE_FLAGS } from '@/config/features';
import { useEffect, useState, useMemo } from 'react';
import { createClient } from '@engi/supabase/ssr/client';
import EngiSoftwareSvgLogo from '@/components/base/engi/branding/engi-software-svg-logo';

// Tiny chevron icon (replaces lucide-react import)
const ChevronRightIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

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
    name: 'X',
    href: 'https://x.com/engisoftware',
    icon: (
      <svg fill="currentColor" viewBox="0 0 24 24" className="size-4">
        <path d="M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5685 21H20.8131L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z" />
      </svg>
    ),
  },
];

export default function Footer() {
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
      <footer className="border-t px-4 tablet:px-6 laptop:px-8 desktop:px-12 wide:px-16 mt-10">
        <div className="mx-auto max-w-7xl w-full">
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
                      <span className="text-green-primary step-number">3.</span>
                      <span className="dragon-icon [filter:drop-shadow(0_0_6px_rgba(101,254,183,0.66))_drop-shadow(0_0_15px_rgba(101,254,183,0.33))]" style={{ display: 'inline-block', transform: 'scaleX(-1)' }}>🐉</span>
                      <span className="relative inline-block">
                        <span className="relative z-10 engi-text">Accelerate</span>
                        <span className="absolute left-0 top-0 z-0 engi-text-glow">Accelerate</span>
                      </span>
                    </li>
                  </ol>
                </div>
              </div>
              {/* CTA button */}
              {FEATURE_FLAGS.DISABLE_USING && !user ? (
                // Preserve full width when disabled to keep tooltip alignment
                <div className="w-full">
                  <button
                    disabled
                    className="w-full mt-3 opacity-50 cursor-not-allowed pointer-events-none filter grayscale px-4 py-2 bg-blue-600 text-white rounded flex items-center justify-center gap-1"
                  >
                    {text}
                    <ChevronRightIcon className="ml-1 size-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => document.dispatchEvent(new Event('open-orbitals'))}
                  className="mt-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded flex items-center gap-1 font-medium"
                >
                  {text}
                  <ChevronRightIcon className="ml-1 size-4 transition-all duration-300 ease-out group-hover:translate-x-1" />
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
                              <ChevronRightIcon className="h-4 w-4 translate-x-0 transform opacity-0 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:opacity-100" />
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

          <div className="border-t py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-5">
                {footerSocials.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="fill-gray-500 text-gray-500 hover:fill-gray-900 hover:text-gray-900 dark:hover:fill-gray-600 dark:hover:text-gray-600"
                  >
                    {social.icon}
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
            <div className="flex items-center justify-between mt-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Advanced Engineered Software, Inc. <span className="font-light">{new Date().getFullYear()}</span>
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
