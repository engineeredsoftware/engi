import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define retry strategy for Validate Design Document Review agent"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "retry_effectiveness", "test": "Does retry strategy ensure quality?", "score": 0.33 },
 *   { "name": "retry_reliability", "test": "Is retry strategy reliable?", "score": 0.32 },
 *   { "name": "retry_completeness", "test": "Does retry strategy cover all cases?", "score": 0.31 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_VALIDATEDESIGNDOCUMENTREVIEW_RETRY_STRATEGY: PromptPart = 
  'Implement recovery strategies including: manual sampling of reviews, stakeholder re-engagement, quality baseline adjustment, partial validation acceptance, consensus building facilitation, incremental improvement tracking' as PromptPart;