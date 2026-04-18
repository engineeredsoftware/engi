'use client';

import React from 'react';
import Link from 'next/link';

import Orbital from '@/app/orbitals/components';
import {
  getOrbitalDescriptor,
  type ConcreteOrbitalPane,
} from '@/app/orbitals/components/orbital-pane-meta';

interface OrbitalsRouteClientProps {
  step: ConcreteOrbitalPane;
}

export default function OrbitalsRouteClient({ step }: OrbitalsRouteClientProps) {
  const descriptor = getOrbitalDescriptor(step);
  const orbitals = [
    getOrbitalDescriptor('connects'),
    getOrbitalDescriptor('interfaces'),
    getOrbitalDescriptor('profile'),
    getOrbitalDescriptor('btd'),
  ];

  return (
    <div className="min-h-[calc(100vh-9rem)] bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.14),transparent_26%),radial-gradient(circle_at_86%_18%,rgba(56,189,248,0.1),transparent_18%),linear-gradient(180deg,#050d15_0%,#02060d_44%,#010309_100%)] text-white">
      <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-10 phone:px-5 tablet:px-6 laptop:px-8">
        <section className="rounded-[28px] border border-white/10 bg-white/5 px-5 py-5 backdrop-blur-xl">
          <div className="flex flex-col gap-4 tablet:flex-row tablet:items-end tablet:justify-between">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-200/74">
                {descriptor.label} orbital
              </p>
              <h1 className="text-[1.8rem] font-semibold tracking-[-0.04em] text-white tablet:text-[2.4rem]">
                {descriptor.routeTitle} in a contained operator workspace.
              </h1>
              <p className="max-w-[48rem] text-sm leading-7 text-white/70 tablet:text-[15px]">
                {descriptor.routeDescription} Stay in one focused orbital when you want a dedicated
                read surface for repository connections, interface posture, wallet identity, or
                $BTD detail, then step back into the full transactions workspace only when needed.
              </p>
            </div>

            <Link
              href="/application"
              className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/6 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/84 transition-colors hover:border-white/24 hover:bg-white/10"
            >
              Open transactions workspace
            </Link>
          </div>
        </section>

        <section className="grid gap-3 rounded-[28px] border border-white/8 bg-black/20 p-4 backdrop-blur-xl tablet:grid-cols-2 laptop:grid-cols-4">
          {orbitals.map((orbital) => {
            const isActive = orbital.routeSegment === descriptor.routeSegment;

            return (
              <Link
                key={orbital.routeSegment}
                href={`/orbitals/${orbital.routeSegment}`}
                aria-current={isActive ? 'page' : undefined}
                className={`rounded-[22px] border px-4 py-4 transition-colors hover:border-white/18 hover:bg-white/8 ${
                  isActive
                    ? 'border-emerald-300/28 bg-emerald-400/10'
                    : 'border-white/8 bg-white/5'
                }`}
              >
                <p className="text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-emerald-200/78">
                  {orbital.label}
                </p>
                <p className="mt-2 text-sm font-medium text-white">
                  {isActive ? 'Current route' : 'Open orbital'}
                </p>
                <p className="mt-2 text-sm leading-7 text-white/68">{orbital.routeDescription}</p>
              </Link>
            );
          })}
        </section>

        <section className="rounded-[32px] border border-white/10 bg-black/20 p-2 shadow-[0_30px_100px_rgba(0,0,0,0.32)] backdrop-blur-xl tablet:p-4">
          <Orbital initialStep={step} window="SignInWindow" />
        </section>
      </main>
    </div>
  );
}
