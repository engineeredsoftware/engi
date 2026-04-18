"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

import { useUserData } from "@/hooks/useUserData";
import { SUPPORTED_LLM_MODELS } from "@/utils/model-pricing";

import OrbitalsInterfacesOrbitalHeader from "./headers/OrbitalsInterfacesOrbitalHeader";
import GlobalModelSelection from "./models/GlobalModelSelection";
import SystemPromptSection from "./models/SystemPromptSection";
import { orbitalsPaneExplainers } from "./orbital-pane-explainers";
import OrbitalsPreferenceCards, {
  type OrbitalsPreferenceCardItem,
} from "./shared/OrbitalsPreferenceCards";
import OrbitalsStatGrid from "./shared/OrbitalsStatGrid";
import OrbitalsWorkspaceSection from "./shared/OrbitalsWorkspaceSection";

interface InterfacesPaneProps {
  onSave: (data: any) => void;
  loading: boolean;
  isOnboardingComplete?: boolean;
  onCompletionStatusChange?: (isComplete: boolean) => void;
}

interface ModelOption {
  id: string;
  name: string;
  description: string;
  performance: number;
  cost: number;
  specialization?: string;
  inputUSDPerMTok?: number;
  outputUSDPerMTok?: number;
  inputLimit?: number;
  outputLimit?: number;
}

type MasterDetailDensity = "signal" | "balanced" | "full";
type ConversationLaunch = "overlay" | "focused" | "continuity";
type ProofMode = "visual" | "mixed" | "raw";
type PromptTone = "bounded" | "formal" | "decisive";
type ExecutionBias = "balanced" | "quality" | "throughput";

interface InterfacesDefaults {
  masterDetailDensity: MasterDetailDensity;
  conversationLaunch: ConversationLaunch;
  proofMode: ProofMode;
  promptTone: PromptTone;
  executionBias: ExecutionBias;
}

const DEFAULT_INTERFACES_DEFAULTS: InterfacesDefaults = {
  masterDetailDensity: "balanced",
  conversationLaunch: "continuity",
  proofMode: "mixed",
  promptTone: "formal",
  executionBias: "balanced",
};

function buildModelOptions(): ModelOption[] {
  const priced = SUPPORTED_LLM_MODELS.flatMap((provider) =>
    provider.models
      .map((model) => ({
        model,
        cost:
          (model.inputPriceUSDPerMTok ?? Number.NaN) +
          (model.outputPriceUSDPerMTok ?? Number.NaN),
      }))
      .filter((entry) => !Number.isNaN(entry.cost)),
  );
  const costs = priced.map((entry) => entry.cost);
  const minCost = costs.length ? Math.min(...costs) : 0;
  const maxCost = costs.length ? Math.max(...costs) : 1;
  const span = Math.max(0.000001, maxCost - minCost);

  return SUPPORTED_LLM_MODELS.flatMap((provider) =>
    provider.models.map((model) => {
      const costUSD =
        (model.inputPriceUSDPerMTok ?? Number.NaN) +
        (model.outputPriceUSDPerMTok ?? Number.NaN);
      let costScore = 50;
      let performanceScore = 50;

      if (!Number.isNaN(costUSD)) {
        const normalized = (costUSD - minCost) / span;
        costScore = Math.round(1 + normalized * 99);
        performanceScore = Math.round(1 + (1 - normalized) * 99);
      }

      return {
        id: model.apiId,
        name: `${provider.provider.toUpperCase()} · ${model.id}`,
        description: model.notes || "Live catalog model ready for Bitcode routing.",
        performance: performanceScore,
        cost: costScore,
        specialization: provider.provider,
        inputUSDPerMTok: model.inputPriceUSDPerMTok,
        outputUSDPerMTok: model.outputPriceUSDPerMTok,
        inputLimit: model.inputLimit,
        outputLimit: model.outputLimit,
      };
    }),
  );
}

export default function OrbitalsInterfacesPane({
  onSave,
  loading,
  isOnboardingComplete = false,
  onCompletionStatusChange,
}: InterfacesPaneProps) {
  const { data } = useUserData();
  const hasCalledCompletionRef = useRef(false);
  const savedPreferences = (data?.modelPreferences as Record<string, any> | null) || null;
  const [defaults, setDefaults] = useState<InterfacesDefaults>(() => ({
    ...DEFAULT_INTERFACES_DEFAULTS,
    ...(savedPreferences?.workspaceDefaults || {}),
    ...(savedPreferences?.interfacesDefaults || {}),
  }));
  const [globalSystemPrompt, setGlobalSystemPrompt] = useState(
    String(savedPreferences?.globalSystemPrompt || ""),
  );
  const [tokenCount, setTokenCount] = useState(
    typeof savedPreferences?.tokenCount === "number" ? savedPreferences.tokenCount : 0,
  );
  const [selectedGlobalModel, setSelectedGlobalModel] = useState(
    String(savedPreferences?.defaultModel || savedPreferences?.preferred_model || ""),
  );

  const modelOptions = useMemo(() => buildModelOptions(), []);
  const selectedModel = useMemo(
    () => modelOptions.find((option) => option.id === selectedGlobalModel) || null,
    [modelOptions, selectedGlobalModel],
  );

  useEffect(() => {
    if (onCompletionStatusChange && !hasCalledCompletionRef.current) {
      hasCalledCompletionRef.current = true;
      onCompletionStatusChange(true);
    }
  }, [onCompletionStatusChange]);

  useEffect(() => {
    if (!savedPreferences) {
      return;
    }

    setDefaults((current) => ({
      ...current,
      ...(savedPreferences.workspaceDefaults || {}),
      ...(savedPreferences.interfacesDefaults || {}),
    }));
    setGlobalSystemPrompt(String(savedPreferences.globalSystemPrompt || ""));
    setTokenCount(typeof savedPreferences.tokenCount === "number" ? savedPreferences.tokenCount : 0);

    const nextModel = String(savedPreferences.defaultModel || savedPreferences.preferred_model || "");
    if (nextModel) {
      setSelectedGlobalModel(nextModel);
    }
  }, [savedPreferences]);

  const updateTokenCounter = (value: string) => {
    setTokenCount(Math.ceil(value.length / 4));
  };

  const preferenceCards = useMemo<OrbitalsPreferenceCardItem[]>(
    () => [
      {
        id: "master-detail-density",
        title: "Master-detail density",
        description: "Choose how much structured operator signal opens by default in the transactions workspace.",
        value: defaults.masterDetailDensity,
        onChange: (value) =>
          setDefaults((current) => ({
            ...current,
            masterDetailDensity: value as MasterDetailDensity,
          })),
        options: [
          {
            value: "signal",
            label: "Signal",
            hint: "Favor concise field groups and higher-level closure cues first.",
          },
          {
            value: "balanced",
            label: "Balanced",
            hint: "Keep summary and consequence detail readable together.",
          },
          {
            value: "full",
            label: "Full",
            hint: "Bias toward denser detail and fuller transaction context on open.",
          },
        ],
      },
      {
        id: "conversation-launch",
        title: "Conversation launch",
        description: "Control how conversation work should re-enter the application when opened from operator context.",
        value: defaults.conversationLaunch,
        onChange: (value) =>
          setDefaults((current) => ({
            ...current,
            conversationLaunch: value as ConversationLaunch,
          })),
        options: [
          {
            value: "overlay",
            label: "Overlay",
            hint: "Open the conversation workspace as a dedicated surface anchored to the current flow.",
          },
          {
            value: "focused",
            label: "Focused",
            hint: "Bias toward a narrower, decisive conversation launch posture.",
          },
          {
            value: "continuity",
            label: "Continuity",
            hint: "Preserve the current transaction and route context when entering chat.",
          },
        ],
      },
      {
        id: "proof-mode",
        title: "Proof read mode",
        description: "Decide how evidence and JSON-bearing detail should open when you inspect proofs.",
        value: defaults.proofMode,
        onChange: (value) =>
          setDefaults((current) => ({
            ...current,
            proofMode: value as ProofMode,
          })),
        options: [
          {
            value: "visual",
            label: "Visual",
            hint: "Lead with shaped evidence and field summaries.",
          },
          {
            value: "mixed",
            label: "Mixed",
            hint: "Keep structured shape and raw payload equally visible.",
          },
          {
            value: "raw",
            label: "Raw",
            hint: "Bias toward exact payload reading first.",
          },
        ],
      },
      {
        id: "prompt-tone",
        title: "Instruction tone",
        description: "Choose the user-facing reasoning posture the application should prefer.",
        value: defaults.promptTone,
        onChange: (value) =>
          setDefaults((current) => ({
            ...current,
            promptTone: value as PromptTone,
          })),
        options: [
          {
            value: "bounded",
            label: "Bounded",
            hint: "Stay careful, exact, and boundary-honest before expanding.",
          },
          {
            value: "formal",
            label: "Formal",
            hint: "Keep a clear, operator-grade reading posture.",
          },
          {
            value: "decisive",
            label: "Decisive",
            hint: "Lean toward firmer calls and shorter interpretive flow.",
          },
        ],
      },
      {
        id: "execution-bias",
        title: "Execution bias",
        description: "Set the preferred tradeoff the application should carry when it chooses defaults.",
        value: defaults.executionBias,
        onChange: (value) =>
          setDefaults((current) => ({
            ...current,
            executionBias: value as ExecutionBias,
          })),
        options: [
          {
            value: "balanced",
            label: "Balanced",
            hint: "Keep throughput, quality, and interpretability in tension.",
          },
          {
            value: "quality",
            label: "Quality",
            hint: "Bias toward more bounded, auditable output.",
          },
          {
            value: "throughput",
            label: "Throughput",
            hint: "Bias toward faster flow and quicker default follow-through.",
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
      defaultModel: selectedGlobalModel || null,
      defaultProvider: selectedModel?.specialization || null,
      globalSystemPrompt,
      tokenCount,
      interfacesDefaults: defaults,
      workspaceDefaults: defaults,
      review_profile: savedPreferences?.review_profile || "bitcode-operator-workspace",
    });
  };

  return (
    <div data-testid="interfaces-pane-container">
      <div className="orbital-step-content interfaces-step">
        <OrbitalsInterfacesOrbitalHeader isOnboardingComplete={isOnboardingComplete} />

        <div className="space-y-5">
          <OrbitalsWorkspaceSection
            kicker="Interfaces posture"
            title="Shape the operator workspace before you reopen it"
            description="Interfaces is where you keep master-detail, conversation entry, proof reading, and the shared instruction baseline aligned to one predictable operator posture."
            explainer={orbitalsPaneExplainers.interfacesDefaults}
            tone="emerald"
          >
            <OrbitalsStatGrid
              items={[
                {
                  label: "Master detail",
                  value:
                    defaults.masterDetailDensity === "signal"
                      ? "Dense signal"
                      : defaults.masterDetailDensity === "full"
                        ? "Full read"
                        : "Balanced read",
                  detail: "How much structured detail opens first in the transactions workspace.",
                  tone: "emerald",
                },
                {
                  label: "Conversation entry",
                  value:
                    defaults.conversationLaunch === "overlay"
                      ? "Overlay launch"
                      : defaults.conversationLaunch === "focused"
                        ? "Focused launch"
                        : "Continuity launch",
                  detail: "How conversation work should re-enter the live application frame.",
                  tone: "sky",
                },
                {
                  label: "Proof posture",
                  value:
                    defaults.proofMode === "visual"
                      ? "Visual"
                      : defaults.proofMode === "raw"
                        ? "Raw"
                        : "Mixed",
                  detail: "The default evidence-reading posture for proof-bearing detail.",
                  tone: "violet",
                },
                {
                  label: "Global model",
                  value: selectedModel?.name || "Use provider default",
                  detail: "The baseline provider family currently anchored to this orbital.",
                  tone: "amber",
                },
              ]}
              columns={4}
            />
          </OrbitalsWorkspaceSection>

          <form onSubmit={handleSubmit} className="space-y-5">
            <OrbitalsWorkspaceSection
              kicker="Workspace defaults"
              title="Master-detail and conversation defaults"
              description="Set the opening behavior the operator should see when moving between transactions, proofs, and dedicated conversation work."
              explainer={orbitalsPaneExplainers.interfacesDefaults}
            >
              <OrbitalsPreferenceCards items={preferenceCards} />
            </OrbitalsWorkspaceSection>

            <OrbitalsWorkspaceSection
              kicker="Prompt baseline"
              title="Shared instruction baseline"
              description="Keep a reusable global instruction surface for how the application should reason, summarize, and explain."
              explainer={orbitalsPaneExplainers.interfacesPrompt}
              tone="sky"
            >
              <SystemPromptSection
                value={globalSystemPrompt}
                onChange={setGlobalSystemPrompt}
                tokenCount={tokenCount}
                updateTokenCounter={updateTokenCounter}
              />
            </OrbitalsWorkspaceSection>

            <OrbitalsWorkspaceSection
              kicker="Model posture"
              title="Pick the default model family for this workspace"
              description="Visible provider cost and limit posture belongs in Interfaces, not in a hidden utility drawer."
              explainer={orbitalsPaneExplainers.interfacesModels}
              tone="violet"
            >
              <GlobalModelSelection
                modelOptions={modelOptions}
                onApplyGlobalModel={setSelectedGlobalModel}
              />
            </OrbitalsWorkspaceSection>

            <div className="flex items-center justify-between gap-4 rounded-[22px] border border-white/10 bg-black/20 px-5 py-4">
              <p className="text-sm leading-7 text-white/68">
                Save the current interfaces posture so transactions, proofs, and conversations reopen with the same operator defaults.
              </p>
              <button type="submit" className="primary-button save-button" disabled={loading}>
                {isOnboardingComplete ? "Save Interfaces orbital" : "Continue"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
