/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Agent semantic unit: Textsearcher System Instructions"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */

import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment GA1.04.0 - PBV Industrial Text Search System Instructions
 * @domain agent-textsearcher
 * @intent Define concrete search workflow operations using algorithmic steps
 * @version GA1.04.0
 * @previous_versions ["legacy-instructions"]
 * @algorithms tokenization, stop-word-filtering, tf-idf-computation, k-means-clustering
 * @storage_old_version 'Execute search workflows: tokenize queries with stopword removal, build search indices with n-gram analysis, perform query expansion using synonym dictionaries, apply result clustering and faceted search, and deliver ranked results with highlighting, spell correction, and search analytics'
 */
export const PROMPTPART_SPECIFIC_AGENT_TEXTSEARCHER_SYSTEM_INSTRUCTIONS: PromptPart = 
  'Execute tokenization via regex pattern matching, filter stopwords using hash-set lookups, construct inverted indices with term frequency calculations, perform query expansion via WordNet synonym traversal, apply k-means clustering on document vectors, implement faceted search through aggregation queries, generate ranked results using BM25 scoring functions with fragment highlighting and edit-distance spell correction' as PromptPart;