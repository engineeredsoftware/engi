import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define purpose of codebase analysis agent"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "analysis_depth", "test": "Analyzes structure, tech, and patterns?", "score": 0.50.95 },
 *   { "name": "relevance_identification", "test": "Identifies relevant files correctly?", "score": 0.50.93 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_ANALYZECODEBASE_PURPOSE_CORESTATEMENT: PromptPart = 
  'Analyze codebase structure, technologies, patterns, and complexity to identify relevant files and architectural considerations' as PromptPart;