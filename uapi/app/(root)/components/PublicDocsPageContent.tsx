import React from 'react';
import Link from 'next/link';

import Footer from '@/components/base/bitcode/layout/footer';
import { BITCODE_PUBLIC_COPY } from '@/components/base/bitcode/layout/bitcode-public-copy';
import { BITCODE_PUBLIC_EXPLAINERS } from '@/components/base/bitcode/layout/bitcode-public-explainers';
import { BITCODE_DOCS_PAGES, TERMINAL_ACTION_GUIDES, TERMINAL_READ_GUIDES } from '@/app/docs/bitcode-docs-content';

import MarketingOperatorGuideCard from './MarketingOperatorGuideCard';

type PublicDocsPageContentProps = {
  sourcePlayable: boolean;
};

const quickRouteCards = [
  {
    href: '/',
    eyebrow: 'Exchange',
    title: 'Read the live market frame',
    summary: BITCODE_PUBLIC_EXPLAINERS.network.summary,
  },
  {
    href: '/application',
    eyebrow: 'Terminal',
    title: 'Operate the ledger',
    summary: BITCODE_PUBLIC_EXPLAINERS.transactions.summary,
  },
  {
    href: 'https://github.com/engineeredsoftware/bitcode/blob/main/BITCODE_SPEC.txt',
    eyebrow: 'Protocol',
    title: 'Audit the canon',
    summary: BITCODE_PUBLIC_EXPLAINERS.protocolSpec.summary,
    external: true,
  },
] as const;

const sourceShareWidgets = [
  {
    title: 'Give',
    body: 'Supply stays attached to source, authorship, citations, and issuance context.',
  },
  {
    title: 'Need',
    body: 'Demand is read through quality, fit, dedupe, and proof-bearing trust signals.',
  },
  {
    title: 'Settle',
    body: 'Transactions carry proof, history, reads, and issuance through one auditable flow.',
  },
] as const;

export default function PublicDocsPageContent({ sourcePlayable }: PublicDocsPageContentProps) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.16),transparent_30%),linear-gradient(180deg,#04101a_0%,#030816_45%,#02060d_100%)] text-white">
      <main className="mx-auto flex w-full max-w-[1320px] flex-col gap-8 px-4 pb-16 pt-32 phone:px-5 tablet:px-6 laptop:px-8">
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
                Documentation pages
              </span>
              <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-white/55">
                new and experienced users
              </span>
            </div>

            <div className="mt-5 grid gap-3">
              {BITCODE_DOCS_PAGES.map((section) => (
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
          <div className="grid gap-6 laptop:grid-cols-[0.72fr_1.28fr]">
            <div>
              <p className="text-[10px] uppercase tracking-[0.24em] text-emerald-200/72">
                Terminal action map
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">
                Every write has a read-back expectation.
              </h2>
              <p className="mt-3 text-sm leading-7 text-white/72">
                The Terminal guide documents the write actions operators can take and the
                exact read surfaces that should confirm the result before they move into
                proof, settlement, or history.
              </p>
              <Link
                href="/docs/terminal-actions"
                className="mt-5 inline-flex rounded-full border border-emerald-300/24 bg-emerald-400/12 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-50 transition hover:border-emerald-300/42 hover:bg-emerald-400/18"
              >
                Open action guide
              </Link>
            </div>
            <div className="grid gap-3 tablet:grid-cols-2">
              {TERMINAL_ACTION_GUIDES.slice(0, 6).map((item) => (
                <article key={item.id} className="rounded-[24px] border border-white/8 bg-white/[0.03] p-4">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-emerald-200/68">{item.location}</p>
                  <p className="mt-2 text-base font-semibold text-white">{item.action}</p>
                  <p className="mt-2 text-sm leading-6 text-white/68">{item.expectedRead}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-[32px] border border-white/10 bg-black/24 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center rounded-full border border-cyan-300/12 bg-cyan-400/6 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-cyan-100/70">
              Source Shares visual guide
            </span>
            <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-white/55">
              give, need, settle
            </span>
          </div>

          <div className="mt-5 grid gap-3 tablet:grid-cols-3">
            {sourceShareWidgets.map((widget) => (
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
        </section>

        <section className="grid gap-5 laptop:grid-cols-[minmax(0,1.1fr)_minmax(340px,0.9fr)]">
          <div className="rounded-[32px] border border-white/10 bg-black/24 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl">
            <p className="text-[10px] uppercase tracking-[0.24em] text-cyan-200/72">
              Proof and readiness reads
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">
              Read what changed before trusting the flow.
            </h2>
            <div className="mt-5 grid gap-3">
              {TERMINAL_READ_GUIDES.slice(0, 5).map((item) => (
                <article key={item.id} className="rounded-[22px] border border-white/8 bg-white/[0.03] p-4">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-cyan-200/68">{item.location}</p>
                  <p className="mt-2 text-base font-semibold text-white">{item.read}</p>
                  <p className="mt-2 text-sm leading-6 text-white/68">{item.expectedResult}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="rounded-[32px] border border-white/10 bg-black/24 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl">
            <p className="text-[10px] uppercase tracking-[0.24em] text-emerald-200/72">
              Fast routes
            </p>
            <div className="mt-4 grid gap-3">
              {quickRouteCards.map((card) => {
                const className =
                  'block rounded-[24px] border border-white/8 bg-white/[0.03] p-4 transition hover:border-emerald-300/22 hover:bg-emerald-400/[0.06]';

                return 'external' in card && card.external ? (
                  <a
                    key={card.href}
                    href={card.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={className}
                  >
                    <p className="text-[10px] uppercase tracking-[0.2em] text-emerald-200/70">
                      {card.eyebrow}
                    </p>
                    <p className="mt-2 text-lg font-semibold text-white">{card.title}</p>
                    <p className="mt-2 text-sm leading-6 text-white/70">{card.summary}</p>
                  </a>
                ) : (
                  <Link key={card.href} href={card.href} className={className}>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-emerald-200/70">
                      {card.eyebrow}
                    </p>
                    <p className="mt-2 text-lg font-semibold text-white">{card.title}</p>
                    <p className="mt-2 text-sm leading-6 text-white/70">{card.summary}</p>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/application"
              className="inline-flex items-center rounded-full border border-emerald-300/22 bg-emerald-400/12 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-50 transition hover:border-emerald-300/38 hover:bg-emerald-400/18"
            >
              Open Bitcode Terminal
            </Link>
            <Link
              href="/auxillaries/profile"
              className="inline-flex items-center rounded-full border border-white/12 bg-white/5 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/84 transition hover:border-white/20 hover:bg-white/10"
            >
              Open Auxillaries
            </Link>
            <a
              href="https://github.com/engineeredsoftware/bitcode/blob/main/BITCODE_SPEC.txt"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full border border-white/12 bg-white/5 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/84 transition hover:border-white/20 hover:bg-white/10"
            >
              Read protocol spec
            </a>
          </div>
      </main>

      <Footer showPrimaryContent={false} className="border-white/10 bg-[#02060d]/72 backdrop-blur-xl" />
    </div>
  );
}
