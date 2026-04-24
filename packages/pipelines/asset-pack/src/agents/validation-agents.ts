/**
 * Validation Phase Agents for the AssetPack Pipeline
 * 
 * Pattern: DeliverablesPipelineValidationPhase{Action}Agent
 * 
 * ALL agents use PTRR (Plan-Try-Refine-Retry) - no exceptions
 */

import { factoryAgentWithPTRR } from '@bitcode/agent-generics';
import { z } from 'zod';
// Prompts for validation agents. Retained raw PromptParts are composed through
// Bitcode-specific prompt builders before any agent enters Finish.
import {
  createDeliverablesPipelineValidationPhaseValidateCodeChangesAgentPrompt,
  DeliverablesPipelineValidationPhaseValidateCodeChangesAgentPromptSteps
} from './prompts/validate-code-changes-prompt';
import {
  createDeliverablesPipelineValidationPhaseValidateReviewAgentPrompt,
  DeliverablesPipelineValidationPhaseValidateReviewAgentPromptSteps
} from './prompts/validate-review-prompt';
import {
  createDeliverablesPipelineValidationPhaseValidateDocumentAgentPrompt,
  DeliverablesPipelineValidationPhaseValidateDocumentAgentPromptSteps
} from './prompts/validate-document-prompt';
import {
  createDeliverablesPipelineValidationPhaseReadyToFinishCodeChangeAgentPrompt,
  DeliverablesPipelineValidationPhaseReadyToFinishCodeChangeAgentPromptSteps
} from './prompts/ready-to-ship-code-change-prompt';
import {
  createDeliverablesPipelineValidationPhaseReadyToFinishCodeChangeReviewAgentPrompt,
  DeliverablesPipelineValidationPhaseReadyToFinishCodeChangeReviewAgentPromptSteps
} from './prompts/ready-to-ship-code-change-review-prompt';
import {
  createDeliverablesPipelineValidationPhaseReadyToFinishDesignDocumentAgentPrompt,
  DeliverablesPipelineValidationPhaseReadyToFinishDesignDocumentAgentPromptSteps
} from './prompts/ready-to-ship-design-document-prompt';
import {
  createDeliverablesPipelineValidationPhaseReadyToFinishDesignDocumentReviewAgentPrompt,
  DeliverablesPipelineValidationPhaseReadyToFinishDesignDocumentReviewAgentPromptSteps
} from './prompts/ready-to-ship-design-document-review-prompt';
import {
  createDeliverablesPipelineValidationPhaseReadyToFinishAgentPrompt,
  DeliverablesPipelineValidationPhaseReadyToFinishAgentPromptSteps
} from './prompts/ready-to-ship-prompt';
import { normalizeWrittenAssetType } from '../semantic-resolution';

import { Prompt } from '@bitcode/prompts/prompt';
import { PROMPTPART_GENERIC_AGENT_GENERATION_JSON_ONLY_HEADER } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_json_only_header';
import { PROMPTPART_GENERIC_AGENT_GENERATION_USE_THIS_STRUCTURED_SCHEMA } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_use_this_structured_schema';
import { PROMPTPART_GENERIC_AGENT_FAILSAFE_PREPARE_CONTEXT } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_failsafe_prepare_context';

// ==================== VALIDATE LAST ITERATION'S VALIDATION (NEW) ====================

const ValidateLastValidationOutputSchema = z.object({ issues: z.array(z.string()) });

export const DeliverablesPipelineValidationPhaseValidateLastValidationAgent = factoryAgentWithPTRR<
  any,
  z.infer<typeof ValidateLastValidationOutputSchema>
>({
  name: 'deliverable-pipeline-validate-last-iterations-validation-phase-agent',
  description: 'Validates prior iteration\'s validation for regressions or gaps',
  outputSchema: ValidateLastValidationOutputSchema,
  prompt: (() => { const p = new Prompt(); p.set('generation:json_only_header', PROMPTPART_GENERIC_AGENT_GENERATION_JSON_ONLY_HEADER as any); p.set('generation:use_this_structure', PROMPTPART_GENERIC_AGENT_GENERATION_USE_THIS_STRUCTURED_SCHEMA as any); p.set('failsafe:prepare_context', PROMPTPART_GENERIC_AGENT_FAILSAFE_PREPARE_CONTEXT as any); return p; })(),
  stepPrompts: { plan: () => new Prompt(), try: () => new Prompt(), refine: () => new Prompt(), retry: () => new Prompt() },
  plan: {}, try: {}, refine: {}, retry: {}
});

// ==================== VALIDATE DISCOVERY (NEW) ====================

const ValidateDiscoveryOutputSchema = z.object({ issues: z.array(z.string()) });

export const DeliverablesPipelineValidationPhaseValidateDiscoveryAgent = factoryAgentWithPTRR<
  any,
  z.infer<typeof ValidateDiscoveryOutputSchema>
>({
  name: 'deliverable-pipeline-validate-discovery-phase-agent',
  description: 'Validates discovery outputs for completeness and feasibility',
  outputSchema: ValidateDiscoveryOutputSchema,
  prompt: (() => { const p = new Prompt(); p.set('generation:json_only_header', PROMPTPART_GENERIC_AGENT_GENERATION_JSON_ONLY_HEADER as any); p.set('generation:use_this_structure', PROMPTPART_GENERIC_AGENT_GENERATION_USE_THIS_STRUCTURED_SCHEMA as any); p.set('failsafe:prepare_context', PROMPTPART_GENERIC_AGENT_FAILSAFE_PREPARE_CONTEXT as any); return p; })(),
  stepPrompts: { plan: () => new Prompt(), try: () => new Prompt(), refine: () => new Prompt(), retry: () => new Prompt() },
  plan: {}, try: {}, refine: {}, retry: {}
});

// ==================== VALIDATE CODE CHANGES AGENT ====================

const ValidateCodeChangesInputSchema = z.object({
  implementationResults: z.any(), // From implementation phase
  validationCriteria: z.array(z.string()),
  definitionOfNeed: z.array(z.string()).optional(),
  definitionOfDone: z.array(z.string()).optional()
});

const ValidateCodeChangesOutputSchema = z.object({
  syntaxValidation: z.object({
    passed: z.boolean(),
    errors: z.array(z.object({
      file: z.string(),
      line: z.number(),
      message: z.string()
    }))
  }),
  testResults: z.object({
    passed: z.boolean(),
    total: z.number(),
    passing: z.number(),
    failing: z.number(),
    failures: z.array(z.object({
      test: z.string(),
      error: z.string()
    }))
  }),
  lintResults: z.object({
    passed: z.boolean(),
    warnings: z.number(),
    errors: z.number(),
    issues: z.array(z.object({
      file: z.string(),
      rule: z.string(),
      message: z.string(),
      severity: z.enum(['warning', 'error'])
    }))
  }),
  buildResults: z.object({
    passed: z.boolean(),
    output: z.string(),
    errors: z.array(z.string())
  }),
  overallStatus: z.enum(['passed', 'failed', 'partial']),
  recommendedFixes: z.array(z.string())
});

/**
 * DeliverablesPipelineValidationPhaseValidateCodeChangesAgent
 * 
 * Validates code changes for pull requests.
 * PrepareContext will provide all implementation results.
 */
export const DeliverablesPipelineValidationPhaseValidateCodeChangesAgent = factoryAgentWithPTRR<
  z.infer<typeof ValidateCodeChangesInputSchema>,
  z.infer<typeof ValidateCodeChangesOutputSchema>
>({
  name: 'deliverable-pipeline-validate-implementation-phase-code-change-agent',
  description: 'Validates code changes meet quality standards',
  
  prompt: createDeliverablesPipelineValidationPhaseValidateCodeChangesAgentPrompt(),
  stepPrompts: DeliverablesPipelineValidationPhaseValidateCodeChangesAgentPromptSteps,
  
  outputSchema: ValidateCodeChangesOutputSchema,
  
  plan: { chunkThreshold: 2000 },
  try: { chunkThreshold: 5000 },
  refine: { maxAttempts: 2 },
  retry: { maxAttempts: 1 }
});

// ==================== VALIDATE REVIEW AGENT ====================

const ValidateReviewInputSchema = z.object({
  reviewResults: z.any(), // From implementation phase
  pullRequestData: z.any()
});

const ValidateReviewOutputSchema = z.object({
  reviewQuality: z.object({
    thoroughness: z.enum(['low', 'medium', 'high']),
    constructiveness: z.enum(['low', 'medium', 'high']),
    accuracy: z.enum(['low', 'medium', 'high'])
  }),
  coverageAnalysis: z.object({
    filesReviewed: z.number(),
    totalFiles: z.number(),
    percentageCovered: z.number(),
    missedAreas: z.array(z.string())
  }),
  feedbackSummary: z.object({
    totalComments: z.number(),
    criticalIssues: z.number(),
    suggestions: z.number(),
    positiveRemarks: z.number()
  }),
  overallAssessment: z.string()
});

/**
 * DeliverablesPipelineValidationPhaseValidateReviewAgent
 * 
 * Validates pull request review quality.
 */
export const DeliverablesPipelineValidationPhaseValidateReviewAgent = factoryAgentWithPTRR<
  z.infer<typeof ValidateReviewInputSchema>,
  z.infer<typeof ValidateReviewOutputSchema>
>({
  name: 'deliverable-pipeline-validate-implementation-phase-code-change-review-agent',
  description: 'Validates review quality and completeness',
  
  prompt: createDeliverablesPipelineValidationPhaseValidateReviewAgentPrompt(),
  stepPrompts: DeliverablesPipelineValidationPhaseValidateReviewAgentPromptSteps,
  
  outputSchema: ValidateReviewOutputSchema,
  
  plan: { chunkThreshold: 1500 },
  try: { chunkThreshold: 3000 },
  refine: { maxAttempts: 1 },
  retry: { maxAttempts: 1 }
});

// ==================== VALIDATE DOCUMENT AGENT ====================

const ValidateDocumentInputSchema = z.object({
  documentContent: z.any(), // From implementation phase
  documentType: z.enum(['design-document', 'design-document-review'])
});

const ValidateDocumentOutputSchema = z.object({
  contentQuality: z.object({
    clarity: z.enum(['poor', 'fair', 'good', 'excellent']),
    completeness: z.enum(['incomplete', 'partial', 'complete', 'comprehensive']),
    structure: z.enum(['poor', 'fair', 'good', 'excellent'])
  }),
  requiredSections: z.array(z.object({
    section: z.string(),
    present: z.boolean(),
    quality: z.enum(['missing', 'poor', 'adequate', 'good', 'excellent']).optional()
  })),
  grammarCheck: z.object({
    errors: z.number(),
    warnings: z.number(),
    readabilityScore: z.number()
  }),
  technicalAccuracy: z.object({
    verified: z.boolean(),
    issues: z.array(z.string())
  }),
  overallScore: z.number(), // 0-100
  improvements: z.array(z.string())
});

/**
 * DeliverablesPipelineValidationPhaseValidateDocumentAgent
 * 
 * Validates design documents and comments.
 */
export const DeliverablesPipelineValidationPhaseValidateDocumentAgent = factoryAgentWithPTRR<
  z.infer<typeof ValidateDocumentInputSchema>,
  z.infer<typeof ValidateDocumentOutputSchema>
>({
  name: 'deliverable-pipeline-validate-implementation-phase-design-document-agent',
  description: 'Validates document quality and completeness',
  
  prompt: createDeliverablesPipelineValidationPhaseValidateDocumentAgentPrompt(),
  stepPrompts: DeliverablesPipelineValidationPhaseValidateDocumentAgentPromptSteps,
  
  outputSchema: ValidateDocumentOutputSchema,
  
  plan: { chunkThreshold: 1500 },
  try: { chunkThreshold: 3000 },
  refine: { maxAttempts: 2 },
  retry: { maxAttempts: 1 }
});

// ==================== TYPE-SPECIFIC READY TO FINISH AGENTS ====================

const ReadyToFinishCodeChangeInputSchema = z.object({
  validationResults: z.any(),
  implementationResults: z.any(),
  discoveryConfidence: z.number()
});

const ReadyToFinishCodeChangeOutputSchema = z.object({
  ready: z.boolean(),
  confidence: z.number(),
  blockers: z.array(z.string()),
  warnings: z.array(z.string()),
  summary: z.string()
});

/**
 * Bitcode validation agent that decides whether a code-change AssetPack can enter Finish.
 * 
 * Type-specific readiness check for code changes.
 */
export const DeliverablesPipelineValidationPhaseReadyToFinishCodeChangeAgent = factoryAgentWithPTRR<
  z.infer<typeof ReadyToFinishCodeChangeInputSchema>,
  z.infer<typeof ReadyToFinishCodeChangeOutputSchema>
>({
  name: 'deliverable-pipeline-ready-code-change-agent',
  description: 'Validates code change is ready to finish',
  
  prompt: createDeliverablesPipelineValidationPhaseReadyToFinishCodeChangeAgentPrompt(),
  stepPrompts: DeliverablesPipelineValidationPhaseReadyToFinishCodeChangeAgentPromptSteps,
  
  outputSchema: ReadyToFinishCodeChangeOutputSchema,
  
  plan: { chunkThreshold: 1000 },
  try: { chunkThreshold: 2000 },
  refine: { maxAttempts: 1 },
  retry: { maxAttempts: 1 }
});

/**
 * Bitcode validation agent that decides whether a code-review AssetPack can enter Finish.
 */
export const DeliverablesPipelineValidationPhaseReadyToFinishCodeChangeReviewAgent = factoryAgentWithPTRR<
  z.infer<typeof ReadyToFinishCodeChangeInputSchema>,
  z.infer<typeof ReadyToFinishCodeChangeOutputSchema>
>({
  name: 'deliverable-pipeline-ready-code-review-agent',
  description: 'Validates code review is ready to submit',
  
  prompt: createDeliverablesPipelineValidationPhaseReadyToFinishCodeChangeReviewAgentPrompt(),
  stepPrompts: DeliverablesPipelineValidationPhaseReadyToFinishCodeChangeReviewAgentPromptSteps,
  
  outputSchema: ReadyToFinishCodeChangeOutputSchema,
  
  plan: { chunkThreshold: 800 },
  try: { chunkThreshold: 1500 },
  refine: { maxAttempts: 1 },
  retry: { maxAttempts: 1 }
});

/**
 * Bitcode validation agent that decides whether a design-document AssetPack can enter Finish.
 */
export const DeliverablesPipelineValidationPhaseReadyToFinishDesignDocumentAgent = factoryAgentWithPTRR<
  z.infer<typeof ReadyToFinishCodeChangeInputSchema>,
  z.infer<typeof ReadyToFinishCodeChangeOutputSchema>
>({
  name: 'deliverable-pipeline-ready-design-doc-agent',
  description: 'Validates design document is ready to publish',
  
  prompt: createDeliverablesPipelineValidationPhaseReadyToFinishDesignDocumentAgentPrompt(),
  stepPrompts: DeliverablesPipelineValidationPhaseReadyToFinishDesignDocumentAgentPromptSteps,
  
  outputSchema: ReadyToFinishCodeChangeOutputSchema,
  
  plan: { chunkThreshold: 800 },
  try: { chunkThreshold: 1500 },
  refine: { maxAttempts: 1 },
  retry: { maxAttempts: 1 }
});

/**
 * Bitcode validation agent that decides whether a design-review AssetPack can enter Finish.
 */
export const DeliverablesPipelineValidationPhaseReadyToFinishDesignDocumentReviewAgent = factoryAgentWithPTRR<
  z.infer<typeof ReadyToFinishCodeChangeInputSchema>,
  z.infer<typeof ReadyToFinishCodeChangeOutputSchema>
>({
  name: 'deliverable-pipeline-ready-design-review-agent',
  description: 'Validates design review comment is ready to post',
  
  prompt: createDeliverablesPipelineValidationPhaseReadyToFinishDesignDocumentReviewAgentPrompt(),
  stepPrompts: DeliverablesPipelineValidationPhaseReadyToFinishDesignDocumentReviewAgentPromptSteps,
  
  outputSchema: ReadyToFinishCodeChangeOutputSchema,
  
  plan: { chunkThreshold: 800 },
  try: { chunkThreshold: 1500 },
  refine: { maxAttempts: 1 },
  retry: { maxAttempts: 1 }
});

// ==================== GENERIC READY TO FINISH AGENT (RUNS LAST) ====================

const ReadyToFinishInputSchema = z.object({
  typeSpecificReadiness: z.any(), // From type-specific ready agent
  allValidationResults: z.any(),
  discoveryConfidence: z.number(),
  setupMetrics: z.any(),
  implementationMetrics: z.any()
});

const ReadyToFinishOutputSchema = z.object({
  finalApproval: z.boolean(),
  overallConfidence: z.number(), // 0-1
  qualityScore: z.number(), // 0-100
  criticalChecks: z.object({
    requirementsMet: z.boolean(),
    testsPass: z.boolean(),
    noSecurityIssues: z.boolean(),
    documentationComplete: z.boolean(),
    performanceAcceptable: z.boolean()
  }),
  finalBlockers: z.array(z.string()),
  finalWarnings: z.array(z.string()),
  recommendation: z.enum(['ship', 'review', 'revise', 'abort']),
  summary: z.string()
});

/**
 * Bitcode validation agent that makes the final readiness decision before Finish.
 * 
 * GENERIC final validation that runs for ALL written-asset types.
 * This is the LAST agent in the validation phase sequence.
 * Checks type-specific readiness output and general quality metrics.
 */
export const DeliverablesPipelineValidationPhaseReadyToFinishAgent = factoryAgentWithPTRR<
  z.infer<typeof ReadyToFinishInputSchema>,
  z.infer<typeof ReadyToFinishOutputSchema>
>({
  name: 'deliverable-pipeline-ready-to-ship-agent',
  description: 'Final validation check before the Finish phase',
  
  prompt: createDeliverablesPipelineValidationPhaseReadyToFinishAgentPrompt(),
  stepPrompts: DeliverablesPipelineValidationPhaseReadyToFinishAgentPromptSteps,
  
  outputSchema: ReadyToFinishOutputSchema,
  
  plan: { chunkThreshold: 1500 },
  try: { chunkThreshold: 3000 },
  refine: { maxAttempts: 2 },
  retry: { maxAttempts: 1 }
});

/** @deprecated V26 compatibility alias. Use DeliverablesPipelineValidationPhaseReadyToFinishCodeChangeAgent. */
export const DeliverablesPipelineValidationPhaseReadyToShipCodeChangeAgent =
  DeliverablesPipelineValidationPhaseReadyToFinishCodeChangeAgent;

/** @deprecated V26 compatibility alias. Use DeliverablesPipelineValidationPhaseReadyToFinishCodeChangeReviewAgent. */
export const DeliverablesPipelineValidationPhaseReadyToShipCodeChangeReviewAgent =
  DeliverablesPipelineValidationPhaseReadyToFinishCodeChangeReviewAgent;

/** @deprecated V26 compatibility alias. Use DeliverablesPipelineValidationPhaseReadyToFinishDesignDocumentAgent. */
export const DeliverablesPipelineValidationPhaseReadyToShipDesignDocumentAgent =
  DeliverablesPipelineValidationPhaseReadyToFinishDesignDocumentAgent;

/** @deprecated V26 compatibility alias. Use DeliverablesPipelineValidationPhaseReadyToFinishDesignDocumentReviewAgent. */
export const DeliverablesPipelineValidationPhaseReadyToShipDesignDocumentReviewAgent =
  DeliverablesPipelineValidationPhaseReadyToFinishDesignDocumentReviewAgent;

/** @deprecated V26 compatibility alias. Use DeliverablesPipelineValidationPhaseReadyToFinishAgent. */
export const DeliverablesPipelineValidationPhaseReadyToShipAgent =
  DeliverablesPipelineValidationPhaseReadyToFinishAgent;

// ==================== DYNAMIC AGENT REGISTRATION ====================

/**
 * Registers validation agents based on deliverable type.
 * Called after implementation phase completes.
 * 
 * Sequence:
 * 1. Type-specific validation (ValidateCodeChanges, ValidateReview, etc.)
 * 2. Type-specific readiness (ReadyToFinishCodeChange, etc.)
 * 3. Generic final readiness (ReadyToFinish) - ALWAYS LAST
 */
export function registerValidationAgentsForType(
  writtenAssetType: string,
  agentRegistry: any // AgentAgentsRegistry from PipelineExecution
): void {
  // Always register iteration/discovery validators (issues‑only contracts). These agents
  // normalize results into stores:
  //  - validation/last:issues
  //  - validation/discovery:issues
  agentRegistry.registerAgent(
    'validation:validate-last-iterations-validation-phase',
    async (input: any, execution: any) => {
      const out = await DeliverablesPipelineValidationPhaseValidateLastValidationAgent(input, execution);
      try { execution.store('validation/last', 'issues', out.issues || []); } catch {}
      return { issues: Array.isArray(out?.issues) ? out.issues : [] };
    }
  );
  agentRegistry.registerAgent(
    'validation:validate-discovery-phase',
    async (input: any, execution: any) => {
      const out = await DeliverablesPipelineValidationPhaseValidateDiscoveryAgent(input, execution);
      try { execution.store('validation/discovery', 'issues', out.issues || []); } catch {}
      return { issues: Array.isArray(out?.issues) ? out.issues : [] };
    }
  );

  // First register type-specific validation agents
  // Implementation validation agent is type-specific but ALL variants write to
  // the same cohesive store: validation/implementation:issues. The four written-asset types map to:
  //  - code-change            → validation:validate-implementation-phase-code-change
  //  - code-change-review     → validation:validate-implementation-phase-code-change-review
  //  - design-document        → validation:validate-implementation-phase-design-document
  //  - design-document-review → validation:validate-implementation-phase-design-document-review
  switch (normalizeWrittenAssetType(writtenAssetType)) {
    case 'code-change':
      agentRegistry.registerAgent(
        'validation:validate-implementation-phase-code-change',
        async (input: any, execution: any) => {
          const out = await DeliverablesPipelineValidationPhaseValidateCodeChangesAgent(input, execution);
          const issues: string[] = [];
          try {
            for (const e of out?.syntaxValidation?.errors || []) issues.push(`${e.file}:${e.line} ${e.message}`);
            for (const f of out?.testResults?.failures || []) issues.push(`test ${f.test}: ${f.error}`);
            for (const i of out?.lintResults?.issues || []) issues.push(`${i.file} [${i.rule}] ${i.message} (${i.severity})`);
            for (const b of out?.buildResults?.errors || []) issues.push(`build: ${b}`);
          } catch {}
          try { execution.store('validation/implementation', 'issues', issues); } catch {}
          return { issues };
        }
      );
      agentRegistry.registerAgent(
        'validation:ready-type-specific',
        DeliverablesPipelineValidationPhaseReadyToFinishCodeChangeAgent
      );
      break;
      
    case 'code-change-review':
      agentRegistry.registerAgent(
        'validation:validate-implementation-phase-code-change-review',
        async (input: any, execution: any) => {
          const out = await DeliverablesPipelineValidationPhaseValidateReviewAgent(input, execution);
          const issues: string[] = [];
          try {
            if (out?.coverageAnalysis) {
              const { filesReviewed, totalFiles, missedAreas } = out.coverageAnalysis;
              if (typeof filesReviewed === 'number' && typeof totalFiles === 'number' && filesReviewed < totalFiles) {
                issues.push(`Coverage missing: ${totalFiles - filesReviewed} files not reviewed`);
              }
              for (const m of missedAreas || []) issues.push(`Missed area: ${m}`);
            }
            if (out?.reviewQuality) {
              const q = out.reviewQuality;
              if (q.thoroughness === 'low') issues.push('Review thoroughness low');
              if (q.constructiveness === 'low') issues.push('Review constructiveness low');
              if (q.accuracy === 'low') issues.push('Review accuracy low');
            }
          } catch {}
          try { execution.store('validation/implementation', 'issues', issues); } catch {}
          return { issues };
        }
      );
      agentRegistry.registerAgent(
        'validation:ready-type-specific',
        DeliverablesPipelineValidationPhaseReadyToFinishCodeChangeReviewAgent
      );
      break;
      
    case 'design-document':
      agentRegistry.registerAgent(
        'validation:validate-implementation-phase-design-document',
        async (input: any, execution: any) => {
          const out = await DeliverablesPipelineValidationPhaseValidateDocumentAgent(input, execution);
          const issues: string[] = [];
          try {
            for (const s of out?.requiredSections || []) if (!s.present) issues.push(`Missing section: ${s.section}`);
            for (const e of out?.grammarCheck?.errors ? Array(out.grammarCheck.errors).fill('') : []) issues.push('Grammar error');
            for (const i of out?.technicalAccuracy?.issues || []) issues.push(`Technical issue: ${i}`);
          } catch {}
          try { execution.store('validation/implementation', 'issues', issues); } catch {}
          return { issues };
        }
      );
      agentRegistry.registerAgent(
        'validation:ready-type-specific',
        DeliverablesPipelineValidationPhaseReadyToFinishDesignDocumentAgent
      );
      break;
      
    case 'design-document-review':
      agentRegistry.registerAgent(
        'validation:validate-implementation-phase-design-document-review',
        async (input: any, execution: any) => {
          const out = await DeliverablesPipelineValidationPhaseValidateDocumentAgent(input, execution);
          const issues: string[] = [];
          try {
            for (const s of out?.requiredSections || []) if (!s.present) issues.push(`Missing section: ${s.section}`);
            for (const e of out?.grammarCheck?.errors ? Array(out.grammarCheck.errors).fill('') : []) issues.push('Grammar error');
            for (const i of out?.technicalAccuracy?.issues || []) issues.push(`Technical issue: ${i}`);
          } catch {}
          try { execution.store('validation/implementation', 'issues', issues); } catch {}
          return { issues };
        }
      );
      agentRegistry.registerAgent(
        'validation:ready-type-specific',
        DeliverablesPipelineValidationPhaseReadyToFinishDesignDocumentReviewAgent
      );
      break;
      
    default:
      throw new Error(`Unknown written-asset type for validation: ${writtenAssetType}`);
  }
  
  // ALWAYS register ready-to-instruct (generates selfInstructConfidence at DIV loop end)
  agentRegistry.registerAgent(
    'validation:deliverable-pipeline-ready-to-instruct',
    () => import('./validation/deliverable-pipeline-ready-to-instruct-agent').then(m => m.default)
  );

  // ALWAYS register the generic ReadyToFinish agent LAST under the compatibility key.
  agentRegistry.registerAgent(
    'validation:deliverable-pipeline-ready-to-ship-agent',
    DeliverablesPipelineValidationPhaseReadyToFinishAgent
  );
}

/**
 * Creates the validation phase sequence.
 * 
 * @returns Array defining the execution order
 */
export function createValidationExecutorSequence(
  _writtenAssetType: string
): any[] {
  return [
    { agent: 'validation:validate-*' }, // Type-specific validation
    { agent: 'validation:ready-type-specific' }, // Type-specific readiness
    { agent: 'validation:deliverable-pipeline-ready-to-ship-agent' } // Generic ReadyToFinish check - ALWAYS LAST
  ];
}
