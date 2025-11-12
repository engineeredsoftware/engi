/**
 * Correct Code Change Agent
 * 
 * Final step in Divide|Conquer|Correct pattern.
 * Validates all conquered files work together and fixes issues.
 */

import { factoryAgentWithPTRR } from '@engi/agent-generics';
import { z } from 'zod';
import { CorrectCodeChangePrompts } from '../prompts/correct-code-change-prompt';

// Input schema - results from all conquer agents
const CorrectCodeChangeInputSchema = z.object({
  allFileResults: z.array(z.object({
    filePath: z.string(),
    changeType: z.string(),
    success: z.boolean(),
    patch: z.string().optional(),
    newContent: z.string().optional(),
    error: z.string().optional()
  })),
  originalDivision: z.any(), // Original division plan for reference
  validationCriteria: z.array(z.string()).optional()
});

// Output schema - final corrected state
const CorrectCodeChangeOutputSchema = z.object({
  corrections: z.array(z.object({
    filePath: z.string(),
    issue: z.string(),
    correction: z.string(),
    applied: z.boolean(),
    patch: z.string().optional()
  })),
  validationResults: z.object({
    syntaxValid: z.boolean(),
    testsPass: z.boolean().optional(),
    lintPass: z.boolean().optional(),
    buildPass: z.boolean().optional(),
    typeCheckPass: z.boolean().optional()
  }),
  integrationChecks: z.object({
    importsResolved: z.boolean(),
    exportsMatched: z.boolean(),
    dependenciesConsistent: z.boolean(),
    noCircularDependencies: z.boolean()
  }),
  metrics: z.object({
    totalFilesChanged: z.number(),
    totalLinesAdded: z.number(),
    totalLinesRemoved: z.number(),
    totalCorrections: z.number()
  }),
  readyForValidation: z.boolean(),
  summary: z.string()
});

/**
 * CorrectCodeChange Agent
 * Uses canonical naming for VCS portability
 */
export const CorrectCodeChangeAgent = factoryAgentWithPTRR<
  z.infer<typeof CorrectCodeChangeInputSchema>,
  z.infer<typeof CorrectCodeChangeOutputSchema>
>({
  name: 'deliverable-pipeline-correct-code-change-agent',
  description: 'Validates and corrects all file changes to ensure coherence',
  
  outputSchema: CorrectCodeChangeOutputSchema,
  
  // Compose with modernized prompt wiring
  prompt: CorrectCodeChangePrompts.system(),
  stepPrompts: {
    plan: () => CorrectCodeChangePrompts.plan(),
    try: () => CorrectCodeChangePrompts.try(),
    refine: () => CorrectCodeChangePrompts.refine(),
    retry: () => CorrectCodeChangePrompts.retry()
  },
  
  // Tools: prefer reading and reasoning; allow "use-computer" only when necessary
  tools: [
    'deliverable-pipeline-use-computer-tool'
  ],
  
  // PTRR configuration
  plan: { 
    chunkThreshold: 2000,
    maxIterations: 2
  },
  try: { 
    chunkThreshold: 5000,
    timeout: 60000 // Might run tests/builds
  },
  refine: { 
    maxAttempts: 2,
    improvementThreshold: 0.95 // High bar for corrections
  },
  retry: { 
    maxAttempts: 1,
    backoffMultiplier: 2
  }
});

export default CorrectCodeChangeAgent;
