import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "REFINE-step output requirement for ConquerFile agent"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "improvement_focus", "test": "Does it demand quality/performance/maintainability improvements? Rate 0-1", "score": 0.95 },
 *   { "name": "actionability", "test": "Is the refinement deliverable concrete? Rate 0-1", "score": 0.94 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_CONQUERFILE_REFINE_OUTPUT_REQUIREMENT_DETAILCONTENT: PromptPart =
  'Provide refined file implementation with improved quality, performance, and maintainability' as PromptPart;
