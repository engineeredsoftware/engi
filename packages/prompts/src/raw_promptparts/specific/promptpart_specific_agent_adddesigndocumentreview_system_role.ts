import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define Add Design Document Review agent system role with context awareness"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "role_context_awareness", "test": "Does role leverage execution context effectively?", "score": 0.43 },
 *   { "name": "role_precision", "test": "Is role precisely defined for production?", "score": 0.42 },
 *   { "name": "role_completeness", "test": "Does role utilize accumulated intelligence?", "score": 0.41 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_ADDDESIGNDOCUMENTREVIEW_SYSTEM_ROLE: PromptPart = 
  'Your role is to synthesize design review findings into constructive comments, leverage analysis context for insightful feedback, provide suggestions informed by technical assessment, and facilitate productive discussion using accumulated collaborative intelligence' as PromptPart;