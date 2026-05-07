'use client';

import { useMemo, useState } from 'react';

import BitcodeMetricGrid from '@/components/base/bitcode/execution/BitcodeMetricGrid';

import TerminalActionWorkbenchCard from './TerminalActionWorkbenchCard';
import TerminalWorkspaceCard from './TerminalWorkspaceCard';
import {
  buildTerminalFitWorkbenchDraft,
  buildTerminalGiveWorkbenchDraft,
  buildTerminalNeedMeasurementDraft,
  type TerminalActivityRecordDraft,
} from './terminal-activity-history';
import { TERMINAL_WORKSPACE_EXPLAINERS } from './terminal-workspace-explainers';
import type { TerminalRepositoryContextState } from './terminal-repository-context';
import {
  normalizeTerminalGiveNeedWorkbench,
  type TerminalGiveNeedWorkbench as TerminalGiveNeedWorkbenchState,
} from './terminal-give-need-workbench';
import { useTerminalShellBridge } from './terminal-shell-bridge';
import { jumpToShellSection } from './terminal-shell-reading';

function readMetricValue(metrics: Array<{ label: string; value: string }>, label: string) {
  return metrics.find((metric) => metric.label === label)?.value || '0';
}

function readRowValue(rows: Array<{ label: string; value: string }>, label: string) {
  return rows.find((row) => row.label === label)?.value || '—';
}

interface TerminalGiveNeedWorkbenchProps {
  repositoryContext?: TerminalRepositoryContextState | null;
  onRecordActivity?: (draft: TerminalActivityRecordDraft) => Promise<unknown>;
}

export default function TerminalGiveNeedWorkbench({
  repositoryContext = null,
  onRecordActivity,
}: TerminalGiveNeedWorkbenchProps) {
  const { snapshot } = useTerminalShellBridge();
  const [recordingKey, setRecordingKey] = useState<'give' | 'need' | 'fit' | null>(null);
  const [recordMessage, setRecordMessage] = useState<string | null>(null);
  const workbench = useMemo<TerminalGiveNeedWorkbenchState | null>(
    () => normalizeTerminalGiveNeedWorkbench(snapshot, repositoryContext),
    [repositoryContext, snapshot],
  );

  const selectedEntryChips = useMemo(() => {
    if (!workbench?.give.selectedEntries.length) return [];
    return workbench.give.selectedEntries.slice(0, 6).map((entry) => entry.label);
  }, [workbench]);

  const handleRecord = async (kind: 'give' | 'need' | 'fit') => {
    if (!workbench || !onRecordActivity) return;

    setRecordingKey(kind);
    setRecordMessage(null);

    try {
      if (kind === 'give') {
        await onRecordActivity(buildTerminalGiveWorkbenchDraft(workbench));
        setRecordMessage('Give-side share posture recorded into the Bitcode activity ledger.');
      } else if (kind === 'need') {
        await onRecordActivity(
          buildTerminalNeedMeasurementDraft({
            selectedScenarioId: workbench.scenarioLabel,
            parserKind: readRowValue(workbench.need.rows, 'Parser'),
            closureCriteriaCount: Number(readMetricValue(workbench.need.metrics, 'Closure criteria')) || 0,
            targetKindCount: Number(readMetricValue(workbench.need.metrics, 'Target kinds')) || 0,
            scenarios: [
              {
                id: workbench.scenarioLabel,
                label: workbench.scenarioLabel,
                repo: readRowValue(workbench.need.rows, 'Repository'),
                profile: readRowValue(workbench.need.rows, 'Profile'),
                selected: true,
              },
            ],
          }),
        );
        setRecordMessage('Need-measurement posture recorded into the Bitcode activity ledger.');
      } else {
        await onRecordActivity(buildTerminalFitWorkbenchDraft(workbench));
        setRecordMessage('Asset-pack fit and settlement posture recorded into the Bitcode activity ledger.');
      }
    } catch (error) {
      setRecordMessage(error instanceof Error ? error.message : 'Unable to record Bitcode workbench posture.');
    } finally {
      setRecordingKey(null);
    }
  };

  if (!workbench) {
    return (
      <TerminalWorkspaceCard
        id="terminalGiveNeedWorkbench"
        kicker="Give + need chain"
        title="Read supply, need measurement, and fit together"
        summary="Reading the live giver-side source, need measurement, and asset-pack fit posture."
        explainer={TERMINAL_WORKSPACE_EXPLAINERS.giveNeedChain}
      >
        <p className="mt-4 text-sm leading-6 text-neutral-300">Reading the live Bitcode workbench…</p>
      </TerminalWorkspaceCard>
    );
  }

  return (
    <TerminalWorkspaceCard
      id="terminalGiveNeedWorkbench"
      kicker="Give + need chain"
      title="Read supply, need measurement, and fit together"
      summary="Keep the giver-side source, active needer demand frame, and asset-pack fit posture readable as one operating chain."
      explainer={TERMINAL_WORKSPACE_EXPLAINERS.giveNeedChain}
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
      {recordMessage ? (
        <div className="mt-4 rounded-[1.3rem] border border-white/8 bg-white/5 px-4 py-4 text-sm leading-6 text-neutral-200">
          {recordMessage}
        </div>
      ) : null}

      <div className="mt-6 grid gap-5 xl:grid-cols-2">
        <TerminalActionWorkbenchCard
          id="terminalGiveWorkbench"
          badge="give"
          title="Repository supply and technical-intelligence posture"
          summary={workbench.give.summary}
          metrics={workbench.give.metrics}
          rows={workbench.give.rows}
          chips={selectedEntryChips.length ? selectedEntryChips : workbench.give.artifactKinds}
          actionLabel="Focus give draft"
          actionTarget="terminalDepositComposer"
          secondaryActionLabel={recordingKey === 'give' ? 'Recording…' : 'Record give posture'}
          secondaryActionDisabled={recordingKey !== null}
          onSecondaryAction={() => {
            void handleRecord('give');
          }}
        />
        <TerminalActionWorkbenchCard
          id="terminalNeedWorkbench"
          badge="need"
          title="Need measurement and scenario posture"
          summary={workbench.need.summary}
          metrics={workbench.need.metrics}
          rows={workbench.need.rows}
          chips={workbench.need.closureCriteria.length ? workbench.need.closureCriteria : workbench.need.targetKinds}
          actionLabel="Focus need scenarios"
          actionTarget="terminalNeedScenarios"
          secondaryActionLabel={recordingKey === 'need' ? 'Recording…' : 'Record need posture'}
          secondaryActionDisabled={recordingKey !== null}
          onSecondaryAction={() => {
            void handleRecord('need');
          }}
        />
      </div>

      <article
        id="terminalFitWorkbench"
        className="mt-5 rounded-[1.6rem] border border-amber-400/18 bg-amber-400/5 px-5 py-5"
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[0.66rem] uppercase tracking-[0.2em] text-amber-200/80">fit</p>
            <h3 className="mt-2 text-xl font-semibold text-white">Asset-pack fit and settlement intent</h3>
          </div>
          <button
            type="button"
            onClick={() => jumpToShellSection('terminalFitWorkbench')}
            className="rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-2 text-[0.66rem] uppercase tracking-[0.18em] text-amber-100 transition hover:border-amber-200/50 hover:bg-amber-300/15"
          >
            Focus asset-pack fit
          </button>
          <button
            type="button"
            disabled={recordingKey !== null}
            onClick={() => {
              void handleRecord('fit');
            }}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[0.66rem] uppercase tracking-[0.18em] text-neutral-100 transition hover:border-white/18 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {recordingKey === 'fit' ? 'Recording…' : 'Record fit posture'}
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
    </TerminalWorkspaceCard>
  );
}
