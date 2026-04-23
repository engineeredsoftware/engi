import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define PLAN step pre-analysis for Analyze Codebase agent"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "analysis_depth", "test": "Does it enable deep pre-analysis?", "score": 0.50 },
 *   { "name": "metadata_extraction", "test": "Does it extract comprehensive metadata?", "score": 0.50 },
 *   { "name": "pattern_recognition", "test": "Does it identify architectural patterns?", "score": 0.50 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_ANALYZECODEBASE_PLAN_ANALYSIS: PromptPart = 
  'Perform pre-analysis to identify: primary programming languages and framework versions, build system configuration and dependency management tools, directory structure conventions and naming patterns, existing documentation and architectural decision records, continuous integration configuration and deployment targets, code quality tool configurations and linting rules' as PromptPart;