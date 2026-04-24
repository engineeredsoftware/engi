'use client';

import { useEffect, useMemo, useState } from 'react';

import BitcodeInlineExplainer from '@/components/base/bitcode/execution/BitcodeInlineExplainer';
import BitcodeMetricGrid from '@/components/base/bitcode/execution/BitcodeMetricGrid';

import ApplicationWorkspaceCard from './ApplicationWorkspaceCard';
import {
  buildApplicationNeedMeasurementDraft,
  readApplicationRouteError,
  type ApplicationActivityRecordDraft,
} from './application-activity-history';
import {
  APPLICATION_INLINE_EXPLAINERS,
  APPLICATION_WORKSPACE_EXPLAINERS,
} from './application-workspace-explainers';
import {
  normalizeApplicationNeedFittingReview,
  normalizeApplicationNeedScenarios,
  type ApplicationNeedFittingReviewState,
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
  const [isReviewing, setIsReviewing] = useState(false);
  const [isLoadingNeedFittingReview, setIsLoadingNeedFittingReview] = useState(false);
  const [needFittingReview, setNeedFittingReview] = useState<ApplicationNeedFittingReviewState | null>(null);
  const [reviewFeedback, setReviewFeedback] = useState('');
  const needState = useMemo<ApplicationNeedScenariosState | null>(
    () => normalizeApplicationNeedScenarios(snapshot),
    [snapshot],
  );

  useEffect(() => {
    if (!needState?.selectedScenarioId) {
      setNeedFittingReview(null);
      return;
    }

    let cancelled = false;
    setIsLoadingNeedFittingReview(true);

    fetch(`/api/need-review?scenarioId=${encodeURIComponent(needState.selectedScenarioId)}`)
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(await readApplicationRouteError(response, 'Unable to read the active Need-fitting review.'));
        }
        return response.json();
      })
      .then((payload) => {
        if (!cancelled) {
          setNeedFittingReview(normalizeApplicationNeedFittingReview(payload));
        }
      })
      .catch((error) => {
        if (!cancelled) {
          setNeedFittingReview(null);
          setActionMessage(error instanceof Error ? error.message : 'Unable to read the active Need-fitting review.');
        }
      })
      .finally(() => {
        if (!cancelled) {
          setIsLoadingNeedFittingReview(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [needState?.selectedScenarioId]);

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

  const handleReviewNeed = async (action: 'accept' | 'reject' | 'remeasure-with-feedback') => {
    if (!needState) return;

    setIsReviewing(true);
    setActionMessage(null);

    try {
      const response = await fetch('/api/need-review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          scenarioId: needState.selectedScenarioId || undefined,
          needReviewAction: action,
          needReviewFeedback: reviewFeedback.trim() ? [reviewFeedback.trim()] : [],
          needReviewActorId: 'bitcode-terminal:need-review',
          needReviewDecisionMode: 'operator-terminal-review',
        }),
      });

      if (!response.ok) {
        throw new Error(await readApplicationRouteError(response, 'Unable to review the active Need.'));
      }

      const payload = (await response.json()) as Record<string, unknown>;
      setNeedFittingReview(normalizeApplicationNeedFittingReview(payload));
      const fitSearchAdmission = payload.fitSearchAdmission as { admitted?: boolean } | undefined;
      const nextProtocolAction = String(payload.nextProtocolAction || 'Continue from the Bitcode Terminal.');
      await onRecordActivity?.({
        type: 'agentic-execution:need-measurement',
        detailSection: 'activity',
        summary: `Reviewed the active Need with action ${action}.`,
        context: {
          source: 'application-need-scenario-panel',
          scenarioId: needState.selectedScenarioId,
          reviewAction: action,
          fitSearchAdmitted: fitSearchAdmission?.admitted === true,
        },
        output: {
          needReview: payload.needReview ?? null,
          reviewDecision: payload.reviewDecision ?? null,
          finalWorkSummary: {
            bitcodeActivityState: {
              needReview: payload,
            },
          },
        },
      });
      setActionMessage(
        fitSearchAdmission?.admitted
          ? `Need accepted for source-to-shares fit search. Next: ${nextProtocolAction}.`
          : `Need review recorded. Fit search remains blocked. Next: ${nextProtocolAction}.`,
      );
    } catch (error) {
      setActionMessage(error instanceof Error ? error.message : 'Unable to review the active Need.');
    } finally {
      setIsReviewing(false);
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
          disabled={isReviewing}
          onClick={() => {
            void handleReviewNeed('accept');
          }}
          className="rounded-[1.4rem] border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm font-medium text-emerald-100 transition hover:border-emerald-300/50 hover:bg-emerald-400/15 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isReviewing ? 'Reviewing Need…' : 'Accept Need for fit search'}
        </button>
        <button
          type="button"
          disabled={isReviewing}
          onClick={() => {
            void handleReviewNeed('reject');
          }}
          className="rounded-[1.4rem] border border-red-400/25 bg-red-400/10 px-4 py-3 text-sm font-medium text-red-100 transition hover:border-red-300/45 hover:bg-red-400/15 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Reject Need
        </button>
        <button
          type="button"
          disabled={isReviewing}
          onClick={() => {
            void handleReviewNeed('remeasure-with-feedback');
          }}
          className="rounded-[1.4rem] border border-amber-400/25 bg-amber-400/10 px-4 py-3 text-sm font-medium text-amber-100 transition hover:border-amber-300/45 hover:bg-amber-400/15 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Remeasure with feedback
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

      <label className="mt-4 block rounded-[1.3rem] border border-white/8 bg-black/20 px-4 py-4">
        <span className="text-[0.66rem] uppercase tracking-[0.2em] text-neutral-400">
          Need-review feedback
        </span>
        <textarea
          value={reviewFeedback}
          onChange={(event) => setReviewFeedback(event.target.value)}
          rows={3}
          placeholder="Optional feedback for reject or remeasure decisions."
          className="mt-3 w-full resize-none rounded-[1rem] border border-white/8 bg-black/30 px-3 py-3 text-sm leading-6 text-neutral-100 outline-none transition placeholder:text-neutral-600 focus:border-emerald-300/35"
        />
      </label>

      <div className="mt-6 rounded-[1.45rem] border border-emerald-400/16 bg-emerald-400/[0.06] px-4 py-4">
        <div className="flex flex-col gap-3 xl:flex-row xl:items-start xl:justify-between">
          <div>
            <p className="text-[0.66rem] uppercase tracking-[0.2em] text-emerald-200/80">
              Need-fitting Exchange review
            </p>
            <h3 className="mt-2 text-lg font-semibold tracking-tight text-white">
              {isLoadingNeedFittingReview
                ? 'Reading reviewable Need admission…'
                : needFittingReview?.task || 'Reviewable Need admission is pending.'}
            </h3>
            <p className="mt-2 text-sm leading-6 text-neutral-300">
              Terminal reads the same `/api/need-review` boundary that Exchange uses before candidate recall,
              fitting, AssetPack assembly, and present-fit settlement review.
            </p>
          </div>
          {needFittingReview ? (
            <span className="rounded-full border border-white/10 bg-black/20 px-3 py-2 text-[0.66rem] uppercase tracking-[0.18em] text-neutral-200">
              {needFittingReview.fitSearchAdmitted ? 'fit admitted' : 'fit blocked'}
            </span>
          ) : null}
        </div>

        {needFittingReview ? (
          <>
            <BitcodeMetricGrid
              metrics={[
                { label: 'Review action', value: needFittingReview.action },
                { label: 'Review status', value: needFittingReview.status },
                { label: 'Required before', value: needFittingReview.requiredBefore },
                { label: 'OC', value: needFittingReview.objectiveContractId },
              ]}
              columnsClassName="mt-4 tablet:grid-cols-2 xl:grid-cols-4"
              itemClassName="rounded-2xl border border-white/8 bg-black/20 px-4 py-4"
              labelClassName="text-[0.62rem] uppercase tracking-[0.16em] text-neutral-500"
              valueClassName="break-words text-xs font-semibold text-neutral-100"
            />
            <div className="mt-4 grid gap-3 xl:grid-cols-3">
              <div className="rounded-[1.1rem] border border-white/8 bg-black/20 px-4 py-4">
                <p className="text-[0.64rem] uppercase tracking-[0.18em] text-neutral-500">Blocked until</p>
                <p className="mt-2 text-sm leading-6 text-neutral-200">{needFittingReview.blockedUntil}</p>
              </div>
              <div className="rounded-[1.1rem] border border-white/8 bg-black/20 px-4 py-4">
                <p className="text-[0.64rem] uppercase tracking-[0.18em] text-neutral-500">Fit stages</p>
                <p className="mt-2 text-sm leading-6 text-neutral-200">
                  {(needFittingReview.blockedStages.length
                    ? needFittingReview.blockedStages
                    : needFittingReview.admittedStages
                  ).join(' · ') || 'none'}
                </p>
              </div>
              <div className="rounded-[1.1rem] border border-white/8 bg-black/20 px-4 py-4">
                <p className="text-[0.64rem] uppercase tracking-[0.18em] text-neutral-500">Settlement review</p>
                <p className="mt-2 text-sm leading-6 text-neutral-200">
                  {needFittingReview.settlementReviewStage}
                </p>
              </div>
            </div>
            {needFittingReview.reviewQuestions.length ? (
              <div className="mt-4 rounded-[1.1rem] border border-white/8 bg-black/20 px-4 py-4">
                <p className="text-[0.64rem] uppercase tracking-[0.18em] text-neutral-500">Review questions</p>
                <ul className="mt-3 space-y-2 text-sm leading-6 text-neutral-300">
                  {needFittingReview.reviewQuestions.slice(0, 3).map((question) => (
                    <li key={question}>{question}</li>
                  ))}
                </ul>
              </div>
            ) : null}
          </>
        ) : (
          <p className="mt-4 text-sm leading-6 text-neutral-400">
            {isLoadingNeedFittingReview
              ? 'Loading the current Need-fitting review from Exchange…'
              : 'No Need-fitting review payload is available for this scenario yet.'}
          </p>
        )}
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
