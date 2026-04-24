import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define refine optimization for Create Code Change agent with execution state awareness"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "refine_context_utilization", "test": "Does refine optimization maximize context value?", "score": 0.38 },
 *   { "name": "refine_state_preservation", "test": "Does refine optimization maintain execution continuity?", "score": 0.37 },
 *   { "name": "refine_intelligence_accumulation", "test": "Does refine optimization build on accumulated wisdom?", "score": 0.36 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_CREATECODECHANGE_REFINE_OPTIMIZATION: PromptPart = 
  'Refine PR by leveraging execution insights: enhance description with discovered patterns, strengthen rationale with validation data, improve clarity using comprehension results, optimize reviewer guidance with complexity metrics, adjust merge criteria based on risk assessment, enrich context with implementation learnings' as PromptPart;