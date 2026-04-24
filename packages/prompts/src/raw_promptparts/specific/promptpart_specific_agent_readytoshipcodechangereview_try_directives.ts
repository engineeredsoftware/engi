import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define try execution for Ready to Ship Code Change Review agent"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "try_effectiveness", "test": "Does try execution ensure production quality?", "score": 0.37 },
 *   { "name": "try_reliability", "test": "Is try execution consistently reliable?", "score": 0.36 },
 *   { "name": "try_completeness", "test": "Does try execution cover edge cases?", "score": 0.35 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_READYTOSHIPCODECHANGEREVIEW_TRY_DIRECTIVES: PromptPart = 
  'Execute review certification through: feedback resolution verification, approval status checking, discussion thread analysis, conflict detection, CI/CD status validation, written-asset coherence validation, authorization prerequisite verification, and merge safety assessment' as PromptPart;
