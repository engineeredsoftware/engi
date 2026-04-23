/**
 * Bitcode Need-Synthesis Web Research Agent - Declarative PTRR compatibility pattern.
 *
 * The retained web-researcher package name remains a compatibility path. V26
 * semantics are discovery-phase web research for need synthesis. The agent
 * returns source-attributed external evidence for need measurement, third-party
 * interface constraints, proof-gap question formation, and AssetPack planning.
 * External web findings are auxiliary evidence, not canonical proof.
 */

import {
  AgentPrompt,
  AgentStepPrompt,
  factoryAgentWithPTRR
} from '@bitcode/agent-generics';
import type { PromptPart } from '@bitcode/prompts/parts/PromptPart';
import {
  getContents,
  multiProviderSearch,
  search,
  searchWithUrlIntelligence
} from '@bitcode/generic-tools-web-search';
import {
  BitcodeExternalEvidenceResearchInputSchema,
  BitcodeExternalEvidenceResearchResultSchema
} from './schemas';
import type {
  BitcodeExternalEvidenceResearchInput as BitcodeExternalEvidenceResearchInputType,
  BitcodeExternalEvidenceResearchResult as BitcodeExternalEvidenceResearchResultType
} from './schemas';

export const bitcodeNeedSynthesisWebResearcherPrompt = new AgentPrompt({
  name: 'bitcode-need-synthesis-web-researcher' as PromptPart,
  identity: 'Bitcode discovery-phase web research agent for need synthesis' as PromptPart
});

export const bitcodeNeedSynthesisWebResearcherStepPrompts = {
  plan: new AgentStepPrompt({ purpose: 'Plan bounded discovery-phase web research for Bitcode need synthesis' as PromptPart }),
  try: new AgentStepPrompt({ purpose: 'Collect traceable external evidence for need synthesis without scraping-product ownership' as PromptPart }),
  refine: new AgentStepPrompt({ purpose: 'Refine need-synthesis findings into source-quality and volatility context' as PromptPart }),
  retry: new AgentStepPrompt({ purpose: 'Finalize discovery-phase web research and expose unresolved need gaps without claiming proof closure' as PromptPart })
};

export const bitcodeExternalEvidenceResearcherPrompt = bitcodeNeedSynthesisWebResearcherPrompt;
export const bitcodeExternalEvidenceResearcherStepPrompts = bitcodeNeedSynthesisWebResearcherStepPrompts;
export const webResearcherPrompt = bitcodeNeedSynthesisWebResearcherPrompt;
export const webResearcherStepPrompts = bitcodeNeedSynthesisWebResearcherStepPrompts;

export const bitcodeNeedSynthesisWebResearcher = factoryAgentWithPTRR<
  BitcodeExternalEvidenceResearchInputType,
  BitcodeExternalEvidenceResearchResultType
>({
  name: 'bitcode-need-synthesis-web-research',
  description: 'Discovery-phase web research for Bitcode need synthesis, third-party context, proof-gap question formation, and AssetPack planning',
  prompt: bitcodeNeedSynthesisWebResearcherPrompt,
  stepPrompts: {
    plan: () => bitcodeNeedSynthesisWebResearcherStepPrompts.plan,
    try: () => bitcodeNeedSynthesisWebResearcherStepPrompts.try,
    refine: () => bitcodeNeedSynthesisWebResearcherStepPrompts.refine,
    retry: () => bitcodeNeedSynthesisWebResearcherStepPrompts.retry
  },
  tools: [
    search,
    searchWithUrlIntelligence,
    multiProviderSearch,
    getContents
  ],
  outputSchema: BitcodeExternalEvidenceResearchResultSchema,
  plan: {
    chunkThreshold: 1000
  },
  try: {
    chunkThreshold: 5000,
    enableParallelChunks: true
  },
  refine: {
    maxAttempts: 2
  },
  retry: {
    maxAttempts: 1,
    backoff: 1000
  }
});

export const bitcodeExternalEvidenceResearcher = bitcodeNeedSynthesisWebResearcher;
export const webResearcherAgent = bitcodeNeedSynthesisWebResearcher;
export const WEB_RESEARCH_AGENT = {
  researchWeb: bitcodeNeedSynthesisWebResearcher
};

export {
  BitcodeExternalEvidenceDepthSchema,
  BitcodeExternalEvidenceFindingSchema,
  BitcodeExternalEvidenceQualitySchema,
  BitcodeExternalEvidenceResearchInputSchema,
  BitcodeExternalEvidenceResearchPlanSchema,
  BitcodeExternalEvidenceResearchRefineSchema,
  BitcodeExternalEvidenceResearchResultSchema,
  BitcodeExternalEvidenceResearchTrySchema,
  BitcodeExternalEvidenceSourceClassSchema,
  BitcodeExternalEvidenceSynthesisSchema,
  BitcodeExternalEvidenceTemporalRiskSchema,
  BitcodeExternalEvidenceToolRequestSchema,
  ResearchInputSchema,
  ResearchResultSchema,
  WebResearcherAgentRetryStepOutput
} from './schemas';

export type {
  BitcodeExternalEvidenceDepth,
  BitcodeExternalEvidenceFinding,
  BitcodeExternalEvidenceQuality,
  BitcodeExternalEvidenceResearchInput,
  BitcodeExternalEvidenceResearchPlan,
  BitcodeExternalEvidenceResearchRefine,
  BitcodeExternalEvidenceResearchResult,
  BitcodeExternalEvidenceResearchTry,
  BitcodeExternalEvidenceSourceClass,
  BitcodeExternalEvidenceSynthesis,
  BitcodeExternalEvidenceTemporalRisk,
  BitcodeExternalEvidenceToolRequest,
  ResearchInput,
  ResearchResult
} from './schemas';
