'use client';

import { useCallback, useEffect, useState } from 'react';

import {
  jumpToShellSection,
  readGenericCard,
  readPrimaryText,
  readSurfaceArticle,
  toneForPanel,
  type NativeCard,
  type NativePanel,
} from './application-shell-reading';

const CLOSURE_PANEL_CONFIG = [
  { id: 'panelEvaluations', fallbackLabel: 'Verification + ranked candidates' },
  { id: 'panelBranchArtifacts', fallbackLabel: 'Branch artifacts' },
  { id: 'panelSettlement', fallbackLabel: 'Settlement + proof' },
  { id: 'panelLedger', fallbackLabel: 'Ledger + run history' },
] as const;

function readFallbackCard(panel: HTMLElement, title: string, eyebrow: string): NativeCard[] {
  const fallback = panel.querySelector('.card');
  if (!fallback) return [];
  return [readGenericCard(fallback, title, eyebrow)];
}

function readClosurePanel(panelId: string, fallbackLabel: string): NativePanel {
  const panel = document.getElementById(panelId) as HTMLElement | null;
  if (!panel) {
    return { id: panelId, label: fallbackLabel, badge: '', cards: [] };
  }

  const label = readPrimaryText(panel.querySelector('.panel-head h2')) || fallbackLabel;
  const badge = readPrimaryText(panel.querySelector('.panel-head .badge'));
  const articles = Array.from(panel.querySelectorAll('article.json-surface')).map((element) => readSurfaceArticle(element));

  let cards: NativeCard[] = [];
  if (panelId === 'panelBranchArtifacts') {
    const introCards = Array.from(panel.querySelectorAll('.intro-card')).map((element) =>
      readGenericCard(element, 'Branch artifact stack', 'Branch artifact'),
    );
    const markdownCards = Array.from(panel.querySelectorAll(':scope > .card:not(.intro-card)'))
      .filter((element) => !element.querySelector('article.json-surface'))
      .map((element) => readGenericCard(element, 'Materialized markdown artifacts', 'Branch artifact'));
    cards = [...introCards, ...articles, ...markdownCards];
  } else {
    cards = articles;
  }

  if (!cards.length) {
    cards = readFallbackCard(panel, fallbackLabel, 'Bitcode closure');
  }

  return {
    id: panelId,
    label,
    badge,
    cards: cards.slice(0, 4),
  };
}

export default function ApplicationClosureNativeSections() {
  const [panels, setPanels] = useState<NativePanel[]>([]);

  const refreshFromShell = useCallback(() => {
    setPanels(CLOSURE_PANEL_CONFIG.map((panel) => readClosurePanel(panel.id, panel.fallbackLabel)));
  }, []);

  useEffect(() => {
    refreshFromShell();

    const intervalId = window.setInterval(refreshFromShell, 900);
    const handleDocumentChange = () => window.setTimeout(refreshFromShell, 0);

    document.addEventListener('change', handleDocumentChange, true);
    document.addEventListener('click', handleDocumentChange, true);

    return () => {
      window.clearInterval(intervalId);
      document.removeEventListener('change', handleDocumentChange, true);
      document.removeEventListener('click', handleDocumentChange, true);
    };
  }, [refreshFromShell]);

  return (
    <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(8,12,24,0.96),rgba(4,8,18,0.95))] px-6 py-6 shadow-[0_30px_100px_rgba(0,0,0,0.42)]">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
        <div className="max-w-3xl">
          <p className="text-[0.72rem] uppercase tracking-[0.34em] text-neutral-400">Application closure composition</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white tablet:text-[2.05rem]">
            Native verification, artifact, settlement, and ledger read
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-neutral-300 tablet:text-base">
            This layer lifts the consequence side of Bitcode into the application frame. Ranked verification, branch
            materialization, settlement proof, and ledger history now read as route-owned cards while the preserved shell
            below remains the live semantic source.
          </p>
        </div>

        <div className="grid gap-3 text-xs uppercase tracking-[0.2em] text-neutral-400 tablet:grid-cols-2">
          <div className="rounded-2xl border border-white/8 bg-black/20 px-4 py-4">
            <p className="text-emerald-300/85">Closure owner</p>
            <p className="mt-2 text-neutral-200">native application cards</p>
          </div>
          <div className="rounded-2xl border border-white/8 bg-black/20 px-4 py-4">
            <p className="text-emerald-300/85">System source</p>
            <p className="mt-2 text-neutral-200">live verification + settlement panels</p>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-5">
        {panels.map((panel) => (
          <div key={panel.id} className={`rounded-[1.75rem] border px-5 py-5 ${toneForPanel(panel.id)}`}>
            <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
              <div className="min-w-0 max-w-3xl">
                <p className="text-[0.68rem] uppercase tracking-[0.2em] text-neutral-400">Closure Bitcode section</p>
                <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white">{panel.label}</h3>
                <p className="mt-2 text-sm leading-6 text-neutral-300">
                  {panel.cards[0]?.help ||
                    panel.cards[0]?.subtitle ||
                    'This closure-stage section is live in the preserved Bitcode shell below.'}
                </p>
              </div>

              <div className="flex shrink-0 flex-wrap items-center gap-2 text-[0.66rem] uppercase tracking-[0.18em] text-neutral-300">
                {panel.badge ? (
                  <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1">{panel.badge}</span>
                ) : null}
                <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1">
                  {panel.cards.length} surfaced reads
                </span>
                <button
                  type="button"
                  onClick={() => jumpToShellSection(panel.id)}
                  className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-2 text-emerald-100 transition hover:border-emerald-300/50 hover:bg-emerald-400/15"
                >
                  Open live section
                </button>
              </div>
            </div>

            <div className="mt-5 grid gap-4 xl:grid-cols-2">
              {panel.cards.map((card, cardIndex) => (
                <article key={`${panel.id}-${cardIndex}-${card.title}`} className="rounded-[1.45rem] border border-white/8 bg-black/20 px-5 py-5">
                  <div className="flex flex-col gap-3">
                    <div>
                      {card.eyebrow ? (
                        <p className="text-[0.66rem] uppercase tracking-[0.2em] text-emerald-300/75">{card.eyebrow}</p>
                      ) : null}
                      <h4 className="mt-2 text-lg font-semibold text-white">{card.title}</h4>
                      {card.subtitle ? <p className="mt-2 text-sm leading-6 text-neutral-300">{card.subtitle}</p> : null}
                    </div>

                    {card.badge ? (
                      <div className="flex flex-wrap gap-2">
                        <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[0.66rem] uppercase tracking-[0.18em] text-neutral-200">
                          {card.badge}
                        </span>
                      </div>
                    ) : null}

                    {card.metrics.length ? (
                      <div className="grid gap-3 sm:grid-cols-2">
                        {card.metrics.map((metric, metricIndex) => (
                          <div key={`${card.title}-${metricIndex}-${metric.label}-${metric.value}`} className="rounded-[1.15rem] border border-white/8 bg-white/5 px-4 py-4">
                            <p className="text-[0.64rem] uppercase tracking-[0.16em] text-neutral-500">{metric.label}</p>
                            <p className="mt-2 text-base font-semibold text-white">{metric.value}</p>
                          </div>
                        ))}
                      </div>
                    ) : null}

                    {card.rows.length ? (
                      <dl className="space-y-3 rounded-[1.2rem] border border-white/8 bg-white/5 px-4 py-4 text-sm">
                        {card.rows.map((row, rowIndex) => (
                          <div key={`${card.title}-${rowIndex}-${row.label}-${row.value}`}>
                            <dt className="text-neutral-500">{row.label}</dt>
                            <dd className="mt-1 break-words text-neutral-100">{row.value}</dd>
                          </div>
                        ))}
                      </dl>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
