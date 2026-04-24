import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode AssetPack implementation PromptPart for design-review written-asset synthesis: try directives"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "try_context_utilization", "test": "Does try execution maximize context value?", "score": 0.39 },
 *   { "name": "try_state_preservation", "test": "Does try execution maintain execution continuity?", "score": 0.38 },
 *   { "name": "try_intelligence_accumulation", "test": "Does try execution build on accumulated wisdom?", "score": 0.37 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_ADDDESIGNDOCUMENTREVIEW_TRY_DIRECTIVES: PromptPart = 
  'Produce the design-review written asset with assessment, strengths, weaknesses, risks, blockers, suggested improvements, proof notes, and delivery-ready review body metadata' as PromptPart;
