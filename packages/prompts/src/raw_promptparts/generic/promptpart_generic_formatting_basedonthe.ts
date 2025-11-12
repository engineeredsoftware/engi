import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: formatting
 * intent: "Generic analysis introduction phrase"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "semantic_clarity", "test": "Does it clearly introduce analysis context?", "score": 0.50 },
 *   { "name": "reusability", "test": "Is it reusable across different analysis contexts?", "score": 0.50 }
 * ]
 */
export const PROMPTPART_GENERIC_FORMATTING_BASEDONTHE: PromptPart = 
  'Based on the' as PromptPart;