import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "REFINE-step output requirement text for DivideCodeChange agent"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "optimization_specificity", "test": "Does it demand optimized parallelization/dependency handling? Rate 0-1", "score": 0.95 },
 *   { "name": "execution_quality", "test": "Does it mention improved execution order? Rate 0-1", "score": 0.94 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DIVIDECODECHANGE_REFINE_OUTPUT_REQUIREMENT_DETAILCONTENT: PromptPart =
  'Provide refined division with optimized parallelization, reduced dependencies, and improved execution order' as PromptPart;
