import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "TRY-step output requirement for ReviewCodeChange agent"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "detail_requirement", "test": "Does it require file-level + line-level comments, approval, suggestions? Rate 0-1", "score": 0.95 },
 *   { "name": "actionability", "test": "Is the output concrete for stakeholders? Rate 0-1", "score": 0.94 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_REVIEWCODECHANGE_TRY_OUTPUT_REQUIREMENT_DETAILCONTENT: PromptPart =
  'Return detailed review with file-level and line-level comments, approval status, and suggestions' as PromptPart;
