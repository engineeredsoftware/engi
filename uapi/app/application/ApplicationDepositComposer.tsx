'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

import {
  readBitcodeApplicationShellControls,
  readBitcodeApplicationShellSnapshot,
} from '@bitcode/bitcode/src/client-entry.js';

import {
  normalizeApplicationDepositComposer,
  type ApplicationDepositComposerState,
} from './application-deposit-composer';
import { jumpToShellSection } from './application-shell-reading';

type ShellControls = {
  refresh?: () => Promise<unknown> | unknown;
};

type SubmitState =
  | { kind: 'idle' }
  | { kind: 'submitting' }
  | { kind: 'success'; message: string }
  | { kind: 'error'; message: string };

async function parseErrorMessage(response: Response) {
  try {
    const payload = await response.json();
    if (payload && typeof payload === 'object') {
      const message = 'error' in payload ? payload.error : 'message' in payload ? payload.message : null;
      if (typeof message === 'string' && message.trim()) return message;
    }
  } catch {}
  return `Deposit failed with status ${response.status}.`;
}

export default function ApplicationDepositComposer() {
  const [composer, setComposer] = useState<ApplicationDepositComposerState | null>(null);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [artifactKind, setArtifactKind] = useState('');
  const [artifactType, setArtifactType] = useState('');
  const [sourceRepo, setSourceRepo] = useState('');
  const [sourceCommit, setSourceCommit] = useState('');
  const [workflowRunId, setWorkflowRunId] = useState('');
  const [signerAddress, setSignerAddress] = useState('');
  const [visualPreview, setVisualPreview] = useState('');
  const [operatorNote, setOperatorNote] = useState('');
  const [tags, setTags] = useState('');
  const [content, setContent] = useState('');
  const [submitState, setSubmitState] = useState<SubmitState>({ kind: 'idle' });

  const refresh = useCallback(async () => {
    const snapshot = await readBitcodeApplicationShellSnapshot();
    const nextComposer = normalizeApplicationDepositComposer(snapshot);
    setComposer(nextComposer);
    setSignerAddress((current) => current || nextComposer?.signerAddress || '');
    setSourceRepo((current) => current || nextComposer?.sourceRepo || '');
  }, []);

  useEffect(() => {
    void refresh();
    const intervalId = window.setInterval(() => {
      void refresh();
    }, 900);
    return () => {
      window.clearInterval(intervalId);
    };
  }, [refresh]);

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
          operatorNote,
          tags: tags
            .split(',')
            .map((entry) => entry.trim())
            .filter(Boolean),
          content,
        }),
      });

      if (!response.ok) {
        setSubmitState({ kind: 'error', message: await parseErrorMessage(response) });
        return;
      }

      const controls = (await readBitcodeApplicationShellControls()) as ShellControls | null;
      await controls?.refresh?.();
      await refresh();
      setTitle('');
      setAuthor('');
      setArtifactKind('');
      setArtifactType('');
      setSourceRepo(composer.sourceRepo || '');
      setSourceCommit('');
      setWorkflowRunId('');
      setVisualPreview('');
      setOperatorNote('');
      setTags('');
      setContent('');
      setSubmitState({
        kind: 'success',
        message:
          'Candidate asset deposited into the Bitcode repo-authenticated flow. Re-run Make Bitcode branch to inspect fit, proof, and settlement impact.',
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Deposit failed.';
      setSubmitState({ kind: 'error', message });
    }
  };

  if (!composer) {
    return (
      <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(8,12,24,0.96),rgba(4,8,18,0.95))] px-6 py-6 shadow-[0_30px_100px_rgba(0,0,0,0.42)]">
        <p className="text-[0.72rem] uppercase tracking-[0.34em] text-neutral-400">Application deposit composer</p>
        <p className="mt-4 text-sm leading-6 text-neutral-300">Reading mounted Bitcode deposit state…</p>
      </section>
    );
  }

  return (
    <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(8,12,24,0.96),rgba(4,8,18,0.95))] px-6 py-6 shadow-[0_30px_100px_rgba(0,0,0,0.42)]">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
        <div className="max-w-3xl">
          <p className="text-[0.72rem] uppercase tracking-[0.34em] text-neutral-400">Application deposit composer</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white tablet:text-[2.05rem]">
            Native deposit submission in the Bitcode workspace
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-neutral-300 tablet:text-base">
            Second-gate now pushes the actual deposit action inward. This route-local Bitcode composer submits to the
            app-owned deposit contract while preserving selected inventory and authenticated session continuity from the
            mounted shell.
          </p>
        </div>

        <div className="grid gap-3 text-xs uppercase tracking-[0.22em] text-neutral-400 tablet:grid-cols-2">
          <div className="rounded-2xl border border-white/8 bg-black/20 px-4 py-4">
            <p className="text-emerald-300/85">Auth session</p>
            <p className="mt-2 break-all text-neutral-200">{composer.authSessionId || 'none bound'}</p>
          </div>
          <div className="rounded-2xl border border-white/8 bg-black/20 px-4 py-4">
            <p className="text-emerald-300/85">Selected inventory</p>
            <p className="mt-2 text-neutral-200">{composer.selectedCount}</p>
          </div>
        </div>
      </div>

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
            <span className="text-[0.66rem] uppercase tracking-[0.24em] text-neutral-400">Operator note</span>
            <textarea
              value={operatorNote}
              onChange={(event) => setOperatorNote(event.target.value)}
              rows={3}
              placeholder="Operator-authored intake note"
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
              Open live deposit section
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
              <div className="mt-4 flex flex-wrap gap-2">
                {selectedEntryLabels.map((label) => (
                  <span
                    key={label}
                    className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[0.62rem] uppercase tracking-[0.18em] text-neutral-200"
                  >
                    {label}
                  </span>
                ))}
              </div>
            ) : null}
          </div>

          <div className="rounded-[1.5rem] border border-white/8 bg-black/20 px-5 py-5">
            <p className="text-[0.68rem] uppercase tracking-[0.24em] text-neutral-400">Deposit continuity</p>
            <p className="mt-3 text-sm leading-6 text-neutral-300">
              This composer posts to the app-owned Bitcode deposit route, then refreshes the mounted shell so selection,
              need, fit, and later branch/proof/settlement reads stay semantically aligned.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
