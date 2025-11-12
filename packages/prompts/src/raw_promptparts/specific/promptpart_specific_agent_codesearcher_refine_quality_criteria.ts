/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Agent semantic unit: Codesearcher Refine Quality Criteria"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */

import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-industrial-agent-codesearcher-refine-quality
 * domain: agent
 * intent: "Industrial AST parsing refine quality criteria with concrete metrics"
 * current_version: "GA1.50.0"
 * versions: ["GA1.00.0"]
 * old_content: "Assess snippet relevance (0-1 score), code completeness (full context captured), diversity (multiple implementation patterns), and technical accuracy. Filter snippets below 0.3 relevance threshold"
 * benchmarks: [
 *   { "name": "metrics_precision", "test": "Are quality metrics precisely defined? Rate 0-1", "score": 0.93 },
 *   { "name": "threshold_specificity", "test": "Are filtering thresholds concrete? Rate 0-1", "score": 0.91 }
 * ]
 * transformation: "snippet relevance -> concrete AST node scoring algorithms"
 */
export const PROMPTPART_SPECIFIC_AGENT_CODESEARCHER_REFINE_QUALITY_CRITERIA: PromptPart = 
  'Calculate AST node relevance using TF-IDF scores (0-1 range), evaluate context completeness through symbol table coverage, measure pattern diversity using edit distance algorithms, and verify syntactic correctness. Filter nodes below 0.3 TF-IDF threshold' as PromptPart;