import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode ReadyToFinish PromptPart for need satisfaction, written-asset integrity, asset-pack proof evidence, and delivery admission"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "retry_effectiveness", "test": "Does retry errorhandling ensure production quality?", "score": 0.33 },
 *   { "name": "retry_reliability", "test": "Is retry errorhandling consistently reliable?", "score": 0.32 },
 *   { "name": "retry_completeness", "test": "Does retry errorhandling cover edge cases?", "score": 0.31 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_READYTOFINISHCODECHANGEREVIEW_RETRY_ERRORHANDLING: PromptPart = 
  'Handle certification failures through: stale feedback handling, approval timeout management, discussion deadlock resolution, complex conflict mediation, CI/CD failure diagnosis, emergency approval procedures' as PromptPart;