import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define try execution for Finalize Shipment agent with execution state awareness"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "try_context_utilization", "test": "Does try execution maximize context value?", "score": 0.39 },
 *   { "name": "try_state_preservation", "test": "Does try execution maintain execution continuity?", "score": 0.38 },
 *   { "name": "try_intelligence_accumulation", "test": "Does try execution build on accumulated wisdom?", "score": 0.37 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_FINALIZESHIPMENT_TRY_DIRECTIVES: PromptPart = 
  'Execute finalization with full context orchestration: trigger deployment using validation confirmations, coordinate release with accumulated approvals, document deployment with execution history, activate monitoring from established baselines, announce release with context summary, confirm success using acceptance criteria, archive pipeline intelligence for future reference' as PromptPart;