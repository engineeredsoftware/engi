import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define try execution for Validate Code Change agent"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "try_effectiveness", "test": "Does try execution ensure production quality?", "score": 0.37 },
 *   { "name": "try_reliability", "test": "Is try execution consistently reliable?", "score": 0.36 },
 *   { "name": "try_completeness", "test": "Does try execution cover edge cases?", "score": 0.35 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_VALIDATECODECHANGE_TRY_DIRECTIVES: PromptPart = 
  'Execute validation through: multi-language syntax checking, unit test execution with coverage, integration test orchestration, performance benchmark running, security vulnerability scanning, build artifact verification, quality metric calculation' as PromptPart;