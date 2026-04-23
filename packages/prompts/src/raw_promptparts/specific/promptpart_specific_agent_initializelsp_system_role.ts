import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode InitializeLSP system role for static measurement sessions"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "role_precision", "test": "Does it precisely define the agent's role?", "score": 0.40 },
 *   { "name": "responsibility_clarity", "test": "Are responsibilities clearly stated?", "score": 0.39 },
 *   { "name": "scope_definition", "test": "Is the role scope well-defined?", "score": 0.38 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_INITIALIZELSP_SYSTEM_ROLE: PromptPart = 
  'Your role is to establish LSP connections, configure language servers, enable static measurement capabilities, and maintain replayable protocol sessions for Bitcode evidence' as PromptPart;
