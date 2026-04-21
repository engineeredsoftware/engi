'use client';

import { useMemo, useState } from 'react';

import BitcodeInlineExplainer from '@/components/base/bitcode/execution/BitcodeInlineExplainer';
import BitcodeMetricGrid from '@/components/base/bitcode/execution/BitcodeMetricGrid';

import ApplicationWorkspaceCard from './ApplicationWorkspaceCard';
import {
  buildApplicationNeedMeasurementDraft,
  type ApplicationActivityRecordDraft,
} from './application-activity-history';
import {
  APPLICATION_INLINE_EXPLAINERS,
  APPLICATION_WORKSPACE_EXPLAINERS,
} from './application-workspace-explainers';
import {
  normalizeApplicationNeedScenarios,
  type ApplicationNeedScenariosState,
} from './application-need-scenarios';
import { useApplicationShellBridge } from './application-shell-bridge';
import { jumpToShellSection } from './application-shell-reading';

interface ApplicationNeedScenarioPanelProps {
  onRecordActivity?: (draft: ApplicationActivityRecordDraft) => Promise<unknown>;
}

export default function ApplicationNeedScenarioPanel({ onRecordActivity }: ApplicationNeedScenarioPanelProps) {
  const { snapshot, runControl } = useApplicationShellBridge();
  const [actionMessage, setActionMessage] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const needState = useMemo<ApplicationNeedScenariosState | null>(
    () => normalizeApplicationNeedScenarios(snapshot),
    [snapshot],
  );

  const selectScenario = async (scenarioId: string) => {
    await runControl((controls) => controls.setScenario?.(scenarioId));
  };

  const handleRecordActiveNeed = async () => {
    if (!needState || !onRecordActivity) return;

    setIsRecording(true);
    setActionMessage(null);

    try {
      await onRecordActivity(buildApplicationNeedMeasurementDraft(needState));
      setActionMessage('Active need measurement recorded into the Bitcode activity ledger.');
    } catch (error) {
      setActionMessage(error instanceof Error ? error.message : 'Unable to record the active need measurement.');
    } finally {
      setIsRecording(false);
    }
  };

  if (!needState) {
    return (
      <ApplicationWorkspaceCard
        id="applicationNeedScenarios"
        kicker="Need measurement"
        title="Choose the active need measurement"
        summary="Reading the current needer demand frame, parser posture, and target structure."
        explainer={APPLICATION_WORKSPACE_EXPLAINERS.needScenarios}
      >
        <p className="mt-4 text-sm leading-6 text-neutral-300">Loading need scenarios…</p>
      </ApplicationWorkspaceCard>
    );
  }

  return (
    <ApplicationWorkspaceCard
      id="applicationNeedScenarios"
      kicker="Need measurement"
      title="Choose the active need measurement"
      summary="Keep the current needer demand frame explicit before reading asset-pack fit, proof, or settlement posture."
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
      {actionMessage ? (
        <div className="mt-4 rounded-[1.3rem] border border-white/8 bg-white/5 px-4 py-4 text-sm leading-6 text-neutral-200">
          {actionMessage}
        </div>
      ) : null}

      <div className="mt-6 flex flex-wrap gap-3">
        <div className="flex items-center gap-2 rounded-full border border-white/8 bg-white/5 px-3 py-2 text-[0.66rem] uppercase tracking-[0.2em] text-neutral-300">
          <span>Ledger write</span>
          <BitcodeInlineExplainer explainer={APPLICATION_INLINE_EXPLAINERS.activeNeed} />
        </div>
        <button
          type="button"
          disabled={isRecording}
          onClick={() => {
            void handleRecordActiveNeed();
          }}
          className="rounded-[1.4rem] border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-neutral-100 transition hover:border-white/18 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isRecording ? 'Recording need…' : 'Record active need'}
        </button>
        <button
          type="button"
          onClick={() => jumpToShellSection('applicationNeedScenarios')}
          className="rounded-[1.4rem] border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm font-medium text-emerald-100 transition hover:border-emerald-300/50 hover:bg-emerald-400/15"
        >
          Focus need measurement
        </button>
        <button
          type="button"
          onClick={() => jumpToShellSection('applicationGiveNeedWorkbench')}
          className="rounded-[1.4rem] border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-neutral-100 transition hover:border-white/18 hover:bg-white/10"
        >
          Focus asset-pack fit
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
