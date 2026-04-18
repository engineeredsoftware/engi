'use client';

import { useMemo } from 'react';

import BitcodeMetricGrid from '@/components/base/engi/execution/BitcodeMetricGrid';

import ApplicationWorkspaceCard from './ApplicationWorkspaceCard';
import { APPLICATION_WORKSPACE_EXPLAINERS } from './application-workspace-explainers';
import {
  normalizeApplicationNeedScenarios,
  type ApplicationNeedScenariosState,
} from './application-need-scenarios';
import { useApplicationShellBridge } from './application-shell-bridge';
import { jumpToShellSection } from './application-shell-reading';

export default function ApplicationNeedScenarioPanel() {
  const { snapshot, runControl } = useApplicationShellBridge();
  const needState = useMemo<ApplicationNeedScenariosState | null>(
    () => normalizeApplicationNeedScenarios(snapshot),
    [snapshot],
  );

  const selectScenario = async (scenarioId: string) => {
    await runControl((controls) => controls.setScenario?.(scenarioId));
  };

  if (!needState) {
    return (
      <ApplicationWorkspaceCard
        id="applicationNeedScenarios"
        kicker="Need scenarios"
        title="Choose the active demand frame"
        summary="Reading the current demand frame, parser posture, and target structure."
        explainer={APPLICATION_WORKSPACE_EXPLAINERS.needScenarios}
      >
        <p className="mt-4 text-sm leading-6 text-neutral-300">Loading need scenarios…</p>
      </ApplicationWorkspaceCard>
    );
  }

  return (
    <ApplicationWorkspaceCard
      id="applicationNeedScenarios"
      kicker="Need scenarios"
      title="Choose the active demand frame"
      summary="Keep the current need scenario explicit before reading fit, proof, or closure posture."
      explainer={APPLICATION_WORKSPACE_EXPLAINERS.needScenarios}
      headerAside={
        <BitcodeMetricGrid
          metrics={[
            { label: 'Active parser', value: needState.parserKind },
            { label: 'Closure criteria', value: String(needState.closureCriteriaCount) },
            { label: 'Target kinds', value: String(needState.targetKindCount) },
          ]}
          columnsClassName="tablet:grid-cols-3"
          itemClassName="rounded-2xl border border-white/8 bg-black/20 px-4 py-4"
          labelClassName="text-[0.62rem] uppercase tracking-[0.16em] text-emerald-300/85"
          valueClassName="text-sm font-semibold text-neutral-200"
        />
      }
    >

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => jumpToShellSection('applicationNeedScenarios')}
          className="rounded-[1.4rem] border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm font-medium text-emerald-100 transition hover:border-emerald-300/50 hover:bg-emerald-400/15"
        >
          Focus need scenarios
        </button>
        <button
          type="button"
          onClick={() => jumpToShellSection('applicationGiveNeedWorkbench')}
          className="rounded-[1.4rem] border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-neutral-100 transition hover:border-white/18 hover:bg-white/10"
        >
          Focus fit read
        </button>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {needState.scenarios.map((scenario) => (
          <button
            key={scenario.id}
            type="button"
            onClick={() => {
              void selectScenario(scenario.id);
            }}
            className={`rounded-[1.35rem] border px-4 py-4 text-left transition ${
              scenario.selected
                ? 'border-emerald-400/35 bg-emerald-400/10'
                : 'border-white/8 bg-black/20 hover:border-white/16 hover:bg-white/5'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-white">{scenario.label}</p>
                <p className="mt-1 text-[0.68rem] uppercase tracking-[0.2em] text-neutral-500">{scenario.profile}</p>
              </div>
              <span
                className={`rounded-full border px-2.5 py-1 text-[0.62rem] uppercase tracking-[0.18em] ${
                  scenario.selected
                    ? 'border-emerald-300/35 bg-emerald-300/15 text-emerald-100'
                    : 'border-white/10 bg-white/5 text-neutral-200'
                }`}
              >
                {scenario.selected ? 'active need' : 'available'}
              </span>
            </div>
            <p className="mt-3 text-sm leading-6 text-neutral-300">{scenario.repo}</p>
          </button>
        ))}
      </div>
    </ApplicationWorkspaceCard>
  );
}
