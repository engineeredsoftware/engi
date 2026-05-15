'use client';

import React, { useEffect, useMemo, useState } from 'react';
import type { VCSProviderType } from '@bitcode/vcs-core';

import BitcodeChipCloud from '@/components/base/bitcode/execution/BitcodeChipCloud';
import BitcodeInlineExplainer from '@/components/base/bitcode/execution/BitcodeInlineExplainer';
import BitcodeMetricGrid from '@/components/base/bitcode/execution/BitcodeMetricGrid';

import TerminalWorkspaceCard from './TerminalWorkspaceCard';
import {
  type TerminalActivityRecordDraft,
  readTerminalRouteError,
} from './terminal-activity-history';
import {
  TERMINAL_INLINE_EXPLAINERS,
  TERMINAL_WORKSPACE_EXPLAINERS,
} from './terminal-workspace-explainers';
import {
  normalizeTerminalDepositComposer,
  type TerminalDepositComposerState,
} from './terminal-deposit-composer';
import { useTerminalShellBridge } from './terminal-shell-bridge';
import { jumpToShellSection } from './terminal-shell-reading';
import type { BitcodeTransactionReadiness } from './bitcode-transaction-readiness';

type SubmitState =
  | { kind: 'idle' }
  | { kind: 'submitting' }
  | { kind: 'success'; message: string }
  | { kind: 'error'; message: string };

interface TerminalDepositComposerProps {
  onRecordActivity?: (draft: TerminalActivityRecordDraft) => Promise<unknown>;
  repositoryAnchor?: string | null;
  repositoryProvider?: VCSProviderType | null;
  transactionReadiness: BitcodeTransactionReadiness;
  showDemonstrationDraft?: boolean;
}

export default function TerminalDepositComposer({
  onRecordActivity,
  repositoryAnchor,
  repositoryProvider,
  transactionReadiness,
  showDemonstrationDraft = true,
}: TerminalDepositComposerProps) {
  const { snapshot, runControl } = useTerminalShellBridge();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [artifactKind, setArtifactKind] = useState('');
  const [artifactType, setArtifactType] = useState('');
  const [sourceRepo, setSourceRepo] = useState('');
  const [sourceCommit, setSourceCommit] = useState('');
  const [workflowRunId, setWorkflowRunId] = useState('');
  const [signerAddress, setSignerAddress] = useState('');
  const [visualPreview, setVisualPreview] = useState('');
  const [workingNote, setWorkingNote] = useState('');
  const [tags, setTags] = useState('');
  const [content, setContent] = useState('');
  const [submitState, setSubmitState] = useState<SubmitState>({ kind: 'idle' });
  const repositoryAnchorValue = String(repositoryAnchor || '').trim();
  const usesLiveRepositoryAnchor = Boolean(repositoryAnchorValue);
  const composer = useMemo<TerminalDepositComposerState | null>(
    () => {
      if (!showDemonstrationDraft && repositoryAnchorValue) {
        return {
          authSessionId: `${repositoryProvider || 'github'}:${repositoryAnchorValue}`,
          sourceRepo: repositoryAnchorValue,
          signerAddress: '',
          selectedInventoryEntryIds: [],
          selectedEntries: [],
          selectedCount: 1,
        };
      }

      return normalizeTerminalDepositComposer(showDemonstrationDraft ? snapshot : null);
    },
    [repositoryAnchorValue, repositoryProvider, showDemonstrationDraft, snapshot],
  );
  const effectiveAuthSessionId = usesLiveRepositoryAnchor
    ? `${repositoryProvider || 'github'}:${repositoryAnchorValue}`
    : composer?.authSessionId || '';
  const selectedSupplyCount = usesLiveRepositoryAnchor ? 1 : composer?.selectedCount || 0;
  const selectedInventoryEntryIds = usesLiveRepositoryAnchor ? [] : composer?.selectedInventoryEntryIds || [];
  const displayedSourceRepo = usesLiveRepositoryAnchor ? repositoryAnchorValue : sourceRepo;

  useEffect(() => {
    setSignerAddress((current) => current || composer?.signerAddress || '');
    if (repositoryAnchorValue) {
      setSourceRepo(repositoryAnchorValue);
      return;
    }
    setSourceRepo((current) => current || composer?.sourceRepo || '');
  }, [composer?.signerAddress, composer?.sourceRepo, repositoryAnchorValue]);

  const selectedEntryLabels = useMemo(() => {
    if (repositoryAnchorValue) return [repositoryAnchorValue];
    return composer?.selectedEntries.slice(0, 5).map((entry) => entry.title) || [];
  }, [composer, repositoryAnchorValue]);
  const settlementReady = transactionReadiness.canSettle;

  const canSubmit = Boolean(
    composer &&
      (selectedSupplyCount > 0 || content.trim()) &&
      (title.trim() || selectedSupplyCount > 0) &&
      (author.trim() || effectiveAuthSessionId) &&
      settlementReady,
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!composer) return;
    if (!settlementReady) {
      setSubmitState({ kind: 'error', message: transactionReadiness.summary });
      return;
    }
    setSubmitState({ kind: 'submitting' });

    try {
      const response = await fetch('/api/deposits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          author,
          artifactKind,
          artifactType,
          authSessionId: effectiveAuthSessionId || undefined,
          inventoryEntryIds: selectedInventoryEntryIds,
          repositoryAnchor: repositoryAnchorValue || composer.sourceRepo || undefined,
          repositoryProvider: repositoryProvider || undefined,
          sourceRepo: displayedSourceRepo || undefined,
          sourceCommit,
          workflowRunId,
          signerAddress,
          visualPreview,
          operatorNote: workingNote,
          tags: tags
            .split(',')
            .map((entry) => entry.trim())
            .filter(Boolean),
          content,
        }),
      });

      if (!response.ok) {
        setSubmitState({ kind: 'error', message: await readTerminalRouteError(response, 'Deposit failed.') });
        return;
      }

      const payload = (await response.json()) as {
        asset?: { assetId?: string | null; title?: string | null };
      };

      await runControl((controls) => controls.refresh?.());
      setTitle('');
      setAuthor('');
      setArtifactKind('');
      setArtifactType('');
      setSourceRepo(repositoryAnchorValue || composer.sourceRepo || '');
      setSourceCommit('');
      setWorkflowRunId('');
      setVisualPreview('');
      setWorkingNote('');
      setTags('');
      setContent('');
      try {
        await onRecordActivity?.({
          type: 'agentic-execution:asset-pack',
          detailSection: 'transaction',
          summary:
            payload.asset?.title ||
            title.trim() ||
            `Deposited ${selectedSupplyCount || 1} candidate Bitcode asset pack${selectedSupplyCount === 1 ? '' : 's'}.`,
          context: {
            source: 'terminal-deposit-composer',
            authSessionId: effectiveAuthSessionId || null,
            selectedInventoryEntryIds,
            selectedInventoryTitles: selectedEntryLabels,
            repositoryAnchor: repositoryAnchorValue || null,
            candidateAssetId: payload.asset?.assetId || null,
          },
          output: {
            asset: payload.asset || null,
          },
        });
      } catch (recordError) {
        const message =
          recordError instanceof Error
            ? `${recordError.message} The deposit still landed in the Bitcode protocol state.`
            : 'The deposit landed in the Bitcode protocol state, but the ledger row could not be recorded.';
        setSubmitState({ kind: 'error', message });
        return;
      }
      setSubmitState({
        kind: 'success',
        message:
          'Candidate asset deposited into the Bitcode repo-authenticated flow and recorded into the Bitcode activity ledger.',
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Deposit failed.';
      setSubmitState({ kind: 'error', message });
    }
  };

  if (!composer) {
    return (
      <TerminalWorkspaceCard
        id="terminalDepositComposer"
        kicker="Give intake"
        title="Draft and submit a give-side deposit"
        summary="Reading selected supply, issuer continuity, and the current deposit draft posture."
        explainer={TERMINAL_WORKSPACE_EXPLAINERS.depositComposer}
      >
        <p className="mt-4 text-sm leading-6 text-neutral-300">Loading the current give draft…</p>
      </TerminalWorkspaceCard>
    );
  }

  return (
    <TerminalWorkspaceCard
      id="terminalDepositComposer"
      kicker="Give intake"
      title="Draft and submit a give-side deposit"
      summary="Build the deposit from selected supply, add provenance overrides where needed, and keep the working draft resumable before fit and closure."
      explainer={TERMINAL_WORKSPACE_EXPLAINERS.depositComposer}
      headerAside={
        <BitcodeMetricGrid
          metrics={[
            {
              label: usesLiveRepositoryAnchor ? 'Repository' : 'Session',
              value: usesLiveRepositoryAnchor ? repositoryAnchorValue : composer.authSessionId || 'none bound',
            },
            { label: 'Selected supply', value: String(selectedSupplyCount) },
          ]}
          columnsClassName="tablet:grid-cols-2"
          itemClassName="rounded-2xl border border-white/8 bg-black/20 px-4 py-4"
          labelClassName="text-[0.62rem] uppercase tracking-[0.16em] text-emerald-300/85"
          valueClassName="text-sm font-semibold text-neutral-200"
        />
      }
    >

      <div className="mt-6 grid gap-5">
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-4 lg:grid-cols-2">
            <label className="rounded-[1.5rem] border border-white/8 bg-black/20 px-4 py-4">
              <span className="text-[0.66rem] uppercase tracking-[0.24em] text-neutral-400">Asset title override</span>
              <input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Repo artifact bundle title"
                className="mt-3 w-full rounded-xl border border-white/10 bg-[rgba(10,15,30,0.88)] px-3 py-3 text-sm text-white outline-none transition placeholder:text-neutral-500 focus:border-emerald-400/40"
              />
            </label>

            <label className="rounded-[1.5rem] border border-white/8 bg-black/20 px-4 py-4">
              <span className="text-[0.66rem] uppercase tracking-[0.24em] text-neutral-400">Author override</span>
              <input
                value={author}
                onChange={(event) => setAuthor(event.target.value)}
                placeholder="Operator or issuer label"
                className="mt-3 w-full rounded-xl border border-white/10 bg-[rgba(10,15,30,0.88)] px-3 py-3 text-sm text-white outline-none transition placeholder:text-neutral-500 focus:border-emerald-400/40"
              />
            </label>

            <label className="rounded-[1.5rem] border border-white/8 bg-black/20 px-4 py-4">
              <span className="text-[0.66rem] uppercase tracking-[0.24em] text-neutral-400">Artifact kind</span>
              <input
                value={artifactKind}
                onChange={(event) => setArtifactKind(event.target.value)}
                placeholder="patch, runbook, config…"
                className="mt-3 w-full rounded-xl border border-white/10 bg-[rgba(10,15,30,0.88)] px-3 py-3 text-sm text-white outline-none transition placeholder:text-neutral-500 focus:border-emerald-400/40"
              />
            </label>

            <label className="rounded-[1.5rem] border border-white/8 bg-black/20 px-4 py-4">
              <span className="text-[0.66rem] uppercase tracking-[0.24em] text-neutral-400">Artifact type</span>
              <input
                value={artifactType}
                onChange={(event) => setArtifactType(event.target.value)}
                placeholder="markdown, yaml, ts, bundle…"
                className="mt-3 w-full rounded-xl border border-white/10 bg-[rgba(10,15,30,0.88)] px-3 py-3 text-sm text-white outline-none transition placeholder:text-neutral-500 focus:border-emerald-400/40"
              />
            </label>

            <div
              className={`rounded-[1.5rem] border px-4 py-4 ${
                usesLiveRepositoryAnchor
                  ? 'border-emerald-400/18 bg-emerald-400/10'
                  : 'border-white/8 bg-black/20'
              }`}
            >
              <span
                className={`flex items-center gap-2 text-[0.66rem] uppercase tracking-[0.24em] ${
                  usesLiveRepositoryAnchor ? 'text-emerald-200/85' : 'text-neutral-400'
                }`}
              >
                <span>{usesLiveRepositoryAnchor ? 'Selected source repo' : 'Source repo'}</span>
                <BitcodeInlineExplainer explainer={TERMINAL_INLINE_EXPLAINERS.sourceRepo} />
              </span>
              <input
                value={displayedSourceRepo}
                onChange={(event) => setSourceRepo(event.target.value)}
                readOnly={usesLiveRepositoryAnchor}
                placeholder="repo boundary override"
                className={`mt-3 w-full rounded-xl border px-3 py-3 text-sm text-white outline-none transition placeholder:text-neutral-500 ${
                  usesLiveRepositoryAnchor
                    ? 'border-emerald-300/20 bg-[rgba(10,15,30,0.92)]'
                    : 'border-white/10 bg-[rgba(10,15,30,0.88)] focus:border-emerald-400/40'
                }`}
              />
              {usesLiveRepositoryAnchor ? (
                <p className="mt-2 text-[0.68rem] uppercase tracking-[0.18em] text-emerald-100/70">
                  Selected from Give-side supply
                </p>
              ) : null}
            </div>

            <div className="rounded-[1.5rem] border border-white/8 bg-black/20 px-4 py-4">
              <span className="flex items-center gap-2 text-[0.66rem] uppercase tracking-[0.24em] text-neutral-400">
                <span>Source commit / ref</span>
                <BitcodeInlineExplainer explainer={TERMINAL_INLINE_EXPLAINERS.sourceCommit} />
              </span>
              <input
                value={sourceCommit}
                onChange={(event) => setSourceCommit(event.target.value)}
                placeholder="commit or branch override"
                className="mt-3 w-full rounded-xl border border-white/10 bg-[rgba(10,15,30,0.88)] px-3 py-3 text-sm text-white outline-none transition placeholder:text-neutral-500 focus:border-emerald-400/40"
              />
            </div>

            <label className="rounded-[1.5rem] border border-white/8 bg-black/20 px-4 py-4">
              <span className="text-[0.66rem] uppercase tracking-[0.24em] text-neutral-400">Workflow run override</span>
              <input
                value={workflowRunId}
                onChange={(event) => setWorkflowRunId(event.target.value)}
                placeholder="workflow run id"
                className="mt-3 w-full rounded-xl border border-white/10 bg-[rgba(10,15,30,0.88)] px-3 py-3 text-sm text-white outline-none transition placeholder:text-neutral-500 focus:border-emerald-400/40"
              />
            </label>

            <div className="rounded-[1.5rem] border border-white/8 bg-black/20 px-4 py-4">
              <span className="flex items-center gap-2 text-[0.66rem] uppercase tracking-[0.24em] text-neutral-400">
                <span>Signer address</span>
                <BitcodeInlineExplainer explainer={TERMINAL_INLINE_EXPLAINERS.signerAddress} />
              </span>
              <input
                value={signerAddress}
                onChange={(event) => setSignerAddress(event.target.value)}
                placeholder="signer address"
                className="mt-3 w-full rounded-xl border border-white/10 bg-[rgba(10,15,30,0.88)] px-3 py-3 text-sm text-white outline-none transition placeholder:text-neutral-500 focus:border-emerald-400/40"
              />
            </div>
          </div>

          <label className="rounded-[1.5rem] border border-white/8 bg-black/20 px-4 py-4">
            <span className="text-[0.66rem] uppercase tracking-[0.24em] text-neutral-400">Visual preview</span>
            <textarea
              value={visualPreview}
              onChange={(event) => setVisualPreview(event.target.value)}
              rows={3}
              placeholder="Compact preview text for the deposited asset"
              className="mt-3 w-full rounded-xl border border-white/10 bg-[rgba(10,15,30,0.88)] px-3 py-3 text-sm text-white outline-none transition placeholder:text-neutral-500 focus:border-emerald-400/40"
            />
          </label>

          <label className="rounded-[1.5rem] border border-white/8 bg-black/20 px-4 py-4">
            <span className="text-[0.66rem] uppercase tracking-[0.24em] text-neutral-400">Working note</span>
            <textarea
              value={workingNote}
              onChange={(event) => setWorkingNote(event.target.value)}
              rows={3}
              placeholder="Optional intake note for the active draft"
              className="mt-3 w-full rounded-xl border border-white/10 bg-[rgba(10,15,30,0.88)] px-3 py-3 text-sm text-white outline-none transition placeholder:text-neutral-500 focus:border-emerald-400/40"
            />
          </label>

          <div className="grid gap-4 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
            <label className="rounded-[1.5rem] border border-white/8 bg-black/20 px-4 py-4">
              <span className="text-[0.66rem] uppercase tracking-[0.24em] text-neutral-400">Tags</span>
              <input
                value={tags}
                onChange={(event) => setTags(event.target.value)}
                placeholder="comma-separated tags"
                className="mt-3 w-full rounded-xl border border-white/10 bg-[rgba(10,15,30,0.88)] px-3 py-3 text-sm text-white outline-none transition placeholder:text-neutral-500 focus:border-emerald-400/40"
              />
            </label>

            <label className="rounded-[1.5rem] border border-white/8 bg-black/20 px-4 py-4">
              <span className="text-[0.66rem] uppercase tracking-[0.24em] text-neutral-400">Raw fallback content</span>
              <textarea
                value={content}
                onChange={(event) => setContent(event.target.value)}
                rows={4}
                placeholder="Manual content when repo inventory is not enough on its own"
                className="mt-3 w-full rounded-xl border border-white/10 bg-[rgba(10,15,30,0.88)] px-3 py-3 text-sm text-white outline-none transition placeholder:text-neutral-500 focus:border-emerald-400/40"
              />
            </label>
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2 rounded-full border border-white/8 bg-white/5 px-3 py-2 text-[0.66rem] uppercase tracking-[0.2em] text-neutral-300">
              <span>Submission</span>
              <BitcodeInlineExplainer explainer={TERMINAL_INLINE_EXPLAINERS.depositSubmission} />
            </div>
            <button
              type="submit"
              disabled={!canSubmit || submitState.kind === 'submitting'}
              className="rounded-[1.4rem] border border-emerald-400/30 bg-emerald-400/10 px-5 py-3 text-sm font-medium text-emerald-100 transition hover:border-emerald-300/50 hover:bg-emerald-400/15 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitState.kind === 'submitting' ? 'Depositing into Bitcode…' : 'Deposit into Bitcode'}
            </button>
            <button
              type="button"
              onClick={() => jumpToShellSection('panelDepositing')}
              className="rounded-[1.4rem] border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-neutral-100 transition hover:border-white/18 hover:bg-white/10"
            >
              Continue in give
            </button>
          </div>

          {submitState.kind !== 'idle' ? (
            <div
              className={`rounded-[1.3rem] border px-4 py-4 text-sm ${
                submitState.kind === 'error'
                  ? 'border-rose-400/25 bg-rose-400/10 text-rose-100'
                  : submitState.kind === 'success'
                    ? 'border-emerald-400/25 bg-emerald-400/10 text-emerald-100'
                    : 'border-white/10 bg-black/20 text-neutral-200'
              }`}
            >
              {submitState.kind === 'submitting' ? 'Submitting the Bitcode deposit…' : submitState.message}
            </div>
          ) : null}
        </form>

        <aside className="space-y-4">
          <div
            className={`rounded-[1.5rem] border px-5 py-5 text-sm leading-6 ${
              settlementReady
                ? 'border-emerald-400/25 bg-emerald-400/10 text-emerald-100'
                : 'border-amber-400/25 bg-amber-400/10 text-amber-100'
            }`}
          >
            <div className="flex items-center gap-2">
              <p className="text-[0.68rem] uppercase tracking-[0.24em] text-current/80">
                Transaction readiness
              </p>
              <BitcodeInlineExplainer
                explainer={TERMINAL_INLINE_EXPLAINERS.transactionReadiness}
                triggerClassName="h-4.5 w-4.5 border-current/20 bg-current/10 text-[0.58rem] text-current"
              />
            </div>
            <p className="mt-3 text-current">{transactionReadiness.summary}</p>
            {transactionReadiness.blockers.length ? (
              <p className="mt-3 text-xs uppercase tracking-[0.16em] text-current/80">
                Pending: {transactionReadiness.blockers.map((entry) => entry.label).join(' · ')}
              </p>
            ) : null}
          </div>

          <div className="rounded-[1.5rem] border border-white/8 bg-black/20 px-5 py-5">
            <p className="text-[0.68rem] uppercase tracking-[0.24em] text-neutral-400">Selected supply</p>
            <p className="mt-3 text-sm leading-6 text-neutral-300">
              {selectedSupplyCount
                ? usesLiveRepositoryAnchor
                  ? `Bitcode will bind ${repositoryAnchorValue} as the selected repository source for this deposit.`
                  : `Bitcode will bind ${selectedSupplyCount} selected repo artifact${selectedSupplyCount === 1 ? '' : 's'} into this deposit.`
                : 'No repo artifacts are currently selected. Use raw fallback content or select inventory above.'}
            </p>
            {selectedEntryLabels.length ? (
              <BitcodeChipCloud
                chips={selectedEntryLabels}
                className="mt-4"
                chipClassName="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[0.62rem] uppercase tracking-[0.18em] text-neutral-200"
              />
            ) : null}
          </div>

          <div className="rounded-[1.5rem] border border-white/8 bg-black/20 px-5 py-5">
            <p className="text-[0.68rem] uppercase tracking-[0.24em] text-neutral-400">After deposit</p>
            <p className="mt-3 text-sm leading-6 text-neutral-300">
              Submitting refreshes the working chain so selected supply, measured demand, fit, and later branch, proof,
              and settlement reads stay aligned in the same Bitcode Terminal.
            </p>
          </div>
        </aside>
      </div>
    </TerminalWorkspaceCard>
  );
}
