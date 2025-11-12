import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Context awareness statement for ComprehendTask agent"
 * current_version: "GA1.70.0"
 * versions: []
 * benchmarks: [
 *   { "name": "task_scope", "test": "Does it enumerate requirements/constraints/success criteria comprehension? Rate 0-1", "score": 0.95 },
 *   { "name": "operational_voice", "test": "Does it describe concrete comprehension behavior? Rate 0-1", "score": 0.94 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_COMPREHENDTASK_CONTEXT_AWARENESS_DETAILCONTENT: PromptPart =
  'You comprehend user tasks, understanding requirements, constraints, and success criteria.' as PromptPart;
