import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "RETRY-step output requirement for ConquerFile agent"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "recovery_specificity", "test": "Does it request resolved issues plus fallback approaches? Rate 0-1", "score": 0.95 },
 *   { "name": "actionability", "test": "Is the recovery outcome concrete and auditable? Rate 0-1", "score": 0.94 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_CONQUERFILE_RETRY_OUTPUT_REQUIREMENT_DETAILCONTENT: PromptPart =
  'Return recovered file implementation with resolved issues and fallback approaches' as PromptPart;
