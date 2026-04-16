'use client';

import Link from 'next/link';

import Orbital from '@/app/orbitals/components';
import type { OrbitalPane } from '@/app/orbitals/components';

const stepLabels: Record<Exclude<OrbitalPane, null>, string> = {
  profile: 'Account & Team',
  connects: 'Connections',
  credits: 'Credits & Usage',
  models: 'Model Settings',
};

interface OrbitalsRouteClientProps {
  step: Exclude<OrbitalPane, null>;
}

export default function OrbitalsRouteClient({ step }: OrbitalsRouteClientProps) {
  return (
    <div className="min-h-[calc(100vh-9rem)] bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.14),transparent_26%),radial-gradient(circle_at_86%_18%,rgba(56,189,248,0.1),transparent_18%),linear-gradient(180deg,#050d15_0%,#02060d_44%,#010309_100%)] text-white">
      <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-10 phone:px-5 tablet:px-6 laptop:px-8">
        <section className="rounded-[28px] border border-white/10 bg-white/5 px-5 py-5 backdrop-blur-xl">
          <div className="flex flex-col gap-4 tablet:flex-row tablet:items-end tablet:justify-between">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-200/74">
                Application-owned settings route
              </p>
              <h1 className="text-[1.8rem] font-semibold tracking-[-0.04em] text-white tablet:text-[2.4rem]">
                {stepLabels[step]} now resolves inside Bitcode’s app shell.
              </h1>
              <p className="max-w-[48rem] text-sm leading-7 text-white/70 tablet:text-[15px]">
                V26 keeps the ringed orbital experience reachable by direct route while treating it
                as the account/settings surface for Bitcode rather than an implicit onboarding-only
                pathname contract.
              </p>
            </div>

            <Link
              href="/application"
              className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/6 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/84 transition-colors hover:border-white/24 hover:bg-white/10"
            >
              Back to application
            </Link>
          </div>
        </section>

        <section className="rounded-[32px] border border-white/10 bg-black/20 p-2 shadow-[0_30px_100px_rgba(0,0,0,0.32)] backdrop-blur-xl tablet:p-4">
          <Orbital initialStep={step} window="SignInWindow" />
        </section>
      </main>
    </div>
  );
}
