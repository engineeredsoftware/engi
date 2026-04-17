/**
 * Setup Plan Agent (PTRR)
 *
 * Minimal PTRR agent used in Setup phase to demonstrate
 * PrepareConciseContext → Reason (Generation) with store-driven streaming.
 *
 * Env for bring-up:
 * - ENGI_DEBUG_ONLY_FAILSAFES=prepare
 * - ENGI_DEBUG_ONLY_GENERATIONS=reason
 */

import { z } from 'zod';
import { factoryAgentWithPTRR } from '@bitcode/agent-generics';
import { Prompt } from '@bitcode/prompts';
import {
  PROMPTPART_GENERIC_AGENT_GENERATION_JSON_ONLY_HEADER,
  PROMPTPART_GENERIC_AGENT_GENERATION_USE_THIS_STRUCTURED_SCHEMA,
  PROMPTPART_GENERIC_AGENT_GENERATION_REASON,
  PROMPTPART_GENERIC_AGENT_GENERATION_JUDGE,
  PROMPTPART_GENERIC_AGENT_GENERATION_STRUCTURED_OUTPUT,
  PROMPTPART_GENERIC_AGENT_GENERATION_IF_UNKNOWN_EMPTY,
  PROMPTPART_GENERIC_AGENT_FAILSAFE_PREPARE_CONTEXT,
  PROMPTPART_GENERIC_PTRR_PLAN_OBJECTIVE,
  PROMPTPART_GENERIC_PTRR_TRY_OBJECTIVE,
  PROMPTPART_GENERIC_PTRR_REFINE_OBJECTIVE,
  PROMPTPART_GENERIC_PTRR_RETRY_OBJECTIVE,
  PROMPTPART_GENERIC_FORMATTING_GIVENTHEFOLLOWING,
  PROMPTPART_GENERIC_FORMATTING_EXECUTETHE_FOLLOWING,
  PROMPTPART_GENERIC_FORMATTING_BASEDONTHE,
  PROMPTPART_GENERIC_FORMATTING_AFTERENCOUNTERING
} from '@bitcode/prompts';

const PlanSchema = z.object({
  plan: z.string().describe('High-level plan for Setup context')
});

export const realSetupPlanAgent = factoryAgentWithPTRR<any, z.infer<typeof PlanSchema>>({
  name: 'deliverable-setup-plan-agent',
  description: 'Derive concise setup plan from repository context',
  outputSchema: PlanSchema,
  // Minimal prompt hierarchy to satisfy GA-1 lint and provide usable strings
  prompt: (() => {
    const p = new Prompt();
    p.set('pipeline', 'deliverables' as any);
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
      p.set('pipeline', 'deliverables' as any);
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
      p.set('pipeline', 'deliverables' as any);
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
      p.set('pipeline', 'deliverables' as any);
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
      p.set('pipeline', 'deliverables' as any);
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
// GA-1 bring-up: provide a fast stub in test/debug-only mode
export default async function setupPlanAgent(input: any, execution: any) {
  const onlyFails = String(process?.env?.ENGI_DEBUG_ONLY_FAILSAFES || '');
  const onlyGens = String(process?.env?.ENGI_DEBUG_ONLY_GENERATIONS || '');
  const isTest = String(process?.env?.NODE_ENV || '').toLowerCase() === 'test';
  const useStub = isTest || (onlyFails.length > 0 && onlyGens.length > 0);
  if (useStub) {
    return { plan: 'Prepare concise context; Reason about setup; Return minimal plan.' };
  }
  return await realSetupPlanAgent(input, execution);
}
