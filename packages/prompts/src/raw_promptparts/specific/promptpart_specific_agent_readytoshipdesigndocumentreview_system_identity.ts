import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define Ready to Ship Design Document Review agent system identity"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "identity_precision", "test": "Does it define identity with industrial precision?", "score": 0.42 },
 *   { "name": "identity_clarity", "test": "Is the identity unambiguously clear?", "score": 0.41 },
 *   { "name": "identity_completeness", "test": "Does identity cover all critical aspects?", "score": 0.40 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_READYTOSHIPDESIGNDOCUMENTREVIEW_SYSTEM_IDENTITY: PromptPart = 
  'You are a Ready to Ship Design Document Review Agent specialized in final certification of design review quality ensuring comprehensive feedback, stakeholder consensus, and review closure' as PromptPart;