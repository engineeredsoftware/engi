"use client";

import Link from "next/link";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Boxes,
  GitBranch,
  GitCommitHorizontal,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

import { useAuth } from "@/components/base/bitcode/auth/AuthProvider";
import {
  ProductRouteDisclosure,
  ProductRouteEnterpriseSummary,
  ProductRouteKeyboardHint,
  ProductRouteProofDetail,
  ProductRouteShell,
  ProductRouteStatePanel,
  ProductRouteStepGrid,
} from "@/components/base/bitcode/routes/product-route-shell";
import { useUserData } from "@/hooks/useUserData";
import { fetchPipelineExecutionHistory } from "@/networking/api-client";
import type { PipelineExecution } from "@/types/api";

import TerminalDepositComposer from "@/app/terminal/TerminalDepositComposer";
import TerminalRepositoryContextPanel from "@/app/terminal/TerminalRepositoryContextPanel";
import TerminalSupplySelectionPanel from "@/app/terminal/TerminalSupplySelectionPanel";
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
import {
  buildDepositHref,
  DEPOSIT_ROUTE,
} from "@/app/terminal/terminal-routes";
import { TerminalShellBridgeProvider } from "@/app/terminal/terminal-shell-bridge";
import { deriveTerminalTransactionReadiness } from "@/app/terminal/terminal-transaction-readiness-source";

import {
  buildDepositRouteSession,
  readDepositRouteStage,
  writeDepositRouteStage,
} from "./deposit-route-model";
import type {
  DepositOptionReviewDecision,
  DepositOptionReviewDecisionState,
} from "@bitcode/pipeline-asset-pack/deposit-asset-pack-option-admission";

const DEPOSIT_OPTION_PIPELINE_ID = "DepositAssetPackOptionSynthesis";
const DEPOSIT_OPTION_POLICY_ID = "DepositAssetPackOptionPolicy";
const DEPOSIT_OPTION_ADMISSION_ID = "DepositAssetPackOptionAdmissionReport";
const DEPOSITOR_EARNING_SUPPLY_INTELLIGENCE_ID =
  "DepositorEarningSupplyIntelligence";

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
  return `${value.toLocaleString()} sats`;
}

function readStringField(source: unknown, ...keys: string[]) {
  if (!source || typeof source !== "object") return null;
  const record = source as Record<string, unknown>;
  for (const key of keys) {
    const value = record[key];
    if (typeof value === "string" && value.trim()) return value.trim();
  }
  return null;
}

export default function DepositPageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const {
    data: userData,
    hasGitHubConnection,
    hasValidGitHubConnection,
    hasWalletConnection,
    hasVerifiedWalletConnection,
    hasStoredVerifiedWalletConnection,
    walletConnectionStatus,
  } = useUserData();
  const routeSearchParams = useMemo(
    () => new URLSearchParams(searchParams.toString()),
    [searchParams],
  );
  const selectedTransactionId = useMemo(
    () => readTerminalTransactionId(routeSearchParams),
    [routeSearchParams],
  );
  const routeDepositStage = useMemo(
    () => readDepositRouteStage(routeSearchParams),
    [routeSearchParams],
  );
  const [liveRuns, setLiveRuns] = useState<WorkspaceRun[]>([]);
  const [isLoadingRuns, setIsLoadingRuns] = useState(true);
  const [runsLoadError, setRunsLoadError] = useState<string | null>(null);
  const [repositoryContext, setRepositoryContext] =
    useState<TerminalRepositoryContextState | null>(null);
  const [depositorInstructions, setDepositorInstructions] = useState(
    "Propose source-safe AssetPack options that are sub-critical to expose after settlement and likely useful for future Reading demand.",
  );
  const [sourcePathHintsText, setSourcePathHintsText] = useState(
    [
      "uapi/app/terminal/TerminalDepositComposer.tsx",
      "packages/pipelines/asset-pack/src/depository-supply-index.ts",
    ].join("\n"),
  );
  const [optionsRequested, setOptionsRequested] = useState(false);
  const [optionReviewDecisions, setOptionReviewDecisions] = useState<
    Record<string, DepositOptionReviewDecisionState>
  >({});

  const readCurrentSearchParams = useCallback(
    () =>
      typeof window !== "undefined" &&
      window.location.pathname === DEPOSIT_ROUTE
        ? new URLSearchParams(window.location.search)
        : new URLSearchParams(searchParams.toString()),
    [searchParams],
  );

  const replaceDepositSearchParams = useCallback(
    (nextParams: URLSearchParams) => {
      const query = nextParams.toString();
      router.replace(buildDepositHref(query), { scroll: false });
    },
    [router],
  );

  const replaceDepositRouteTransaction = useCallback(
    (transactionId: string) => {
      replaceDepositSearchParams(
        writeTerminalTransactionId(readCurrentSearchParams(), transactionId),
      );
    },
    [readCurrentSearchParams, replaceDepositSearchParams],
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
          : "Unable to load recent Deposit activity.",
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
    replaceDepositRouteTransaction(liveRuns[0].id);
  }, [liveRuns, replaceDepositRouteTransaction, selectedTransactionId]);

  const selectedRun = useMemo(
    () =>
      liveRuns.find((run) => run.id === selectedTransactionId) ||
      liveRuns[0] ||
      null,
    [liveRuns, selectedTransactionId],
  );

  const profileRecord =
    userData?.profile && typeof userData.profile === "object"
      ? (userData.profile as Record<string, unknown>)
      : null;
  const walletBinding =
    profileRecord?.wallet_binding &&
    typeof profileRecord.wallet_binding === "object"
      ? (profileRecord.wallet_binding as Record<string, unknown>)
      : null;
  const preferredSignerAddress = useMemo(() => {
    const profileAuthAddress = readStringField(profileRecord, "auth_address");
    const profileWalletAddress = readStringField(
      profileRecord,
      "wallet_address",
    );
    const walletAuthAddress =
      walletConnectionStatus?.metadata?.authAddress?.trim() || "";
    const walletAddress = walletConnectionStatus?.address?.trim() || "";
    return (
      walletAuthAddress ||
      walletAddress ||
      profileAuthAddress ||
      profileWalletAddress ||
      null
    );
  }, [profileRecord, walletConnectionStatus]);
  const preferredSignerLabel = walletConnectionStatus?.provider
    ? `${walletConnectionStatus.provider} wallet`
    : "connected wallet";
  const transactionReadiness = useMemo(
    () =>
      deriveTerminalTransactionReadiness({
        signedIn: Boolean(user),
        repositoryContext,
        repositoryConnectionStatus: repositoryContext?.connectionStatus || null,
        hasRepositoryProviderAttachment: hasGitHubConnection,
        hasValidRepositoryProviderAttachment: hasValidGitHubConnection,
        hasWalletBinding:
          hasWalletConnection ||
          Boolean(
            readStringField(profileRecord, "wallet_address") ||
              readStringField(walletBinding, "address"),
          ),
        hasVerifiedWalletBinding: hasVerifiedWalletConnection,
        hasStoredVerifiedWalletBinding: hasStoredVerifiedWalletConnection,
      }).readiness,
    [
      hasGitHubConnection,
      hasStoredVerifiedWalletConnection,
      hasValidGitHubConnection,
      hasVerifiedWalletConnection,
      hasWalletConnection,
      profileRecord,
      repositoryContext,
      user,
      walletBinding,
    ],
  );

  const sourcePathHints = useMemo(
    () =>
      sourcePathHintsText
        .split(/\r?\n|,/u)
        .map((entry) => entry.trim())
        .filter(Boolean),
    [sourcePathHintsText],
  );
  const sourceCriticalitySignals = useMemo(
    () => [
      {
        id: "depositor-sub-critical-intent",
        label:
          "Depositor intends this option set to avoid critical source exposure.",
        severity: "sub-critical" as const,
        weight: 0.74,
      },
      ...(sourcePathHints.some((path) =>
        /secret|credential|wallet|auth|key|payment|settlement/iu.test(path),
      )
        ? [
            {
              id: "source-path-sensitive-scope-warning",
              label:
                "Source path hints include sensitive operational terms requiring review.",
              severity: "warning" as const,
              weight: 0.64,
            },
          ]
        : []),
    ],
    [sourcePathHints],
  );
  const hasSubmittedDeposit = useMemo(() => {
    const selectedRepository = repositoryContext?.selectedRepository || null;
    if (!selectedRepository) return false;
    const selectedBranch =
      repositoryContext?.selectedBranch ||
      selectedRepository.defaultBranch ||
      "main";
    return liveRuns.some(
      (run) =>
        run.contextSource === "terminal-deposit-composer" &&
        run.repository === selectedRepository.fullName &&
        run.branch === selectedBranch &&
        Boolean(run.candidateAssetId),
    );
  }, [liveRuns, repositoryContext]);
  const hasDepositoryReadback = useMemo(
    () =>
      liveRuns.some(
        (run) =>
          run.contextSource === "terminal-deposit-composer" &&
          Boolean(
            run.depositorySearchDocumentRoot ||
              run.vectorDocumentRoot ||
              run.compensationPreviewRoot,
          ),
      ),
    [liveRuns],
  );
  const optionReviewDecisionRecords = useMemo<DepositOptionReviewDecision[]>(
    () =>
      Object.entries(optionReviewDecisions).map(([optionId, decision]) => ({
        optionId,
        decision,
        reviewerId: user?.id || preferredSignerAddress || null,
      })),
    [optionReviewDecisions, preferredSignerAddress, user?.id],
  );
  const depositRouteInput = useMemo(
    () => ({
      transactionId: selectedTransactionId || selectedRun?.id || null,
      depositStage: routeDepositStage,
      repositoryFullName:
        repositoryContext?.selectedRepository?.fullName || null,
      sourceBranch: repositoryContext?.selectedBranch || null,
      sourceCommit: repositoryContext?.selectedCommit || null,
      depositorInstructions,
      sourcePathHints,
      depositoryDemandSignals: [
        {
          id: "depository-gap-source-safe-pack-options",
          label:
            "Depository benefits from reviewable source-safe AssetPack supply options.",
          weight: 0.72,
        },
      ],
      readingDemandSignals: [
        {
          id: "reading-demand-fit-ready-source-supply",
          label:
            "Reading demand needs searchable, proof-bearing source supply for Finding Fits.",
          weight: 0.8,
        },
      ],
      existingDepositorySignals: [
        {
          id: "existing-supply-compensation-route",
          label:
            "Existing supply expects proof roots, vector projections, and compensation previews.",
          weight: 0.58,
        },
      ],
      unfitNeedOpportunitySignals: [
        {
          id: "unfit-need-route-proof-supply",
          label:
            "Unfit Reads need more source-safe route proof and delivery supply.",
          weight: 0.82,
        },
        {
          id: "unfit-need-depository-search-supply",
          label:
            "Finding Fits benefits from more indexed Depository implementation patterns.",
          weight: 0.74,
        },
      ],
      sourceCriticalitySignals,
      developmentCostSats: Math.max(1600, 1200 + sourcePathHints.length * 240),
      expectedSettlementSats: Math.max(
        4200,
        3600 + sourcePathHints.length * 360 + liveRuns.length * 90,
      ),
      depositorWalletId: preferredSignerAddress
        ? "connected-depositor-wallet"
        : null,
      walletAuthorityPresent: hasVerifiedWalletConnection,
      actorId: user?.id || null,
      organizationId:
        repositoryContext?.selectedRepository?.owner?.username ||
        repositoryContext?.selectedRepository?.fullName?.split("/")[0] ||
        null,
      teamId: repositoryContext?.selectedRepository?.fullName
        ? `repository:${repositoryContext.selectedRepository.fullName}`
        : null,
      memberId: user?.id || preferredSignerAddress || null,
      organizationRole:
        hasValidGitHubConnection && hasVerifiedWalletConnection
          ? "admin"
          : "member",
      organizationPermissionGrants: [
        "deposit:synthesize_options",
        ...(hasVerifiedWalletConnection
          ? ["deposit:approve_option", "deposit:submit"]
          : []),
      ],
      sourceCriticalityApproved: true,
      reviewerId: user?.id || preferredSignerAddress || null,
      hasRepositorySource: Boolean(repositoryContext?.selectedRepository),
      optionsRequested,
      hasReviewedOption: optionReviewDecisionRecords.length > 0,
      hasSubmittedDeposit,
      hasDepositoryReadback,
    }),
    [
      depositorInstructions,
      hasDepositoryReadback,
      hasSubmittedDeposit,
      hasValidGitHubConnection,
      hasVerifiedWalletConnection,
      liveRuns.length,
      optionsRequested,
      optionReviewDecisionRecords.length,
      preferredSignerAddress,
      repositoryContext,
      routeDepositStage,
      selectedRun?.id,
      selectedTransactionId,
      sourceCriticalitySignals,
      sourcePathHints,
      user?.id,
    ],
  );
  const depositRouteSession = useMemo(
    () =>
      buildDepositRouteSession({
        ...depositRouteInput,
        optionReviewDecisions: optionReviewDecisionRecords,
      }),
    [depositRouteInput, optionReviewDecisionRecords],
  );

  const sessionRows = [
    {
      label: "Repository",
      value:
        depositRouteSession.routeState.repositoryFullName ||
        "select repository",
    },
    {
      label: "Branch",
      value: depositRouteSession.routeState.sourceBranch || "pending",
    },
    {
      label: "Commit",
      value: shortIdentifier(depositRouteSession.routeState.sourceCommit),
    },
    {
      label: "Transaction",
      value: shortIdentifier(depositRouteSession.routeState.transactionId),
    },
    { label: "Pipeline", value: DEPOSIT_OPTION_PIPELINE_ID },
    { label: "Policy", value: DEPOSIT_OPTION_POLICY_ID },
    { label: "Admission", value: DEPOSIT_OPTION_ADMISSION_ID },
    { label: "Earnings", value: DEPOSITOR_EARNING_SUPPLY_INTELLIGENCE_ID },
    {
      label: "Option roots",
      value: String(depositRouteSession.synthesis.roots.optionRoots.length),
    },
    {
      label: "Positive ROI options",
      value: String(depositRouteSession.policy.reviewablePositiveRoiCount),
    },
    {
      label: "Admitted options",
      value: String(depositRouteSession.admission.admittedCount),
    },
    {
      label: "Expected compensation",
      value: formatSats(
        depositRouteSession.earningSupplyIntelligence.aggregate
          .totalExpectedCompensationSats,
      ),
    },
  ];

  const authorityRows = [
    {
      label: "Authority",
      value: depositRouteSession.organizationPolicyWalletAuthority.aggregate.state,
    },
    {
      label: "Wallet",
      value: depositRouteSession.organizationPolicyWalletAuthority.walletAuthority.state,
    },
    {
      label: "Deposit policy",
      value: depositRouteSession.organizationPolicyWalletAuthority.depositApproval.state,
    },
    {
      label: "Required denials",
      value: String(
        depositRouteSession.organizationPolicyWalletAuthority.aggregate
          .requiredDeniedActionCount,
      ),
    },
    {
      label: "Authority root",
      value: depositRouteSession.organizationPolicyWalletAuthority.roots.authorityRoot,
    },
  ];

  const recentDepositRuns = useMemo(
    () =>
      liveRuns
        .filter(
          (run) =>
            run.contextSource === "terminal-deposit-composer" ||
            run.transactionLens === "deposit",
        )
        .slice(0, 6),
    [liveRuns],
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
            "Unable to record Deposit activity.",
          ),
        );
      }

      const payload = (await response.json()) as {
        execution?: PipelineExecution;
      };
      if (!payload.execution)
        throw new Error(
          "Deposit activity response did not include an execution row.",
        );

      const nextRun = mapExecutionHistoryRunToWorkspaceRun(payload.execution);
      setLiveRuns((currentRuns) => upsertWorkspaceRun(currentRuns, nextRun));
      if (draft.selectAfterRecord !== false)
        replaceDepositRouteTransaction(nextRun.id);
      void refreshLiveRuns();
      return nextRun;
    },
    [
      refreshLiveRuns,
      replaceDepositRouteTransaction,
      repositoryContext,
      selectedRun,
    ],
  );

  const handleOptionReviewDecision = useCallback(
    async (optionId: string, decision: DepositOptionReviewDecisionState) => {
      const nextDecisions = {
        ...optionReviewDecisions,
        [optionId]: decision,
      };
      setOptionsRequested(true);
      setOptionReviewDecisions(nextDecisions);

      const nextDecisionRecords = Object.entries(nextDecisions).map(
        ([entryOptionId, entryDecision]) => ({
          optionId: entryOptionId,
          decision: entryDecision,
          reviewerId: user?.id || preferredSignerAddress || null,
        }),
      );
      const nextSession = buildDepositRouteSession({
        ...depositRouteInput,
        optionsRequested: true,
        hasReviewedOption: true,
        optionReviewDecisions: nextDecisionRecords,
      });
      const receipt = nextSession.admission.receipts.find(
        (entry) => entry.optionId === optionId,
      );
      const admitted = receipt?.admission.state === "admitted-to-depository";
      replaceDepositSearchParams(
        writeDepositRouteStage(
          readCurrentSearchParams(),
          admitted ? "read-depository-state" : "review-options",
        ),
      );

      if (!receipt) return;

      try {
        await handleRecordActivity({
          type: admitted
            ? "pipeline:deposit-option-admission"
            : "pipeline:deposit-option-review",
          status: "completed",
          summary: admitted
            ? `Admitted ${receipt.title} to the Depository.`
            : `Recorded ${decision.replace(/-/g, " ")} for ${receipt.title}.`,
          selectAfterRecord: admitted,
          output: {
            assetPackTitle: receipt.title,
            depositAdmission: nextSession.admission,
            admissionState: receipt.admission.state,
            depositoryAssetPackId: receipt.admission.depositoryAssetPackId,
            compensationState: receipt.compensationPreview.state,
            packActivitySyncState: receipt.packsActivitySync.state,
            packsActivityRoot: receipt.packsActivitySync.activityRoot,
          },
          context: {
            source: "deposit-option-review-admission",
            workbench: "deposit-option-review",
            optionId,
            reviewDecision: decision,
            admissionState: receipt.admission.state,
            depositoryAssetPackId: receipt.admission.depositoryAssetPackId,
            compensationState: receipt.compensationPreview.state,
            packActivitySyncState: receipt.packsActivitySync.state,
            packActivityType: receipt.packsActivitySync.activityType,
            packsRoute: receipt.packsActivitySync.route,
          },
        });
      } catch (error) {
        setRunsLoadError(
          error instanceof Error
            ? error.message
            : "Unable to record deposit option review.",
        );
      }
    },
    [
      depositRouteInput,
      handleRecordActivity,
      optionReviewDecisions,
      preferredSignerAddress,
      readCurrentSearchParams,
      replaceDepositSearchParams,
      user?.id,
    ],
  );

  const handleRepositorySourceBranchChange = useCallback(
    (branch: string) => {
      const nextParams = readCurrentSearchParams();
      if (repositoryContext?.provider)
        nextParams.set("provider", repositoryContext.provider);
      if (repositoryContext?.selectedRepository?.fullName)
        nextParams.set("repo", repositoryContext.selectedRepository.fullName);
      nextParams.set("sourceBranch", branch);
      nextParams.delete("sourceCommit");
      nextParams.delete("branch");
      nextParams.delete("commit");
      replaceDepositSearchParams(nextParams);
    },
    [readCurrentSearchParams, replaceDepositSearchParams, repositoryContext],
  );

  const handleRepositorySourceCommitChange = useCallback(
    (commit: string) => {
      const nextParams = readCurrentSearchParams();
      if (repositoryContext?.provider)
        nextParams.set("provider", repositoryContext.provider);
      if (repositoryContext?.selectedRepository?.fullName)
        nextParams.set("repo", repositoryContext.selectedRepository.fullName);
      if (repositoryContext?.selectedBranch)
        nextParams.set("sourceBranch", repositoryContext.selectedBranch);
      nextParams.set("sourceCommit", commit);
      nextParams.delete("branch");
      nextParams.delete("commit");
      replaceDepositSearchParams(nextParams);
    },
    [readCurrentSearchParams, replaceDepositSearchParams, repositoryContext],
  );

  return (
    <TerminalShellBridgeProvider>
      <ProductRouteShell
        testId="route-shell-deposit"
        tone="emerald"
        label="Deposit"
        title="Depositing"
        summary="Source -> Options -> Review -> Admission -> Depository."
        icon={Boxes}
        metrics={[
          {
            label: "Stage",
            value: depositRouteSession.activeStepId.replace(/-/g, " "),
          },
          {
            label: "Options",
            value: depositRouteSession.synthesis.optionCount,
          },
          { label: "Boundary", value: "source-safe" },
          {
            label: "Earning estimate",
            value: formatSats(
              depositRouteSession.earningSupplyIntelligence.aggregate
                .totalExpectedCompensationSats,
            ),
          },
        ]}
      >
        <ProductRouteStepGrid
          ariaLabel="Deposit steps"
          activeStepId={depositRouteSession.activeStepId}
          steps={depositRouteSession.steps}
          tone="emerald"
          testIdPrefix="deposit-route-step"
          stateDataAttribute="data-deposit-step-state"
          onSelect={(stepId) =>
            replaceDepositSearchParams(
              writeDepositRouteStage(readCurrentSearchParams(), stepId),
            )
          }
        />

        <ProductRouteEnterpriseSummary
          testId="deposit-enterprise-economic-summary"
          tone="emerald"
          title="Depositing economy overview"
          metrics={[
            {
              label: "Options",
              value: String(depositRouteSession.synthesis.optionCount),
              state: "source-safe",
              description: "Reviewable AssetPack supply options.",
            },
            {
              label: "Positive ROI",
              value: String(depositRouteSession.policy.reviewablePositiveRoiCount),
              state: "estimate",
              description: "Options whose expected settlement exceeds cost.",
            },
            {
              label: "Admitted",
              value: String(depositRouteSession.admission.admittedCount),
              state: "Depository",
              description: "Approved options ready for source-safe indexing.",
            },
            {
              label: "Authority",
              value:
                depositRouteSession.organizationPolicyWalletAuthority.aggregate
                  .state,
              state:
                depositRouteSession.organizationPolicyWalletAuthority
                  .walletAuthority.state,
              description: "Deposit policy, wallet, and critical-source checks.",
            },
          ]}
        />

        <section className="grid gap-5 xl:grid-cols-[minmax(0,1.45fr)_minmax(380px,0.55fr)]">
          <div className="grid min-w-0 gap-5">
            <div className="grid gap-5 xl:grid-cols-2">
              <TerminalRepositoryContextPanel
                preferredRepository={selectedRun?.repository || null}
                onContextChange={setRepositoryContext}
                onRecordActivity={handleRecordActivity}
                routePath={DEPOSIT_ROUTE}
                buildRouteHref={buildDepositHref}
              />
              <section className="border border-white/10 bg-white/[0.035] px-4 py-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[0.68rem] uppercase tracking-[0.22em] text-emerald-200/80">
                      Option synthesis
                    </p>
                    <h2 className="mt-2 text-lg font-semibold text-white">
                      Depositor instruction
                    </h2>
                  </div>
                  <Sparkles
                    className="h-5 w-5 text-emerald-200"
                    aria-hidden="true"
                  />
                </div>
                <label className="mt-4 block">
                  <span className="text-[0.62rem] uppercase tracking-[0.16em] text-neutral-500">
                    Instructions
                  </span>
                  <textarea
                    value={depositorInstructions}
                    onChange={(event) =>
                      setDepositorInstructions(event.target.value)
                    }
                    className="mt-2 min-h-[8rem] w-full border border-white/10 bg-black/30 px-3 py-3 text-sm leading-6 text-neutral-100 outline-none transition focus:border-emerald-300/35"
                  />
                </label>
                <label className="mt-4 block">
                  <span className="text-[0.62rem] uppercase tracking-[0.16em] text-neutral-500">
                    Source path hints
                  </span>
                  <textarea
                    value={sourcePathHintsText}
                    onChange={(event) =>
                      setSourcePathHintsText(event.target.value)
                    }
                    className="mt-2 min-h-[6rem] w-full border border-white/10 bg-black/30 px-3 py-3 font-mono text-xs leading-5 text-neutral-100 outline-none transition focus:border-emerald-300/35"
                  />
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setOptionsRequested(true);
                    replaceDepositSearchParams(
                      writeDepositRouteStage(
                        readCurrentSearchParams(),
                        "review-options",
                      ),
                    );
                  }}
                  className="mt-4 inline-flex w-full items-center justify-center border border-emerald-300/25 bg-emerald-300/12 px-4 py-3 text-sm font-medium text-emerald-100 transition hover:border-emerald-200/45 hover:bg-emerald-300/18"
                >
                  Synthesize options
                </button>
              </section>
            </div>

            <TerminalSupplySelectionPanel
              repositoryContext={repositoryContext}
              onRecordActivity={handleRecordActivity}
              buildRouteHref={buildDepositHref}
            />

            <section
              className="border border-white/10 bg-white/[0.035] px-4 py-4"
              aria-label="Deposit AssetPack options"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-[0.68rem] uppercase tracking-[0.22em] text-emerald-200/80">
                    Options
                  </p>
                  <h2 className="mt-2 text-lg font-semibold text-white">
                    Source-safe AssetPack proposals
                  </h2>
                  <p className="mt-2 max-w-3xl text-sm leading-6 text-neutral-400">
                    Criticality, demand, ROI, BTD potential, compensation.
                  </p>
                </div>
                <span className="border border-emerald-300/15 bg-emerald-300/10 px-3 py-2 text-[0.62rem] uppercase tracking-[0.16em] text-emerald-100">
                  {depositRouteSession.synthesis.pipeline}
                </span>
              </div>
              <div className="mt-5 grid gap-3 xl:grid-cols-3">
                {depositRouteSession.synthesis.options.map((option) => {
                  const reviewDecision =
                    optionReviewDecisions[option.optionId] ||
                    "pending-depositor-review";
                  const reviewed =
                    reviewDecision !== "pending-depositor-review";
                  const policyEvaluation =
                    depositRouteSession.policy.evaluations.find(
                      (evaluation) => evaluation.optionId === option.optionId,
                    );
                  const admissionReceipt =
                    depositRouteSession.admission.receipts.find(
                      (receipt) => receipt.optionId === option.optionId,
                    );
                  const earningStatement =
                    depositRouteSession.earningSupplyIntelligence.earningStatements.find(
                      (statement) => statement.optionId === option.optionId,
                    );
                  const supplyRecommendation =
                    depositRouteSession.earningSupplyIntelligence.supplyRecommendations.find(
                      (recommendation) =>
                        recommendation.optionId === option.optionId,
                    );
                  return (
                    <article
                      key={option.optionId}
                      data-testid={`deposit-option-${option.kind}`}
                      className={`grid gap-4 border px-4 py-4 ${
                        reviewed
                          ? "border-emerald-300/38 bg-emerald-300/10"
                          : "border-white/10 bg-black/20"
                      }`}
                    >
                      <div>
                        <p className="text-[0.6rem] uppercase tracking-[0.16em] text-neutral-500">
                          {option.kind}
                        </p>
                        <h3 className="mt-2 text-base font-semibold text-white">
                          {option.title}
                        </h3>
                        <p className="mt-2 text-sm leading-6 text-neutral-400">
                          {option.summary}
                        </p>
                      </div>
                      <dl className="grid gap-2">
                        {policyEvaluation ? (
                          <>
                            <div className="border border-emerald-300/15 bg-emerald-300/[0.04] px-3 py-2">
                              <dt className="text-[0.58rem] uppercase tracking-[0.14em] text-neutral-500">
                                Policy
                              </dt>
                              <dd className="mt-1 text-sm text-emerald-100">
                                {policyEvaluation.policyDecision}
                              </dd>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              <div className="border border-white/8 bg-white/[0.035] px-3 py-2">
                                <dt className="text-[0.58rem] uppercase tracking-[0.14em] text-neutral-500">
                                  Criticality
                                </dt>
                                <dd className="mt-1 text-sm text-neutral-200">
                                  {policyEvaluation.sourceCriticality.state}
                                </dd>
                              </div>
                              <div className="border border-white/8 bg-white/[0.035] px-3 py-2">
                                <dt className="text-[0.58rem] uppercase tracking-[0.14em] text-neutral-500">
                                  Demand
                                </dt>
                                <dd className="mt-1 text-sm text-neutral-200">
                                  {policyEvaluation.demand.state}
                                </dd>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              <div className="border border-white/8 bg-white/[0.035] px-3 py-2">
                                <dt className="text-[0.58rem] uppercase tracking-[0.14em] text-neutral-500">
                                  ROI
                                </dt>
                                <dd className="mt-1 text-sm text-neutral-200">
                                  {policyEvaluation.roi.state} /{" "}
                                  {policyEvaluation.roi.expectedNetSats} sats
                                  net
                                </dd>
                              </div>
                              <div className="border border-white/8 bg-white/[0.035] px-3 py-2">
                                <dt className="text-[0.58rem] uppercase tracking-[0.14em] text-neutral-500">
                                  BTD potential
                                </dt>
                                <dd className="mt-1 text-sm text-neutral-200">
                                  {policyEvaluation.btdPotential.state}
                                </dd>
                              </div>
                            </div>
                            <div className="border border-white/8 bg-white/[0.035] px-3 py-2">
                              <dt className="text-[0.58rem] uppercase tracking-[0.14em] text-neutral-500">
                                Compensation
                              </dt>
                              <dd className="mt-1 text-sm text-neutral-200">
                                {policyEvaluation.compensation.state} / BTC
                                source-to-shares preview
                              </dd>
                            </div>
                            {admissionReceipt ? (
                              <div className="border border-white/8 bg-white/[0.035] px-3 py-2">
                                <dt className="text-[0.58rem] uppercase tracking-[0.14em] text-neutral-500">
                                  Admission
                                </dt>
                                <dd className="mt-1 text-sm text-neutral-200">
                                  {admissionReceipt.admission.state} /{" "}
                                  {admissionReceipt.packsActivitySync.state}
                                </dd>
                              </div>
                            ) : null}
                            {earningStatement ? (
                              <div className="border border-white/8 bg-white/[0.035] px-3 py-2">
                                <dt className="text-[0.58rem] uppercase tracking-[0.14em] text-neutral-500">
                                  Earning estimate
                                </dt>
                                <dd className="mt-1 text-sm text-neutral-200">
                                  {
                                    earningStatement
                                      .expectedCompensationRangeSats.low
                                  }
                                  -{
                                    earningStatement
                                      .expectedCompensationRangeSats.high
                                  }{" "}
                                  sats / {earningStatement.state}
                                </dd>
                              </div>
                            ) : null}
                            {supplyRecommendation ? (
                              <div className="border border-white/8 bg-white/[0.035] px-3 py-2">
                                <dt className="text-[0.58rem] uppercase tracking-[0.14em] text-neutral-500">
                                  Recommendation
                                </dt>
                                <dd className="mt-1 text-sm text-neutral-200">
                                  {supplyRecommendation.action}
                                </dd>
                              </div>
                            ) : null}
                          </>
                        ) : null}
                        {option.measurements.map((measurement) => (
                          <div
                            key={measurement.id}
                            className="border border-white/8 bg-white/[0.035] px-3 py-2"
                          >
                            <dt className="text-[0.58rem] uppercase tracking-[0.14em] text-neutral-500">
                              {measurement.label}
                            </dt>
                            <dd className="mt-1 text-sm text-neutral-200">
                              {(measurement.volume * 100).toFixed(0)}% / weight{" "}
                              {measurement.weight.toFixed(2)}
                            </dd>
                          </div>
                        ))}
                      </dl>
                      <details className="border border-emerald-300/15 bg-emerald-300/[0.04] px-3 py-3">
                        <summary className="cursor-pointer text-[0.62rem] uppercase tracking-[0.16em] text-emerald-100/85">
                          Option roots
                        </summary>
                        <dl className="mt-2 grid gap-2">
                          {Object.entries(option.roots).map(
                            ([label, value]) => (
                              <div key={label}>
                                <dt className="text-[0.56rem] uppercase tracking-[0.12em] text-neutral-500">
                                  {label}
                                </dt>
                                <dd className="break-all font-mono text-[0.66rem] text-neutral-300">
                                  {value}
                                </dd>
                              </div>
                            ),
                          )}
                        </dl>
                      </details>
                      <div className="grid gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            void handleOptionReviewDecision(
                              option.optionId,
                              "approved-for-admission",
                            );
                          }}
                          className="border border-emerald-300/25 bg-emerald-300/12 px-4 py-3 text-sm font-medium text-emerald-100 transition hover:border-emerald-200/45 hover:bg-emerald-300/18"
                        >
                          {reviewDecision === "approved-for-admission"
                            ? "Approved for Depository"
                            : "Approve for Depository"}
                        </button>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              void handleOptionReviewDecision(
                                option.optionId,
                                "rejected-by-depositor",
                              );
                            }}
                            className="border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-medium text-neutral-200 transition hover:border-red-300/30 hover:bg-red-300/10"
                          >
                            {reviewDecision === "rejected-by-depositor"
                              ? "Rejected"
                              : "Reject"}
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              void handleOptionReviewDecision(
                                option.optionId,
                                "resynthesis-requested",
                              );
                            }}
                            className="border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-medium text-neutral-200 transition hover:border-amber-300/30 hover:bg-amber-300/10"
                          >
                            {reviewDecision === "resynthesis-requested"
                              ? "Resynthesis queued"
                              : "Resynthesize"}
                          </button>
                        </div>
                        <p className="text-[0.66rem] uppercase tracking-[0.14em] text-neutral-500">
                          {reviewed
                            ? reviewDecision.replace(/-/g, " ")
                            : "Pending depositor review"}
                        </p>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>

            <TerminalDepositComposer
              onRecordActivity={handleRecordActivity}
              repositoryAnchor={
                repositoryContext?.selectedRepository?.fullName || null
              }
              repositoryProvider={repositoryContext?.provider || null}
              repositoryBranch={repositoryContext?.selectedBranch || null}
              repositoryCommit={repositoryContext?.selectedCommit || null}
              repositoryBranches={repositoryContext?.branches || []}
              repositoryCommits={repositoryContext?.commits || []}
              isLoadingRepositoryBranches={
                repositoryContext?.isLoadingBranches || false
              }
              isLoadingRepositoryCommits={
                repositoryContext?.isLoadingCommits || false
              }
              onRepositorySourceBranchChange={
                handleRepositorySourceBranchChange
              }
              onRepositorySourceCommitChange={
                handleRepositorySourceCommitChange
              }
              transactionReadiness={transactionReadiness}
              showDemonstrationDraft={false}
              preferredSignerAddress={preferredSignerAddress}
              preferredSignerLabel={preferredSignerLabel}
              preferredSignerProvider={walletConnectionStatus?.provider || null}
            />
          </div>

          <aside className="grid h-fit gap-5" aria-label="Deposit route state">
            <ProductRouteKeyboardHint
              testId="deposit-keyboard-navigation"
              tone="emerald"
              shortcuts={[
                {
                  keys: "Tab",
                  label:
                    "Move through deposit stages, option actions, and source controls.",
                },
                {
                  keys: "Enter",
                  label: "Activate focused stage, option review, or route action.",
                },
                {
                  keys: "Space",
                  label: "Open or close source-safe proof detail.",
                },
              ]}
            />

            <section className="border border-white/10 bg-white/[0.035] px-4 py-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[0.68rem] uppercase tracking-[0.22em] text-emerald-200/80">
                    Earnings
                  </p>
                  <h2 className="mt-2 text-lg font-semibold text-white">
                    Supply opportunity
                  </h2>
                </div>
                <TrendingUp
                  className="h-5 w-5 text-emerald-200"
                  aria-hidden="true"
                />
              </div>
              <dl className="mt-4 grid gap-2">
                <div className="border border-emerald-300/15 bg-emerald-300/[0.04] px-3 py-2">
                  <dt className="text-[0.58rem] uppercase tracking-[0.14em] text-neutral-500">
                    Likely demand
                  </dt>
                  <dd className="mt-1 text-sm text-emerald-100">
                    {depositRouteSession.earningSupplyIntelligence.likelyDemand.state} /{" "}
                    {Math.round(
                      depositRouteSession.earningSupplyIntelligence.likelyDemand
                        .averageConfidence * 100,
                    )}
                    %
                  </dd>
                </div>
                <div className="border border-white/8 bg-black/20 px-3 py-2">
                  <dt className="text-[0.58rem] uppercase tracking-[0.14em] text-neutral-500">
                    Unfit Need opportunities
                  </dt>
                  <dd className="mt-1 text-sm text-neutral-200">
                    {
                      depositRouteSession.earningSupplyIntelligence
                        .unfitNeedOpportunities.opportunityCount
                    }{" "}
                    /{" "}
                    {
                      depositRouteSession.earningSupplyIntelligence
                        .unfitNeedOpportunities.state
                    }
                  </dd>
                </div>
                <div className="border border-white/8 bg-black/20 px-3 py-2">
                  <dt className="text-[0.58rem] uppercase tracking-[0.14em] text-neutral-500">
                    Expected compensation
                  </dt>
                  <dd className="mt-1 text-sm text-neutral-200">
                    {formatSats(
                      depositRouteSession.earningSupplyIntelligence.aggregate
                        .expectedCompensationRangeSats.low,
                    )}{" "}
                    -{" "}
                    {formatSats(
                      depositRouteSession.earningSupplyIntelligence.aggregate
                        .expectedCompensationRangeSats.high,
                    )}
                  </dd>
                </div>
                <div className="border border-white/8 bg-black/20 px-3 py-2">
                  <dt className="text-[0.58rem] uppercase tracking-[0.14em] text-neutral-500">
                    Supply recommendations
                  </dt>
                  <dd className="mt-1 text-sm text-neutral-200">
                    {
                      depositRouteSession.earningSupplyIntelligence.aggregate
                        .sourceSafeSupplyRecommendationCount
                    }{" "}
                    approve-ready /{" "}
                    {
                      depositRouteSession.earningSupplyIntelligence.aggregate
                        .repairRequiredCount
                    }{" "}
                    repair
                  </dd>
                </div>
              </dl>
              <details className="mt-3 border border-emerald-300/15 bg-emerald-300/[0.04] px-3 py-3">
                <summary className="cursor-pointer text-[0.62rem] uppercase tracking-[0.16em] text-emerald-100/85">
                  Opportunity roots
                </summary>
                <dl className="mt-2 grid gap-2">
                  {depositRouteSession.earningSupplyIntelligence.unfitNeedOpportunities.opportunities.map(
                    (opportunity) => (
                      <div key={opportunity.id}>
                        <dt className="text-[0.56rem] uppercase tracking-[0.12em] text-neutral-500">
                          {opportunity.label}
                        </dt>
                        <dd className="break-all font-mono text-[0.66rem] text-neutral-300">
                          {opportunity.opportunityRoot}
                        </dd>
                      </div>
                    ),
                  )}
                </dl>
              </details>
            </section>

            <section className="border border-white/10 bg-white/[0.035] px-4 py-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[0.68rem] uppercase tracking-[0.22em] text-emerald-200/80">
                    Governance
                  </p>
                  <h2 className="mt-2 text-lg font-semibold text-white">
                    Organization authority
                  </h2>
                </div>
                <ShieldCheck
                  className="h-5 w-5 text-emerald-200"
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
              {depositRouteSession.organizationPolicyWalletAuthority.aggregate
                .blockers.length ? (
                <div className="mt-3">
                  <ProductRouteDisclosure
                    title="Authority blockers"
                    tone="emerald"
                  >
                    {depositRouteSession.organizationPolicyWalletAuthority.aggregate.blockers.join(
                      "; ",
                    )}
                  </ProductRouteDisclosure>
                </div>
              ) : null}
            </section>

            <section className="border border-white/10 bg-white/[0.035] px-4 py-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[0.68rem] uppercase tracking-[0.22em] text-emerald-200/80">
                    Session
                  </p>
                  <h2 className="mt-2 text-lg font-semibold text-white">
                    Source-safe deposit state
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
                <ProductRouteDisclosure
                  title="Disclosure boundary"
                  tone="emerald"
                >
                  Visible: measurements, demand roots, source path roots, policy
                  roots, estimated ROI, BTD potential, compensation metadata.
                  Withheld: raw source, unpaid AssetPack source, prompts,
                  provider responses, settlement private payloads, wallet
                  private material.
                </ProductRouteDisclosure>
              </div>
              <div className="mt-3">
                <ProductRouteProofDetail
                  testId="deposit-expandable-proof-detail"
                  title="Deposit proof detail"
                  tone="emerald"
                  roots={[
                    {
                      id: "route-session-root",
                      label: "Route session root",
                      root: depositRouteSession.proofRoot,
                    },
                    {
                      id: "synthesis-root",
                      label: "Synthesis root",
                      root: depositRouteSession.synthesis.roots.synthesisRoot,
                    },
                    {
                      id: "policy-root",
                      label: "Policy root",
                      root: depositRouteSession.policy.roots.policyReportRoot,
                    },
                    {
                      id: "admission-root",
                      label: "Admission root",
                      root:
                        depositRouteSession.admission.roots.admissionReportRoot,
                    },
                    {
                      id: "earning-root",
                      label: "Earning intelligence root",
                      root:
                        depositRouteSession.earningSupplyIntelligence.roots
                          .intelligenceRoot,
                    },
                    {
                      id: "authority-root",
                      label: "Authority root",
                      root:
                        depositRouteSession.organizationPolicyWalletAuthority
                          .roots.authorityRoot,
                    },
                  ]}
                />
              </div>
            </section>

            <section className="border border-white/10 bg-white/[0.035] px-4 py-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[0.68rem] uppercase tracking-[0.22em] text-neutral-500">
                    Readback
                  </p>
                  <h2 className="mt-2 text-lg font-semibold text-white">
                    Recent Deposit activity
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    void refreshLiveRuns();
                  }}
                  className="inline-flex h-9 w-9 items-center justify-center border border-white/10 bg-white/[0.04] text-neutral-200 transition hover:border-emerald-300/30 hover:bg-emerald-300/10"
                  aria-label="Refresh Deposit activity"
                >
                  <RefreshCw className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
              {runsLoadError ? (
                <div className="mt-3">
                  <ProductRouteStatePanel
                    compact
                    variant="error"
                    title="Deposit activity unavailable"
                    message={runsLoadError}
                  />
                </div>
              ) : null}
              <div className="mt-4 grid gap-2">
                {recentDepositRuns.length ? (
                  recentDepositRuns.map((run) => (
                    <Link
                      key={run.id}
                      href={buildDepositHref(
                        writeTerminalTransactionId(
                          readCurrentSearchParams(),
                          run.id,
                        ),
                      )}
                      className="border border-white/8 bg-black/20 px-3 py-3 transition hover:border-emerald-300/25 hover:bg-emerald-300/[0.05]"
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
                        ? "Loading Deposit activity"
                        : "No Deposit activity"
                    }
                    message={
                      isLoadingRuns
                        ? "Recent pipeline rows are loading."
                        : "Connect source and synthesize reviewable options."
                    }
                  />
                )}
              </div>
              <Link
                href="/packs?type=depository-assetpack"
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
