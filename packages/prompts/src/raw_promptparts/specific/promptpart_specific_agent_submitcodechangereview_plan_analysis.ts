import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define plan analysis for Submit Code Change Review agent with execution state awareness"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "plan_context_utilization", "test": "Does plan analysis maximize context value?", "score": 0.40 },
 *   { "name": "plan_state_preservation", "test": "Does plan analysis maintain execution continuity?", "score": 0.39 },
 *   { "name": "plan_intelligence_accumulation", "test": "Does plan analysis build on accumulated wisdom?", "score": 0.38 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_SUBMITCODECHANGEREVIEW_PLAN_ANALYSIS: PromptPart = 
  'Analyze review context to extract: issue patterns from validation results, improvement opportunities from quality metrics, architectural concerns from impact analysis, performance insights from benchmarks, security findings from scans, best practices from codebase patterns' as PromptPart;