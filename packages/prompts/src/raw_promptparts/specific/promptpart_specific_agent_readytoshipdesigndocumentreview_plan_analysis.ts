import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define plan analysis for Ready to Ship Design Document Review agent"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "plan_effectiveness", "test": "Does plan analysis ensure production quality?", "score": 0.38 },
 *   { "name": "plan_reliability", "test": "Is plan analysis consistently reliable?", "score": 0.37 },
 *   { "name": "plan_completeness", "test": "Does plan analysis cover edge cases?", "score": 0.36 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_READYTOSHIPDESIGNDOCUMENTREVIEW_PLAN_ANALYSIS: PromptPart = 
  'Analyze review status to identify: coverage gaps, unaddressed feedback, consensus blockers, unresolved issues, open discussions, quality deficiencies' as PromptPart;