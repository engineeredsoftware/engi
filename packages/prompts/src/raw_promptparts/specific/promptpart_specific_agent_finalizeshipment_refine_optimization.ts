import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define refine optimization for Finalize Shipment agent with execution state awareness"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "refine_context_utilization", "test": "Does refine optimization maximize context value?", "score": 0.38 },
 *   { "name": "refine_state_preservation", "test": "Does refine optimization maintain execution continuity?", "score": 0.37 },
 *   { "name": "refine_intelligence_accumulation", "test": "Does refine optimization build on accumulated wisdom?", "score": 0.36 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_FINALIZESHIPMENT_REFINE_OPTIMIZATION: PromptPart = 
  'Refine finalization leveraging pipeline wisdom: optimize deployment sequence from patterns, enhance monitoring with discovered metrics, improve documentation with execution insights, strengthen rollback with checkpoint data, enrich announcement with value delivered, preserve learnings for future pipelines' as PromptPart;