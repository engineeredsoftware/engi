import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode retained deliverable-compatibility PromptPart for need satisfaction, written-asset validation, and proof evidence: agent deliverablevalidationtestrunner capabilities list"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses specific technical terms?", "score": 0.95 },
 *   { "name": "implementation_ready", "test": "Can developers implement?", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DELIVERABLEVALIDATIONTESTRUNNER_CAPABILITIES_LIST: PromptPart = 
  `capabilities:
- Execute test commands for various frameworks (Jest, Vitest, Mocha, pytest)
- Identify which tests need to run based on changes
- Parse test output and extract failure details
- Calculate test coverage metrics
- Determine test execution timeouts
- Handle flaky test detection and retries
- Report detailed failure information with stack traces
- Validate test environment configuration` as PromptPart;