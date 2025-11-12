/**
 * Review Design Document Agent
 * 
 * Reviews an existing design document for the design-document-review deliverable type.
 * This typically adds comments to an issue or document in the VCS system.
 */

import { factoryAgentWithPTRR } from '@engi/agent-generics';
import { z } from 'zod';
import {
  createDeliverablesPipelineImplementationPhaseCommentOnIssueAgentPrompt,
  DeliverablesPipelineImplementationPhaseCommentOnIssueAgentPromptSteps
} from '../prompts/comment-on-issue-prompt';

// Input schema
const ReviewDesignDocumentInputSchema = z.object({
  document: z.object({
    url: z.string().optional(),
    title: z.string(),
    body: z.string(),
    author: z.string(),
    createdAt: z.string(),
    labels: z.array(z.string()).optional(),
    existingComments: z.array(z.object({
      author: z.string(),
      body: z.string(),
      createdAt: z.string()
    })).optional()
  }),
  reviewCriteria: z.array(z.string()).optional(),
  reviewDepth: z.enum(['surface', 'standard', 'deep']).default('standard')
});

// Output schema
const ReviewDesignDocumentOutputSchema = z.object({
  overallAssessment: z.enum(['approve', 'needs-work', 'request-changes']),
  confidence: z.number(), // 0-1
  summary: z.string(),
  
  // Section-level feedback
  sectionReviews: z.array(z.object({
    section: z.string(),
    assessment: z.enum(['good', 'needs-work', 'problematic']),
    comments: z.array(z.string()),
    suggestions: z.array(z.string()).optional()
  })),
  
  // High-level feedback
  generalFeedback: z.object({
    strengths: z.array(z.string()),
    weaknesses: z.array(z.string()),
    suggestions: z.array(z.string()),
    risks: z.array(z.string()).optional(),
    alternatives: z.array(z.string()).optional()
  }),
  
  // Specific checks
  qualityChecks: z.object({
    isComplete: z.boolean(),
    isTechnicallySound: z.boolean(),
    isImplementable: z.boolean(),
    hasTestingStrategy: z.boolean(),
    considersAlternatives: z.boolean(),
    addressesRisks: z.boolean()
  }),
  
  // Comment to post
  reviewComment: z.string(), // Markdown formatted
  
  // Metrics
  metrics: z.object({
    sectionsReviewed: z.number(),
    totalComments: z.number(),
    criticalIssues: z.number(),
    suggestions: z.number()
  })
});

/**
 * ReviewDesignDocument Agent
 * Uses canonical naming for VCS portability
 */
export const ReviewDesignDocumentAgent = factoryAgentWithPTRR<
  z.infer<typeof ReviewDesignDocumentInputSchema>,
  z.infer<typeof ReviewDesignDocumentOutputSchema>
>({
  name: 'deliverable-pipeline-review-design-document-agent',
  description: 'Reviews design documents with comprehensive feedback',
  
  prompt: createDeliverablesPipelineImplementationPhaseCommentOnIssueAgentPrompt(),
  stepPrompts: DeliverablesPipelineImplementationPhaseCommentOnIssueAgentPromptSteps,
  
  outputSchema: ReviewDesignDocumentOutputSchema,
  
  // Tools needed
  tools: [
    'markdown-generator',
    'add-comment'
  ],
  
  // PTRR configuration
  plan: { 
    chunkThreshold: 2000,
    maxIterations: 2
  },
  try: { 
    chunkThreshold: 5000,
    timeout: 30000
  },
  refine: { 
    maxAttempts: 2,
    improvementThreshold: 0.85
  },
  retry: { 
    maxAttempts: 1,
    backoffMultiplier: 2
  }
});

export default ReviewDesignDocumentAgent;
