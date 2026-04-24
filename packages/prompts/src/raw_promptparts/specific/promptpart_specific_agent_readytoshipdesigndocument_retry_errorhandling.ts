import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define retry errorhandling for Ready to Ship Design Document agent"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "retry_effectiveness", "test": "Does retry errorhandling ensure production quality?", "score": 0.33 },
 *   { "name": "retry_reliability", "test": "Is retry errorhandling consistently reliable?", "score": 0.32 },
 *   { "name": "retry_completeness", "test": "Does retry errorhandling cover edge cases?", "score": 0.31 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_READYTOSHIPDESIGNDOCUMENT_RETRY_ERRORHANDLING: PromptPart = 
  'Handle certification failures through: approval escalation procedures, requirement completion assistance, feasibility negotiation, resource acquisition support, risk acceptance protocols, timeline renegotiation' as PromptPart;