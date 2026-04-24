import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode AssetPack implementation PromptPart for design-review written-asset synthesis: refine optimization"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "refine_context_utilization", "test": "Does refine optimization maximize context value?", "score": 0.38 },
 *   { "name": "refine_state_preservation", "test": "Does refine optimization maintain execution continuity?", "score": 0.37 },
 *   { "name": "refine_intelligence_accumulation", "test": "Does refine optimization build on accumulated wisdom?", "score": 0.36 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_ADDDESIGNDOCUMENTREVIEW_REFINE_OPTIMIZATION: PromptPart = 
  'Improve review written-asset specificity, evidence traceability, risk prioritization, actionable recommendations, and delivery-mechanism readiness without selecting a destination' as PromptPart;
