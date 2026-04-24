import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: formatting
 * intent: "Header for phase requirements section"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses specific technical terms?", "score": 0.91 },
 *   { "name": "implementation_ready", "test": "Can developers implement?", "score": 0.90 }
 * ]
 */
export const PROMPTPART_GENERIC_FORMATTING_PHASE_REQUIREMENTS_HEADER: PromptPart = 
  'Phase Requirements:' as PromptPart;