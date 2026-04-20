'use client';

import React from 'react';
import Link from 'next/link';

import AuxillariesSurface from '@/app/auxillaries/components/AuxillariesSurface';
import {
  buildAuxillariesRoutePath,
  getAuxillaryDescriptor,
  OPEN_TRANSACTIONS_LABEL,
  AUXILLARY_ROUTE_SEQUENCE,
  type AuxillaryPaneDescriptor,
  type ConcreteAuxillaryPane,
} from '@/app/auxillaries/components/auxillary-pane-meta';

interface AuxillariesRouteClientProps {
  step: ConcreteAuxillaryPane;
}

export default function AuxillariesRouteClient({ step }: AuxillariesRouteClientProps) {
  const descriptor = getAuxillaryDescriptor(step);
  const auxillaries: AuxillaryPaneDescriptor[] = AUXILLARY_ROUTE_SEQUENCE.map((auxillaryStep) =>
    getAuxillaryDescriptor(auxillaryStep),
  );
  const routeHeading = `${descriptor.label} in one contained auxillary read.`;
  const routeBody = `${descriptor.routeDescription} Use one focused auxillary when you want a dedicated extra-network read surface, then step back into transactions only when you need the full ledger context.`;

  return (
    <div className="min-h-[calc(100vh-9rem)] bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.14),transparent_26%),radial-gradient(circle_at_86%_18%,rgba(56,189,248,0.1),transparent_18%),linear-gradient(180deg,#050d15_0%,#02060d_44%,#010309_100%)] text-white">
      <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-10 phone:px-5 tablet:px-6 laptop:px-8">
        <section className="rounded-[28px] border border-white/10 bg-white/5 px-5 py-5 shadow-[0_24px_70px_rgba(0,0,0,0.22)] backdrop-blur-xl">
          <div className="flex flex-col gap-4 tablet:flex-row tablet:items-end tablet:justify-between">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-200/74">
                {descriptor.label} auxillary
              </p>
              <h1 className="text-[1.8rem] font-semibold tracking-[-0.04em] text-white tablet:text-[2.4rem]">
                {routeHeading}
              </h1>
              <p className="max-w-[48rem] text-sm leading-7 text-white/70 tablet:text-[15px]">
                {routeBody}
              </p>
            </div>

            <Link
              href="/application"
              className="inline-flex items-center justify-center rounded-full border border-emerald-300/18 bg-emerald-400/8 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-50 transition-colors hover:border-emerald-200/32 hover:bg-emerald-400/12"
            >
              {OPEN_TRANSACTIONS_LABEL}
            </Link>
          </div>
        </section>

        <section className="grid gap-3 rounded-[28px] border border-white/8 bg-black/20 p-4 shadow-[0_22px_60px_rgba(0,0,0,0.2)] backdrop-blur-xl tablet:grid-cols-2 laptop:grid-cols-4">
          {auxillaries.map((auxillary) => {
            const isActive = auxillary.routeSegment === descriptor.routeSegment;

            return (
              <Link
                key={auxillary.routeSegment}
                href={buildAuxillariesRoutePath(auxillary.routeSegment)}
                aria-current={isActive ? 'page' : undefined}
                className={`rounded-[22px] border px-4 py-4 transition-colors hover:border-white/18 hover:bg-white/8 ${
                  isActive
                    ? 'border-emerald-300/28 bg-[linear-gradient(180deg,rgba(16,185,129,0.15),rgba(16,185,129,0.08))] shadow-[0_18px_44px_rgba(0,0,0,0.2)]'
                    : 'border-white/8 bg-white/5'
                }`}
              >
                <p className="text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-emerald-200/78">
                  {auxillary.label}
                </p>
                <p className="mt-2 text-sm font-medium text-white">
                  {isActive ? 'Current route' : 'Open auxillary'}
                </p>
                <p className="mt-2 text-sm leading-7 text-white/68">{auxillary.routeDescription}</p>
              </Link>
            );
          })}
        </section>

        <section className="rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(5,11,21,0.92),rgba(3,6,14,0.94))] p-2 shadow-[0_30px_100px_rgba(0,0,0,0.32)] backdrop-blur-xl tablet:p-4">
          <AuxillariesSurface initialStep={step} window="SignInWindow" />
        </section>
      </main>
    </div>
  );
}
