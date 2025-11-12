import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "REFINE-step output requirement for ReviewCodeChange agent"
 * current_version: "GA1.70.0"
 * versions: []
 * benchmarks: [
 *   { "name": "insight_depth", "test": "Does it demand deeper insights and actionable feedback? Rate 0-1", "score": 0.95 },
 *   { "name": "actionability", "test": "Is the refined review output concrete? Rate 0-1", "score": 0.94 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_REVIEWCODECHANGE_REFINE_OUTPUT_REQUIREMENT_DETAILCONTENT: PromptPart =
  'Provide refined review with deeper insights and actionable feedback' as PromptPart;
