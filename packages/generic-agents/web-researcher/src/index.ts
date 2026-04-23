/**
 * Bitcode External Evidence Research Agent - Declarative PTRR compatibility pattern.
 *
 * The retained web-researcher package name remains a compatibility path. V26
 * semantics are external-evidence collection for need measurement,
 * third-party interface context, proof-gap investigation, and AssetPack
 * planning. External web findings are auxiliary evidence, not canonical proof.
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

export const bitcodeExternalEvidenceResearcherPrompt = new AgentPrompt({
  name: 'bitcode-external-evidence-researcher' as PromptPart,
  identity: 'Bitcode external-evidence research agent for auxiliary source context' as PromptPart
});

export const bitcodeExternalEvidenceResearcherStepPrompts = {
  plan: new AgentStepPrompt({ purpose: 'Plan bounded external-evidence collection for a Bitcode need' as PromptPart }),
  try: new AgentStepPrompt({ purpose: 'Collect traceable external evidence without scraping-product ownership' as PromptPart }),
  refine: new AgentStepPrompt({ purpose: 'Refine external findings into source-quality and volatility context' as PromptPart }),
  retry: new AgentStepPrompt({ purpose: 'Finalize external evidence and expose unresolved gaps without claiming proof closure' as PromptPart })
};

export const webResearcherPrompt = bitcodeExternalEvidenceResearcherPrompt;
export const webResearcherStepPrompts = bitcodeExternalEvidenceResearcherStepPrompts;

export const bitcodeExternalEvidenceResearcher = factoryAgentWithPTRR<
  BitcodeExternalEvidenceResearchInputType,
  BitcodeExternalEvidenceResearchResultType
>({
  name: 'bitcode-external-evidence-research',
  description: 'External evidence research for Bitcode need measurement, third-party context, proof-gap investigation, and AssetPack planning',
  prompt: bitcodeExternalEvidenceResearcherPrompt,
  stepPrompts: {
    plan: () => bitcodeExternalEvidenceResearcherStepPrompts.plan,
    try: () => bitcodeExternalEvidenceResearcherStepPrompts.try,
    refine: () => bitcodeExternalEvidenceResearcherStepPrompts.refine,
    retry: () => bitcodeExternalEvidenceResearcherStepPrompts.retry
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

export const webResearcherAgent = bitcodeExternalEvidenceResearcher;
export const WEB_RESEARCH_AGENT = {
  researchWeb: bitcodeExternalEvidenceResearcher
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
