import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define plan analysis for Validate Design Document Review agent"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "plan_effectiveness", "test": "Does plan analysis ensure quality?", "score": 0.37 },
 *   { "name": "plan_reliability", "test": "Is plan analysis reliable?", "score": 0.36 },
 *   { "name": "plan_completeness", "test": "Does plan analysis cover all cases?", "score": 0.35 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_VALIDATEDESIGNDOCUMENTREVIEW_PLAN_ANALYSIS: PromptPart = 
  'Analyze design review to identify: stakeholder participation gaps, feedback quality variations, unaddressed concerns, technical accuracy issues, engagement patterns, resolution bottlenecks' as PromptPart;