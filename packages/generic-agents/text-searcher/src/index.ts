/**
 * Text Searcher Agent - Declarative Pattern
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
// Tools this agent can use for text searching
import { grepTool } from '@engi/generic-tools/grep';
import { globTool } from '@engi/generic-tools/glob';
import { fileSystemTool } from '@engi/generic-tools/file-system';

// ==================== INPUT SCHEMA ====================
const TextSearcherInputSchema = z.object({
  query: z.string().describe('Search query or keywords'),
  searchPath: z.string().optional().describe('Directory path to search'),
  fileTypes: z.array(z.string()).optional().describe('File extensions to include'),
  excludePatterns: z.array(z.string()).optional().describe('Patterns to exclude'),
  caseSensitive: z.boolean().default(false).describe('Case sensitive search'),
  maxResults: z.number().default(100).describe('Maximum results to return'),
  includeContext: z.boolean().default(true).describe('Include surrounding context lines'),
  searchDepth: z.enum(['shallow', 'deep']).default('deep'),
  regexMode: z.boolean().default(false).describe('Use regex patterns')
});

// ==================== PLAN STEP SCHEMA ====================
const TextSearcherPlanSchema = z.object({
  // Search strategy
  searchStrategy: z.string().describe('How to execute the search'),
  keywordAnalysis: z.object({
    primaryTerms: z.array(z.string()),
    secondaryTerms: z.array(z.string()),
    searchPatterns: z.array(z.string())
  }),
  
  // File targeting
  targetPaths: z.array(z.string()).describe('Paths to search'),
  fileFilters: z.object({
    includeTypes: z.array(z.string()),
    excludePatterns: z.array(z.string()),
    sizeLimit: z.number().optional()
  }),
  
  // Expected results
  estimatedMatches: z.number(),
  relevanceCriteria: z.array(z.string()),
  
  // Tool planning
  useTools: z.array(z.object({
    name: z.string(),
    input: z.any(),
    reason: z.string()
  })).optional().describe('Tools to use in plan phase'),
  
  // Success tracking
  confidence: z.number().min(0).max(1),
  complexity: z.enum(['simple', 'moderate', 'complex'])
});

// ==================== TRY STEP SCHEMA ====================
const TextSearcherTrySchema = z.object({
  // Core search execution
  searchExecution: z.object({
    toolsUsed: z.array(z.string()),
    searchCommands: z.array(z.string()),
    executionTime: z.number(),
    filesScanned: z.number()
  }),
  
  // Raw results
  rawMatches: z.array(z.object({
    file: z.string(),
    line: z.number(),
    column: z.number().optional(),
    content: z.string(),
    matchType: z.enum(['exact', 'partial', 'regex']),
    confidence: z.number()
  })),
  
  // Initial processing
  initialAnalysis: z.object({
    totalMatches: z.number(),
    uniqueFiles: z.number(),
    fileTypeDistribution: z.record(z.number()),
    searchCoverage: z.number()
  }),
  
  // Tool usage for searching
  useTools: z.array(z.object({
    name: z.string(),
    input: z.any(),
    reason: z.string()
  })).optional().describe('Tools to use for text searching'),
  
  // Status
  searchComplete: z.boolean(),
  errors: z.array(z.string()).optional()
});

// ==================== REFINE STEP SCHEMA ====================
const TextSearcherRefineSchema = z.object({
  // Enhanced results
  refinedMatches: z.array(z.object({
    file: z.string(),
    line: z.number(),
    content: z.string(),
    context: z.object({
      before: z.array(z.string()),
      after: z.array(z.string())
    }).optional(),
    relevanceScore: z.number().min(0).max(1),
    matchQuality: z.enum(['high', 'medium', 'low']),
    tags: z.array(z.string()).optional()
  })),
  
  // Quality improvements
  qualityMetrics: z.object({
    averageRelevance: z.number(),
    duplicatesRemoved: z.number(),
    contextEnriched: z.number(),
    falsePositivesFiltered: z.number()
  }),
  
  // Pattern analysis
  patterns: z.object({
    commonTerms: z.array(z.string()),
    filePatterns: z.array(z.string()),
    codePatterns: z.array(z.string()).optional(),
    recommendations: z.array(z.string())
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
const TextSearcherRetrySchema = z.object({
  // Final comprehensive results
  searchResults: z.object({
    matches: z.array(z.object({
      file: z.string(),
      line: z.number(),
      content: z.string(),
      context: z.object({
        before: z.array(z.string()),
        after: z.array(z.string())
      }).optional(),
      relevanceScore: z.number()
    })),
    summary: z.object({
      totalMatches: z.number(),
      filesSearched: z.number(),
      filesWithMatches: z.number(),
      topFileTypes: z.array(z.string()),
      keywordsFound: z.array(z.string())
    }),
    analysis: z.object({
      patterns: z.array(z.string()),
      distribution: z.record(z.number()),
      recommendations: z.array(z.string())
    }),
    processingTime: z.number()
  }),
  
  // Query analysis
  queryInsights: z.object({
    queryComplexity: z.string(),
    searchEffectiveness: z.number(),
    suggestedRefinements: z.array(z.string()),
    alternativeQueries: z.array(z.string()).optional()
  }),
  
  // Performance metrics
  performance: z.object({
    searchSpeed: z.number(),
    accuracyScore: z.number(),
    completionRate: z.number()
  }),
  
  // Final recommendations
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

export const textSearcherPrompt = new AgentPrompt({
  name: 'text-searcher' as PromptPart,
  identity: 'Text search specialist' as PromptPart
});

export const textSearcherStepPrompts = {
  plan: new AgentStepPrompt({ purpose: 'Plan search' as PromptPart }),
  try: new AgentStepPrompt({ purpose: 'Execute search' as PromptPart }),
  refine: new AgentStepPrompt({ purpose: 'Enhance results' as PromptPart }),
  retry: new AgentStepPrompt({ purpose: 'Finalize search' as PromptPart })
};

// ==================== AGENT CONFIGURATION ====================

/**
 * Comprehensive text search variation
 * Uses full PTRR cycle for thorough search and analysis
 */
const comprehensiveSearchVariation = factoryAgentWithPTRR<
  z.infer<typeof TextSearcherInputSchema>,
  z.infer<typeof TextSearcherRetrySchema>
>({
  name: 'comprehensive-search',
  description: 'Full text search with deep analysis and result refinement',
  prompt: textSearcherPrompt,
  stepPrompts: {
    plan: () => textSearcherStepPrompts.plan,
    try: () => textSearcherStepPrompts.try,
    refine: () => textSearcherStepPrompts.refine,
    retry: () => textSearcherStepPrompts.retry
  },
  
  // The factories use these schemas to:
  // 1. Create typed executors for each step
  // 2. Run the 7-substep sequence automatically
  // 3. Store all results to execution state
  // 4. Handle tool execution when useTools is present
  outputSchema: TextSearcherRetrySchema,
  
  // Optional configurations per step
  plan: {
    chunkThreshold: 1000  // Search plans are typically small
  },
  try: {
    chunkThreshold: 50000,  // Search results can be large
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
 * Quick search variation
 * Single-step execution for simple search tasks
 */
const quickSearchVariation = factoryAgentWithSingleStep<
  z.infer<typeof TextSearcherInputSchema>,
  z.infer<typeof TextSearcherRetrySchema>
>({
  name: 'quick-search',
  description: 'Fast text search for simple queries',
  
  // Single executor - still runs through execution system
  execute: async (input, execution) => {
    // This executor is wrapped and tracked automatically
    execution.store('variation', 'mode', 'quick');
    
    // Even simple variations can use the execution's registries
    const llm = execution.llms.getDefaultLLM();
    const grepTool = execution.tools.getTool('grep');
    
    // Quick search logic here
    // Return matches the Retry schema for consistency
    return {
      searchResults: {
        matches: [],
        summary: {
          totalMatches: 0,
          filesSearched: 0,
          filesWithMatches: 0,
          topFileTypes: [],
          keywordsFound: input.query.split(' ').slice(0, 5)
        },
        analysis: {
          patterns: [],
          distribution: {},
          recommendations: ['Use comprehensive search for detailed analysis']
        },
        processingTime: 0
      },
      queryInsights: {
        queryComplexity: 'simple',
        searchEffectiveness: 0.5,
        suggestedRefinements: []
      },
      performance: {
        searchSpeed: 1.0,
        accuracyScore: 0.7,
        completionRate: 1.0
      },
      recommendations: ['Quick search completed - use comprehensive search for better results'],
      success: true,
      completionMessage: 'Quick text search completed'
    };
  }
});

// ==================== AGENT DEFINITION ====================

/**
 * Text Searcher Agent
 * 
 * This agent demonstrates the CORRECT declarative pattern:
 * - Schemas define WHAT each step produces
 * - Factories create HOW it's executed (7-substep sequence)
 * - Execution handles WHERE it's stored (automatic state management)
 * - Prompts guide WHEN tools are used (through useTools in schemas)
 */
export const textSearcher = comprehensiveSearchVariation;
export const quickTextSearcher = quickSearchVariation;

// ==================== TYPE EXPORTS ====================
export type TextSearcherInput = z.infer<typeof TextSearcherInputSchema>;
export type TextSearcherPlanOutput = z.infer<typeof TextSearcherPlanSchema>;
export type TextSearcherTryOutput = z.infer<typeof TextSearcherTrySchema>;
export type TextSearcherRefineOutput = z.infer<typeof TextSearcherRefineSchema>;
export type TextSearcherRetryOutput = z.infer<typeof TextSearcherRetrySchema>;

/**
 * THE MAGIC EXPLAINED:
 * 
 * When textSearcherAgent is called:
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
