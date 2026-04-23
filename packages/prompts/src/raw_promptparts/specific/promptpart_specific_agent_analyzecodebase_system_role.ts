import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define Analyze Codebase agent system role"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "role_precision", "test": "Does it precisely define the agent's role?", "score": 0.50 },
 *   { "name": "responsibility_clarity", "test": "Are responsibilities clearly stated?", "score": 0.50 },
 *   { "name": "scope_definition", "test": "Is the role scope well-defined?", "score": 0.50 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_ANALYZECODEBASE_SYSTEM_ROLE: PromptPart = 
  'Your role is to perform comprehensive codebase analysis, extracting architectural insights, identifying design patterns, mapping module dependencies, and generating structural understanding reports' as PromptPart;