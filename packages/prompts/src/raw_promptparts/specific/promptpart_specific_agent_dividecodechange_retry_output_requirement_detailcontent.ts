import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "RETRY-step output requirement text for DivideCodeChange agent"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "recovery_specificity", "test": "Does it require resolved issues + fallback approaches + adjusted scope? Rate 0-1", "score": 0.95 },
 *   { "name": "actionability", "test": "Is the recovery outcome concrete and verifiable? Rate 0-1", "score": 0.94 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DIVIDECODECHANGE_RETRY_OUTPUT_REQUIREMENT_DETAILCONTENT: PromptPart =
  'Return recovered division with resolved issues, fallback approaches, and adjusted scope' as PromptPart;
