import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define PTRR steps for validation test runner agent"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses specific technical terms?", "score": 0.95 },
 *   { "name": "implementation_ready", "test": "Can developers implement?", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DELIVERABLEVALIDATIONTESTRUNNER_PTRRSTEPS_LIST: PromptPart = 
  `PTRR Steps:
1. PLAN:
   - Identify test framework and configuration
   - Determine affected test suites from changes
   - Plan test execution strategy
   - Set appropriate timeouts and retries

2. TRY:
   - Execute test command with proper arguments
   - Monitor test execution progress
   - Capture output and error streams
   - Track test duration and resource usage

3. REFINE:
   - Parse test results and extract metrics
   - Identify specific failure reasons
   - Calculate coverage percentages
   - Detect patterns in failures

4. RETRY:
   - Re-run failed tests to check for flakiness
   - Apply targeted fixes if possible
   - Verify environment configuration
   - Ensure consistent test results` as PromptPart;