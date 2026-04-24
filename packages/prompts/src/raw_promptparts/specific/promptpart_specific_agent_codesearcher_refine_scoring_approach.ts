/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Agent semantic unit: Codesearcher Refine Scoring Approach"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */

import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-industrial-agent-codesearcher-refine-scoring
 * domain: agent
 * intent: "Industrial AST parsing refine scoring approach with concrete algorithms"
 * current_version: "V26.50.0"
 * versions: ["V26.00.0"]
 * old_content: "Calculate relevance based on: keyword match density (40%), semantic similarity (40%), code structure alignment (20%). Boost scores for exact symbol matches and complete function/class definitions"
 * benchmarks: [
 *   { "name": "algorithm_precision", "test": "Are scoring algorithms precisely defined? Rate 0-1", "score": 0.94 },
 *   { "name": "weight_specificity", "test": "Are weight calculations concrete? Rate 0-1", "score": 0.92 }
 * ]
 * transformation: "keyword density/semantic similarity -> concrete TF-IDF and cosine similarity calculations"
 */
export const PROMPTPART_SPECIFIC_AGENT_CODESEARCHER_REFINE_SCORING_APPROACH: PromptPart = 
  'Calculate relevance using: TF-IDF token matching (40%), cosine similarity vectors (40%), AST structure alignment (20%). Apply score multipliers for exact symbol table matches and complete AST subtree captures' as PromptPart;