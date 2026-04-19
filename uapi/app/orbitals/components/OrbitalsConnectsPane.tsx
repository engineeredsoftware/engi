"use client";

import Link from 'next/link';
import React, { useEffect } from 'react';

import { useAuth } from '@/components/base/engi/auth/AuthProvider';
import { VCSIntegrationPanel } from '@/components/base/engi/vcs/VCSIntegrationPanel';
import { useUserData } from '@/hooks/useUserData';

import OrbitalsConnectsOrbitalHeader from './headers/OrbitalsConnectsOrbitalHeader';

interface ConnectsPaneProps {
  onSave: (data: any) => void;
  loading: boolean;
  isOnboardingComplete?: boolean;
  onCompletionStatusChange?: (isComplete: boolean) => void;
}

export default function ConnectsPane({
  onSave,
  loading: _loading,
  isOnboardingComplete = false,
  onCompletionStatusChange,
}: ConnectsPaneProps) {
  const { user } = useAuth();
  const { data, hasGitHubConnection, isLoading, refresh } = useUserData();

  useEffect(() => {
    onCompletionStatusChange?.(Boolean(user && hasGitHubConnection));
  }, [hasGitHubConnection, onCompletionStatusChange, user]);

  const repositories = Array.isArray((data as any)?.repositories) ? (data as any).repositories : [];
  const organizations = Array.isArray((data as any)?.organizations) ? (data as any).organizations : [];

  return (
    <div data-testid="connects-pane-container">
      <div className="orbital-step-content connects-step">
        <OrbitalsConnectsOrbitalHeader isOnboardingComplete={isOnboardingComplete} />

        {!user ? (
          <div className="space-y-4 rounded-[24px] border border-white/10 bg-black/20 p-5 text-white/80">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-white">Sign in to open Connects</h3>
              <p className="text-sm leading-7 text-white/68">
                Sign in first, then attach GitHub so transactions, deliverables, and closure
                follow-through can operate against a live repository source.
              </p>
            </div>

            <div className="grid gap-3 tablet:grid-cols-2">
              <div className="rounded-2xl border border-emerald-300/16 bg-emerald-400/8 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200/78">
                  Primary connection
                </p>
                <p className="mt-2 text-sm leading-7 text-white/74">
                  GitHub is the first required connection for live repository work in Bitcode.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/72">
                  Current posture
                </p>
                <p className="mt-2 text-sm leading-7 text-white/74">
                  Email code or a linked provider gets you back into Bitcode first. Connects then
                  takes over live repository attachment and scope review.
                </p>
              </div>
            </div>

            <div>
              <Link
                href="/orbitals/profile"
                className="inline-flex items-center justify-center rounded-full border border-emerald-300/24 bg-emerald-400/12 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-50 transition-colors hover:border-emerald-300/42 hover:bg-emerald-400/18"
              >
                Open Profile orbital
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-5">
            <div className="grid gap-4 tablet:grid-cols-[1.15fr_0.85fr]">
              <section className="rounded-[24px] border border-white/10 bg-black/20 p-5">
                <div className="mb-4 space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-200/72">
                    Repository connection
                  </p>
                  <h3 className="text-lg font-semibold text-white">Connect GitHub for live repository work</h3>
                  <p className="text-sm leading-7 text-white/68">
                    Manage the repository connection that Bitcode reuses across transactions,
                    deliverables, conversations, and follow-through.
                  </p>
                </div>

                <VCSIntegrationPanel
                  showGitHub
                  showGitLab={false}
                  showBitbucket={false}
                  onConnectionChange={async (provider, connected) => {
                    if (provider !== 'github') return;
                    await refresh();
                    if (connected) {
                      onSave({ provider, connected });
                    }
                  }}
                />
              </section>

              <aside className="space-y-4">
                <div className="rounded-[24px] border border-white/10 bg-white/5 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-200/72">
                    Connection status
                  </p>
                  <div className="mt-3 rounded-2xl border border-white/8 bg-black/20 p-4">
                    <p className="text-sm font-medium text-white">
                      {isLoading ? 'Checking GitHub connection…' : hasGitHubConnection ? 'GitHub is connected' : 'GitHub is not connected yet'}
                    </p>
                    <p className="mt-2 text-sm leading-7 text-white/68">
                      {hasGitHubConnection
                        ? 'Bitcode can now reuse this repository context across transactions.'
                        : 'Connect GitHub to let Bitcode read and act against live repository context from the application.'}
                    </p>
                  </div>
                </div>

                {(organizations.length > 0 || repositories.length > 0) && (
                  <div className="github-connection-summary rounded-[24px] border border-white/10 bg-white/5 p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/72">
                      Connected scope
                    </p>

                    {organizations.length > 0 && (
                      <div className="mt-3 space-y-2">
                        <p className="text-sm font-medium text-white">Organizations</p>
                        <div className="flex flex-wrap gap-2">
                          {organizations.map((organization: string) => (
                            <span
                              key={organization}
                              className="rounded-full border border-emerald-300/20 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-100"
                            >
                              {organization}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {repositories.length > 0 && (
                      <div className="mt-4 space-y-2">
                        <p className="text-sm font-medium text-white">
                          Connected Repositories ({repositories.length})
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {repositories.slice(0, 8).map((repository: any) => {
                            const label =
                              typeof repository === 'string'
                                ? repository
                                : repository?.full_name || repository?.name || 'repository';
                            return (
                              <span
                                key={label}
                                className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-white/74"
                              >
                                {label}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <div className="rounded-[24px] border border-white/10 bg-white/5 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/72">
                    Additional connections
                  </p>
                  <ul className="mt-3 space-y-2 text-sm leading-7 text-white/68">
                    <li>Wallet identity and share posture stay grouped across Profile and $BTD.</li>
                    <li>Phone and email trigger surfaces will return here as Connects expands.</li>
                    <li>GitHub stays the required live repository connection today.</li>
                  </ul>
                </div>
              </aside>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
