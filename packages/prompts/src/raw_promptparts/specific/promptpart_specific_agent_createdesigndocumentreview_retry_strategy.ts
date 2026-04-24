import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define retry strategy for Create Design Document Review agent"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "retry_effectiveness", "test": "Does retry strategy enable effective execution?", "score": 0.32 },
 *   { "name": "retry_precision", "test": "Is retry strategy precisely defined?", "score": 0.31 },
 *   { "name": "retry_completeness", "test": "Is retry strategy comprehensive?", "score": 0.30 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_CREATEDESIGNDOCUMENTREVIEW_RETRY_STRATEGY: PromptPart = 
  'Implement recovery strategies including: feedback restructuring, tone adjustment, example enhancement, clarification expansion, collaborative reframing, incremental posting' as PromptPart;