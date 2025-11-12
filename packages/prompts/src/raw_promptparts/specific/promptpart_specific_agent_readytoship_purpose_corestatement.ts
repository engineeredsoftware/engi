import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define purpose of ready-to-ship validation agent"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "validation_completeness", "test": "Validates all prior phases?", "score": 0.96 },
 *   { "name": "quality_assessment", "test": "Assesses production readiness?", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_READYTOSHIP_PURPOSE_CORESTATEMENT: PromptPart = 
  'Final validation assessment determining production readiness with quality metrics and potential short-circuit for insufficient quality' as PromptPart;