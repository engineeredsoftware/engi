"use client";

import type { BitcodeExplainer } from "@/components/base/engi/execution/bitcode-transaction-types";

export const auxillaryPaneExplainers: Record<
  "interfacesDefaults" | "interfacesPrompt" | "interfacesModels" | "btdWallet" | "btdShares" | "btdAdvanced",
  BitcodeExplainer
> = {
  interfacesDefaults: {
    kicker: "Interfaces auxillary",
    title: "Interface defaults",
    summary:
      "Keep the transactions surface, conversations, and proof reading aligned to one operator posture.",
    detail:
      "These defaults shape how the main transactions surface opens, how detail is emphasized, and how evidence is read before closure.",
    points: [
      "Choose the master-detail density you want to read first",
      "Keep conversation entry and continuity predictable",
      "Decide whether proofs open visually, mixed, or as raw evidence",
    ],
  },
  interfacesPrompt: {
    kicker: "Interfaces auxillary",
    title: "Instruction baseline",
    summary:
      "The global prompt baseline carries the user-visible posture the application should keep when it reasons or explains.",
    detail:
      "Use a bounded baseline here when you want calmer, more exact application behavior without rewriting every transaction or conversation locally.",
    points: [
      "Keep formal or decisive tone consistent",
      "Bias toward throughput, quality, or balanced review",
      "Preserve one reusable default instruction surface",
    ],
  },
  interfacesModels: {
    kicker: "Interfaces auxillary",
    title: "Model posture",
    summary:
      "Global model posture lets you decide what provider family should anchor the current transactions surface by default.",
    detail:
      "This is not a hidden debugging panel. It is the place to set the baseline model mix the operator wants to reuse across master-detail and conversation work.",
    points: [
      "Apply one default model family to the current transactions surface",
      "Review visible cost and context posture before switching",
      "Keep model choice explicit rather than implicit",
    ],
  },
  btdWallet: {
    kicker: "$BTD auxillary",
    title: "Wallet posture",
    summary:
      "Keep identity, balances, account trust, and membership posture legible before you lean on heavier Bitcode throughput.",
    detail:
      "The inner auxillary should make wallet-facing posture readable at a glance instead of hiding it behind account menus or detached account pages.",
    points: [
      "Review current BTD balance and live access posture",
      "Surface whether BTC and wallet binding are already attached",
      "Keep team and membership posture visible beside balances",
    ],
  },
  btdShares: {
    kicker: "$BTD auxillary",
    title: "Share posture",
    summary:
      "Share reading controls how you want ownership, settlement, and organization participation to surface in transactions.",
    detail:
      "Use this when you want the operator view to bias toward organization-level, network-level, or account-level share reading.",
    points: [
      "Choose the share lens that matches the current operating context",
      "Keep settlement reading explicit before closure",
      "Control how BTD-specific detail re-enters master-detail surfaces",
    ],
  },
  btdAdvanced: {
    kicker: "$BTD auxillary",
    title: "Advanced defaults",
    summary:
      "Advanced $BTD defaults shape how the inner auxillary biases replay, automation, and settlement follow-through.",
    detail:
      "These controls are for the operator who wants BTD-specific behavior to stay explicit and reusable without breaking the application reading posture.",
    points: [
      "Bias toward review-first or more decisive settlement handling",
      "Decide how BTD detail should open back into transaction views",
      "Keep replay and closure posture aligned to one account preference",
    ],
  },
};
