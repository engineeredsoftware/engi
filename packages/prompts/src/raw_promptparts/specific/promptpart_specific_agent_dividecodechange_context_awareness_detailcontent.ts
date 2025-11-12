import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Context awareness for DivideCodeChange agent referencing prior phase state"
 * current_version: "GA1.70.0"
 * versions: []
 * benchmarks: [
 *   { "name": "state_reference", "test": "Does it mention access to previous execution state? Rate 0-1", "score": 0.95 },
 *   { "name": "decision_guidance", "test": "Does it direct using accumulated wisdom for division decisions? Rate 0-1", "score": 0.94 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DIVIDECODECHANGE_CONTEXT_AWARENESS_DETAILCONTENT: PromptPart =
  'You have access to the full execution state from all previous phases. Use the accumulated wisdom from setup and discovery to make optimal division decisions.' as PromptPart;
