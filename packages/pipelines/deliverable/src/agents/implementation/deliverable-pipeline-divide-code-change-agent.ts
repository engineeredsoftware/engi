/**
 * Divide Code Change Agent
 * 
 * Divides code change work into atomic file operations for parallel conquest.
 * This is the first step in the Divide|Conquer|Correct pattern.
 */

import { factoryAgentWithPTRR } from '@bitcode/agent-generics';
import { z } from 'zod';
import { DivideCodeChangePrompts } from '../prompts/divide-code-change-prompt';

// Input schema - what we receive from discovery phase
const DivideCodeChangeInputSchema = z.object({
  requirements: z.any(), // From discovery phase
  approach: z.any(), // From discovery phase  
  codebaseAnalysis: z.any() // From setup phase
});

// Output schema - files to be conquered
const DivideCodeChangeOutputSchema = z.object({
  filesToChange: z.array(z.object({
    filePath: z.string(),
    changeType: z.enum(['create', 'modify', 'delete']),
    purpose: z.string(),
    estimatedComplexity: z.number(), // 1-10 scale
    dependencies: z.array(z.string()), // Other files this depends on
    parallelizable: z.boolean() // Can run in parallel with others
  })),
  executionGroups: z.array(z.object({
    groupId: z.string(),
    files: z.array(z.string()),
    canParallelize: z.boolean(),
    dependencies: z.array(z.string()) // Other group IDs
  })),
  totalFiles: z.number(),
  estimatedTotalComplexity: z.number()
});

/**
 * DivideCodeChange Agent
 * Uses canonical naming for VCS portability
 */
export const DivideCodeChangeAgent = factoryAgentWithPTRR<
  z.infer<typeof DivideCodeChangeInputSchema>,
  z.infer<typeof DivideCodeChangeOutputSchema>
>({
  name: 'deliverable-pipeline-divide-code-change-agent',
  description: 'Strategically divides code change into atomic file operations',
  
  outputSchema: DivideCodeChangeOutputSchema,
  
  // Compose with modernized prompt wiring
  prompt: DivideCodeChangePrompts.system(),
  stepPrompts: {
    plan: () => DivideCodeChangePrompts.plan(),
    try: () => DivideCodeChangePrompts.try(),
    refine: () => DivideCodeChangePrompts.refine(),
    retry: () => DivideCodeChangePrompts.retry()
  },
  
  // PTRR configuration
  plan: { 
    chunkThreshold: 2000,
    maxIterations: 3
  },
  try: { 
    chunkThreshold: 3000,
    timeout: 30000
  },
  refine: { 
    maxAttempts: 2,
    improvementThreshold: 0.8
  },
  retry: { 
    maxAttempts: 1,
    backoffMultiplier: 2
  }
});

export default DivideCodeChangeAgent;
