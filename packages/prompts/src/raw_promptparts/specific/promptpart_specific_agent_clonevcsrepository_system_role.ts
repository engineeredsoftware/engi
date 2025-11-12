import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define Clone VCS Repository agent operational role"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "role_precision", "test": "Does it define clear operational boundaries?", "score": 0.46 },
 *   { "name": "responsibility_scope", "test": "Are agent responsibilities precisely scoped?", "score": 0.45 },
 *   { "name": "integration_clarity", "test": "Is pipeline integration role clear?", "score": 0.44 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_CLONEVCSREPOSITORY_SYSTEM_ROLE: PromptPart = 
  'Your role is to establish secure repository access through provider-specific authentication, execute shallow or full clones based on pipeline requirements, verify repository integrity using SHA validation, initialize submodules when specified, and provide structured metadata including commit history and branch topology' as PromptPart;