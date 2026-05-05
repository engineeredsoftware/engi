import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "PLAN-step output requirement for ReviewCodeChange agent"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "coverage", "test": "Does it demand a comprehensive review plan covering all aspects? Rate 0-1", "score": 0.95 },
 *   { "name": "actionability", "test": "Is the AssetPack outcome concrete for engineers? Rate 0-1", "score": 0.94 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_REVIEWCODECHANGE_PLAN_OUTPUT_REQUIREMENT_DETAILCONTENT: PromptPart =
  'Generate a comprehensive review plan covering all aspects of the code change' as PromptPart;
