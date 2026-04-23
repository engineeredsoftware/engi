import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "PLAN-step output requirement for ConquerFile agent"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "requirement_specificity", "test": "Does it demand change type, approach, validation criteria? Rate 0-1", "score": 0.95 },
 *   { "name": "single_file_focus", "test": "Does it emphasize conquering this specific file? Rate 0-1", "score": 0.94 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_CONQUERFILE_PLAN_OUTPUT_REQUIREMENT_DETAILCONTENT: PromptPart =
  'Generate a plan for conquering this specific file with change type, approach, and validation criteria' as PromptPart;
