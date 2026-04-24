/**
 * AssetPack synthesis implementation agent.
 *
 * V26 implementation phase is one canonical Need-to-AssetPack synthesis
 * corridor. Pull requests, reviews, issues, and comments are Finish delivery
 * mechanisms, not implementation phase types.
 */

import { factoryAgentWithPTRR } from '@bitcode/agent-generics';
import { Prompt } from '@bitcode/prompts/prompt';
import { createPromptPart } from '@bitcode/prompts/parts/PromptPart';
import { z } from 'zod';
import { AssetPackWrittenAssetType } from '../../types/AssetPackWrittenAssetType';

const AssetPackSynthesisInputSchema = z.object({
  need: z.string().optional(),
  definitionOfNeed: z.string().optional(),
  repository: z.any().optional(),
  requirements: z.any().optional(),
  discovery: z.any().optional(),
});

const AssetPackSynthesisOutputSchema = z.object({
  success: z.boolean().default(true),
  semanticKind: z.literal('asset-pack-written-asset').default('asset-pack-written-asset'),
  writtenAssetType: z.literal(AssetPackWrittenAssetType.NeedSatisfactionAssetPack).default(
    AssetPackWrittenAssetType.NeedSatisfactionAssetPack
  ),
  summary: z.string(),
  writtenAssets: z.object({
    summary: z.string(),
    fileChanges: z.any().optional(),
    proofEvidence: z.array(z.string()).optional(),
    reviewNotes: z.array(z.string()).optional(),
  }),
  assetPack: z.object({
    need: z.string().optional(),
    writtenAssetType: z.literal(AssetPackWrittenAssetType.NeedSatisfactionAssetPack).default(
      AssetPackWrittenAssetType.NeedSatisfactionAssetPack
    ),
    deliveryMechanismTemplate: z.string().optional(),
    proofEvidence: z.array(z.string()).optional(),
  }),
});

function createAssetPackSynthesisPrompt(): Prompt {
  const prompt = new Prompt();
  prompt.set(
    'agent:identity',
    createPromptPart(
      'You are the Bitcode AssetPack synthesis agent. Satisfy the measured Need by producing stable written assets and proof evidence before Finish delivery.'
    )
  );
  prompt.set(
    'agent:requirements',
    createPromptPart(
      'Do not choose implementation behavior from pull-request/review/issue/comment legacy labels. Those labels are delivery-mechanism templates used after validation in Finish.'
    )
  );
  prompt.set(
    'ptrr:plan',
    createPromptPart('Plan AssetPack written assets from Need, repository evidence, constraints, and proof obligations.')
  );
  prompt.set(
    'ptrr:try',
    createPromptPart('Synthesize the AssetPack written assets, including summary, source changes or document content, and proof evidence.')
  );
  prompt.set(
    'ptrr:refine',
    createPromptPart('Refine the AssetPack for Need satisfaction, auditability, and readiness for validation.')
  );
  prompt.set(
    'ptrr:retry',
    createPromptPart('Recover incomplete synthesis by rebuilding from Need evidence and surfacing blockers explicitly.')
  );
  prompt.require('agent:identity');
  prompt.require('agent:requirements');
  prompt.requirePattern('ptrr:*');
  return prompt;
}

const prompt = createAssetPackSynthesisPrompt();

export const AssetPackSynthesizeWrittenAssetsAgent = factoryAgentWithPTRR<
  z.infer<typeof AssetPackSynthesisInputSchema>,
  z.infer<typeof AssetPackSynthesisOutputSchema>
>({
  name: 'asset-pack-synthesize-written-assets-agent',
  description: 'Synthesizes Need-satisfying AssetPack written assets without selecting a delivery mechanism',
  outputSchema: AssetPackSynthesisOutputSchema,
  tools: [],
  prompt,
  stepPrompts: {
    plan: () => prompt,
    try: () => prompt,
    refine: () => prompt,
    retry: () => prompt,
  },
  plan: { chunkThreshold: 2000 },
  try: { chunkThreshold: 5000 },
  refine: { maxAttempts: 2 },
  retry: { maxAttempts: 1 },
});

export default async function assetPackSynthesizeWrittenAssets(input: any, execution: any) {
  const need =
    input?.need ??
    input?.definitionOfNeed ??
    execution?.get?.('need', 'description') ??
    execution?.get?.('pipeline', 'expressedNeed') ??
    '';
  const deliveryMechanismTemplate = execution?.get?.('pipeline', 'deliveryMechanismTemplate');
  const result = await AssetPackSynthesizeWrittenAssetsAgent(
    {
      ...input,
      need,
      discovery: {
        context: execution?.get?.('discovery', 'context'),
        plan: execution?.get?.('discovery', 'plan'),
      },
    },
    execution
  );

  const output = {
    ...result,
    success: result?.success ?? true,
    semanticKind: 'asset-pack-written-asset' as const,
    writtenAssetType: AssetPackWrittenAssetType.NeedSatisfactionAssetPack,
    assetPack: {
      ...(result?.assetPack || {}),
      need,
      writtenAssetType: AssetPackWrittenAssetType.NeedSatisfactionAssetPack,
      deliveryMechanismTemplate,
    },
  };

  try {
    execution.store('implementation', 'assetPack', output.assetPack);
    execution.store('implementation', 'writtenAssets', output.writtenAssets);
    execution.store('implementation', 'summary', output.summary);
  } catch {}

  return output;
}
