/**
 * Discovery Phase Agents for Deliverable Pipeline
 * 
 * Pattern: DeliverablesPipelineDiscoveryPhase{Action}Agent
 * 
 * ALL agents use PTRR (Plan-Try-Refine-Retry) - no exceptions
 */

import { factoryAgentWithPTRR } from '@engi/agent-generics';
import { z } from 'zod';
import {
  createDeliverablesPipelineDiscoveryPhaseUnderstandRequirementsAgentPrompt,
  DeliverablesPipelineDiscoveryPhaseUnderstandRequirementsAgentPromptSteps
} from './prompts/understand-requirements-prompt';
import {
  createDeliverablesPipelineDiscoveryPhaseAnalyzeParallelAgentPrompt,
  DeliverablesPipelineDiscoveryPhaseAnalyzeParallelAgentPromptSteps
} from './prompts/analyze-parallel-prompt';
import {
  createDeliverablesPipelineDiscoveryPhasePlanImplementationAgentPrompt,
  DeliverablesPipelineDiscoveryPhasePlanImplementationAgentPromptSteps
} from './prompts/plan-implementation-prompt';
import {
  createDeliverablesPipelineDiscoveryPhaseComprehendAttachmentsAgentPrompt,
  DeliverablesPipelineDiscoveryPhaseComprehendAttachmentsAgentPromptSteps
} from './prompts/comprehend-attachments-prompt';
import {
  createDeliverablesPipelineDiscoveryPhaseAssessComplexityAgentPrompt,
  DeliverablesPipelineDiscoveryPhaseAssessComplexityAgentPromptSteps
} from './prompts/assess-complexity-prompt';

// ==================== UNDERSTAND REQUIREMENTS AGENT ====================

const UnderstandRequirementsInputSchema = z.object({
  taskDescription: z.string(),
  deliverableType: z.string(),
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
 * DeliverablesPipelineDiscoveryPhaseUnderstandRequirementsAgent
 * 
 * Deeply understands what needs to be done.
 * PrepareContext will provide all setup phase results.
 */
export const DeliverablesPipelineDiscoveryPhaseUnderstandRequirementsAgent = factoryAgentWithPTRR<
  z.infer<typeof UnderstandRequirementsInputSchema>,
  z.infer<typeof UnderstandRequirementsOutputSchema>
>({
  name: 'deliverable-pipeline-understand-requirements-agent',
  description: 'Understands and documents detailed requirements',
  
  prompt: createDeliverablesPipelineDiscoveryPhaseUnderstandRequirementsAgentPrompt(),
  stepPrompts: DeliverablesPipelineDiscoveryPhaseUnderstandRequirementsAgentPromptSteps,
  
  outputSchema: UnderstandRequirementsOutputSchema,
  
  plan: { chunkThreshold: 2000 },
  try: { chunkThreshold: 4000 },
  refine: { maxAttempts: 2 },
  retry: { maxAttempts: 1 }
});

// ==================== RESEARCH APPROACH AGENT ====================

const ResearchApproachInputSchema = z.object({
  requirements: z.any(), // From understand requirements
  deliverableType: z.string(),
  codebaseAnalysis: z.any()
});

const ResearchApproachOutputSchema = z.object({
  approach: z.object({
    methodology: z.string(),
    phases: z.array(z.object({
      name: z.string(),
      description: z.string(),
      deliverables: z.array(z.string())
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

/**
 * DeliverablesPipelineDiscoveryPhaseResearchApproachAgent
 * 
 * Researches and determines the best approach.
 */
export const DeliverablesPipelineDiscoveryPhaseResearchApproachAgent = factoryAgentWithPTRR<
  z.infer<typeof ResearchApproachInputSchema>,
  z.infer<typeof ResearchApproachOutputSchema>
>({
  name: 'deliverable-pipeline-research-approach-agent',
  description: 'Researches and recommends implementation approach',
  
  // Use AnalyzeParallel prompts as the research approach analogue
  prompt: createDeliverablesPipelineDiscoveryPhaseAnalyzeParallelAgentPrompt(),
  stepPrompts: DeliverablesPipelineDiscoveryPhaseAnalyzeParallelAgentPromptSteps,
  
  outputSchema: ResearchApproachOutputSchema,
  
  plan: { chunkThreshold: 1500 },
  try: { chunkThreshold: 3000 },
  refine: { maxAttempts: 2 },
  retry: { maxAttempts: 1 }
});

// ==================== PLAN IMPLEMENTATION AGENT ====================

const PlanImplementationInputSchema = z.object({
  requirements: z.any(),
  approach: z.any(),
  deliverableType: z.string(),
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
  definitionOfDone: z.array(z.string())
});

/**
 * DeliverablesPipelineDiscoveryPhasePlanImplementationAgent
 * 
 * Creates detailed implementation plan.
 */
export const DeliverablesPipelineDiscoveryPhasePlanImplementationAgent = factoryAgentWithPTRR<
  z.infer<typeof PlanImplementationInputSchema>,
  z.infer<typeof PlanImplementationOutputSchema>
>({
  name: 'deliverable-pipeline-plan-implementation-agent',
  description: 'Plans the implementation details',
  
  prompt: createDeliverablesPipelineDiscoveryPhasePlanImplementationAgentPrompt(),
  stepPrompts: DeliverablesPipelineDiscoveryPhasePlanImplementationAgentPromptSteps,
  
  outputSchema: PlanImplementationOutputSchema,
  
  plan: { chunkThreshold: 2000 },
  try: { chunkThreshold: 4000 },
  refine: { maxAttempts: 2 },
  retry: { maxAttempts: 1 }
});

// ==================== GENERIC DISCOVERY AGENTS (RUN FOR ALL TYPES) ====================

// --- GATHER CONTEXT AGENT (RUNS FIRST) ---
const GatherContextInputSchema = z.object({
  taskDescription: z.string(),
  codebaseAnalysis: z.any(),
  attachments: z.array(z.any()).optional(),
  deliverableType: z.string()
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
 * DeliverablesPipelineDiscoveryPhaseGatherContextAgent
 * 
 * GENERIC agent that runs FIRST for all deliverable types.
 * Gathers relevant context from codebase, docs, and history.
 */
export const DeliverablesPipelineDiscoveryPhaseGatherContextAgent = factoryAgentWithPTRR<
  z.infer<typeof GatherContextInputSchema>,
  z.infer<typeof GatherContextOutputSchema>
>({
  name: 'deliverable-pipeline-gather-context-agent',
  description: 'Gathers relevant context for any deliverable type',
  
  prompt: createDeliverablesPipelineDiscoveryPhaseComprehendAttachmentsAgentPrompt(),
  stepPrompts: DeliverablesPipelineDiscoveryPhaseComprehendAttachmentsAgentPromptSteps,
  
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
  deliverableType: z.string()
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
 * DeliverablesPipelineDiscoveryPhaseAssessComplexityAgent
 * 
 * GENERIC agent that runs LAST for all deliverable types.
 * Assesses overall complexity and provides confidence score.
 */
export const DeliverablesPipelineDiscoveryPhaseAssessComplexityAgent = factoryAgentWithPTRR<
  z.infer<typeof AssessComplexityInputSchema>,
  z.infer<typeof AssessComplexityOutputSchema>
>({
  name: 'deliverable-pipeline-assess-complexity-agent',
  description: 'Assesses complexity and confidence for any deliverable',
  
  prompt: createDeliverablesPipelineDiscoveryPhaseAssessComplexityAgentPrompt(),
  stepPrompts: DeliverablesPipelineDiscoveryPhaseAssessComplexityAgentPromptSteps,
  
  outputSchema: AssessComplexityOutputSchema,
  
  plan: { chunkThreshold: 1500 },
  try: { chunkThreshold: 2500 },
  refine: { maxAttempts: 2 },
  retry: { maxAttempts: 1 }
});

// ==================== DYNAMIC AGENT REGISTRATION ====================

/**
 * Registers discovery agents based on deliverable type.
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
    DeliverablesPipelineDiscoveryPhaseGatherContextAgent
  );
  
  // Register core discovery agents (generic but type-aware)
  agentRegistry.registerAgent(
    'discovery:understand-requirements',
    DeliverablesPipelineDiscoveryPhaseUnderstandRequirementsAgent
  );
  
  agentRegistry.registerAgent(
    'discovery:research-approach',
    DeliverablesPipelineDiscoveryPhaseResearchApproachAgent
  );
  
  agentRegistry.registerAgent(
    'discovery:plan-implementation',
    DeliverablesPipelineDiscoveryPhasePlanImplementationAgent
  );
  
  // ALWAYS register generic assess complexity LAST
  agentRegistry.registerAgent(
    'discovery:assess-complexity',
    DeliverablesPipelineDiscoveryPhaseAssessComplexityAgent
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
