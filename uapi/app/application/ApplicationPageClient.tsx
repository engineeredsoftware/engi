'use client';

import Link from 'next/link';
import {
  ArrowRightIcon,
  CircleStackIcon,
  CodeBracketSquareIcon,
  ShieldCheckIcon,
  WalletIcon,
} from '@heroicons/react/24/outline';

import Logo from '@/components/base/engi/branding/logo';
import EngiPill from '@/components/base/engi/branding/engi-pill';
import { useAuth } from '@/components/base/engi/auth/AuthProvider';
import { openOrbital } from '@/app/orbitals/components/OrbitalsProvider';

const productionTracks = [
  {
    title: 'Application-native route',
    description:
      'The Bitcode operator surface now lives at a first-class application route instead of a homepage iframe or companion localhost runtime.',
    Icon: CircleStackIcon,
  },
  {
    title: 'Package-first system ownership',
    description:
      'V26 moves canonical operating layers out of demo-local ownership and back into package and route surfaces that match the larger repository architecture.',
    Icon: CodeBracketSquareIcon,
  },
  {
    title: 'Live-interface hardening',
    description:
      'GitHub, bitcoin, sidechain, repeated-read, compute, storage, telemetry, and reconciliation remain in scope for productionizing closure.',
    Icon: ShieldCheckIcon,
  },
  {
    title: 'Authentication upgrade',
    description:
      'Connecting wallet, signer policy, and operator auth are treated as production responsibilities rather than demo affordances.',
    Icon: WalletIcon,
  },
] as const;

const routeCommitments = [
  'No homepage embedded demo',
  'Preserve the Bitcode operator UX chain',
  'Replace demo UI with application-facing surfaces',
  'Keep V25 active until V26 is actually promoted',
] as const;

export default function ApplicationPageClient() {
  const { user } = useAuth();

  return (
    <div className="min-h-[calc(100vh-9rem)] bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.18),transparent_28%),radial-gradient(circle_at_85%_18%,rgba(56,189,248,0.14),transparent_22%),linear-gradient(180deg,#05111a_0%,#030814_46%,#02050c_100%)] text-white">
      <main className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 py-12 phone:px-5 tablet:px-6 laptop:px-8">
        <section className="relative overflow-hidden rounded-[36px] border border-white/10 bg-white/5 px-5 py-8 shadow-[0_30px_100px_rgba(0,0,0,0.42)] backdrop-blur-xl phone:px-6 tablet:px-8 tablet:py-10">
          <div className="absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300/80 to-transparent" />
          <div className="absolute -right-20 top-6 h-40 w-40 rounded-full bg-emerald-400/14 blur-3xl" />
          <div className="absolute -left-16 bottom-0 h-36 w-36 rounded-full bg-cyan-400/10 blur-3xl" />

          <div className="relative flex flex-col gap-8 laptop:grid laptop:grid-cols-[1.2fr_0.8fr] laptop:items-end">
            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <EngiPill className="border-emerald-300/30 bg-emerald-400/10 text-emerald-100">
                  Bitcode application
                </EngiPill>
                <EngiPill className="border-white/12 bg-white/6 text-white/78">
                  Active canon V25
                </EngiPill>
                <EngiPill className="border-cyan-300/20 bg-cyan-400/10 text-cyan-100">
                  Draft target V26
                </EngiPill>
              </div>

              <div className="space-y-4">
                <h1 className="max-w-[14ch] text-[2.8rem] font-semibold leading-[0.94] tracking-[-0.045em] text-white phone:text-[3.4rem] tablet:text-[4.3rem]">
                  Bitcode now lives as a first-class application surface.
                </h1>
                <p className="max-w-[52rem] text-[17px] leading-8 text-white/78">
                  V26 productionizing hardening moves the Bitcode operator experience out of the
                  marketing page and into a dedicated application route. The embedded demo posture
                  is removed here; the operating chain stays in scope while the UI owner shifts to
                  application-facing components.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                {user ? (
                  <Link
                    href="/executions?type=pipeline:deliverables&postprocessingType=pipeline:deliverables"
                    className="inline-flex items-center gap-2 rounded-full border border-emerald-300/24 bg-emerald-400/12 px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-50 transition-colors hover:border-emerald-300/42 hover:bg-emerald-400/18"
                  >
                    Open operator workspace
                    <ArrowRightIcon className="h-4 w-4" />
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={() => openOrbital('SignUpWindow')}
                    className="inline-flex items-center gap-2 rounded-full border border-emerald-300/24 bg-emerald-400/12 px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-50 transition-colors hover:border-emerald-300/42 hover:bg-emerald-400/18"
                  >
                    Connect account
                    <ArrowRightIcon className="h-4 w-4" />
                  </button>
                )}
                {!user && (
                  <button
                    type="button"
                    onClick={() => openOrbital('SignInWindow')}
                    className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/84 transition-colors hover:border-white/24 hover:bg-white/10"
                  >
                    Sign in
                    <ArrowRightIcon className="h-4 w-4" />
                  </button>
                )}
                <Link
                  href="/demo-video"
                  className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/84 transition-colors hover:border-white/24 hover:bg-white/10"
                >
                  Watch walkthrough
                  <ArrowRightIcon className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="grid gap-3 rounded-[28px] border border-white/10 bg-black/25 p-4">
              <div className="flex items-center gap-4 rounded-[22px] border border-white/8 bg-white/5 p-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-300/24 bg-emerald-400/10">
                  <Logo className="scale-[1.15]" height="h-8" width="w-8" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-emerald-200/72">
                    Route posture
                  </p>
                  <p className="mt-1 text-xl font-semibold text-white">/application is the product surface</p>
                </div>
              </div>

              <div className="rounded-[22px] border border-white/8 bg-white/5 p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-emerald-200/72">
                  Current commitments
                </p>
                <div className="mt-4 grid gap-2">
                  {routeCommitments.map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-white/8 bg-black/20 px-3 py-2.5 text-sm text-white/78"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 tablet:grid-cols-2">
          {productionTracks.map(({ title, description, Icon }) => (
            <article
              key={title}
              className="rounded-[28px] border border-white/10 bg-white/[0.045] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl"
            >
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-emerald-300/24 bg-emerald-400/10 text-emerald-100">
                <Icon className="h-5 w-5" />
              </div>
              <h2 className="mt-4 text-[1.2rem] font-semibold tracking-[-0.03em] text-white">{title}</h2>
              <p className="mt-2 text-[15px] leading-7 text-white/72">{description}</p>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}
