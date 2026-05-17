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
import { Prompt } from '@bitcode/prompts/prompt';
import { createPromptPart } from '@bitcode/prompts/parts/PromptPart';
import { z } from 'zod';
import {
  buildSDIVFPipelineUpdate,
  storeIterationWorkUpdate,
  type ToolUsageUpdate,
} from '@bitcode/execution-generics';
import { shouldUseAssetPackPtrr } from '../../runtime-inference-policy';

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
  shouldContinueIterating: z.boolean(), // If false, ready to move to Finish
  estimatedIterationsNeeded: z.number().optional(),

  // For UI display
  summary: z.string() // "High confidence, proceeding autonomously" or "Medium confidence, instruction may help"
});

function createReadyToInstructStepPrompt(purpose: string): Prompt {
  const prompt = new Prompt();
  prompt.set('step/purpose', createPromptPart(purpose));
  prompt.require('step/purpose');
  return prompt;
}

const readyToInstructPrompt = (() => {
  const prompt = new Prompt();
  prompt.set(
    'agent/identity',
    createPromptPart('Bitcode validation-phase agent for deciding whether an AssetPack-producing inference run needs operator instruction before the next DIV iteration or Finish.')
  );
  prompt.set(
    'agent/purpose',
    createPromptPart('Measure validation issues, iteration progress, complexity, and remaining uncertainty so the run can continue autonomously only when source-to-shares evidence is sufficient.')
  );
  prompt.set(
    'agent/constraints',
    createPromptPart('Prefer honest operator review over false progress; do not promote a run toward Finish when missing evidence, unresolved implementation issues, or unclear Read alignment remain.')
  );
  prompt.set('ptrr/plan/purpose', createPromptPart('Plan the self-instruction decision from validation issue counts, iteration bounds, file-change evidence, and run complexity.'));
  prompt.set('ptrr/try/purpose', createPromptPart('Calculate confidence factors and decide whether operator instruction is needed before the next iteration.'));
  prompt.set('ptrr/refine/purpose', createPromptPart('Refine the confidence judgment against unresolved issues, proof gaps, and risk of false closure.'));
  prompt.set('ptrr/retry/purpose', createPromptPart('Recover with conservative instruction suggestions and a bounded continue-or-Finish decision.'));
  prompt.require('agent/identity');
  prompt.require('agent/purpose');
  prompt.requirePattern('ptrr/*/purpose');
  return prompt;
})();

const readyToInstructStepPrompts = {
  plan: () => createReadyToInstructStepPrompt('Plan the Bitcode self-instruction decision from validation state and remaining proof obligations.'),
  try: () => createReadyToInstructStepPrompt('Compute confidence factors, instruction read, continuation posture, and a concise operator-facing summary.'),
  refine: () => createReadyToInstructStepPrompt('Tighten the confidence judgment against unresolved issues and source-to-shares closure risk.'),
  retry: () => createReadyToInstructStepPrompt('Return conservative instruction suggestions when confidence evidence is incomplete.'),
};

export const ReadyToInstructAgent = factoryAgentWithPTRR<
  z.infer<typeof ReadyToInstructInputSchema>,
  z.infer<typeof ReadyToInstructOutputSchema>
>({
  name: 'asset-pack-ready-to-instruct',
  description: 'Bitcode validation-phase agent for deciding whether the DIV loop can continue autonomously or needs operator instruction before Finish',

  outputSchema: ReadyToInstructOutputSchema,
  prompt: readyToInstructPrompt,
  stepPrompts: readyToInstructStepPrompts,

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

  const result = shouldUseAssetPackPtrr('BITCODE_ASSET_PACK_READY_TO_INSTRUCT_USE_PTRR')
    ? await ReadyToInstructAgent(instructInput, execution)
    : buildDeterministicReadyToInstruct(instructInput);

  // Store confidence for UI
  execution.store('agent', 'selfInstructConfidence', result.selfInstructConfidence);
  execution.store('agent', 'readyToInstruct', result.readyToInstruct);
  execution.store('validation', 'instructionSuggestions', result.instructionSuggestions);
  execution.store('validation', 'shouldContinueIterating', result.shouldContinueIterating);

  const iterationUpdate = buildSDIVFPipelineUpdate({
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

function buildDeterministicReadyToInstruct(
  input: z.infer<typeof ReadyToInstructInputSchema>
): z.infer<typeof ReadyToInstructOutputSchema> {
  const discoveryIssues = input.validationResults.discoveryIssues.length;
  const implementationIssues = input.validationResults.implementationIssues.length;
  const lastIterationIssues = input.validationResults.lastIterationIssues.length;
  const totalIssues = discoveryIssues + implementationIssues + lastIterationIssues;
  const finalIteration = input.currentIteration >= input.maxIterations;
  const issueScore = totalIssues === 0 ? 1 : Math.max(0.25, 1 - totalIssues * 0.2);
  const selfInstructConfidence = finalIteration
    ? Math.min(0.92, issueScore)
    : Math.min(0.88, issueScore);
  const readyToInstruct = selfInstructConfidence < 0.6;

  return {
    selfInstructConfidence,
    readyToInstruct,
    confidenceFactors: {
      issuesResolved: totalIssues === 0 ? 1 : 0.5,
      progressMade: totalIssues === 0 ? 0.9 : 0.55,
      complexityHandled: input.complexity === 'high' ? 0.7 : 0.85,
      remainingWork: totalIssues === 0 ? 0.05 : Math.min(0.8, totalIssues * 0.2),
    },
    instructionSuggestions: readyToInstruct
      ? ['Review validation issues before allowing the AssetPack run to finish.']
      : [],
    uncertainAreas: totalIssues
      ? ['Validation still reports unresolved AssetPack readiness issues.']
      : [],
    shouldContinueIterating: !finalIteration && totalIssues > 0,
    estimatedIterationsNeeded: totalIssues ? Math.min(2, totalIssues) : 0,
    summary: totalIssues === 0
      ? 'High confidence; deterministic validation found no instruction blocker before finish.'
      : 'Validation issues remain; operator instruction may be required before finish.',
  };
}
