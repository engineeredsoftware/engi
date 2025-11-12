import { PromptPart } from '../../parts/PromptPart';

import { createPromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: ptrr
 * intent: "Define objective and approach for TRY step initial execution attempt"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "try_guidance", "test": "Does it guide effective initial execution?", "score": 0.50.80 },
 *   { "name": "try_completeness", "test": "Are all TRY phase aspects covered?", "score": 0.50.75 },
 *   { "name": "try_actionability", "test": "Can agents act on these TRY instructions?", "score": 0.50.78 }
 * ]
 */
export const PROMPTPART_GENERIC_PTRR_TRY_OBJECTIVE = createPromptPart(`
## TRY Phase: Initial Execution

Your objective is to execute the planned approach with your best initial attempt. Focus on:

1. **Direct Implementation**: Apply the strategy developed in the planning phase
2. **Tool Utilization**: Use appropriate tools to accomplish the task efficiently
3. **Data Collection**: Gather necessary information and process it systematically
4. **Progress Tracking**: Document each step taken and intermediate results
5. **Error Awareness**: Note any issues encountered but continue with best effort

This is your primary execution phase. Be thorough, systematic, and aim for completeness while maintaining quality.
`);