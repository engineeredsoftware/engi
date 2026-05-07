'use client';

import { useMemo } from 'react';
import { ArrowUpRight, GitBranch, Lock, ShieldCheck } from 'lucide-react';

import { toneForPanel, type NativePanel, jumpToShellSection } from './application-shell-reading';
import {
  APPLICATION_ACTIONS,
  CORE_PANEL_ACTION,
  CORE_PANEL_EXPERIENCE,
  getApplicationAction,
  getApplicationExperience,
} from './application-experience-architecture';
import { useApplicationShellBridge } from './application-shell-bridge';
import type { ApplicationRepositoryContextState } from './application-repository-context';
import { normalizeApplicationCorePanels } from './application-core-surface';

interface ApplicationCoreNativeSectionsProps {
  repositoryContext?: ApplicationRepositoryContextState | null;
}

export default function ApplicationCoreNativeSections({
  repositoryContext = null,
}: ApplicationCoreNativeSectionsProps) {
  const { snapshot } = useApplicationShellBridge();
  const selectedRepository = repositoryContext?.selectedRepository || null;
  const connectionStatus = repositoryContext?.connectionStatus || null;
  const panels = useMemo<NativePanel[]>(() => normalizeApplicationCorePanels(snapshot), [snapshot]);

  return (
    <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(8,12,24,0.96),rgba(4,8,18,0.95))] px-6 py-6 shadow-[0_30px_100px_rgba(0,0,0,0.42)]">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
        <div className="max-w-3xl">
          <p className="text-[0.72rem] uppercase tracking-[0.34em] text-neutral-400">Give and need overview</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white tablet:text-[2.05rem]">
            Supply, need, and fit map
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-neutral-300 tablet:text-base">
            Keep the live give-side source, measured need, and fit posture readable without leaving the Bitcode Terminal.
          </p>
        </div>

        <div className="grid gap-3 text-xs uppercase tracking-[0.2em] text-neutral-400 tablet:grid-cols-2">
          <div className="rounded-2xl border border-white/8 bg-black/20 px-4 py-4">
            <p className="text-emerald-300/85">Primary actions</p>
            <p className="mt-2 text-neutral-200">give + need</p>
          </div>
          <div className="rounded-2xl border border-white/8 bg-black/20 px-4 py-4">
            <p className="text-emerald-300/85">Source</p>
            <p className="mt-2 text-neutral-200">live Bitcode flow</p>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-4 xl:grid-cols-2">
        {APPLICATION_ACTIONS.map((action) => (
          <article key={action.id} className="rounded-[1.55rem] border border-emerald-400/15 bg-black/20 px-5 py-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[0.66rem] uppercase tracking-[0.2em] text-emerald-300/75">{action.badge}</p>
                <h3 className="mt-2 text-xl font-semibold text-white">{action.label}</h3>
              </div>
              <span className="rounded-full border border-emerald-400/25 bg-emerald-400/10 px-2.5 py-1 text-[0.62rem] uppercase tracking-[0.18em] text-emerald-200">
                action
              </span>
            </div>
            <p className="mt-3 text-sm leading-6 text-neutral-300">{action.description}</p>
            {action.id === 'give' ? (
              selectedRepository ? (
                <div className="mt-4 rounded-[1.2rem] border border-emerald-400/20 bg-emerald-400/10 px-4 py-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[0.64rem] uppercase tracking-[0.18em] text-emerald-200/80">Selected repository supply</p>
                      <p className="mt-2 text-base font-semibold text-white">{selectedRepository.fullName}</p>
                    </div>
                    <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[0.62rem] uppercase tracking-[0.18em] text-neutral-200">
                      {connectionStatus?.metadata?.mock_mode ? 'mock' : 'live'}
                    </span>
                  </div>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-[1rem] border border-white/8 bg-black/20 px-3 py-3">
                      <p className="text-[0.6rem] uppercase tracking-[0.14em] text-neutral-500">Branch</p>
                      <p className="mt-2 flex items-center gap-2 text-sm font-medium text-white">
                        <GitBranch className="h-4 w-4 text-emerald-200" />
                        {selectedRepository.defaultBranch || 'main'}
                      </p>
                    </div>
                    <div className="rounded-[1rem] border border-white/8 bg-black/20 px-3 py-3">
                      <p className="text-[0.6rem] uppercase tracking-[0.14em] text-neutral-500">Visibility</p>
                      <p className="mt-2 flex items-center gap-2 text-sm font-medium text-white">
                        {selectedRepository.private ? (
                          <Lock className="h-4 w-4 text-amber-200" />
                        ) : (
                          <ShieldCheck className="h-4 w-4 text-emerald-200" />
                        )}
                        {selectedRepository.private ? 'private' : 'public'}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[0.62rem] uppercase tracking-[0.18em] text-neutral-200">
                      {selectedRepository.language || 'n/a'}
                    </span>
                    <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[0.62rem] uppercase tracking-[0.18em] text-neutral-200">
                      {connectionStatus?.username || connectionStatus?.metadata?.account || 'connected'}
                    </span>
                    <a
                      href={selectedRepository.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[0.62rem] uppercase tracking-[0.18em] text-neutral-100 transition hover:border-white/18 hover:bg-white/10"
                    >
                      open repo
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              ) : (
                <div className="mt-4 rounded-[1.2rem] border border-white/8 bg-white/5 px-4 py-4 text-sm leading-6 text-neutral-300">
                  Connect and select a repository above to make Bitcode give-side supply explicit before the deposit chain.
                </div>
              )
            ) : null}
            <div className="mt-5">
              <button
                type="button"
                onClick={() => jumpToShellSection(action.targetId)}
                className="rounded-[1.25rem] border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm font-medium text-emerald-100 transition hover:border-emerald-300/45 hover:bg-emerald-400/15"
              >
                Focus {action.label.toLowerCase()}
              </button>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-6 grid gap-5">
        {panels.map((panel) => (
          <div id={panel.id} key={panel.id} className={`rounded-[1.75rem] border px-5 py-5 ${toneForPanel(panel.id)}`}>
            <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
              <div className="min-w-0 max-w-3xl">
                <p className="text-[0.68rem] uppercase tracking-[0.2em] text-neutral-400">Core Bitcode section</p>
                <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white">{panel.label}</h3>
                <p className="mt-2 text-sm leading-6 text-neutral-300">
                  {panel.cards[0]?.help || panel.cards[0]?.subtitle || 'This section stays connected to the live Bitcode flow below.'}
                </p>
              </div>

              <div className="flex shrink-0 flex-wrap items-center gap-2 text-[0.66rem] uppercase tracking-[0.18em] text-neutral-300">
                {(() => {
                  const experience = getApplicationExperience(CORE_PANEL_EXPERIENCE[panel.id]);
                  return experience ? (
                    <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1">{experience.label}</span>
                  ) : null;
                })()}
                {(() => {
                  const actionId = CORE_PANEL_ACTION[panel.id];
                  const action = actionId ? getApplicationAction(actionId) : null;
                  return action ? (
                    <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1 text-emerald-100">
                      {action.label}
                    </span>
                  ) : null;
                })()}
                {panel.badge ? (
                  <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1">{panel.badge}</span>
                ) : null}
                <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1">{panel.cards.length} surfaces</span>
                <button
                  type="button"
                  onClick={() => jumpToShellSection(panel.id)}
                  className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-2 text-emerald-100 transition hover:border-emerald-300/50 hover:bg-emerald-400/15"
                >
                  Focus live detail
                </button>
              </div>
            </div>

            <div className="mt-5 grid gap-4 xl:grid-cols-2">
              {(panel.id === 'panelDepositing' && selectedRepository
                ? [
                    {
                      title: selectedRepository.fullName,
                      eyebrow: 'Selected repository supply',
                      subtitle:
                        selectedRepository.description ||
                        'Selected repository supply is the current give-side source before deposit and fit.',
                      help:
                        connectionStatus?.connected && connectionStatus.valid
                          ? `Connected as ${connectionStatus.username || connectionStatus.metadata?.account || 'bitcode'}.`
                          : 'Repository connection posture is not currently validated.',
                      badge: connectionStatus?.metadata?.mock_mode ? 'mock' : 'connected',
                      metrics: [
                        { label: 'Default branch', value: selectedRepository.defaultBranch || 'main' },
                        { label: 'Visibility', value: selectedRepository.private ? 'private' : 'public' },
                      ],
                      rows: [
                        { label: 'Language', value: selectedRepository.language || 'n/a' },
                        {
                          label: 'Owner',
                          value: selectedRepository.owner.username || selectedRepository.owner.id,
                        },
                        {
                          label: 'Topics',
                          value: selectedRepository.topics?.length ? selectedRepository.topics.join(', ') : 'no tagged topics',
                        },
                      ],
                    },
                    ...panel.cards,
                  ]
                : panel.cards
              ).map((card, cardIndex) => (
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

                    {card.help && !card.metrics.length && !card.rows.length ? (
                      <p className="rounded-[1.2rem] border border-white/8 bg-white/5 px-4 py-4 text-sm leading-6 text-neutral-300">
                        {card.help}
                      </p>
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
