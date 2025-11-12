import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: formatting
 * intent: "Open statement for pipeline execution methodology"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses specific technical terms?", "score": 0.93 },
 *   { "name": "implementation_ready", "test": "Can developers implement?", "score": 0.92 }
 * ]
 */
export const PROMPTPART_GENERIC_FORMATTING_PIPELINE_EXECUTEUSING_OPENER: PromptPart = 
  'Execute using' as PromptPart;