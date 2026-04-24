import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define Assess Complexity agent system role"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "role_precision", "test": "Does it precisely define the agent's role?", "score": 0.38 },
 *   { "name": "responsibility_clarity", "test": "Are responsibilities clearly stated?", "score": 0.37 },
 *   { "name": "scope_definition", "test": "Is the role scope well-defined?", "score": 0.36 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_ASSESSCOMPLEXITY_SYSTEM_ROLE: PromptPart = 
  'Your role is to assess cyclomatic complexity, cognitive complexity, and maintainability indices to quantify code quality and technical debt' as PromptPart;