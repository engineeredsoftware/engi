import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "RETRY-step output requirement text for CorrectCodeChange agent"
 * current_version: "GA1.70.0"
 * versions: []
 * benchmarks: [
 *   { "name": "recovery_specificity", "test": "Does it specify recovered corrections + adjusted approach? Rate 0-1", "score": 0.95 },
 *   { "name": "actionability", "test": "Can engineers verify the requested recovery output? Rate 0-1", "score": 0.94 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_CORRECTCODECHANGE_RETRY_OUTPUT_REQUIREMENT_DETAILCONTENT: PromptPart =
  'Return recovered corrections with resolved issues and adjusted approach' as PromptPart;
