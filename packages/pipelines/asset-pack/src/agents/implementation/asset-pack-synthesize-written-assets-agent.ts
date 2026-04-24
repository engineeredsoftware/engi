/**
 * AssetPack synthesis implementation agent.
 *
 * V26 implementation phase is one canonical Need-to-AssetPack synthesis
 * corridor. Pull requests, reviews, issues, and comments are Finish delivery
 * mechanisms, not implementation phase types.
 */

import { factoryAgentWithPTRR } from '@bitcode/agent-generics';
import { Prompt } from '@bitcode/prompts/prompt';
import { PROMPTPART_SPECIFIC_AGENT_ASSETPACKSYNTHESIZEWRITTENASSETS_IDENTITY_DEFINITION } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_agent_assetpacksynthesizewrittenassets_identity_definition';
import { PROMPTPART_SPECIFIC_AGENT_ASSETPACKSYNTHESIZEWRITTENASSETS_REQUIREMENTS_CONTEXT } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_agent_assetpacksynthesizewrittenassets_requirements_context';
import { PROMPTPART_SPECIFIC_AGENT_ASSETPACKSYNTHESIZEWRITTENASSETS_PTRRPLAN_PURPOSE } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_agent_assetpacksynthesizewrittenassets_ptrrplan_purpose';
import { PROMPTPART_SPECIFIC_AGENT_ASSETPACKSYNTHESIZEWRITTENASSETS_PTRRTRY_PURPOSE } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_agent_assetpacksynthesizewrittenassets_ptrrtry_purpose';
import { PROMPTPART_SPECIFIC_AGENT_ASSETPACKSYNTHESIZEWRITTENASSETS_PTRRREFINE_PURPOSE } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_agent_assetpacksynthesizewrittenassets_ptrrrefine_purpose';
import { PROMPTPART_SPECIFIC_AGENT_ASSETPACKSYNTHESIZEWRITTENASSETS_PTRRRETRY_PURPOSE } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_agent_assetpacksynthesizewrittenassets_ptrrretry_purpose';
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
  prompt.set('agent:identity', PROMPTPART_SPECIFIC_AGENT_ASSETPACKSYNTHESIZEWRITTENASSETS_IDENTITY_DEFINITION);
  prompt.set('agent:requirements', PROMPTPART_SPECIFIC_AGENT_ASSETPACKSYNTHESIZEWRITTENASSETS_REQUIREMENTS_CONTEXT);
  prompt.set('ptrr:plan', PROMPTPART_SPECIFIC_AGENT_ASSETPACKSYNTHESIZEWRITTENASSETS_PTRRPLAN_PURPOSE);
  prompt.set('ptrr:try', PROMPTPART_SPECIFIC_AGENT_ASSETPACKSYNTHESIZEWRITTENASSETS_PTRRTRY_PURPOSE);
  prompt.set('ptrr:refine', PROMPTPART_SPECIFIC_AGENT_ASSETPACKSYNTHESIZEWRITTENASSETS_PTRRREFINE_PURPOSE);
  prompt.set('ptrr:retry', PROMPTPART_SPECIFIC_AGENT_ASSETPACKSYNTHESIZEWRITTENASSETS_PTRRRETRY_PURPOSE);
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
  description: 'Synthesizes Need-satisfying AssetPack artifacts without selecting a delivery mechanism',
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
