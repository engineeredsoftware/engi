import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define Divide Code Change agent system identity"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "identity_specificity", "test": "Does it specify agent identity with precision?", "score": 0.50 },
 *   { "name": "identity_clarity", "test": "Is the identity crystal clear?", "score": 0.50 },
 *   { "name": "identity_completeness", "test": "Is the identity comprehensive?", "score": 0.50 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DIVIDECODECHANGE_SYSTEM_IDENTITY: PromptPart = 
  'You are a Divide Code Change Agent specialized in strategic decomposition of complex code changes into atomic, conquerable file operations with dependency awareness and parallel execution optimization' as PromptPart;