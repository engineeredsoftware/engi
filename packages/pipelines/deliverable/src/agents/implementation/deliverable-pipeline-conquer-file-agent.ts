/**
 * Conquer File Agent
 * 
 * Conquers a single file - creates, modifies, or deletes it.
 * Runs in parallel with other conquer agents as part of Divide|Conquer|Correct.
 */

import { factoryAgentWithPTRR } from '@bitcode/agent-generics';
import { z } from 'zod';
import { ConquerFilePrompts } from '../prompts/conquer-file-prompt';

// Check if we have a generic code-editor agent to extend
let baseAgent;
try {
  // If there's a generic code-editor agent, we can compose with it
  baseAgent = require('@bitcode/generic-agent-code-editor');
} catch {
  // No generic agent available, we'll create from scratch
  baseAgent = null;
}

// Input schema - what we receive from divide agent
const ConquerFileInputSchema = z.object({
  filePath: z.string(),
  changeType: z.enum(['create', 'modify', 'delete']),
  purpose: z.string(),
  fileContext: z.any(), // PrepareContext provides relevant context
  dependencies: z.array(z.string()),
  estimatedComplexity: z.number()
});

// Output schema - result of conquering the file
const ConquerFileOutputSchema = z.object({
  filePath: z.string(),
  changeType: z.string(),
  success: z.boolean(),
  patch: z.string().optional(), // The actual diff/patch for modifications
  newContent: z.string().optional(), // For created files
  oldContent: z.string().optional(), // For deleted files (for rollback)
  error: z.string().optional(),
  validationResults: z.object({
    syntaxValid: z.boolean(),
    lintClean: z.boolean().optional(),
    testsAffected: z.array(z.string()).optional()
  }).optional()
});

/**
 * ConquerFile Agent
 * Extends base code-editor if available, otherwise creates new
 */
const baseConquerAgent = factoryAgentWithPTRR<
  z.infer<typeof ConquerFileInputSchema>,
  z.infer<typeof ConquerFileOutputSchema>
>({
  name: 'deliverable-pipeline-conquer-file-agent',
  description: 'Conquers (creates/modifies/deletes) a single file with precision',

  outputSchema: ConquerFileOutputSchema,

  // Extend base agent if available
  ...(baseAgent ? { extends: baseAgent.codeEditorAgent } : {}),

  // Compose with modernized prompt wiring (overrides base prompts if extending)
  prompt: ConquerFilePrompts.system(),
  stepPrompts: {
    plan: () => ConquerFilePrompts.plan(),
    try: () => ConquerFilePrompts.try(),
    refine: () => ConquerFilePrompts.refine(),
    retry: () => ConquerFilePrompts.retry()
  },

  // Tools: none by default; produce patch/newContent in output. Validation occurs in Correct/Validation.
  tools: [],

  // PTRR configuration
  plan: {
    chunkThreshold: 1000,
    maxIterations: 2
  },
  try: {
    chunkThreshold: 5000, // File content can be large
    timeout: 20000
  },
  refine: {
    maxAttempts: 2,
    improvementThreshold: 0.9
  },
  retry: {
    maxAttempts: 1,
    backoffMultiplier: 1.5
  }
});

// Wrap with file diff streaming
export const ConquerFileAgent = async (input: any, execution: any) => {
  const result = await baseConquerAgent(input, execution);

  // Manual file change recording (agent has tools:[] so no usedTools)
  if (result.success) {
    try {
      const { recordFileChange } = await import('@bitcode/execution-generics');

      recordFileChange(execution, {
        path: result.filePath,
        action: result.changeType === 'create' ? 'created' :
                result.changeType === 'delete' ? 'deleted' : 'modified',
        oldContent: result.oldContent,
        newContent: result.newContent || result.patch,
        linesAdded: (result.newContent || result.patch || '')?.split('\n').length || 0,
        linesRemoved: (result.oldContent || '')?.split('\n').length || 0,
        tool: 'ConquerFileAgent',
        agent: 'ConquerFileAgent',
        step: 'Try'
      });

      // Stream file changes
      const { streamFileChangesAfterStep } = await import('@bitcode/agent-generics');
      await streamFileChangesAfterStep(execution, result, {
        agent: 'ConquerFileAgent',
        step: 'Try'
      });
    } catch (e) {
      console.warn('[File Diff] Could not record/stream changes:', e);
    }
  }

  return result;
};

export default ConquerFileAgent;
