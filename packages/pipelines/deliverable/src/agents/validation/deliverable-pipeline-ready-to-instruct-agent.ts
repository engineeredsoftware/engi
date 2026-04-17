/**
 * Ready to Instruct Agent
 *
 * Runs at END of each DIV loop iteration in validation phase.
 * Determines selfInstructConfidence for next iteration:
 * - High confidence (>0.8): Auto-proceed
 * - Medium confidence (0.4-0.8): Show timer, optional instruction
 * - Low confidence (<0.4): Show timer, instruction recommended
 * - Confidence 0: Force user instruction (Note required)
 *
 * This agent decides if the system needs user guidance before next iteration.
 */

import { factoryAgentWithPTRR } from '@bitcode/agent-generics';
import { z } from 'zod';
import {
  buildSDIVSPipelineUpdate,
  storeIterationWorkUpdate,
  type ToolUsageUpdate,
} from '@bitcode/execution-generics';

const ReadyToInstructInputSchema = z.object({
  validationResults: z.object({
    discoveryIssues: z.array(z.string()),
    implementationIssues: z.array(z.string()),
    lastIterationIssues: z.array(z.string())
  }),
  currentIteration: z.number(),
  maxIterations: z.number(),
  fileChangeStats: z.object({
    filesChanged: z.number(),
    linesAdded: z.number(),
    linesRemoved: z.number()
  }).optional(),
  complexity: z.enum(['low', 'medium', 'high']).optional()
});

const ReadyToInstructOutputSchema = z.object({
  // Core decision
  selfInstructConfidence: z.number().min(0).max(1),
  readyToInstruct: z.boolean(), // If confidence < threshold (0.6)

  // Reasoning
  confidenceFactors: z.object({
    issuesResolved: z.number(), // 0-1
    progressMade: z.number(), // 0-1
    complexityHandled: z.number(), // 0-1
    remainingWork: z.number(), // 0-1 (inverse - lower is better)
  }),

  // Instructions guidance
  instructionSuggestions: z.array(z.string()).optional(), // If low confidence, suggest what to ask
  uncertainAreas: z.array(z.string()).optional(), // Where AI is uncertain

  // Iteration decision
  shouldContinueIterating: z.boolean(), // If false, ready to move to shipping
  estimatedIterationsNeeded: z.number().optional(),

  // For UI display
  summary: z.string() // "High confidence, proceeding autonomously" or "Medium confidence, instruction may help"
});

export const ReadyToInstructAgent = factoryAgentWithPTRR<
  z.infer<typeof ReadyToInstructInputSchema>,
  z.infer<typeof ReadyToInstructOutputSchema>
>({
  name: 'deliverable-pipeline-ready-to-instruct',
  description: 'Determines self-instruct confidence at end of DIV loop iteration',

  outputSchema: ReadyToInstructOutputSchema,

  tools: [], // Pure reasoning agent, no tools needed

  plan: { chunkThreshold: 1000 },
  try: { chunkThreshold: 2000 },
  refine: { maxAttempts: 1 },
  retry: { maxAttempts: 1 }
});

/**
 * Wrapper that stores confidence in execution state for UI consumption
 */
export default async function readyToInstructWithStorage(input: any, execution: any) {
  // Prepare input from validation stores
  const discoveryIssues = execution.get('validation/discovery', 'issues') || [];
  const implementationIssues = execution.get('validation/implementation', 'issues') || [];
  const lastIterationIssues = execution.get('validation/last', 'issues') || [];
  const currentIteration = execution.get('pipeline', 'currentIteration') || 0;
  const maxIterations = execution.get('config', 'maxIterations') || 3;
  const fileChangeStats = execution.get('file-changes', 'stats');

  const instructInput = {
    validationResults: {
      discoveryIssues,
      implementationIssues,
      lastIterationIssues
    },
    currentIteration,
    maxIterations,
    fileChangeStats,
    complexity: 'medium' as const
  };

  const result = await ReadyToInstructAgent(instructInput, execution);

  // Store confidence for UI
  execution.store('agent', 'selfInstructConfidence', result.selfInstructConfidence);
  execution.store('agent', 'readyToInstruct', result.readyToInstruct);
  execution.store('validation', 'instructionSuggestions', result.instructionSuggestions);
  execution.store('validation', 'shouldContinueIterating', result.shouldContinueIterating);

  const iterationUpdate = buildSDIVSPipelineUpdate({
    execution,
    iteration: currentIteration,
    prose: result.summary,
    selfInstruction: result.summary,
    confidence: result.selfInstructConfidence,
    suggestions: result.instructionSuggestions ?? [],
    tools: [] as ToolUsageUpdate[],
    meta: {
      issues: {
        discovery: discoveryIssues.length,
        implementation: implementationIssues.length,
        last: lastIterationIssues.length,
      },
      shouldContinue: result.shouldContinueIterating,
    },
  });

  execution.store('validation', 'selfInstruction', {
    iteration: currentIteration,
    summary: result.summary,
    confidence: result.selfInstructConfidence,
    suggestions: result.instructionSuggestions ?? [],
    shouldContinueIterating: result.shouldContinueIterating,
  });

  storeIterationWorkUpdate(execution, iterationUpdate);

  return result;
}
