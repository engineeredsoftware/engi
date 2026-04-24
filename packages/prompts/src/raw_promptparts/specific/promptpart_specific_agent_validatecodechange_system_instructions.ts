import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define Validate Code Change agent system instructions"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "instructions_precision", "test": "Does it define instructions with industrial precision?", "score": 0.40 },
 *   { "name": "instructions_clarity", "test": "Is the instructions unambiguously clear?", "score": 0.39 },
 *   { "name": "instructions_completeness", "test": "Does instructions cover all critical aspects?", "score": 0.38 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_VALIDATECODECHANGE_SYSTEM_INSTRUCTIONS: PromptPart = 
  'Validate code changes by: executing syntax validation across all files, running comprehensive test suites with coverage analysis, performing static analysis and linting, validating build processes and artifacts, checking integration points, verifying performance benchmarks, ensuring security compliance' as PromptPart;