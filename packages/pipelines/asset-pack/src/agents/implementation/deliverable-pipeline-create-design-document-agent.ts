/**
 * Create Design Document Agent
 * 
 * Creates a design document for the design-document deliverable type.
 * This typically creates an issue or document in the VCS system.
 */

import { factoryAgentWithPTRR } from '@bitcode/agent-generics';
import { z } from 'zod';
import {
  createAssetPackFinishCreateIssueDeliveryAgentPrompt,
  AssetPackFinishCreateIssueDeliveryAgentPromptSteps
} from '../prompts/create-issue-prompt';

// Input schema
const CreateDesignDocumentInputSchema = z.object({
  requirements: z.object({
    title: z.string(),
    description: z.string(),
    objectives: z.array(z.string()),
    constraints: z.array(z.string()).optional(),
    successCriteria: z.array(z.string())
  }),
  research: z.object({
    existingPatterns: z.array(z.string()).optional(),
    alternatives: z.array(z.object({
      approach: z.string(),
      pros: z.array(z.string()),
      cons: z.array(z.string())
    })).optional(),
    references: z.array(z.string()).optional()
  }),
  repository: z.object({
    owner: z.string(),
    name: z.string(),
    platform: z.enum(['github', 'gitlab', 'bitbucket'])
  })
});

// Output schema
const CreateDesignDocumentOutputSchema = z.object({
  title: z.string(),
  body: z.string(), // Markdown formatted
  labels: z.array(z.string()),
  assignees: z.array(z.string()).optional(),
  milestone: z.string().optional(),
  
  // Document structure
  sections: z.object({
    overview: z.string(),
    background: z.string(),
    proposedSolution: z.string(),
    implementation: z.string(),
    alternatives: z.string().optional(),
    testing: z.string(),
    rollout: z.string().optional(),
    risks: z.string().optional()
  }),
  
  // Metadata
  metadata: z.object({
    documentType: z.literal('design-document'),
    version: z.string(),
    status: z.enum(['draft', 'review', 'approved', 'implemented']),
    createdAt: z.string(),
    estimatedEffort: z.string().optional()
  })
});

/**
 * CreateDesignDocument Agent
 * Uses canonical naming for VCS portability
 */
export const CreateDesignDocumentAgent = factoryAgentWithPTRR<
  z.infer<typeof CreateDesignDocumentInputSchema>,
  z.infer<typeof CreateDesignDocumentOutputSchema>
>({
  name: 'deliverable-pipeline-create-design-document-agent',
  description: 'Creates comprehensive design documents',
  
  prompt: createAssetPackFinishCreateIssueDeliveryAgentPrompt(),
  stepPrompts: AssetPackFinishCreateIssueDeliveryAgentPromptSteps,
  
  outputSchema: CreateDesignDocumentOutputSchema,
  
  // Tools needed
  tools: [
    'markdown-generator',
    'create-issue',
    'lsp-query'
  ],
  
  // PTRR configuration
  plan: { 
    chunkThreshold: 1500
  },
  try: { 
    chunkThreshold: 3000
  },
  refine: { 
    maxAttempts: 2
  },
  retry: { 
    maxAttempts: 1
  }
});

export default CreateDesignDocumentAgent;
