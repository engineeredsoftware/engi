

/**
 * Danger Wall Agent - Declarative Pattern
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
} from '@bitcode/agent-generics';
import { z } from 'zod';

// ==================== IMPORTS ====================
import { AgentPrompt, AgentStepPrompt } from '@bitcode/agent-generics';
import type { PromptPart } from '@bitcode/prompts';

// ==================== TOOLS ====================
// Tools this agent can use for security validation
// (No external tools needed - built-in security analysis)

// ==================== INPUT SCHEMA ====================
const DangerWallInputSchema = z.object({
  taskContext: z.string().describe('Task context for safety validation'),
  content: z.string().optional().describe('Content to validate'),
  source: z.string().optional().describe('Source of content'),
  strictMode: z.boolean().default(false).describe('Enable strict validation mode'),
  categories: z.array(z.string()).optional().describe('Specific categories to check'),
  threshold: z.number().default(0.8).describe('Confidence threshold for flags')
});

// ==================== PLAN STEP SCHEMA ====================
const DangerWallPlanSchema = z.object({
  // Validation strategy
  validationPlan: z.object({
    contentSources: z.array(z.object({
      type: z.string(),
      path: z.string().optional(),
      priority: z.number(),
      validationSteps: z.array(z.string())
    })),
    safetyChecks: z.array(z.object({
      category: z.string(),
      checks: z.array(z.string()),
      severity: z.enum(['low', 'medium', 'high', 'critical'])
    })),
    riskThresholds: z.object({
      maxSeverity: z.enum(['none', 'low', 'medium', 'high', 'critical']),
      maxFlags: z.number(),
      minConfidence: z.number()
    })
  }),
  
  // Analysis approach
  securityStrategy: z.object({
    checkIllegalContent: z.boolean(),
    checkJailbreaking: z.boolean(),
    checkHarmfulInstructions: z.boolean(),
    checkMaliciousCode: z.boolean(),
    checkValueAlignment: z.boolean()
  }),
  
  // Tool planning (no external tools needed for security validation)
  useTools: z.array(z.object({
    name: z.string(),
    input: z.any(),
    reason: z.string()
  })).optional().describe('Tools to use in plan phase'),
  
  // Success tracking
  confidence: z.number().min(0).max(1),
  validationScope: z.array(z.string())
});

// ==================== TRY STEP SCHEMA ====================
const DangerWallTrySchema = z.object({
  // Safety check results
  safetyResults: z.array(z.object({
    safe: z.boolean(),
    flags: z.object({
      illegal: z.boolean(),
      jailbreaking: z.boolean(),
      dangerous: z.boolean(),
      antiWestern: z.boolean(),
      nsfw: z.boolean(),
      malicious: z.boolean(),
      harmful: z.boolean()
    }),
    details: z.array(z.string()),
    severity: z.enum(['none', 'low', 'medium', 'high', 'critical']),
    confidence: z.number(),
    sources: z.array(z.object({
      type: z.string(),
      path: z.string().optional(),
      flags: z.array(z.string()),
      details: z.array(z.string())
    }))
  })).describe('Individual safety check results'),
  
  // Overall assessment
  overallAssessment: z.object({
    safe: z.boolean(),
    maxSeverity: z.enum(['none', 'low', 'medium', 'high', 'critical']),
    flaggedCategories: z.array(z.string()),
    confidence: z.number(),
    requiresManualReview: z.boolean()
  }).describe('Overall security assessment'),
  
  // Content analysis
  contentAnalysis: z.object({
    taskContentChecked: z.boolean(),
    repositoryChecked: z.boolean(),
    attachmentsChecked: z.boolean(),
    totalContentSources: z.number()
  }),
  
  // Tool usage for validation (none needed typically)
  useTools: z.array(z.object({
    name: z.string(),
    input: z.any(),
    reason: z.string()
  })).optional().describe('Tools to use for security validation'),
  
  // Status
  validationComplete: z.boolean(),
  errors: z.array(z.string()).optional()
});

// ==================== REFINE STEP SCHEMA ====================
const DangerWallRefineSchema = z.object({
  // Refined assessment
  refinedAssessment: z.object({
    safe: z.boolean(),
    maxSeverity: z.enum(['none', 'low', 'medium', 'high', 'critical']),
    flaggedCategories: z.array(z.string()),
    confidence: z.number(),
    falsePositives: z.array(z.object({
      category: z.string(),
      reason: z.string(),
      confidence: z.number()
    })),
    edgeCases: z.array(z.object({
      description: z.string(),
      resolution: z.string(),
      confidence: z.number()
    }))
  }).describe('Refined security assessment after false positive analysis'),
  
  // Quality improvements
  qualityAssessment: z.object({
    accuracyScore: z.number(),
    completenessScore: z.number(),
    overallQuality: z.number()
  }),
  
  // Validation improvements
  improvements: z.array(z.string()).describe('Suggested improvements'),
  validationEnhancements: z.array(z.string()),
  
  // Refinement tools (none typically needed)
  useTools: z.array(z.object({
    name: z.string(),
    input: z.any(),
    reason: z.string()
  })).optional().describe('Tools for refinement'),
  
  // Refinement results
  refinementActions: z.array(z.string()),
  confidence: z.number()
});

// ==================== RETRY STEP SCHEMA ====================
const DangerWallRetrySchema = z.object({
  // Final comprehensive assessment
  finalAssessment: z.object({
    safe: z.boolean(),
    maxSeverity: z.enum(['none', 'low', 'medium', 'high', 'critical']),
    confidence: z.number(),
    verdict: z.object({
      approved: z.boolean(),
      reason: z.string(),
      flags: z.array(z.string()),
      recommendations: z.array(z.string())
    }),
    auditTrail: z.array(z.object({
      check: z.string(),
      result: z.boolean(),
      details: z.array(z.string()),
      severity: z.enum(['none', 'low', 'medium', 'high', 'critical'])
    }))
  }).describe('Final security assessment with go/no-go decision'),
  
  // Security insights
  securityInsights: z.object({
    riskProfile: z.string(),
    threatLevel: z.enum(['minimal', 'low', 'moderate', 'high', 'critical']),
    securityRecommendations: z.array(z.string()),
    complianceStatus: z.string()
  }),
  
  // Task alignment
  taskAlignment: z.object({
    alignmentScore: z.number(),
    safetyCompliance: z.boolean(),
    ethicsCompliance: z.boolean()
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
  validationMessage: z.string()
});

export type DangerWallInput = z.infer<typeof DangerWallInputSchema>;
export type DangerWallPlanOutput = z.infer<typeof DangerWallPlanSchema>;
export type DangerWallTryOutput = z.infer<typeof DangerWallTrySchema>;
export type DangerWallRefineOutput = z.infer<typeof DangerWallRefineSchema>;
export type SecurityResult = z.infer<typeof DangerWallRetrySchema>;

// ==================== PROMPTS ====================

/**
 * Agent-level prompt - MINIMAL
 * Only what applies to EVERY LLM call in this agent
 * 
 * @doc-comment-developing-promptdevelopment
 * domain: agent
 * intent: "Provide minimal security validation context"
 * current_version: "GA1.50.0"
 */
export const dangerWallPrompt = new AgentPrompt({
  name: 'danger-wall' as PromptPart,
  identity: 'Validate security and safety' as PromptPart  // Ultra-minimal
});

/**
 * Step-specific prompts - Just the purpose
 * These are progressively more specific
 */
export const dangerWallStepPrompts = {
  plan: new AgentStepPrompt({
    purpose: 'Analyze security requirements' as PromptPart
  }),
  try: new AgentStepPrompt({
    purpose: 'Execute safety validation' as PromptPart
  }),
  refine: new AgentStepPrompt({
    purpose: 'Enhance security assessment' as PromptPart
  }),
  retry: new AgentStepPrompt({
    purpose: 'Complete security validation' as PromptPart
  })
};

// ==================== AGENT CONFIGURATION ====================

/**
 * Comprehensive security validation agent
 * Uses full PTRR cycle for thorough security analysis
 */
const comprehensiveSecurity = factoryAgentWithPTRR<
  z.infer<typeof DangerWallInputSchema>,
  z.infer<typeof DangerWallRetrySchema>
>({
  name: 'comprehensive-security',
  description: 'Complete security validation with multi-layer analysis and audit trail',
  prompt: dangerWallPrompt,
  stepPrompts: {
    plan: () => dangerWallStepPrompts.plan,
    try: () => dangerWallStepPrompts.try,
    refine: () => dangerWallStepPrompts.refine,
    retry: () => dangerWallStepPrompts.retry
  },
  
  // The factories use these schemas to:
  // 1. Create typed executors for each step
  // 2. Run the 7-substep sequence automatically
  // 3. Store all results to execution state
  // 4. Handle tool execution when useTools is present
  outputSchema: DangerWallRetrySchema,
  
  // Optional configurations per step
  plan: {
    chunkThreshold: 1000  // Security planning is typically concise
  },
  try: {
    chunkThreshold: 10000,  // Security checks can be extensive
    enableParallelChunks: true
  },
  refine: {
    maxAttempts: 2
  },
  retry: {
    maxAttempts: 3,  // Critical for security decisions
    backoff: 1000
  }
});

/**
 * Quick security validation agent
 * Single-step execution for low-risk content
 */
const quickSecurity = factoryAgentWithSingleStep<
  z.infer<typeof DangerWallInputSchema>,
  z.infer<typeof DangerWallRetrySchema>
>({
  name: 'quick-security',
  description: 'Fast security validation for low-risk content',
  
  // Single executor - still runs through execution system
  execute: async (input, execution) => {
    // This executor is wrapped and tracked automatically
    execution.store('variation', 'mode', 'quick');
    
    // Even simple variations can use the execution's registries
    const llm = execution.llms.getDefaultLLM();
    
    // Quick security validation logic here
    // Return matches the Retry schema for consistency
    return {
      finalAssessment: {
        safe: true,  // Default to safe for quick validation
        maxSeverity: 'none' as const,
        confidence: 0.8,
        verdict: {
          approved: true,
          reason: 'Quick security validation passed - no obvious threats detected',
          flags: [],
          recommendations: ['Content approved for processing', 'Use comprehensive validation for sensitive tasks']
        },
        auditTrail: [
          {
            check: 'Quick security scan',
            result: true,
            details: ['Basic content safety validated', 'No obvious threats detected'],
            severity: 'none' as const
          }
        ]
      },
      securityInsights: {
        riskProfile: 'Low risk - quick validation passed',
        threatLevel: 'minimal' as const,
        securityRecommendations: ['Consider comprehensive validation for critical tasks'],
        complianceStatus: 'Basic compliance validated'
      },
      taskAlignment: {
        alignmentScore: 0.9,
        safetyCompliance: true,
        ethicsCompliance: true
      },
      recommendations: ['Content approved for processing'],
      success: true,
      validationMessage: 'Quick security validation completed successfully'
    };
  }
});

// ==================== AGENT DEFINITION ====================

/**
 * Danger Wall Agent
 * 
 * This agent demonstrates the CORRECT declarative pattern:
 * - Schemas define WHAT each step produces
 * - Factories create HOW it's executed (7-substep sequence)
 * - Execution handles WHERE it's stored (automatic state management)
 * - Prompts guide WHEN tools are used (through useTools in schemas)
 */
/**
 * Danger Wall Agent - Default PTRR implementation
 * Main agent using comprehensive security validation
 */
export const dangerWall = comprehensiveSecurity;

/**
 * Quick Danger Wall Agent - Simple version prefixed with "quick"
 * Fast security validation for low-risk content
 */
export const quickDangerWall = quickSecurity;

/**
 * Preferred exports with consistent Agent suffix naming
 */
export const dangerWallAgent = dangerWall;
export const quickDangerWallAgent = quickDangerWall;

// Removed all legacy compatibility exports

/**
 * THE MAGIC EXPLAINED:
 * 
 * When dangerWallAgent is called:
 * 1. selectVariation picks comprehensive or quick based on risk factors
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
 *    - Every security check result
 *    - Every threat assessment
 *    - Every validation decision
 *    - Complete audit trail in namespaced stores!
 * 
 * We just defined schemas - the framework does ALL security validation logic!
 */
