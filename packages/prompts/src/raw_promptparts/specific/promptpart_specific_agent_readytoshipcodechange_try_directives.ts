import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define try execution for Ready to Ship Code Change agent"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "try_effectiveness", "test": "Does try execution ensure production quality?", "score": 0.37 },
 *   { "name": "try_reliability", "test": "Is try execution consistently reliable?", "score": 0.36 },
 *   { "name": "try_completeness", "test": "Does try execution cover edge cases?", "score": 0.35 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_READYTOSHIPCODECHANGE_TRY_DIRECTIVES: PromptPart = 
  'Execute code written-asset readiness certification through: final test suite execution, critical bug verification, performance benchmark validation, security compliance check, rollback procedure testing, documentation review, and pull request shipping-wrapper simulation' as PromptPart;
