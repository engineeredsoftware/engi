import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define plan analysis for Ready to Ship Code Change Review agent"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "plan_effectiveness", "test": "Does plan analysis ensure production quality?", "score": 0.38 },
 *   { "name": "plan_reliability", "test": "Is plan analysis consistently reliable?", "score": 0.37 },
 *   { "name": "plan_completeness", "test": "Does plan analysis cover edge cases?", "score": 0.36 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_READYTOSHIPCODECHANGEREVIEW_PLAN_ANALYSIS: PromptPart = 
  'Analyze review status to identify: unresolved feedback, pending approvals, open discussions, merge conflicts, CI/CD failures, authorization blockers' as PromptPart;