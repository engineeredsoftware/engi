'use client';

import React, { useEffect, useRef, useState } from 'react';
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

const productPillars = [
  {
    title: 'Deposit',
    description: 'Code, docs, diagrams, and PDFs enter as technical source material.',
    Icon: CubeTransparentIcon,
  },
  {
    title: 'Measure',
    description: 'Quantity, quality, and valence decide what the depot accepts.',
    Icon: ScaleIcon,
  },
  {
    title: '$ENGI',
    description: 'Accepted value routes toward reward, settlement, and retrieval.',
    Icon: CurrencyDollarIcon,
  },
] as const;

const measurementAxes = [
  {
    label: 'Quantity',
    value: 92,
    detail: 'normalized and deduplicated token volume',
  },
  {
    label: 'Quality',
    value: 87,
    detail: 'correctness, structure, reproducibility, provenance',
  },
  {
    label: 'Valence',
    value: 79,
    detail: 'utility, novelty, gap-filling, anti-noise confidence',
  },
] as const;

const previewRows = [
  {
    key: 'inputs',
    valueParts: ['code', 'docs', 'PDFs', 'diagrams'],
    accentClassName: 'from-cyan-400/18 via-sky-400/8 to-transparent',
    Icon: DocumentTextIcon,
    valuesGridClassName: 'grid-cols-2',
    iconClassName: 'text-white/58',
  },
  {
    key: 'provenance',
    valueParts: ['repos', 'commits', 'citations', 'upload metadata'],
    accentClassName: 'from-fuchsia-400/18 via-purple-400/8 to-transparent',
    Icon: LinkIcon,
    valuesGridClassName: 'grid-cols-2',
    iconClassName: 'text-white/58',
  },
  {
    key: 'chunks',
    valueParts: ['stable hashes', 'embeddings', 'review states'],
    accentClassName: 'from-emerald-400/18 via-teal-400/8 to-transparent',
    Icon: Squares2X2Icon,
    valuesGridClassName: 'grid-cols-2',
    iconClassName: 'text-white/58',
  },
  {
    key: 'reward',
    valueParts: ['accepted contribution', 'reward event', '$ENGI'],
    accentClassName: 'from-orange-400/18 via-amber-300/8 to-transparent',
    Icon: CurrencyDollarIcon,
    valuesGridClassName: 'grid-cols-1',
    iconClassName: 'text-white/58',
  },
] as const;

const surfaceModes = ['Deposit', 'My Deposits', 'Explore', 'Earnings', 'Review'] as const;
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
    label: 'Public writing',
    detail: 'prompts, weights, and metadata can be measured before deposit',
    status: 'open',
    Icon: CircleStackIcon,
  },
  {
    label: 'Private reading',
    detail: 'licensed readers consume the dataset while usage drives payouts',
    status: 'licensed',
    Icon: LockClosedIcon,
  },
  {
    label: 'ZK verification',
    detail: 'production deployments prove prompt and model bundles without disclosure',
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
const canonicalStageRows = [
  [
    { number: '01', stage: 'ingest' },
    { number: '02', stage: 'normalize' },
  ],
  [
    { number: '03', stage: 'segment' },
    { number: '04', stage: 'measure' },
  ],
  [
    { number: '05', stage: 'adjudicate' },
    { number: '06', stage: 'settle' },
  ],
  [
    { number: '07', stage: 'index' },
  ],
] as const;
const headlineText = '$ENGI is becoming the tokenized data depot for engineering knowledge.';
const heroHighlightClass = 'super-shiny-text special-text text-[rgba(103,254,183,0.95)]';
const headlineHighlights = [
  { text: '$ENGI', className: `${heroHighlightClass} font-semibold text-white` },
  { text: 'tokenized data depot', className: heroHighlightClass },
] as const;

function renderOrbitalBullet(className = '', variant: 'purple' | 'orange' = 'purple') {
  const outerRingClassName =
    variant === 'orange' ? 'border-orange-400/46' : 'border-fuchsia-400/46';
  const innerRingClassName =
    variant === 'orange' ? 'border-orange-300/32' : 'border-purple-300/32';
  const coreClassName =
    variant === 'orange'
      ? 'bg-orange-400 shadow-[0_0_10px_rgba(251,146,60,0.48)]'
      : 'bg-fuchsia-300 shadow-[0_0_10px_rgba(232,121,249,0.48)]';
  const planetClassName =
    variant === 'orange'
      ? 'bg-orange-200 shadow-[0_0_6px_rgba(251,146,60,0.42)]'
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

export default function MarketingComingSoon() {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [headlineTypingComplete, setHeadlineTypingComplete] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [shake, setShake] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const particlesArray = Array.from({ length: 14 }, (_, index) => ({
      id: index,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
      size: 2 + Math.random() * 4,
      dx: (Math.random() - 0.5) * 60,
      dy: (Math.random() - 0.5) * 60,
      duration: 7 + Math.random() * 4,
    }));

    setParticles(particlesArray);

    const timer = setTimeout(() => setIsLoaded(true), 220);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!containerRef.current) {
        return;
      }

      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: ((event.clientX - rect.left) / rect.width) * 100,
        y: ((event.clientY - rect.top) / rect.height) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handlePasswordSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (password.trim() === 'engi/acc') {
      setSuccess(true);

      try {
        localStorage.setItem('mid_launch_auth', 'true');
      } catch {
        /* ignore */
      }

      setTimeout(() => {
        window.location.reload();
      }, 650);

      return;
    }

    setError('Incorrect incantation. 🍏');
    setShake(true);

    setTimeout(() => setShake(false), 700);
  };

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
        className="coming-soon-container relative flex w-full flex-col overflow-hidden bg-[#030816] text-white"
        style={{
          minHeight: '100svh',
          '--mouse-x': `${mousePosition.x}%`,
          '--mouse-y': `${mousePosition.y}%`,
        } as React.CSSProperties}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(103,254,183,0.14),transparent_34%),linear-gradient(180deg,#07131d_0%,#030816_45%,#02060d_100%)]" />
        <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(103,254,183,0.09)_1px,transparent_1px),linear-gradient(90deg,rgba(103,254,183,0.09)_1px,transparent_1px)] [background-size:160px_160px]" />

        <div className="orbital-system absolute inset-0 opacity-60">
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

        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="quantum-particle absolute rounded-full bg-[#67feb7]"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              boxShadow: `0 0 ${particle.size * 3}px rgba(103, 254, 183, 0.55)`,
            }}
            animate={{
              opacity: [0, 0.75, 0],
              scale: [0, 1, 0],
              x: [0, particle.dx],
              y: [0, particle.dy],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}

        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(103, 254, 183, 0.16) 0%, rgba(103, 254, 183, 0.08) 16%, transparent 44%)`,
          }}
        />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[46rem] w-[46rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-300/10 blur-3xl" />

        <main className="relative z-20 mx-auto flex w-full max-w-[1380px] flex-1 items-center px-4 py-5 phone:px-5 tablet:px-6 laptop:px-8 desktop:px-12">
          <div className="grid w-full gap-4 tablet:grid-cols-[minmax(0,1.02fr)_minmax(300px,0.98fr)] tablet:gap-5 laptop:gap-6">
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col justify-center"
            >
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-emerald-300/20 bg-emerald-400/10 shadow-[0_0_28px_rgba(103,254,183,0.14)]">
                  <Logo height="h-5" width="w-5" />
                </div>
                <EngiPill className="border-emerald-300/35 bg-emerald-400/10 text-emerald-100">
                  <CircleStackIcon className="h-3.5 w-3.5" />
                  Coming soon · Data depot
                </EngiPill>
              </div>

              <div className="mt-5 max-w-2xl space-y-4">
                <p className="max-w-xl text-[11px] uppercase tracking-[0.26em] text-emerald-200/70">
                  A writable dataset with contributor compensations
                </p>
                <h1 className="text-[2.35rem] font-semibold leading-[0.96] text-white phone:text-[2.9rem] tablet:text-[3.6rem] laptop:text-[4.35rem]">
                  <div className="relative max-w-[13ch] phone:max-w-[14ch] tablet:max-w-[15ch] laptop:max-w-[16ch]">
                    <MultiLineTypingAnimation
                      text={headlineText}
                      charDelay={18}
                      startDelay={140}
                      align="left"
                      className="text-white/92 tracking-[-0.02em]"
                      onComplete={() => setHeadlineTypingComplete(true)}
                      showCursor={!headlineTypingComplete}
                      highlightTexts={headlineHighlights}
                    />
                  </div>
                </h1>
                <p className="max-w-xl text-sm leading-6 text-emerald-100/78 phone:text-[15px] tablet:text-base">
                  Deposit code, docs, PDFs, and other technical artifacts. <span className={heroHighlightClass}>$ENGI</span>{' '}
                  measures quantity, quality, and valence, then routes accepted value toward reward,
                  provenance, and retrieval.
                </p>
              </div>

              <div className="mt-5 flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.22em] text-emerald-200/68">
                {['Deposit technical knowledge', 'Measure quantity + quality + valence', 'Reward accepted value', 'Retrieve with provenance'].map((item) => (
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

              <div className="mt-5 grid grid-cols-3 gap-3">
                {productPillars.map(({ title, description, Icon }, index) => (
                  <motion.div
                    key={title}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 18 }}
                    transition={{
                      duration: 0.75,
                      delay: 0.1 + index * 0.08,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className={`relative overflow-hidden rounded-[24px] border p-4 backdrop-blur-xl ${
                      title === '$ENGI'
                        ? 'border-orange-300/20 bg-black/30 shadow-[0_18px_50px_rgba(79,30,0,0.34)]'
                        : 'border-white/10 bg-white/5 shadow-[0_16px_50px_rgba(2,8,17,0.32)]'
                    }`}
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
                          <div className="relative min-h-[68px] pr-20 text-violet-100">
                            <span className="absolute right-0 top-0 inline-flex min-w-[72px] items-center justify-center rounded-full border border-white/12 bg-white/8 px-2.5 py-1 text-center text-[8px] uppercase tracking-[0.16em] text-violet-100/70">
                              source
                            </span>
                            <div className="flex min-w-0 items-start gap-2">
                              <Icon className="h-4 w-4 text-purple-300" />
                              <div className="min-w-0">
                                <p className="bg-gradient-to-r from-purple-300 via-pink-300 to-red-300 bg-clip-text text-[11px] font-semibold uppercase tracking-[0.18em] text-transparent">
                                  {title}
                                </p>
                                <p className="mt-1 max-w-[16ch] text-[10px] uppercase tracking-[0.16em] text-violet-100/52">
                                  provenance-first intake
                                </p>
                              </div>
                            </div>
                          </div>
                          <p className="mt-3 text-[12px] leading-4 text-violet-50/88 phone:text-[13px] phone:leading-5">
                            {description}
                          </p>
                          <div className="mt-4 space-y-3 border-t border-white/12 pt-4">
                            <div className="border-l-4 border-purple-400 pl-3">
                              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white">
                                Paste or upload
                              </p>
                              <p className="mt-1 text-[11px] leading-4 text-violet-100/72">
                                code, docs, diagrams, PDFs, and internal notes become deposit inputs
                              </p>
                            </div>
                            <div className="border-l-4 border-pink-400 pl-3">
                              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white">
                                Preserve provenance
                              </p>
                              <p className="mt-1 text-[11px] leading-4 text-violet-100/72">
                                repos, commits, citations, and authorship stay attached from the start
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
                          <div className="absolute inset-0 overflow-hidden opacity-80">
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
                            <div className="relative min-h-[68px] pr-20 text-emerald-100">
                              <span className="absolute right-0 top-0 inline-flex min-w-[72px] items-center justify-center rounded-full border border-emerald-200/12 bg-emerald-400/8 px-2.5 py-1 text-center text-[8px] uppercase tracking-[0.16em] text-emerald-50/72">
                                scored
                              </span>
                            <div className="flex min-w-0 items-start gap-2">
                              <Icon className="h-4 w-4 text-emerald-300" />
                              <div className="min-w-0">
                                <p className="bg-gradient-to-r from-emerald-300 via-emerald-500 to-teal-300 bg-clip-text text-[11px] font-semibold uppercase tracking-[0.18em] text-transparent">
                                  {title}
                                </p>
                                <p className="mt-1 max-w-[16ch] text-[10px] uppercase tracking-[0.16em] text-emerald-100/52">
                                  quantity + quality + valence
                                </p>
                              </div>
                            </div>
                          </div>
                          <p className="mt-3 text-[12px] leading-4 text-emerald-50/88 phone:text-[13px] phone:leading-5">
                            {description}
                          </p>
                          <div className="mt-4 grid grid-cols-3 gap-1.5">
                            {measurementAxes.map((axis) => (
                              <div
                                key={axis.label}
                                className="rounded-2xl border border-white/10 bg-black/20 px-1.5 py-2.5 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
                              >
                                <p className="whitespace-nowrap text-[7px] uppercase leading-none tracking-[0.04em] text-emerald-200/58">
                                  {axis.label}
                                </p>
                                <p className="mt-1 text-[2.2rem] font-semibold leading-none text-white">{axis.value}</p>
                              </div>
                            ))}
                          </div>
                          <div className="mt-4 rounded-2xl border border-emerald-200/12 bg-black/25 px-3 py-2">
                            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-emerald-50/76">
                              {'dedupe • novelty • trust'}
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
                          <div className="relative min-h-[68px] pr-20 text-orange-100">
                            <div className="flex items-start gap-2">
                              <Icon className="h-5 w-5 text-orange-300" />
                              <div className="min-w-0">
                                <p className="bg-gradient-to-r from-white via-orange-100 to-white/80 bg-clip-text text-[11px] font-semibold uppercase tracking-[0.18em] text-transparent">
                                  {title}
                                </p>
                                <p className="mt-1 max-w-[16ch] text-[10px] uppercase tracking-[0.16em] text-orange-100/52">
                                  reward routing
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
                          <p className="mt-3 text-[12px] leading-4 text-orange-50/88 phone:text-[13px] phone:leading-5">
                            {description}
                          </p>
                          <div className="mt-4 flex flex-wrap gap-2">
                            {['Reward routing', 'Settlement', 'Retrieval'].map((signal) => (
                              <span
                                key={signal}
                                className="rounded-full border border-orange-200/16 bg-orange-100/8 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-orange-50/84"
                              >
                                {signal}
                              </span>
                            ))}
                          </div>
                          <div className="mt-4 rounded-2xl border border-orange-200/12 bg-black/25 px-3 py-2">
                            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-orange-50/76">
                              {'accepted value -> settle -> retrieve'}
                            </p>
                          </div>
                        </div>
                      </>
                    )}
                  </motion.div>
                ))}
              </div>

              <div className="mt-5 rounded-[24px] border border-white/10 bg-white/5 p-4 backdrop-blur-xl tablet:hidden">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-emerald-200/72">
                    Measurement path
                  </p>
                  <span className="text-[11px] uppercase tracking-[0.22em] text-emerald-200/58">
                    {'ingest -> reward'}
                  </span>
                </div>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {measurementAxes.map((axis) => (
                    <div
                      key={axis.label}
                      className="rounded-2xl border border-white/8 bg-black/20 px-3 py-2"
                    >
                      <p className="text-[10px] uppercase tracking-[0.18em] text-emerald-200/58">
                        {axis.label}
                      </p>
                      <p className="mt-1 text-lg font-semibold text-white">{axis.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <motion.form
                onSubmit={handlePasswordSubmit}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 18 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="mt-5 max-w-xl rounded-[24px] border border-emerald-300/12 bg-black/25 p-4 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.32)]"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-200/72">
                      Paid Writing, Private Reading, Public Verification
                    </p>
                    <p className="mt-1 text-[13px] leading-5 text-emerald-100/68">
                      Use the dataset for research and development. Contact Advanced Engineered
                      Software, Inc. to request access.
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
                    animate={shake ? { x: [-8, 8, -6, 6, -3, 3, 0] } : {}}
                    transition={{ duration: 0.6 }}
                    className="flex-1"
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
                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-emerald-300/25 bg-emerald-400/10 px-4 py-3 text-sm font-medium text-emerald-50 transition-all hover:border-emerald-300/45 hover:bg-emerald-400/14 disabled:cursor-default disabled:opacity-70"
                  >
                    {success ? 'Unlocked' : 'Enter dataset'}
                    <ArrowRightIcon className="h-4 w-4" />
                  </button>
                </div>
                {success && <p className="mt-3 text-sm text-emerald-300">Access granted.</p>}
              </motion.form>
            </motion.section>

            <motion.aside
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 28 }}
              transition={{ duration: 1, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="relative hidden overflow-hidden rounded-[30px] border border-white/10 bg-white/5 p-4 backdrop-blur-xl shadow-[0_26px_80px_rgba(2,8,17,0.48)] tablet:block"
            >
              <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300/70 to-transparent" />
              <div className="absolute -right-10 top-10 h-40 w-40 rounded-full bg-emerald-400/12 blur-3xl" />
              <div className="absolute -left-10 bottom-6 h-32 w-32 rounded-full bg-emerald-300/8 blur-3xl" />

              <div className="relative">
                <div className="flex items-center justify-between gap-3">
                  <EngiPill className="border-emerald-300/30 bg-emerald-400/10 text-emerald-100">
                    <CircleStackIcon className="h-3.5 w-3.5" />
                    depot.preview
                  </EngiPill>
                  <p className="text-[11px] uppercase tracking-[0.24em] text-emerald-200/58">
                    simplified interface
                  </p>
                </div>

                <div className="mt-4 rounded-[26px] border border-white/10 bg-black/30">
                  <div className="flex items-center justify-between border-b border-white/8 px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                      <span className="h-2.5 w-2.5 rounded-full bg-amber-300/70" />
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-300/70" />
                    </div>
                    <p className="text-[11px] uppercase tracking-[0.22em] text-emerald-200/60">
                      {'ingest -> measure -> reward'}
                    </p>
                  </div>

                  <div className="grid gap-4 p-4 tablet:grid-cols-[0.96fr_1.04fr]">
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
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: isLoaded ? `${axis.value}%` : 0 }}
                                  transition={{
                                    duration: 0.9,
                                    delay: 0.35,
                                    ease: [0.16, 1, 0.3, 1],
                                  }}
                                  className="h-full rounded-full bg-gradient-to-r from-emerald-500/70 via-emerald-300/90 to-emerald-100"
                                />
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
                            <p className="mt-1 whitespace-nowrap text-[9px] uppercase tracking-[0.08em] text-emerald-100/52">
                              depot-first screens
                            </p>
                          </div>
                          <span className="inline-flex min-w-[128px] shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 px-2.5 py-2 text-center text-[10px] uppercase tracking-[0.18em] leading-4 text-white/60">
                            single frame
                          </span>
                        </div>
                        <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3">
                          {surfaceModes.map((surface) => (
                            <li key={surface} className="grid grid-cols-[24px_minmax(0,1fr)] items-center gap-3">
                              {renderOrbitalBullet()}
                              <span className="text-left text-sm leading-snug text-white/90">{surface}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="relative overflow-hidden rounded-[22px] border border-cyan-300/12 bg-[linear-gradient(135deg,rgba(6,13,24,0.96),rgba(4,22,31,0.92))] p-4 shadow-[0_18px_40px_rgba(0,0,0,0.22)]">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(103,254,183,0.14),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.12),transparent_34%)]" />
                        <div className="absolute inset-0 opacity-15 [background-image:linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:28px_28px]" />
                        <div className="pointer-events-none absolute right-6 top-6 h-16 w-16 overflow-visible">
                          <QuantumOrb
                            size={64}
                            config={verifiedAccessOrbConfig}
                            initialState="active"
                            interactive={false}
                            respectReducedMotion={false}
                          />
                        </div>

                        <div className="relative">
                          <div className="pr-16">
                            <div className="min-w-0">
                              <p className="bg-gradient-to-r from-emerald-200 via-cyan-200 to-white bg-clip-text text-sm font-semibold text-transparent">
                                Verified access
                              </p>
                              <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-emerald-100/52">
                                paid writing • private reading • public proofs
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
                                className="flex items-start justify-between gap-3 rounded-2xl border border-white/8 bg-black/20 px-3 py-2"
                              >
                                <div className="flex min-w-0 items-start gap-2">
                                  <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/6 text-emerald-200/78">
                                    <VerificationIcon className="h-3.5 w-3.5" />
                                  </span>
                                  <div className="min-w-0">
                                    <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/88">
                                      {label}
                                    </p>
                                    <p className="mt-1 text-[10px] leading-4 text-emerald-100/62">
                                      {detail}
                                    </p>
                                  </div>
                                </div>
                                <span className="shrink-0 rounded-full border border-cyan-200/12 bg-cyan-400/8 px-2 py-0.5 text-[8px] uppercase tracking-[0.14em] text-cyan-100/72">
                                  {status}
                                </span>
                              </div>
                            ))}
                          </div>

                          <div className="mt-3 flex flex-wrap gap-1.5">
                            {['public writes', 'licensed reads', 'zk proofs', '$ENGI rewards'].map((chip) => (
                              <span
                                key={chip}
                                className="rounded-full border border-white/10 bg-white/6 px-2 py-1 text-[8px] uppercase tracking-[0.14em] text-emerald-50/76"
                              >
                                {chip}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="rounded-[22px] border border-white/8 bg-white/5 p-4">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-emerald-200/72">
                          Accepted deposit object
                        </p>
                        <div className="mt-4 space-y-2 font-mono text-[11px] leading-5 text-emerald-100/78">
                          {previewRows.map(({ key, valueParts, Icon: RowIcon, accentClassName, valuesGridClassName, iconClassName }) => (
                            <div
                              key={key}
                              className="relative overflow-hidden rounded-[20px] border border-white/6 bg-black/20 px-3 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
                            >
                              <span className={`absolute inset-0 bg-gradient-to-r opacity-45 ${accentClassName}`} />
                              <span className="absolute inset-[1px] rounded-[19px] border border-white/6" />
                              <div className="relative">
                                <div className="flex items-center gap-3">
                                  <span className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] ${iconClassName}`}>
                                    <RowIcon className="h-4 w-4" />
                                  </span>
                                  <p className="uppercase tracking-[0.2em] text-emerald-200/58">
                                    {key}
                                  </p>
                                </div>
                                <div className={`mt-3 grid gap-x-4 gap-y-1.5 pl-0 text-emerald-50/88 ${valuesGridClassName}`}>
                                    {valueParts.map((valuePart) => (
                                      <span
                                        key={`${key}-${valuePart}`}
                                        className="inline-flex min-w-0 items-start gap-2"
                                      >
                                        {renderOrbitalBullet('mt-0.5', 'orange')}
                                        <span className="break-words leading-5">{valuePart}</span>
                                      </span>
                                    ))}
                                </div>
                              </div>
                            </div>
                          ))}
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
                            7 phases
                          </span>
                        </div>
                        <p className="mt-3 text-[13px] leading-5 text-emerald-100/70">
                          Repo sync, commit history, and citations stay as provenance. They no longer
                          define the public product surface.
                        </p>
                        <div className="mt-4 rounded-[20px] border border-emerald-300/12 bg-emerald-400/6 p-3">
                          <div className="grid gap-2">
                            {canonicalStageRows.map((row, rowIndex) => (
                              <div
                                key={`canonical-row-${rowIndex}`}
                                className={`grid items-center gap-2 ${row.length > 1 ? 'grid-cols-[minmax(0,1fr)_18px_minmax(0,1fr)]' : 'grid-cols-1'}`}
                              >
                                <span className="inline-flex min-w-0 items-center justify-center gap-1.5 rounded-full border border-white/10 bg-black/20 px-2 py-1.5 text-[9px] font-mono uppercase tracking-[0.1em] text-emerald-50/90">
                                  <span className="text-emerald-200/52">{row[0].number}</span>
                                  {row[0].stage}
                                </span>
                                {row.length > 1 && (
                                  <>
                                    <ArrowRightIcon className="h-3.5 w-3.5 text-emerald-200/32" />
                                    <span className="inline-flex min-w-0 items-center justify-center gap-1.5 rounded-full border border-white/10 bg-black/20 px-2 py-1.5 text-[9px] font-mono uppercase tracking-[0.1em] text-emerald-50/90">
                                      <span className="text-emerald-200/52">{row[1].number}</span>
                                      {row[1].stage}
                                    </span>
                                  </>
                                )}
                              </div>
                            ))}
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

        <div className="relative z-20 mt-auto w-full">
          <Footer showPrimaryContent={false} className="mt-0 border-white/10 bg-[#02060d]/72 backdrop-blur-xl" />
        </div>

      </div>
    </>
  );
}
