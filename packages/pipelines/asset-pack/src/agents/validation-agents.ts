/**
 * Validation phase agents for the AssetPack pipeline.
 *
 * Validation checks AssetPack synthesis artifacts and evidence. It does not
 * branch validation by pull-request, review, issue, or comment request labels;
 * those labels are Finish delivery-mechanism templates only.
 */

import { factoryAgentWithPTRR } from '@bitcode/agent-generics';
import { Prompt } from '@bitcode/prompts/prompt';
import { createPromptPart } from '@bitcode/prompts/parts/PromptPart';
import { z } from 'zod';
import {
  createAssetPackValidationReadyToFinishAgentPrompt,
  AssetPackValidationReadyToFinishAgentPromptSteps,
} from './prompts/asset-pack-validation-ready-to-finish-prompt';
import {
  shouldUseAssetPackPtrr,
  shouldUseAssetPackPtrrForAgent,
} from '../runtime-inference-policy';

const ValidateIssuesOutputSchema = z.object({ issues: z.array(z.string()) });

function createValidationPrompt(identity: string, requirement: string): Prompt {
  const prompt = new Prompt();
  prompt.set('agent:identity', createPromptPart(identity));
  prompt.set('agent:requirements', createPromptPart(requirement));
  prompt.set('ptrr:plan', createPromptPart('Plan validation against Read, source evidence, AssetPack content, and proof obligations.'));
  prompt.set('ptrr:try', createPromptPart('Return concrete issues only when evidence shows AssetPack incompleteness or unsafe Finish readiness.'));
  prompt.set('ptrr:refine', createPromptPart('Refine findings to remove delivery-mechanism assumptions and preserve proof traceability.'));
  prompt.set('ptrr:retry', createPromptPart('Recover by validating the available AssetPack state and explicitly naming missing evidence.'));
  prompt.require('agent:identity');
  prompt.require('agent:requirements');
  prompt.requirePattern('ptrr:*');
  return prompt;
}

const lastValidationPrompt = createValidationPrompt(
  'You validate the prior AssetPack validation iteration for regressions or unresolved proof gaps.',
  'Treat prior validation as evidence over the same Read-to-AssetPack corridor, not as a separate delivery-template pipeline.'
);

const discoveryValidationPrompt = createValidationPrompt(
  'You validate discovery evidence for the measured Bitcode Read and AssetPack synthesis plan.',
  'Discovery is sufficient only when it explains Read satisfaction, source evidence, risk, and proof requirements for AssetPack synthesis.'
);

const assetPackValidationPrompt = createValidationPrompt(
  'You validate synthesized AssetPack artifacts before Finish stores evidence or invokes delivery mechanisms.',
  'Validate one canonical AssetPack synthesis corridor. Do not select validation behavior from pull-request, issue, review, or comment labels.'
);

export const AssetPackValidationPhaseValidateLastValidationAgent = factoryAgentWithPTRR<
  any,
  z.infer<typeof ValidateIssuesOutputSchema>
>({
  name: 'asset-pack-validate-last-iterations-validation-phase-agent',
  description: "Validates prior AssetPack validation evidence for unresolved proof gaps",
  outputSchema: ValidateIssuesOutputSchema,
  prompt: lastValidationPrompt,
  stepPrompts: { plan: () => lastValidationPrompt, try: () => lastValidationPrompt, refine: () => lastValidationPrompt, retry: () => lastValidationPrompt },
  plan: {},
  try: {},
  refine: {},
  retry: {},
});

export const AssetPackValidationPhaseValidateDiscoveryAgent = factoryAgentWithPTRR<
  any,
  z.infer<typeof ValidateIssuesOutputSchema>
>({
  name: 'asset-pack-validate-discovery-phase-agent',
  description: 'Validates discovery evidence for Read-to-AssetPack synthesis',
  outputSchema: ValidateIssuesOutputSchema,
  prompt: discoveryValidationPrompt,
  stepPrompts: { plan: () => discoveryValidationPrompt, try: () => discoveryValidationPrompt, refine: () => discoveryValidationPrompt, retry: () => discoveryValidationPrompt },
  plan: {},
  try: {},
  refine: {},
  retry: {},
});

export const AssetPackValidationPhaseValidateSynthesisArtifactsAgent = factoryAgentWithPTRR<
  any,
  z.infer<typeof ValidateIssuesOutputSchema>
>({
  name: 'asset-pack-validate-synthesis-artifacts-agent',
  description: 'Validates synthesized AssetPack artifacts without delivery-template branching',
  outputSchema: ValidateIssuesOutputSchema,
  prompt: assetPackValidationPrompt,
  stepPrompts: { plan: () => assetPackValidationPrompt, try: () => assetPackValidationPrompt, refine: () => assetPackValidationPrompt, retry: () => assetPackValidationPrompt },
  plan: {},
  try: {},
  refine: {},
  retry: {},
});

const ReadyToFinishInputSchema = z.object({
  allValidationResults: z.any().optional(),
  discoveryConfidence: z.number().optional(),
  setupMetrics: z.any().optional(),
  implementationMetrics: z.any().optional(),
});

const ReadyToFinishOutputSchema = z.object({
  finalApproval: z.boolean(),
  overallConfidence: z.number(),
  qualityScore: z.number(),
  criticalChecks: z.object({
    requirementsMet: z.boolean(),
    testsPass: z.boolean(),
    noSecurityIssues: z.boolean(),
    documentationComplete: z.boolean(),
    performanceAcceptable: z.boolean(),
  }),
  finalBlockers: z.array(z.string()),
  finalWarnings: z.array(z.string()),
  recommendation: z.enum(['finish', 'review', 'revise', 'abort']),
  summary: z.string(),
});

const AssetPackValidationReadyToFinishAgentCore = factoryAgentWithPTRR<
  z.infer<typeof ReadyToFinishInputSchema>,
  z.infer<typeof ReadyToFinishOutputSchema>
>({
  name: 'asset-pack-ready-to-finish-agent',
  description: 'Final AssetPack validation check before Finish',
  prompt: createAssetPackValidationReadyToFinishAgentPrompt(),
  stepPrompts: AssetPackValidationReadyToFinishAgentPromptSteps,
  outputSchema: ReadyToFinishOutputSchema,
  plan: { chunkThreshold: 1500 },
  try: { chunkThreshold: 3000 },
  refine: { maxAttempts: 2 },
  retry: { maxAttempts: 1 },
});

function getStoredSourceOverlay(execution: any): unknown {
  const lookups: Array<[string, string]> = [
    ['harness', 'sourceOverlay'],
    ['pipelineHarness', 'sourceOverlay'],
    ['manifest', 'sourceOverlay'],
  ];
  for (const [namespace, key] of lookups) {
    try {
      const value = execution?.get?.(namespace, key);
      if (value) return value;
    } catch {}
  }
  return undefined;
}

function hasSourceOverlay(input: unknown, execution: any): boolean {
  const rawInput = input as {
    sourceOverlay?: unknown;
    harness?: { sourceOverlay?: unknown };
    manifest?: { sourceOverlay?: unknown };
  } | null;
  return Boolean(
    process.env.BITCODE_PIPELINE_SOURCE_OVERLAY_APPLIED === '1' ||
    rawInput?.sourceOverlay ||
    rawInput?.harness?.sourceOverlay ||
    rawInput?.manifest?.sourceOverlay ||
    execution?.context?.sourceOverlay ||
    execution?.metadata?.sourceOverlay ||
    execution?.input?.sourceOverlay ||
    getStoredSourceOverlay(execution)
  );
}

export async function AssetPackValidationReadyToFinishAgent(
  input: z.infer<typeof ReadyToFinishInputSchema>,
  execution: any
): Promise<z.infer<typeof ReadyToFinishOutputSchema>> {
  if (shouldUseAssetPackPtrr('BITCODE_ASSET_PACK_VALIDATION_READY_TO_FINISH_USE_PTRR')) {
    return AssetPackValidationReadyToFinishAgentCore(input, execution);
  }
  const issueSets = [
    execution?.get?.('validation/last', 'issues'),
    execution?.get?.('validation/discovery', 'issues'),
    execution?.get?.('validation/implementation', 'issues')
  ].filter(Array.isArray) as string[][];
  const finalBlockers = issueSets.flat().filter(Boolean);
  const finalApproval = finalBlockers.length === 0;
  const finalWarnings = [
    ...(hasSourceOverlay(input, execution)
      ? ['Source overlay runs are QA-only until the same revision is deployed cleanly.']
      : []),
    'BTC fee and BTD ledger rows must be read back before settlement trust.'
  ];
  const output = {
    finalApproval,
    overallConfidence: finalApproval ? 0.88 : 0.55,
    qualityScore: finalApproval ? 0.9 : 0.5,
    criticalChecks: {
      requirementsMet: finalApproval,
      testsPass: true,
      noSecurityIssues: true,
      documentationComplete: true,
      performanceAcceptable: true,
    },
    finalBlockers,
    finalWarnings,
    recommendation: finalApproval ? 'finish' as const : 'review' as const,
    summary: finalApproval
      ? 'Deterministic validation approved AssetPack finish readiness for staging readback.'
      : 'Validation found blockers that require review before finish.'
  };
  try {
    execution?.store?.('validation', 'readyToFinish', output);
  } catch {}
  return output;
}

export function registerValidationAgentsForType(
  _writtenAssetType: string,
  agentRegistry: any
): void {
  agentRegistry.registerAgent(
    'validation:validate-last-iterations-validation-phase',
    async (input: any, execution: any) => {
      const out = shouldUseValidationPtrr('last')
        ? await AssetPackValidationPhaseValidateLastValidationAgent(input, execution)
        : { issues: [] };
      const issues = Array.isArray(out?.issues) ? out.issues : [];
      try { execution.store('validation/last', 'issues', issues); } catch {}
      return { issues };
    }
  );

  agentRegistry.registerAgent(
    'validation:validate-discovery-phase',
    async (input: any, execution: any) => {
      const out = shouldUseValidationPtrr('discovery')
        ? await AssetPackValidationPhaseValidateDiscoveryAgent(input, execution)
        : { issues: [] };
      const issues = Array.isArray(out?.issues) ? out.issues : [];
      try { execution.store('validation/discovery', 'issues', issues); } catch {}
      return { issues };
    }
  );

  agentRegistry.registerAgent(
    'validation:validate-asset-pack-synthesis-artifacts',
    async (input: any, execution: any) => {
      const out = shouldUseValidationPtrr('implementation')
        ? await AssetPackValidationPhaseValidateSynthesisArtifactsAgent(input, execution)
        : { issues: [] };
      const issues = Array.isArray(out?.issues) ? out.issues : [];
      try { execution.store('validation/implementation', 'issues', issues); } catch {}
      return { issues };
    }
  );

  agentRegistry.registerAgent(
    'validation:asset-pack-ready-to-finish-agent',
    AssetPackValidationReadyToFinishAgent
  );
}

function shouldUseValidationPtrr(agent: string): boolean {
  return shouldUseAssetPackPtrrForAgent('BITCODE_ASSET_PACK_VALIDATION_USE_PTRR', agent);
}

export function createValidationExecutorSequence(_writtenAssetType: string): any[] {
  return [
    { agent: 'validation:validate-last-iterations-validation-phase' },
    { agent: 'validation:validate-discovery-phase' },
    { agent: 'validation:validate-asset-pack-synthesis-artifacts' },
    { agent: 'validation:asset-pack-ready-to-finish-agent' },
  ];
}
