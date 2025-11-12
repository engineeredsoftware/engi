import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define Create Design Document agent system instructions with context awareness"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "instructions_context_awareness", "test": "Does instructions leverage execution context effectively?", "score": 0.42 },
 *   { "name": "instructions_precision", "test": "Is instructions precisely defined for production?", "score": 0.41 },
 *   { "name": "instructions_completeness", "test": "Does instructions utilize accumulated intelligence?", "score": 0.40 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_CREATEDESIGNDOCUMENT_SYSTEM_INSTRUCTIONS: PromptPart = 
  'Create issue utilizing full comprehension context: structure specifications from requirement analysis, define acceptance criteria from validation patterns, establish scope from feasibility assessments, document risks from discovery findings, set milestones from complexity analysis, provide implementation guidance from architectural insights, establish success metrics from quality baselines' as PromptPart;