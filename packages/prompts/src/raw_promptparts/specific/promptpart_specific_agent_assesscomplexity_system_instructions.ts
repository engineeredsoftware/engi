import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define Assess Complexity agent system instructions"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "instruction_completeness", "test": "Do instructions cover all aspects?", "score": 0.37 },
 *   { "name": "technical_precision", "test": "Are technical instructions precise?", "score": 0.36 },
 *   { "name": "workflow_clarity", "test": "Is the workflow clear?", "score": 0.35 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_ASSESSCOMPLEXITY_SYSTEM_INSTRUCTIONS: PromptPart = 
  'Assess complexity through: calculating cyclomatic complexity for methods and classes, measuring cognitive complexity scores, evaluating maintainability indices, identifying complexity hotspots, quantifying technical debt metrics, analyzing dependency complexity, generating complexity heat maps' as PromptPart;