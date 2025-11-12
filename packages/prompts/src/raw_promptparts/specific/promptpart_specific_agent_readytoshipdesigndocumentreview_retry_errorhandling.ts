import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define retry errorhandling for Ready to Ship Design Document Review agent"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "retry_effectiveness", "test": "Does retry errorhandling ensure production quality?", "score": 0.33 },
 *   { "name": "retry_reliability", "test": "Is retry errorhandling consistently reliable?", "score": 0.32 },
 *   { "name": "retry_completeness", "test": "Does retry errorhandling cover edge cases?", "score": 0.31 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_READYTOSHIPDESIGNDOCUMENTREVIEW_RETRY_ERRORHANDLING: PromptPart = 
  'Handle certification failures through: incomplete review handling, feedback conflict resolution, consensus deadlock breaking, complex issue escalation, discussion timeout management, quality waiver procedures' as PromptPart;