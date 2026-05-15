'use client';

import { useMemo, useState } from 'react';

import BitcodeMetricGrid from '@/components/base/bitcode/execution/BitcodeMetricGrid';

import TerminalActionWorkbenchCard from './TerminalActionWorkbenchCard';
import TerminalWorkspaceCard from './TerminalWorkspaceCard';
import {
  buildTerminalFitWorkbenchDraft,
  buildTerminalDepositWorkbenchDraft,
  buildTerminalReadMeasurementDraft,
  type TerminalActivityRecordDraft,
} from './terminal-activity-history';
import { TERMINAL_WORKSPACE_EXPLAINERS } from './terminal-workspace-explainers';
import type { TerminalRepositoryContextState } from './terminal-repository-context';
import {
  normalizeTerminalDepositReadWorkbench,
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

interface TerminalDepositReadWorkbenchProps {
  repositoryContext?: TerminalRepositoryContextState | null;
  onRecordActivity?: (draft: TerminalActivityRecordDraft) => Promise<unknown>;
  showDemonstrationWorkbench?: boolean;
}

export default function TerminalDepositReadWorkbench({
  repositoryContext = null,
  onRecordActivity,
  showDemonstrationWorkbench = true,
}: TerminalDepositReadWorkbenchProps) {
  const { snapshot } = useTerminalShellBridge();
  const [recordingKey, setRecordingKey] = useState<'deposit' | 'read' | 'fit' | null>(null);
  const [recordMessage, setRecordMessage] = useState<string | null>(null);
  const workbenchSnapshot = useMemo(() => {
    if (showDemonstrationWorkbench) return snapshot;

    const selectedRepository = repositoryContext?.selectedRepository || null;
    if (!selectedRepository) return null;

    const providerAccount =
      repositoryContext?.connectionStatus?.username ||
      repositoryContext?.connectionStatus?.metadata?.account ||
      selectedRepository.owner.username ||
      'connected account';

    return {
      canonLabel: 'Live Bitcode staging posture',
      selection: {
        projectionPrincipal: 'buyer',
        branchMode: 'patch',
        scenarioId: '',
        authSessionId: `${repositoryContext?.provider || 'github'}:${providerAccount}:${selectedRepository.fullName}`,
        selectedInventoryEntryIds: [selectedRepository.id],
      },
      repoSupplySummary: {
        repoCount: repositoryContext?.repositories.length || 1,
        inventoryEntryCount: repositoryContext?.repositories.length || 1,
        scenarioCount: 0,
        candidateAssetCount: 0,
      },
      scenario: {
        scenarioId: '',
        scenarioFamily: 'Read pending after deposit',
        repo: selectedRepository.fullName,
        task: '',
        profileShortLabel: 'pending',
      },
      authSession: {
        authSessionId: `${repositoryContext?.provider || 'github'}:${providerAccount}:${selectedRepository.fullName}`,
        repo: selectedRepository.fullName,
        installationAccountLogin: providerAccount,
        defaultRef: selectedRepository.defaultBranch || 'main',
      },
      inventory: {
        activeCount: repositoryContext?.repositories.length || 1,
        filteredCount: repositoryContext?.repositories.length || 1,
        selectedCount: 1,
        selectedEntries: [
          {
            inventoryEntryId: selectedRepository.id,
            title: selectedRepository.fullName,
            artifactKind: selectedRepository.language || 'repository',
            originKind: 'repository',
            sourcePath: selectedRepository.url,
          },
        ],
      },
      depositingSurface: {
        depositIntentSummary:
          'Live repository supply is selected for deposit before any measured Read or fit can be evaluated.',
        depositProfile: 'pending',
        repoSupplyRef: selectedRepository.fullName,
        selectedInventoryRefs: [selectedRepository.id],
        selectedArtifactKindCounts: { [selectedRepository.language || 'repository']: 1 },
        selectedOriginKindCounts: { repository: 1 },
        addressingRoot: `repository:${selectedRepository.id}`,
        authRoot: `${providerAccount} · ${repositoryContext?.provider || 'github'}`,
      },
      readingSurface: {
        parserKind: 'pending',
        readId: '',
        readSummary: 'Record the deposit first, then measure a Read against the selected source supply.',
        taskSummary: '',
        closureCriteria: [],
        failureModes: [],
        targetArtifactKinds: [],
      },
      fitSurface: {
        fitSummary: 'Fit remains pending until a Read has been measured after deposit.',
        normalizationPressure: 'pending',
        decisiveKinds: [],
        overlapKinds: [],
        branchIntentSummary: '',
        proofIntentSummary: '',
        settlementIntentSummary: '',
      },
    };
  }, [repositoryContext, showDemonstrationWorkbench, snapshot]);
  const workbench = useMemo<TerminalDepositReadWorkbenchState | null>(
    () => normalizeTerminalDepositReadWorkbench(workbenchSnapshot, repositoryContext),
    [repositoryContext, workbenchSnapshot],
  );

  const selectedEntryChips = useMemo(() => {
    if (!workbench?.deposit.selectedEntries.length) return [];
    return workbench.deposit.selectedEntries.slice(0, 6).map((entry) => entry.label);
  }, [workbench]);

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
          buildTerminalReadMeasurementDraft({
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
          }),
        );
        setRecordMessage('Read-measurement posture recorded into the Bitcode activity ledger.');
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
          actionLabel="Focus read scenarios"
          actionTarget="terminalReadScenarios"
          secondaryActionLabel={recordingKey === 'read' ? 'Recording…' : 'Record read posture'}
          secondaryActionDisabled={recordingKey !== null}
          onSecondaryAction={() => {
            void handleRecord('read');
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
