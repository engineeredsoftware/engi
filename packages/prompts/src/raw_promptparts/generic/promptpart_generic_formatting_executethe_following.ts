import { PromptPart } from '../../parts/PromptPart';

import { createPromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: formatting
 * intent: "Provide transitional directive from context to execution instructions"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "directive_clarity", "test": "Is the execution directive clear?", "score": 0.90 },
 *   { "name": "directive_brevity", "test": "Is the directive concise?", "score": 0.95 },
 *   { "name": "directive_effectiveness", "test": "Does it effectively transition to action?", "score": 0.85 }
 * ]
 */
export const PROMPTPART_GENERIC_FORMATTING_EXECUTETHE_FOLLOWING = createPromptPart(`
Based on the context and requirements provided, execute the following operations:
`);