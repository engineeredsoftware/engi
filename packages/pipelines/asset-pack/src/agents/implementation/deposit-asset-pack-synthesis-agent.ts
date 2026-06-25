/**
 * Deposit-mode AssetPack synthesis agent (V48 Gate 3).
 *
 * The deposit lens of the SynthesizeAssetPacks Implementation phase: synthesize
 * reviewable AssetPack patches from the DEPOSITOR's repository source — bounded,
 * source-safe slices of repository knowledge the depositor reviews and uploads
 * to the Depository as supply. Runs on the formal PTRR machinery
 * (factoryAgentWithPTRR → Plan/Try/Refine/Retry, each a Failsafe × Thricified
 * generation) so every call renders in the SDIVF telemetry.
 *
 * Source-safety: the synthesized AssetPack is the depositor's deliberate supply
 * (reviewed before upload); raw protected source is never quoted in summaries,
 * review notes, or telemetry. Protected-IP exclusions are honored absolutely.
 */

import { factoryAgentWithPTRR } from '@bitcode/agent-generics';
import { Prompt } from '@bitcode/prompts/prompt';
import type { PromptPart } from '@bitcode/prompts/parts/PromptPart';
import { z } from 'zod';

const part = (content: string): PromptPart => content as PromptPart;

const DepositSynthesisInputSchema = z.object({
  repository: z.any().optional(),
  instructions: z.string().nullable().optional(),
  discovery: z.any().optional(),
  inventory: z.any().optional(),
  protectedIpExclusions: z.array(z.string()).optional(),
});

const DepositArtifactsSchema = z.object({
  summary: z.string(),
  fileChanges: z.any().optional(),
  coveredSourcePaths: z.array(z.string()).optional(),
  proofEvidence: z.array(z.string()).optional(),
  reviewNotes: z.array(z.string()).optional(),
});

const DepositSynthesisOutputSchema = z.object({
  success: z.boolean().optional(),
  semanticKind: z.literal('asset-pack-written-asset').optional(),
  summary: z.string(),
  assetPackSynthesisArtifacts: DepositArtifactsSchema.optional(),
  writtenAssets: DepositArtifactsSchema.optional(),
  assetPack: z.object({
    repository: z.any().optional(),
    proofEvidence: z.array(z.string()).optional(),
  }),
});

const DEPOSIT_IDENTITY = part(
  'You are SynthesizeAssetPacks in DEPOSIT mode. A depositor supplies their ' +
    'repository knowledge as AssetPacks — bounded, source-safe slices the ' +
    'Depository holds as supply, where future readers find Need-fitting packs. ' +
    'Synthesize reviewable AssetPack patches from the repository source the ' +
    'depositor can review and admit. Describe knowledge and capability — never ' +
    'quote raw source, secrets, or file contents. Honor protected-IP exclusions ' +
    'absolutely: never cover, reference, or describe excluded material.',
);

const DEPOSIT_REQUIREMENTS = part(
  'Synthesize DISTINCT AssetPack patches, each a coherent, commercially-legible ' +
    'slice of repository knowledge (a capability, an implementation pattern, or a ' +
    'proof/operations slice). For each: a source-safe summary, the covered source ' +
    'paths (chosen only from the provided inventory), and review notes. fileChanges ' +
    'describes the patch (paths + change kind) without embedding raw source text.',
);

const DEPOSIT_PLAN = part(
  'Plan: from the explored repository inventory + depositor steering, identify the ' +
    'distinct, buyer-legible AssetPack slices the repository supports.',
);
const DEPOSIT_TRY = part(
  'Try: synthesize each AssetPack patch — source-safe summary, covered source ' +
    'paths, fileChanges descriptor, and review notes.',
);
const DEPOSIT_REFINE = part(
  'Refine: ensure each patch is distinct, source-safe, exclusion-honoring, and ' +
    'legible to a future buyer deciding what to read.',
);
const DEPOSIT_RETRY = part(
  'Retry: complete any missing AssetPack patch as a minimal valid source-safe ' +
    'artifact rather than failing the synthesis.',
);

function createDepositSynthesisPrompt(): Prompt {
  const prompt = new Prompt();
  prompt.set('agent:identity', DEPOSIT_IDENTITY);
  prompt.set('agent:requirements', DEPOSIT_REQUIREMENTS);
  prompt.set('ptrr:plan', DEPOSIT_PLAN);
  prompt.set('ptrr:try', DEPOSIT_TRY);
  prompt.set('ptrr:refine', DEPOSIT_REFINE);
  prompt.set('ptrr:retry', DEPOSIT_RETRY);
  prompt.require('agent:identity');
  prompt.require('agent:requirements');
  prompt.requirePattern('ptrr:*');
  return prompt;
}

const depositPrompt = createDepositSynthesisPrompt();

export const DepositAssetPackSynthesisAgent = factoryAgentWithPTRR<
  z.infer<typeof DepositSynthesisInputSchema>,
  z.infer<typeof DepositSynthesisOutputSchema>
>({
  name: 'DepositAssetPackSynthesisAgent',
  description:
    'Synthesizes reviewable, source-safe AssetPack patches from the depositor repository source (deposit lens).',
  outputSchema: DepositSynthesisOutputSchema,
  tools: [],
  prompt: depositPrompt,
  stepPrompts: {
    plan: () => depositPrompt,
    try: () => depositPrompt,
    refine: () => depositPrompt,
    retry: () => depositPrompt,
  },
  plan: { chunkThreshold: 2000 },
  try: { chunkThreshold: 5000 },
  refine: { maxAttempts: 2 },
  retry: { maxAttempts: 1 },
});

function findExecutionValue(execution: any, namespace: string, key: string): any {
  const local = execution?.get?.(namespace, key);
  if (local !== undefined) return local;
  const up = execution?.findUp?.(namespace, key);
  if (up !== undefined) return up;
  return undefined;
}

export default async function runDepositAssetPackSynthesisAgent(input: any, execution: any) {
  const repository =
    input?.repository ?? findExecutionValue(execution, 'deposit', 'repository') ?? {};
  const instructions =
    input?.instructions ?? findExecutionValue(execution, 'deposit', 'instructions') ?? null;
  const protectedIpExclusions =
    input?.protectedIpExclusions ??
    findExecutionValue(execution, 'deposit', 'protectedIpExclusions') ??
    [];
  const inventory = input?.inventory ?? findExecutionValue(execution, 'deposit', 'inventory');

  const result = await DepositAssetPackSynthesisAgent(
    {
      ...input,
      repository,
      instructions,
      protectedIpExclusions,
      inventory,
      discovery: {
        context: execution?.get?.('discovery', 'context'),
        plan: execution?.get?.('discovery', 'plan'),
      },
    },
    execution,
  );

  const assetPackSynthesisArtifacts =
    result?.assetPackSynthesisArtifacts ??
    result?.writtenAssets ?? {
      summary: result?.summary ?? 'Deposit AssetPack synthesis produced reviewable, source-safe patches.',
    };

  const output = {
    ...result,
    success: result?.success ?? true,
    semanticKind: 'asset-pack-written-asset' as const,
    assetPackSynthesisArtifacts,
    writtenAssets: result?.writtenAssets ?? assetPackSynthesisArtifacts,
    assetPack: { ...(result?.assetPack || {}), repository },
  };

  try {
    execution.store('implementation', 'assetPack', output.assetPack);
    execution.store('implementation', 'assetPackSynthesisArtifacts', output.assetPackSynthesisArtifacts);
    execution.store('implementation', 'writtenAssets', output.writtenAssets);
    execution.store('implementation', 'summary', output.summary);
  } catch {}

  return output;
}
