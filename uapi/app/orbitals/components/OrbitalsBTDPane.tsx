"use client";

import Link from "next/link";
import React, { useEffect, useMemo, useRef, useState } from "react";

import { useAuth } from "@/components/base/engi/auth/AuthProvider";
import { useUserData } from "@/hooks/useUserData";

import OrbitalsBTDOrbitalHeader from "./headers/OrbitalsBTDOrbitalHeader";
import { orbitalsPaneExplainers } from "./orbital-pane-explainers";
import OrbitalsPreferenceCards, {
  type OrbitalsPreferenceCardItem,
} from "./shared/OrbitalsPreferenceCards";
import OrbitalsStatGrid from "./shared/OrbitalsStatGrid";
import OrbitalsWorkspaceSection from "./shared/OrbitalsWorkspaceSection";

interface BTDPaneProps {
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

function formatBtdBalance(credits: number) {
  return `${credits.toLocaleString()} BTD`;
}

function resolveWalletAddress(profile: Record<string, any> | null, userId: string | undefined) {
  if (profile?.wallet_address) {
    return String(profile.wallet_address);
  }

  if (!userId) {
    return "Wallet binding pending";
  }

  return `Binding pending for ${userId.slice(0, 8)}...`;
}

export default function OrbitalsBTDPane({
  onSave,
  loading,
  isOnboardingComplete = false,
  onCompletionStatusChange,
}: BTDPaneProps) {
  const { user } = useAuth();
  const { data, credits } = useUserData();
  const hasCalledCompletionRef = useRef(false);
  const savedPreferences = (data?.modelPreferences as Record<string, any> | null) || null;
  const profile = (data?.profile as Record<string, any> | null) || null;
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

  const preferenceCards = useMemo<OrbitalsPreferenceCardItem[]>(
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
            hint: "Keep the innermost orbital biased toward the active account.",
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
        description: "Choose which surface should reopen when you jump back from the inner orbital.",
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
            hint: "Return to the main transactions surface first.",
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
        description: "Shape how decisive the inner orbital should feel when it reintroduces BTD-side follow-through.",
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
        description: "Set how aggressively the orbital should expect wallet-facing information to refresh.",
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
        <OrbitalsBTDOrbitalHeader isOnboardingComplete={isOnboardingComplete} />

        {!user ? (
          <OrbitalsWorkspaceSection
            kicker="Access posture"
            title="Sign in before opening $BTD posture"
            description="Open Profile first so wallet identity, team membership, and access posture are present before you work from the inner orbital."
            explainer={orbitalsPaneExplainers.btdWallet}
            tone="amber"
          >
            <div className="space-y-4">
              <p className="text-sm leading-7 text-white/70">
                The innermost orbital keeps balances, share posture, and advanced defaults in one place once your account is open.
              </p>
              <Link
                href="/auxillaries/profile"
                className="inline-flex items-center justify-center rounded-full border border-emerald-300/24 bg-emerald-400/12 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-50 transition-colors hover:border-emerald-300/42 hover:bg-emerald-400/18"
              >
                Open Profile orbital
              </Link>
            </div>
          </OrbitalsWorkspaceSection>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <OrbitalsWorkspaceSection
              kicker="Wallet posture"
              title="Keep balances, identity, and membership readable together"
              description="The $BTD orbital should make account trust, balances, and team posture immediately legible before you return to transactions or closure."
              explainer={orbitalsPaneExplainers.btdWallet}
              tone="amber"
            >
              <OrbitalsStatGrid
                items={[
                  {
                    label: "BTD balance",
                    value: formatBtdBalance(credits),
                    detail: "Current inner-orbital throughput balance visible to the account.",
                    tone: "amber",
                  },
                  {
                    label: "BTC posture",
                    value: profile?.btc_balance ? `${profile.btc_balance} BTC` : "Binding pending",
                    detail: profile?.btc_balance
                      ? "Live BTC balance supplied by the connected wallet posture."
                      : "Attach a wallet binding to surface live BTC posture here.",
                    tone: "sky",
                  },
                  {
                    label: "Wallet address",
                    value: resolveWalletAddress(profile, user.id),
                    detail: "The address posture the application will use once wallet binding is complete.",
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
            </OrbitalsWorkspaceSection>

            <OrbitalsWorkspaceSection
              kicker="Share posture"
              title="Choose how $BTD detail should read back into transactions"
              description="Use the inner orbital to decide whether account, organization, or network share posture should dominate when you reopen main operator surfaces."
              explainer={orbitalsPaneExplainers.btdShares}
              tone="violet"
            >
              <OrbitalsPreferenceCards items={preferenceCards.slice(0, 3)} />
            </OrbitalsWorkspaceSection>

            <OrbitalsWorkspaceSection
              kicker="Advanced defaults"
              title="Set the inner-orbital follow-through posture"
              description="These controls shape how review, replay, and wallet refresh should behave when BTD-specific detail re-enters the main application."
              explainer={orbitalsPaneExplainers.btdAdvanced}
              tone="sky"
            >
              <OrbitalsPreferenceCards items={preferenceCards.slice(3)} />
            </OrbitalsWorkspaceSection>

            <OrbitalsWorkspaceSection
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
            </OrbitalsWorkspaceSection>

            <div className="flex items-center justify-between gap-4 rounded-[22px] border border-white/10 bg-black/20 px-5 py-4">
              <p className="text-sm leading-7 text-white/68">
                Save the current $BTD posture so the inner orbital reopens with the same share, replay, and wallet-facing defaults.
              </p>
              <button type="submit" className="primary-button save-button" disabled={loading}>
                {isOnboardingComplete ? "Save $BTD orbital" : "Continue"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
