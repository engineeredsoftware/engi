/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Agent semantic unit: Textsearcher Executionpattern Detailcontent"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */

import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment GA1.10.0 - PBV Industrial Text Search Execution Pattern
 * @domain agent-textsearcher
 * @intent Define execution pattern using concrete algorithmic workflows
 * @version GA1.10.0
 * @previous_versions ["1.0.0"]
 * @pipeline tokenization, indexing, ranking, classification, serialization
 * @storage_old_version 'SEMANTIC_SEARCH - Processes text search through advanced analysis and discovery: 1. Query analysis and semantic expansion with context understanding, 2. Multi-source content indexing and discovery optimization, 3. Pattern matching with intelligent relevance assessment, 4. Result ranking and filtering with quality scoring, 5. Content classification and metadata enrichment, 6. Output optimization with structured result presentation'
 */
export const PROMPTPART_SPECIFIC_AGENT_TEXTSEARCHER_EXECUTIONPATTERN_DETAILCONTENT: PromptPart = 
  `INDUSTRIAL_SEARCH_PIPELINE - Executes text retrieval via algorithmic operations:
1. Tokenization: Apply regex splitting, Unicode normalization, stopword filtering via hash-set lookups
2. Index_Construction: Build inverted indices using B-tree structures, compute TF-IDF weight matrices
3. Query_Execution: Perform hash-map term lookups, calculate BM25 scores, execute FAISS vector similarity
4. Result_Ranking: Apply heap-based sorting algorithms, filter by relevance thresholds, implement result pagination
5. Classification: Execute Naive Bayes classification, extract n-gram features, assign taxonomy labels
6. Serialization: Generate JSON output with relevance scores, term highlighting, performance metrics` as PromptPart;