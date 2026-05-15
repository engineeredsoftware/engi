/**
 * Discovery Phase Agents for the AssetPack Pipeline
 * 
 * ALL agents use PTRR (Plan-Try-Refine-Retry) - no exceptions
 */

import { factoryAgentWithPTRR } from '@bitcode/agent-generics';
import { z } from 'zod';
import {
  createAssetPackDiscoveryPhaseUnderstandRequirementsAgentPrompt,
  AssetPackDiscoveryPhaseUnderstandRequirementsAgentPromptSteps
} from './prompts/understand-requirements-prompt';
import {
  createAssetPackDiscoveryPhaseAnalyzeParallelAgentPrompt,
  AssetPackDiscoveryPhaseAnalyzeParallelAgentPromptSteps
} from './prompts/analyze-parallel-prompt';
import {
  createAssetPackDiscoveryPhasePlanImplementationAgentPrompt,
  AssetPackDiscoveryPhasePlanImplementationAgentPromptSteps
} from './prompts/plan-implementation-prompt';
import {
  createAssetPackDiscoveryPhaseComprehendAttachmentsAgentPrompt,
  AssetPackDiscoveryPhaseComprehendAttachmentsAgentPromptSteps
} from './prompts/comprehend-attachments-prompt';
import {
  createAssetPackDiscoveryPhaseAssessComplexityAgentPrompt,
  AssetPackDiscoveryPhaseAssessComplexityAgentPromptSteps
} from './prompts/assess-complexity-prompt';

// ==================== UNDERSTAND REQUIREMENTS AGENT ====================

const UnderstandRequirementsInputSchema = z.object({
  readDescription: z.string().optional(),
  read: z.string().optional(),
  writtenAssetType: z.string().optional(),
  codebaseAnalysis: z.any(), // From setup phase
  attachments: z.array(z.any()).optional()
});

const UnderstandRequirementsOutputSchema = z.object({
  requirements: z.array(z.object({
    id: z.string(),
    type: z.enum(['functional', 'non-functional', 'technical', 'business']),
    description: z.string(),
    priority: z.enum(['must-have', 'should-have', 'nice-to-have']),
    acceptanceCriteria: z.array(z.string())
  })),
  scope: z.object({
    included: z.array(z.string()),
    excluded: z.array(z.string()),
    assumptions: z.array(z.string())
  }),
  constraints: z.array(z.string()),
  successMetrics: z.array(z.string())
});

/**
 * AssetPackDiscoveryPhaseUnderstandRequirementsAgent
 * 
 * Deeply understands what needs to be done.
 * PrepareContext will provide all setup phase results.
 */
export const AssetPackDiscoveryPhaseUnderstandRequirementsAgent = factoryAgentWithPTRR<
  z.infer<typeof UnderstandRequirementsInputSchema>,
  z.infer<typeof UnderstandRequirementsOutputSchema>
>({
  name: 'asset-pack-understand-requirements-agent',
  description: 'Understands and documents detailed requirements',
  
  prompt: createAssetPackDiscoveryPhaseUnderstandRequirementsAgentPrompt(),
  stepPrompts: AssetPackDiscoveryPhaseUnderstandRequirementsAgentPromptSteps,
  
  outputSchema: UnderstandRequirementsOutputSchema,
  
  plan: { chunkThreshold: 2000 },
  try: { chunkThreshold: 4000 },
  refine: { maxAttempts: 2 },
  retry: { maxAttempts: 1 }
});

// ==================== RESEARCH APPROACH AGENT ====================

const ResearchApproachInputSchema = z.object({
  requirements: z.any(), // From understand requirements
  read: z.string().optional(),
  writtenAssetType: z.string().optional(),
  codebaseAnalysis: z.any()
});

const ResearchApproachOutputSchema = z.object({
  approach: z.object({
    methodology: z.string(),
    phases: z.array(z.object({
      name: z.string(),
      description: z.string(),
      assetPackSynthesisArtifacts: z.array(z.string()).optional(),
      shippables: z.array(z.string()).optional(),
      writtenAssets: z.array(z.string()).optional()
    })),
    tools: z.array(z.string()),
    estimatedEffort: z.string()
  }),
  alternatives: z.array(z.object({
    name: z.string(),
    pros: z.array(z.string()),
    cons: z.array(z.string()),
    reason_not_chosen: z.string()
  })),
  risks: z.array(z.object({
    risk: z.string(),
    impact: z.enum(['low', 'medium', 'high']),
    mitigation: z.string()
  })),
  recommendation: z.string()
});

export function applyResearchApproachSemanticMirrors(
  output: z.infer<typeof ResearchApproachOutputSchema>
): z.infer<typeof ResearchApproachOutputSchema> {
  return {
    ...output,
    approach: {
      ...output.approach,
      phases: output.approach.phases.map((phase) => ({
        ...phase,
        writtenAssets:
          phase.writtenAssets ??
          phase.assetPackSynthesisArtifacts ??
          phase.shippables,
        assetPackSynthesisArtifacts:
          phase.assetPackSynthesisArtifacts ??
          phase.writtenAssets,
      })),
    },
  };
}

/**
 * AssetPackDiscoveryPhaseResearchApproachAgent
 * 
 * Researches and determines the best approach.
 */
const AssetPackDiscoveryPhaseResearchApproachAgentCore = factoryAgentWithPTRR<
  z.infer<typeof ResearchApproachInputSchema>,
  z.infer<typeof ResearchApproachOutputSchema>
>({
  name: 'asset-pack-research-approach-agent',
  description: 'Researches and recommends implementation approach',
  
  // Use AnalyzeParallel prompts as the research approach analogue
  prompt: createAssetPackDiscoveryPhaseAnalyzeParallelAgentPrompt(),
  stepPrompts: AssetPackDiscoveryPhaseAnalyzeParallelAgentPromptSteps,
  
  outputSchema: ResearchApproachOutputSchema,
  
  plan: { chunkThreshold: 1500 },
  try: { chunkThreshold: 3000 },
  refine: { maxAttempts: 2 },
  retry: { maxAttempts: 1 }
});

export async function AssetPackDiscoveryPhaseResearchApproachAgent(
  input: z.infer<typeof ResearchApproachInputSchema>,
  execution: any
): Promise<z.infer<typeof ResearchApproachOutputSchema>> {
  return applyResearchApproachSemanticMirrors(
    await AssetPackDiscoveryPhaseResearchApproachAgentCore(input, execution)
  );
}

// ==================== PLAN IMPLEMENTATION AGENT ====================

const PlanImplementationInputSchema = z.object({
  requirements: z.any(),
  approach: z.any(),
  read: z.string().optional(),
  writtenAssetType: z.string().optional(),
  codebaseAnalysis: z.any()
});

const PlanImplementationOutputSchema = z.object({
  implementationPlan: z.object({
    overview: z.string(),
    milestones: z.array(z.object({
      name: z.string(),
      description: z.string(),
      completionCriteria: z.array(z.string())
    })),
    dependencies: z.array(z.object({
      item: z.string(),
      type: z.enum(['internal', 'external', 'technical']),
      status: z.enum(['available', 'needed', 'optional'])
    }))
  }),
  testingStrategy: z.object({
    approach: z.string(),
    testTypes: z.array(z.string()),
    coverage: z.string()
  }),
  validationCriteria: z.array(z.string()),
  definitionOfRead: z.array(z.string()).optional(),
  readSatisfactionCriteria: z.array(z.string()).optional()
});

export function applyPlanImplementationSemanticMirrors(
  output: z.infer<typeof PlanImplementationOutputSchema>
): z.infer<typeof PlanImplementationOutputSchema> {
  return {
    ...output,
    readSatisfactionCriteria: output.readSatisfactionCriteria ?? output.definitionOfRead,
  };
}

/**
 * AssetPackDiscoveryPhasePlanImplementationAgent
 * 
 * Creates detailed implementation plan.
 */
const AssetPackDiscoveryPhasePlanImplementationAgentCore = factoryAgentWithPTRR<
  z.infer<typeof PlanImplementationInputSchema>,
  z.infer<typeof PlanImplementationOutputSchema>
>({
  name: 'asset-pack-plan-implementation-agent',
  description: 'Plans the implementation details',
  
  prompt: createAssetPackDiscoveryPhasePlanImplementationAgentPrompt(),
  stepPrompts: AssetPackDiscoveryPhasePlanImplementationAgentPromptSteps,
  
  outputSchema: PlanImplementationOutputSchema,
  
  plan: { chunkThreshold: 2000 },
  try: { chunkThreshold: 4000 },
  refine: { maxAttempts: 2 },
  retry: { maxAttempts: 1 }
});

export async function AssetPackDiscoveryPhasePlanImplementationAgent(
  input: z.infer<typeof PlanImplementationInputSchema>,
  execution: any
): Promise<z.infer<typeof PlanImplementationOutputSchema>> {
  return applyPlanImplementationSemanticMirrors(
    await AssetPackDiscoveryPhasePlanImplementationAgentCore(input, execution)
  );
}

// ==================== GENERIC DISCOVERY AGENTS (RUN FOR ALL TYPES) ====================

// --- GATHER CONTEXT AGENT (RUNS FIRST) ---
const GatherContextInputSchema = z.object({
  readDescription: z.string().optional(),
  read: z.string().optional(),
  codebaseAnalysis: z.any(),
  attachments: z.array(z.any()).optional(),
  writtenAssetType: z.string().optional()
});

const GatherContextOutputSchema = z.object({
  relevantContext: z.object({
    files: z.array(z.string()),
    dependencies: z.array(z.string()),
    relatedIssues: z.array(z.any()).optional(),
    relatedPRs: z.array(z.any()).optional()
  }),
  domainKnowledge: z.object({
    concepts: z.array(z.string()),
    terminology: z.record(z.string(), z.string()),
    patterns: z.array(z.string())
  }),
  contextQuality: z.number(), // 0-1
  contextSummary: z.string()
});

/**
 * AssetPackDiscoveryPhaseGatherContextAgent
 * 
 * Generic agent that runs first for every AssetPack written-asset request.
 * Gathers relevant context from codebase, docs, and history.
 */
export const AssetPackDiscoveryPhaseGatherContextAgent = factoryAgentWithPTRR<
  z.infer<typeof GatherContextInputSchema>,
  z.infer<typeof GatherContextOutputSchema>
>({
  name: 'asset-pack-gather-context-agent',
  description: 'Gathers relevant context for any AssetPack written-asset request',
  
  prompt: createAssetPackDiscoveryPhaseComprehendAttachmentsAgentPrompt(),
  stepPrompts: AssetPackDiscoveryPhaseComprehendAttachmentsAgentPromptSteps,
  
  outputSchema: GatherContextOutputSchema,
  
  plan: { chunkThreshold: 1500 },
  try: { chunkThreshold: 3000 },
  refine: { maxAttempts: 2 },
  retry: { maxAttempts: 1 }
});

// --- ASSESS COMPLEXITY AGENT (RUNS LAST) ---
const AssessComplexityInputSchema = z.object({
  requirements: z.any(),
  approach: z.any(),
  implementationPlan: z.any(),
  context: z.any(),
  read: z.string().optional(),
  writtenAssetType: z.string().optional()
});

const AssessComplexityOutputSchema = z.object({
  overallComplexity: z.enum(['trivial', 'simple', 'moderate', 'complex', 'very-complex']),
  complexityFactors: z.object({
    technical: z.number(), // 0-10
    domain: z.number(), // 0-10
    integration: z.number(), // 0-10
    testing: z.number(), // 0-10
    maintenance: z.number() // 0-10
  }),
  estimatedEffort: z.object({
    optimistic: z.string(),
    realistic: z.string(),
    pessimistic: z.string()
  }),
  riskAssessment: z.object({
    level: z.enum(['low', 'medium', 'high', 'critical']),
    factors: z.array(z.string()),
    mitigations: z.array(z.string())
  }),
  discoveryConfidence: z.number(), // 0-1 - CRITICAL for validation phase
  recommendation: z.string()
});

/**
 * AssetPackDiscoveryPhaseAssessComplexityAgent
 * 
 * Generic agent that runs last for every AssetPack written-asset request.
 * Assesses overall complexity and provides confidence score.
 */
export const AssetPackDiscoveryPhaseAssessComplexityAgent = factoryAgentWithPTRR<
  z.infer<typeof AssessComplexityInputSchema>,
  z.infer<typeof AssessComplexityOutputSchema>
>({
  name: 'asset-pack-assess-complexity-agent',
  description: 'Assesses complexity and confidence for any AssetPack written-asset request',
  
  prompt: createAssetPackDiscoveryPhaseAssessComplexityAgentPrompt(),
  stepPrompts: AssetPackDiscoveryPhaseAssessComplexityAgentPromptSteps,
  
  outputSchema: AssessComplexityOutputSchema,
  
  plan: { chunkThreshold: 1500 },
  try: { chunkThreshold: 2500 },
  refine: { maxAttempts: 2 },
  retry: { maxAttempts: 1 }
});

// ==================== DYNAMIC AGENT REGISTRATION ====================

/**
 * Registers discovery agents for an AssetPack written-asset request.
 * Called after setup phase completes.
 * 
 * Sequence:
 * 1. GatherContext (generic) - ALWAYS FIRST
 * 2. UnderstandRequirements (generic but aware of type)
 * 3. ResearchApproach (generic but aware of type)
 * 4. PlanImplementation (generic but aware of type)
 * 5. AssessComplexity (generic) - ALWAYS LAST
 */
export function registerDiscoveryAgents(
  agentRegistry: any // AgentAgentsRegistry from PipelineExecution
): void {
  // ALWAYS register generic gather context FIRST
  agentRegistry.registerAgent(
    'discovery:gather-context',
    AssetPackDiscoveryPhaseGatherContextAgent
  );
  
  // Register core discovery agents (generic but type-aware)
  agentRegistry.registerAgent(
    'discovery:understand-requirements',
    AssetPackDiscoveryPhaseUnderstandRequirementsAgent
  );
  
  agentRegistry.registerAgent(
    'discovery:research-approach',
    AssetPackDiscoveryPhaseResearchApproachAgent
  );
  
  agentRegistry.registerAgent(
    'discovery:plan-implementation',
    AssetPackDiscoveryPhasePlanImplementationAgent
  );
  
  // ALWAYS register generic assess complexity LAST
  agentRegistry.registerAgent(
    'discovery:assess-complexity',
    AssetPackDiscoveryPhaseAssessComplexityAgent
  );
}

/**
 * Creates the discovery phase sequence.
 * Note: Discovery phase is mostly generic with type-awareness.
 * 
 * @returns Array defining the execution order
 */
export function createDiscoveryExecutorSequence(): any[] {
  return [
    { agent: 'discovery:gather-context' }, // Generic - FIRST
    { agent: 'discovery:understand-requirements' }, // Generic but type-aware
    { agent: 'discovery:research-approach' }, // Generic but type-aware
    { agent: 'discovery:plan-implementation' }, // Generic but type-aware
    { agent: 'discovery:assess-complexity' } // Generic - LAST
  ];
}
