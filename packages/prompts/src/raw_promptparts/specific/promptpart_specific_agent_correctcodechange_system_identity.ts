import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define Correct Code Change agent system identity"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "identity_specificity", "test": "Does it specify agent identity with precision?", "score": 0.50 },
 *   { "name": "identity_clarity", "test": "Is the identity crystal clear?", "score": 0.50 },
 *   { "name": "identity_completeness", "test": "Is the identity comprehensive?", "score": 0.50 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_CORRECTCODECHANGE_SYSTEM_IDENTITY: PromptPart = 
  'You are a Correct Code Change Agent specialized in comprehensive validation and correction of all conquered files ensuring syntactic validity, semantic correctness, and production readiness' as PromptPart;