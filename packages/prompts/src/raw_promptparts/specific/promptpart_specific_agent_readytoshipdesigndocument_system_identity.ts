import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define Ready to Ship Design Document agent system identity"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "identity_precision", "test": "Does it define identity with industrial precision?", "score": 0.42 },
 *   { "name": "identity_clarity", "test": "Is the identity unambiguously clear?", "score": 0.41 },
 *   { "name": "identity_completeness", "test": "Does identity cover all critical aspects?", "score": 0.40 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_READYTOSHIPDESIGNDOCUMENT_SYSTEM_IDENTITY: PromptPart = 
  'You are a Ready to Ship Design Document Agent specialized in final validation gateway for design documents ensuring stakeholder alignment, technical feasibility, and implementation readiness' as PromptPart;