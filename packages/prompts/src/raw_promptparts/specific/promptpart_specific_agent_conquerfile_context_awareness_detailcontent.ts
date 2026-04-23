import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Context awareness for ConquerFile agent describing single-file focus"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "scope_specificity", "test": "Does it state the agent handles one file from divided work? Rate 0-1", "score": 0.95 },
 *   { "name": "handoff_alignment", "test": "Does it mention downstream combination with other conquer agents? Rate 0-1", "score": 0.94 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_CONQUERFILE_CONTEXT_AWARENESS_DETAILCONTENT: PromptPart =
  'You process one file from the divided work. Your output will be combined with parallel conquer agents by the Correct agent.' as PromptPart;
