import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define plan analysis for Validate Design Document agent"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "plan_effectiveness", "test": "Does plan analysis ensure production quality?", "score": 0.38 },
 *   { "name": "plan_reliability", "test": "Is plan analysis consistently reliable?", "score": 0.37 },
 *   { "name": "plan_completeness", "test": "Does plan analysis cover edge cases?", "score": 0.36 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_VALIDATEDESIGNDOCUMENT_PLAN_ANALYSIS: PromptPart = 
  'Analyze document to identify: structural gaps, ambiguous requirements, technical inconsistencies, feasibility concerns, traceability breaks, formatting violations' as PromptPart;