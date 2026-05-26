/**
 * Setup Plan Agent (PTRR)
 *
 * Minimal PTRR agent used in Setup phase to derive a concise plan for the
 * expressed read and AssetPack written-asset synthesis corridor.
 *
 * Env for bring-up:
 * - BITCODE_DEBUG_ONLY_FAILSAFES=prepare
 * - BITCODE_DEBUG_ONLY_GENERATIONS=reason
 */

import { z } from 'zod';
import { factoryAgentWithPTRR } from '@bitcode/agent-generics';
import { Prompt } from '@bitcode/prompts/prompt';
import { PROMPTPART_GENERIC_AGENT_GENERATION_JSON_ONLY_HEADER } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_json_only_header';
import { PROMPTPART_GENERIC_AGENT_GENERATION_USE_THIS_STRUCTURED_SCHEMA } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_use_this_structured_schema';
import { PROMPTPART_GENERIC_AGENT_GENERATION_REASON } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_reason';
import { PROMPTPART_GENERIC_AGENT_GENERATION_JUDGE } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_judge';
import { PROMPTPART_GENERIC_AGENT_GENERATION_STRUCTURED_OUTPUT } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_structured_output';
import { PROMPTPART_GENERIC_AGENT_GENERATION_IF_UNKNOWN_EMPTY } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_if_unknown_empty';
import { PROMPTPART_GENERIC_AGENT_FAILSAFE_PREPARE_CONTEXT } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_failsafe_prepare_context';
import { PROMPTPART_GENERIC_PTRR_PLAN_OBJECTIVE } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_ptrr_plan_objective';
import { PROMPTPART_GENERIC_PTRR_TRY_OBJECTIVE } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_ptrr_try_objective';
import { PROMPTPART_GENERIC_PTRR_REFINE_OBJECTIVE } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_ptrr_refine_objective';
import { PROMPTPART_GENERIC_PTRR_RETRY_OBJECTIVE } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_ptrr_retry_objective';
import { PROMPTPART_GENERIC_FORMATTING_GIVENTHEFOLLOWING } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_formatting_giventhefollowing';
import { PROMPTPART_GENERIC_FORMATTING_EXECUTETHE_FOLLOWING } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_formatting_executethe_following';
import { PROMPTPART_GENERIC_FORMATTING_BASEDONTHE } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_formatting_basedonthe';
import { PROMPTPART_GENERIC_FORMATTING_AFTERENCOUNTERING } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_formatting_afterencountering';
import { runBoundedStructuredInference } from '../../bounded-structured-inference';
import {
  isAssetPackBoundedRealInferenceProfile,
  shouldUseAssetPackPtrr,
} from '../../runtime-inference-policy';

const PlanSchema = z.object({
  plan: z.string().describe('High-level plan for Setup context')
});

export const ReadFitsFindingSynthesisSetupPlanAgent = factoryAgentWithPTRR<any, z.infer<typeof PlanSchema>>({
  name: 'ReadFitsFindingSynthesisSetupPlanAgent',
  description: 'Derive concise setup plan from repository context and expressed read',
  outputSchema: PlanSchema,
  // Minimal prompt hierarchy to satisfy lint and provide usable strings.
  prompt: (() => {
    const p = new Prompt();
    p.set('pipeline', 'asset-pack' as any);
    p.set('phase', 'setup' as any);
    p.set('generation:json_only_header', PROMPTPART_GENERIC_AGENT_GENERATION_JSON_ONLY_HEADER as any);
    p.set('generation:use_this_structure', PROMPTPART_GENERIC_AGENT_GENERATION_USE_THIS_STRUCTURED_SCHEMA as any);
    p.set('generation:reason', PROMPTPART_GENERIC_AGENT_GENERATION_REASON as any);
    p.set('generation:judge', PROMPTPART_GENERIC_AGENT_GENERATION_JUDGE as any);
    p.set('generation:structured_output', PROMPTPART_GENERIC_AGENT_GENERATION_STRUCTURED_OUTPUT as any);
    p.set('failsafe:prepare_context', PROMPTPART_GENERIC_AGENT_FAILSAFE_PREPARE_CONTEXT as any);
    return p;
  })(),
  stepPrompts: {
    plan: () => {
      const p = new Prompt();
      p.set('pipeline', 'asset-pack' as any);
      p.set('phase', 'setup' as any);
      p.set('context_lead', PROMPTPART_GENERIC_FORMATTING_GIVENTHEFOLLOWING);
      p.set('objective', PROMPTPART_GENERIC_PTRR_PLAN_OBJECTIVE);
      p.set('generation:json_only_header', PROMPTPART_GENERIC_AGENT_GENERATION_JSON_ONLY_HEADER as any);
      p.set('generation:use_this_structure', PROMPTPART_GENERIC_AGENT_GENERATION_USE_THIS_STRUCTURED_SCHEMA as any);
      p.set('generation:reason', PROMPTPART_GENERIC_AGENT_GENERATION_REASON as any);
      p.set('generation:judge', PROMPTPART_GENERIC_AGENT_GENERATION_JUDGE as any);
      p.set('generation:structured_output', PROMPTPART_GENERIC_AGENT_GENERATION_STRUCTURED_OUTPUT as any);
      p.set('failsafe:prepare_context', PROMPTPART_GENERIC_AGENT_FAILSAFE_PREPARE_CONTEXT as any);
      return p;
    },
    try: () => {
      const p = new Prompt();
      p.set('pipeline', 'asset-pack' as any);
      p.set('phase', 'setup' as any);
      p.set('directive', PROMPTPART_GENERIC_FORMATTING_EXECUTETHE_FOLLOWING);
      p.set('objective', PROMPTPART_GENERIC_PTRR_TRY_OBJECTIVE);
      p.set('generation:json_only_header', PROMPTPART_GENERIC_AGENT_GENERATION_JSON_ONLY_HEADER as any);
      p.set('generation:use_this_structure', PROMPTPART_GENERIC_AGENT_GENERATION_USE_THIS_STRUCTURED_SCHEMA as any);
      p.set('generation:if_unknown_empty', PROMPTPART_GENERIC_AGENT_GENERATION_IF_UNKNOWN_EMPTY as any);
      p.set('generation:reason', PROMPTPART_GENERIC_AGENT_GENERATION_REASON as any);
      p.set('generation:judge', PROMPTPART_GENERIC_AGENT_GENERATION_JUDGE as any);
      p.set('generation:structured_output', PROMPTPART_GENERIC_AGENT_GENERATION_STRUCTURED_OUTPUT as any);
      p.set('failsafe:prepare_context', PROMPTPART_GENERIC_AGENT_FAILSAFE_PREPARE_CONTEXT as any);
      return p;
    },
    refine: () => {
      const p = new Prompt();
      p.set('pipeline', 'asset-pack' as any);
      p.set('phase', 'setup' as any);
      p.set('context_lead', PROMPTPART_GENERIC_FORMATTING_BASEDONTHE);
      p.set('objective', PROMPTPART_GENERIC_PTRR_REFINE_OBJECTIVE);
      p.set('generation:json_only_header', PROMPTPART_GENERIC_AGENT_GENERATION_JSON_ONLY_HEADER as any);
      p.set('generation:use_this_structure', PROMPTPART_GENERIC_AGENT_GENERATION_USE_THIS_STRUCTURED_SCHEMA as any);
      p.set('generation:reason', PROMPTPART_GENERIC_AGENT_GENERATION_REASON as any);
      p.set('generation:judge', PROMPTPART_GENERIC_AGENT_GENERATION_JUDGE as any);
      p.set('generation:structured_output', PROMPTPART_GENERIC_AGENT_GENERATION_STRUCTURED_OUTPUT as any);
      p.set('failsafe:prepare_context', PROMPTPART_GENERIC_AGENT_FAILSAFE_PREPARE_CONTEXT as any);
      return p;
    },
    retry: () => {
      const p = new Prompt();
      p.set('pipeline', 'asset-pack' as any);
      p.set('phase', 'setup' as any);
      p.set('context_lead', PROMPTPART_GENERIC_FORMATTING_AFTERENCOUNTERING);
      p.set('objective', PROMPTPART_GENERIC_PTRR_RETRY_OBJECTIVE);
      p.set('generation:json_only_header', PROMPTPART_GENERIC_AGENT_GENERATION_JSON_ONLY_HEADER as any);
      p.set('generation:use_this_structure', PROMPTPART_GENERIC_AGENT_GENERATION_USE_THIS_STRUCTURED_SCHEMA as any);
      p.set('generation:if_unknown_empty', PROMPTPART_GENERIC_AGENT_GENERATION_IF_UNKNOWN_EMPTY as any);
      p.set('generation:reason', PROMPTPART_GENERIC_AGENT_GENERATION_REASON as any);
      p.set('generation:judge', PROMPTPART_GENERIC_AGENT_GENERATION_JUDGE as any);
      p.set('generation:structured_output', PROMPTPART_GENERIC_AGENT_GENERATION_STRUCTURED_OUTPUT as any);
      p.set('failsafe:prepare_context', PROMPTPART_GENERIC_AGENT_FAILSAFE_PREPARE_CONTEXT as any);
      return p;
    }
  },
  plan: { },
  try: { },
  refine: { },
  retry: { }
});
// Bring-up path: provide a fast stub in test/debug-only mode.
export default async function runReadFitsFindingSynthesisSetupPlanAgent(input: any, execution: any) {
  const shouldUsePtrr = shouldUseAssetPackPtrr('BITCODE_ASSET_PACK_SETUP_PLAN_USE_PTRR');
  if (!shouldUsePtrr && isAssetPackBoundedRealInferenceProfile()) {
    const baseline = buildDeterministicSetupPlan(input, execution);
    const inferred = await runBoundedStructuredInference({
      agentName: 'ReadFitsFindingSynthesisSetupPlanAgent',
      phase: 'setup',
      step: 'setup-plan',
      execution,
      schema: PlanSchema,
      fallback: () => baseline,
      promptTemplate: {
        templateId: 'ReadFitsFindingSynthesis.prompt.setup-plan',
        system: [
          'You are the ReadFitsFindingSynthesis setup-plan agent.',
          'Produce one concise source-bound plan for Finding Fits from an accepted Read-Need through many-candidate Depository search, ranking, AssetPack synthesis context, source-safe preview, and settlement readiness.',
          'Preserve repository/source revision constraints, accepted Need identity, query/ranking/provenance roots when present, and the distinction between fit deposits and source-bearing AssetPack delivery.',
          'Do not claim settlement, delivery, BTC finality, BTD rights transfer, or protected source visibility before later phases validate, settle, and finish.',
          'Respond only with JSON shaped as { "plan": string }.',
        ].join('\n'),
        user: JSON.stringify({
          acceptedReadNeed: '{{acceptedReadNeed}}',
          read: '{{read}}',
          repository: '{{repository}}',
          sourceRevision: '{{sourceRevision}}',
          fitResult: '{{fitResult}}',
          searchObjectives: '{{searchObjectives}}',
          baselinePlan: '{{baselinePlan}}',
        }, null, 2),
      },
      systemPrompt: [
        'You are the ReadFitsFindingSynthesis setup-plan agent.',
        'Produce one concise source-bound plan for Finding Fits from an accepted Read-Need through many-candidate Depository search, ranking, AssetPack synthesis context, source-safe preview, and settlement readiness.',
        'Preserve repository/source revision constraints, accepted Need identity, query/ranking/provenance roots when present, and the distinction between fit deposits and source-bearing AssetPack delivery.',
        'Do not claim settlement, delivery, BTC finality, BTD rights transfer, or protected source visibility before later phases validate, settle, and finish.',
        'Respond only with JSON shaped as { "plan": string }.',
      ].join('\n'),
      userPrompt: JSON.stringify({
        acceptedReadNeed: input?.acceptedReadNeed,
        read: input?.read ?? input?.definitionOfRead,
        repository: input?.repository ?? input?.sourceRevision,
        sourceRevision: input?.sourceRevision,
        fitResult: {
          resultState: input?.fitResult?.resultState ?? input?.depositorySearchResult?.resultState,
          selectedCandidateAssetIds:
            input?.fitResult?.selectedCandidateAssetIds ??
            input?.depositorySearchResult?.selectedCandidateAssetIds,
          fitDepositAssetIds:
            input?.fitResult?.fitDepositAssetIds ??
            input?.depositorySearchResult?.fitDepositAssetIds,
          queryRoot: input?.fitResult?.queryRoot ?? input?.depositorySearchResult?.queryRoot,
          rankingRoot: input?.fitResult?.rankingRoot ?? input?.depositorySearchResult?.rankingRoot,
          selectedFitProvenanceRoot:
            input?.fitResult?.selectedFitProvenanceRoot ??
            input?.depositorySearchResult?.searchReceipt?.selectedFitProvenanceRoot,
        },
        searchObjectives: [
          'derive multi-channel Depository queries from the accepted Need',
          'search for every candidate above threshold rather than the first fit',
          'rank candidates with source-safe proof, measurement, and readback evidence',
          'carry selected fit deposits into AssetPack synthesis without exposing unpaid source',
        ],
        baselinePlan: baseline.plan,
      }, null, 2),
    });
    const result = { plan: typeof inferred?.plan === 'string' && inferred.plan.trim() ? inferred.plan : baseline.plan };
    try {
      execution?.store?.('setup', 'plan', result.plan);
      execution?.store?.('setup/plan', 'result', result);
    } catch {}
    return result;
  }

  if (!shouldUsePtrr) {
    const result = buildDeterministicSetupPlan(input, execution);

    try {
      execution?.store?.('setup', 'plan', result.plan);
      execution?.store?.('setup/plan', 'result', result);
    } catch {}

    return result;
  }

  const onlyFails = String(process?.env?.BITCODE_DEBUG_ONLY_FAILSAFES || '');
  const onlyGens = String(process?.env?.BITCODE_DEBUG_ONLY_GENERATIONS || '');
  const isTest = String(process?.env?.NODE_ENV || '').toLowerCase() === 'test';
  const emitStubLifecycle =
    process?.env?.BITCODE_ENABLE_ASSET_PACK_SETUP_PHASE_RUNTIME_IN_TEST === '1';
  const useStub = isTest || (onlyFails.length > 0 && onlyGens.length > 0);
  if (useStub) {
    if (emitStubLifecycle) {
      try {
        execution?.store?.('agent:ReadFitsFindingSynthesisSetupPlanAgent', 'start', {
          phase: 'setup',
          agent: 'ReadFitsFindingSynthesisSetupPlanAgent',
          step: 'Plan'
        } as any);
      } catch {}
    }
    const result = { plan: 'Prepare concise context; Reason about setup; Return minimal plan.' };
    if (emitStubLifecycle) {
      try {
        execution?.store?.('agent:ReadFitsFindingSynthesisSetupPlanAgent', 'complete', {
          phase: 'setup',
          agent: 'ReadFitsFindingSynthesisSetupPlanAgent',
          step: 'Plan'
        } as any);
      } catch {}
    }
    return result;
  }
  return await ReadFitsFindingSynthesisSetupPlanAgent(input, execution);
}

function buildDeterministicSetupPlan(input: any, execution: any): z.infer<typeof PlanSchema> {
  const read =
    input?.read ??
    input?.definitionOfRead ??
    execution?.get?.('pipeline', 'expressedRead') ??
    execution?.get?.('read', 'description') ??
    'unspecified Bitcode Read';
  const repository =
    input?.repository?.fullName ??
    input?.sourceRevision?.repositoryFullName ??
    [
      execution?.get?.('repository', 'owner'),
      execution?.get?.('repository', 'name')
    ].filter(Boolean).join('/') ??
    'unknown repository';
  const branch =
    input?.repository?.branch ??
    input?.sourceRevision?.branch ??
    execution?.get?.('repository', 'branch') ??
    'unknown branch';
  const commit =
    input?.repository?.commit ??
    input?.sourceRevision?.commit ??
    execution?.get?.('repository', 'commit') ??
    'unknown commit';
  const fitState =
    input?.fitResult?.resultState ??
    input?.depositorySearchResult?.resultState ??
    'not-yet-classified';
  const selectedCandidates =
    input?.fitResult?.selectedCandidateAssetIds ??
    input?.depositorySearchResult?.selectedCandidateAssetIds ??
    [];
  const candidateText =
    Array.isArray(selectedCandidates) && selectedCandidates.length
      ? selectedCandidates.join(', ')
      : 'no selected candidate';
  const plan = [
    `Read: ${String(read)}`,
    `Repository: ${repository}@${branch}:${commit}`,
    `Fit state: ${fitState}; candidate assets: ${candidateText}.`,
    'Setup plan: preserve accepted Read-Need and source revision evidence, derive multi-channel Depository search, rank every candidate above threshold with query/ranking/provenance roots, synthesize one source-safe Read-satisfaction AssetPack only from selected fit deposits, validate proof and preview boundaries, then finish with auditable settlement and delivery evidence after payment unlock.'
  ].join('\n');

  return { plan };
}
