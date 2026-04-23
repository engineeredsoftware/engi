import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "TRY-step output requirement text for DivideCodeChange agent"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "coverage", "test": "Does it demand every file, change type, purpose, complexity, and order? Rate 0-1", "score": 0.95 },
 *   { "name": "structure_specificity", "test": "Does it call for structured division output? Rate 0-1", "score": 0.94 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DIVIDECODECHANGE_TRY_OUTPUT_REQUIREMENT_DETAILCONTENT: PromptPart =
  'Return structured division with all files to change, their change types, purposes, complexity estimates, and execution order' as PromptPart;
