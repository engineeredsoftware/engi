import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "TRY-step output requirement text for CorrectCodeChange agent"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "requirement_clarity", "test": "Does it specify the execution outcome (corrections + validation)? Rate 0-1", "score": 0.95 },
 *   { "name": "readiness_focus", "test": "Does it mention readiness assessment? Rate 0-1", "score": 0.94 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_CORRECTCODECHANGE_TRY_OUTPUT_REQUIREMENT_DETAILCONTENT: PromptPart =
  'Return all corrections applied, validation results, and readiness assessment' as PromptPart;
