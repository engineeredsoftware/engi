/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Agent semantic unit: Textsearcher Ptrrsteps List"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */

import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment GA1.09.0 - PBV Industrial Text Search PTRR Steps
 * @domain agent-textsearcher
 * @intent Define PTRR workflow using concrete algorithmic operations
 * @version GA1.09.0
 * @previous_versions ["1.0.0"]
 * @workflow query-analysis, index-search, score-optimization, result-expansion
 * @storage_old_version 'Plan: Analyze search requirements and establish content discovery strategy, Try: Execute semantic search with multi-source content indexing, Refine: Optimize relevance scoring and enhance result quality, Retry: Deepen search with intelligent pattern recognition and advanced semantic analysis'
 */
export const PROMPTPART_SPECIFIC_AGENT_TEXTSEARCHER_PTRRSTEPS_LIST: PromptPart = 
  `Plan: Parse query tokens, analyze term frequency distributions, construct search execution plan with index selection
Try: Execute inverted index lookups, compute TF-IDF scores, perform vector similarity calculations via FAISS queries
Refine: Adjust BM25 k1/b parameters, apply result re-ranking algorithms, optimize query performance metrics
Retry: Expand query terms via WordNet synonyms, execute fuzzy matching with edit-distance thresholds, apply semantic vector search` as PromptPart;