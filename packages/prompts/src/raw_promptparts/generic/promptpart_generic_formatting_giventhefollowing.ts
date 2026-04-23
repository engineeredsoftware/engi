import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: formatting
 * intent: "Generic context introduction phrase"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "semantic_clarity", "test": "Does it clearly introduce context?", "score": 0.50 },
 *   { "name": "reusability", "test": "Is it reusable across different contexts?", "score": 0.50 }
 * ]
 */
export const PROMPTPART_GENERIC_FORMATTING_GIVENTHEFOLLOWING: PromptPart = 
  'Given the following' as PromptPart;