/**
 * Shipping Phase Agents for Deliverable Pipeline
 * 
 * Pattern: DeliverablesPipelineShippingPhase{Action}Agent
 * 
 * ALL agents use PTRR (Plan-Try-Refine-Retry) - no exceptions
 */

import { factoryAgentWithPTRR } from '@bitcode/agent-generics';
import { z } from 'zod';
import {
  createDeliverablesPipelineShippingPhaseCreatePullRequestAgentPrompt,
  DeliverablesPipelineShippingPhaseCreatePullRequestAgentPromptSteps
} from './prompts/create-pull-request-prompt';
import {
  createDeliverablesPipelineShippingPhaseSubmitReviewAgentPrompt,
  DeliverablesPipelineShippingPhaseSubmitReviewAgentPromptSteps
} from './prompts/submit-review-prompt';
import {
  createDeliverablesPipelineShippingPhaseCreateIssueAgentPrompt,
  DeliverablesPipelineShippingPhaseCreateIssueAgentPromptSteps
} from './prompts/create-issue-prompt';
import {
  createDeliverablesPipelineShippingPhaseAddIssueCommentAgentPrompt,
  DeliverablesPipelineShippingPhaseAddIssueCommentAgentPromptSteps
} from './prompts/add-issue-comment-prompt';
import {
  createDeliverablesPipelineShippingPhaseFinalizeShipmentAgentPrompt,
  DeliverablesPipelineShippingPhaseFinalizeShipmentAgentPromptSteps
} from './prompts/finalize-shipment-prompt';
import { normalizeWrittenAssetType } from '../semantic-resolution';

// ==================== CREATE PULL REQUEST AGENT ====================

const CreatePullRequestInputSchema = z.object({
  implementationResults: z.any(), // From implementation phase
  validationResults: z.any(), // From validation phase
  repository: z.object({
    owner: z.string(),
    name: z.string(),
    baseBranch: z.string(),
    headBranch: z.string()
  }),
  changes: z.object({
    files: z.array(z.object({
      path: z.string(),
      content: z.string().optional(),
      patch: z.string().optional(),
      status: z.enum(['added', 'modified', 'deleted'])
    })),
    summary: z.string()
  })
});

const CreatePullRequestOutputSchema = z.object({
  pullRequest: z.object({
    url: z.string(),
    number: z.number(),
    title: z.string(),
    body: z.string(),
    baseBranch: z.string(),
    headBranch: z.string(),
    state: z.string()
  }),
  commit: z.object({
    sha: z.string(),
    message: z.string(),
    author: z.string(),
    timestamp: z.string()
  }),
  statistics: z.object({
    filesChanged: z.number(),
    additions: z.number(),
    deletions: z.number()
  }),
  nextSteps: z.array(z.string())
});

/**
 * DeliverablesPipelineShippingPhaseCreatePullRequestAgent
 * 
 * Creates a pull request with all code changes.
 * PrepareContext will provide all previous phase results.
 */
export const DeliverablesPipelineShippingPhaseCreatePullRequestAgent = factoryAgentWithPTRR<
  z.infer<typeof CreatePullRequestInputSchema>,
  z.infer<typeof CreatePullRequestOutputSchema>
>({
  name: 'deliverable-pipeline-create-pull-request-agent',
  description: 'Creates pull request with code changes',
  
  prompt: createDeliverablesPipelineShippingPhaseCreatePullRequestAgentPrompt(),
  stepPrompts: DeliverablesPipelineShippingPhaseCreatePullRequestAgentPromptSteps,
  
  outputSchema: CreatePullRequestOutputSchema,
  
  plan: { chunkThreshold: 1500 },
  try: { chunkThreshold: 3000 },
  refine: { maxAttempts: 1 },
  retry: { maxAttempts: 1 }
});

// ==================== SUBMIT REVIEW AGENT ====================

const SubmitReviewInputSchema = z.object({
  reviewResults: z.any(), // From implementation phase
  pullRequest: z.object({
    url: z.string(),
    number: z.number()
  }),
  repository: z.object({
    owner: z.string(),
    name: z.string()
  })
});

const SubmitReviewOutputSchema = z.object({
  review: z.object({
    id: z.number(),
    state: z.enum(['APPROVED', 'CHANGES_REQUESTED', 'COMMENTED']),
    body: z.string(),
    submittedAt: z.string()
  }),
  comments: z.array(z.object({
    id: z.number(),
    path: z.string(),
    line: z.number().optional(),
    body: z.string()
  })),
  summary: z.object({
    totalComments: z.number(),
    filesReviewed: z.number(),
    overallFeedback: z.string()
  })
});

/**
 * DeliverablesPipelineShippingPhaseSubmitReviewAgent
 * 
 * Submits pull request review.
 */
export const DeliverablesPipelineShippingPhaseSubmitReviewAgent = factoryAgentWithPTRR<
  z.infer<typeof SubmitReviewInputSchema>,
  z.infer<typeof SubmitReviewOutputSchema>
>({
  name: 'deliverable-pipeline-submit-review-agent',
  description: 'Submits pull request review with feedback',
  
  prompt: createDeliverablesPipelineShippingPhaseSubmitReviewAgentPrompt(),
  stepPrompts: DeliverablesPipelineShippingPhaseSubmitReviewAgentPromptSteps,
  
  outputSchema: SubmitReviewOutputSchema,
  
  plan: { chunkThreshold: 1000 },
  try: { chunkThreshold: 2000 },
  refine: { maxAttempts: 1 },
  retry: { maxAttempts: 1 }
});

// ==================== CREATE ISSUE AGENT ====================

const CreateIssueInputSchema = z.object({
  issueContent: z.any(), // From implementation phase
  repository: z.object({
    owner: z.string(),
    name: z.string()
  }),
  labels: z.array(z.string()).optional(),
  assignees: z.array(z.string()).optional(),
  milestone: z.string().optional()
});

const CreateIssueOutputSchema = z.object({
  issue: z.object({
    url: z.string(),
    number: z.number(),
    title: z.string(),
    body: z.string(),
    state: z.string(),
    labels: z.array(z.string()),
    createdAt: z.string()
  }),
  metadata: z.object({
    author: z.string(),
    repository: z.string()
  })
});

/**
 * DeliverablesPipelineShippingPhaseCreateIssueAgent
 * 
 * Creates GitHub issue for design documents.
 */
export const DeliverablesPipelineShippingPhaseCreateIssueAgent = factoryAgentWithPTRR<
  z.infer<typeof CreateIssueInputSchema>,
  z.infer<typeof CreateIssueOutputSchema>
>({
  name: 'deliverable-pipeline-create-issue-agent',
  description: 'Creates GitHub issue with design document',
  
  prompt: createDeliverablesPipelineShippingPhaseCreateIssueAgentPrompt(),
  stepPrompts: DeliverablesPipelineShippingPhaseCreateIssueAgentPromptSteps,
  
  outputSchema: CreateIssueOutputSchema,
  
  plan: { chunkThreshold: 1000 },
  try: { chunkThreshold: 2000 },
  refine: { maxAttempts: 1 },
  retry: { maxAttempts: 1 }
});

// ==================== ADD ISSUE COMMENT AGENT ====================

const AddIssueCommentInputSchema = z.object({
  commentContent: z.any(), // From implementation phase
  issue: z.object({
    url: z.string(),
    number: z.number()
  }),
  repository: z.object({
    owner: z.string(),
    name: z.string()
  })
});

const AddIssueCommentOutputSchema = z.object({
  comment: z.object({
    id: z.number(),
    url: z.string(),
    body: z.string(),
    createdAt: z.string()
  }),
  context: z.object({
    issueNumber: z.number(),
    issueTitle: z.string(),
    totalComments: z.number()
  })
});

/**
 * DeliverablesPipelineShippingPhaseAddIssueCommentAgent
 * 
 * Adds comment to existing issue.
 */
export const DeliverablesPipelineShippingPhaseAddIssueCommentAgent = factoryAgentWithPTRR<
  z.infer<typeof AddIssueCommentInputSchema>,
  z.infer<typeof AddIssueCommentOutputSchema>
>({
  name: 'deliverable-pipeline-add-comment-agent',
  description: 'Adds comment to GitHub issue',
  
  prompt: createDeliverablesPipelineShippingPhaseAddIssueCommentAgentPrompt(),
  stepPrompts: DeliverablesPipelineShippingPhaseAddIssueCommentAgentPromptSteps,
  
  outputSchema: AddIssueCommentOutputSchema,
  
  plan: { chunkThreshold: 800 },
  try: { chunkThreshold: 1500 },
  refine: { maxAttempts: 1 },
  retry: { maxAttempts: 1 }
});

// ==================== DYNAMIC AGENT REGISTRATION ====================

// ==================== GENERIC FINALIZE AGENT (RUNS LAST) ====================

const FinalizeShipmentInputSchema = z.object({
  shippingResults: z.any(), // From type-specific shipping agent
  validationResults: z.any(),
  discoveryMetrics: z.any(),
  need: z.string().optional(),
  deliverableType: z.string().optional(),
  writtenAssetType: z.string().optional()
});

const FinalizeShipmentOutputSchema = z.object({
  success: z.boolean(),
  deliverableUrl: z.string(), // PR URL, Issue URL, etc.
  summary: z.object({
    type: z.string(),
    title: z.string(),
    description: z.string(),
    impact: z.string(),
    nextSteps: z.array(z.string())
  }),
  metrics: z.object({
    phaseDurations: z.record(z.string(), z.number()), // ms per phase
    totalDuration: z.number(),
    tokensUsed: z.number(),
    creditsConsumed: z.number(),
    qualityScore: z.number() // 0-100
  }),
  artifacts: z.object({
    logs: z.string().optional(),
    reports: z.array(z.string()).optional(),
    notifications: z.array(z.string())
  }),
  feedback: z.string() // AI-generated feedback on the deliverable
});

/**
 * DeliverablesPipelineShippingPhaseFinalizeShipmentAgent
 * 
 * GENERIC final agent that runs for ALL deliverable types.
 * This is the LAST agent in the shipping phase (and entire pipeline).
 * Wraps up the deliverable and provides final summary.
 */
export const DeliverablesPipelineShippingPhaseFinalizeShipmentAgent = factoryAgentWithPTRR<
  z.infer<typeof FinalizeShipmentInputSchema>,
  z.infer<typeof FinalizeShipmentOutputSchema>
>({
  name: 'deliverable-pipeline-finalize-agent',
  description: 'Finalizes shipment for any deliverable type',
  
  prompt: createDeliverablesPipelineShippingPhaseFinalizeShipmentAgentPrompt(),
  stepPrompts: DeliverablesPipelineShippingPhaseFinalizeShipmentAgentPromptSteps,
  
  outputSchema: FinalizeShipmentOutputSchema,
  
  plan: { chunkThreshold: 1000 },
  try: { chunkThreshold: 2000 },
  refine: { maxAttempts: 1 },
  retry: { maxAttempts: 1 }
});

// ==================== DYNAMIC AGENT REGISTRATION ====================

/**
 * Registers shipping agents based on written-asset type.
 * Called after validation phase completes.
 * 
 * Sequence:
 * 1. Type-specific shipping (CreatePR, SubmitReview, CreateIssue, AddComment)
 * 2. Generic finalize (FinalizeShipment) - ALWAYS LAST
 */
export function registerShippingAgentsForType(
  writtenAssetType: string,
  agentRegistry: any // AgentAgentsRegistry from PipelineExecution
): void {
  // Register type-specific shipping agent
  switch (normalizeWrittenAssetType(writtenAssetType)) {
    case 'code-change':
      agentRegistry.registerAgent(
        'shipping:create-pr',
        DeliverablesPipelineShippingPhaseCreatePullRequestAgent
      );
      break;
      
    case 'code-change-review':
      agentRegistry.registerAgent(
        'shipping:deliverable-pipeline-submit-review-agent',
        DeliverablesPipelineShippingPhaseSubmitReviewAgent
      );
      break;
      
    case 'design-document':
      agentRegistry.registerAgent(
        'shipping:deliverable-pipeline-create-issue-agent',
        DeliverablesPipelineShippingPhaseCreateIssueAgent
      );
      break;
      
    case 'design-document-review':
      agentRegistry.registerAgent(
        'shipping:deliverable-pipeline-add-comment-agent',
        DeliverablesPipelineShippingPhaseAddIssueCommentAgent
      );
      break;
      
    default:
      throw new Error(`Unknown written-asset type for shipping: ${writtenAssetType}`);
  }
  
  // ALWAYS register the generic finalize agent LAST
  agentRegistry.registerAgent(
    'shipping:deliverable-pipeline-finalize-agent',
    DeliverablesPipelineShippingPhaseFinalizeShipmentAgent
  );
}

/**
 * Creates the shipping phase sequence.
 * 
 * @param writtenAssetType The written-asset kind being shipped
 * @returns Array defining the execution order
 */
export function createShippingExecutorSequence(
  writtenAssetType: string
): any[] {
  const typeSpecificAgent = {
    'code-change': 'shipping:create-pr',
    'code-change-review': 'shipping:deliverable-pipeline-submit-review-agent',
    'design-document': 'shipping:deliverable-pipeline-create-issue-agent',
    'design-document-review': 'shipping:deliverable-pipeline-add-comment-agent'
  }[normalizeWrittenAssetType(writtenAssetType)];
  
  if (!typeSpecificAgent) {
    throw new Error(`Unknown written-asset type for shipping: ${writtenAssetType}`);
  }
  
  return [
    { agent: typeSpecificAgent }, // Type-specific shipping
    { agent: 'shipping:deliverable-pipeline-finalize-agent' } // Generic finalize - ALWAYS LAST
  ];
}
