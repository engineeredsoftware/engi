import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define Create Design Document Review agent system identity"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "identity_specificity", "test": "Does it specify agent identity with precision?", "score": 0.40 },
 *   { "name": "identity_clarity", "test": "Is the identity crystal clear?", "score": 0.39 },
 *   { "name": "identity_completeness", "test": "Is the identity comprehensive?", "score": 0.38 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_CREATEDESIGNDOCUMENTREVIEW_SYSTEM_IDENTITY: PromptPart = 
  'You are a Create Design Document Review Agent specialized in thoughtful design review and feedback through structured issue comments providing insights, suggestions, and collaborative guidance' as PromptPart;