import React from 'react';
import Link from 'next/link';

import Footer from '@/components/base/engi/layout/footer';
import { BITCODE_PUBLIC_COPY } from '@/components/base/engi/layout/bitcode-public-copy';
import { BITCODE_PUBLIC_EXPLAINERS } from '@/components/base/engi/layout/bitcode-public-explainers';

import MarketingOperatorGuideCard from './MarketingOperatorGuideCard';

type PublicDocsPageContentProps = {
  sourcePlayable: boolean;
};

const docsSections = [
  {
    href: '/',
    eyebrow: 'Network',
    title: 'Read the live Bitcode market frame',
    summary: BITCODE_PUBLIC_EXPLAINERS.network.summary,
    detail: BITCODE_PUBLIC_EXPLAINERS.network.detail,
  },
  {
    href: '/application',
    eyebrow: 'Transactions',
    title: 'Move into full give-to-settle detail',
    summary: BITCODE_PUBLIC_EXPLAINERS.transactions.summary,
    detail: BITCODE_PUBLIC_EXPLAINERS.transactions.detail,
  },
  {
    href: '/auxillaries/profile',
    eyebrow: 'Auxillaries',
    title: 'Shape identity, interfaces, and $BTD posture',
    summary: BITCODE_PUBLIC_EXPLAINERS.openOrbitals.summary,
    detail: BITCODE_PUBLIC_EXPLAINERS.openOrbitals.detail,
  },
  {
    href: '/edgetimes',
    eyebrow: 'Edgetimes',
    title: 'Inspect storage, schema, and package owners',
    summary:
      'Read the fourth-gate storage posture for Supabase, ORM/query ownership, generated types, and retained package admissions.',
    detail:
      'Use this route when you need the persistence map explicit before deeper work on conversations, runs, and deliverables.',
  },
] as const;

const inlineWidgets = [
  {
    title: 'Give widget',
    body: 'Supply stays attached to source, authorship, citations, and issuance context.',
  },
  {
    title: 'Need widget',
    body: 'Demand is read through quality, fit, dedupe, and proof-bearing trust signals.',
  },
  {
    title: 'Settlement widget',
    body: 'Transactions carry proof, history, reads, and issuance through one auditable flow.',
  },
] as const;

export default function PublicDocsPageContent({ sourcePlayable }: PublicDocsPageContentProps) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.16),transparent_30%),linear-gradient(180deg,#04101a_0%,#030816_45%,#02060d_100%)] text-white">
      <main className="mx-auto flex w-full max-w-[1240px] flex-col gap-8 px-4 py-16 phone:px-5 tablet:px-6 laptop:px-8">
        <div className="space-y-4">
          <p className="text-[11px] uppercase tracking-[0.26em] text-emerald-200/70">
            {BITCODE_PUBLIC_COPY.guideRoute.eyebrow}
          </p>
          <h1 className="max-w-[14ch] text-[2.35rem] font-semibold leading-[0.96] tracking-[-0.025em] text-white phone:text-[2.9rem] tablet:text-[3.6rem]">
            {BITCODE_PUBLIC_COPY.guideRoute.heading}
          </h1>
          <p className="max-w-[54rem] text-[17px] leading-8 text-white/80">
            {BITCODE_PUBLIC_COPY.guideRoute.body}
          </p>
        </div>

        <div className="grid gap-5 laptop:grid-cols-[minmax(0,0.98fr)_minmax(360px,1.02fr)]">
          <section className="rounded-[32px] border border-white/10 bg-black/28 p-5 shadow-[0_30px_100px_rgba(0,0,0,0.42)] backdrop-blur-xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center rounded-full border border-emerald-300/12 bg-emerald-400/6 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-emerald-100/70">
                Documentation path
              </span>
              <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-white/55">
                public teaching surface
              </span>
            </div>

            <div className="mt-5 grid gap-3">
              {docsSections.map((section) => (
                <Link
                  key={section.title}
                  href={section.href}
                  aria-label={section.title}
                  className="rounded-[24px] border border-white/8 bg-white/[0.03] p-4 transition hover:border-emerald-300/22 hover:bg-emerald-400/[0.06]"
                >
                  <p className="text-[10px] uppercase tracking-[0.2em] text-emerald-200/70">
                    {section.eyebrow}
                  </p>
                  <p className="mt-2 text-lg font-semibold text-white">{section.title}</p>
                  <p className="mt-2 text-sm leading-6 text-white/80">{section.summary}</p>
                  <p className="mt-2 text-[13px] leading-6 text-emerald-100/62">{section.detail}</p>
                </Link>
              ))}
            </div>
          </section>

          <section
            id="walkthrough"
            className="overflow-hidden rounded-[32px] border border-white/10 bg-black/28 p-4 shadow-[0_30px_100px_rgba(0,0,0,0.42)] backdrop-blur-xl"
          >
            <MarketingOperatorGuideCard
              initialSourcePlayable={sourcePlayable}
              initialSourceResolved
            />
          </section>
        </div>

        <section className="rounded-[32px] border border-white/10 bg-black/24 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center rounded-full border border-cyan-300/12 bg-cyan-400/6 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-cyan-100/70">
              Inline widgets
            </span>
            <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-white/55">
              mock data, public reading
            </span>
          </div>

          <div className="mt-5 grid gap-3 tablet:grid-cols-3">
            {inlineWidgets.map((widget) => (
              <article
                key={widget.title}
                className="rounded-[22px] border border-white/8 bg-white/[0.03] p-4"
              >
                <p className="text-[10px] uppercase tracking-[0.18em] text-emerald-200/70">
                  {widget.title}
                </p>
                <p className="mt-3 text-sm leading-6 text-white/78">{widget.body}</p>
              </article>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/application"
              className="inline-flex items-center rounded-full border border-emerald-300/22 bg-emerald-400/12 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-50 transition hover:border-emerald-300/38 hover:bg-emerald-400/18"
            >
              Open transactions
            </Link>
            <Link
              href="/auxillaries/profile"
              className="inline-flex items-center rounded-full border border-white/12 bg-white/5 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/84 transition hover:border-white/20 hover:bg-white/10"
            >
              Open Auxillaries
            </Link>
            <a
              href="https://github.com/engineeredsoftware/ENGI/blob/main/ENGI_SPEC.txt"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full border border-white/12 bg-white/5 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/84 transition hover:border-white/20 hover:bg-white/10"
            >
              Read protocol spec
            </a>
          </div>
        </section>
      </main>

      <Footer showPrimaryContent={false} className="border-white/10 bg-[#02060d]/72 backdrop-blur-xl" />
    </div>
  );
}
