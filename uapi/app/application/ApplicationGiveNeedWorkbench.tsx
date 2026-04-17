'use client';

import { useEffect, useMemo, useState } from 'react';

import { readBitcodeApplicationShellSnapshot } from '@bitcode/bitcode/src/client-entry.js';

import ApplicationActionWorkbenchCard from './ApplicationActionWorkbenchCard';
import type { ApplicationRepositoryContextState } from './application-repository-context';
import {
  normalizeApplicationGiveNeedWorkbench,
  type ApplicationGiveNeedWorkbench as ApplicationGiveNeedWorkbenchState,
} from './application-give-need-workbench';
import { jumpToShellSection } from './application-shell-reading';

interface ApplicationGiveNeedWorkbenchProps {
  repositoryContext?: ApplicationRepositoryContextState | null;
}

export default function ApplicationGiveNeedWorkbench({
  repositoryContext = null,
}: ApplicationGiveNeedWorkbenchProps) {
  const [workbench, setWorkbench] = useState<ApplicationGiveNeedWorkbenchState | null>(null);

  useEffect(() => {
    let disposed = false;

    const refresh = async () => {
      const snapshot = await readBitcodeApplicationShellSnapshot();
      if (disposed) return;
      setWorkbench(normalizeApplicationGiveNeedWorkbench(snapshot, repositoryContext));
    };

    void refresh();
    const intervalId = window.setInterval(() => {
      void refresh();
    }, 900);

    return () => {
      disposed = true;
      window.clearInterval(intervalId);
    };
  }, [repositoryContext]);

  const selectedEntryChips = useMemo(() => {
    if (!workbench?.give.selectedEntries.length) return [];
    return workbench.give.selectedEntries.slice(0, 6).map((entry) => entry.label);
  }, [workbench]);

  if (!workbench) {
    return (
      <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(8,12,24,0.96),rgba(4,8,18,0.95))] px-6 py-6 shadow-[0_30px_100px_rgba(0,0,0,0.42)]">
        <p className="text-[0.72rem] uppercase tracking-[0.34em] text-neutral-400">Application give / need workbench</p>
        <p className="mt-4 text-sm leading-6 text-neutral-300">Reading the mounted Bitcode shell snapshot…</p>
      </section>
    );
  }

  return (
    <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(8,12,24,0.96),rgba(4,8,18,0.95))] px-6 py-6 shadow-[0_30px_100px_rgba(0,0,0,0.42)]">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
        <div className="max-w-3xl">
          <p className="text-[0.72rem] uppercase tracking-[0.34em] text-neutral-400">Application give / need workbench</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white tablet:text-[2.05rem]">
            Route-owned action detail from the live Bitcode shell
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-neutral-300 tablet:text-base">
            This second-gate layer reads the mounted shell through a semantic snapshot instead of shell markup. Give and
            need now surface as application-owned action detail while the preserved Bitcode shell remains the semantic
            source of truth underneath.
          </p>
        </div>

        <div className="grid gap-3 text-xs uppercase tracking-[0.22em] text-neutral-400 tablet:grid-cols-2">
          <div className="rounded-2xl border border-white/8 bg-black/20 px-4 py-4">
            <p className="text-emerald-300/85">Projection</p>
            <p className="mt-2 text-neutral-200">{workbench.projectionPrincipal}</p>
          </div>
          <div className="rounded-2xl border border-white/8 bg-black/20 px-4 py-4">
            <p className="text-emerald-300/85">Branch mode</p>
            <p className="mt-2 text-neutral-200">{workbench.branchMode}</p>
          </div>
          <div className="rounded-2xl border border-white/8 bg-black/20 px-4 py-4">
            <p className="text-emerald-300/85">Scenario</p>
            <p className="mt-2 text-neutral-200">{workbench.scenarioLabel}</p>
          </div>
          <div className="rounded-2xl border border-white/8 bg-black/20 px-4 py-4">
            <p className="text-emerald-300/85">Profile</p>
            <p className="mt-2 text-neutral-200">{workbench.profileLabel}</p>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-5 xl:grid-cols-2">
        <ApplicationActionWorkbenchCard
          badge="give"
          title="Repository supply and deposit posture"
          summary={workbench.give.summary}
          metrics={workbench.give.metrics}
          rows={workbench.give.rows}
          chips={selectedEntryChips.length ? selectedEntryChips : workbench.give.artifactKinds}
          actionLabel="Focus give"
          actionTarget="panelDepositing"
        />
        <ApplicationActionWorkbenchCard
          badge="need"
          title="Measured demand and scenario posture"
          summary={workbench.need.summary}
          metrics={workbench.need.metrics}
          rows={workbench.need.rows}
          chips={workbench.need.closureCriteria.length ? workbench.need.closureCriteria : workbench.need.targetKinds}
          actionLabel="Focus need"
          actionTarget="panelNeeding"
        />
      </div>

      <article className="mt-5 rounded-[1.6rem] border border-amber-400/18 bg-amber-400/5 px-5 py-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[0.66rem] uppercase tracking-[0.2em] text-amber-200/80">fit</p>
            <h3 className="mt-2 text-xl font-semibold text-white">Depositing-to-needing closure intent</h3>
          </div>
          <button
            type="button"
            onClick={() => jumpToShellSection('panelFit')}
            className="rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-2 text-[0.66rem] uppercase tracking-[0.18em] text-amber-100 transition hover:border-amber-200/50 hover:bg-amber-300/15"
          >
            Focus fit
          </button>
        </div>
        <p className="mt-3 text-sm leading-6 text-neutral-300">{workbench.fit.summary}</p>

        <div className="mt-5 grid gap-3 sm:grid-cols-4">
          {workbench.fit.metrics.map((metric) => (
            <div key={`fit-${metric.label}`} className="rounded-[1.1rem] border border-white/8 bg-black/20 px-4 py-4">
              <p className="text-[0.62rem] uppercase tracking-[0.16em] text-neutral-500">{metric.label}</p>
              <p className="mt-2 text-base font-semibold text-white">{metric.value}</p>
            </div>
          ))}
        </div>

        <dl className="mt-4 grid gap-3 lg:grid-cols-2">
          {workbench.fit.rows.map((row) => (
            <div key={`fit-${row.label}`} className="rounded-[1.15rem] border border-white/8 bg-black/20 px-4 py-4 text-sm">
              <dt className="text-neutral-500">{row.label}</dt>
              <dd className="mt-1 break-words text-neutral-100">{row.value}</dd>
            </div>
          ))}
        </dl>
      </article>
    </section>
  );
}
