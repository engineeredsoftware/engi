import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define PTRR steps for implementation correct issues agent"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses specific technical terms?", "score": 0.95 },
 *   { "name": "implementation_ready", "test": "Can developers implement?", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DELIVERABLEIMPLCORRECTISSUES_PTRRSTEPS_LIST: PromptPart = 
  `PTRR Steps:
1. PLAN:
   - Categorize issues by type and severity
   - Identify root causes and dependencies
   - Determine correction order and strategy
   - Map issues to specific code locations

2. TRY:
   - Apply targeted fixes for each issue
   - Maintain code intent while correcting
   - Update imports and dependencies
   - Ensure consistency across changes

3. REFINE:
   - Verify fixes resolve original issues
   - Check for introduced side effects
   - Optimize corrections for clarity
   - Validate against project standards

4. RETRY:
   - Re-run validation checks
   - Address any remaining issues
   - Ensure all tests pass
   - Confirm code quality compliance` as PromptPart;