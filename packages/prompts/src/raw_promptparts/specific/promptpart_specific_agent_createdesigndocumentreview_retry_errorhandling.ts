import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define retry errorhandling for Create Design Document Review agent"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "retry_effectiveness", "test": "Does retry errorhandling enable effective execution?", "score": 0.31 },
 *   { "name": "retry_precision", "test": "Is retry errorhandling precisely defined?", "score": 0.30 },
 *   { "name": "retry_completeness", "test": "Is retry errorhandling comprehensive?", "score": 0.29 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_CREATEDESIGNDOCUMENTREVIEW_RETRY_ERRORHANDLING: PromptPart = 
  'Handle comment failures through: API retry mechanisms, rate limit handling, permission verification, size limitation management, format correction, thread recovery procedures' as PromptPart;