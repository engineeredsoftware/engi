'use client';

import { useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ArrowUpRight, CheckCircle2, FolderGit2, GitBranch, Lock, RefreshCw, ShieldCheck } from 'lucide-react';
import type { VCSRepository } from '@bitcode/vcs-core';

import BitcodeInlineExplainer from '@/components/base/bitcode/execution/BitcodeInlineExplainer';
import { VCSRepositorySelector } from '@/components/base/bitcode/vcs/VCSRepositorySelector';

import ApplicationOpenOrbitalsButton from './ApplicationOpenOrbitalsButton';
import ApplicationWorkspaceCard from './ApplicationWorkspaceCard';
import {
  buildApplicationRepositoryAnchorDraft,
  type ApplicationActivityRecordDraft,
} from './application-activity-history';
import {
  APPLICATION_INLINE_EXPLAINERS,
  APPLICATION_WORKSPACE_EXPLAINERS,
} from './application-workspace-explainers';
import {
  APPLICATION_REPOSITORY_PROVIDERS,
  type ApplicationRepositoryConnectionStatus,
  type ApplicationRepositoryContextState,
  deriveSelectedRepository,
  getProviderLabel,
  normalizeRepositoryProvider,
} from './application-repository-context';
import { jumpToShellSection } from './application-shell-reading';

async function readJsonResponse(response: Response) {
  const contentType = response.headers?.get?.('content-type') || '';
  if (contentType && !contentType.includes('application/json')) {
    return null;
  }

  return response.json().catch(() => null);
}

interface ApplicationRepositoryContextPanelProps {
  preferredRepository?: string | null;
  onContextChange?: (context: ApplicationRepositoryContextState) => void;
  onRecordActivity?: (draft: ApplicationActivityRecordDraft) => Promise<unknown>;
}

export default function ApplicationRepositoryContextPanel({
  preferredRepository,
  onContextChange,
  onRecordActivity,
}: ApplicationRepositoryContextPanelProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const requestedProvider = searchParams.get('provider');
  const requestedRepository = searchParams.get('repo');
  const provider = normalizeRepositoryProvider(requestedProvider);

  const [connectionStatus, setConnectionStatus] = useState<ApplicationRepositoryConnectionStatus | null>(null);
  const [repositories, setRepositories] = useState<VCSRepository[]>([]);
  const [isLoadingConnection, setIsLoadingConnection] = useState(true);
  const [isLoadingRepositories, setIsLoadingRepositories] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [refreshNonce, setRefreshNonce] = useState(0);
  const [recordMessage, setRecordMessage] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);

  const selectedRepository = useMemo(
    () => deriveSelectedRepository(repositories, requestedRepository, preferredRepository),
    [preferredRepository, repositories, requestedRepository],
  );

  useEffect(() => {
    let disposed = false;

    setIsLoadingConnection(true);
    setError(null);

    fetch(`/api/vcs/${provider}/connection`)
      .then(async (response) => {
        const payload = await readJsonResponse(response);
        if (!response.ok || !payload) {
          throw new Error('Unable to load repository connection posture.');
        }
        if (!disposed) {
          setConnectionStatus(payload as ApplicationRepositoryConnectionStatus);
        }
      })
      .catch((nextError) => {
        if (disposed) return;
        setConnectionStatus(null);
        setError(nextError instanceof Error ? nextError.message : 'Unable to load repository connection posture.');
      })
      .finally(() => {
        if (!disposed) setIsLoadingConnection(false);
      });

    return () => {
      disposed = true;
    };
  }, [provider, refreshNonce]);

  useEffect(() => {
    let disposed = false;

    if (!connectionStatus?.connected || !connectionStatus.valid) {
      setRepositories([]);
      setIsLoadingRepositories(false);
      return () => {
        disposed = true;
      };
    }

    setIsLoadingRepositories(true);
    setError(null);

    fetch(`/api/vcs/${provider}/repositories`)
      .then(async (response) => {
        const payload = await readJsonResponse(response);
        if (!response.ok || !payload) {
          throw new Error('Unable to load repository inventory.');
        }
        if (!disposed) {
          setRepositories(Array.isArray(payload.repositories) ? payload.repositories : []);
        }
      })
      .catch((nextError) => {
        if (disposed) return;
        setRepositories([]);
        setError(nextError instanceof Error ? nextError.message : 'Unable to load repository inventory.');
      })
      .finally(() => {
        if (!disposed) setIsLoadingRepositories(false);
      });

    return () => {
      disposed = true;
    };
  }, [connectionStatus?.connected, connectionStatus?.valid, provider, refreshNonce]);

  useEffect(() => {
    onContextChange?.({
      provider,
      connectionStatus,
      repositories,
      selectedRepository,
    });
  }, [connectionStatus, onContextChange, provider, repositories, selectedRepository]);

  useEffect(() => {
    const nextParams = new URLSearchParams(searchParams.toString());
    let changed = false;

    if (nextParams.get('provider') !== provider) {
      nextParams.set('provider', provider);
      changed = true;
    }

    if (selectedRepository) {
      if (nextParams.get('repo') !== selectedRepository.fullName) {
        nextParams.set('repo', selectedRepository.fullName);
        changed = true;
      }
    } else if (nextParams.has('repo')) {
      nextParams.delete('repo');
      changed = true;
    }

    if (!changed) return;
    router.replace(`${pathname}?${nextParams.toString()}`, { scroll: false });
  }, [pathname, provider, router, searchParams, selectedRepository]);

  const refreshRepositoryContext = () => {
    setConnectionStatus(null);
    setRepositories([]);
    setError(null);
    setIsLoadingConnection(true);
    setIsLoadingRepositories(false);
    setRefreshNonce((value) => value + 1);
  };

  const handleRecordRepositoryAnchor = async () => {
    if (!selectedRepository || !onRecordActivity) return;

    setIsRecording(true);
    setRecordMessage(null);

    try {
      await onRecordActivity(
        buildApplicationRepositoryAnchorDraft({
          provider,
          connectionStatus,
          repositories,
          selectedRepository,
        }),
      );
      setRecordMessage('Repository anchor recorded into the Bitcode activity ledger.');
    } catch (nextError) {
      setRecordMessage(
        nextError instanceof Error ? nextError.message : 'Unable to record the repository anchor posture.',
      );
    } finally {
      setIsRecording(false);
    }
  };

  return (
    <ApplicationWorkspaceCard
      id="applicationRepositorySupply"
      kicker="Repository supply"
      title="Connect and select searchable supply"
      summary="Choose the provider and repository that will anchor give-side supply before you move deeper into deposit, need, and closure."
      explainer={APPLICATION_WORKSPACE_EXPLAINERS.repositorySupply}
      tone="emerald"
    >
      {recordMessage ? (
        <div className="mb-4 rounded-[1.3rem] border border-white/8 bg-white/5 px-4 py-4 text-sm leading-6 text-neutral-200">
          {recordMessage}
        </div>
      ) : null}

      <div className="grid gap-3 text-xs uppercase tracking-[0.22em] text-neutral-400 tablet:grid-cols-2">
        <div className="rounded-2xl border border-white/8 bg-white/5 px-4 py-3">
          <p className="text-emerald-300/85">Main action</p>
          <p className="mt-2 text-neutral-200">give</p>
        </div>
        <div className="rounded-2xl border border-white/8 bg-white/5 px-4 py-3">
          <p className="text-emerald-300/85">Boundary</p>
          <p className="mt-2 text-neutral-200">repository supply</p>
        </div>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.3fr)_minmax(19rem,0.7fr)]">
        <div className="space-y-5">
          <div className="rounded-[1.5rem] border border-white/8 bg-black/20 px-5 py-5">
            <div className="flex items-center gap-2">
              <p className="text-[0.68rem] uppercase tracking-[0.24em] text-neutral-400">Provider and repository</p>
              <BitcodeInlineExplainer explainer={APPLICATION_INLINE_EXPLAINERS.providerRepository} />
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {APPLICATION_REPOSITORY_PROVIDERS.map((option) => {
                const isActive = provider === option;
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => {
                      const nextParams = new URLSearchParams(searchParams.toString());
                      nextParams.set('provider', option);
                      nextParams.delete('repo');
                      router.replace(`${pathname}?${nextParams.toString()}`, { scroll: false });
                    }}
                    className={`rounded-full border px-3 py-2 text-[0.72rem] uppercase tracking-[0.18em] transition ${
                      isActive
                        ? 'border-emerald-400/35 bg-emerald-400/10 text-emerald-100'
                        : 'border-white/10 bg-white/5 text-neutral-200 hover:border-white/18 hover:bg-white/10'
                    }`}
                  >
                    {getProviderLabel(option)}
                  </button>
                );
              })}
            </div>

            <div className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto]">
              <VCSRepositorySelector
                provider={provider}
                repositories={repositories}
                loading={isLoadingRepositories}
                value={selectedRepository?.fullName}
                onSelect={(repository) => {
                  const nextParams = new URLSearchParams(searchParams.toString());
                  nextParams.set('provider', provider);
                  if (repository) {
                    nextParams.set('repo', repository.fullName);
                  } else {
                    nextParams.delete('repo');
                  }
                  router.replace(`${pathname}?${nextParams.toString()}`, { scroll: false });
                }}
                placeholder={
                  connectionStatus?.connected
                    ? 'Select repository supply...'
                    : 'Connect a repository provider first...'
                }
                className="w-full"
              />

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => jumpToShellSection('applicationSupplySelection')}
                  className="rounded-[1.2rem] border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm font-medium text-emerald-100 transition hover:border-emerald-300/45 hover:bg-emerald-400/15"
                >
                  Continue to give
                </button>
                <button
                  type="button"
                  disabled={!selectedRepository || isRecording}
                  onClick={() => {
                    void handleRecordRepositoryAnchor();
                  }}
                  className="rounded-[1.2rem] border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-neutral-100 transition hover:border-white/18 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isRecording ? 'Recording anchor…' : 'Record repository anchor'}
                </button>
                <BitcodeInlineExplainer explainer={APPLICATION_INLINE_EXPLAINERS.repositoryAnchor} />
              </div>
            </div>
          </div>

          <div className="grid gap-4 xl:grid-cols-2">
            <article className="rounded-[1.5rem] border border-white/8 bg-black/20 px-5 py-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[0.66rem] uppercase tracking-[0.2em] text-emerald-300/75">Connection posture</p>
                  <h3 className="mt-2 text-lg font-semibold text-white">{getProviderLabel(provider)}</h3>
                </div>
                <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[0.62rem] uppercase tracking-[0.18em] text-neutral-300">
                  contract
                </span>
              </div>

              {isLoadingConnection ? (
                <p className="mt-4 text-sm leading-6 text-neutral-400">Loading repository connection posture…</p>
              ) : connectionStatus?.connected && connectionStatus.valid ? (
                <div className="mt-4 space-y-4">
                  <div className="flex items-center gap-2 text-sm text-emerald-100">
                    <CheckCircle2 className="h-4 w-4" />
                    Connected as {connectionStatus.username || connectionStatus.metadata?.account || 'linked account'}
                  </div>
                  <dl className="space-y-3 rounded-[1.2rem] border border-white/8 bg-white/5 px-4 py-4 text-sm">
                    <div>
                      <dt className="text-neutral-500">Inventory count</dt>
                      <dd className="mt-1 text-neutral-100">{connectionStatus.metadata?.repositories ?? repositories.length}</dd>
                    </div>
                    <div>
                      <dt className="text-neutral-500">Status</dt>
                      <dd className="mt-1 text-neutral-100">{connectionStatus.metadata?.status || 'connected'}</dd>
                    </div>
                    <div>
                      <dt className="text-neutral-500">Mode</dt>
                      <dd className="mt-1 text-neutral-100">
                        {connectionStatus.metadata?.mock_mode ? 'mock review' : 'live connection'}
                      </dd>
                    </div>
                  </dl>
                </div>
              ) : (
                <div className="mt-4 space-y-4">
                  <p className="text-sm leading-6 text-neutral-300">
                    No active {getProviderLabel(provider)} connection is available for repository supply in this application
                    context.
                  </p>
                  <ApplicationOpenOrbitalsButton
                    step="connects"
                    className="rounded-[1.2rem] border border-white/12 bg-white/5 px-4 py-3 text-sm font-medium text-neutral-100 transition hover:border-white/20 hover:bg-white/10"
                  />
                </div>
              )}
            </article>

            <article className="rounded-[1.5rem] border border-white/8 bg-black/20 px-5 py-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[0.66rem] uppercase tracking-[0.2em] text-emerald-300/75">Supply context</p>
                  <h3 className="mt-2 text-lg font-semibold text-white">
                    {selectedRepository ? selectedRepository.fullName : 'Awaiting repository selection'}
                  </h3>
                </div>
                <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[0.62rem] uppercase tracking-[0.18em] text-neutral-300">
                  give
                </span>
              </div>

              {selectedRepository ? (
                <div className="mt-4 space-y-4">
                  <p className="text-sm leading-6 text-neutral-300">
                    The selected repository now anchors the give-side application frame before the live Bitcode deposit
                    surfaces below.
                  </p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-[1.15rem] border border-white/8 bg-white/5 px-4 py-4">
                      <p className="text-[0.64rem] uppercase tracking-[0.16em] text-neutral-500">Default branch</p>
                      <p className="mt-2 flex items-center gap-2 text-base font-semibold text-white">
                        <GitBranch className="h-4 w-4 text-emerald-200" />
                        {selectedRepository.defaultBranch || 'main'}
                      </p>
                    </div>
                    <div className="rounded-[1.15rem] border border-white/8 bg-white/5 px-4 py-4">
                      <p className="text-[0.64rem] uppercase tracking-[0.16em] text-neutral-500">Visibility</p>
                      <p className="mt-2 flex items-center gap-2 text-base font-semibold text-white">
                        {selectedRepository.private ? <Lock className="h-4 w-4 text-amber-200" /> : <ShieldCheck className="h-4 w-4 text-emerald-200" />}
                        {selectedRepository.private ? 'private' : 'public'}
                      </p>
                    </div>
                  </div>

                  <dl className="space-y-3 rounded-[1.2rem] border border-white/8 bg-white/5 px-4 py-4 text-sm">
                    <div>
                      <dt className="text-neutral-500">Language</dt>
                      <dd className="mt-1 text-neutral-100">{selectedRepository.language || 'n/a'}</dd>
                    </div>
                    <div>
                      <dt className="text-neutral-500">Owner</dt>
                      <dd className="mt-1 text-neutral-100">{selectedRepository.owner.username || selectedRepository.owner.id}</dd>
                    </div>
                    <div>
                      <dt className="text-neutral-500">Topics</dt>
                      <dd className="mt-1 text-neutral-100">
                        {selectedRepository.topics?.length ? selectedRepository.topics.join(', ') : 'no tagged topics'}
                      </dd>
                    </div>
                  </dl>

                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => jumpToShellSection('applicationDepositComposer')}
                      className="rounded-[1.2rem] border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm font-medium text-emerald-100 transition hover:border-emerald-300/45 hover:bg-emerald-400/15"
                    >
                      Open deposit draft
                    </button>
                    <button
                      type="button"
                      disabled={isRecording}
                      onClick={() => {
                        void handleRecordRepositoryAnchor();
                      }}
                      className="rounded-[1.2rem] border border-white/12 bg-white/5 px-4 py-3 text-sm font-medium text-neutral-100 transition hover:border-white/20 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isRecording ? 'Recording anchor…' : 'Record anchor'}
                    </button>
                    <a
                      href={selectedRepository.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-[1.2rem] border border-white/12 bg-white/5 px-4 py-3 text-sm font-medium text-neutral-100 transition hover:border-white/20 hover:bg-white/10"
                    >
                      Open repository
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              ) : (
                <p className="mt-4 text-sm leading-6 text-neutral-400">
                  Select a connected repository to make the current give-side supply boundary explicit.
                </p>
              )}
            </article>
          </div>
        </div>

        <div className="space-y-4">
          <article className="rounded-[1.5rem] border border-white/8 bg-black/20 px-5 py-5">
            <p className="text-[0.68rem] uppercase tracking-[0.24em] text-neutral-400">Give-side guidance</p>
            <p className="mt-3 text-sm leading-6 text-neutral-300">
              Keep repository connection, repository selection, and deposit focus visible before you move deeper into
              supply, need, and closure.
            </p>
            <div className="mt-4 grid gap-3">
              <button
                type="button"
                onClick={() => jumpToShellSection('applicationSupplySelection')}
                className="rounded-[1.2rem] border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm font-medium text-emerald-100 transition hover:border-emerald-300/45 hover:bg-emerald-400/15"
              >
                Focus repo supply
              </button>
              <button
                type="button"
                onClick={() => jumpToShellSection('applicationNeedScenarios')}
                className="rounded-[1.2rem] border border-white/12 bg-white/5 px-4 py-3 text-sm font-medium text-neutral-100 transition hover:border-white/20 hover:bg-white/10"
              >
                Continue to need
              </button>
            </div>
          </article>

          <article className="rounded-[1.5rem] border border-white/8 bg-black/20 px-5 py-5">
            <div className="flex items-center justify-between gap-3">
              <p className="text-[0.68rem] uppercase tracking-[0.24em] text-neutral-400">Refresh posture</p>
              <button
                type="button"
                onClick={refreshRepositoryContext}
                className="rounded-full border border-white/10 bg-white/5 p-2 text-neutral-200 transition hover:border-white/18 hover:bg-white/10"
                aria-label="Refresh repository context"
              >
                <RefreshCw className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-3 text-sm leading-6 text-neutral-300">
              Re-read the repository context if connection posture or inventory changed.
            </p>
            {error ? (
              <p className="mt-4 rounded-[1.1rem] border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                {error}
              </p>
            ) : null}
            <div className="mt-4 rounded-[1.2rem] border border-white/8 bg-white/5 px-4 py-4 text-sm text-neutral-300">
              <div className="flex items-center gap-2">
                <FolderGit2 className="h-4 w-4 text-emerald-200" />
                {repositories.length} repositories surfaced for {getProviderLabel(provider)}
              </div>
            </div>
          </article>
        </div>
      </div>
    </ApplicationWorkspaceCard>
  );
}
