import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define refine optimization for Submit Code Change Review agent with execution state awareness"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "refine_context_utilization", "test": "Does refine optimization maximize context value?", "score": 0.38 },
 *   { "name": "refine_state_preservation", "test": "Does refine optimization maintain execution continuity?", "score": 0.37 },
 *   { "name": "refine_intelligence_accumulation", "test": "Does refine optimization build on accumulated wisdom?", "score": 0.36 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_SUBMITCODECHANGEREVIEW_REFINE_OPTIMIZATION: PromptPart = 
  'Refine review using execution wisdom: enhance feedback specificity with discovered details, strengthen suggestions with validation evidence, improve actionability using implementation context, optimize organization based on importance metrics, adjust tone using collaboration patterns, enrich examples with codebase references' as PromptPart;