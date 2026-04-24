import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode AssetPack implementation PromptPart for design-document written-asset synthesis: try directives"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "try_context_utilization", "test": "Does try execution maximize context value?", "score": 0.39 },
 *   { "name": "try_state_preservation", "test": "Does try execution maintain execution continuity?", "score": 0.38 },
 *   { "name": "try_intelligence_accumulation", "test": "Does try execution build on accumulated wisdom?", "score": 0.37 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_CREATEDESIGNDOCUMENT_TRY_DIRECTIVES: PromptPart = 
  'Produce the design-document written asset with overview, background, proposed solution, implementation notes, validation plan, rollout and risk evidence, and metadata for later Finish delivery' as PromptPart;
