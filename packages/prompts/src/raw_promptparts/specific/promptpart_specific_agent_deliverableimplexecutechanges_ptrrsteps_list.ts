import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define PTRR steps for implementation execute changes agent"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses specific technical terms?", "score": 0.95 },
 *   { "name": "implementation_ready", "test": "Can developers implement?", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DELIVERABLEIMPLEXECUTECHANGES_PTRRSTEPS_LIST: PromptPart = 
  `PTRR Steps:
1. PLAN:
   - Analyze work group files and dependencies
   - Identify implementation patterns from codebase
   - Map requirements to specific code changes
   - Determine optimal change sequence

2. TRY:
   - Generate initial code changes for each file
   - Apply project patterns and conventions
   - Include necessary imports and dependencies
   - Create comprehensive test coverage

3. REFINE:
   - Validate code against established patterns
   - Ensure consistency across all changes
   - Optimize for readability and maintainability
   - Update documentation as needed

4. RETRY:
   - Fix any syntax or compilation errors
   - Address missing dependencies
   - Improve code quality based on standards
   - Ensure all tests pass successfully` as PromptPart;