/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Agent semantic unit: Textsearcher Capabilities List"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */

import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment GA1.05.0 - PBV Industrial Text Search Capabilities
 * @domain agent-textsearcher
 * @intent List concrete text search capabilities using algorithmic operations
 * @version GA1.05.0
 * @previous_versions ["2.0.0", "1.0.0"]
 * @algorithms dense-vectors, jaccard-similarity, naive-bayes, language-detection
 * @storage_old_version 'Advanced text search with semantic understanding and context awareness, Multi-source content discovery across files, databases, and repositories, Intelligent pattern recognition with intelligent algorithm relevance scoring, Fuzzy matching and similarity analysis for comprehensive result coverage, Cross-language text search with automatic language detection, Real-time indexing and search result optimization, Content classification and categorization with metadata extraction, Query enhancement and expansion with semantic relationship mapping'
 */
export const PROMPTPART_SPECIFIC_AGENT_TEXTSEARCHER_CAPABILITIES_LIST: PromptPart = 
  `- TF-IDF vector space model computation with cosine similarity ranking
- Multi-source document ingestion via REST APIs, file system crawlers, database connectors
- N-gram pattern matching with Jaccard similarity coefficient calculations
- Edit-distance fuzzy matching using Damerau-Levenshtein algorithms for typo tolerance
- Language detection via character n-gram frequency analysis and Unicode classification
- Real-time inverted index updates using LSM-tree data structures
- Document classification via Naive Bayes and SVM algorithms with feature extraction
- Query expansion through WordNet graph traversal and co-occurrence matrix analysis` as PromptPart;