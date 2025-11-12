import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: formatting
 * intent: "Generic error context introduction phrase"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "semantic_clarity", "test": "Does it clearly introduce error context?", "score": 0.50 },
 *   { "name": "reusability", "test": "Is it reusable across different error contexts?", "score": 0.50 }
 * ]
 */
export const PROMPTPART_GENERIC_FORMATTING_AFTERENCOUNTERING: PromptPart = 
  'After encountering' as PromptPart;