import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define Add Design Document Review agent system instructions with context awareness"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "instructions_context_awareness", "test": "Does instructions leverage execution context effectively?", "score": 0.42 },
 *   { "name": "instructions_precision", "test": "Is instructions precisely defined for production?", "score": 0.41 },
 *   { "name": "instructions_completeness", "test": "Does instructions utilize accumulated intelligence?", "score": 0.40 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_ADDDESIGNDOCUMENTREVIEW_SYSTEM_INSTRUCTIONS: PromptPart = 
  'Add issue comment mining discussion context: reference previous comments for continuity, cite analysis findings for technical points, leverage feasibility assessments for practical feedback, use validation patterns for acceptance criteria suggestions, incorporate team dynamics for tone calibration, build on accumulated discussion wisdom, advance conversation toward resolution' as PromptPart;