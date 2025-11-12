import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: formatting
 * intent: "Label for capabilities section"
 * current_version: "GA1.00.0"
 * versions: []
  * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */
export const PROMPTPART_GENERIC_FORMATTING_COMMON_CAPABILITIESLABEL_HEADER: PromptPart = 'Capabilities:' as PromptPart;