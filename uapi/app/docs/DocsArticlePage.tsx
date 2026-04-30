import React from 'react';
import Link from 'next/link';

import Footer from '@/components/base/bitcode/layout/footer';

import {
  BITCODE_DOCS_PAGES,
  TERMINAL_ACTION_GUIDES,
  TERMINAL_READ_GUIDES,
  type BitcodeDocsPage,
} from './bitcode-docs-content';

type DocsArticlePageProps = {
  page: BitcodeDocsPage;
};

function DocsPageRail({ activeHref }: { activeHref: string }) {
  return (
    <nav
      aria-label="Bitcode docs pages"
      className="rounded-[28px] border border-white/10 bg-black/24 p-3 backdrop-blur-xl"
    >
      <p className="px-3 py-2 text-[10px] uppercase tracking-[0.22em] text-emerald-200/70">
        Docs pages
      </p>
      <div className="grid gap-2">
        {BITCODE_DOCS_PAGES.map((item) => {
          const active = item.href === activeHref;
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? 'page' : undefined}
              className={`rounded-2xl border px-3 py-3 transition ${
                active
                  ? 'border-emerald-300/28 bg-emerald-400/10 text-emerald-50'
                  : 'border-white/8 bg-white/[0.03] text-white/72 hover:border-emerald-300/20 hover:bg-emerald-400/[0.06] hover:text-emerald-50'
              }`}
            >
              <span className="block text-[10px] uppercase tracking-[0.2em] text-emerald-200/68">
                {item.eyebrow}
              </span>
              <span className="mt-1 block text-sm font-semibold">{item.title}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

function GuideCard({
  card,
  index,
}: {
  card: BitcodeDocsPage['sections'][number];
  index: number;
}) {
  return (
    <article className="rounded-[28px] border border-white/10 bg-white/[0.035] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.22)]">
      <div className="flex items-center justify-between gap-3">
        <p className="text-[10px] uppercase tracking-[0.22em] text-emerald-200/72">{card.eyebrow}</p>
        <span className="rounded-full border border-white/10 bg-black/20 px-2.5 py-1 text-[10px] text-white/45">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>
      <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">{card.title}</h2>
      <p className="mt-3 text-sm leading-7 text-white/78">{card.summary}</p>
      <p className="mt-3 text-sm leading-7 text-emerald-50/62">{card.detail}</p>
      {card.points?.length ? (
        <ul className="mt-4 grid gap-2">
          {card.points.map((point) => (
            <li
              key={point}
              className="rounded-2xl border border-emerald-300/10 bg-emerald-400/[0.045] px-3 py-2 text-sm leading-6 text-emerald-50/76"
            >
              {point}
            </li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}

function TerminalActionsSection() {
  return (
    <section id="terminal-actions" className="rounded-[32px] border border-white/10 bg-black/24 p-5 backdrop-blur-xl">
      <div className="max-w-3xl">
        <p className="text-[10px] uppercase tracking-[0.24em] text-emerald-200/72">Action manual</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">
          Write deliberately, then read the result
        </h2>
        <p className="mt-3 text-sm leading-7 text-white/72">
          The Terminal is not a button pile. Each write changes a bounded part of Bitcode state,
          and each expected read tells you whether to continue, stop, or open exact proof detail.
        </p>
      </div>
      <div className="mt-6 grid gap-3">
        {TERMINAL_ACTION_GUIDES.map((item, index) => (
          <article
            id={item.id}
            key={item.id}
            className="grid gap-4 rounded-[24px] border border-white/8 bg-white/[0.03] p-4 tablet:grid-cols-[0.7fr_1fr_1fr]"
          >
            <div>
              <p className="text-[10px] uppercase tracking-[0.22em] text-emerald-200/70">
                {String(index + 1).padStart(2, '0')} / {item.location}
              </p>
              <h3 className="mt-2 text-lg font-semibold text-white">{item.action}</h3>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/45">Write</p>
              <p className="mt-2 text-sm leading-6 text-white/76">{item.write}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-emerald-200/65">
                Expected read
              </p>
              <p className="mt-2 text-sm leading-6 text-emerald-50/76">{item.expectedRead}</p>
              <p className="mt-3 rounded-2xl border border-emerald-300/10 bg-emerald-400/[0.045] px-3 py-2 text-xs leading-5 text-emerald-50/64">
                {item.proofSignal}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function TerminalReadsSection() {
  return (
    <section id="terminal-reads" className="rounded-[32px] border border-white/10 bg-black/24 p-5 backdrop-blur-xl">
      <div className="max-w-3xl">
        <p className="text-[10px] uppercase tracking-[0.24em] text-cyan-200/72">Read guide</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">
          Expected results and proof-bearing reads
        </h2>
        <p className="mt-3 text-sm leading-7 text-white/72">
          These are the read surfaces a Terminal user should trust before moving from source
          supply into fit, closure, settlement, or ledger history.
        </p>
      </div>
      <div className="mt-6 grid gap-3 tablet:grid-cols-2">
        {TERMINAL_READ_GUIDES.map((item) => (
          <article key={item.id} className="rounded-[24px] border border-white/8 bg-white/[0.03] p-4">
            <p className="text-[10px] uppercase tracking-[0.2em] text-cyan-200/68">{item.location}</p>
            <h3 className="mt-2 text-lg font-semibold text-white">{item.read}</h3>
            <p className="mt-2 text-sm leading-6 text-white/74">{item.tellsYou}</p>
            <p className="mt-3 rounded-2xl border border-cyan-300/10 bg-cyan-400/[0.045] px-3 py-2 text-xs leading-5 text-cyan-50/68">
              {item.expectedResult}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default function DocsArticlePage({ page }: DocsArticlePageProps) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.18),transparent_34%),radial-gradient(circle_at_78%_18%,rgba(34,211,238,0.1),transparent_26%),linear-gradient(180deg,#04101a_0%,#030816_42%,#02060d_100%)] text-white">
      <main className="mx-auto grid w-full max-w-[1320px] gap-8 px-4 pb-16 pt-32 phone:px-5 tablet:px-6 laptop:grid-cols-[280px_minmax(0,1fr)] laptop:px-8">
        <aside className="laptop:sticky laptop:top-28 laptop:self-start">
          <DocsPageRail activeHref={page.href} />
        </aside>
        <div className="min-w-0 space-y-8">
          <section className="overflow-hidden rounded-[36px] border border-white/10 bg-black/24 p-6 shadow-[0_30px_100px_rgba(0,0,0,0.34)] backdrop-blur-xl tablet:p-8">
            <p className="text-[11px] uppercase tracking-[0.28em] text-emerald-200/72">{page.eyebrow}</p>
            <h1 className="mt-4 max-w-[13ch] text-[2.45rem] font-semibold leading-[0.98] tracking-[-0.025em] text-white phone:text-[3rem] tablet:text-[4rem]">
              {page.title}
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-white/80">{page.summary}</p>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-emerald-50/65">{page.detail}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={page.primaryCta.href}
                className="inline-flex rounded-full border border-emerald-300/24 bg-emerald-400/12 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-50 transition hover:border-emerald-300/42 hover:bg-emerald-400/18"
              >
                {page.primaryCta.label}
              </Link>
              <Link
                href="/docs"
                className="inline-flex rounded-full border border-white/12 bg-white/5 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/76 transition hover:border-white/22 hover:bg-white/10"
              >
                Docs hub
              </Link>
            </div>
          </section>

          <section className="grid gap-4">
            {page.sections.map((card, index) => (
              <GuideCard key={card.title} card={card} index={index} />
            ))}
          </section>

          {page.slug === 'terminal-actions' ? <TerminalActionsSection /> : null}
          {page.slug === 'read-results' ? <TerminalReadsSection /> : null}
          {page.slug === 'terminal' ? (
            <div className="grid gap-4 tablet:grid-cols-2">
              <Link
                href="/docs/terminal-actions"
                className="rounded-[28px] border border-emerald-300/14 bg-emerald-400/[0.06] p-5 transition hover:border-emerald-300/28 hover:bg-emerald-400/[0.1]"
              >
                <p className="text-[10px] uppercase tracking-[0.22em] text-emerald-200/70">Next</p>
                <p className="mt-2 text-xl font-semibold text-white">Read every Terminal write action</p>
                <p className="mt-2 text-sm leading-6 text-white/68">
                  Continue into the action manual when you want exact operator writes and expected results.
                </p>
              </Link>
              <Link
                href="/docs/read-results"
                className="rounded-[28px] border border-cyan-300/14 bg-cyan-400/[0.05] p-5 transition hover:border-cyan-300/28 hover:bg-cyan-400/[0.09]"
              >
                <p className="text-[10px] uppercase tracking-[0.22em] text-cyan-200/70">Audit</p>
                <p className="mt-2 text-xl font-semibold text-white">Read proofs and readiness</p>
                <p className="mt-2 text-sm leading-6 text-white/68">
                  Move to read surfaces when you need to verify state before trusting the flow.
                </p>
              </Link>
            </div>
          ) : null}
        </div>
      </main>
      <Footer showPrimaryContent={false} className="border-white/10 bg-[#02060d]/72 backdrop-blur-xl" />
    </div>
  );
}
