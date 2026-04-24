import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define retry strategy for Plan Implementation agent"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "retry_effectiveness", "test": "Is retry strategy effective?", "score": 0.30 },
 *   { "name": "retry_clarity", "test": "Is retry strategy clear?", "score": 0.29 },
 *   { "name": "retry_completeness", "test": "Is retry strategy complete?", "score": 0.28 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_PLANIMPLEMENTATION_RETRY_STRATEGY: PromptPart = 
  'Implement recovery strategies including: plan simplification, scope adjustment, alternative architectures, risk mitigation fallbacks, resource reallocation, timeline extension' as PromptPart;