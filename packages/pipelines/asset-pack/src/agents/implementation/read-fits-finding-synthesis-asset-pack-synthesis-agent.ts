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
import { runBoundedStructuredInference } from '../../bounded-structured-inference';
import {
  isAssetPackBoundedRealInferenceProfile,
  shouldUseAssetPackPtrr,
} from '../../runtime-inference-policy';

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

export const ReadFitsFindingSynthesisAssetPackSynthesisAgent = factoryAgentWithPTRR<
  z.infer<typeof AssetPackSynthesisInputSchema>,
  z.infer<typeof AssetPackSynthesisOutputSchema>
>({
  name: 'ReadFitsFindingSynthesisAssetPackSynthesisAgent',
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

export default async function runReadFitsFindingSynthesisAssetPackSynthesisAgent(input: any, execution: any) {
  const storedReadRequest = findExecutionValue(execution, 'read', 'request');
  const storedPipelineInput = findExecutionValue(execution, 'pipeline', 'input');
  const read =
    input?.read ??
    input?.definitionOfRead ??
    storedPipelineInput?.read ??
    storedPipelineInput?.definitionOfRead ??
    storedReadRequest?.prompt ??
    execution?.get?.('read', 'description') ??
    execution?.findUp?.('read', 'description') ??
    execution?.findUp?.('pipeline', 'expressedRead') ??
    '';
  const deliveryMechanismTemplate =
    execution?.get?.('pipeline', 'deliveryMechanismTemplate') ??
    execution?.findUp?.('pipeline', 'deliveryMechanismTemplate') ??
    storedPipelineInput?.deliveryMechanismTemplate;
  const result = isAssetPackBoundedRealInferenceProfile()
    ? await runBoundedAssetPackSynthesis(input, execution, read, deliveryMechanismTemplate)
    : shouldUseAssetPackPtrr('BITCODE_ASSET_PACK_SYNTHESIS_USE_PTRR')
      ? await ReadFitsFindingSynthesisAssetPackSynthesisAgent(
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

async function runBoundedAssetPackSynthesis(
  input: any,
  execution: any,
  read: string,
  deliveryMechanismTemplate: string | undefined
) {
  const baseline = buildDeterministicAssetPackSynthesis(input, execution, read, deliveryMechanismTemplate);
  const fitResult = resolveFitResult(input, execution);
  const sourceRevision = resolveSourceRevision(input, execution);
  const inferred = await runBoundedStructuredInference({
    agentName: 'ReadFitsFindingSynthesisAssetPackSynthesisAgent',
    phase: 'implementation',
    step: 'synthesis',
    execution,
    schema: AssetPackSynthesisOutputSchema,
    fallback: () => baseline,
    promptTemplate: {
      templateId: 'ReadFitsFindingSynthesis.prompt.asset-pack-synthesis',
      system: [
        'You are the Bitcode AssetPack synthesis agent.',
        'Synthesize one Read-satisfaction AssetPack from source-bound depository fit evidence.',
        'Do not invent files, external proof, pull requests, BTC broadcasts, or ledger settlement.',
        'Return only typed JSON that can be validated and finished by the pipeline.',
      ].join('\n'),
      user: JSON.stringify({
        requestedShape: '{{requestedShape}}',
        read: '{{read}}',
        deliveryMechanismTemplate: '{{deliveryMechanismTemplate}}',
        sourceRevision: '{{sourceRevision}}',
        fitResult: '{{fitResult}}',
        baselineProofEvidence: '{{baselineProofEvidence}}',
      }, null, 2),
    },
    systemPrompt: [
      'You are the Bitcode AssetPack synthesis agent.',
      'Synthesize one Read-satisfaction AssetPack from source-bound depository fit evidence.',
      'Do not invent files, external proof, pull requests, BTC broadcasts, or ledger settlement.',
      'Return only typed JSON that can be validated and finished by the pipeline.',
    ].join('\n'),
    userPrompt: JSON.stringify({
      requestedShape: {
        success: true,
        semanticKind: 'asset-pack-written-asset',
        writtenAssetType: AssetPackWrittenAssetType.ReadSatisfactionAssetPack,
        summary: 'string',
        assetPackSynthesisArtifacts: {
          summary: 'string',
          fileChanges: 'object optional',
          proofEvidence: ['string'],
          reviewNotes: ['string'],
        },
        writtenAssets: {
          summary: 'string',
          proofEvidence: ['string'],
          reviewNotes: ['string'],
        },
        assetPack: {
          read: 'string',
          writtenAssetType: AssetPackWrittenAssetType.ReadSatisfactionAssetPack,
          deliveryMechanismTemplate: 'string',
          proofEvidence: ['string'],
        },
      },
      read,
      deliveryMechanismTemplate,
      sourceRevision,
      fitResult: compactFitResult(fitResult),
      baselineProofEvidence: baseline.assetPack.proofEvidence,
    }, null, 2),
  });

  return normalizeBoundedSynthesis(inferred, baseline, read, deliveryMechanismTemplate);
}

function buildDeterministicAssetPackSynthesis(
  input: any,
  execution: any,
  read: string,
  deliveryMechanismTemplate: string | undefined
) {
  const storedPipelineInput = findExecutionValue(execution, 'pipeline', 'input');
  const storedSourceRevision = findExecutionValue(execution, 'harness', 'sourceRevision');
  const storedReadRequest = findExecutionValue(execution, 'read', 'request');
  const fitResult =
    input?.fitResult ??
    input?.depositorySearchResult ??
    storedPipelineInput?.fitResult ??
    storedPipelineInput?.depositorySearchResult ??
    findExecutionValue(execution, 'fit', 'result') ??
    findExecutionValue(execution, 'depository/search', 'result') ??
    {};
  const fitDepositAssetIds = Array.isArray(fitResult?.fitDepositAssetIds)
    ? fitResult.fitDepositAssetIds
    : Array.isArray(fitResult?.selectedCandidateAssetIds)
      ? fitResult.selectedCandidateAssetIds
      : [];
  const repository =
    input?.repository ??
    input?.sourceRevision ??
    storedPipelineInput?.repository ??
    storedPipelineInput?.sourceRevision ??
    storedSourceRevision ??
    {};
  const repositoryLabel = [
    repository.repositoryFullName ?? repository.fullName ?? storedReadRequest?.repositoryFullName ?? 'unknown repository',
    repository.branch ?? 'unknown branch',
    repository.commit ?? 'unknown commit'
  ].join('@');
  const proofEvidence = [
    `Read: ${read}`,
    `Repository revision: ${repositoryLabel}`,
    `Fit result: ${fitResult?.resultState ?? 'not-yet-classified'}`,
    `Fit deposit assets: ${fitDepositAssetIds.join(', ') || 'none'}`,
    `Query root: ${fitResult?.queryRoot ?? 'not recorded'}`,
    `Ranking root: ${fitResult?.rankingRoot ?? 'not recorded'}`,
    `Embedding policy: ${fitResult?.embeddingPolicy?.provider ?? 'unknown'} ${fitResult?.embeddingPolicy?.model ?? ''}`.trim()
  ];
  const summary = [
    'Source-bound Read-satisfaction AssetPack synthesized by the staging pipeline.',
    `The pack binds the admitted Read to ${repositoryLabel}.`,
    `Finding Fits posture: ${fitResult?.resultState ?? 'not-yet-classified'} with ${fitDepositAssetIds.length} qualifying fit deposit(s).`,
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
        'QA overlay runs remain blocked for source-revision settlement until deployed cleanly.'
      ]
    },
    writtenAssets: {
      summary,
      proofEvidence,
      reviewNotes: [
        'Finding Fits deposit evidence carried forward for validation and finish.'
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

function normalizeBoundedSynthesis(
  inferred: any,
  baseline: any,
  read: string,
  deliveryMechanismTemplate: string | undefined
) {
  const assetPackSynthesisArtifacts = normalizeArtifacts(
    inferred?.assetPackSynthesisArtifacts,
    baseline.assetPackSynthesisArtifacts
  );
  const writtenAssets = normalizeArtifacts(
    inferred?.writtenAssets,
    baseline.writtenAssets ?? assetPackSynthesisArtifacts
  );
  const proofEvidence = normalizeStringArray(
    inferred?.assetPack?.proofEvidence,
    baseline.assetPack.proofEvidence ?? assetPackSynthesisArtifacts.proofEvidence ?? []
  );

  return {
    ...baseline,
    ...inferred,
    success: inferred?.success ?? true,
    semanticKind: 'asset-pack-written-asset' as const,
    writtenAssetType: AssetPackWrittenAssetType.ReadSatisfactionAssetPack,
    summary: normalizeText(inferred?.summary) || baseline.summary,
    assetPackSynthesisArtifacts,
    writtenAssets,
    assetPack: {
      ...(baseline.assetPack || {}),
      ...(inferred?.assetPack || {}),
      read,
      writtenAssetType: AssetPackWrittenAssetType.ReadSatisfactionAssetPack,
      deliveryMechanismTemplate,
      proofEvidence,
    },
  };
}

function normalizeArtifacts(inferred: any, baseline: any) {
  return {
    ...baseline,
    ...(inferred || {}),
    summary: normalizeText(inferred?.summary) || baseline.summary,
    proofEvidence: normalizeStringArray(inferred?.proofEvidence, baseline.proofEvidence ?? []),
    reviewNotes: normalizeStringArray(inferred?.reviewNotes, baseline.reviewNotes ?? []),
  };
}

function normalizeStringArray(value: unknown, fallback: string[]): string[] {
  if (Array.isArray(value)) {
    const normalized = value
      .map((entry) => normalizeText(entry))
      .filter(Boolean);
    if (normalized.length) return normalized;
  }
  return fallback;
}

function normalizeText(value: unknown): string {
  if (typeof value === 'string') return value.trim();
  if (Array.isArray(value)) return value.filter((entry) => typeof entry === 'string').join('\n').trim();
  return '';
}

function resolveFitResult(input: any, execution: any) {
  const storedPipelineInput = findExecutionValue(execution, 'pipeline', 'input');
  return (
    input?.fitResult ??
    input?.depositorySearchResult ??
    storedPipelineInput?.fitResult ??
    storedPipelineInput?.depositorySearchResult ??
    findExecutionValue(execution, 'fit', 'result') ??
    findExecutionValue(execution, 'depository/search', 'result') ??
    {}
  );
}

function resolveSourceRevision(input: any, execution: any) {
  const storedPipelineInput = findExecutionValue(execution, 'pipeline', 'input');
  return (
    input?.sourceRevision ??
    input?.repository ??
    storedPipelineInput?.sourceRevision ??
    storedPipelineInput?.repository ??
    findExecutionValue(execution, 'harness', 'sourceRevision') ??
    {}
  );
}

function compactFitResult(fitResult: any) {
  if (!fitResult || typeof fitResult !== 'object') return undefined;
  return {
    resultState: fitResult.resultState,
    resultReasons: fitResult.resultReasons,
    fitDepositAssetIds: fitResult.fitDepositAssetIds || fitResult.selectedCandidateAssetIds,
    selectedCandidateAssetIds: fitResult.selectedCandidateAssetIds,
    searchedAssetCount: fitResult.searchedAssetCount,
    queryRoot: fitResult.queryRoot,
    rankingRoot: fitResult.rankingRoot,
    embeddingPolicy: fitResult.embeddingPolicy,
    selectedCandidates: Array.isArray(fitResult.selectedCandidates)
      ? fitResult.selectedCandidates.map((candidate: any) => ({
        assetId: candidate.assetId,
        title: candidate.title,
        useTier: candidate.useTier,
        verification: candidate.verification,
        ranking: candidate.ranking,
        proofEvidence: candidate.proofEvidence,
        measurementEvidence: candidate.measurementEvidence,
        readbackEvidence: candidate.readbackEvidence,
      }))
      : undefined,
  };
}

function findExecutionValue(execution: any, namespace: string, key: string): any {
  const localValue = execution?.get?.(namespace, key);
  if (localValue !== undefined) return localValue;

  const upwardValue = execution?.findUp?.(namespace, key);
  if (upwardValue !== undefined) return upwardValue;

  return findExecutionValueDown(execution?.getRoot?.() || execution, namespace, key);
}

function findExecutionValueDown(node: any, namespace: string, key: string): any {
  if (!node) return undefined;
  const value = node.get?.(namespace, key);
  if (value !== undefined) return value;
  for (const child of node.children?.values?.() || []) {
    const childValue = findExecutionValueDown(child, namespace, key);
    if (childValue !== undefined) return childValue;
  }
  return undefined;
}
