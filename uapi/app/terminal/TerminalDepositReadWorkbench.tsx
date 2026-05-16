'use client';

import { useEffect, useMemo, useState } from 'react';

import BitcodeMetricGrid from '@/components/base/bitcode/execution/BitcodeMetricGrid';

import TerminalActionWorkbenchCard from './TerminalActionWorkbenchCard';
import TerminalWorkspaceCard from './TerminalWorkspaceCard';
import {
  buildTerminalFitWorkbenchDraft,
  buildTerminalDepositWorkbenchDraft,
  buildTerminalReadAdmissionDraft,
  buildTerminalReadMeasurementDraft,
  type TerminalActivityRecordDraft,
} from './terminal-activity-history';
import { TERMINAL_WORKSPACE_EXPLAINERS } from './terminal-workspace-explainers';
import type { TerminalRepositoryContextState } from './terminal-repository-context';
import {
  buildLiveTerminalDepositReadWorkbenchSnapshot,
  normalizeTerminalDepositReadWorkbench,
  type TerminalDepositedSourceRevision,
  type TerminalDepositReadWorkbench as TerminalDepositReadWorkbenchState,
} from './terminal-deposit-read-workbench';
import { useTerminalShellBridge } from './terminal-shell-bridge';
import { jumpToShellSection } from './terminal-shell-reading';

function readMetricValue(metrics: Array<{ label: string; value: string }>, label: string) {
  return metrics.find((metric) => metric.label === label)?.value || '0';
}

function readRowValue(rows: Array<{ label: string; value: string }>, label: string) {
  return rows.find((row) => row.label === label)?.value || '—';
}

type ReadFitProgressState = 'draft' | 'measured' | 'admitted' | 'fit-recorded';

interface TerminalDepositReadWorkbenchProps {
  repositoryContext?: TerminalRepositoryContextState | null;
  depositedSourceRevision?: TerminalDepositedSourceRevision | null;
  onRecordActivity?: (draft: TerminalActivityRecordDraft) => Promise<unknown>;
  showDemonstrationWorkbench?: boolean;
}

export default function TerminalDepositReadWorkbench({
  repositoryContext = null,
  depositedSourceRevision = null,
  onRecordActivity,
  showDemonstrationWorkbench = true,
}: TerminalDepositReadWorkbenchProps) {
  const { snapshot } = useTerminalShellBridge();
  const [recordingKey, setRecordingKey] = useState<'deposit' | 'read' | 'read-admission' | 'fit' | null>(null);
  const [recordMessage, setRecordMessage] = useState<string | null>(null);
  const [readFitProgress, setReadFitProgress] = useState<ReadFitProgressState>('draft');
  const workbenchSnapshot = useMemo(() => {
    if (showDemonstrationWorkbench) return snapshot;
    return buildLiveTerminalDepositReadWorkbenchSnapshot(repositoryContext, depositedSourceRevision);
  }, [depositedSourceRevision, repositoryContext, showDemonstrationWorkbench, snapshot]);
  const workbench = useMemo<TerminalDepositReadWorkbenchState | null>(
    () => normalizeTerminalDepositReadWorkbench(workbenchSnapshot, repositoryContext),
    [repositoryContext, workbenchSnapshot],
  );
  const scenarioKey = `${workbench?.scenarioLabel || ''}:${workbench?.sourceRevision?.commit || ''}`;

  useEffect(() => {
    setReadFitProgress('draft');
  }, [scenarioKey]);

  const selectedEntryChips = useMemo(() => {
    if (!workbench?.deposit.selectedEntries.length) return [];
    return workbench.deposit.selectedEntries.slice(0, 6).map((entry) => entry.label);
  }, [workbench]);
  const readAdmissionActionLabel =
    recordingKey === 'read-admission'
      ? 'Admitting Read...'
      : readFitProgress === 'draft'
        ? 'Record Read before admitting'
        : readFitProgress === 'measured'
          ? 'Admit measured Read for fit search'
          : 'Read admitted for fit search';
  const fitResultActionLabel =
    recordingKey === 'fit'
      ? 'Recording fit...'
      : readFitProgress === 'fit-recorded'
        ? 'Fit result recorded'
        : 'Record fit result posture';

  const handleRecord = async (kind: 'deposit' | 'read' | 'fit') => {
    if (!workbench || !onRecordActivity) return;

    setRecordingKey(kind);
    setRecordMessage(null);

    try {
      if (kind === 'deposit') {
        await onRecordActivity(buildTerminalDepositWorkbenchDraft(workbench));
        setRecordMessage('Deposit-side share posture recorded into the Bitcode activity ledger.');
      } else if (kind === 'read') {
        await onRecordActivity(
          buildTerminalReadMeasurementDraft(
            {
              selectedScenarioId: workbench.scenarioLabel,
              parserKind: readRowValue(workbench.read.rows, 'Parser'),
              closureCriteriaCount: Number(readMetricValue(workbench.read.metrics, 'Closure criteria')) || 0,
              targetKindCount: Number(readMetricValue(workbench.read.metrics, 'Target kinds')) || 0,
              scenarios: [
                {
                  id: workbench.scenarioLabel,
                  label: workbench.scenarioLabel,
                  repo: readRowValue(workbench.read.rows, 'Repository'),
                  profile: readRowValue(workbench.read.rows, 'Profile'),
                  selected: true,
                },
              ],
            },
            undefined,
            { sourceRevision: workbench.sourceRevision },
          ),
        );
        setReadFitProgress('measured');
        setRecordMessage(
          'Measured Read recorded. Next admit it for source-bound fit search, or stop if the Read is too broad or unrelated to the deposited source.',
        );
      } else {
        await onRecordActivity(buildTerminalFitWorkbenchDraft(workbench));
        setReadFitProgress('fit-recorded');
        setRecordMessage(
          'Fit posture recorded. This records current fit evidence/readiness; settlement and finality remain blocked unless a worthy fit is evidenced.',
        );
      }
    } catch (error) {
      setRecordMessage(error instanceof Error ? error.message : 'Unable to record Bitcode workbench posture.');
    } finally {
      setRecordingKey(null);
    }
  };

  const handleRecordReadAdmission = async () => {
    if (!workbench || !onRecordActivity) return;

    setRecordingKey('read-admission');
    setRecordMessage(null);

    try {
      await onRecordActivity(buildTerminalReadAdmissionDraft(workbench));
      setReadFitProgress('admitted');
      setRecordMessage(
        'Measured Read admitted for fit search. Next run or record the fit result posture as worthy_fit, no_worthy_fit, or blocked_readiness evidence.',
      );
    } catch (error) {
      setRecordMessage(error instanceof Error ? error.message : 'Unable to admit the measured Read for fit search.');
    } finally {
      setRecordingKey(null);
    }
  };

  if (!workbench) {
    return (
      <TerminalWorkspaceCard
        id="terminalDepositReadWorkbench"
        kicker="Deposit + read chain"
        title="Read supply, read measurement, and fit together"
        summary="Reading the live deposit-side source, read measurement, and asset-pack fit posture."
        explainer={TERMINAL_WORKSPACE_EXPLAINERS.depositReadChain}
      >
        <p className="mt-4 text-sm leading-6 text-neutral-300">Reading the live Bitcode workbench…</p>
      </TerminalWorkspaceCard>
    );
  }

  return (
    <TerminalWorkspaceCard
      id="terminalDepositReadWorkbench"
      kicker="Deposit + read chain"
      title="Read supply, read measurement, and fit together"
      summary="Keep the deposit-side source, active reader demand frame, and asset-pack fit posture readable as one operating chain."
      explainer={TERMINAL_WORKSPACE_EXPLAINERS.depositReadChain}
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
          id="terminalDepositWorkbench"
          badge="deposit"
          title="Repository supply and technical-intelligence posture"
          summary={workbench.deposit.summary}
          metrics={workbench.deposit.metrics}
          rows={workbench.deposit.rows}
          chips={selectedEntryChips.length ? selectedEntryChips : workbench.deposit.artifactKinds}
          actionLabel="Focus deposit draft"
          actionTarget="terminalDepositComposer"
          secondaryActionLabel={recordingKey === 'deposit' ? 'Recording…' : 'Record deposit posture'}
          secondaryActionDisabled={recordingKey !== null}
          onSecondaryAction={() => {
            void handleRecord('deposit');
          }}
        />
        <TerminalActionWorkbenchCard
          id="terminalReadWorkbench"
          badge="read"
          title="Read measurement and scenario posture"
          summary={workbench.read.summary}
          metrics={workbench.read.metrics}
          rows={workbench.read.rows}
          chips={workbench.read.closureCriteria.length ? workbench.read.closureCriteria : workbench.read.targetKinds}
          actionLabel={showDemonstrationWorkbench ? 'Focus read scenarios' : 'Review measured Read'}
          actionTarget={showDemonstrationWorkbench ? 'terminalReadScenarios' : 'terminalReadWorkbench'}
          secondaryActionLabel={recordingKey === 'read' ? 'Recording…' : 'Record read posture'}
          secondaryActionDisabled={recordingKey !== null}
          onSecondaryAction={() => {
            void handleRecord('read');
          }}
        />
      </div>

      <section className="mt-5 rounded-[1.45rem] border border-emerald-400/16 bg-emerald-400/[0.06] px-5 py-5">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
          <div>
            <p className="text-[0.66rem] uppercase tracking-[0.2em] text-emerald-200/80">read state</p>
            <h3 className="mt-2 text-lg font-semibold text-white">Measured Read before fit result</h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-neutral-300">
              Recording a Read stores the measured demand frame. It does not mean Bitcode found a fit. Fit search must then return
              worthy_fit, no_worthy_fit, or blocked_readiness before settlement or finality can proceed.
            </p>
          </div>
          <span className="rounded-full border border-white/10 bg-black/20 px-3 py-2 text-[0.66rem] uppercase tracking-[0.18em] text-neutral-200">
            {readFitProgress.replace('-', ' ')}
          </span>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-4">
          {[
            { id: 'draft', label: '1. Read framed', detail: 'Repository, branch, commit, and demand frame are visible.' },
            { id: 'measured', label: '2. Read measured', detail: 'Read posture is persisted as ledger evidence.' },
            { id: 'admitted', label: '3. Fit admitted', detail: 'Measured Read may enter source-bound fit search.' },
            { id: 'fit-recorded', label: '4. Result recorded', detail: 'Fit result posture is reviewable before proof or settlement.' },
          ].map((step) => {
            const active = step.id === readFitProgress;
            return (
              <div
                key={step.id}
                className={`rounded-[1.1rem] border px-4 py-4 text-sm ${
                  active ? 'border-emerald-300/35 bg-emerald-300/10' : 'border-white/8 bg-black/20'
                }`}
              >
                <p className="font-semibold text-neutral-100">{step.label}</p>
                <p className="mt-2 leading-6 text-neutral-400">{step.detail}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          <button
            type="button"
            disabled={recordingKey !== null || readFitProgress !== 'measured'}
            onClick={() => {
              void handleRecordReadAdmission();
            }}
            className="rounded-[1.25rem] border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm font-medium text-emerald-100 transition hover:border-emerald-300/50 hover:bg-emerald-400/15 disabled:cursor-not-allowed disabled:opacity-55"
          >
            {readAdmissionActionLabel}
          </button>
          <button
            type="button"
            disabled={recordingKey !== null}
            onClick={() => jumpToShellSection('terminalFitWorkbench')}
            className="rounded-[1.25rem] border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-neutral-100 transition hover:border-white/18 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-55"
          >
            Review fit result posture
          </button>
          <button
            type="button"
            disabled={recordingKey !== null || readFitProgress !== 'admitted'}
            onClick={() => {
              void handleRecord('fit');
            }}
            className="rounded-[1.25rem] border border-amber-300/30 bg-amber-300/10 px-4 py-3 text-sm font-medium text-amber-100 transition hover:border-amber-200/50 hover:bg-amber-300/15 disabled:cursor-not-allowed disabled:opacity-55"
          >
            {fitResultActionLabel}
          </button>
        </div>
      </section>

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
            disabled={recordingKey !== null || readFitProgress === 'fit-recorded'}
            onClick={() => {
              void handleRecord('fit');
            }}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[0.66rem] uppercase tracking-[0.18em] text-neutral-100 transition hover:border-white/18 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {fitResultActionLabel}
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
