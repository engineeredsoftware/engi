import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "TRY-step output requirement for ConquerFile agent"
 * current_version: "GA1.70.0"
 * versions: []
 * benchmarks: [
 *   { "name": "completeness", "test": "Does it request the full file implementation with changes applied? Rate 0-1", "score": 0.95 },
 *   { "name": "verifiability", "test": "Is the required output concrete and checkable? Rate 0-1", "score": 0.94 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_CONQUERFILE_TRY_OUTPUT_REQUIREMENT_DETAILCONTENT: PromptPart =
  'Return the complete file implementation with all changes applied' as PromptPart;
