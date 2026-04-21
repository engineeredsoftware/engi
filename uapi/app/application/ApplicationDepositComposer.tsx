'use client';

import { useEffect, useMemo, useState } from 'react';

import BitcodeChipCloud from '@/components/base/bitcode/execution/BitcodeChipCloud';
import BitcodeMetricGrid from '@/components/base/bitcode/execution/BitcodeMetricGrid';

import ApplicationWorkspaceCard from './ApplicationWorkspaceCard';
import {
  type ApplicationActivityRecordDraft,
  readApplicationRouteError,
} from './application-activity-history';
import { APPLICATION_WORKSPACE_EXPLAINERS } from './application-workspace-explainers';
import {
  normalizeApplicationDepositComposer,
  type ApplicationDepositComposerState,
} from './application-deposit-composer';
import { useApplicationShellBridge } from './application-shell-bridge';
import { jumpToShellSection } from './application-shell-reading';

type SubmitState =
  | { kind: 'idle' }
  | { kind: 'submitting' }
  | { kind: 'success'; message: string }
  | { kind: 'error'; message: string };

interface ApplicationDepositComposerProps {
  onRecordActivity?: (draft: ApplicationActivityRecordDraft) => Promise<unknown>;
}

export default function ApplicationDepositComposer({
  onRecordActivity,
}: ApplicationDepositComposerProps) {
  const { snapshot, runControl } = useApplicationShellBridge();
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
  const composer = useMemo<ApplicationDepositComposerState | null>(
    () => normalizeApplicationDepositComposer(snapshot),
    [snapshot],
  );

  useEffect(() => {
    setSignerAddress((current) => current || composer?.signerAddress || '');
    setSourceRepo((current) => current || composer?.sourceRepo || '');
  }, [composer?.signerAddress, composer?.sourceRepo]);

  const selectedEntryLabels = useMemo(() => {
    return composer?.selectedEntries.slice(0, 5).map((entry) => entry.title) || [];
  }, [composer]);

  const canSubmit = Boolean(
    composer &&
      (composer.selectedCount > 0 || content.trim()) &&
      (title.trim() || composer.selectedCount > 0) &&
      (author.trim() || composer.authSessionId),
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!composer) return;
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
          authSessionId: composer.authSessionId || undefined,
          inventoryEntryIds: composer.selectedInventoryEntryIds,
          sourceRepo: sourceRepo || undefined,
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
        setSubmitState({ kind: 'error', message: await readApplicationRouteError(response, 'Deposit failed.') });
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
      setSourceRepo(composer.sourceRepo || '');
      setSourceCommit('');
      setWorkflowRunId('');
      setVisualPreview('');
      setWorkingNote('');
      setTags('');
      setContent('');
      try {
        await onRecordActivity?.({
          type: 'agentic-execution:branch-artifact',
          detailSection: 'transaction',
          summary:
            payload.asset?.title ||
            title.trim() ||
            `Deposited ${composer.selectedCount || 1} candidate Bitcode asset pack${composer.selectedCount === 1 ? '' : 's'}.`,
          context: {
            source: 'application-deposit-composer',
            authSessionId: composer.authSessionId || null,
            selectedInventoryEntryIds: composer.selectedInventoryEntryIds,
            selectedInventoryTitles: composer.selectedEntries.map((entry) => entry.title),
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
      <ApplicationWorkspaceCard
        id="applicationDepositComposer"
        kicker="Give intake"
        title="Draft and submit a give-side deposit"
        summary="Reading selected supply, issuer continuity, and the current deposit draft posture."
        explainer={APPLICATION_WORKSPACE_EXPLAINERS.depositComposer}
      >
        <p className="mt-4 text-sm leading-6 text-neutral-300">Loading the current give draft…</p>
      </ApplicationWorkspaceCard>
    );
  }

  return (
    <ApplicationWorkspaceCard
      id="applicationDepositComposer"
      kicker="Give intake"
      title="Draft and submit a give-side deposit"
      summary="Build the deposit from selected supply, add provenance overrides where needed, and keep the working draft resumable before fit and closure."
      explainer={APPLICATION_WORKSPACE_EXPLAINERS.depositComposer}
      headerAside={
        <BitcodeMetricGrid
          metrics={[
            { label: 'Session', value: composer.authSessionId || 'none bound' },
            { label: 'Selected supply', value: String(composer.selectedCount) },
          ]}
          columnsClassName="tablet:grid-cols-2"
          itemClassName="rounded-2xl border border-white/8 bg-black/20 px-4 py-4"
          labelClassName="text-[0.62rem] uppercase tracking-[0.16em] text-emerald-300/85"
          valueClassName="text-sm font-semibold text-neutral-200"
        />
      }
    >

      <div className="mt-6 grid gap-5 xl:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)]">
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

            <label className="rounded-[1.5rem] border border-white/8 bg-black/20 px-4 py-4">
              <span className="text-[0.66rem] uppercase tracking-[0.24em] text-neutral-400">Source repo</span>
              <input
                value={sourceRepo}
                onChange={(event) => setSourceRepo(event.target.value)}
                placeholder="repo boundary override"
                className="mt-3 w-full rounded-xl border border-white/10 bg-[rgba(10,15,30,0.88)] px-3 py-3 text-sm text-white outline-none transition placeholder:text-neutral-500 focus:border-emerald-400/40"
              />
            </label>

            <label className="rounded-[1.5rem] border border-white/8 bg-black/20 px-4 py-4">
              <span className="text-[0.66rem] uppercase tracking-[0.24em] text-neutral-400">Source commit / ref</span>
              <input
                value={sourceCommit}
                onChange={(event) => setSourceCommit(event.target.value)}
                placeholder="commit or branch override"
                className="mt-3 w-full rounded-xl border border-white/10 bg-[rgba(10,15,30,0.88)] px-3 py-3 text-sm text-white outline-none transition placeholder:text-neutral-500 focus:border-emerald-400/40"
              />
            </label>

            <label className="rounded-[1.5rem] border border-white/8 bg-black/20 px-4 py-4">
              <span className="text-[0.66rem] uppercase tracking-[0.24em] text-neutral-400">Workflow run override</span>
              <input
                value={workflowRunId}
                onChange={(event) => setWorkflowRunId(event.target.value)}
                placeholder="workflow run id"
                className="mt-3 w-full rounded-xl border border-white/10 bg-[rgba(10,15,30,0.88)] px-3 py-3 text-sm text-white outline-none transition placeholder:text-neutral-500 focus:border-emerald-400/40"
              />
            </label>

            <label className="rounded-[1.5rem] border border-white/8 bg-black/20 px-4 py-4">
              <span className="text-[0.66rem] uppercase tracking-[0.24em] text-neutral-400">Signer address</span>
              <input
                value={signerAddress}
                onChange={(event) => setSignerAddress(event.target.value)}
                placeholder="signer address"
                className="mt-3 w-full rounded-xl border border-white/10 bg-[rgba(10,15,30,0.88)] px-3 py-3 text-sm text-white outline-none transition placeholder:text-neutral-500 focus:border-emerald-400/40"
              />
            </label>
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
              {submitState.message}
            </div>
          ) : null}
        </form>

        <aside className="space-y-4">
          <div className="rounded-[1.5rem] border border-white/8 bg-black/20 px-5 py-5">
            <p className="text-[0.68rem] uppercase tracking-[0.24em] text-neutral-400">Selected supply</p>
            <p className="mt-3 text-sm leading-6 text-neutral-300">
              {composer.selectedCount
                ? `Bitcode will bind ${composer.selectedCount} selected repo artifact${composer.selectedCount === 1 ? '' : 's'} into this deposit.`
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
    </ApplicationWorkspaceCard>
  );
}
