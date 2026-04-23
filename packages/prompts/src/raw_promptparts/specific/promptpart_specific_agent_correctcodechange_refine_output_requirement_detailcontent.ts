import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "REFINE-step output requirement text for CorrectCodeChange agent"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "improvement_clarity", "test": "Does it specify improved integration/quality deliverable? Rate 0-1", "score": 0.95 },
 *   { "name": "actionability", "test": "Is the requested output concrete and verifiable? Rate 0-1", "score": 0.94 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_CORRECTCODECHANGE_REFINE_OUTPUT_REQUIREMENT_DETAILCONTENT: PromptPart =
  'Provide refined corrections with improved integration and quality' as PromptPart;
