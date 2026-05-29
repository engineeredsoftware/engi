"use client";

import Link from "next/link";
import React from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  BadgeDollarSign,
  Clock3,
  GitBranch,
  GitCommitHorizontal,
  RefreshCw,
  ShieldCheck,
  Wallet,
  Workflow,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

import { fetchPipelineExecutionHistory } from "@/networking/api-client";
import type { PipelineExecution } from "@/types/api";

import {
  ProductRouteDisclosure,
  ProductRouteEnterpriseSummary,
  ProductRouteKeyboardHint,
  ProductRouteProofDetail,
  ProductRouteShell,
  ProductRouteStatePanel,
  ProductRouteStepGrid,
} from "@/components/base/bitcode/routes/product-route-shell";
import TerminalDepositReadWorkbench from "@/app/terminal/TerminalDepositReadWorkbench";
import TerminalRepositoryContextPanel from "@/app/terminal/TerminalRepositoryContextPanel";
import TerminalReadScenarioPanel from "@/app/terminal/TerminalReadScenarioPanel";
import { TerminalShellBridgeProvider } from "@/app/terminal/terminal-shell-bridge";
import type { TerminalDepositedSourceRevision } from "@/app/terminal/terminal-deposit-read-workbench";
import {
  buildTerminalExecutionHistoryRequest,
  mapExecutionHistoryRunToWorkspaceRun,
  readTerminalRouteError,
  type TerminalActivityRecordDraft,
  upsertWorkspaceRun,
} from "@/app/terminal/terminal-activity-history";
import type { TerminalRepositoryContextState } from "@/app/terminal/terminal-repository-context";
import {
  readTerminalTransactionId,
  writeTerminalTransactionId,
} from "@/app/terminal/terminal-transaction-query";
import { shouldRecoverTerminalTransactionRoute } from "@/app/terminal/terminal-transaction-query";
import type { WorkspaceRun } from "@/app/terminal/terminal-run-data";
import { buildReadHref } from "@/app/terminal/terminal-routes";

import {
  buildReadRouteSession,
  readReadRouteStage,
  writeReadRouteStage,
} from "./read-route-model";

function shortIdentifier(value: string | null | undefined) {
  if (!value) return "pending";
  return value.length > 18 ? `${value.slice(0, 12)}...` : value;
}

function formatDate(value: string | null | undefined) {
  if (!value) return "pending";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatSats(value: number | null | undefined) {
  if (typeof value !== "number" || !Number.isFinite(value)) return "pending";
  return `${new Intl.NumberFormat(undefined, { maximumFractionDigits: 0 }).format(value)} sats`;
}

export default function ReadPageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const routeSearchParams = useMemo(
    () => new URLSearchParams(searchParams.toString()),
    [searchParams],
  );
  const selectedTransactionId = useMemo(
    () => readTerminalTransactionId(routeSearchParams),
    [routeSearchParams],
  );
  const routeReadingStage = useMemo(
    () => readReadRouteStage(routeSearchParams),
    [routeSearchParams],
  );
  const [liveRuns, setLiveRuns] = useState<WorkspaceRun[]>([]);
  const [isLoadingRuns, setIsLoadingRuns] = useState(true);
  const [runsLoadError, setRunsLoadError] = useState<string | null>(null);
  const [repositoryContext, setRepositoryContext] =
    useState<TerminalRepositoryContextState | null>(null);

  const readCurrentSearchParams = useCallback(
    () =>
      typeof window !== "undefined" && window.location.pathname === "/read"
        ? new URLSearchParams(window.location.search)
        : new URLSearchParams(searchParams.toString()),
    [searchParams],
  );

  const replaceReadSearchParams = useCallback(
    (nextParams: URLSearchParams) => {
      const query = nextParams.toString();
      router.replace(buildReadHref(query), { scroll: false });
    },
    [router],
  );

  const replaceReadRouteTransaction = useCallback(
    (transactionId: string) => {
      replaceReadSearchParams(
        writeTerminalTransactionId(readCurrentSearchParams(), transactionId),
      );
    },
    [readCurrentSearchParams, replaceReadSearchParams],
  );

  const refreshLiveRuns = useCallback(async () => {
    setIsLoadingRuns(true);
    setRunsLoadError(null);

    try {
      const history = await fetchPipelineExecutionHistory();
      const nextRuns = history.map(mapExecutionHistoryRunToWorkspaceRun);
      setLiveRuns(nextRuns);
      return nextRuns;
    } catch (error) {
      setLiveRuns([]);
      setRunsLoadError(
        error instanceof Error
          ? error.message
          : "Unable to load recent Reading activity.",
      );
      return [];
    } finally {
      setIsLoadingRuns(false);
    }
  }, []);

  useEffect(() => {
    void refreshLiveRuns();
  }, [refreshLiveRuns]);

  useEffect(() => {
    if (
      !shouldRecoverTerminalTransactionRoute({
        transactionIds: liveRuns.map((run) => run.id),
        selectedTransactionId,
      })
    ) {
      return;
    }
    replaceReadRouteTransaction(liveRuns[0].id);
  }, [liveRuns, replaceReadRouteTransaction, selectedTransactionId]);

  const selectedRun = useMemo(
    () =>
      liveRuns.find((run) => run.id === selectedTransactionId) ||
      liveRuns[0] ||
      null,
    [liveRuns, selectedTransactionId],
  );

  const depositedSourceRevision =
    useMemo<TerminalDepositedSourceRevision | null>(() => {
      const selectedRepository = repositoryContext?.selectedRepository || null;
      if (!selectedRepository) return null;
      const selectedBranch =
        repositoryContext?.selectedBranch ||
        selectedRepository.defaultBranch ||
        "main";
      const matchingSubmission = liveRuns.find(
        (run) =>
          run.contextSource === "terminal-deposit-composer" &&
          run.repository === selectedRepository.fullName &&
          run.branch === selectedBranch &&
          Boolean(run.sourceCommit) &&
          Boolean(run.candidateAssetId),
      );
      if (!matchingSubmission?.sourceCommit) return null;

      return {
        repositoryFullName: selectedRepository.fullName,
        branch: selectedBranch,
        commit: matchingSubmission.sourceCommit,
        activityId: matchingSubmission.id,
        createdAt: matchingSubmission.created_at,
        depositAssetId: matchingSubmission.candidateAssetId || null,
        hasWalletOrAttestationProof: Boolean(
          matchingSubmission.candidateAssetId,
        ),
        hasAssetMeasurementEvidence: Boolean(
          matchingSubmission.candidateAssetId,
        ),
        proofRoot: matchingSubmission.depositProofRoot || null,
        measurementRoot: matchingSubmission.depositMeasurementRoot || null,
        reconciliationReadbackRoot:
          matchingSubmission.depositReconciliationReadbackRoot || null,
        depositorySearchDocumentRoot:
          matchingSubmission.depositorySearchDocumentRoot || null,
        lexicalDocumentRoot: matchingSubmission.lexicalDocumentRoot || null,
        vectorDocumentRoot: matchingSubmission.vectorDocumentRoot || null,
        compensationPreviewRoot:
          matchingSubmission.compensationPreviewRoot || null,
        sourceToSharesPreviewRoot:
          matchingSubmission.sourceToSharesPreviewRoot || null,
        compensationState: matchingSubmission.compensationState || null,
        compensationAllocationMethod:
          matchingSubmission.compensationAllocationMethod || null,
        compensationPriceAsset:
          matchingSubmission.compensationPriceAsset || null,
        depositorWalletId: matchingSubmission.depositorWalletId || null,
        depositoryIndexState: matchingSubmission.depositoryIndexState || null,
      };
    }, [liveRuns, repositoryContext]);

  const admittedReadActivityId = useMemo(() => {
    const selectedRepository = repositoryContext?.selectedRepository || null;
    if (!selectedRepository) return null;
    const sourceBranch =
      depositedSourceRevision?.branch ||
      repositoryContext?.selectedBranch ||
      selectedRepository.defaultBranch ||
      "main";
    const sourceCommit =
      depositedSourceRevision?.commit ||
      repositoryContext?.selectedCommit ||
      null;
    const matchingRead = liveRuns.find(
      (run) =>
        run.contextSource === "terminal-deposit-read-workbench" &&
        run.contextWorkbench === "read-admission" &&
        run.repository === selectedRepository.fullName &&
        run.branch === sourceBranch &&
        (!sourceCommit || run.sourceCommit === sourceCommit),
    );
    return matchingRead?.id || null;
  }, [depositedSourceRevision, liveRuns, repositoryContext]);

  const readRouteSession = useMemo(
    () =>
      buildReadRouteSession({
        transactionId: selectedTransactionId || admittedReadActivityId || null,
        routeReadingStage,
        repositoryFullName:
          repositoryContext?.selectedRepository?.fullName || null,
        sourceBranch:
          depositedSourceRevision?.branch ||
          repositoryContext?.selectedBranch ||
          null,
        sourceCommit:
          depositedSourceRevision?.commit ||
          repositoryContext?.selectedCommit ||
          null,
        hasRepositorySource: Boolean(repositoryContext?.selectedRepository),
        hasReadMeasurement: Boolean(
          admittedReadActivityId ||
            selectedRun?.contextWorkbench === "read-admission" ||
            selectedRun?.transactionLens === "read",
        ),
        hasSynthesizedNeed: Boolean(
          admittedReadActivityId ||
            selectedRun?.contextSource === "terminal-staged-reading",
        ),
        hasAcceptedNeed: Boolean(admittedReadActivityId),
        findingFitsRunning: Boolean(
          selectedRun?.type?.includes("asset-pack") &&
            selectedRun.status === "running",
        ),
        hasSourceSafePreview: Boolean(
          selectedRun?.type?.includes("asset-pack") &&
            selectedRun.status === "completed",
        ),
        hasSettlementReadback: Boolean(
          selectedRun?.closureFocus?.toLowerCase().includes("settlement"),
        ),
        hasDeliveryReadback: Boolean(
          selectedRun?.closureFocus?.toLowerCase().includes("delivery"),
        ),
        measuredBtd: selectedRun?.measuredBtd ?? null,
        quoteSats:
          typeof selectedRun?.btcFeeUsdEquivalent === "number"
            ? Math.max(1, Math.round(selectedRun.btcFeeUsdEquivalent * 10_000))
            : null,
        settlementQuoteId: selectedRun?.id ? `quote:${selectedRun.id}` : null,
        procurementApproved: Boolean(
          selectedRun?.closureFocus?.toLowerCase().includes("settlement") ||
            selectedRun?.closureFocus?.toLowerCase().includes("delivery"),
        ),
        buyerAuthorized: true,
        walletAuthorityPresent: Boolean(
          selectedRun?.closureFocus?.toLowerCase().includes("wallet") ||
            selectedRun?.closureFocus?.toLowerCase().includes("settlement") ||
            selectedRun?.closureFocus?.toLowerCase().includes("delivery"),
        ),
      }),
    [
      admittedReadActivityId,
      depositedSourceRevision,
      repositoryContext,
      routeReadingStage,
      selectedRun,
      selectedTransactionId,
    ],
  );

  const handleRecordActivity = useCallback(
    async (draft: TerminalActivityRecordDraft) => {
      const response = await fetch("/api/executions/history", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          buildTerminalExecutionHistoryRequest(draft, {
            repositoryContext,
            fallbackRun: selectedRun,
          }),
        ),
      });

      if (!response.ok) {
        throw new Error(
          await readTerminalRouteError(
            response,
            "Unable to record Reading activity.",
          ),
        );
      }

      const payload = (await response.json()) as {
        execution?: PipelineExecution;
      };
      if (!payload.execution)
        throw new Error(
          "Reading activity response did not include an execution row.",
        );

      const nextRun = mapExecutionHistoryRunToWorkspaceRun(payload.execution);
      setLiveRuns((currentRuns) => upsertWorkspaceRun(currentRuns, nextRun));
      if (draft.selectAfterRecord !== false)
        replaceReadRouteTransaction(nextRun.id);
      void refreshLiveRuns();
      return nextRun;
    },
    [
      refreshLiveRuns,
      replaceReadRouteTransaction,
      repositoryContext,
      selectedRun,
    ],
  );

  const recentReadingRuns = useMemo(
    () =>
      liveRuns
        .filter(
          (run) =>
            [
              "terminal-deposit-read-workbench",
              "terminal-staged-reading",
              "pipeline-harness",
            ].includes(run.contextSource || "") ||
            Boolean(run.type?.includes("pipeline")),
        )
        .slice(0, 6),
    [liveRuns],
  );

  const sessionRows = [
    {
      label: "Repository",
      value:
        readRouteSession.routeState.repositoryFullName || "select repository",
    },
    {
      label: "Branch",
      value: readRouteSession.routeState.sourceBranch || "pending",
    },
    {
      label: "Commit",
      value: shortIdentifier(readRouteSession.routeState.sourceCommit),
    },
    {
      label: "Transaction",
      value: shortIdentifier(readRouteSession.routeState.transactionId),
    },
    {
      label: "Need pipeline",
      value: readRouteSession.pipelineOwnership.readNeedPipeline,
    },
    {
      label: "Fits pipeline",
      value: readRouteSession.pipelineOwnership.findingFitsPipeline,
    },
  ];

  const procurementRows = [
    {
      label: "Budget",
      value: formatSats(
        readRouteSession.procurementGovernance.budgetPolicy.budgetEnvelopeSats,
      ),
    },
    {
      label: "Quote",
      value: formatSats(
        readRouteSession.procurementGovernance.quotePolicy.shareToFee.grossSats,
      ),
    },
    {
      label: "Approval",
      value: readRouteSession.procurementGovernance.budgetPolicy.approvalRequired
        ? readRouteSession.procurementGovernance.approval.procurementApproved
          ? "approved"
          : "required"
        : "not required",
    },
    {
      label: "Settlement",
      value: readRouteSession.procurementGovernance.settlement.readiness.replace(
        /-/g,
        " ",
      ),
    },
  ];

  const authorityRows = [
    {
      label: "Authority",
      value: readRouteSession.organizationPolicyWalletAuthority.aggregate.state,
    },
    {
      label: "Wallet",
      value: readRouteSession.organizationPolicyWalletAuthority.walletAuthority.state,
    },
    {
      label: "Spend",
      value: readRouteSession.organizationPolicyWalletAuthority.budgetApproval.state,
    },
    {
      label: "Required denials",
      value: String(
        readRouteSession.organizationPolicyWalletAuthority.aggregate
          .requiredDeniedActionCount,
      ),
    },
    {
      label: "Authority root",
      value: readRouteSession.organizationPolicyWalletAuthority.roots.authorityRoot,
    },
  ];

  return (
    <TerminalShellBridgeProvider>
      <ProductRouteShell
        testId="route-shell-read"
        tone="sky"
        label="Read"
        title="Reading"
        summary="Read request -> Need -> Finding Fits -> Preview -> Settlement."
        icon={Workflow}
        metrics={[
          {
            label: "Stage",
            value: readRouteSession.activeStepId.replace(/-/g, " "),
          },
          {
            label: "Rows",
            value: isLoadingRuns ? "reading" : String(liveRuns.length),
          },
          { label: "Boundary", value: "source-safe" },
          {
            label: "Quote",
            value: formatSats(
              readRouteSession.procurementGovernance.budgetPolicy.quoteSats,
            ),
          },
        ]}
      >
        <ProductRouteStepGrid
          ariaLabel="Reading steps"
          activeStepId={readRouteSession.activeStepId}
          steps={readRouteSession.steps}
          tone="sky"
          testIdPrefix="read-route-step"
          stateDataAttribute="data-reading-step-state"
          onSelect={(stepId) =>
            replaceReadSearchParams(
              writeReadRouteStage(readCurrentSearchParams(), stepId),
            )
          }
        />

        <ProductRouteEnterpriseSummary
          testId="read-enterprise-economic-summary"
          tone="sky"
          title="Reading economy overview"
          metrics={[
            {
              label: "Need review",
              value: readRouteSession.readObjects.acceptedNeedPresent
                ? "accepted"
                : "pending",
              state: "pre-fit",
              description: "Finding Fits remains blocked until the Need is accepted.",
            },
            {
              label: "Quote",
              value: formatSats(
                readRouteSession.procurementGovernance.quotePolicy.shareToFee
                  .grossSats,
              ),
              state: readRouteSession.procurementGovernance.quotePolicy.state,
              description: "Measurement-weight-volume fee calculation.",
            },
            {
              label: "Settlement",
              value: readRouteSession.procurementGovernance.settlement.readiness.replace(
                /-/g,
                " ",
              ),
              state: "BTC/BTD",
              description: "Source remains withheld until rights are paid.",
            },
            {
              label: "Authority",
              value:
                readRouteSession.organizationPolicyWalletAuthority.aggregate
                  .state,
              state:
                readRouteSession.organizationPolicyWalletAuthority
                  .walletAuthority.state,
              description: "Organization spend and wallet policy readback.",
            },
          ]}
        />

        <section className="grid gap-5 xl:grid-cols-[minmax(0,1.4fr)_minmax(360px,0.6fr)]">
          <div className="grid min-w-0 gap-5">
            <div className="grid gap-5 xl:grid-cols-2">
              <TerminalRepositoryContextPanel
                preferredRepository={selectedRun?.repository || null}
                onContextChange={setRepositoryContext}
                onRecordActivity={handleRecordActivity}
              />
              <TerminalReadScenarioPanel
                onRecordActivity={handleRecordActivity}
                showDemonstrationScenarios={false}
              />
            </div>
            <TerminalDepositReadWorkbench
              repositoryContext={repositoryContext}
              depositedSourceRevision={depositedSourceRevision}
              admittedReadActivityId={admittedReadActivityId}
              routeReadingStage={routeReadingStage}
              onRecordActivity={handleRecordActivity}
              onHarnessCompleted={refreshLiveRuns}
              showDemonstrationWorkbench={false}
            />
          </div>

          <aside className="grid h-fit gap-5" aria-label="Reading route state">
            <ProductRouteKeyboardHint
              testId="read-keyboard-navigation"
              tone="sky"
              shortcuts={[
                { keys: "Tab", label: "Move through the five Reading steps and source controls." },
                { keys: "Enter", label: "Activate the focused step, refresh, or route action." },
                { keys: "Space", label: "Open or close source-safe proof detail." },
              ]}
            />

            <section className="border border-white/10 bg-white/[0.035] px-4 py-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[0.68rem] uppercase tracking-[0.22em] text-sky-200/80">
                    Session
                  </p>
                  <h2 className="mt-2 text-lg font-semibold text-white">
                    Source-safe read state
                  </h2>
                </div>
                <ShieldCheck
                  className="h-5 w-5 text-emerald-200"
                  aria-hidden="true"
                />
              </div>
              <dl className="mt-4 grid gap-2">
                {sessionRows.map((row) => (
                  <div
                    key={row.label}
                    className="border border-white/8 bg-black/20 px-3 py-2"
                  >
                    <dt className="text-[0.58rem] uppercase tracking-[0.14em] text-neutral-500">
                      {row.label}
                    </dt>
                    <dd className="mt-1 break-words font-mono text-[0.68rem] text-neutral-200">
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>
              <div className="mt-3">
                <ProductRouteDisclosure title="Disclosure boundary" tone="sky">
                  Visible: Need measurements, fit ids, proof roots, fee quotes,
                  settlement readback, delivery posture. Withheld until paid
                  rights: source-bearing AssetPack contents.
                </ProductRouteDisclosure>
              </div>
              <div className="mt-3">
                <ProductRouteProofDetail
                  testId="read-expandable-proof-detail"
                  title="Reading proof detail"
                  tone="sky"
                  roots={[
                    {
                      id: "route-session-root",
                      label: "Route session root",
                      root: readRouteSession.proofRoot,
                    },
                    {
                      id: "budget-policy-root",
                      label: "Budget policy root",
                      root: readRouteSession.procurementGovernance.budgetPolicy
                        .policyRoot,
                    },
                    {
                      id: "quote-root",
                      label: "Quote root",
                      root: readRouteSession.procurementGovernance.quotePolicy
                        .quoteRoot,
                    },
                    {
                      id: "settlement-readiness-root",
                      label: "Settlement readiness root",
                      root: readRouteSession.procurementGovernance.settlement
                        .readinessRoot,
                    },
                    {
                      id: "authority-root",
                      label: "Authority root",
                      root: readRouteSession.organizationPolicyWalletAuthority
                        .roots.authorityRoot,
                    },
                  ]}
                />
              </div>
            </section>

            <section className="border border-white/10 bg-white/[0.035] px-4 py-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[0.68rem] uppercase tracking-[0.22em] text-sky-200/80">
                    Governance
                  </p>
                  <h2 className="mt-2 text-lg font-semibold text-white">
                    Organization authority
                  </h2>
                </div>
                <ShieldCheck
                  className="h-5 w-5 text-sky-200"
                  aria-hidden="true"
                />
              </div>
              <dl className="mt-4 grid gap-2">
                {authorityRows.map((row) => (
                  <div
                    key={row.label}
                    className="border border-white/8 bg-black/20 px-3 py-2"
                  >
                    <dt className="text-[0.58rem] uppercase tracking-[0.14em] text-neutral-500">
                      {row.label}
                    </dt>
                    <dd className="mt-1 break-words font-mono text-[0.68rem] text-neutral-200">
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>
              {readRouteSession.organizationPolicyWalletAuthority.aggregate
                .blockers.length ? (
                <div className="mt-3">
                  <ProductRouteDisclosure
                    title="Authority blockers"
                    tone="sky"
                  >
                    {readRouteSession.organizationPolicyWalletAuthority.aggregate.blockers.join(
                      "; ",
                    )}
                  </ProductRouteDisclosure>
                </div>
              ) : null}
            </section>

            <section className="border border-white/10 bg-white/[0.035] px-4 py-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[0.68rem] uppercase tracking-[0.22em] text-sky-200/80">
                    Procurement
                  </p>
                  <h2 className="mt-2 text-lg font-semibold text-white">
                    Budget and quote
                  </h2>
                </div>
                <BadgeDollarSign
                  className="h-5 w-5 text-emerald-200"
                  aria-hidden="true"
                />
              </div>
              <dl className="mt-4 grid gap-2">
                {procurementRows.map((row) => (
                  <div
                    key={row.label}
                    className="border border-white/8 bg-black/20 px-3 py-2"
                  >
                    <dt className="text-[0.58rem] uppercase tracking-[0.14em] text-neutral-500">
                      {row.label}
                    </dt>
                    <dd className="mt-1 break-words font-mono text-[0.68rem] text-neutral-200">
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>
              <div className="mt-4 grid gap-2 text-xs text-neutral-400">
                <div className="flex items-center gap-2">
                  <Clock3 className="h-3.5 w-3.5 text-sky-200" aria-hidden="true" />
                  <span>
                    {readRouteSession.procurementGovernance.quotePolicy.state.replace(
                      /-/g,
                      " ",
                    )}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Wallet
                    className="h-3.5 w-3.5 text-sky-200"
                    aria-hidden="true"
                  />
                  <span>
                    {readRouteSession.procurementGovernance.approval.walletAuthorityPresent
                      ? "wallet authority present"
                      : "wallet authority pending"}
                  </span>
                </div>
              </div>
              {readRouteSession.procurementGovernance.settlement.blockers
                .length ? (
                <div className="mt-3">
                  <ProductRouteDisclosure
                    title="Procurement blockers"
                    tone="sky"
                  >
                    {readRouteSession.procurementGovernance.settlement.blockers.join(
                      "; ",
                    )}
                  </ProductRouteDisclosure>
                </div>
              ) : null}
            </section>

            <section className="border border-white/10 bg-white/[0.035] px-4 py-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[0.68rem] uppercase tracking-[0.22em] text-neutral-500">
                    Readback
                  </p>
                  <h2 className="mt-2 text-lg font-semibold text-white">
                    Recent Reading activity
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    void refreshLiveRuns();
                  }}
                  className="inline-flex h-9 w-9 items-center justify-center border border-white/10 bg-white/[0.04] text-neutral-200 transition hover:border-sky-300/30 hover:bg-sky-300/10"
                  aria-label="Refresh Reading activity"
                >
                  <RefreshCw className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
              {runsLoadError ? (
                <div className="mt-3">
                  <ProductRouteStatePanel
                    compact
                    variant="error"
                    title="Reading activity unavailable"
                    message={runsLoadError}
                  />
                </div>
              ) : null}
              <div className="mt-4 grid gap-2">
                {recentReadingRuns.length ? (
                  recentReadingRuns.map((run) => (
                    <Link
                      key={run.id}
                      href={buildReadHref(
                        writeTerminalTransactionId(
                          readCurrentSearchParams(),
                          run.id,
                        ),
                      )}
                      className="border border-white/8 bg-black/20 px-3 py-3 transition hover:border-sky-300/25 hover:bg-sky-300/[0.05]"
                    >
                      <span className="flex items-center justify-between gap-2 text-xs uppercase tracking-[0.16em] text-neutral-500">
                        <span>{run.type}</span>
                        <span>{run.status}</span>
                      </span>
                      <span className="mt-2 block text-sm font-medium text-neutral-100">
                        {run.summary || run.id}
                      </span>
                      <span className="mt-2 flex flex-wrap gap-2 text-[0.68rem] text-neutral-400">
                        <span className="inline-flex items-center gap-1">
                          <GitBranch
                            className="h-3.5 w-3.5"
                            aria-hidden="true"
                          />
                          {run.branch || "branch pending"}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <GitCommitHorizontal
                            className="h-3.5 w-3.5"
                            aria-hidden="true"
                          />
                          {shortIdentifier(run.sourceCommit)}
                        </span>
                        <span>{formatDate(run.created_at)}</span>
                      </span>
                    </Link>
                  ))
                ) : (
                  <ProductRouteStatePanel
                    compact
                    variant={isLoadingRuns ? "loading" : "empty"}
                    title={
                      isLoadingRuns
                        ? "Loading Reading activity"
                        : "No Reading activity"
                    }
                    message={
                      isLoadingRuns
                        ? "Recent pipeline rows are loading."
                        : "Start with a repository source and Read request."
                    }
                  />
                )}
              </div>
              <Link
                href="/packs?type=read-need-fit-preview"
                className="mt-3 inline-flex w-full items-center justify-center border border-emerald-300/20 bg-emerald-300/10 px-4 py-3 text-sm font-medium text-emerald-100 transition hover:border-emerald-200/40 hover:bg-emerald-300/15"
              >
                Open pack activity
              </Link>
            </section>
          </aside>
        </section>
      </ProductRouteShell>
    </TerminalShellBridgeProvider>
  );
}
