/**
 * AssetPack synthesis implementation agent.
 *
 * The implementation phase is one canonical Read-to-AssetPack synthesis
 * corridor. Pull requests, reviews, issues, and comments are Finish delivery
 * mechanisms, not implementation phase types.
 */

import { factoryAgentWithPTRR } from '@bitcode/agent-generics';
import { Prompt } from '@bitcode/prompts/prompt';
import { PROMPTPART_SPECIFIC_AGENT_ASSETPACKSYNTHESIZEARTIFACTS_IDENTITY_DEFINITION } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_agent_assetpacksynthesizeartifacts_identity_definition';
import { PROMPTPART_SPECIFIC_AGENT_ASSETPACKSYNTHESIZEARTIFACTS_REQUIREMENTS_CONTEXT } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_agent_assetpacksynthesizeartifacts_requirements_context';
import { PROMPTPART_SPECIFIC_AGENT_ASSETPACKSYNTHESIZEARTIFACTS_PTRRPLAN_PURPOSE } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_agent_assetpacksynthesizeartifacts_ptrrplan_purpose';
import { PROMPTPART_SPECIFIC_AGENT_ASSETPACKSYNTHESIZEARTIFACTS_PTRRTRY_PURPOSE } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_agent_assetpacksynthesizeartifacts_ptrrtry_purpose';
import { PROMPTPART_SPECIFIC_AGENT_ASSETPACKSYNTHESIZEARTIFACTS_PTRRREFINE_PURPOSE } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_agent_assetpacksynthesizeartifacts_ptrrrefine_purpose';
import { PROMPTPART_SPECIFIC_AGENT_ASSETPACKSYNTHESIZEARTIFACTS_PTRRRETRY_PURPOSE } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_agent_assetpacksynthesizeartifacts_ptrrretry_purpose';
import { z } from 'zod';
import { AssetPackWrittenAssetType } from '../../types/AssetPackWrittenAssetType';

const AssetPackSynthesisInputSchema = z.object({
  read: z.string().optional(),
  definitionOfRead: z.string().optional(),
  repository: z.any().optional(),
  requirements: z.any().optional(),
  discovery: z.any().optional(),
});

const AssetPackSynthesisArtifactsSchema = z.object({
  summary: z.string(),
  fileChanges: z.any().optional(),
  proofEvidence: z.array(z.string()).optional(),
  reviewNotes: z.array(z.string()).optional(),
});

const AssetPackSynthesisOutputSchema = z.object({
  success: z.boolean().optional(),
  semanticKind: z.literal('asset-pack-written-asset').optional(),
  writtenAssetType: z.literal(AssetPackWrittenAssetType.ReadSatisfactionAssetPack).optional(),
  summary: z.string(),
  assetPackSynthesisArtifacts: AssetPackSynthesisArtifactsSchema.optional(),
  writtenAssets: AssetPackSynthesisArtifactsSchema.optional(),
  assetPack: z.object({
    read: z.string().optional(),
    writtenAssetType: z.literal(AssetPackWrittenAssetType.ReadSatisfactionAssetPack).optional(),
    deliveryMechanismTemplate: z.string().optional(),
    proofEvidence: z.array(z.string()).optional(),
  }),
});

function createAssetPackSynthesisPrompt(): Prompt {
  const prompt = new Prompt();
  prompt.set('agent:identity', PROMPTPART_SPECIFIC_AGENT_ASSETPACKSYNTHESIZEARTIFACTS_IDENTITY_DEFINITION);
  prompt.set('agent:requirements', PROMPTPART_SPECIFIC_AGENT_ASSETPACKSYNTHESIZEARTIFACTS_REQUIREMENTS_CONTEXT);
  prompt.set('ptrr:plan', PROMPTPART_SPECIFIC_AGENT_ASSETPACKSYNTHESIZEARTIFACTS_PTRRPLAN_PURPOSE);
  prompt.set('ptrr:try', PROMPTPART_SPECIFIC_AGENT_ASSETPACKSYNTHESIZEARTIFACTS_PTRRTRY_PURPOSE);
  prompt.set('ptrr:refine', PROMPTPART_SPECIFIC_AGENT_ASSETPACKSYNTHESIZEARTIFACTS_PTRRREFINE_PURPOSE);
  prompt.set('ptrr:retry', PROMPTPART_SPECIFIC_AGENT_ASSETPACKSYNTHESIZEARTIFACTS_PTRRRETRY_PURPOSE);
  prompt.require('agent:identity');
  prompt.require('agent:requirements');
  prompt.requirePattern('ptrr:*');
  return prompt;
}

const prompt = createAssetPackSynthesisPrompt();

export const AssetPackSynthesizeArtifactsAgent = factoryAgentWithPTRR<
  z.infer<typeof AssetPackSynthesisInputSchema>,
  z.infer<typeof AssetPackSynthesisOutputSchema>
>({
  name: 'asset-pack-synthesize-artifacts-agent',
  description: 'Synthesizes Read-satisfying AssetPack artifacts without selecting a delivery mechanism',
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

export default async function assetPackSynthesizeArtifacts(input: any, execution: any) {
  const read =
    input?.read ??
    input?.definitionOfRead ??
    execution?.get?.('read', 'description') ??
    execution?.get?.('pipeline', 'expressedRead') ??
    '';
  const deliveryMechanismTemplate = execution?.get?.('pipeline', 'deliveryMechanismTemplate');
  const result = process?.env?.BITCODE_ASSET_PACK_SYNTHESIS_USE_PTRR === '1'
    ? await AssetPackSynthesizeArtifactsAgent(
    {
      ...input,
      read,
      discovery: {
        context: execution?.get?.('discovery', 'context'),
        plan: execution?.get?.('discovery', 'plan'),
      },
    },
    execution
  )
    : buildDeterministicAssetPackSynthesis(input, execution, read, deliveryMechanismTemplate);
  const assetPackSynthesisArtifacts = result?.assetPackSynthesisArtifacts ??
    result?.writtenAssets ?? {
      summary: result?.summary ?? 'AssetPack synthesis artifact evidence was produced.',
    };

  const output = {
    ...result,
    success: result?.success ?? true,
    semanticKind: 'asset-pack-written-asset' as const,
    writtenAssetType: AssetPackWrittenAssetType.ReadSatisfactionAssetPack,
    assetPackSynthesisArtifacts,
    writtenAssets: result?.writtenAssets ?? assetPackSynthesisArtifacts,
    assetPack: {
      ...(result?.assetPack || {}),
      read,
      writtenAssetType: AssetPackWrittenAssetType.ReadSatisfactionAssetPack,
      deliveryMechanismTemplate,
    },
  };

  try {
    execution.store('implementation', 'assetPack', output.assetPack);
    execution.store('implementation', 'assetPackSynthesisArtifacts', output.assetPackSynthesisArtifacts);
    execution.store('implementation', 'writtenAssets', output.writtenAssets);
    execution.store('implementation', 'summary', output.summary);
  } catch {}

  return output;
}

function buildDeterministicAssetPackSynthesis(
  input: any,
  execution: any,
  read: string,
  deliveryMechanismTemplate: string | undefined
) {
  const fitResult = input?.fitResult ?? input?.depositorySearchResult ?? {};
  const selectedCandidateAssetIds = Array.isArray(fitResult?.selectedCandidateAssetIds)
    ? fitResult.selectedCandidateAssetIds
    : [];
  const repository = input?.repository ?? input?.sourceRevision ?? {};
  const repositoryLabel = [
    repository.repositoryFullName ?? repository.fullName ?? 'unknown repository',
    repository.branch ?? 'unknown branch',
    repository.commit ?? 'unknown commit'
  ].join('@');
  const proofEvidence = [
    `Read: ${read}`,
    `Repository revision: ${repositoryLabel}`,
    `Fit result: ${fitResult?.resultState ?? 'not-yet-classified'}`,
    `Selected candidate assets: ${selectedCandidateAssetIds.join(', ') || 'none'}`,
    `Query root: ${fitResult?.queryRoot ?? 'not recorded'}`,
    `Ranking root: ${fitResult?.rankingRoot ?? 'not recorded'}`,
    `Embedding policy: ${fitResult?.embeddingPolicy?.provider ?? 'unknown'} ${fitResult?.embeddingPolicy?.model ?? ''}`.trim()
  ];
  const summary = [
    'Source-bound Read-satisfaction AssetPack synthesized by the staging pipeline.',
    `The pack binds the admitted Read to ${repositoryLabel}.`,
    `Fit posture: ${fitResult?.resultState ?? 'not-yet-classified'} with ${selectedCandidateAssetIds.length} selected candidate(s).`,
    'Validation must preserve proof, telemetry, delivery, and ledger readback before settlement trust.'
  ].join(' ');
  return {
    success: true,
    semanticKind: 'asset-pack-written-asset' as const,
    writtenAssetType: AssetPackWrittenAssetType.ReadSatisfactionAssetPack,
    summary,
    assetPackSynthesisArtifacts: {
      summary,
      fileChanges: {
        edited: 0,
        created: 1,
        deleted: 0,
        paths: ['AssetPack:read-satisfaction-summary']
      },
      proofEvidence,
      reviewNotes: [
        'This AssetPack is synthesized from source-bound depository fit evidence.',
        'QA overlay runs remain blocked for commercial source-revision settlement until deployed cleanly.'
      ]
    },
    writtenAssets: {
      summary,
      proofEvidence,
      reviewNotes: [
        'Read/Fit candidate evidence carried forward for validation and finish.'
      ]
    },
    assetPack: {
      read,
      writtenAssetType: AssetPackWrittenAssetType.ReadSatisfactionAssetPack,
      deliveryMechanismTemplate,
      proofEvidence
    }
  };
}
