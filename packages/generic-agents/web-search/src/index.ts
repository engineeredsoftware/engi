/**
 * Web Search Agent - Declarative Pattern
 * 
 * This agent uses the CORRECT declarative pattern:
 * - Define schemas for each PTRR step
 * - Define prompts for agent and each step
 * - Let factories handle ALL execution
 * - No manual step implementations needed!
 */

import { 
   
  factoryAgentWithPTRR,
  factoryAgentWithSingleStep
} from '@engi/agent-generics';
import { AgentPrompt, AgentStepPrompt } from '@engi/agent-generics';
import type { PromptPart } from '@engi/prompts';
import { z } from 'zod';

// ==================== TOOLS ====================
// Tools this agent can use for web searching
import { webSearchTool } from '@engi/generic-tools-web-search';
import { webScrapingTool } from '@engi/generic-tools/web-scraping';
import { urlValidationTool } from '@engi/generic-tools/url-validation';

// ==================== INPUT SCHEMA ====================
const WebSearchInputSchema = z.object({
  query: z.string().describe('Search query to execute'),
  searchType: z.enum(['general', 'academic', 'news', 'images', 'videos']).default('general'),
  maxResults: z.number().min(1).max(50).default(10),
  dateFilter: z.enum(['any', 'day', 'week', 'month', 'year']).default('any'),
  domainFilter: z.string().optional().describe('Specific domain to search within'),
  language: z.string().default('en').describe('Search language preference'),
  safeSearch: z.boolean().default(true).describe('Enable safe search filtering'),
  includeSnippets: z.boolean().default(true).describe('Include result snippets'),
  searchDepth: z.enum(['surface', 'deep']).default('surface')
});

// ==================== PLAN STEP SCHEMA ====================
const WebSearchPlanSchema = z.object({
  // Search strategy
  searchStrategy: z.object({
    approach: z.string().describe('How to execute the search'),
    searchType: z.enum(['general', 'academic', 'news', 'images', 'videos']),
    queryAnalysis: z.object({
      primaryKeywords: z.array(z.string()),
      secondaryKeywords: z.array(z.string()),
      searchIntent: z.enum(['informational', 'navigational', 'transactional', 'commercial'])
    })
  }),
  
  // Search configuration
  searchConfiguration: z.object({
    engines: z.array(z.string()).describe('Search engines to use'),
    filters: z.object({
      dateRange: z.string().optional(),
      domain: z.string().optional(),
      language: z.string(),
      safeSearch: z.boolean()
    }),
    resultLimits: z.object({
      maxResults: z.number(),
      qualityThreshold: z.number()
    })
  }),
  
  // Expected results
  expectedOutcome: z.object({
    relevanceTargets: z.array(z.string()),
    contentTypes: z.array(z.string()),
    estimatedResults: z.number()
  }),
  
  // Tool planning
  useTools: z.array(z.object({
    name: z.string(),
    input: z.any(),
    reason: z.string()
  })).optional().describe('Tools to use in plan phase'),
  
  // Success tracking
  confidence: z.number().min(0).max(1),
  searchComplexity: z.enum(['simple', 'moderate', 'complex'])
});

// ==================== TRY STEP SCHEMA ====================
const WebSearchTrySchema = z.object({
  // Core search execution
  searchExecution: z.object({
    queriesExecuted: z.array(z.string()),
    enginesUsed: z.array(z.string()),
    totalResultsFound: z.number(),
    searchDuration: z.number()
  }),
  
  // Raw search results
  searchResults: z.array(z.object({
    title: z.string(),
    url: z.string().url(),
    snippet: z.string(),
    domain: z.string(),
    publishDate: z.string().optional(),
    source: z.string().describe('Search engine source'),
    rawRelevanceScore: z.number().min(0).max(1)
  })),
  
  // Initial processing
  initialAnalysis: z.object({
    domainDistribution: z.record(z.number()),
    contentTypes: z.array(z.string()),
    averageRelevance: z.number(),
    duplicatesFound: z.number()
  }),
  
  // Tool usage for searching
  useTools: z.array(z.object({
    name: z.string(),
    input: z.any(),
    reason: z.string()
  })).optional().describe('Tools to use for web searching'),
  
  // Status
  searchComplete: z.boolean(),
  errors: z.array(z.string()).optional()
});

// ==================== REFINE STEP SCHEMA ====================
const WebSearchRefineSchema = z.object({
  // Enhanced results
  refinedResults: z.array(z.object({
    title: z.string(),
    url: z.string().url(),
    snippet: z.string(),
    enhancedSnippet: z.string().optional(),
    domain: z.string(),
    relevanceScore: z.number().min(0).max(1),
    qualityScore: z.number().min(0).max(1),
    credibilityScore: z.number().min(0).max(1),
    freshness: z.enum(['very_fresh', 'fresh', 'recent', 'old', 'very_old']),
    contentCategory: z.string()
  })),
  
  // Quality improvements
  qualityEnhancements: z.object({
    duplicatesRemoved: z.number(),
    lowQualityFiltered: z.number(),
    snippetsEnhanced: z.number(),
    relevanceImproved: z.number()
  }),
  
  // Content analysis
  contentAnalysis: z.object({
    topDomains: z.array(z.string()),
    contentThemes: z.array(z.string()),
    informationGaps: z.array(z.string()),
    qualityAssessment: z.string()
  }),
  
  // Refinement tools
  useTools: z.array(z.object({
    name: z.string(),
    input: z.any(),
    reason: z.string()
  })).optional().describe('Tools for refinement'),
  
  // Improvements made
  refinements: z.array(z.string()),
  confidence: z.number()
});

// ==================== RETRY STEP SCHEMA ====================
const WebSearchRetrySchema = z.object({
  // Final comprehensive results
  searchResults: z.object({
    topResults: z.array(z.object({
      title: z.string(),
      url: z.string().url(),
      snippet: z.string(),
      domain: z.string(),
      relevanceScore: z.number().min(0).max(1),
      qualityScore: z.number().min(0).max(1),
      publishDate: z.string().optional()
    })),
    totalResults: z.number(),
    searchSummary: z.string(),
    keyInsights: z.array(z.string())
  }),
  
  // Search analysis
  searchAnalysis: z.object({
    queryEffectiveness: z.number().min(0).max(1),
    resultsDiversity: z.number().min(0).max(1),
    informationCompleteness: z.number().min(0).max(1),
    sourceCredibility: z.number().min(0).max(1)
  }),
  
  // Metadata and performance
  searchMetadata: z.object({
    searchDuration: z.number(),
    enginesUsed: z.array(z.string()),
    totalQueries: z.number(),
    finalResultCount: z.number(),
    confidenceScore: z.number().min(0).max(1)
  }),
  
  // Recommendations
  recommendations: z.array(z.string()),
  nextSteps: z.array(z.string()).optional(),
  
  // Recovery tools if needed
  useTools: z.array(z.object({
    name: z.string(),
    input: z.any(),
    reason: z.string()
  })).optional().describe('Recovery tools if retry needed'),
  
  // Overall success
  success: z.boolean(),
  completionMessage: z.string()
});

// ==================== PROMPTS ====================

export const webSearchPrompt = new AgentPrompt({
  name: 'web-search' as PromptPart,
  identity: 'Web search specialist' as PromptPart
});

export const webSearchStepPrompts = {
  plan: new AgentStepPrompt({ purpose: 'Analyze search strategy' as PromptPart }),
  try: new AgentStepPrompt({ purpose: 'Execute web search' as PromptPart }),
  refine: new AgentStepPrompt({ purpose: 'Enhance search results' as PromptPart }),
  retry: new AgentStepPrompt({ purpose: 'Finalize search output' as PromptPart })
};

// ==================== AGENT CONFIGURATION ====================

/**
 * Comprehensive web search agent
 * Uses full PTRR cycle for thorough search and analysis
 */
const comprehensiveSearch = factoryAgentWithPTRR<
  z.infer<typeof WebSearchInputSchema>,
  z.infer<typeof WebSearchRetrySchema>
>({
  name: 'comprehensive-search',
  description: 'Full web search with deep analysis and result refinement',
  prompt: webSearchPrompt,
  stepPrompts: {
    plan: () => webSearchStepPrompts.plan,
    try: () => webSearchStepPrompts.try,
    refine: () => webSearchStepPrompts.refine,
    retry: () => webSearchStepPrompts.retry
  },
  
  // The factories use these schemas to:
  // 1. Create typed executors for each step
  // 2. Run the 7-substep sequence automatically
  // 3. Store all results to execution state
  // 4. Handle tool execution when useTools is present
  outputSchema: WebSearchRetrySchema,
  
  // Optional configurations per step
  plan: {
    chunkThreshold: 500  // Search plans are typically small
  },
  try: {
    chunkThreshold: 20000,  // Search results can be large
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

/**
 * Quick search agent
 * Single-step execution for simple search tasks
 */
const quickSearch = factoryAgentWithSingleStep<
  z.infer<typeof WebSearchInputSchema>,
  z.infer<typeof WebSearchRetrySchema>
>({
  name: 'quick-search',
  description: 'Fast web search for immediate results',
  
  // Single executor - still runs through execution system
  execute: async (input, execution) => {
    // This executor is wrapped and tracked automatically
    execution.store('variation', 'mode', 'quick');
    
    // Even simple variations can use the execution's registries
    const llm = execution.llms.getDefaultLLM();
    const searchTool = execution.tools.getTool('web-search');
    
    // Quick search logic here
    // Return matches the Retry schema for consistency
    return {
      searchResults: {
        topResults: [],
        totalResults: 0,
        searchSummary: `Quick search for: ${input.query}`,
        keyInsights: ['Quick search completed - use comprehensive search for detailed results']
      },
      searchAnalysis: {
        queryEffectiveness: 0.7,
        resultsDiversity: 0.5,
        informationCompleteness: 0.6,
        sourceCredibility: 0.7
      },
      searchMetadata: {
        searchDuration: 500,
        enginesUsed: ['quick-search'],
        totalQueries: 1,
        finalResultCount: 0,
        confidenceScore: 0.7
      },
      recommendations: ['Use comprehensive search for better results'],
      success: true,
      completionMessage: 'Quick web search completed'
    };
  }
});

// ==================== AGENT DEFINITION ====================

/**
 * Web Search Agent - Default PTRR implementation
 * Main agent using comprehensive web search
 * This uses the factoryAgentWithPTRR pattern for full web search capabilities.
 */
export const webSearch = comprehensiveSearch;

/**
 * Quick Web Search Agent - Simple version prefixed with "quick"
 * Fast web search for immediate results
 */
export const quickWebSearch = quickSearch;

// ==================== TYPE EXPORTS ====================
export type WebSearchInput = z.infer<typeof WebSearchInputSchema>;
export type WebSearchPlanOutput = z.infer<typeof WebSearchPlanSchema>;
export type WebSearchTryOutput = z.infer<typeof WebSearchTrySchema>;
export type WebSearchRefineOutput = z.infer<typeof WebSearchRefineSchema>;
export type WebSearchRetryOutput = z.infer<typeof WebSearchRetrySchema>;

/**
 * THE MAGIC EXPLAINED:
 * 
 * When webSearchAgent is called:
 * 1. selectVariation picks comprehensive or quick
 * 2. If comprehensive:
 *    - factoryPlanGeneration(schema) creates Plan generation (failsafed thricified)
 *    - factoryTryGeneration(schema) creates Try generation (failsafed thricified)
 *    - factoryRefineGeneration(schema) creates Refine generation (failsafed thricified)
 *    - factoryRetryGeneration(schema) creates Retry generation (failsafed thricified)
 * 3. Each executor automatically:
 *    - Runs PrepareConciseContext→ChunkThenSum→StitchUntilComplete
 *    - Each parent runs Reason→Judge→StructuredOutput
 *    - Stores everything to execution.store()
 *    - Executes tools if useTools is in output
 * 4. The execution tree accumulates:
 *    - Every LLM call result
 *    - Every tool execution
 *    - Every substep output
 *    - All in namespaced stores!
 * 
 * We just defined schemas - the framework does EVERYTHING else!
 */
