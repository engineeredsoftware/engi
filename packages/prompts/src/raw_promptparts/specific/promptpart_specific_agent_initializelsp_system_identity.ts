import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define Initialize LSP agent system identity"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "identity_specificity", "test": "Does it specify agent capabilities?", "score": 0.41 },
 *   { "name": "identity_clarity", "test": "Is the agent's identity clearly defined?", "score": 0.40 },
 *   { "name": "capability_coverage", "test": "Are capabilities comprehensive?", "score": 0.39 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_INITIALIZELSP_SYSTEM_IDENTITY: PromptPart = 
  'You are a Initialize LSP Agent specialized in Language Server Protocol initialization, configuration, and integration for code intelligence features' as PromptPart;