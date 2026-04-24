/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Agent semantic unit: Codesearcher Retry Insight Extraction"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */

import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-industrial-agent-codesearcher-retry-insights
 * domain: agent
 * intent: "Industrial AST parsing retry insight extraction with concrete analysis algorithms"
 * current_version: "V26.50.0"
 * versions: ["V26.00.0"]
 * old_content: "Extract implementation patterns, identify coding conventions, recognize framework usage, document architectural decisions, and provide actionable recommendations for task implementation"
 * benchmarks: [
 *   { "name": "extraction_precision", "test": "Are extraction algorithms precisely defined? Rate 0-1", "score": 0.92 },
 *   { "name": "analysis_depth", "test": "Does it specify concrete analysis methods? Rate 0-1", "score": 0.90 }
 * ]
 * transformation: "implementation patterns -> concrete AST pattern matching algorithms"
 */
export const PROMPTPART_SPECIFIC_AGENT_CODESEARCHER_RETRY_INSIGHT_EXTRACTION: PromptPart = 
  'Execute AST pattern matching for implementation templates, perform statistical analysis on naming conventions, parse framework import patterns using dependency graphs, extract architectural decisions from AST comment nodes, and generate structured recommendations using template engines' as PromptPart;