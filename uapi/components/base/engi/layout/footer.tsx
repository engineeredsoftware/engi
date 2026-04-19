"use client";

import React from 'react'
import Image from 'next/image';
import Link from 'next/link';



// Icons are inlined where needed to avoid pulling extra JS from icon packs.
// import "../styles/footer-animations.css";
// import ShimmerButtonDemo from './button-shimmer';
// import { DisabledTooltipWrapper } from './disabled-tooltip-wrapper';
// import AudioPlayer from './AudioPlayer';
import { FEATURE_FLAGS } from '@/config/features';
import { useEffect, useState, useMemo } from 'react';
import { createClient } from '@bitcode/supabase/ssr/client';
import EngiSoftwareSvgLogo from '@/components/base/engi/branding/engi-software-svg-logo';
import { openOrbital, prefetchOrbital } from '@/app/orbitals/components/OrbitalsProvider';
import { BITCODE_PUBLIC_COPY } from '@/components/base/engi/layout/bitcode-public-copy';
import BitcodeInlineExplainer from '@/components/base/engi/execution/BitcodeInlineExplainer';
import { BITCODE_PUBLIC_EXPLAINERS } from '@/components/base/engi/layout/bitcode-public-explainers';

const APPLICATION_URL = '/application';
const DEFAULT_OPERATOR_GUIDE_URL =
  process.env.NEXT_PUBLIC_BITCODE_OPERATOR_GUIDE_URL?.trim() || '/docs';
const CURRENT_PROTOCOL_SPEC_URL = 'https://github.com/engineeredsoftware/ENGI/blob/main/ENGI_SPEC.txt';

const footerNavs = [
  {
    label: "Product",
    items: [
      {
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
  const footerCtaLabel = user
    ? BITCODE_PUBLIC_COPY.footer.userCta
    : BITCODE_PUBLIC_COPY.footer.guestCta;
  const footerLinks = useMemo(() => [
    {
      ariaLabel: 'Network',
      label: BITCODE_PUBLIC_COPY.footer.links.network,
      meta: 'Public route',
      href: '/',
      explainer: BITCODE_PUBLIC_EXPLAINERS.network,
      icon: (
        <span
          className="inline-flex items-center justify-center"
          style={{
            filter: 'drop-shadow(0 0 6px rgba(103,254,183,0.66)) drop-shadow(0 0 15px rgba(103,254,183,0.33))',
          }}
        >
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="h-[15px] w-[15px] text-emerald-300"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="8.5" />
            <path d="M6.5 12h11" />
            <path d="M12 6.5c2.8 2.4 2.8 8.6 0 11" />
            <path d="M12 6.5c-2.8 2.4-2.8 8.6 0 11" />
          </svg>
        </span>
      ),
    },
    {
      ariaLabel: 'Transactions',
      label: BITCODE_PUBLIC_COPY.footer.links.transactions,
      meta: 'Bitcode app',
      href: APPLICATION_URL,
      explainer: BITCODE_PUBLIC_EXPLAINERS.transactions,
      icon: (
        <span
          className="inline-flex items-center justify-center"
          style={{
            filter: 'drop-shadow(0 0 6px rgba(16,185,129,0.66)) drop-shadow(0 0 15px rgba(16,185,129,0.33))',
          }}
        >
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="h-[15px] w-[15px] text-emerald-300"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3.5" y="4.5" width="17" height="15" rx="2.5" />
            <path d="M8 9h8" />
            <path d="M8 13h5" />
            <circle cx="16.5" cy="13.5" r="1.5" fill="currentColor" stroke="none" />
          </svg>
        </span>
      ),
    },
    {
      ariaLabel: 'Docs',
      label: BITCODE_PUBLIC_COPY.footer.links.docs,
      meta: 'Guide + walkthrough',
      href: DEFAULT_OPERATOR_GUIDE_URL,
      explainer: BITCODE_PUBLIC_EXPLAINERS.docs,
      icon: (
        <span
          className="inline-flex items-center justify-center"
          style={{
            filter: 'drop-shadow(0 0 6px rgba(251,146,60,0.66)) drop-shadow(0 0 15px rgba(251,146,60,0.33))',
          }}
        >
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="h-[15px] w-[15px] text-orange-300"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="8.5" />
            <path d="M10 8.8v6.4l5-3.2-5-3.2Z" fill="currentColor" stroke="none" />
          </svg>
        </span>
      ),
    },
    {
      ariaLabel: 'Bitcode on Bluesky',
      label: BITCODE_PUBLIC_COPY.footer.links.bluesky,
      meta: 'Bluesky',
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
  ], []);
  const isExternalHref = (href: string) => href.startsWith('http');

  return (
    <>
      <footer className={`w-full border-t ${showPrimaryContent ? 'mt-10 px-4 tablet:px-6 laptop:px-8 desktop:px-12 wide:px-16' : 'mt-0'} ${className}`}>
        <div className={showPrimaryContent ? 'mx-auto w-full max-w-7xl' : 'w-full px-4 tablet:px-6 laptop:px-8 desktop:px-12 wide:px-16'}>
          {showPrimaryContent && (
            <div className="flex flex-col gap-10 p-4 py-12 tablet:gap-12 tablet:pb-16 laptop:flex-row laptop:justify-between">
              <div className="flex max-w-lg flex-col gap-4">
                <Link href="/" className="flex items-center gap-8">
                  <EngiSoftwareSvgLogo
                    width="115px"
                    height="auto"
                    softwareOffsetY="-4px"
                  />
                </Link>
                <div className="max-w-lg">
                  <div className="z-10 mt-2 flex w-full flex-col items-start text-left">
                    <ol className="mt-2 flex flex-wrap gap-x-2 gap-y-1 text-sm tablet:text-base">
                      {BITCODE_PUBLIC_COPY.footer.steps.map((step, index) => (
                        <li key={step} className="step-item">
                          {index < 2 ? (
                            <>
                              <span className="text-green-primary step-number">{index + 1}.</span>
                              <span className="step-text">{step}</span>
                            </>
                          ) : (
                            <>
                              <span className="dragon-icon [filter:drop-shadow(0_0_6px_rgba(101,254,183,0.66))_drop-shadow(0_0_15px_rgba(101,254,183,0.33))]" style={{ display: 'inline-block', transform: 'scaleX(-1)' }}>🐉</span>
                              <span className="relative inline-block">
                                <span className="relative z-10 engi-text">{step}</span>
                                <span className="absolute left-0 top-0 z-0 engi-text-glow">{step}</span>
                              </span>
                            </>
                          )}
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
                {FEATURE_FLAGS.DISABLE_USING && !user ? (
                  <div className="w-full max-w-xs">
                    <button
                      disabled
                      className="mt-3 flex w-full items-center justify-center gap-1 rounded-full bg-blue-600 px-4 py-2 text-white opacity-50 filter grayscale"
                    >
                      {BITCODE_PUBLIC_COPY.footer.guestCta}
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
                    type="button"
                    onMouseEnter={() => prefetchOrbital()}
                    onClick={() => openOrbital(user ? 'orbitals' : 'login', user ? 'profile' : undefined)}
                    className="mt-3 inline-flex w-full max-w-xs items-center justify-center gap-1 rounded-full bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
                  >
                    {footerCtaLabel}
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
              <div className="grid grid-cols-1 gap-8 tablet:grid-cols-2 tablet:gap-6 laptop:min-w-[16rem]">
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
            <div className="flex w-full flex-col gap-4 tablet:gap-5">
              <div className="grid w-full grid-cols-1 gap-2 phone:grid-cols-2 laptop:grid-cols-[repeat(4,minmax(0,1fr))]">
                {footerLinks.map((social) => (
                  isExternalHref(social.href) ? (
                    <a
                      key={social.ariaLabel}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.ariaLabel}
                      className="group inline-flex min-h-[4.25rem] items-start gap-3 rounded-[1.25rem] border border-white/8 bg-white/[0.03] px-3.5 py-3 text-left text-sm text-gray-500 transition-colors hover:border-emerald-300/20 hover:bg-emerald-400/[0.06] hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300"
                    >
                      {social.icon}
                      <span className="flex min-w-0 flex-1 flex-col">
                        <span className="whitespace-nowrap">{social.label}</span>
                        <span aria-hidden="true" className="mt-1 text-[11px] uppercase tracking-[0.18em] text-gray-500/70 dark:text-gray-500/80">
                          {social.meta}
                        </span>
                      </span>
                    </a>
                  ) : (
                    <span key={social.ariaLabel} className="inline-flex items-start gap-2">
                      <Link
                        href={social.href}
                        aria-label={social.ariaLabel}
                        className="group inline-flex min-h-[4.25rem] flex-1 items-start gap-3 rounded-[1.25rem] border border-white/8 bg-white/[0.03] px-3.5 py-3 text-left text-sm text-gray-500 transition-colors hover:border-emerald-300/20 hover:bg-emerald-400/[0.06] hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300"
                      >
                        {social.icon}
                        <span className="flex min-w-0 flex-1 flex-col">
                          <span className="whitespace-nowrap">{social.label}</span>
                          <span aria-hidden="true" className="mt-1 text-[11px] uppercase tracking-[0.18em] text-gray-500/70 dark:text-gray-500/80">
                            {social.meta}
                          </span>
                        </span>
                      </Link>
                      {social.explainer ? (
                        <BitcodeInlineExplainer
                          explainer={social.explainer}
                          side="top"
                          triggerClassName="mt-2 h-4.5 w-4.5 shrink-0 border-white/8 bg-white/[0.03] text-[0.58rem] text-gray-400 hover:border-emerald-300/30 hover:bg-emerald-400/10 hover:text-emerald-100"
                        />
                      ) : null}
                    </span>
                  )
                ))}
                {/* FEATURE_FLAGS.FOOTER_MUSIC_PLAYER && (
                  <AudioPlayer
                    src="/audio/footer-vibe.mp3"
                    songName="Right Right Right (Paris) * Nils Frahm"
                  />
                ) */}
              </div>
              <div className="flex w-full flex-col items-start justify-between gap-4 tablet:flex-row tablet:items-center">
                <span className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <span
                  className="[filter:drop-shadow(0_0_6px_rgba(101,254,183,0.66))_drop-shadow(0_0_15px_rgba(101,254,183,0.33))]"
                  style={{ display: 'inline-block', transform: 'scaleX(-1)' }}
                >
                  🐉
                </span>
                <span>
                  Bitcode by Advanced Engineered Software, Inc. <span className="font-light">{new Date().getFullYear()}</span>
                </span>
                </span>
                <div className="flex w-full flex-col items-start gap-3 tablet:w-auto tablet:items-end">
                  <Link href="/" className="cursor-pointer">
                    <EngiSoftwareSvgLogo
                      width="50px"
                      height="auto"
                      className="-mb-0.5"
                      softwareClassName="ml-0.5 font-light text-xs tracking-wide bg-gradient-to-r from-[#65FEB7] via-white to-[#65FEB7] text-transparent bg-clip-text"
                      softwareOffsetY="-2px"
                    />
                  </Link>
                  <div className="flex w-full flex-wrap items-center gap-2 text-[11px] text-gray-400/80 tablet:w-auto tablet:justify-end">
                    {process.env.NEXT_PUBLIC_APP_VERSION && (
                      <span className="select-none rounded-full border border-white/8 bg-white/[0.03] px-2.5 py-1">
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
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/8 bg-white/[0.03] px-2.5 py-1">
                      <a
                        href={CURRENT_PROTOCOL_SPEC_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-300/90 transition-colors hover:text-white"
                      >
                        Protocol spec
                      </a>
                      <BitcodeInlineExplainer
                        explainer={BITCODE_PUBLIC_EXPLAINERS.protocolSpec}
                        side="top"
                        triggerClassName="h-4.5 w-4.5 border-white/8 bg-white/[0.03] text-[0.58rem] text-gray-400 hover:border-emerald-300/30 hover:bg-emerald-400/10 hover:text-emerald-100"
                      />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Styles moved to global CSS for better caching */}
    </>
  );
}
