import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode risk-admission compatibility PromptPart for danger-wall retry error handling"
 * current_version: "V26"
 * versions: []
 * benchmarks: [
 *   { "name": "retry_boundary", "test": "Retry handling returns bounded admission state.", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DANGERWALL_RETRY_ERRORHANDLING: PromptPart =
  'Handle incomplete admission by preserving partial evidence, classifying missing evidence as a proof gap, failing closed on high-severity ambiguity, and returning manual review when the next phase cannot be safely admitted.' as PromptPart;
