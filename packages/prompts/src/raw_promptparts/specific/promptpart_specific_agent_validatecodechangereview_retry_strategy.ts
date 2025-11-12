import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define retry strategy for Validate Code Change Review agent"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "retry_effectiveness", "test": "Does retry strategy ensure production quality?", "score": 0.34 },
 *   { "name": "retry_reliability", "test": "Is retry strategy consistently reliable?", "score": 0.33 },
 *   { "name": "retry_completeness", "test": "Does retry strategy cover edge cases?", "score": 0.32 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_VALIDATECODECHANGEREVIEW_RETRY_STRATEGY: PromptPart = 
  'Implement recovery strategies including: manual review sampling, expert validation escalation, statistical approximation, partial validation acceptance, consensus building, iterative refinement' as PromptPart;