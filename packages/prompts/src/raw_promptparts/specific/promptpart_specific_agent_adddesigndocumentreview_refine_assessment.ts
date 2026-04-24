import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode AssetPack implementation PromptPart for design-review written-asset synthesis: refine assessment"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "refine_context_utilization", "test": "Does refine assessment maximize context value?", "score": 0.37 },
 *   { "name": "refine_state_preservation", "test": "Does refine assessment maintain execution continuity?", "score": 0.36 },
 *   { "name": "refine_intelligence_accumulation", "test": "Does refine assessment build on accumulated wisdom?", "score": 0.35 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_ADDDESIGNDOCUMENTREVIEW_REFINE_ASSESSMENT: PromptPart = 
  'Assess design-review written asset quality against Need criteria, design-document coverage, technical accuracy, risk evidence, actionability, and proof obligations' as PromptPart;
