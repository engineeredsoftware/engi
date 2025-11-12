import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define Ready to Iterate agent system role"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "role_precision", "test": "Does it precisely define the agent's role?", "score": 0.40 },
 *   { "name": "responsibility_clarity", "test": "Are responsibilities clearly stated?", "score": 0.39 },
 *   { "name": "scope_definition", "test": "Is the role scope well-defined?", "score": 0.38 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_READYTOITERATE_SYSTEM_ROLE: PromptPart = 
  'Your role is to verify system readiness, validate prerequisites, prepare iteration context, and signal continuation readiness' as PromptPart;