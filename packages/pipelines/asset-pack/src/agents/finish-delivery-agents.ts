/**
 * Finish/Delivering agents for AssetPack delivery mechanisms.
 *
 * Pattern: AssetPack-named agent carriers own Finish-phase Delivering actions.
 * All agents use PTRR (Plan-Try-Refine-Retry) so delivery evidence remains
 * auditable as part of the source-to-shares pipeline.
 */

import { factoryAgentWithPTRR } from '@bitcode/agent-generics';
import { z } from 'zod';
import {
  createAssetPackFinishCreatePullRequestDeliveryAgentPrompt,
  AssetPackFinishCreatePullRequestDeliveryAgentPromptSteps
} from './prompts/create-pull-request-prompt';
import {
  createAssetPackFinishSubmitReviewDeliveryAgentPrompt,
  AssetPackFinishSubmitReviewDeliveryAgentPromptSteps
} from './prompts/submit-review-prompt';
import {
  createAssetPackFinishCreateIssueDeliveryAgentPrompt,
  AssetPackFinishCreateIssueDeliveryAgentPromptSteps
} from './prompts/create-issue-prompt';
import {
  createAssetPackFinishAddIssueCommentDeliveryAgentPrompt,
  AssetPackFinishAddIssueCommentDeliveryAgentPromptSteps
} from './prompts/add-issue-comment-prompt';
import {
  createAssetPackFinishFinalizeDeliveryEvidenceAgentPrompt,
  AssetPackFinishFinalizeDeliveryEvidenceAgentPromptSteps
} from './prompts/finalize-delivery-evidence-prompt';
import { normalizeDeliveryMechanismTemplate } from '../semantic-resolution';

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
 * AssetPackFinishCreatePullRequestDeliveryAgent
 * 
 * Creates a pull request delivery mechanism for AssetPack code changes.
 * PrepareContext will provide all previous phase results.
 */
export const AssetPackFinishCreatePullRequestDeliveryAgent = factoryAgentWithPTRR<
  z.infer<typeof CreatePullRequestInputSchema>,
  z.infer<typeof CreatePullRequestOutputSchema>
>({
  name: 'finish:asset-pack-create-pull-request-delivery-agent',
  description: 'Creates a pull request delivery mechanism with AssetPack code changes',
  
  prompt: createAssetPackFinishCreatePullRequestDeliveryAgentPrompt(),
  stepPrompts: AssetPackFinishCreatePullRequestDeliveryAgentPromptSteps,
  
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
 * AssetPackFinishSubmitReviewDeliveryAgent
 * 
 * Submits a pull request review delivery mechanism.
 */
export const AssetPackFinishSubmitReviewDeliveryAgent = factoryAgentWithPTRR<
  z.infer<typeof SubmitReviewInputSchema>,
  z.infer<typeof SubmitReviewOutputSchema>
>({
  name: 'finish:asset-pack-submit-review-delivery-agent',
  description: 'Submits a pull request review delivery mechanism with AssetPack feedback',
  
  prompt: createAssetPackFinishSubmitReviewDeliveryAgentPrompt(),
  stepPrompts: AssetPackFinishSubmitReviewDeliveryAgentPromptSteps,
  
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
 * AssetPackFinishCreateIssueDeliveryAgent
 * 
 * Creates an issue delivery mechanism for validated AssetPack evidence.
 */
export const AssetPackFinishCreateIssueDeliveryAgent = factoryAgentWithPTRR<
  z.infer<typeof CreateIssueInputSchema>,
  z.infer<typeof CreateIssueOutputSchema>
>({
  name: 'finish:asset-pack-create-issue-delivery-agent',
  description: 'Creates an issue delivery mechanism with validated AssetPack evidence',
  
  prompt: createAssetPackFinishCreateIssueDeliveryAgentPrompt(),
  stepPrompts: AssetPackFinishCreateIssueDeliveryAgentPromptSteps,
  
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
 * AssetPackFinishAddIssueCommentDeliveryAgent
 * 
 * Adds an issue-comment delivery mechanism to an existing issue.
 */
export const AssetPackFinishAddIssueCommentDeliveryAgent = factoryAgentWithPTRR<
  z.infer<typeof AddIssueCommentInputSchema>,
  z.infer<typeof AddIssueCommentOutputSchema>
>({
  name: 'finish:asset-pack-add-issue-comment-delivery-agent',
  description: 'Adds an issue-comment delivery mechanism with AssetPack review evidence',
  
  prompt: createAssetPackFinishAddIssueCommentDeliveryAgentPrompt(),
  stepPrompts: AssetPackFinishAddIssueCommentDeliveryAgentPromptSteps,
  
  outputSchema: AddIssueCommentOutputSchema,
  
  plan: { chunkThreshold: 800 },
  try: { chunkThreshold: 1500 },
  refine: { maxAttempts: 1 },
  retry: { maxAttempts: 1 }
});

// ==================== DYNAMIC AGENT REGISTRATION ====================

// ==================== GENERIC FINALIZE AGENT (RUNS LAST) ====================

const FinalizeAssetPackDeliveryEvidenceInputSchema = z.object({
  deliveryResults: z.any(), // From the selected Finish Delivering mechanism agent
  validationResults: z.any(),
  discoveryMetrics: z.any(),
  need: z.string().optional(),
  deliverableType: z.string().optional(),
  writtenAssetType: z.string().optional()
});

const FinalizeAssetPackDeliveryEvidenceOutputSchema = z.object({
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
 * AssetPackFinishFinalizeDeliveryEvidenceAgent
 * 
 * Generic final agent that runs after any delivery-mechanism template.
 * This is the last delivery-evidence agent in the Finish phase.
 */
export const AssetPackFinishFinalizeDeliveryEvidenceAgent = factoryAgentWithPTRR<
  z.infer<typeof FinalizeAssetPackDeliveryEvidenceInputSchema>,
  z.infer<typeof FinalizeAssetPackDeliveryEvidenceOutputSchema>
>({
  name: 'finish:asset-pack-finalize-delivery-evidence-agent',
  description: 'Finalizes Finish delivery evidence for any delivery-mechanism template',
  
  prompt: createAssetPackFinishFinalizeDeliveryEvidenceAgentPrompt(),
  stepPrompts: AssetPackFinishFinalizeDeliveryEvidenceAgentPromptSteps,
  
  outputSchema: FinalizeAssetPackDeliveryEvidenceOutputSchema,
  
  plan: { chunkThreshold: 1000 },
  try: { chunkThreshold: 2000 },
  refine: { maxAttempts: 1 },
  retry: { maxAttempts: 1 }
});

// ==================== DYNAMIC AGENT REGISTRATION ====================

/**
 * Registers Finish/Delivering agents based on delivery-mechanism template.
 * Called after validation phase completes.
 * 
 * Sequence:
 * 1. Template-specific Delivering (CreatePR, SubmitReview, CreateIssue, AddComment)
 * 2. Generic finalize (FinalizeAssetPackDeliveryEvidence) - ALWAYS LAST
 */
export function registerFinishDeliveryAgentsForType(
  deliveryMechanismTemplate: string,
  agentRegistry: any // AgentAgentsRegistry from PipelineExecution
): void {
  switch (normalizeDeliveryMechanismTemplate(deliveryMechanismTemplate)) {
    case 'pull-request':
      agentRegistry.registerAgent(
        'finish:asset-pack-create-pull-request-delivery-agent',
        AssetPackFinishCreatePullRequestDeliveryAgent
      );
      break;
      
    case 'review-comment':
      agentRegistry.registerAgent(
        'finish:asset-pack-submit-review-delivery-agent',
        AssetPackFinishSubmitReviewDeliveryAgent
      );
      break;
      
    case 'issue':
      agentRegistry.registerAgent(
        'finish:asset-pack-create-issue-delivery-agent',
        AssetPackFinishCreateIssueDeliveryAgent
      );
      break;
      
    case 'issue-comment':
      agentRegistry.registerAgent(
        'finish:asset-pack-add-issue-comment-delivery-agent',
        AssetPackFinishAddIssueCommentDeliveryAgent
      );
      break;
      
    default:
      throw new Error(`Unknown delivery-mechanism template for Finish/Delivering: ${deliveryMechanismTemplate}`);
  }
  
  // ALWAYS register the generic finalize agent LAST.
  agentRegistry.registerAgent(
    'finish:asset-pack-finalize-delivery-evidence-agent',
    AssetPackFinishFinalizeDeliveryEvidenceAgent
  );
}

/**
 * Creates the Finish/Delivering sequence.
 * 
 * @param deliveryMechanismTemplate The delivery mechanism template requested for Finish
 * @returns Array defining the execution order
 */
export function createFinishDeliveryExecutorSequence(
  deliveryMechanismTemplate: string
): any[] {
  const typeSpecificAgent = {
    'pull-request': 'finish:asset-pack-create-pull-request-delivery-agent',
    'review-comment': 'finish:asset-pack-submit-review-delivery-agent',
    'issue': 'finish:asset-pack-create-issue-delivery-agent',
    'issue-comment': 'finish:asset-pack-add-issue-comment-delivery-agent'
  }[normalizeDeliveryMechanismTemplate(deliveryMechanismTemplate)];
  
  if (!typeSpecificAgent) {
    throw new Error(`Unknown delivery-mechanism template for Finish/Delivering: ${deliveryMechanismTemplate}`);
  }
  
  return [
    { agent: typeSpecificAgent }, // Delivery-mechanism Delivering
    { agent: 'finish:asset-pack-finalize-delivery-evidence-agent' } // Generic finalize - ALWAYS LAST
  ];
}

export const registerFinishAgentsForType = registerFinishDeliveryAgentsForType;
export const createFinishExecutorSequence = createFinishDeliveryExecutorSequence;
