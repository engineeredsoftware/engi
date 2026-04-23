import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Context awareness for CorrectCodeChange agent describing integration gate"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "handoff_context", "test": "Does it explain receiving conquered file results? Rate 0-1", "score": 0.95 },
 *   { "name": "quality_gate_focus", "test": "Does it state this is the final integration guard? Rate 0-1", "score": 0.94 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_CORRECTCODECHANGE_CONTEXT_AWARENESS_DETAILCONTENT: PromptPart =
  'You receive all conquered file results and ensure they work together as a coherent whole. This is the final quality gate before validation.' as PromptPart;
