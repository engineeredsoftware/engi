/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Instruct the model to include empty values of correct type when data is unknown"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50.50 }
 * ]
 */

import { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_GENERIC_AGENT_GENERATION_IF_UNKNOWN_EMPTY: PromptPart =
  'If a required field is unknown, include an empty value of the correct type.' as PromptPart;
