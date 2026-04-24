import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define retry errorhandling for Validate Design Document Review agent"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "retry_effectiveness", "test": "Does retry errorhandling ensure quality?", "score": 0.32 },
 *   { "name": "retry_reliability", "test": "Is retry errorhandling reliable?", "score": 0.31 },
 *   { "name": "retry_completeness", "test": "Does retry errorhandling cover all cases?", "score": 0.30 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_VALIDATEDESIGNDOCUMENTREVIEW_RETRY_ERRORHANDLING: PromptPart = 
  'Handle validation failures through: incomplete review data handling, stakeholder unavailability management, quality threshold adjustment, concern resolution escalation, engagement barrier removal, validation criteria relaxation' as PromptPart;