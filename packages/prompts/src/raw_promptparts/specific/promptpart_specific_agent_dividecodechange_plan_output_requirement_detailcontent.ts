import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "PLAN-step output requirement text for DivideCodeChange agent"
 * current_version: "GA1.70.0"
 * versions: []
 * benchmarks: [
 *   { "name": "granularity", "test": "Does it require atomic operations with dependency ordering? Rate 0-1", "score": 0.95 },
 *   { "name": "parallelization", "test": "Does it mention parallelization opportunities? Rate 0-1", "score": 0.94 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DIVIDECODECHANGE_PLAN_OUTPUT_REQUIREMENT_DETAILCONTENT: PromptPart =
  'Generate a structured plan for dividing the code change into atomic file operations with dependency ordering and parallelization opportunities' as PromptPart;
