/**
 * Capture Learnings Agent (Digest Phase)
 *
 * Analyzes execution results and proposes AGENTS.md updates.
 * Extracts Q&A patterns, user iterates and provides feedback.
 */

import { factoryAgentWithPTRR } from '@engi/agent-generics';
import { z } from 'zod';

const CaptureLearningsInputSchema = z.object({
  executionResults: z.any(), // Results from Develop phase
  fileChanges: z.any(), // File change statistics
  currentAgentsMd: z.string().optional(),
  userFeedback: z.string().optional()
});

const CaptureLearningsOutputSchema = z.object({
  agentsMdUpdates: z.string(),
  questionsAnswered: z.array(z.object({
    question: z.string(),
    answer: z.string(),
    files: z.array(z.string()),
    codeExample: z.string().optional()
  })),
  patternsDocumented: z.array(z.object({
    pattern: z.string(),
    description: z.string(),
    whenToUse: z.string()
  })),
  readyToShip: z.boolean(),
  useTools: z.array(z.object({
    name: z.string(),
    input: z.any()
  })).optional()
});

const captureLearningsAgent = factoryAgentWithPTRR<
  z.infer<typeof CaptureLearningsInputSchema>,
  z.infer<typeof CaptureLearningsOutputSchema>
>({
  name: 'digest-capture-learnings',
  description: 'Captures execution learnings in AGENTS.md based on code changes and user feedback',

  outputSchema: CaptureLearningsOutputSchema,

  tools: ['Write', 'Edit'], // Can edit .ai/AGENTS.md

  plan: { chunkThreshold: 2000 },
  try: { chunkThreshold: 5000 },
  refine: { maxAttempts: 2 },
  retry: { maxAttempts: 1 }
});

export const CaptureLearningsAgent = captureLearningsAgent;

export default async function captureLearningsWithStore(input: any, execution: any) {
  const result = await captureLearningsAgent(input, execution);
  try {
    execution.store('digest', 'proposal', {
      ...result,
      capturedAt: new Date().toISOString()
    });
  } catch {}
  return result;
}
