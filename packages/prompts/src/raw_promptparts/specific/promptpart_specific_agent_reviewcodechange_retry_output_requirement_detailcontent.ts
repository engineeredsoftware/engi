import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "RETRY-step output requirement for ReviewCodeChange agent"
 * current_version: "GA1.70.0"
 * versions: []
 * benchmarks: [
 *   { "name": "recovery_specificity", "test": "Does it require alternative approaches in the recovered review? Rate 0-1", "score": 0.95 },
 *   { "name": "actionability", "test": "Can downstream agents act on the recovered review? Rate 0-1", "score": 0.94 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_REVIEWCODECHANGE_RETRY_OUTPUT_REQUIREMENT_DETAILCONTENT: PromptPart =
  'Return recovered review with alternative approaches' as PromptPart;
