import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define try execution for Ready to Ship agent"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "try_effectiveness", "test": "Does try execution ensure production quality?", "score": 0.37 },
 *   { "name": "try_reliability", "test": "Is try execution consistently reliable?", "score": 0.36 },
 *   { "name": "try_completeness", "test": "Does try execution cover edge cases?", "score": 0.35 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_READYTOSHIP_TRY_DIRECTIVES: PromptPart = 
  'Execute shipping-readiness orchestration through: validation result aggregation, written-asset risk calculation, readiness score computation, operational verification, rollback capability testing, decision matrix evaluation, and shipping authorization generation' as PromptPart;
