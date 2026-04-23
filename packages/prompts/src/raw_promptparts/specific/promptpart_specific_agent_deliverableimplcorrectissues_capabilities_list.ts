import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode retained deliverable-compatibility PromptPart for written-asset synthesis from asset-pack execution: agent deliverableimplcorrectissues capabilities list"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses specific technical terms?", "score": 0.95 },
 *   { "name": "implementation_ready", "test": "Can developers implement?", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DELIVERABLEIMPLCORRECTISSUES_CAPABILITIES_LIST: PromptPart = 
  `capabilities:
- Analyze syntax errors and provide corrections
- Fix compilation issues and missing dependencies
- Resolve failing test cases and assertions
- Address lint warnings and code quality issues
- Correct type errors and mismatches
- Fix logical errors in implementation
- Maintain code consistency during corrections
- Preserve intended functionality while fixing issues` as PromptPart;