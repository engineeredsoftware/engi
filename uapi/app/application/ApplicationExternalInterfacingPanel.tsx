'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { ShieldAlert, ShieldCheck } from 'lucide-react';

import ApplicationWorkspaceCard from './ApplicationWorkspaceCard';
import {
  buildApplicationExternalInterfacingDraft,
  type ApplicationActivityRecordDraft,
} from './application-activity-history';
import { APPLICATION_WORKSPACE_EXPLAINERS } from './application-workspace-explainers';
import { jumpToShellSection } from './application-shell-reading';
import {
  normalizeExternalRuntimePayload,
  type ApplicationExternalRuntimeSnapshot,
} from './application-external-runtime';
import type { ApplicationEnvironmentMode } from './application-transaction-query';

async function readJsonResponse(response: Response) {
  const contentType = response.headers?.get?.('content-type') || '';
  if (contentType && !contentType.includes('application/json')) {
    return null;
  }
  return response.json().catch(() => null);
}

function formatLabel(value: string) {
  return value
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (match) => match.toUpperCase());
}

function buildExternalRealizationRequestPath(environmentMode: ApplicationEnvironmentMode | null) {
  if (!environmentMode) {
    return '/api/v24/external-realization';
  }

  const params = new URLSearchParams();
  params.set('environmentMode', environmentMode);
  return `/api/v24/external-realization?${params.toString()}`;
}

function runtimeTone(runtimeState: string, blocking: boolean) {
  if (blocking) return 'border-red-500/25 bg-red-500/10 text-red-100';
  if (runtimeState === 'live-configured') return 'border-emerald-500/25 bg-emerald-500/10 text-emerald-100';
  if (runtimeState === 'mock') return 'border-sky-500/25 bg-sky-500/10 text-sky-100';
  return 'border-white/10 bg-white/5 text-neutral-200';
}

interface ApplicationExternalInterfacingPanelProps {
  environmentMode?: ApplicationEnvironmentMode | null;
  onRecordActivity?: (draft: ApplicationActivityRecordDraft) => Promise<unknown>;
}

export default function ApplicationExternalInterfacingPanel({
  environmentMode = null,
  onRecordActivity,
}: ApplicationExternalInterfacingPanelProps) {
  const [snapshot, setSnapshot] = useState<ApplicationExternalRuntimeSnapshot | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [recordMessage, setRecordMessage] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);

  const refresh = useCallback((preserveSnapshot = true) => {
    let disposed = false;
    setIsLoading(true);
    setError(null);
    if (!preserveSnapshot) {
      setSnapshot(null);
    }

    fetch(buildExternalRealizationRequestPath(environmentMode))
      .then(async (response) => {
        const payload = await readJsonResponse(response);
        if (!response.ok || !payload) {
          throw new Error('Unable to load external interfacing posture.');
        }
        const normalized = normalizeExternalRuntimePayload(payload);
        if (!normalized) {
          throw new Error('External interfacing posture returned an unsupported shape.');
        }
        if (!disposed) {
          setSnapshot(normalized);
        }
      })
      .catch((nextError) => {
        if (disposed) return;
        setSnapshot(null);
        setError(nextError instanceof Error ? nextError.message : 'Unable to load external interfacing posture.');
      })
      .finally(() => {
        if (!disposed) setIsLoading(false);
      });

    return () => {
      disposed = true;
    };
  }, [environmentMode]);

  useEffect(() => {
    let disposeFetch = refresh();
    const intervalId = window.setInterval(() => {
      disposeFetch?.();
      disposeFetch = refresh();
    }, 2500);

    return () => {
      disposeFetch?.();
      window.clearInterval(intervalId);
    };
  }, [refresh]);

  const handleRecordBoundaryReadiness = async () => {
    if (!snapshot || !onRecordActivity) return;

    setIsRecording(true);
    setRecordMessage(null);

    try {
      await onRecordActivity(buildApplicationExternalInterfacingDraft(snapshot));
      setRecordMessage('External interface readiness recorded into the Bitcode activity ledger.');
    } catch (nextError) {
      setRecordMessage(
        nextError instanceof Error ? nextError.message : 'Unable to record external interface readiness.',
      );
    } finally {
      setIsRecording(false);
    }
  };

  const counts = snapshot?.counts;

  return (
    <ApplicationWorkspaceCard
      kicker="Boundary runtime"
      title="External interface readiness"
      summary="Check what is live, modeled, or blocked before you trust the rest of the operating chain."
      explainer={APPLICATION_WORKSPACE_EXPLAINERS.boundaryRuntime}
    >
      {recordMessage ? (
        <div className="mb-4 rounded-[1.3rem] border border-white/8 bg-white/5 px-4 py-4 text-sm leading-6 text-neutral-200">
          {recordMessage}
        </div>
      ) : null}

      <div className="grid gap-3 text-xs uppercase tracking-[0.2em] text-neutral-400 tablet:grid-cols-2">
        <div className="rounded-2xl border border-white/8 bg-black/20 px-4 py-4">
          <p className="text-emerald-300/85">Runtime scope</p>
          <p className="mt-2 text-neutral-200">connected interfaces</p>
        </div>
        <div className="rounded-2xl border border-white/8 bg-black/20 px-4 py-4">
          <p className="text-emerald-300/85">Read posture</p>
          <p className="mt-2 text-neutral-200">boundary honesty</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div className="rounded-[1.6rem] border border-white/8 bg-black/20 px-5 py-5">
          <div className="flex items-center justify-between gap-3">
            <p className="text-[0.68rem] uppercase tracking-[0.24em] text-neutral-400">Boundary readiness</p>
            <button
              type="button"
              onClick={() => {
                refresh(false);
              }}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[0.68rem] uppercase tracking-[0.18em] text-neutral-200 transition hover:border-white/18 hover:bg-white/10"
            >
              Refresh
            </button>
            <button
              type="button"
              disabled={!snapshot || isRecording}
              onClick={() => {
                void handleRecordBoundaryReadiness();
              }}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[0.68rem] uppercase tracking-[0.18em] text-neutral-200 transition hover:border-white/18 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isRecording ? 'Recording…' : 'Record readiness'}
            </button>
          </div>

          {isLoading && !snapshot ? (
            <div className="mt-4 rounded-[1.3rem] border border-white/8 bg-white/5 px-4 py-8 text-sm text-neutral-400">
              Loading external interfacing posture…
            </div>
          ) : error ? (
            <div className="mt-4 rounded-[1.3rem] border border-red-500/20 bg-red-500/10 px-4 py-5 text-sm text-red-200">
              {error}
            </div>
          ) : snapshot ? (
            <>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-[1.3rem] border border-white/8 bg-white/5 px-4 py-4">
                  <p className="text-[0.66rem] uppercase tracking-[0.18em] text-neutral-500">Environment mode</p>
                  <p className="mt-3 text-lg font-semibold text-white">{snapshot.configuredEnvironmentMode}</p>
                  <p className="mt-2 text-[0.66rem] uppercase tracking-[0.14em] text-neutral-500">
                    {environmentMode ? 'Route override active' : 'Runtime default'}
                  </p>
                </div>
                <div className="rounded-[1.3rem] border border-white/8 bg-white/5 px-4 py-4">
                  <p className="text-[0.66rem] uppercase tracking-[0.18em] text-neutral-500">Actuality</p>
                  <p className="mt-3 text-sm leading-6 text-white">{snapshot.actualityDisposition}</p>
                </div>
                <div className="rounded-[1.3rem] border border-white/8 bg-white/5 px-4 py-4">
                  <p className="text-[0.66rem] uppercase tracking-[0.18em] text-neutral-500">Live configured</p>
                  <p className="mt-3 text-lg font-semibold text-white">{counts?.liveConfigured ?? 0}</p>
                </div>
                <div className="rounded-[1.3rem] border border-white/8 bg-white/5 px-4 py-4">
                  <p className="text-[0.66rem] uppercase tracking-[0.18em] text-neutral-500">Boundary only</p>
                  <p className="mt-3 text-lg font-semibold text-white">{counts?.boundaryOnly ?? 0}</p>
                </div>
              </div>

              <div className="mt-4 rounded-[1.3rem] border border-white/8 bg-white/5 px-4 py-4 text-sm leading-6 text-neutral-300">
                {counts?.blocking ? (
                  <span className="inline-flex items-center gap-2 text-red-200">
                    <ShieldAlert className="h-4 w-4" />
                    {counts.blocking} interface
                    {counts.blocking === 1 ? '' : 's'} currently block live-ready posture and remain fail-closed.
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-2 text-emerald-200">
                    <ShieldCheck className="h-4 w-4" />
                    No application-visible interface is currently misconfigured.
                  </span>
                )}
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => jumpToShellSection('panelOperatingPicture')}
                  className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-2 text-[0.72rem] uppercase tracking-[0.18em] text-emerald-100 transition hover:border-emerald-300/45 hover:bg-emerald-400/15"
                >
                  Focus operating picture
                </button>
                <button
                  type="button"
                  onClick={() => jumpToShellSection('panelSettlement')}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[0.72rem] uppercase tracking-[0.18em] text-neutral-200 transition hover:border-white/18 hover:bg-white/10"
                >
                  Focus settlement proof
                </button>
              </div>
            </>
          ) : null}
        </div>

        <div className="rounded-[1.6rem] border border-white/8 bg-black/20 px-5 py-5">
          <p className="text-[0.68rem] uppercase tracking-[0.24em] text-neutral-400">Interface runtime states</p>
          <div className="mt-4 grid gap-3">
            {snapshot?.interfaces.length ? (
              snapshot.interfaces.map((entry) => (
                <article key={entry.interfaceId} className="rounded-[1.3rem] border border-white/8 bg-white/5 px-4 py-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[0.66rem] uppercase tracking-[0.18em] text-emerald-300/75">Interface</p>
                      <h3 className="mt-2 text-base font-semibold text-white">{entry.label}</h3>
                    </div>
                    <span className={`rounded-full border px-2.5 py-1 text-[0.62rem] uppercase tracking-[0.18em] ${runtimeTone(entry.runtimeState, entry.blocking)}`}>
                      {formatLabel(entry.runtimeState)}
                    </span>
                  </div>

                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-[1rem] border border-white/8 bg-black/20 px-3 py-3">
                      <p className="text-[0.6rem] uppercase tracking-[0.14em] text-neutral-500">Result class</p>
                      <p className="mt-2 text-sm font-medium text-white">{entry.resultClass}</p>
                    </div>
                    <div className="rounded-[1rem] border border-white/8 bg-black/20 px-3 py-3">
                      <p className="text-[0.6rem] uppercase tracking-[0.14em] text-neutral-500">Reconciliation</p>
                      <p className="mt-2 text-sm font-medium text-white">{entry.reconciliationState}</p>
                    </div>
                  </div>

                  <dl className="mt-4 space-y-3 rounded-[1rem] border border-white/8 bg-black/20 px-3 py-3 text-sm">
                    <div>
                      <dt className="text-neutral-500">Telemetry coverage</dt>
                      <dd className="mt-1 text-neutral-100">{entry.telemetryCoverageState}</dd>
                    </div>
                    {entry.environmentIdentityRef ? (
                      <div>
                        <dt className="text-neutral-500">Identity ref</dt>
                        <dd className="mt-1 break-words text-neutral-100">{entry.environmentIdentityRef}</dd>
                      </div>
                    ) : null}
                    {entry.environmentResourceRef ? (
                      <div>
                        <dt className="text-neutral-500">Resource ref</dt>
                        <dd className="mt-1 break-words text-neutral-100">{entry.environmentResourceRef}</dd>
                      </div>
                    ) : null}
                    <div>
                      <dt className="text-neutral-500">Live enabled</dt>
                      <dd className="mt-1 text-neutral-100">{entry.liveEnabled ? 'yes' : 'no'}</dd>
                    </div>
                    {entry.missingBindingKeys.length ? (
                      <div>
                        <dt className="text-neutral-500">Missing bindings</dt>
                        <dd className="mt-1 text-red-200">{entry.missingBindingKeys.join(', ')}</dd>
                      </div>
                    ) : null}
                    {entry.missingSecretEnvKeys.length ? (
                      <div>
                        <dt className="text-neutral-500">Missing secrets</dt>
                        <dd className="mt-1 text-red-200">{entry.missingSecretEnvKeys.join(', ')}</dd>
                      </div>
                    ) : null}
                  </dl>
                </article>
              ))
            ) : (
              <div className="rounded-[1.3rem] border border-white/8 bg-white/5 px-4 py-8 text-sm text-neutral-400">
                No external runtime states are currently surfaced.
              </div>
            )}
          </div>
          <div className="mt-4 rounded-[1.3rem] border border-white/8 bg-white/5 px-4 py-4 text-sm leading-6 text-neutral-300">
            Boundary truth remains explicit here: what is mocked, what is boundary-only, what is live-configured, and what
            is misconfigured all stay visible from the application surface.
          </div>
        </div>
      </div>
    </ApplicationWorkspaceCard>
  );
}
