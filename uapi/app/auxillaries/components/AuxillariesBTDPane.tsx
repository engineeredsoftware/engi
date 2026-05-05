"use client";

import Link from "next/link";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { readBitcodeWalletBindingFromProfile } from '@bitcode/orm';

import { useAuth } from "@/components/base/bitcode/auth/AuthProvider";
import { useUserData } from "@/hooks/useUserData";

import AuxillariesBTDPaneHeader from "@/app/auxillaries/components/headers/AuxillariesBTDPaneHeader";
import AuxillariesDataSharingPanel from "@/app/auxillaries/components/AuxillariesDataSharingPanel";
import { auxillaryPaneExplainers } from "@/app/auxillaries/components/auxillary-pane-explainers";
import AuxillariesPreferenceCards, {
  type AuxillariesPreferenceCardItem,
} from "@/app/auxillaries/components/shared/AuxillariesPreferenceCards";
import AuxillariesStatGrid from "@/app/auxillaries/components/shared/AuxillariesStatGrid";
import AuxillariesWorkspaceSection from "@/app/auxillaries/components/shared/AuxillariesWorkspaceSection";

export interface AuxillariesBTDPaneProps {
  onSave: (data: any) => void;
  loading: boolean;
  isOnboardingComplete?: boolean;
  onCompletionStatusChange?: (isComplete: boolean) => void;
}

type ShareLens = "account" | "organization" | "network";
type SettlementView = "review" | "bounded" | "replay";
type BtdDetailView = "transactions" | "proofs" | "history";
type AutomationBias = "review-first" | "guided" | "decisive";
type WalletSync = "manual" | "daily" | "live";

interface BtdDefaults {
  shareLens: ShareLens;
  settlementView: SettlementView;
  btdDetailView: BtdDetailView;
  automationBias: AutomationBias;
  walletSync: WalletSync;
}

const DEFAULT_BTD_DEFAULTS: BtdDefaults = {
  shareLens: "account",
  settlementView: "bounded",
  btdDetailView: "transactions",
  automationBias: "review-first",
  walletSync: "manual",
};

function formatBtdHoldings(btdBalance: number) {
  return `${btdBalance.toLocaleString()} $BTD`;
}

function formatBtcFeeBalance(balance: unknown) {
  const numericBalance =
    typeof balance === "number"
      ? balance
      : typeof balance === "string" && balance.trim()
        ? Number(balance)
        : null;

  if (typeof numericBalance !== "number" || !Number.isFinite(numericBalance)) {
    return "Binding pending";
  }

  return `${numericBalance.toLocaleString(undefined, {
    maximumFractionDigits: numericBalance >= 1 ? 4 : 8,
  })} BTC`;
}

function resolveWalletAddress(profile: Record<string, any> | null, userId: string | undefined) {
  const walletBinding = readBitcodeWalletBindingFromProfile(profile);
  if (walletBinding?.address) {
    return String(walletBinding.address);
  }

  if (!userId) {
    return "Wallet binding pending";
  }

  return `Binding pending for ${userId.slice(0, 8)}...`;
}

export default function AuxillariesBTDPane({
  onSave,
  loading,
  isOnboardingComplete = false,
  onCompletionStatusChange,
}: AuxillariesBTDPaneProps) {
  const { user } = useAuth();
  const {
    data,
    btdBalance = 0,
    btcFeeBalance = null,
    hasStoredVerifiedWalletConnection = false,
    hasVerifiedWalletConnection,
  } = useUserData();
  const hasCalledCompletionRef = useRef(false);
  const savedPreferences = (data?.modelPreferences as Record<string, any> | null) || null;
  const profile = (data?.profile as Record<string, any> | null) || null;
  const walletBinding = readBitcodeWalletBindingFromProfile(profile);
  const btcFeeBalanceSource = btcFeeBalance ?? profile?.btc_balance;
  const hasReadableBtcFeeBalance =
    typeof btcFeeBalanceSource === "number" ||
    (typeof btcFeeBalanceSource === "string" && Number.isFinite(Number(btcFeeBalanceSource)));
  const teamMembers = Array.isArray(profile?.team_members) ? profile.team_members : [];
  const [defaults, setDefaults] = useState<BtdDefaults>(() => ({
    ...DEFAULT_BTD_DEFAULTS,
    ...(savedPreferences?.btdDefaults || {}),
  }));

  useEffect(() => {
    if (onCompletionStatusChange && !hasCalledCompletionRef.current) {
      hasCalledCompletionRef.current = true;
      onCompletionStatusChange(Boolean(user));
    }
  }, [onCompletionStatusChange, user]);

  useEffect(() => {
    if (!savedPreferences?.btdDefaults) {
      return;
    }

    setDefaults((current) => ({
      ...current,
      ...savedPreferences.btdDefaults,
    }));
  }, [savedPreferences]);

  const membershipSummary = useMemo(() => {
    if (!teamMembers.length) {
      return "Single operator";
    }

    return `${teamMembers.length + 1} active members`;
  }, [teamMembers.length]);

  const preferenceCards = useMemo<AuxillariesPreferenceCardItem[]>(
    () => [
      {
        id: "share-lens",
        title: "Share lens",
        description: "Choose how $BTD ownership and participation should read when you reopen transactions.",
        value: defaults.shareLens,
        onChange: (value) =>
          setDefaults((current) => ({
            ...current,
            shareLens: value as ShareLens,
          })),
        options: [
          {
            value: "account",
            label: "Account",
            hint: "Keep the innermost auxillary biased toward the active account.",
          },
          {
            value: "organization",
            label: "Organization",
            hint: "Bias toward shared organization and role posture.",
          },
          {
            value: "network",
            label: "Network",
            hint: "Read $BTD posture through broader market participation first.",
          },
        ],
      },
      {
        id: "settlement-view",
        title: "Settlement view",
        description: "Set the closure-reading stance you want when BTD-specific settlement re-enters detail.",
        value: defaults.settlementView,
        onChange: (value) =>
          setDefaults((current) => ({
            ...current,
            settlementView: value as SettlementView,
          })),
        options: [
          {
            value: "review",
            label: "Review",
            hint: "Bias toward slower, explicit settlement inspection first.",
          },
          {
            value: "bounded",
            label: "Bounded",
            hint: "Keep closure exact and auditable without opening every replay view.",
          },
          {
            value: "replay",
            label: "Replay",
            hint: "Bias toward replayable accounting and witness detail.",
          },
        ],
      },
      {
        id: "btd-detail-view",
        title: "BTD detail return",
        description: "Choose which surface should reopen when you jump back from the inner auxillary.",
        value: defaults.btdDetailView,
        onChange: (value) =>
          setDefaults((current) => ({
            ...current,
            btdDetailView: value as BtdDetailView,
          })),
        options: [
          {
            value: "transactions",
            label: "Transactions",
            hint: "Return to the Bitcode Terminal first.",
          },
          {
            value: "proofs",
            label: "Proofs",
            hint: "Return directly to evidence-bearing proof detail.",
          },
          {
            value: "history",
            label: "History",
            hint: "Reopen the latest BTD-relevant history read first.",
          },
        ],
      },
      {
        id: "automation-bias",
        title: "Automation bias",
        description: "Shape how decisive the inner auxillary should feel when it reintroduces BTD-side follow-through.",
        value: defaults.automationBias,
        onChange: (value) =>
          setDefaults((current) => ({
            ...current,
            automationBias: value as AutomationBias,
          })),
        options: [
          {
            value: "review-first",
            label: "Review-first",
            hint: "Require explicit operator review before decisive follow-through.",
          },
          {
            value: "guided",
            label: "Guided",
            hint: "Keep suggestions strong while preserving visible checkpoints.",
          },
          {
            value: "decisive",
            label: "Decisive",
            hint: "Bias toward shorter, stronger default follow-through.",
          },
        ],
      },
      {
        id: "wallet-sync",
        title: "Wallet sync posture",
        description: "Set how aggressively the auxillary should expect wallet-facing information to refresh.",
        value: defaults.walletSync,
        onChange: (value) =>
          setDefaults((current) => ({
            ...current,
            walletSync: value as WalletSync,
          })),
        options: [
          {
            value: "manual",
            label: "Manual",
            hint: "Refresh wallet-facing posture only when you ask for it.",
          },
          {
            value: "daily",
            label: "Daily",
            hint: "Expect slower, deliberate balance posture updates.",
          },
          {
            value: "live",
            label: "Live",
            hint: "Bias toward quicker reflected posture as bindings mature.",
          },
        ],
      },
    ],
    [defaults],
  );

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    onSave({
      ...(savedPreferences || {}),
      btdDefaults: defaults,
      btdSummary: {
        shareLens: defaults.shareLens,
        settlementView: defaults.settlementView,
      },
    });
  };

  return (
    <div data-testid="btd-pane-container">
      <div className="orbital-step-content btd-step">
        <AuxillariesBTDPaneHeader isOnboardingComplete={isOnboardingComplete} />

        {!user ? (
          <AuxillariesWorkspaceSection
            kicker="Access posture"
            title="Sign in before opening $BTD posture"
            description="Open Profile first so wallet identity, team membership, and access posture are present before you work from the inner auxillary."
            explainer={auxillaryPaneExplainers.btdWallet}
            tone="amber"
          >
            <div className="space-y-4">
              <p className="text-sm leading-7 text-white/70">
                The innermost auxillary keeps balances, share posture, and advanced defaults in one place once your account is open.
              </p>
              <Link
                href="/auxillaries/profile"
                className="inline-flex items-center justify-center rounded-full border border-emerald-300/24 bg-emerald-400/12 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-50 transition-colors hover:border-emerald-300/42 hover:bg-emerald-400/18"
              >
                Open Profile auxillary
              </Link>
            </div>
          </AuxillariesWorkspaceSection>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <AuxillariesWorkspaceSection
              kicker="Wallet posture"
              title="Keep BTC fees, $BTD holdings, identity, and membership readable together"
              description="$BTD is a non-fungible share and read-right posture, while BTC is the fee-liquidity posture that should be visible before you return to transactions or closure."
              explainer={auxillaryPaneExplainers.btdWallet}
              tone="amber"
            >
              <AuxillariesStatGrid
                items={[
                  {
                    label: "$BTD holdings",
                    value: formatBtdHoldings(btdBalance),
                    detail: "Non-fungible share/read-right holdings visible to this account.",
                    tone: "amber",
                  },
                  {
                    label: "BTC fee liquidity",
                    value: formatBtcFeeBalance(btcFeeBalanceSource),
                    detail: hasReadableBtcFeeBalance
                      ? "Live BTC fee-liquidity posture supplied by the connected wallet posture."
                      : hasStoredVerifiedWalletConnection && !hasVerifiedWalletConnection
                        ? "Saved verified wallet-provider signer posture exists, but the live signer session needs reconnect before signed settlement or refreshed BTC posture can resume."
                      : walletBinding?.status === 'verified'
                        ? "Verified wallet-provider posture is present, but live BTC balance has not populated yet."
                        : walletBinding?.address
                          ? "Wallet identity is present, but verified wallet-provider signing is still staged before live BTC posture should settle here."
                          : "Attach a wallet binding to surface live BTC posture here.",
                    tone: "sky",
                  },
                  {
                    label: "Wallet address",
                    value: resolveWalletAddress(profile, user.id),
                    detail: hasStoredVerifiedWalletConnection && !hasVerifiedWalletConnection
                      ? "Saved verified signer posture is recorded, but the wallet provider must reconnect before Bitcode can rely on live signing again."
                      : walletBinding?.status === 'verified'
                      ? "The verified signer posture the application will use for signed settlement follow-through."
                      : "The address posture the application will use once wallet identity is bound; verified wallet-provider signing still stages separately.",
                    tone: "violet",
                  },
                  {
                    label: "Membership",
                    value: membershipSummary,
                    detail: teamMembers.length
                      ? "Team and multi-party posture currently reflected in the active profile."
                      : "Single-account posture until more roles join this Bitcode account.",
                    tone: "emerald",
                  },
                ]}
                columns={4}
              />
            </AuxillariesWorkspaceSection>

            <AuxillariesWorkspaceSection
              kicker="Share posture"
              title="Choose how $BTD detail should read back into transactions"
              description="Use the inner auxillary to decide whether account, organization, or network share posture should dominate when you reopen main operator surfaces."
              explainer={auxillaryPaneExplainers.btdShares}
              tone="violet"
            >
              <AuxillariesPreferenceCards items={preferenceCards.slice(0, 3)} />
            </AuxillariesWorkspaceSection>

            <AuxillariesWorkspaceSection
              kicker="Advanced defaults"
              title="Set the inner-orbital follow-through posture"
              description="These controls shape how review, replay, and wallet refresh should behave when BTD-specific detail re-enters the main application."
              explainer={auxillaryPaneExplainers.btdAdvanced}
              tone="sky"
            >
              <AuxillariesPreferenceCards items={preferenceCards.slice(3)} />
            </AuxillariesWorkspaceSection>

            <AuxillariesWorkspaceSection
              kicker="Need-space knowledge"
              title="Set it and forget it repository knowledge sharing"
              description="Once Connects has authenticated GitHub and repository access, this setting decides whether connected repository activity continuously re-syncs into need-space by default."
              tone="amber"
            >
              <div className="space-y-4">
                <p className="text-sm leading-7 text-white/68">
                  This is the larger $BTD-side consent setting for connected knowledge. Turn it on once when you want Connects-approved repositories to keep contributing their latest synced activity into Bitcode need-space without reopening per-repository review every time.
                </p>
                <AuxillariesDataSharingPanel overlayed={!isOnboardingComplete} />
              </div>
            </AuxillariesWorkspaceSection>

            <AuxillariesWorkspaceSection
              kicker="Team + multi-sig"
              title="Keep role and multi-party posture visible"
              description="Profile remains the owner of authentication and identity, but the $BTD orbital should still keep account participation visible before settlement and share reading."
              tone="default"
            >
              <div className="grid gap-3 tablet:grid-cols-2">
                <article className="rounded-[20px] border border-white/8 bg-black/20 p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/72">
                    Active roles
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {teamMembers.length ? (
                      teamMembers.map((member: Record<string, any>) => (
                        <span
                          key={`${member.id}-${member.role}`}
                          className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/74"
                        >
                          {member.display_name || member.username || "member"} · {member.role || "member"}
                        </span>
                      ))
                    ) : (
                      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/74">
                        Account operator
                      </span>
                    )}
                  </div>
                </article>

                <article className="rounded-[20px] border border-white/8 bg-black/20 p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/72">
                    Authentication posture
                  </p>
                  <p className="mt-3 text-base font-semibold text-white">
                    {user.email_confirmed_at ? "Email verified" : "Verification pending"}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-white/62">
                    {user.email_confirmed_at
                      ? "Account access is already authenticated and ready to carry BTD-side defaults."
                      : "Verify the account before relying on BTD-side follow-through."}
                  </p>
                </article>
              </div>
            </AuxillariesWorkspaceSection>

            <div className="flex items-center justify-between gap-4 rounded-[22px] border border-white/10 bg-black/20 px-5 py-4">
              <p className="text-sm leading-7 text-white/68">
                Save the current $BTD posture so the inner auxillary reopens with the same share, replay, and wallet-facing defaults.
              </p>
              <button type="submit" className="primary-button save-button" disabled={loading}>
                {isOnboardingComplete ? "Save $BTD auxillary" : "Continue"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
