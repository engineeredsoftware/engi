'use client';
/* eslint-disable react/no-multi-comp */

import React, { memo, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRightIcon,
  CircleStackIcon,
  CubeTransparentIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
  EyeIcon,
  LinkIcon,
  LockClosedIcon,
  ScaleIcon,
  ShieldCheckIcon,
  Squares2X2Icon,
} from '@heroicons/react/24/outline';

import EngiPill from '@/components/base/engi/branding/engi-pill';
import EngiSoftwareSvgLogo from '@/components/base/engi/branding/engi-software-svg-logo';
import Logo from '@/components/base/engi/branding/logo';
import { QuantumOrb, minimalPreset } from '@/components/base/engi/effects/quantum-orb';
import Footer from '@/components/base/engi/layout/footer';
import MultiLineTypingAnimation from '@/components/base/engi/multi-line-typing-animation';
import MarketingEmbeddedDemoSection from './MarketingEmbeddedDemoSection';

import '../../../styles/coming-soon-fix.css';
import '../../../styles/coming-soon-glow-fix.css';
import '../../../styles/particle-effect.css';

type Particle = {
  id: number;
  x: number;
  y: number;
  delay: number;
  size: number;
  dx: number;
  dy: number;
  duration: number;
};

const entranceEase = [0.16, 1, 0.3, 1] as const;
const animatedMotionStyle: React.CSSProperties = {
  willChange: 'transform, opacity',
  transform: 'translateZ(0)',
  backfaceVisibility: 'hidden',
};
const paintedMotionStyle: React.CSSProperties = {
  ...animatedMotionStyle,
  contain: 'paint',
};
const BACKGROUND_PARTICLES: readonly Particle[] = Array.from({ length: 14 }, (_, index) => ({
  id: index,
  x: (index * 17.5 + 11) % 100,
  y: (index * 23.25 + 7) % 100,
  delay: (index * 0.37) % 5,
  size: 2 + (index % 4),
  dx: (((index * 5) % 9) - 4) * 10,
  dy: (((index * 7) % 9) - 4) * 9,
  duration: 7 + (index % 5),
}));

const productPillars = [
  {
    title: 'Deposit',
    description: 'Public deposits turn technical assets into source material for later measurement.',
    Icon: CubeTransparentIcon,
  },
  {
    title: 'Measure',
    description: 'Provable measurement makes raw source economically legible to licensed reads.',
    Icon: ScaleIcon,
  },
  {
    title: 'EARN $ENGI',
    description: 'Deposited contributions become live, licensable depot supply. Metered consumption issues $ENGI.',
    Icon: CurrencyDollarIcon,
  },
] as const;

const measurementAxes = [
  {
    label: 'Quantity',
    value: 92,
    detail: 'normalized and deduplicated source volume',
  },
  {
    label: 'Quality',
    value: 96,
    detail: 'correctness, structure, reproducibility, trust',
  },
  {
    label: 'Valence',
    value: 73,
    detail: 'utility, novelty, demand fit, anti-noise confidence',
  },
] as const;
const measureCardReadNeed = 'typed auth migration rollback for monorepo services';
const measureCardAxes = [
  { label: 'Quality', value: 96 },
  { label: 'Trust', value: 84 },
  { label: 'Dedupe', value: 73 },
] as const;

const previewRows = [
  {
    key: 'assets',
    valueParts: ['code', 'docs', 'diagrams', 'PDFs'],
    accentClassName: 'from-cyan-400/18 via-sky-400/8 to-transparent',
    Icon: DocumentTextIcon,
    valuesGridClassName: 'grid-cols-2 laptop:grid-cols-4 desktop:grid-cols-2',
    iconClassName: 'text-white/58',
  },
  {
    key: 'context at deposit',
    valueParts: ['commits', 'citations', 'authorship', 'metadata'],
    accentClassName: 'from-fuchsia-400/18 via-purple-400/8 to-transparent',
    Icon: LinkIcon,
    valuesGridClassName: 'grid-cols-2 laptop:grid-cols-4 desktop:grid-cols-2',
    iconClassName: 'text-white/58',
  },
  {
    key: 'chunks',
    valueParts: ['stable hashes', 'segments', 'embeddings'],
    accentClassName: 'from-emerald-400/18 via-teal-400/8 to-transparent',
    Icon: Squares2X2Icon,
    valuesGridClassName: 'grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-2',
    iconClassName: 'text-white/58',
  },
  {
    key: 'issuance',
    valueParts: ['supplier', 'issuance event', '$ENGI'],
    accentClassName: 'from-orange-400/18 via-amber-300/8 to-transparent',
    Icon: CurrencyDollarIcon,
    valuesGridClassName: 'grid-cols-1 phone:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-[minmax(0,1.28fr)_minmax(0,0.92fr)]',
    iconClassName: 'text-white/58',
  },
] as const;

const surfaceModes = ['Assess', 'Deposit', 'License*', 'Earnings'] as const;
const measuremintCandles = [
  { left: '8%', wickTop: '38%', wickHeight: '28%', bodyTop: '49%', bodyHeight: '12%', bullish: true },
  { left: '18%', wickTop: '44%', wickHeight: '20%', bodyTop: '52%', bodyHeight: '10%', bullish: false },
  { left: '30%', wickTop: '34%', wickHeight: '30%', bodyTop: '45%', bodyHeight: '14%', bullish: true },
  { left: '42%', wickTop: '46%', wickHeight: '18%', bodyTop: '53%', bodyHeight: '8%', bullish: false },
  { left: '56%', wickTop: '40%', wickHeight: '26%', bodyTop: '48%', bodyHeight: '12%', bullish: true },
  { left: '68%', wickTop: '48%', wickHeight: '18%', bodyTop: '55%', bodyHeight: '9%', bullish: false },
  { left: '80%', wickTop: '36%', wickHeight: '30%', bodyTop: '46%', bodyHeight: '15%', bullish: true },
  { left: '90%', wickTop: '45%', wickHeight: '22%', bodyTop: '52%', bodyHeight: '10%', bullish: false },
] as const;
const verificationRows = [
  {
    label: 'Public writes',
    detail: 'technical assets enter as public writes for later measurement',
    status: 'public',
    Icon: CircleStackIcon,
  },
  {
    label: 'Licensed reads',
    detail: 'licensed readers consume the depot while metered usage issues $ENGI',
    status: 'private*',
    Icon: LockClosedIcon,
  },
  {
    label: 'Public proofs',
    detail: 'public proofs verify measurement systems without exposing private bundles',
    status: 'verified',
    Icon: ShieldCheckIcon,
  },
] as const;
const verifiedAccessOrbConfig = {
  ...minimalPreset,
  backgroundColors: ['#0d2f29', '#0f766e', '#6ee7b7'],
  glowColor: '#34d399',
  particleColor: '#6ee7b7',
  coreGlowIntensity: 0.22,
  showBackground: false,
  showWavyBlobs: true,
  showParticles: true,
  showGlowEffects: true,
  showShadow: true,
  speed: 18,
} as const;
const canonicalPathStages = [
  { number: '01', stage: 'deposit' },
  { number: '02', stage: 'ingestion' },
  { number: '03', stage: 'index' },
  { number: '04', stage: 'measure' },
  { number: '05', stage: 'retrieve' },
  { number: '06', stage: 'allocate' },
] as const;
const headlineText = '$ENGI is becoming the tokenized data depot for engineering knowledge.';
const heroHighlightClass = 'super-shiny-text special-text text-[rgba(103,254,183,0.95)]';
const defaultEmbeddedDemoUrl = process.env.NEXT_PUBLIC_ENGI_DEMO_URL?.trim() || 'http://127.0.0.1:4318';
const headlineHighlights = [
  { text: '$ENGI', className: `${heroHighlightClass} font-semibold text-white` },
  { text: 'tokenized data depot', className: heroHighlightClass },
] as const;

function resolveEmbeddedDemoUrl() {
  const configuredUrl = process.env.NEXT_PUBLIC_ENGI_DEMO_URL?.trim();
  if (configuredUrl) {
    return configuredUrl;
  }

  if (typeof window === 'undefined') {
    return defaultEmbeddedDemoUrl;
  }

  const localHostnames = new Set(['localhost', '127.0.0.1', 'host.docker.internal']);
  if (localHostnames.has(window.location.hostname)) {
    return `${window.location.protocol}//${window.location.hostname}:4318`;
  }

  return defaultEmbeddedDemoUrl;
}

function renderOrbitalBullet(className = '', variant: 'purple' | 'orange' | 'green' = 'purple') {
  const outerRingClassName =
    variant === 'orange'
      ? 'border-orange-400/46'
      : variant === 'green'
        ? 'border-emerald-400/52'
        : 'border-fuchsia-400/46';
  const innerRingClassName =
    variant === 'orange'
      ? 'border-orange-300/32'
      : variant === 'green'
        ? 'border-emerald-300/38'
        : 'border-purple-300/32';
  const coreClassName =
    variant === 'orange'
      ? 'bg-orange-400 shadow-[0_0_10px_rgba(251,146,60,0.48)]'
      : variant === 'green'
        ? 'bg-emerald-300 shadow-[0_0_12px_rgba(103,254,183,0.58)]'
        : 'bg-fuchsia-300 shadow-[0_0_10px_rgba(232,121,249,0.48)]';
  const planetClassName =
    variant === 'orange'
      ? 'bg-orange-200 shadow-[0_0_6px_rgba(251,146,60,0.42)]'
      : variant === 'green'
        ? 'bg-emerald-100 shadow-[0_0_8px_rgba(103,254,183,0.52)]'
        : 'bg-purple-200 shadow-[0_0_6px_rgba(216,180,254,0.42)]';

  return (
    <span className={`relative inline-flex h-5 w-5 shrink-0 items-center justify-center ${className}`}>
      <span className={`absolute inset-0 rounded-full border ${outerRingClassName}`} />
      <span className={`absolute inset-[2.5px] rounded-full border ${innerRingClassName}`} />
      <span className={`absolute inset-[8px] rounded-full ${coreClassName}`} />
      <span className={`absolute left-1/2 top-1/2 h-[2.25px] w-[2.25px] -translate-x-1/2 -translate-y-[8px] rounded-full ${planetClassName}`} />
      <span className={`absolute left-1/2 top-1/2 h-[2.25px] w-[2.25px] translate-x-[6px] -translate-y-1/2 rounded-full ${planetClassName}`} />
      <span className={`absolute left-1/2 top-1/2 h-[2.25px] w-[2.25px] -translate-x-1/2 translate-y-[6px] rounded-full ${planetClassName}`} />
      <span className={`absolute left-1/2 top-1/2 h-[2.25px] w-[2.25px] -translate-x-[8px] -translate-y-1/2 rounded-full ${planetClassName}`} />
    </span>
  ) as React.ReactNode;
}

function renderTrailingOrangeAsterisk(value: string, asteriskClassName = '') {
  if (!value.endsWith('*')) {
    return value;
  }

  return (
    <>
      {value.slice(0, -1)}
      <span className={`ml-[0.16em] inline-block leading-none text-orange-300 ${asteriskClassName}`.trim()}>*</span>
    </>
  ) as React.ReactNode;
}

export const ComingSoonAccessForm = memo(function ComingSoonAccessForm() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [shake, setShake] = useState(false);
  const timeoutIdsRef = useRef<number[]>([]);

  useEffect(() => {
    return () => {
      timeoutIdsRef.current.forEach((timeoutId) => window.clearTimeout(timeoutId));
      timeoutIdsRef.current = [];
    };
  }, []);

  const schedule = (fn: () => void, delay: number) => {
    const timeoutId = window.setTimeout(fn, delay);
    timeoutIdsRef.current.push(timeoutId);
  };

  const handlePasswordSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (password.trim() === 'engi/acc') {
      setSuccess(true);

      try {
        localStorage.setItem('mid_launch_auth', 'true');
      } catch {
        /* ignore */
      }

      schedule(() => {
        window.location.reload();
      }, 650);

      return;
    }

    setError('Incorrect incantation. 🍏');
    setShake(true);
    schedule(() => setShake(false), 700);
  };

  return (
    <motion.form
      onSubmit={handlePasswordSubmit}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3, ease: entranceEase }}
      className="mt-4 max-w-xl rounded-[24px] border border-emerald-300/12 bg-black/25 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.32)] backdrop-blur-xl phone:mt-5"
      style={paintedMotionStyle}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-200/72">
            Paid Writing, Private Reading, Public Verification
          </p>
          <p className="mt-1 text-[13px] leading-5 text-emerald-100/68">
            Use the dataset for research and development. Contact Advanced Engineered Software,
            Inc. to request access.
          </p>
        </div>
        <div className="flex min-h-[22px] items-center gap-3">
          <span className="rounded-full border border-emerald-400/20 bg-emerald-500/8 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-emerald-200/72">
            restricted dataset
          </span>
          <span className="text-sm text-red-300">{error || ''}</span>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-3 phone:flex-row">
        <motion.div
          animate={shake ? { x: [-8, 8, -6, 6, -3, 3, 0] } : { x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1"
          style={animatedMotionStyle}
        >
          <input
            type="password"
            placeholder="access code"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
              if (error) {
                setError('');
              }
            }}
            disabled={success}
            className="w-full rounded-2xl border border-emerald-300/22 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-emerald-100/35 focus:border-emerald-300/45 disabled:opacity-60"
          />
        </motion.div>

        <button
          type="submit"
          disabled={success}
          className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-emerald-300/25 bg-emerald-400/10 px-4 py-3 text-sm font-medium text-emerald-50 transition-all hover:border-emerald-300/45 hover:bg-emerald-400/14 disabled:cursor-default disabled:opacity-70 phone:w-auto"
        >
          {success ? 'Unlocked' : 'Enter dataset'}
          <ArrowRightIcon className="h-4 w-4" />
        </button>
      </div>
      {success && <p className="mt-3 text-sm text-emerald-300">Access granted.</p>}
    </motion.form>
  );
});

const ComingSoonMicroPost = memo(function ComingSoonMicroPost() {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3, ease: entranceEase }}
      className="relative mt-6 max-w-xl overflow-visible rounded-[24px] border border-emerald-300/12 bg-black/25 p-4 pt-5 shadow-[0_20px_60px_rgba(0,0,0,0.32)] backdrop-blur-xl phone:mt-7 phone:pt-6"
      style={animatedMotionStyle}
    >
      <div className="pointer-events-none absolute left-0 top-0 -translate-x-3 -translate-y-1/2 phone:-translate-x-4">
        <div className="inline-flex items-center rounded-full border border-emerald-300/10 bg-emerald-400/[0.05] px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-emerald-100/58 shadow-[0_10px_24px_rgba(0,0,0,0.18)] backdrop-blur-xl">
          <span>Next</span>
        </div>
      </div>

      <div className="border-b border-emerald-300/10 pb-3 laptop:grid laptop:grid-cols-[minmax(0,1fr)_auto] laptop:items-center laptop:gap-4">
        <div className="min-w-0 laptop:pr-2">
          <p className="bg-gradient-to-r from-emerald-200 via-emerald-100 to-white bg-clip-text text-[11px] font-semibold uppercase leading-[1.35] tracking-[0.18em] text-transparent phone:text-[12px] phone:tracking-[0.22em]">
            ENGI&apos;s Self-Evolution, Now
          </p>
        </div>
        <div className="mt-3 inline-flex max-w-full flex-wrap items-center gap-2 rounded-full border border-emerald-300/10 bg-emerald-400/[0.05] px-2.5 py-1 text-[9px] uppercase leading-4 tracking-[0.18em] text-emerald-100/58 phone:text-[10px] laptop:mt-0 laptop:justify-self-start">
          <span>2026 March</span>
          <span className="text-emerald-200/28">•</span>
          <span>Garrett Maring</span>
        </div>
      </div>

      <p className="mt-3 text-[13px] leading-6 text-emerald-100/72">
        <span className={heroHighlightClass}>$ENGI</span>
        <span>&apos;s purpose is to hoard valuable technical information and compensate contributors
        fairly. Provable knowledge measuring algorithms build the foundations for collection and
        issuance. Ideal long-term partnerships for asset management and infrastructure will be
        finalized to empower the secure and thriving future of </span>
        <span className={heroHighlightClass}>$ENGI</span>
        <span>.</span>
      </p>
    </motion.article>
  );
});

export default function MarketingLandingPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [embeddedDemoUrl, setEmbeddedDemoUrl] = useState(defaultEmbeddedDemoUrl);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    if (!window.matchMedia('(pointer: fine)').matches) {
      container.style.setProperty('--mouse-x', '50%');
      container.style.setProperty('--mouse-y', '50%');
      return;
    }

    let frameId: number | null = null;
    let nextX = 50;
    let nextY = 50;

    const commitMousePosition = () => {
      frameId = null;
      container.style.setProperty('--mouse-x', `${nextX}%`);
      container.style.setProperty('--mouse-y', `${nextY}%`);
    };

    const scheduleCommit = () => {
      if (frameId !== null) {
        return;
      }
      frameId = window.requestAnimationFrame(commitMousePosition);
    };

    const handlePointerMove = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const stageHeight = container.offsetHeight || container.scrollHeight || rect.height;
      nextX = ((event.clientX - rect.left) / rect.width) * 100;
      nextY = ((event.clientY - rect.top) / stageHeight) * 100;
      scheduleCommit();
    };

    const resetMousePosition = () => {
      nextX = 50;
      nextY = 50;
      scheduleCommit();
    };

    container.addEventListener('pointermove', handlePointerMove, { passive: true });
    container.addEventListener('pointerleave', resetMousePosition);

    return () => {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
      container.removeEventListener('pointermove', handlePointerMove);
      container.removeEventListener('pointerleave', resetMousePosition);
    };
  }, []);

  useEffect(() => {
    setEmbeddedDemoUrl(resolveEmbeddedDemoUrl());
  }, []);

  return (
    <>
      <svg width="0" height="0" style={{ position: 'absolute', top: '-9999px' }}>
        <defs>
          <filter id="glow-filter" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feFlood floodColor="#67feb7" floodOpacity="0.8" result="glowColor" />
            <feComposite in="glowColor" in2="coloredBlur" operator="in" result="softGlow" />
            <feMerge>
              <feMergeNode in="softGlow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      <div
        ref={containerRef}
        className="coming-soon-container relative flex w-full flex-col bg-[#030816] text-white"
        style={{
          minHeight: '100svh',
          '--mouse-x': '50%',
          '--mouse-y': '50%',
        } as React.CSSProperties}
      >
        <div className="relative flex min-h-[100svh] w-full flex-col">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(103,254,183,0.14),transparent_34%),linear-gradient(180deg,#07131d_0%,#030816_45%,#02060d_100%)]" />
          <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(103,254,183,0.09)_1px,transparent_1px),linear-gradient(90deg,rgba(103,254,183,0.09)_1px,transparent_1px)] [background-size:160px_160px]" />

          <div className="orbital-system absolute inset-0 opacity-60" style={{ contain: 'paint' }}>
            <div
              className="orbital-ring"
              style={{ '--size': '86%', '--delay': '0s', '--rotation': '' } as React.CSSProperties}
            />
            <div
              className="orbital-ring"
              style={{ '--size': '64%', '--delay': '2.2s', '--rotation': '' } as React.CSSProperties}
            />
            <div
              className="orbital-ring"
              style={{ '--size': '40%', '--delay': '4.4s', '--rotation': '' } as React.CSSProperties}
            />
          </div>

          {BACKGROUND_PARTICLES.map((particle) => (
            <div
              key={particle.id}
              className="quantum-particle absolute rounded-full bg-[#67feb7]"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                boxShadow: `0 0 ${particle.size * 3}px rgba(103, 254, 183, 0.55)`,
                '--particle-dx': `${particle.dx}px`,
                '--particle-dy': `${particle.dy}px`,
                '--particle-duration': `${particle.duration}s`,
                '--particle-delay': `${particle.delay}s`,
              } as React.CSSProperties}
            />
          ))}

          <div
            className="pointer-events-none absolute inset-0 transition-opacity duration-300"
            style={{
              background:
                'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(103, 254, 183, 0.16) 0%, rgba(103, 254, 183, 0.08) 16%, transparent 44%)',
              willChange: 'background',
              contain: 'paint',
            }}
          />
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[46rem] w-[46rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-300/10 blur-3xl" />

          <main className="relative z-20 mx-auto flex w-full max-w-[1380px] flex-1 items-start px-4 py-4 phone:px-5 phone:py-5 tablet:px-6 laptop:items-center laptop:px-8 desktop:px-12">
            <div className="grid w-full gap-4 laptop:grid-cols-[minmax(0,1.02fr)_minmax(320px,0.98fr)] tablet:gap-5 laptop:gap-6">
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: entranceEase }}
              className="flex flex-col justify-center"
              style={animatedMotionStyle}
            >
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-emerald-300/20 bg-emerald-400/10 shadow-[0_0_28px_rgba(103,254,183,0.14)]">
                  <Logo height="h-5" width="w-5" />
                </div>
              </div>

              <div className="mt-4 max-w-2xl space-y-4 phone:mt-5">
                <p className="max-w-xl text-[11px] uppercase tracking-[0.26em] text-emerald-200/70">
                  Compensating knowledge freely, fairly
                </p>
                <h1 className="text-[2.35rem] font-semibold leading-[0.96] text-white phone:text-[2.9rem] tablet:text-[3.6rem] laptop:text-[4.35rem]">
                  <div className="relative max-w-[13ch] phone:max-w-[14ch] tablet:max-w-[15ch] laptop:max-w-[16ch]">
                    <MultiLineTypingAnimation
                      text={headlineText}
                      charDelay={18}
                      startDelay={140}
                      align="left"
                      className="text-white/92 tracking-[-0.02em]"
                      highlightTexts={headlineHighlights}
                    />
                  </div>
                </h1>
                <p className="max-w-[42rem] text-[17px] font-medium leading-[1.5] tracking-[-0.015em] text-white/90 [text-shadow:0_0_18px_rgba(103,254,183,0.05)] phone:text-[19px] tablet:text-[21px]">
                  Deposit code and other technical assets. Quality is provably measured. Consumption distributes rewards. Value accrues to contributors.
                </p>
              </div>

              <div className="mt-4 flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.22em] text-emerald-200/68 phone:mt-5">
                {['PUBLIC WRITES', 'PUBLIC PROOFS', 'LICENSED READS', 'MEASUREMINTING'].map((item) => (
                  <span
                    key={item}
                    className="relative overflow-hidden rounded-[18px] border border-cyan-200/18 bg-[linear-gradient(135deg,rgba(9,22,48,0.82),rgba(18,49,88,0.38))] px-3 py-2 text-cyan-100 shadow-[0_12px_28px_rgba(6,182,212,0.08)] backdrop-blur-md"
                  >
                    <span
                      className="absolute inset-0 opacity-30"
                      style={{
                        backgroundImage:
                          'repeating-linear-gradient(90deg, rgba(255,255,255,0.08) 0 1px, transparent 1px 32px)',
                      }}
                    />
                    <span className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(103,254,183,0.16),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(56,189,248,0.12),transparent_34%)]" />
                    <span className="absolute inset-[1px] rounded-[17px] border border-white/8" />
                    <span className="relative">{item}</span>
                  </span>
                ))}
              </div>

              <div className="mt-4 grid grid-cols-1 gap-2 phone:mt-5 phone:grid-cols-2 phone:gap-3 desktop:grid-cols-3">
                {productPillars.map(({ title, description, Icon }, index) => {
                  const hasEngiInDescription = description.includes('$ENGI');
                  const [beforeEngi, afterEngi] = hasEngiInDescription ? description.split('$ENGI') : [description, ''];

                  return (
                    <motion.div
                      key={title}
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.75,
                        delay: 0.1 + index * 0.08,
                        ease: entranceEase,
                      }}
                      className={`relative overflow-hidden rounded-[24px] border p-3 backdrop-blur-xl phone:p-4 ${
                        title.includes('$ENGI')
                          ? 'border-orange-300/20 bg-black/30 shadow-[0_18px_50px_rgba(79,30,0,0.34)]'
                          : 'border-white/10 bg-white/5 shadow-[0_16px_50px_rgba(2,8,17,0.32)]'
                      } ${title.includes('$ENGI') ? 'phone:col-span-2 desktop:col-span-1' : ''}`}
                      style={paintedMotionStyle}
                    >
                      {title === 'Deposit' ? (
                        <>
                        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(9,6,29,0.98),rgba(40,18,62,0.9))]" />
                        <div
                          className="absolute inset-[10px] rounded-[18px] bg-white/[0.04]"
                          style={{
                            boxShadow:
                              'inset 2px 2px 8px 2px rgba(0,0,0,0.82), 2px 2px 14px 2px rgba(0,0,0,0.18)',
                          }}
                        />
                        <div className="absolute inset-[1px] rounded-[23px] border border-white/20" />
                        <div className="absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-fuchsia-200/70 to-transparent" />
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(192,132,252,0.22),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(236,72,153,0.12),transparent_30%)]" />
                        <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(90deg,transparent_0,transparent_31px,rgba(255,255,255,0.07)_32px),linear-gradient(180deg,transparent_0,transparent_31px,rgba(255,255,255,0.05)_32px)] [background-size:32px_32px]" />
                        <div
                          className="absolute inset-0 opacity-[0.18]"
                          style={{
                            backgroundImage:
                              'radial-gradient(circle, rgba(255,255,255,0.2) 1px, transparent 1px)',
                            backgroundSize: '18px 18px',
                          }}
                        />
                        <div className="relative">
                          <div className="relative min-h-[58px] pr-16 text-violet-100 phone:min-h-[68px] phone:pr-20">
                            <span className="absolute right-0 top-0 inline-flex min-w-[64px] items-center justify-center rounded-full border border-white/12 bg-white/8 px-2.5 py-1 text-center text-[8px] uppercase tracking-[0.16em] text-violet-100/70 phone:min-w-[72px]">
                              source
                            </span>
                            <div className="flex min-w-0 items-start gap-2">
                              <Icon className="h-4 w-4 text-purple-300" />
                              <div className="min-w-0">
                                <p className="bg-gradient-to-r from-purple-300 via-pink-300 to-red-300 bg-clip-text text-[11px] font-semibold uppercase tracking-[0.18em] text-transparent">
                                  {title}
                                </p>
                                <p className="mt-1 max-w-[14ch] text-[9px] uppercase tracking-[0.16em] text-violet-100/52 phone:max-w-[16ch] phone:text-[10px]">
                                  depot material intake
                                </p>
                              </div>
                            </div>
                          </div>
                          <p className="mt-3 text-[11px] leading-4 text-violet-50/88 phone:text-[13px] phone:leading-5">
                            {description}
                          </p>
                          <div className="mt-4 space-y-3 border-t border-white/12 pt-4">
                            <div className="border-l-4 border-purple-400 pl-3">
                              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white">
                                Technical assets
                              </p>
                              <p className="mt-1 text-[11px] leading-4 text-violet-100/72">
                                code, docs, diagrams, PDFs, and notes
                              </p>
                            </div>
                            <div className="border-l-4 border-pink-400 pl-3">
                              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white">
                                Context at deposit
                              </p>
                              <p className="mt-1 text-[11px] leading-4 text-violet-100/72">
                                commits, citations, authorship, and metadata
                              </p>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : title === 'Measure' ? (
                      <>
                        <div className="absolute inset-0 bg-gradient-to-br from-[#021511]/95 via-[#06231f]/84 to-[#02060d]" />
                        <div
                          className="absolute inset-[10px] rounded-[18px] bg-white/[0.04]"
                          style={{
                            boxShadow:
                              'inset 2px 2px 8px 2px rgba(0,0,0,0.82), 2px 2px 14px 2px rgba(0,0,0,0.18)',
                          }}
                        >
                          <div
                            className="absolute inset-0"
                            style={{
                              backgroundImage:
                                'repeating-linear-gradient(90deg, rgba(255,255,255,0.08) 0 1px, transparent 1px 28px), repeating-linear-gradient(0deg, rgba(255,255,255,0.06) 0 1px, transparent 1px 28px)',
                              maskImage:
                                'linear-gradient(180deg, transparent 0%, white 18%, white 82%, transparent 100%)',
                              WebkitMaskImage:
                                'linear-gradient(180deg, transparent 0%, white 18%, white 82%, transparent 100%)',
                            }}
                          />
                          <div className="absolute inset-0 translate-y-[5%] overflow-hidden opacity-80">
                            {measuremintCandles.map((candle, index) => (
                              <React.Fragment key={`measuremint-candle-${index}`}>
                                <span
                                  className={`absolute w-[1px] ${candle.bullish ? 'bg-emerald-300/45' : 'bg-rose-300/40'}`}
                                  style={{
                                    left: candle.left,
                                    top: candle.wickTop,
                                    height: candle.wickHeight,
                                  }}
                                />
                                <span
                                  className={`absolute w-[6px] rounded-[2px] ${candle.bullish ? 'bg-emerald-300/35' : 'bg-rose-300/30'}`}
                                  style={{
                                    left: `calc(${candle.left} - 2px)`,
                                    top: candle.bodyTop,
                                    height: candle.bodyHeight,
                                  }}
                                />
                              </React.Fragment>
                            ))}
                          </div>
                        </div>
                        <div className="absolute inset-[1px] rounded-[23px] border border-emerald-200/10" />
                        <div className="absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-emerald-200/70 to-transparent" />
                        <div className="absolute inset-0 -z-10 opacity-10 [mask-image:linear-gradient(to_bottom,transparent,white,white,transparent)] bg-[repeating-linear-gradient(90deg,#ffffff0d_0_40px,transparent_40px_80px)] bg-[length:160px_160px]" />
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.18),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(45,212,191,0.12),transparent_30%)]" />
                        <div className="relative">
                          <div className="relative min-h-[58px] pr-16 text-emerald-100 phone:min-h-[68px] phone:pr-20">
                            <span className="absolute right-0 top-0 inline-flex min-w-[64px] items-center justify-center rounded-full border border-emerald-200/12 bg-emerald-400/8 px-2.5 py-1 text-center text-[8px] uppercase tracking-[0.16em] text-emerald-50/72 phone:min-w-[72px]">
                              weighted
                            </span>
                            <div className="flex min-w-0 items-start gap-2">
                              <Icon className="h-4 w-4 text-emerald-300" />
                              <div className="min-w-0">
                                <p className="bg-gradient-to-r from-emerald-300 via-emerald-500 to-teal-300 bg-clip-text text-[11px] font-semibold uppercase tracking-[0.18em] text-transparent">
                                  {title}
                                </p>
                                <p className="mt-1 max-w-[16ch] text-[9px] uppercase tracking-[0.16em] text-emerald-100/52 phone:max-w-[18ch] phone:text-[10px]">
                                  quantity + quality + valence
                                </p>
                              </div>
                            </div>
                          </div>
                          <p className="mt-3 text-[11px] leading-4 text-emerald-50/88 phone:text-[13px] phone:leading-5">
                            {description}
                          </p>
                          <div className="relative mt-4">
                            <div className="relative grid grid-cols-3 gap-2">
                              {measureCardAxes.map((axis, axisIndex) => (
                                <div
                                  key={axis.label}
                                  className={`px-1 text-center ${axisIndex === 0 ? '' : 'border-l border-emerald-200/12'}`}
                                >
                                  <p className="whitespace-nowrap text-[7px] uppercase leading-none tracking-[0.12em] text-emerald-200/58">
                                    {axis.label}
                                  </p>
                                  <p className="mt-1 text-[2.2rem] font-semibold leading-none text-white">
                                    {axis.value}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="mt-4 rounded-2xl border border-emerald-200/12 bg-black/25 px-3 py-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
                            <p className="text-[8px] font-semibold uppercase tracking-[0.2em] text-emerald-200/62">
                              read need
                            </p>
                            <p className="mt-1 font-mono text-[10px] leading-4 text-emerald-50/84 phone:text-[11px]">
                              {measureCardReadNeed}
                            </p>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="absolute inset-0 bg-gradient-to-br from-[#170900]/95 via-[#3c1700]/82 to-[#02060d]" />
                        <div
                          className="absolute inset-[10px] rounded-[18px] bg-white/[0.04]"
                          style={{
                            boxShadow:
                              'inset 2px 2px 8px 2px rgba(0,0,0,0.85), 2px 2px 14px 2px rgba(0,0,0,0.18)',
                          }}
                        >
                          <div
                            className="absolute inset-0"
                            style={{
                              backgroundImage:
                                'repeating-linear-gradient(0deg, transparent 0 20px, rgba(255,255,255,0.08) 21px), repeating-linear-gradient(90deg, transparent 0 20px, rgba(255,255,255,0.08) 21px)',
                              maskImage:
                                'radial-gradient(circle 220px at center, white 72%, transparent 100%)',
                              WebkitMaskImage:
                                'radial-gradient(circle 220px at center, white 72%, transparent 100%)',
                            }}
                          />
                        </div>
                        <div className="absolute inset-[1px] rounded-[23px] border border-orange-200/10" />
                        <div className="absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-orange-100/70 to-transparent" />
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(251,146,60,0.24),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(251,191,36,0.08),transparent_30%)]" />
                        <div className="relative">
                          <div className="relative min-h-[58px] pr-16 text-orange-100 phone:min-h-[68px] phone:pr-20">
                            <div className="flex items-start gap-2">
                              <Icon className="h-5 w-5 text-orange-300" />
                              <div className="min-w-0">
                                <p className="bg-gradient-to-r from-white via-orange-100 to-white/80 bg-clip-text text-[11px] font-semibold uppercase tracking-[0.18em] text-transparent">
                                  {title}
                                </p>
                                <p className="mt-1 max-w-[14ch] text-[9px] uppercase tracking-[0.16em] text-orange-100/52 phone:max-w-[16ch] phone:text-[10px]">
                                  supplier issuance
                                </p>
                              </div>
                            </div>
                            <div className="absolute right-0 top-0">
                              <EngiSoftwareSvgLogo
                                width="60px"
                                softwareClassName="hidden"
                                className="opacity-90"
                              />
                            </div>
                          </div>
                          <p className="mt-3 text-[11px] leading-4 text-orange-50/88 phone:text-[13px] phone:leading-5">
                            {hasEngiInDescription ? (
                              <>
                                {beforeEngi}
                                <span className={`${heroHighlightClass} font-semibold`}>$ENGI</span>
                                {afterEngi}
                              </>
                            ) : (
                              description
                            )}
                          </p>
                          <div className="mt-4 rounded-2xl border border-orange-200/12 bg-black/25 px-3 py-2">
                            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-orange-50/76">
                              {'live supply · licensed reads · usage metering'}
                            </p>
                          </div>
                          <div className="mt-4 rounded-2xl border border-orange-200/12 bg-black/25 px-3 py-2">
                            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-orange-50/76">
                              {'supply the depot -> consumption is metered -> value-based issuance'}
                            </p>
                          </div>
                        </div>
                        </>
                      )}
                    </motion.div>
                  );
                })}
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-3 phone:mt-5">
                <a
                  href="#engi-demo-live"
                  className="inline-flex items-center gap-2 rounded-full border border-emerald-300/24 bg-emerald-400/10 px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-50 transition-colors hover:border-emerald-300/42 hover:bg-emerald-400/16"
                >
                  Open embedded demo
                  <ArrowRightIcon className="h-4 w-4" />
                </a>
                <a
                  href={embeddedDemoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/84 transition-colors hover:border-white/24 hover:bg-white/10"
                >
                  Launch standalone
                  <ArrowRightIcon className="h-4 w-4" />
                </a>
              </div>

              <ComingSoonMicroPost />
            </motion.section>

            <motion.aside
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.12, ease: entranceEase }}
              className="relative overflow-hidden rounded-[30px] border border-white/10 bg-white/5 p-4 shadow-[0_26px_80px_rgba(2,8,17,0.48)] backdrop-blur-xl"
              style={paintedMotionStyle}
            >
              <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300/70 to-transparent" />
              <div className="absolute -right-10 top-10 h-40 w-40 rounded-full bg-emerald-400/12 blur-3xl" />
              <div className="absolute -left-10 bottom-6 h-32 w-32 rounded-full bg-emerald-300/8 blur-3xl" />

              <div className="relative">
                <div className="flex items-center justify-between gap-3">
                  <EngiPill className="border-emerald-300/30 bg-emerald-400/10 text-emerald-100">
                    <CircleStackIcon className="h-3.5 w-3.5" />
                    Data Depot
                  </EngiPill>
                  <p className="text-[11px] uppercase tracking-[0.24em] text-emerald-200/58">
                    depot surface
                  </p>
                </div>

                <div className="mt-4 rounded-[26px] border border-white/10 bg-black/30">
                  <div className="flex items-center justify-between border-b border-white/8 px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                      <span className="h-2.5 w-2.5 rounded-full bg-amber-300/70" />
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-300/70" />
                    </div>
                    <div className="flex flex-wrap items-center justify-end gap-x-2 gap-y-1 text-[11px] uppercase tracking-[0.22em] text-emerald-200/60">
                      <span>write</span>
                      <ArrowRightIcon className="h-3.5 w-3.5 shrink-0 text-emerald-200/42" />
                      <span>measure</span>
                      <ArrowRightIcon className="h-3.5 w-3.5 shrink-0 text-emerald-200/42" />
                      <span>read</span>
                    </div>
                  </div>

                  <div className="grid gap-4 p-4 desktop:grid-cols-[0.9fr_1.1fr]">
                    <div className="space-y-3">
                      <div className="rounded-[22px] border border-white/8 bg-white/5 p-4">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-emerald-200/72">
                          Measurement vector
                        </p>
                        <div className="mt-4 space-y-4">
                          {measurementAxes.map((axis) => (
                            <div key={axis.label}>
                              <div className="flex items-end justify-between gap-3">
                                <div>
                                  <p className="text-sm font-medium text-white">{axis.label}</p>
                                  <p className="text-[11px] leading-4 text-emerald-100/58">
                                    {axis.detail}
                                  </p>
                                </div>
                                <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-emerald-200/78">
                                  {axis.value}
                                </span>
                              </div>
                              <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/6">
                                <div className="h-full origin-left" style={{ width: `${axis.value}%` }}>
                                  <motion.div
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: 1 }}
                                    transition={{
                                      duration: 0.9,
                                      delay: 0.35,
                                      ease: entranceEase,
                                    }}
                                    className="h-full rounded-full bg-gradient-to-r from-emerald-500/70 via-emerald-300/90 to-emerald-100"
                                    style={{ ...animatedMotionStyle, transformOrigin: 'left center' }}
                                  />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="rounded-[22px] border border-white/8 bg-white/5 p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0 flex-1">
                            <p className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-400 bg-clip-text text-sm font-semibold text-transparent">
                              Surface
                            </p>
                            <p className="mt-1 text-[9px] uppercase tracking-[0.08em] text-emerald-100/52">
                              depot-first screens
                            </p>
                          </div>
                          <span className="inline-flex min-w-[128px] shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 px-2.5 py-2 text-center text-[10px] uppercase leading-4 tracking-[0.18em] text-white/60">
                            single surface
                          </span>
                        </div>
                        <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-4 laptop:gap-x-4 laptop:gap-y-3">
                          {surfaceModes.map((surface) => (
                            <li
                              key={surface}
                              className="grid grid-cols-[28px_minmax(0,1fr)] items-center gap-3 tablet:grid-cols-[32px_minmax(0,1fr)] tablet:gap-4 laptop:grid-cols-[24px_minmax(0,1fr)] laptop:gap-3"
                            >
                              {renderOrbitalBullet(
                                'scale-110 tablet:scale-[1.25] laptop:scale-100',
                                surface === 'Earnings' ? 'green' : 'purple',
                              )}
                              <span className="text-left text-[15px] leading-snug text-white/90 tablet:text-[17px] laptop:text-sm">
                                {renderTrailingOrangeAsterisk(surface)}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="relative overflow-hidden rounded-[22px] border border-cyan-300/12 bg-[linear-gradient(135deg,rgba(6,13,24,0.96),rgba(4,22,31,0.92))] p-4 shadow-[0_18px_40px_rgba(0,0,0,0.22)]">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(103,254,183,0.14),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.12),transparent_34%)]" />
                        <div className="absolute inset-0 opacity-15 [background-image:linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:28px_28px]" />
                        <div className="pointer-events-none absolute right-8 top-8 h-[72px] w-[72px] overflow-visible">
                          <QuantumOrb
                            size={72}
                            config={verifiedAccessOrbConfig}
                            initialState="active"
                            interactive={false}
                            respectReducedMotion={false}
                          />
                        </div>

                        <div className="relative">
                          <div className="pr-20">
                            <div className="min-w-0">
                              <p className="bg-gradient-to-r from-emerald-200 via-cyan-200 to-white bg-clip-text text-sm font-semibold text-transparent">
                                Verified access
                              </p>
                              <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-emerald-100/52">
                                public writes • public proofs • private reads
                              </p>
                            </div>
                            <span className="mt-2 inline-flex items-center gap-1 rounded-full border border-emerald-300/14 bg-emerald-400/8 px-2 py-1 text-[8px] uppercase tracking-[0.14em] text-emerald-50/72">
                              <EyeIcon className="h-3 w-3" />
                              usage pays
                            </span>
                          </div>

                          <div className="mt-3 space-y-2">
                            {verificationRows.map(({ label, detail, status, Icon: VerificationIcon }) => (
                              <div
                                key={label}
                                className="rounded-2xl border border-white/8 bg-black/20 px-3 py-2.5"
                              >
                                <div className="flex items-start justify-between gap-3">
                                  <div className="flex min-w-0 items-center gap-2">
                                    <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/6 text-emerald-200/78">
                                      <VerificationIcon className="h-3.5 w-3.5" />
                                    </span>
                                    <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/88">
                                      {label}
                                    </p>
                                  </div>
                                  <span className="shrink-0 rounded-full border border-cyan-200/12 bg-cyan-400/8 px-2 py-0.5 text-[8px] uppercase tracking-[0.14em] text-cyan-100/72">
                                    {renderTrailingOrangeAsterisk(
                                      status,
                                      'origin-center scale-[1.875] tablet:scale-[2.125] laptop:scale-[1.75]',
                                    )}
                                  </span>
                                </div>
                                <p className="mt-2 text-[10px] leading-5 text-emerald-100/62">{detail}</p>
                              </div>
                            ))}
                          </div>

                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="rounded-[22px] border border-white/8 bg-white/5 p-4">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-emerald-200/72">
                          Depot contribution
                        </p>
                        <div className="mt-4 space-y-2 font-mono text-[11px] leading-5 text-emerald-100/78">
                          {previewRows.map(
                            ({ key, valueParts, Icon: RowIcon, accentClassName, valuesGridClassName, iconClassName }) => (
                              <div
                                key={key}
                                className="relative overflow-hidden rounded-[20px] border border-white/6 bg-black/20 px-3 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
                              >
                                <span className={`absolute inset-0 bg-gradient-to-r opacity-45 ${accentClassName}`} />
                                <span className="absolute inset-[1px] rounded-[19px] border border-white/6" />
                                <div className="relative">
                                  <div className="flex items-center gap-3">
                                    <span
                                      className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] ${iconClassName}`}
                                    >
                                      <RowIcon className="h-4 w-4" />
                                    </span>
                                    <p className="text-[12px] uppercase tracking-[0.2em] text-emerald-200/58 tablet:text-[13px] laptop:text-[11px]">
                                      {key}
                                    </p>
                                  </div>
                                  <div
                                    className={`mt-3 grid gap-x-5 gap-y-3 text-emerald-50/88 laptop:gap-x-4 laptop:gap-y-2 ${valuesGridClassName}`}
                                  >
                                    {valueParts.map((valuePart) => {
                                      const isEngiValue = valuePart === '$ENGI';

                                      return (
                                        <span
                                          key={`${key}-${valuePart}`}
                                          className="inline-flex min-w-0 items-start gap-2.5 tablet:gap-3 laptop:gap-2"
                                        >
                                          {renderOrbitalBullet(
                                            'mt-0.5 scale-110 tablet:scale-[1.2] laptop:scale-100',
                                            isEngiValue ? 'green' : 'orange',
                                          )}
                                          <span
                                            className={`min-w-0 break-normal text-pretty text-[13px] leading-6 tablet:text-[15px] laptop:text-[11px] laptop:leading-5 ${
                                              isEngiValue ? heroHighlightClass : ''
                                            }`}
                                          >
                                            {valuePart}
                                          </span>
                                        </span>
                                      );
                                    })}
                                  </div>
                                </div>
                              </div>
                            ),
                          )}
                        </div>
                      </div>

                      <div className="rounded-[22px] border border-white/8 bg-white/5 p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="bg-gradient-to-r from-emerald-200 via-white to-orange-200 bg-clip-text text-sm font-semibold text-transparent">
                              Canonical path
                            </p>
                            <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-emerald-100/52">
                              technical value pipeline
                            </p>
                          </div>
                          <span className="inline-flex min-w-[92px] items-center justify-center rounded-full border border-emerald-300/12 bg-emerald-400/6 px-2.5 py-1 font-mono text-center text-[10px] uppercase tracking-[0.18em] text-emerald-50/72">
                            6 phases
                          </span>
                        </div>
                        <p className="mt-3 text-[13px] leading-5 text-emerald-100/70">
                          Commits, citations, authorship, and metadata enter as context at deposit.
                        </p>
                        <div className="mt-4 rounded-[20px] border border-emerald-300/12 bg-emerald-400/6 p-3">
                          <div className="grid gap-3">
                            <span className="inline-flex min-w-0 items-center justify-center gap-2 rounded-full border border-white/10 bg-black/20 px-3 py-2.5 text-[10px] font-mono uppercase tracking-[0.12em] text-emerald-50/90">
                              <span className="text-emerald-200/52">{canonicalPathStages[0].number}</span>
                              {canonicalPathStages[0].stage}
                            </span>
                            <div className="grid gap-2">
                              {[canonicalPathStages.slice(1, 3), canonicalPathStages.slice(3, 5)].map((row, rowIndex) => (
                                <div
                                  key={`canonical-middle-row-${rowIndex}`}
                                  className="grid items-center gap-2 grid-cols-[minmax(0,1fr)_18px_minmax(0,1fr)]"
                                >
                                  <span className="inline-flex min-w-0 items-center justify-center gap-1.5 rounded-full border border-white/10 bg-black/20 px-2 py-1.5 text-[9px] font-mono uppercase tracking-[0.1em] text-emerald-50/90">
                                    <span className="text-emerald-200/52">{row[0].number}</span>
                                    {row[0].stage}
                                  </span>
                                  <ArrowRightIcon className="h-3.5 w-3.5 text-emerald-200/32" />
                                  <span className="inline-flex min-w-0 items-center justify-center gap-1.5 rounded-full border border-white/10 bg-black/20 px-2 py-1.5 text-[9px] font-mono uppercase tracking-[0.1em] text-emerald-50/90">
                                    <span className="text-emerald-200/52">{row[1].number}</span>
                                    {row[1].stage}
                                  </span>
                                </div>
                              ))}
                            </div>
                            <span className="inline-flex min-w-0 items-center justify-center gap-2 rounded-full border border-white/10 bg-black/20 px-3 py-2.5 text-[10px] font-mono uppercase tracking-[0.12em] text-emerald-50/90">
                              <span className="text-emerald-200/52">{canonicalPathStages[5].number}</span>
                              {canonicalPathStages[5].stage}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.aside>
          </div>
        </main>

        <MarketingEmbeddedDemoSection demoUrl={embeddedDemoUrl} />

        <div className="relative z-20 mt-auto w-full">
          <Footer showPrimaryContent={false} className="mt-0 border-white/10 bg-[#02060d]/72 backdrop-blur-xl" />
        </div>

        </div>
      </div>
    </>
  );
}
