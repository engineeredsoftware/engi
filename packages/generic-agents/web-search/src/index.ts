/**
 * Bitcode Need-Synthesis Web Search Agent - admitted support package.
 *
 * V26 semantics are bounded discovery-phase web search for Bitcode need synthesis:
 * collect source-attributed external evidence, score source quality, surface
 * volatility, and hand unresolved questions to downstream need/proof owners.
 * This package does not own canonical need interpretation, proof generation,
 * mutation, delivery, Exchange product behavior, or Terminal product behavior.
 */

import {
  AgentPrompt,
  AgentStepPrompt,
  factoryAgentWithPTRR,
  factoryAgentWithSingleStep
} from '@bitcode/agent-generics';
import type { PromptPart } from '@bitcode/prompts/parts/PromptPart';
import {
  getContents,
  multiProviderSearch,
  search,
  searchWithUrlIntelligence
} from '@bitcode/generic-tools-web-search';
import { z } from 'zod';

export const BitcodeNeedSynthesisWebSearchInputSchema = z.object({
  need: z.string().describe('Bitcode need or proof gap requiring external source context'),
  query: z.string().optional().describe('Search query when the caller has not separated need from query text'),
  sourceScope: z.enum(['primary-first', 'official-first', 'broad-context']).default('primary-first'),
  maxResults: z.number().min(1).max(50).default(10),
  dateFilter: z.enum(['any', 'day', 'week', 'month', 'year']).default('any'),
  domainFilter: z.string().optional().describe('Specific source domain to inspect when need synthesis is source-constrained'),
  language: z.string().default('en').describe('Preferred source language'),
  includeSnippets: z.boolean().default(true).describe('Include snippets as traceable source-attributed context'),
  evidenceDepth: z.enum(['surface', 'moderate', 'deep']).default('surface'),
  requirePrimarySources: z.boolean().default(true).describe('Prefer primary, official, standards, repository, or protocol-owner sources'),
  urlAttachments: z.array(z.string()).optional().describe('URLs used only to improve need-synthesis search targeting')
}).describe('BitcodeNeedSynthesisWebSearchInput');

export const BitcodeNeedSynthesisWebSearchToolRequestSchema = z.object({
  name: z.string(),
  input: z.any(),
  reason: z.string()
}).describe('BitcodeNeedSynthesisWebSearchToolRequest');

export const BitcodeNeedSynthesisWebSearchResultSchema = z.object({
  title: z.string(),
  url: z.string().url(),
  snippet: z.string(),
  domain: z.string(),
  publishDate: z.string().optional(),
  provider: z.string().optional(),
  sourceClass: z.enum(['primary', 'official', 'standard', 'repository', 'paper', 'vendor', 'commentary', 'unknown']),
  relevanceScore: z.number().min(0).max(1),
  sourceQualityScore: z.number().min(0).max(1),
  evidenceUse: z.string().describe('How this result may support Bitcode need synthesis without becoming proof by itself')
}).describe('BitcodeNeedSynthesisWebSearchResult');

export const BitcodeNeedSynthesisWebSearchPlanSchema = z.object({
  normalizedNeed: z.string(),
  plannedQueries: z.array(z.string()),
  preferredSourceClasses: z.array(z.string()),
  sourceSelectionRationale: z.array(z.string()),
  volatilityQuestions: z.array(z.string()),
  boundaryWarnings: z.array(z.string()),
  useTools: z.array(BitcodeNeedSynthesisWebSearchToolRequestSchema).optional(),
  confidence: z.number().min(0).max(1),
  searchComplexity: z.enum(['simple', 'moderate', 'complex'])
}).describe('BitcodeNeedSynthesisWebSearchPlan');

export const BitcodeNeedSynthesisWebSearchTrySchema = z.object({
  attemptedQueries: z.array(z.string()),
  enginesUsed: z.array(z.string()),
  totalResultsFound: z.number(),
  searchDuration: z.number(),
  searchResults: z.array(BitcodeNeedSynthesisWebSearchResultSchema),
  rejectedResults: z.array(z.object({
    url: z.string(),
    reason: z.string()
  })).default([]),
  useTools: z.array(BitcodeNeedSynthesisWebSearchToolRequestSchema).optional(),
  searchComplete: z.boolean(),
  errors: z.array(z.string()).optional()
}).describe('BitcodeNeedSynthesisWebSearchTry');

export const BitcodeNeedSynthesisWebSearchRefineSchema = z.object({
  refinedResults: z.array(BitcodeNeedSynthesisWebSearchResultSchema),
  quality: z.object({
    totalSources: z.number(),
    primarySourceCount: z.number(),
    averageSourceQuality: z.number(),
    coverageBreadth: z.number(),
    temporalRisk: z.enum(['low', 'medium', 'high', 'unknown'])
  }),
  synthesisSupport: z.object({
    needRelevance: z.array(z.string()),
    sourceBackedClaims: z.array(z.string()),
    contradictions: z.array(z.string()),
    unresolvedGaps: z.array(z.string())
  }),
  proofBoundaryWarnings: z.array(z.string()),
  useTools: z.array(BitcodeNeedSynthesisWebSearchToolRequestSchema).optional(),
  confidence: z.number().min(0).max(1)
}).describe('BitcodeNeedSynthesisWebSearchRefine');

export const BitcodeNeedSynthesisWebSearchRetrySchema = z.object({
  searchResults: z.object({
    topResults: z.array(BitcodeNeedSynthesisWebSearchResultSchema),
    totalResults: z.number(),
    searchSummary: z.string(),
    keyInsights: z.array(z.string())
  }),
  searchAnalysis: z.object({
    queryEffectiveness: z.number().min(0).max(1),
    resultsDiversity: z.number().min(0).max(1),
    sourceCoverage: z.number().min(0).max(1),
    sourceCredibility: z.number().min(0).max(1)
  }),
  searchMetadata: z.object({
    searchDuration: z.number(),
    enginesUsed: z.array(z.string()),
    totalQueries: z.number(),
    finalResultCount: z.number(),
    confidenceScore: z.number().min(0).max(1)
  }),
  downstreamNeedSynthesisActions: z.array(z.string()),
  proofBoundaryWarnings: z.array(z.string()),
  useTools: z.array(BitcodeNeedSynthesisWebSearchToolRequestSchema).optional(),
  success: z.boolean(),
  completionMessage: z.string()
}).describe('BitcodeNeedSynthesisWebSearchRetry');

export const WebSearchInputSchema = BitcodeNeedSynthesisWebSearchInputSchema;
export const WebSearchPlanSchema = BitcodeNeedSynthesisWebSearchPlanSchema;
export const WebSearchTrySchema = BitcodeNeedSynthesisWebSearchTrySchema;
export const WebSearchRefineSchema = BitcodeNeedSynthesisWebSearchRefineSchema;
export const WebSearchRetrySchema = BitcodeNeedSynthesisWebSearchRetrySchema;

export const bitcodeNeedSynthesisWebSearchPrompt = new AgentPrompt({
  name: 'bitcode-need-synthesis-web-search' as PromptPart,
  identity: 'Bitcode discovery-phase web search support for need synthesis' as PromptPart
});

export const bitcodeNeedSynthesisWebSearchStepPrompts = {
  plan: new AgentStepPrompt({ purpose: 'Plan source-bounded web search for Bitcode need synthesis' as PromptPart }),
  try: new AgentStepPrompt({ purpose: 'Collect source-attributed external evidence without claiming proof closure' as PromptPart }),
  refine: new AgentStepPrompt({ purpose: 'Refine search results into source quality, volatility, and need-relevance context' as PromptPart }),
  retry: new AgentStepPrompt({ purpose: 'Finalize web-search evidence support and expose unresolved downstream questions' as PromptPart })
};

export const webSearchPrompt = bitcodeNeedSynthesisWebSearchPrompt;
export const webSearchStepPrompts = bitcodeNeedSynthesisWebSearchStepPrompts;

const bitcodeNeedSynthesisWebSearchAgent = factoryAgentWithPTRR<
  z.infer<typeof BitcodeNeedSynthesisWebSearchInputSchema>,
  z.infer<typeof BitcodeNeedSynthesisWebSearchRetrySchema>
>({
  name: 'bitcode-need-synthesis-web-search',
  description: 'Discovery-phase web search for source-attributed Bitcode need-synthesis evidence',
  prompt: bitcodeNeedSynthesisWebSearchPrompt,
  stepPrompts: {
    plan: () => bitcodeNeedSynthesisWebSearchStepPrompts.plan,
    try: () => bitcodeNeedSynthesisWebSearchStepPrompts.try,
    refine: () => bitcodeNeedSynthesisWebSearchStepPrompts.refine,
    retry: () => bitcodeNeedSynthesisWebSearchStepPrompts.retry
  },
  tools: [
    search,
    searchWithUrlIntelligence,
    multiProviderSearch,
    getContents
  ],
  outputSchema: BitcodeNeedSynthesisWebSearchRetrySchema,
  plan: {
    chunkThreshold: 500
  },
  try: {
    chunkThreshold: 20000,
    enableParallelChunks: true
  },
  refine: {
    maxAttempts: 2
  },
  retry: {
    maxAttempts: 3,
    backoff: 1000
  }
});

const quickBitcodeNeedSynthesisWebSearchAgent = factoryAgentWithSingleStep<
  z.infer<typeof BitcodeNeedSynthesisWebSearchInputSchema>,
  z.infer<typeof BitcodeNeedSynthesisWebSearchRetrySchema>
>({
  name: 'quick-bitcode-need-synthesis-web-search',
  description: 'Fast stable web-search evidence support for Bitcode need synthesis',
  execute: async (input, execution) => {
    execution.store('variation', 'mode', 'quick-bitcode-need-synthesis-web-search');

    return {
      searchResults: {
        topResults: [],
        totalResults: 0,
        searchSummary: `Quick Bitcode need-synthesis web search queued for: ${input.need || input.query || 'unspecified need'}`,
        keyInsights: ['Quick mode records the search need; use PTRR mode for source-attributed evidence.']
      },
      searchAnalysis: {
        queryEffectiveness: 0.5,
        resultsDiversity: 0,
        sourceCoverage: 0,
        sourceCredibility: 0
      },
      searchMetadata: {
        searchDuration: 0,
        enginesUsed: ['quick-support-placeholder'],
        totalQueries: input.query ? 1 : 0,
        finalResultCount: 0,
        confidenceScore: 0.5
      },
      downstreamNeedSynthesisActions: ['Run full Bitcode need-synthesis web search before relying on external evidence.'],
      proofBoundaryWarnings: ['Quick web-search output is not source-attributed proof evidence.'],
      success: true,
      completionMessage: 'Quick Bitcode need-synthesis web search support output completed'
    };
  }
});

export const bitcodeNeedSynthesisWebSearch = bitcodeNeedSynthesisWebSearchAgent;
export const quickBitcodeNeedSynthesisWebSearch = quickBitcodeNeedSynthesisWebSearchAgent;
export const webSearch = bitcodeNeedSynthesisWebSearchAgent;
export const quickWebSearch = quickBitcodeNeedSynthesisWebSearchAgent;

export type BitcodeNeedSynthesisWebSearchInput = z.infer<typeof BitcodeNeedSynthesisWebSearchInputSchema>;
export type BitcodeNeedSynthesisWebSearchPlanOutput = z.infer<typeof BitcodeNeedSynthesisWebSearchPlanSchema>;
export type BitcodeNeedSynthesisWebSearchTryOutput = z.infer<typeof BitcodeNeedSynthesisWebSearchTrySchema>;
export type BitcodeNeedSynthesisWebSearchRefineOutput = z.infer<typeof BitcodeNeedSynthesisWebSearchRefineSchema>;
export type BitcodeNeedSynthesisWebSearchRetryOutput = z.infer<typeof BitcodeNeedSynthesisWebSearchRetrySchema>;

export type WebSearchInput = BitcodeNeedSynthesisWebSearchInput;
export type WebSearchPlanOutput = BitcodeNeedSynthesisWebSearchPlanOutput;
export type WebSearchTryOutput = BitcodeNeedSynthesisWebSearchTryOutput;
export type WebSearchRefineOutput = BitcodeNeedSynthesisWebSearchRefineOutput;
export type WebSearchRetryOutput = BitcodeNeedSynthesisWebSearchRetryOutput;
