"use client";

import Link from 'next/link';
import React, { useEffect } from 'react';

import { useAuth } from '@/components/base/bitcode/auth/AuthProvider';
import { VCSIntegrationPanel } from '@/components/base/bitcode/vcs/VCSIntegrationPanel';
import { getRepositoryInventorySourceLabel } from '@/app/application/application-repository-context';
import { deriveBitcodeTransactionReadiness } from '@/app/application/bitcode-transaction-readiness';
import { useUserData } from '@/hooks/useUserData';

import AuxillariesConnectsPaneHeader from '@/app/auxillaries/components/headers/AuxillariesConnectsPaneHeader';

export interface AuxillariesConnectsPaneProps {
  onSave: (data: any) => void;
  loading: boolean;
  isOnboardingComplete?: boolean;
  onCompletionStatusChange?: (isComplete: boolean) => void;
}

export default function AuxillariesConnectsPane({
  onSave,
  loading: _loading,
  isOnboardingComplete = false,
  onCompletionStatusChange,
}: AuxillariesConnectsPaneProps) {
  const { user } = useAuth();
  const {
    hasGitHubConnection,
    hasWalletConnection,
    hasVerifiedWalletConnection,
    walletBindingStatus,
    organizations = [],
    repositories = [],
    repositoryInventorySource = null,
    isLoading,
    refresh,
  } = useUserData();

  useEffect(() => {
    onCompletionStatusChange?.(Boolean(user && hasGitHubConnection));
  }, [hasGitHubConnection, onCompletionStatusChange, user]);

  const transactionReadiness = deriveBitcodeTransactionReadiness({
    signedIn: Boolean(user),
    hasRepositoryProvider: hasGitHubConnection,
    hasWalletBinding: hasWalletConnection,
    hasVerifiedWalletBinding: hasVerifiedWalletConnection,
  });

  return (
    <div data-testid="connects-pane-container">
      <div className="orbital-step-content connects-step">
        <AuxillariesConnectsPaneHeader isOnboardingComplete={isOnboardingComplete} />

        {!user ? (
          <div className="space-y-4 rounded-[24px] border border-white/10 bg-black/20 p-5 text-white/80">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-white">Sign in to open Connects</h3>
              <p className="text-sm leading-7 text-white/68">
                Sign in first, then attach GitHub so need measurement, asset-pack synthesis, and settlement follow-through can operate against a live repository source.
              </p>
            </div>

              <div className="grid gap-3 tablet:grid-cols-2">
                <div className="rounded-2xl border border-emerald-300/16 bg-emerald-400/8 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200/78">
                    Execution prerequisite
                  </p>
                  <p className="mt-2 text-sm leading-7 text-white/74">
                    GitHub plus a connected wallet are the minimum live prerequisites before Bitcode
                    should measure need, synthesize asset packs, settle, and deliver.
                  </p>
                </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/72">
                  Current posture
                </p>
                <p className="mt-2 text-sm leading-7 text-white/74">
                  Email code or a linked provider restores Bitcode access first. Connects then owns
                  repository attachment, scope review, and external interface posture.
                </p>
              </div>
            </div>

            <div>
              <Link
                href="/auxillaries/profile"
                className="inline-flex items-center justify-center rounded-full border border-emerald-300/24 bg-emerald-400/12 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-50 transition-colors hover:border-emerald-300/42 hover:bg-emerald-400/18"
              >
                Open Profile auxillary
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
                  <h3 className="text-lg font-semibold text-white">Connect GitHub for source-bearing input</h3>
                  <p className="text-sm leading-7 text-white/68">
                    Manage the repository attachment that Bitcode reuses across need measurement, asset-pack synthesis, conversations, and settlement follow-through.
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
                    Mainnet readiness
                  </p>
                  <div className="mt-3 rounded-2xl border border-white/8 bg-black/20 p-4">
                    <p className="text-sm font-medium text-white">
                      {isLoading
                        ? 'Checking GitHub and wallet posture…'
                        : transactionReadiness.canSettle
                          ? 'GitHub and verified wallet are ready'
                        : transactionReadiness.canTransact
                          ? 'GitHub and wallet identity are ready'
                          : 'GitHub and wallet are not both ready yet'}
                    </p>
                    <p className="mt-2 text-sm leading-7 text-white/68">
                      {transactionReadiness.canSettle
                        ? 'Bitcode can now reuse live repository context and verified wallet posture across need measurement, asset-pack synthesis, and signed settlement follow-through.'
                        : transactionReadiness.canTransact
                        ? 'Bitcode can now reuse live repository context and Profile-owned wallet identity across need measurement, asset-pack synthesis, and transaction drafting. Signed settlement still waits on verified wallet-provider access.'
                        : `${transactionReadiness.summary} Bitcode may stay in review, but settlement requires both a live GitHub connection here and a wallet binding in Profile before it should move from evaluation into asset-pack delivery.`}
                    </p>
                  </div>
                  <div className="mt-3 grid gap-3 tablet:grid-cols-3">
                    <div className="rounded-2xl border border-white/8 bg-white/5 p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/64">
                        GitHub
                      </p>
                      <p className="mt-2 text-sm font-medium text-white">
                        {hasGitHubConnection ? 'Connected' : 'Pending'}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-white/8 bg-white/5 p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/64">
                        Wallet
                      </p>
                      <p className="mt-2 text-sm font-medium text-white">
                        {!hasWalletConnection
                          ? 'Pending in Profile'
                          : hasVerifiedWalletConnection
                            ? 'Verified signer'
                            : walletBindingStatus === 'pending'
                              ? 'Verification staged'
                              : 'Identity bound'}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-white/8 bg-white/5 p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/64">
                        Inventory source
                      </p>
                      <p className="mt-2 text-sm font-medium text-white">
                        {getRepositoryInventorySourceLabel(repositoryInventorySource)}
                      </p>
                    </div>
                  </div>
                  {!hasWalletConnection && (
                    <div className="mt-3">
                      <Link
                        href="/auxillaries/profile"
                        className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/82 transition-colors hover:border-white/20 hover:bg-white/10"
                      >
                        Open Profile for wallet binding
                      </Link>
                    </div>
                  )}
                </div>

                {(organizations.length > 0 || repositories.length > 0) && (
                  <div className="github-connection-summary rounded-[24px] border border-white/10 bg-white/5 p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/72">
                      Connected scope
                    </p>
                    <p className="mt-3 text-sm leading-7 text-white/68">
                      These repository attachments define the live scope Bitcode can read when it
                      measures need, synthesizes asset packs, and prepares settlement follow-through.
                      The current source of truth is {getRepositoryInventorySourceLabel(repositoryInventorySource)}.
                    </p>

                    {organizations.length > 0 && (
                      <div className="mt-4 space-y-2">
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
                                : repository?.fullName || repository?.full_name || repository?.name || 'repository';
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
                    <li>Wallet identity stays grouped in Profile while Connects owns repository attachment and interface scope.</li>
                    <li>GitHub scope doubles as source-bearing inputability for need measurement, asset-pack synthesis, and proof follow-through.</li>
                    <li>Connects now rereads repository scope through the same stored-first or live-fallback inventory contract that Bitcode write admission enforces.</li>
                    <li>GitHub plus wallet posture are the minimum live prerequisites before Bitcode settles or writes.</li>
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
