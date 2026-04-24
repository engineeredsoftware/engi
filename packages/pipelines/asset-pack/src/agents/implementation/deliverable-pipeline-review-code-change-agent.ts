/**
 * Review Code Change Agent
 * 
 * Reviews an existing code change (pull request).
 * This is for the code-change-review deliverable type.
 */

import { factoryAgentWithPTRR } from '@bitcode/agent-generics';
import { z } from 'zod';
import { ReviewCodeChangePrompts } from '../prompts/review-code-change-prompt';

// Input schema
const ReviewCodeChangeInputSchema = z.object({
  codeChange: z.object({
    url: z.string().optional(),
    title: z.string(),
    description: z.string(),
    branch: z.string(),
    targetBranch: z.string(),
    files: z.array(z.object({
      path: z.string(),
      patch: z.string().optional(),
      oldContent: z.string().optional(),
      newContent: z.string().optional(),
      additions: z.number(),
      deletions: z.number(),
      changeType: z.enum(['added', 'modified', 'deleted'])
    }))
  }),
  reviewCriteria: z.array(z.string()).optional(),
  reviewDepth: z.enum(['surface', 'standard', 'deep']).default('standard')
});

// Output schema
const ReviewCodeChangeOutputSchema = z.object({
  overallAssessment: z.enum(['approve', 'request-changes', 'comment']),
  confidence: z.number(), // 0-1
  summary: z.string(),
  
  // File-level feedback
  fileReviews: z.array(z.object({
    filePath: z.string(),
    assessment: z.enum(['good', 'needs-work', 'problematic']),
    comments: z.array(z.object({
      line: z.number().optional(),
      lineRange: z.object({ start: z.number(), end: z.number() }).optional(),
      comment: z.string(),
      severity: z.enum(['info', 'suggestion', 'warning', 'error']),
      category: z.enum(['logic', 'performance', 'security', 'style', 'maintainability', 'testing'])
    }))
  })),
  
  // High-level feedback
  generalFeedback: z.object({
    strengths: z.array(z.string()),
    weaknesses: z.array(z.string()),
    suggestions: z.array(z.string()),
    securityConcerns: z.array(z.string()).optional(),
    performanceIssues: z.array(z.string()).optional()
  }),
  
  // Specific checks
  qualityChecks: z.object({
    hasTests: z.boolean(),
    hasDocumentation: z.boolean(),
    followsConventions: z.boolean(),
    handlesErrors: z.boolean(),
    isBackwardCompatible: z.boolean()
  }),
  
  // Metrics
  metrics: z.object({
    filesReviewed: z.number(),
    totalComments: z.number(),
    criticalIssues: z.number(),
    suggestions: z.number()
  })
});

/**
 * ReviewCodeChange Agent
 * Uses canonical naming for VCS portability
 */
export const ReviewCodeChangeAgent = factoryAgentWithPTRR<
  z.infer<typeof ReviewCodeChangeInputSchema>,
  z.infer<typeof ReviewCodeChangeOutputSchema>
>({
  name: 'deliverable-pipeline-review-code-change-agent',
  description: 'Reviews code changes with comprehensive feedback',
  
  outputSchema: ReviewCodeChangeOutputSchema,
  
  // Compose with modernized prompt wiring
  prompt: ReviewCodeChangePrompts.system(),
  stepPrompts: {
    plan: () => ReviewCodeChangePrompts.plan(),
    try: () => ReviewCodeChangePrompts.try(),
    refine: () => ReviewCodeChangePrompts.refine(),
    retry: () => ReviewCodeChangePrompts.retry()
  },
  
  // Tools needed
  tools: [
    'file-read',
    'git-diff',
    'lsp-query',
    'syntax-check',
    'dependency-analyzer'
  ],
  
  // PTRR configuration
  plan: { 
    chunkThreshold: 2000
  },
  try: { 
    chunkThreshold: 10000 // PRs can be large
  },
  refine: { 
    maxAttempts: 2
  },
  retry: { 
    maxAttempts: 1
  }
});

export default ReviewCodeChangeAgent;
