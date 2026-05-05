import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "PLAN-step output requirement text for CorrectCodeChange agent"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "requirement_clarity", "test": "Does it state the validation/correction planning outcome? Rate 0-1", "score": 0.95 },
 *   { "name": "integration_focus", "test": "Does it mention integration + quality guarantees? Rate 0-1", "score": 0.94 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_CORRECTCODECHANGE_PLAN_OUTPUT_REQUIREMENT_DETAILCONTENT: PromptPart =
  'Generate a plan to validate and correct all file changes, ensuring integration and quality' as PromptPart;
