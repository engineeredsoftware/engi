'use client';

import { useMemo } from 'react';

import { CLOSURE_PANEL_SUBSTRUCTURE, getMasterDetailSubstructure } from './application-experience-architecture';
import { useApplicationShellBridge } from './application-shell-bridge';
import { jumpToShellSection, toneForPanel } from './application-shell-reading';
import {
  normalizeApplicationClosureState,
  type ApplicationClosurePanel,
  type ApplicationClosureState,
} from './application-closure-state';

const PANEL_IDS: Record<ApplicationClosurePanel['id'], string> = {
  verification: 'panelEvaluations',
  branch: 'panelBranchArtifacts',
  settlement: 'panelSettlement',
  ledger: 'panelLedger',
};

function panelRows(panel: ApplicationClosurePanel) {
  const extras: { label: string; value: string }[] = [];

  if (panel.candidates?.length) {
    panel.candidates.forEach((candidate) => {
      extras.push({
        label: candidate.title,
        value: [candidate.artifactKind, `score ${candidate.score}`, candidate.rights].filter(Boolean).join(' · '),
      });
    });
  }

  if (panel.proofFamilies?.length) {
    panel.proofFamilies.forEach((family) => {
      extras.push({
        label: family.label,
        value: `${family.theoremStatus} · replay ${family.replayArtifacts} · ${family.artifactPath}`,
      });
    });
  }

  if (panel.recentRuns?.length) {
    panel.recentRuns.forEach((run) => {
      extras.push({
        label: run.label,
        value: run.summary,
      });
    });
  }

  return [...panel.rows, ...extras].slice(0, 8);
}

function renderClosurePanelCard(panel: ApplicationClosurePanel) {
  const shellPanelId = PANEL_IDS[panel.id];
  const substructureId = CLOSURE_PANEL_SUBSTRUCTURE[shellPanelId];
  const substructure = substructureId ? getMasterDetailSubstructure(substructureId) : null;
  const rows = panelRows(panel);

  return (
    <article key={panel.id} className={`rounded-[1.75rem] border px-5 py-5 ${toneForPanel(shellPanelId)}`}>
      <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div className="min-w-0 max-w-3xl">
          <p className="text-[0.68rem] uppercase tracking-[0.2em] text-neutral-400">Closure Bitcode section</p>
          <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white">{panel.label}</h3>
          <p className="mt-2 text-sm leading-6 text-neutral-300">{panel.summary}</p>
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-2 text-[0.66rem] uppercase tracking-[0.18em] text-neutral-300">
          {substructure ? (
            <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1 text-emerald-100">
              {substructure.label}
            </span>
          ) : null}
          <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1">{panel.id}</span>
          <button
            type="button"
            onClick={() => jumpToShellSection(shellPanelId)}
            className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-2 text-emerald-100 transition hover:border-emerald-300/50 hover:bg-emerald-400/15"
          >
            Open live section
          </button>
        </div>
      </div>

      <div className="mt-5 grid gap-4 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            {panel.metrics.map((metric) => (
              <div
                key={`${panel.id}-${metric.label}`}
                className="rounded-[1.15rem] border border-white/8 bg-black/20 px-4 py-4"
              >
                <p className="text-[0.64rem] uppercase tracking-[0.16em] text-neutral-500">{metric.label}</p>
                <p className="mt-2 text-base font-semibold text-white">{metric.value}</p>
              </div>
            ))}
          </div>

          {panel.chips.length ? (
            <div className="rounded-[1.15rem] border border-white/8 bg-black/20 px-4 py-4">
              <p className="text-[0.64rem] uppercase tracking-[0.16em] text-neutral-500">Surfaced reads</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {panel.chips.map((chip) => (
                  <span
                    key={`${panel.id}-${chip}`}
                    className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[0.66rem] uppercase tracking-[0.18em] text-neutral-200"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>
          ) : null}
        </div>

        <dl className="space-y-3 rounded-[1.2rem] border border-white/8 bg-black/20 px-4 py-4 text-sm">
          {rows.map((row) => (
            <div key={`${panel.id}-${row.label}-${row.value}`}>
              <dt className="text-neutral-500">{row.label}</dt>
              <dd className="mt-1 break-words text-neutral-100">{row.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </article>
  );
}

export default function ApplicationClosureNativeSections() {
  const { snapshot } = useApplicationShellBridge();
  const closureState = useMemo<ApplicationClosureState | null>(
    () => normalizeApplicationClosureState(snapshot),
    [snapshot],
  );

  const panels = useMemo(() => {
    if (!closureState) return [];
    return [closureState.verification, closureState.branch, closureState.settlement, closureState.ledger];
  }, [closureState]);

  if (!closureState) {
    return (
      <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(8,12,24,0.96),rgba(4,8,18,0.95))] px-6 py-6 shadow-[0_30px_100px_rgba(0,0,0,0.42)]">
        <p className="text-[0.72rem] uppercase tracking-[0.34em] text-neutral-400">Application closure composition</p>
        <p className="mt-4 text-sm leading-6 text-neutral-300">Reading the live Bitcode closure snapshot…</p>
      </section>
    );
  }

  return (
    <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(8,12,24,0.96),rgba(4,8,18,0.95))] px-6 py-6 shadow-[0_30px_100px_rgba(0,0,0,0.42)]">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
        <div className="max-w-3xl">
          <p className="text-[0.72rem] uppercase tracking-[0.34em] text-neutral-400">Application closure composition</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white tablet:text-[2.05rem]">
            Native verification, branch, settlement, and ledger semantics
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-neutral-300 tablet:text-base">
            Read verification, branch artifacts, settlement proof, and ledger history as one continuous closure surface.
            The source path stays exact without forcing you back into fragmented lower-level panels.
          </p>
        </div>

        <div className="grid gap-3 text-xs uppercase tracking-[0.2em] text-neutral-400 tablet:grid-cols-2">
          <div className="rounded-2xl border border-white/8 bg-black/20 px-4 py-4">
            <p className="text-emerald-300/85">Closure mode</p>
            <p className="mt-2 text-neutral-200">workspace reading</p>
          </div>
          <div className="rounded-2xl border border-white/8 bg-black/20 px-4 py-4">
            <p className="text-emerald-300/85">Semantic source</p>
            <p className="mt-2 text-neutral-200">{closureState.canonLabel}</p>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-5">
        {panels.map((panel) => renderClosurePanelCard(panel))}
      </div>
    </section>
  );
}
