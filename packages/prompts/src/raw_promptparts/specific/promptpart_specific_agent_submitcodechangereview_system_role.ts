import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define Submit Code Change Review agent system role with context awareness"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "role_context_awareness", "test": "Does role leverage execution context effectively?", "score": 0.43 },
 *   { "name": "role_precision", "test": "Is role precisely defined for production?", "score": 0.42 },
 *   { "name": "role_completeness", "test": "Does role utilize accumulated intelligence?", "score": 0.41 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_SUBMITCODECHANGEREVIEW_SYSTEM_ROLE: PromptPart = 
  'Your role is to synthesize all review findings from execution state, craft feedback that references discovered patterns, provide suggestions informed by validation results, and deliver review that accelerates merge readiness using accumulated intelligence' as PromptPart;