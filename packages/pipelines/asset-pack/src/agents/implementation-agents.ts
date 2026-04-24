/**
 * Implementation Phase Agents for the AssetPack Pipeline
 * 
 * FOUR deliverable types:
 * 1. Code Change (Pull Request)
 * 2. Code Change Review (Pull Request Review) 
 * 3. Design Document (Create Issue)
 * 4. Design Document Review (Issue Comment)
 * 
 * Pattern: AssetPackImplementationPhase{Action}Agent
 */

import { factoryAgentWithPTRR } from '@bitcode/agent-generics';
import { z } from 'zod';
import { DivideCodeChangePrompts } from './prompts/divide-code-change-prompt';
import { ConquerFilePrompts } from './prompts/conquer-file-prompt';
import { CorrectCodeChangePrompts } from './prompts/correct-code-change-prompt';
import { ReviewCodeChangePrompts } from './prompts/review-code-change-prompt';
import {
  createAssetPackFinishCreateIssueDeliveryAgentPrompt,
  AssetPackFinishCreateIssueDeliveryAgentPromptSteps
} from './prompts/create-issue-prompt';
import {
  createAssetPackImplementationPhaseCommentOnIssueAgentPrompt,
  AssetPackImplementationPhaseCommentOnIssueAgentPromptSteps
} from './prompts/comment-on-issue-prompt';
import { normalizeWrittenAssetType } from '../semantic-resolution';

// Import code editor for file operations
import { codeEditorAgent } from '@bitcode/generic-agent-code-editor';

// ==================== CODE CHANGE (PULL REQUEST) AGENTS ====================

// --- DIVIDE AGENT ---
const DividePullRequestInputSchema = z.object({
  requirements: z.any(), // From discovery phase
  approach: z.any(), // From discovery phase
  codebaseAnalysis: z.any() // From setup phase
});

const DividePullRequestOutputSchema = z.object({
  filesToChange: z.array(z.object({
    filePath: z.string(),
    changeType: z.enum(['create', 'modify', 'delete']),
    purpose: z.string(),
    estimatedComplexity: z.number(),
    dependencies: z.array(z.string()) // Other files this depends on
  })),
  executionOrder: z.array(z.string()), // Ordered list of file paths
  totalFiles: z.number()
});

/**
 * AssetPackImplementationPhaseDividePullRequestAgent
 * 
 * Determines ALL files that need to be conquered (edited/created/deleted).
 * PrepareContext will automatically gather all execution state so far.
 * The prompt must be written perfectly to leverage this.
 */
export const AssetPackImplementationPhaseDividePullRequestAgent = factoryAgentWithPTRR<
  z.infer<typeof DividePullRequestInputSchema>,
  z.infer<typeof DividePullRequestOutputSchema>
>({
  name: 'asset-pack-divide-pr-agent',
  description: 'Determines all files to be conquered for the pull request',
  
  prompt: DivideCodeChangePrompts.system(),
  stepPrompts: {
    plan: () => DivideCodeChangePrompts.plan(),
    try: () => DivideCodeChangePrompts.try(),
    refine: () => DivideCodeChangePrompts.refine(),
    retry: () => DivideCodeChangePrompts.retry()
  },
  
  outputSchema: DividePullRequestOutputSchema,
  
  plan: { chunkThreshold: 2000 },
  try: { chunkThreshold: 3000 },
  refine: { maxAttempts: 2 },
  retry: { maxAttempts: 1 }
});

// --- CONQUER AGENT (PER FILE) ---
const ConquerFileInputSchema = z.object({
  filePath: z.string(),
  changeType: z.enum(['create', 'modify', 'delete']),
  purpose: z.string(),
  fileContext: z.any(), // PrepareContext will provide relevant context
  dependencies: z.array(z.string())
});

const ConquerFileOutputSchema = z.object({
  filePath: z.string(),
  success: z.boolean(),
  patch: z.string().optional(), // The actual diff/patch
  newContent: z.string().optional(), // For created files
  error: z.string().optional()
});

/**
 * AssetPackImplementationPhaseConquerFileAgent
 * 
 * Conquers a SINGLE file. This agent is instantiated once per file
 * and they run in PARALLEL as a sub-sequence.
 * Uses code editor agent/tools for accurate file edits.
 */
export const AssetPackImplementationPhaseConquerFileAgent = factoryAgentWithPTRR<
  z.infer<typeof ConquerFileInputSchema>,
  z.infer<typeof ConquerFileOutputSchema>
>({
  name: 'asset-pack-conquer-file-agent',
  description: 'Conquers (edits/creates/deletes) a single file',
  
  prompt: ConquerFilePrompts.system(),
  stepPrompts: {
    plan: () => ConquerFilePrompts.plan(),
    try: () => ConquerFilePrompts.try(),
    refine: () => ConquerFilePrompts.refine(),
    retry: () => ConquerFilePrompts.retry()
  },
  
  outputSchema: ConquerFileOutputSchema,
  
  plan: { chunkThreshold: 1000 },
  try: { chunkThreshold: 5000 }, // File content can be large
  refine: { maxAttempts: 2 },
  retry: { maxAttempts: 1 }
});

// --- CORRECT AGENT ---
const CorrectPullRequestInputSchema = z.object({
  allFileResults: z.array(z.any()), // Results from all conquer agents
  validationCriteria: z.array(z.string()).optional()
});

const CorrectPullRequestOutputSchema = z.object({
  corrections: z.array(z.object({
    filePath: z.string(),
    issue: z.string(),
    correction: z.string(),
    applied: z.boolean()
  })),
  validationResults: z.object({
    syntaxValid: z.boolean(),
    testsPass: z.boolean().optional(),
    lintPass: z.boolean().optional(),
    buildPass: z.boolean().optional()
  }),
  readyForPR: z.boolean(),
  summary: z.string()
});

/**
 * AssetPackImplementationPhaseCorrectPullRequestAgent
 * 
 * Validates and corrects all the conquered files.
 * PrepareContext will gather all execution state from the conquer phase.
 */
export const AssetPackImplementationPhaseCorrectPullRequestAgent = factoryAgentWithPTRR<
  z.infer<typeof CorrectPullRequestInputSchema>,
  z.infer<typeof CorrectPullRequestOutputSchema>
>({
  name: 'asset-pack-correct-pr-agent',
  description: 'Validates and corrects all file changes',
  
  prompt: CorrectCodeChangePrompts.system(),
  stepPrompts: {
    plan: () => CorrectCodeChangePrompts.plan(),
    try: () => CorrectCodeChangePrompts.try(),
    refine: () => CorrectCodeChangePrompts.refine(),
    retry: () => CorrectCodeChangePrompts.retry()
  },
  
  outputSchema: CorrectPullRequestOutputSchema,
  
  plan: { chunkThreshold: 2000 },
  try: { chunkThreshold: 5000 },
  refine: { maxAttempts: 2 },
  retry: { maxAttempts: 1 }
});

// ==================== CODE CHANGE REVIEW (PULL REQUEST REVIEW) ====================

const ReviewPullRequestInputSchema = z.object({
  pullRequest: z.object({
    url: z.string(),
    title: z.string(),
    description: z.string(),
    files: z.array(z.object({
      path: z.string(),
      patch: z.string(),
      additions: z.number(),
      deletions: z.number()
    }))
  }),
  reviewCriteria: z.array(z.string()).optional()
});

const ReviewPullRequestOutputSchema = z.object({
  overallAssessment: z.enum(['approve', 'request-changes', 'comment']),
  summary: z.string(),
  fileComments: z.array(z.object({
    filePath: z.string(),
    lineComments: z.array(z.object({
      line: z.number(),
      comment: z.string(),
      severity: z.enum(['info', 'warning', 'error'])
    }))
  })),
  generalComments: z.array(z.string()),
  suggestions: z.array(z.string())
});

/**
 * AssetPackImplementationPhaseReviewPullRequestAgent
 * 
 * Reviews an existing pull request.
 */
export const AssetPackImplementationPhaseReviewPullRequestAgent = factoryAgentWithPTRR<
  z.infer<typeof ReviewPullRequestInputSchema>,
  z.infer<typeof ReviewPullRequestOutputSchema>
>({
  name: 'asset-pack-review-pr-agent',
  description: 'Reviews a pull request with detailed feedback',
  
  prompt: ReviewCodeChangePrompts.system(),
  stepPrompts: {
    plan: () => ReviewCodeChangePrompts.plan(),
    try: () => ReviewCodeChangePrompts.try(),
    refine: () => ReviewCodeChangePrompts.refine(),
    retry: () => ReviewCodeChangePrompts.retry()
  },
  
  outputSchema: ReviewPullRequestOutputSchema,
  
  plan: { chunkThreshold: 2000 },
  try: { chunkThreshold: 10000 }, // PRs can be large
  refine: { maxAttempts: 2 },
  retry: { maxAttempts: 1 }
});

// ==================== DESIGN DOCUMENT (CREATE ISSUE) ====================

const CreateIssueInputSchema = z.object({
  requirements: z.any(),
  research: z.any(),
  repository: z.object({
    owner: z.string(),
    name: z.string()
  })
});

const CreateIssueOutputSchema = z.object({
  title: z.string(),
  body: z.string(), // Markdown formatted
  labels: z.array(z.string()),
  assignees: z.array(z.string()).optional(),
  milestone: z.string().optional()
});

/**
 * AssetPackImplementationPhaseCreateIssueAgent
 * 
 * Creates a design document as a GitHub issue.
 */
export const AssetPackImplementationPhaseCreateIssueAgent = factoryAgentWithPTRR<
  z.infer<typeof CreateIssueInputSchema>,
  z.infer<typeof CreateIssueOutputSchema>
>({
  name: 'asset-pack-create-issue-agent',
  description: 'Creates a design document as an issue',
  
  prompt: createAssetPackFinishCreateIssueDeliveryAgentPrompt(),
  stepPrompts: AssetPackFinishCreateIssueDeliveryAgentPromptSteps,
  
  outputSchema: CreateIssueOutputSchema,
  
  plan: { chunkThreshold: 1000 },
  try: { chunkThreshold: 3000 },
  refine: { maxAttempts: 2 },
  retry: { maxAttempts: 1 }
});

// ==================== DESIGN DOCUMENT REVIEW (ISSUE COMMENT) ====================

const CommentOnIssueInputSchema = z.object({
  issue: z.object({
    url: z.string(),
    number: z.number(),
    title: z.string(),
    body: z.string(),
    existingComments: z.array(z.any()).optional()
  }),
  reviewPurpose: z.string()
});

const CommentOnIssueOutputSchema = z.object({
  comment: z.string(), // Markdown formatted
  suggestions: z.array(z.string()),
  references: z.array(z.string()).optional()
});

/**
 * AssetPackImplementationPhaseCommentOnIssueAgent
 * 
 * Reviews a design document by commenting on an issue.
 */
export const AssetPackImplementationPhaseCommentOnIssueAgent = factoryAgentWithPTRR<
  z.infer<typeof CommentOnIssueInputSchema>,
  z.infer<typeof CommentOnIssueOutputSchema>
>({
  name: 'asset-pack-comment-issue-agent',
  description: 'Reviews a design document via issue comment',
  
  prompt: createAssetPackImplementationPhaseCommentOnIssueAgentPrompt(),
  stepPrompts: AssetPackImplementationPhaseCommentOnIssueAgentPromptSteps,
  
  outputSchema: CommentOnIssueOutputSchema,
  
  plan: { chunkThreshold: 1000 },
  try: { chunkThreshold: 2000 },
  refine: { maxAttempts: 1 },
  retry: { maxAttempts: 1 }
});

// ==================== DYNAMIC AGENT REGISTRATION ====================

/**
 * Registers implementation agents based on written-asset type.
 * Called after setup phase determines the compatibility corridor classification.
 */
export function registerImplementationAgentsForType(
  writtenAssetType: string,
  agentRegistry: any // AgentAgentsRegistry from PipelineExecution
): void {
  switch (normalizeWrittenAssetType(writtenAssetType)) {
    case 'code-change':
      // Register Divide|Conquer|Correct agents
      agentRegistry.registerAgent(
        'implementation:divide',
        AssetPackImplementationPhaseDividePullRequestAgent
      );
      // Conquer agents are registered dynamically per file
      agentRegistry.registerAgent(
        'implementation:conquer-file',
        AssetPackImplementationPhaseConquerFileAgent
      );
      agentRegistry.registerAgent(
        'implementation:correct',
        AssetPackImplementationPhaseCorrectPullRequestAgent
      );
      break;
      
    case 'code-change-review':
      agentRegistry.registerAgent(
        'implementation:review',
        AssetPackImplementationPhaseReviewPullRequestAgent
      );
      break;
      
    case 'design-document':
      agentRegistry.registerAgent(
        'implementation:create',
        AssetPackImplementationPhaseCreateIssueAgent
      );
      break;
      
    case 'design-document-review':
      agentRegistry.registerAgent(
        'implementation:comment',
        AssetPackImplementationPhaseCommentOnIssueAgent
      );
      break;
      
    default:
      throw new Error(`Unknown written-asset type: ${writtenAssetType}`);
  }
}

/**
 * Creates the executor sequence for the implementation phase.
 * This demonstrates how Divide|Conquer|Correct works with parallel file processing.
 * 
 * @param writtenAssetType The written-asset kind being synthesized
 * @param divideResults Results from divide agent (only for code-change)
 * @returns Array defining the execution order
 */
export function createImplementationExecutorSequence(
  writtenAssetType: string,
  divideResults?: any // Results from divide phase
): any[] {
  switch (normalizeWrittenAssetType(writtenAssetType)) {
    case 'code-change':
      if (!divideResults) {
        // First run - just execute divide
        return [{ agent: 'implementation:divide' }];
      } else {
        // After divide completes, run conquer in parallel then correct
        const sequence = [];
        
        // Conquer - PARALLEL sub-sequence, one per file
        const conquerSubSequence = divideResults.filesToChange.map((file: any) => ({
          agent: 'implementation:conquer-file',
          input: {
            filePath: file.filePath,
            changeType: file.changeType,
            purpose: file.purpose,
            dependencies: file.dependencies
          }
        }));
        
        sequence.push({
          parallel: conquerSubSequence
        });
        
        // Correct - runs after all conquer agents complete
        sequence.push({ agent: 'implementation:correct' });
        
        return sequence;
      }
      
    case 'code-change-review':
      return [{ agent: 'implementation:review' }];
      
    case 'design-document':
      return [{ agent: 'implementation:create' }];
      
    case 'design-document-review':
      return [{ agent: 'implementation:comment' }];
      
    default:
      throw new Error(`Unknown written-asset type for implementation: ${writtenAssetType}`);
  }
}
