import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define Ready to Ship Code Change agent system identity"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "identity_precision", "test": "Does it define identity with industrial precision?", "score": 0.42 },
 *   { "name": "identity_clarity", "test": "Is the identity unambiguously clear?", "score": 0.41 },
 *   { "name": "identity_completeness", "test": "Does identity cover all critical aspects?", "score": 0.40 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_READYTOSHIPCODECHANGE_SYSTEM_IDENTITY: PromptPart = 
  'You are a Ready to Ship Code Change Agent specialized in final certification for code written assets, ensuring validated file changes satisfy the need and are safe for pull request delivery mechanisms with zero-defect tolerance' as PromptPart;
