'use client';

import { useMemo } from 'react';

import BitcodeMetricGrid from '@/components/base/bitcode/execution/BitcodeMetricGrid';

import ApplicationActionWorkbenchCard from './ApplicationActionWorkbenchCard';
import ApplicationWorkspaceCard from './ApplicationWorkspaceCard';
import { APPLICATION_WORKSPACE_EXPLAINERS } from './application-workspace-explainers';
import type { ApplicationRepositoryContextState } from './application-repository-context';
import {
  normalizeApplicationGiveNeedWorkbench,
  type ApplicationGiveNeedWorkbench as ApplicationGiveNeedWorkbenchState,
} from './application-give-need-workbench';
import { useApplicationShellBridge } from './application-shell-bridge';
import { jumpToShellSection } from './application-shell-reading';

interface ApplicationGiveNeedWorkbenchProps {
  repositoryContext?: ApplicationRepositoryContextState | null;
}

export default function ApplicationGiveNeedWorkbench({
  repositoryContext = null,
}: ApplicationGiveNeedWorkbenchProps) {
  const { snapshot } = useApplicationShellBridge();
  const workbench = useMemo<ApplicationGiveNeedWorkbenchState | null>(
    () => normalizeApplicationGiveNeedWorkbench(snapshot, repositoryContext),
    [repositoryContext, snapshot],
  );

  const selectedEntryChips = useMemo(() => {
    if (!workbench?.give.selectedEntries.length) return [];
    return workbench.give.selectedEntries.slice(0, 6).map((entry) => entry.label);
  }, [workbench]);

  if (!workbench) {
    return (
      <ApplicationWorkspaceCard
        id="applicationGiveNeedWorkbench"
        kicker="Give + need chain"
        title="Read supply, demand, and fit together"
        summary="Reading the live give-side source, demand frame, and fit posture."
        explainer={APPLICATION_WORKSPACE_EXPLAINERS.giveNeedChain}
      >
        <p className="mt-4 text-sm leading-6 text-neutral-300">Reading the live Bitcode workbench…</p>
      </ApplicationWorkspaceCard>
    );
  }

  return (
    <ApplicationWorkspaceCard
      id="applicationGiveNeedWorkbench"
      kicker="Give + need chain"
      title="Read supply, demand, and fit together"
      summary="Keep the give-side source, active demand frame, and fit posture readable as one operating chain."
      explainer={APPLICATION_WORKSPACE_EXPLAINERS.giveNeedChain}
      headerAside={
        <BitcodeMetricGrid
          metrics={[
            { label: 'Projection', value: workbench.projectionPrincipal },
            { label: 'Branch mode', value: workbench.branchMode },
            { label: 'Scenario', value: workbench.scenarioLabel },
            { label: 'Profile', value: workbench.profileLabel },
          ]}
          columnsClassName="tablet:grid-cols-2"
          itemClassName="rounded-2xl border border-white/8 bg-black/20 px-4 py-4"
          labelClassName="text-[0.62rem] uppercase tracking-[0.16em] text-emerald-300/85"
          valueClassName="text-sm font-semibold text-neutral-200"
        />
      }
    >

      <div className="mt-6 grid gap-5 xl:grid-cols-2">
        <ApplicationActionWorkbenchCard
          id="applicationGiveWorkbench"
          badge="give"
          title="Repository supply and deposit posture"
          summary={workbench.give.summary}
          metrics={workbench.give.metrics}
          rows={workbench.give.rows}
          chips={selectedEntryChips.length ? selectedEntryChips : workbench.give.artifactKinds}
          actionLabel="Focus give draft"
          actionTarget="applicationDepositComposer"
        />
        <ApplicationActionWorkbenchCard
          id="applicationNeedWorkbench"
          badge="need"
          title="Measured demand and scenario posture"
          summary={workbench.need.summary}
          metrics={workbench.need.metrics}
          rows={workbench.need.rows}
          chips={workbench.need.closureCriteria.length ? workbench.need.closureCriteria : workbench.need.targetKinds}
          actionLabel="Focus need scenarios"
          actionTarget="applicationNeedScenarios"
        />
      </div>

      <article
        id="applicationFitWorkbench"
        className="mt-5 rounded-[1.6rem] border border-amber-400/18 bg-amber-400/5 px-5 py-5"
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[0.66rem] uppercase tracking-[0.2em] text-amber-200/80">fit</p>
            <h3 className="mt-2 text-xl font-semibold text-white">Depositing-to-needing closure intent</h3>
          </div>
          <button
            type="button"
            onClick={() => jumpToShellSection('applicationFitWorkbench')}
            className="rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-2 text-[0.66rem] uppercase tracking-[0.18em] text-amber-100 transition hover:border-amber-200/50 hover:bg-amber-300/15"
          >
            Focus fit read
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
    </ApplicationWorkspaceCard>
  );
}
