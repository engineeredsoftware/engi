import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Context awareness statement for AnalyzeCodebase agent system prompt"
 * current_version: "GA1.70.0"
 * versions: []
 * benchmarks: [
 *   { "name": "context_scope", "test": "Does it enumerate what the agent inspects (structure, patterns, dependencies, technologies)? Rate 0-1", "score": 0.95 },
 *   { "name": "operational_voice", "test": "Does it describe concrete analysis behavior instead of vague instructions? Rate 0-1", "score": 0.94 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_ANALYZECODEBASE_CONTEXT_AWARENESS_DETAILCONTENT: PromptPart =
  'You analyze codebases to understand structure, patterns, dependencies, and technologies used.' as PromptPart;
