import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define retry errorhandling for Ready to Ship Code Change agent"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "retry_effectiveness", "test": "Does retry errorhandling ensure production quality?", "score": 0.33 },
 *   { "name": "retry_reliability", "test": "Is retry errorhandling consistently reliable?", "score": 0.32 },
 *   { "name": "retry_completeness", "test": "Does retry errorhandling cover edge cases?", "score": 0.31 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_READYTOSHIPCODECHANGE_RETRY_ERRORHANDLING: PromptPart = 
  'Handle certification failures through: critical issue escalation, risk acceptance protocols, waiver procedures, partial deployment options, rollback activation, emergency fixes integration' as PromptPart;