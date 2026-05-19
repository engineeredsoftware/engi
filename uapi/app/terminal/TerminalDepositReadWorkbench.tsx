'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

import BitcodeMetricGrid from '@/components/base/bitcode/execution/BitcodeMetricGrid';
import BitcodeExecutionStreamPanel from '@/components/base/bitcode/execution/BitcodeExecutionStreamPanel';

import TerminalActionWorkbenchCard from './TerminalActionWorkbenchCard';
import TerminalWorkspaceCard from './TerminalWorkspaceCard';
import {
  buildTerminalFitWorkbenchDraft,
  buildTerminalDepositWorkbenchDraft,
  buildTerminalReadAdmissionDraft,
  buildTerminalReadMeasurementDraft,
  readTerminalRouteError,
  type TerminalActivityRecordDraft,
} from './terminal-activity-history';
import { TERMINAL_WORKSPACE_EXPLAINERS } from './terminal-workspace-explainers';
import type { TerminalRepositoryContextState } from './terminal-repository-context';
import {
  buildLiveTerminalDepositReadWorkbenchSnapshot,
  normalizeTerminalDepositReadWorkbench,
  TERMINAL_ENTERPRISE_READING_STEPS,
  type TerminalDepositedSourceRevision,
  type TerminalDepositReadWorkbench as TerminalDepositReadWorkbenchState,
  type TerminalEnterpriseReadingStepId,
} from './terminal-deposit-read-workbench';
import {
  buildTerminalFitPipelineHarnessStreamSnapshot,
  buildTerminalFitPipelineHarnessRequest,
  streamTerminalFitPipelineHarness,
  summarizeTerminalFitPipelineHarnessEvent,
  type TerminalFitPipelineHarnessEvent,
} from './terminal-pipeline-harness-client';
import { useTerminalShellBridge } from './terminal-shell-bridge';
import { jumpToShellSection } from './terminal-shell-reading';

function readMetricValue(metrics: Array<{ label: string; value: string }>, label: string) {
  return metrics.find((metric) => metric.label === label)?.value || '0';
}

function readRowValue(rows: Array<{ label: string; value: string }>, label: string) {
  return rows.find((row) => row.label === label)?.value || '—';
}

function objectValue(value: unknown): Record<string, unknown> | null {
  return value && typeof value === 'object' && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function textValue(value: unknown): string | null {
  return typeof value === 'string' && value.trim() ? value.trim() : null;
}

function shortIdentifier(value: unknown): string | null {
  const text = textValue(value);
  if (!text) return null;
  return text.length > 18 ? `${text.slice(0, 12)}...` : text;
}

function stringList(value: unknown): string[] {
  return Array.isArray(value)
    ? value.map((entry) => String(entry || '').trim()).filter(Boolean)
    : [];
}

function numericValue(value: unknown): number | null {
  return typeof value === 'number' && Number.isFinite(value) ? value : null;
}

function terminalReadNeed(value: unknown): TerminalReadNeedState | null {
  const record = objectValue(value);
  return record?.schema === 'bitcode.read.need' ? record as TerminalReadNeedState : null;
}

type ReadFitProgressState = 'draft' | 'measured' | 'admitted' | 'fit-recorded';
type ReadingStageId = TerminalEnterpriseReadingStepId;

type TerminalReadNeedState = Record<string, unknown> & {
  schema?: 'bitcode.read.need';
  needId?: string;
  reviewState?: string;
  measurementRoot?: string;
  requirements?: string[];
  closureCriteria?: string[];
  failureModes?: string[];
  targetArtifactKinds?: string[];
  proofExpectations?: string[];
  feedbackHistory?: string[];
  pricingMeasurementInputs?: {
    weightedRequestedVolume?: number;
    measurementVector?: Array<{ dimension?: string; weight?: number; volume?: number }>;
  };
};

interface TerminalDepositReadWorkbenchProps {
  repositoryContext?: TerminalRepositoryContextState | null;
  depositedSourceRevision?: TerminalDepositedSourceRevision | null;
  admittedReadActivityId?: string | null;
  onRecordActivity?: (draft: TerminalActivityRecordDraft) => Promise<unknown>;
  onHarnessCompleted?: () => Promise<unknown> | unknown;
  showDemonstrationWorkbench?: boolean;
}

export default function TerminalDepositReadWorkbench({
  repositoryContext = null,
  depositedSourceRevision = null,
  admittedReadActivityId = null,
  onRecordActivity,
  onHarnessCompleted,
  showDemonstrationWorkbench = true,
}: TerminalDepositReadWorkbenchProps) {
  const { snapshot } = useTerminalShellBridge();
  const [recordingKey, setRecordingKey] = useState<'deposit' | 'read' | 'read-admission' | 'fit' | null>(null);
  const [recordMessage, setRecordMessage] = useState<string | null>(null);
  const [readFitProgress, setReadFitProgress] = useState<ReadFitProgressState>('draft');
  const [recordedAdmittedReadActivityId, setRecordedAdmittedReadActivityId] = useState<string | null>(null);
  const [harnessState, setHarnessState] = useState<'idle' | 'running' | 'completed' | 'failed'>('idle');
  const [harnessMessage, setHarnessMessage] = useState<string | null>(null);
  const [harnessEvents, setHarnessEvents] = useState<TerminalFitPipelineHarnessEvent[]>([]);
  const [harnessUserHasScrolled, setHarnessUserHasScrolled] = useState(false);
  const [readNeed, setReadNeed] = useState<TerminalReadNeedState | null>(null);
  const [acceptedReadNeed, setAcceptedReadNeed] = useState<TerminalReadNeedState | null>(null);
  const [readNeedFeedback, setReadNeedFeedback] = useState('');
  const [readNeedMessage, setReadNeedMessage] = useState<string | null>(null);
  const [readNeedAction, setReadNeedAction] = useState<'synthesize' | 'accept' | 'resynthesize' | null>(null);
  const [readNeedSynthesisCount, setReadNeedSynthesisCount] = useState(0);
  const workbenchSnapshot = useMemo(() => {
    const liveWorkbenchSnapshot = buildLiveTerminalDepositReadWorkbenchSnapshot(repositoryContext, depositedSourceRevision);
    if (showDemonstrationWorkbench) return snapshot || liveWorkbenchSnapshot;
    return liveWorkbenchSnapshot;
  }, [depositedSourceRevision, repositoryContext, showDemonstrationWorkbench, snapshot]);
  const workbench = useMemo<TerminalDepositReadWorkbenchState | null>(
    () => normalizeTerminalDepositReadWorkbench(workbenchSnapshot, repositoryContext),
    [repositoryContext, workbenchSnapshot],
  );
  const scenarioKey = `${workbench?.scenarioLabel || ''}:${workbench?.sourceRevision?.commit || ''}`;

  useEffect(() => {
    setReadFitProgress('draft');
    setRecordedAdmittedReadActivityId(null);
    setHarnessState('idle');
    setHarnessMessage(null);
    setHarnessEvents([]);
    setReadNeed(null);
    setAcceptedReadNeed(null);
    setReadNeedFeedback('');
    setReadNeedMessage(null);
    setReadNeedAction(null);
    setReadNeedSynthesisCount(0);
  }, [scenarioKey]);

  useEffect(() => {
    if (!admittedReadActivityId) return;
    setReadFitProgress((currentProgress) => (currentProgress === 'draft' ? 'admitted' : currentProgress));
  }, [admittedReadActivityId]);

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
          ? 'Admit measured Read for Finding Fits'
          : 'Read admitted for Finding Fits';
  const fitResultActionLabel =
    recordingKey === 'fit'
      ? 'Recording fit...'
      : readFitProgress === 'fit-recorded'
        ? 'Fit result recorded'
        : 'Record fit result posture';
  const liveFitActionLabel =
    harnessState === 'running'
      ? 'Running Finding Fits...'
      : harnessState === 'completed'
        ? 'Request Fit again'
        : 'Request Fit';
  const harnessReadActivityId = recordedAdmittedReadActivityId || admittedReadActivityId;
  const harnessRequestState = useMemo(
    () =>
      buildTerminalFitPipelineHarnessRequest({
        workbench,
        repositoryContext,
        depositedSourceRevision,
        readActivityId: harnessReadActivityId,
        acceptedReadNeed,
      }),
    [acceptedReadNeed, depositedSourceRevision, harnessReadActivityId, repositoryContext, workbench],
  );
  const harnessIdentifierRows = useMemo(() => {
    const rows: Array<{ label: string; value: string }> = [];
    if (harnessRequestState.ready) {
      rows.push(
        { label: 'read', value: shortIdentifier(harnessRequestState.request.readId) || 'pending' },
        { label: 'need', value: shortIdentifier(terminalReadNeed(harnessRequestState.request.acceptedReadNeed)?.needId) || 'pending' },
        { label: 'deposit', value: shortIdentifier(harnessRequestState.request.depositId) || 'pending' },
        { label: 'commit', value: shortIdentifier(harnessRequestState.request.sourceCommit) || 'pending' },
      );
    } else if (acceptedReadNeed?.needId) {
      rows.push({ label: 'need', value: shortIdentifier(acceptedReadNeed.needId) || acceptedReadNeed.needId });
    }

    let sandboxId: string | null = null;
    let runId: string | null = null;
    let pipelineRunId: string | null = null;
    let lastTelemetryLine: string | null = null;
    let inferenceProfile: string | null = null;
    let inferenceGate: string | null = null;
    let runtimeBudget: string | null = null;
    let supabaseHost: string | null = null;

    for (const event of harnessEvents) {
      const data = objectValue(event.data);
      if (!data) continue;
      runId = textValue(data.runId) || runId;
      sandboxId = textValue(data.sandboxId) || sandboxId;
      inferenceProfile = textValue(data.realInferenceProfile) || inferenceProfile;
      inferenceGate =
        typeof data.realInferenceRequired === 'boolean'
          ? data.realInferenceRequired
            ? 'required'
            : 'local optional'
          : inferenceGate;
      runtimeBudget =
        typeof data.runtimeBudgetMs === 'number' && Number.isFinite(data.runtimeBudgetMs)
          ? `${data.runtimeBudgetMs}ms`
          : runtimeBudget;
      supabaseHost = textValue(data.supabaseHost) || supabaseHost;
      if (event.event === 'harness-event') {
        sandboxId = textValue(data.sandboxId) || sandboxId;
        const telemetryEvent = objectValue(data.telemetryEvent);
        runId = textValue(telemetryEvent?.runId) || runId;
        pipelineRunId = textValue(telemetryEvent?.pipelineRunId) || pipelineRunId;
        lastTelemetryLine = data.type === 'telemetry-artifact-event'
          ? String(data.lineNumber || '')
          : lastTelemetryLine;
      }
    }

    if (sandboxId) rows.push({ label: 'sandbox', value: shortIdentifier(sandboxId) || sandboxId });
    if (runId) rows.push({ label: 'run', value: shortIdentifier(runId) || runId });
    if (pipelineRunId) rows.push({ label: 'pipeline row', value: shortIdentifier(pipelineRunId) || pipelineRunId });
    if (inferenceGate) rows.push({ label: 'inference gate', value: inferenceGate });
    if (inferenceProfile) rows.push({ label: 'profile', value: inferenceProfile });
    if (runtimeBudget) rows.push({ label: 'budget', value: runtimeBudget });
    if (supabaseHost) rows.push({ label: 'database', value: supabaseHost });
    if (lastTelemetryLine) rows.push({ label: 'telemetry line', value: lastTelemetryLine });
    return rows;
  }, [acceptedReadNeed, harnessEvents, harnessRequestState]);
  const harnessStreamSnapshot = useMemo(
    () => buildTerminalFitPipelineHarnessStreamSnapshot(harnessEvents, harnessState, harnessState === 'failed' ? harnessMessage : null),
    [harnessEvents, harnessMessage, harnessState],
  );
  useEffect(() => {
    const runId = harnessStreamSnapshot.runId;
    if (!runId || harnessState === 'idle' || typeof window === 'undefined') return;

    const nextUrl = new URL(window.location.href);
    if (nextUrl.searchParams.get('runId') === runId) return;
    nextUrl.searchParams.set('runId', runId);
    window.history.replaceState(window.history.state, '', `${nextUrl.pathname}${nextUrl.search}${nextUrl.hash}`);
  }, [harnessState, harnessStreamSnapshot.runId]);
  const completedHarnessEvidence = useMemo(() => {
    for (let index = harnessEvents.length - 1; index >= 0; index -= 1) {
      const event = harnessEvents[index];
      if (event.event !== 'harness-completed') continue;
      const data = objectValue(event.data);
      const evidence = objectValue(data?.evidence);
      if (evidence) return evidence;
    }
    return null;
  }, [harnessEvents]);
  const sourceSafePreview = objectValue(completedHarnessEvidence?.sourceSafePreview);
  const ledgerSettlement = objectValue(completedHarnessEvidence?.ledgerSettlement);
  const previewFeeQuote = objectValue(sourceSafePreview?.feeQuote);
  const settledReadback = ledgerSettlement?.status === 'settled';
  const pullRequestDelivered = settledReadback && Boolean(textValue(objectValue(sourceSafePreview?.delivery)?.pullRequestTarget));
  const activeReadingStage: ReadingStageId = pullRequestDelivered
    ? 'buy-asset-pack-settle'
    : settledReadback
    ? 'buy-asset-pack-settle'
    : sourceSafePreview
      ? 'review-synthesized-asset-pack'
      : harnessState === 'running' || (acceptedReadNeed && harnessState !== 'idle')
        ? 'request-fit'
        : acceptedReadNeed
          ? 'request-fit'
          : readNeed
            ? 'review-synthesized-need'
            : 'request-read';
  const currentReadNeed = acceptedReadNeed || readNeed;
  const readNeedRows = useMemo(() => {
    if (!currentReadNeed) return [];
    return [
      { label: 'Need id', value: shortIdentifier(currentReadNeed.needId) || currentReadNeed.needId || 'pending' },
      { label: 'Measurement root', value: shortIdentifier(currentReadNeed.measurementRoot) || currentReadNeed.measurementRoot || 'pending' },
      { label: 'Review state', value: currentReadNeed.reviewState || 'pending' },
      { label: 'Target kinds', value: stringList(currentReadNeed.targetArtifactKinds).join(', ') || 'pending' },
      { label: 'Closure criteria', value: String(stringList(currentReadNeed.closureCriteria).length) },
      {
        label: 'Weighted volume',
        value: String(currentReadNeed.pricingMeasurementInputs?.weightedRequestedVolume ?? 'pending'),
      },
      { label: 'Feedback turns', value: String(stringList(currentReadNeed.feedbackHistory).length) },
    ];
  }, [currentReadNeed]);
  const stageCards = TERMINAL_ENTERPRISE_READING_STEPS;
  const canRunLiveFit =
    !showDemonstrationWorkbench &&
    recordingKey === null &&
    harnessState !== 'running' &&
    harnessRequestState.ready;

  const recordActivityId = (value: unknown) => {
    if (!value || typeof value !== 'object') return null;
    const id = (value as { id?: unknown }).id;
    return typeof id === 'string' && id.trim() ? id : null;
  };

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
          'Measured Read recorded. Next admit it for source-bound Finding Fits, or stop if the Read is too broad or unrelated to the deposited source.',
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
      const recorded = await onRecordActivity(buildTerminalReadAdmissionDraft(workbench));
      setRecordedAdmittedReadActivityId(recordActivityId(recorded));
      setReadFitProgress('admitted');
      setRecordMessage(
        'Measured Read admitted for Finding Fits. Next run or record the fit result posture as worthy_fit, no_worthy_fit, or blocked_readiness evidence.',
      );
    } catch (error) {
      setRecordMessage(error instanceof Error ? error.message : 'Unable to admit the measured Read for Finding Fits.');
    } finally {
      setRecordingKey(null);
    }
  };

  const handleSynthesizeReadNeed = useCallback(async (action: 'synthesize_read_need' | 'resynthesize_read_need') => {
    if (!workbench) return;

    setReadNeedAction(action === 'synthesize_read_need' ? 'synthesize' : 'resynthesize');
    setReadNeedMessage(null);

    try {
      const sourceRevision = workbench.sourceRevision;
      const response = await fetch('/api/read-review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action,
          readId: harnessReadActivityId || workbench.scenarioLabel,
          readPrompt: workbench.read.summary,
          sourceRevision,
          repositoryFullName: sourceRevision?.repositoryFullName,
          sourceBranch: sourceRevision?.branch,
          sourceCommit: sourceRevision?.commit,
          targetArtifactKinds: workbench.read.targetKinds,
          closureCriteria: workbench.read.closureCriteria,
          feedback: readNeedFeedback.trim() ? [readNeedFeedback.trim()] : [],
        }),
      });

      if (!response.ok) {
        throw new Error(await readTerminalRouteError(response, 'Unable to synthesize the Read-Need.'));
      }

      const payload = objectValue(await response.json());
      const nextNeed = terminalReadNeed(payload?.readNeed);
      if (!nextNeed) throw new Error('Read-Need synthesis did not return a typed Need.');
      setReadNeed(nextNeed);
      setAcceptedReadNeed(null);
      setReadNeedSynthesisCount((count) => count + 1);
      setReadNeedMessage(
        action === 'synthesize_read_need'
          ? 'Read-Need synthesized for review before Finding Fits.'
          : 'Read-Need resynthesized with feedback for review.',
      );
    } catch (error) {
      setReadNeedMessage(error instanceof Error ? error.message : 'Unable to synthesize the Read-Need.');
    } finally {
      setReadNeedAction(null);
    }
  }, [harnessReadActivityId, readNeedFeedback, workbench]);

  const handleAcceptReadNeed = useCallback(async () => {
    if (!readNeed) return;

    setReadNeedAction('accept');
    setReadNeedMessage(null);

    try {
      const response = await fetch('/api/read-review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'accept_read_need',
          readNeed,
        }),
      });

      if (!response.ok) {
        throw new Error(await readTerminalRouteError(response, 'Unable to accept the Read-Need.'));
      }

      const payload = objectValue(await response.json());
      const accepted = terminalReadNeed(payload?.acceptedReadNeed || payload?.readNeed);
      if (!accepted || accepted.reviewState !== 'accepted') {
        throw new Error('Read-Need acceptance did not return an accepted Need.');
      }
      setAcceptedReadNeed(accepted);
      setReadNeed(accepted);
      setReadNeedMessage('Read-Need accepted. Finding Fits can now run against deposited source.');
      await onRecordActivity?.({
        type: 'agentic-execution:read-measurement',
        detailSection: 'activity',
        summary: `Accepted Read-Need ${accepted.needId || 'for Finding Fits'}.`,
        context: {
          source: 'terminal-staged-reading',
          needId: accepted.needId,
          measurementRoot: accepted.measurementRoot,
          reviewState: accepted.reviewState,
        },
        output: {
          readNeed: accepted,
          fitSearchAdmission: payload?.fitSearchAdmission || null,
          assetPackCompletion: {
            bitcodeActivityState: {
              readNeed: accepted,
              fitSearchAdmission: payload?.fitSearchAdmission || null,
            },
          },
        },
      });
    } catch (error) {
      setReadNeedMessage(error instanceof Error ? error.message : 'Unable to accept the Read-Need.');
    } finally {
      setReadNeedAction(null);
    }
  }, [onRecordActivity, readNeed]);

  const handleRunLiveFit = useCallback(async () => {
    if (!harnessRequestState.ready) {
      setHarnessState('failed');
      setHarnessMessage(`Live fit cannot start yet: missing ${harnessRequestState.missing.join(', ')}.`);
      return;
    }

    setHarnessState('running');
    setHarnessMessage('Starting live AssetPack fit harness...');
    setHarnessEvents([]);
    setHarnessUserHasScrolled(false);

    try {
      await streamTerminalFitPipelineHarness(harnessRequestState.request, {
        onEvent: (event) => {
          setHarnessEvents((currentEvents) => [...currentEvents.slice(-79), event]);
          setHarnessMessage(summarizeTerminalFitPipelineHarnessEvent(event));
        },
      });
      setHarnessState('completed');
      setRecordMessage('Live AssetPack fit harness completed. Refreshing activity and telemetry readback.');
      await onHarnessCompleted?.();
    } catch (error) {
      setHarnessState('failed');
      setHarnessMessage(error instanceof Error ? error.message : 'Live AssetPack fit harness failed.');
    }
  }, [harnessRequestState, onHarnessCompleted]);

  if (!workbench) {
    return (
      <TerminalWorkspaceCard
        id="terminalDepositReadWorkbench"
        kicker="Deposit + read chain"
        title="Read supply, read measurement, and fit together"
        summary="Reading the live deposit-side source, read measurement, and asset-pack fit posture."
        explainer={TERMINAL_WORKSPACE_EXPLAINERS.depositReadChain}
      >
        <p className="mt-4 text-sm leading-6 text-neutral-300">
          Reading the live Bitcode workbench. The enterprise Reading path runs
          ReadNeedComprehensionSynthesis before ReadFindingFitsSynthesis, and it remains
          visible even before a repository is selected.
        </p>
        <ol className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-5">
          {TERMINAL_ENTERPRISE_READING_STEPS.map((stage) => (
            <li key={stage.id} className="border-l border-sky-300/30 pl-3">
              <p className="text-sm font-semibold text-neutral-100">{stage.label}</p>
              <p className="mt-1 text-xs leading-5 text-neutral-400">{stage.detail}</p>
            </li>
          ))}
        </ol>
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

      <section className="mt-5 rounded-[1.45rem] border border-sky-300/18 bg-sky-300/[0.06] px-5 py-5">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
          <div>
            <p className="text-[0.66rem] uppercase tracking-[0.2em] text-sky-200/80">staged reading</p>
            <h3 className="mt-2 text-lg font-semibold text-white">Request Read, review Need, request Fit, review AssetPack, buy and settle</h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-neutral-300">
              The live pipeline starts from an accepted Read-Need. Preview can expose measurements, roots, score, fee quote, and range posture, while source-bearing AssetPack material stays locked until settlement readback.
            </p>
          </div>
          <span className="rounded-full border border-white/10 bg-black/20 px-3 py-2 text-[0.66rem] uppercase tracking-[0.18em] text-neutral-200">
            {activeReadingStage.replace(/-/g, ' ')}
          </span>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-5">
          {stageCards.map((stage) => {
            const active = stage.id === activeReadingStage;
            return (
              <div
                key={stage.id}
                className={`rounded-[1.05rem] border px-3 py-4 text-sm ${
                  active ? 'border-sky-300/35 bg-sky-300/10' : 'border-white/8 bg-black/20'
                }`}
              >
                <p className="font-semibold text-neutral-100">{stage.label}</p>
                <p className="mt-2 leading-5 text-neutral-400">{stage.detail}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-5 grid gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(18rem,0.7fr)]">
          <div className="rounded-[1.1rem] border border-white/8 bg-black/20 px-4 py-4">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <p className="text-[0.64rem] uppercase tracking-[0.18em] text-neutral-500">Read-Need review</p>
                <p className="mt-2 text-sm leading-6 text-neutral-300">
                  {currentReadNeed
                    ? `${currentReadNeed.needId || 'Read-Need'} is ${currentReadNeed.reviewState || 'pending'}.`
                    : 'Synthesize the reader request into a reviewable Need before searching deposits.'}
                </p>
              </div>
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-[0.62rem] uppercase tracking-[0.16em] text-neutral-300">
                attempts {readNeedSynthesisCount}
              </span>
            </div>

            {readNeedMessage ? (
              <p className="mt-3 rounded-[0.9rem] border border-white/8 bg-white/[0.04] px-3 py-3 text-sm leading-6 text-neutral-200">
                {readNeedMessage}
              </p>
            ) : null}

            <label className="mt-4 block">
              <span className="text-[0.62rem] uppercase tracking-[0.16em] text-neutral-500">Need feedback</span>
              <textarea
                value={readNeedFeedback}
                onChange={(event) => setReadNeedFeedback(event.target.value)}
                rows={3}
                placeholder="Optional feedback before requesting another Read-Need synthesis."
                className="mt-2 w-full resize-none rounded-[1rem] border border-white/8 bg-black/30 px-3 py-3 text-sm leading-6 text-neutral-100 outline-none transition placeholder:text-neutral-600 focus:border-sky-300/35"
              />
            </label>

            <div className="mt-4 flex flex-wrap gap-3">
              <button
                type="button"
                disabled={readNeedAction !== null || !workbench.sourceRevision}
                onClick={() => {
                  void handleSynthesizeReadNeed('synthesize_read_need');
                }}
                className="rounded-[1.2rem] border border-sky-300/30 bg-sky-300/10 px-4 py-3 text-sm font-medium text-sky-100 transition hover:border-sky-200/50 hover:bg-sky-300/15 disabled:cursor-not-allowed disabled:opacity-55"
              >
                {readNeedAction === 'synthesize' ? 'Synthesizing…' : 'Synthesize Read-Need'}
              </button>
              <button
                type="button"
                disabled={readNeedAction !== null || !readNeed}
                onClick={() => {
                  void handleSynthesizeReadNeed('resynthesize_read_need');
                }}
                className="rounded-[1.2rem] border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-neutral-100 transition hover:border-white/18 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-55"
              >
                {readNeedAction === 'resynthesize' ? 'Resynthesizing…' : 'Resynthesize with feedback'}
              </button>
              <button
                type="button"
                disabled={readNeedAction !== null || !readNeed || readNeed.reviewState === 'accepted'}
                onClick={() => {
                  void handleAcceptReadNeed();
                }}
                className="rounded-[1.2rem] border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm font-medium text-emerald-100 transition hover:border-emerald-300/50 hover:bg-emerald-400/15 disabled:cursor-not-allowed disabled:opacity-55"
              >
                {readNeedAction === 'accept' ? 'Accepting…' : 'Accept Read-Need'}
              </button>
              <button
                type="button"
                disabled={!canRunLiveFit}
                onClick={() => {
                  void handleRunLiveFit();
                }}
                className="rounded-[1.2rem] border border-amber-300/30 bg-amber-300/10 px-4 py-3 text-sm font-medium text-amber-100 transition hover:border-amber-200/50 hover:bg-amber-300/15 disabled:cursor-not-allowed disabled:opacity-55"
              >
                {harnessState === 'running' ? 'Running Finding Fits…' : 'Request Fit'}
              </button>
            </div>
          </div>

          <div className="rounded-[1.1rem] border border-white/8 bg-black/20 px-4 py-4">
            <p className="text-[0.64rem] uppercase tracking-[0.18em] text-neutral-500">Source-safe preview and settlement readback</p>
            <dl className="mt-3 grid gap-2">
              {[
                { label: 'AssetPack', value: textValue(sourceSafePreview?.assetPackId) || 'pending' },
                { label: 'Fee quote', value: numericValue(previewFeeQuote?.sats) ? `${String(previewFeeQuote?.sats)} sats` : 'pending' },
                { label: 'Quote root', value: shortIdentifier(previewFeeQuote?.quoteRoot) || 'pending' },
                { label: 'Range projection', value: objectValue(sourceSafePreview?.rangeProjection)?.tokenCount ? `${String(objectValue(sourceSafePreview?.rangeProjection)?.tokenCount)} cells` : 'pending' },
                { label: 'Ledger', value: textValue(ledgerSettlement?.status) || 'pending' },
                { label: 'Access', value: textValue(objectValue(sourceSafePreview?.accessPolicy)?.readRightState) || 'pending settlement' },
                { label: 'PR target', value: textValue(objectValue(sourceSafePreview?.delivery)?.pullRequestTarget) || 'pending' },
              ].map((row) => (
                <div key={row.label} className="rounded-[0.9rem] border border-white/8 bg-white/[0.03] px-3 py-2">
                  <dt className="text-[0.58rem] uppercase tracking-[0.14em] text-neutral-500">{row.label}</dt>
                  <dd className="mt-1 break-words font-mono text-[0.7rem] text-neutral-200">{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {readNeedRows.length ? (
          <dl className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {readNeedRows.map((row) => (
              <div key={row.label} className="rounded-[1rem] border border-white/8 bg-black/20 px-4 py-3 text-sm">
                <dt className="text-[0.6rem] uppercase tracking-[0.14em] text-neutral-500">{row.label}</dt>
                <dd className="mt-1 break-words text-neutral-100">{row.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}
      </section>

      <section className="mt-5 rounded-[1.45rem] border border-emerald-400/16 bg-emerald-400/[0.06] px-5 py-5">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
          <div>
            <p className="text-[0.66rem] uppercase tracking-[0.2em] text-emerald-200/80">read state</p>
            <h3 className="mt-2 text-lg font-semibold text-white">Measured Read before fit result</h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-neutral-300">
              Recording a Read stores the measured demand frame. It does not mean Bitcode found a fit. Finding Fits must then return
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
            { id: 'admitted', label: '3. Fit admitted', detail: 'Measured Read may enter source-bound Finding Fits.' },
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
            disabled={!canRunLiveFit}
            onClick={() => {
              void handleRunLiveFit();
            }}
            className="rounded-[1.25rem] border border-sky-300/30 bg-sky-300/10 px-4 py-3 text-sm font-medium text-sky-100 transition hover:border-sky-200/50 hover:bg-sky-300/15 disabled:cursor-not-allowed disabled:opacity-55"
          >
            {liveFitActionLabel}
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
        {!showDemonstrationWorkbench && (harnessMessage || !harnessRequestState.ready || harnessEvents.length > 0) ? (
          <div className="mt-4 rounded-[1.1rem] border border-white/8 bg-black/20 px-4 py-4 text-sm leading-6 text-neutral-300">
            <p className="font-medium text-neutral-100">
              {harnessMessage ||
                `Live fit waiting for ${harnessRequestState.ready ? 'stream events' : harnessRequestState.missing.join(', ')}.`}
            </p>
            {harnessIdentifierRows.length ? (
              <dl className="mt-3 grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
                {harnessIdentifierRows.map((row) => (
                  <div key={row.label} className="rounded-[0.9rem] border border-white/8 bg-white/[0.03] px-3 py-2">
                    <dt className="text-[0.58rem] uppercase tracking-[0.14em] text-neutral-500">{row.label}</dt>
                    <dd className="mt-1 break-words font-mono text-[0.7rem] text-neutral-200">{row.value}</dd>
                  </div>
                ))}
              </dl>
            ) : null}
            {(harnessEvents.length || harnessState === 'running' || harnessState === 'failed') ? (
              <div className="mt-4 overflow-hidden rounded-[1rem] border border-white/8 bg-[rgba(5,9,18,0.88)]">
                <BitcodeExecutionStreamPanel
                  className="relative"
                  isProcessing={harnessState === 'running'}
                  executionState={harnessStreamSnapshot.executionState}
                  isStreamingComplete={harnessStreamSnapshot.isStreamingComplete}
                  generationCount={harnessStreamSnapshot.generationCount}
                  error={harnessStreamSnapshot.error}
                  runId={harnessStreamSnapshot.runId || undefined}
                  metadataRows={harnessIdentifierRows}
                  output={harnessStreamSnapshot.output}
                  outputDetails={harnessStreamSnapshot.outputDetails}
                  onRetry={() => {
                    void handleRunLiveFit();
                  }}
                  onDismissError={() => {
                    setHarnessMessage(null);
                  }}
                  userHasScrolled={harnessUserHasScrolled}
                  setUserHasScrolled={setHarnessUserHasScrolled}
                  compact={true}
                />
              </div>
            ) : null}
          </div>
        ) : null}
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
