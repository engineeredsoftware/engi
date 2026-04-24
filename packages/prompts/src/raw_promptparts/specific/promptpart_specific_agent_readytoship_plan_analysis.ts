import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define plan analysis for Ready to Ship agent"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "plan_effectiveness", "test": "Does plan analysis ensure production quality?", "score": 0.38 },
 *   { "name": "plan_reliability", "test": "Is plan analysis consistently reliable?", "score": 0.37 },
 *   { "name": "plan_completeness", "test": "Does plan analysis cover edge cases?", "score": 0.36 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_READYTOSHIP_PLAN_ANALYSIS: PromptPart = 
  'Analyze shipping context to identify: validation status across phases, written-asset integrity, need-satisfaction risk, delivery-mechanism dependencies, operational gaps, rollback limitations, and decision factors' as PromptPart;
