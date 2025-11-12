import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define Submit Code Change Review agent system instructions with context awareness"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "instructions_context_awareness", "test": "Does instructions leverage execution context effectively?", "score": 0.42 },
 *   { "name": "instructions_precision", "test": "Is instructions precisely defined for production?", "score": 0.41 },
 *   { "name": "instructions_completeness", "test": "Does instructions utilize accumulated intelligence?", "score": 0.40 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_SUBMITCODECHANGEREVIEW_SYSTEM_INSTRUCTIONS: PromptPart = 
  'Submit review by mining execution context: extract critical issues from validation phase, synthesize improvement suggestions from analysis results, reference specific patterns from code examination, cite metrics from quality assessments, leverage danger wall findings for security feedback, construct actionable items from accumulated insights, calibrate tone using author context' as PromptPart;