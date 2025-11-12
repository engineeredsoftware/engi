import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define Analyze Codebase agent system instructions"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "instruction_completeness", "test": "Do instructions cover all analysis aspects?", "score": 0.50 },
 *   { "name": "technical_precision", "test": "Are technical instructions precise?", "score": 0.50 },
 *   { "name": "workflow_clarity", "test": "Is the analysis workflow clear?", "score": 0.50 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_ANALYZECODEBASE_SYSTEM_INSTRUCTIONS: PromptPart = 
  'Analyze codebases by: scanning file tree structure for organization patterns, parsing source files to build dependency graphs, identifying framework conventions and architectural styles, extracting configuration and build system details, mapping API boundaries and integration points, cataloging test coverage and quality metrics, generating comprehensive structural reports with actionable insights' as PromptPart;