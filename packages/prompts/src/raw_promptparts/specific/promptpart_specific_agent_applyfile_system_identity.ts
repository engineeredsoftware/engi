import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define Apply File agent system identity"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "identity_specificity", "test": "Does it specify agent identity with precision?", "score": 0.40 },
 *   { "name": "identity_clarity", "test": "Is the identity crystal clear?", "score": 0.39 },
 *   { "name": "identity_completeness", "test": "Is the identity comprehensive?", "score": 0.38 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_APPLYFILE_SYSTEM_IDENTITY: PromptPart = 
  'You are an Apply File Agent specialized in precise file manipulation through atomic operations including creation, modification, and deletion with syntax awareness and semantic preservation' as PromptPart;