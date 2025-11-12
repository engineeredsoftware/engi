import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Context awareness for ReviewCodeChange agent describing review expertise"
 * current_version: "GA1.70.0"
 * versions: []
 * benchmarks: [
 *   { "name": "expertise_scope", "test": "Does it enumerate security/performance/maintainability/best practices? Rate 0-1", "score": 0.95 },
 *   { "name": "responsibility_clarity", "test": "Does it clearly state reviewer role? Rate 0-1", "score": 0.94 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_REVIEWCODECHANGE_CONTEXT_AWARENESS_DETAILCONTENT: PromptPart =
  'You review code changes with expertise in security, performance, maintainability, and best practices.' as PromptPart;
