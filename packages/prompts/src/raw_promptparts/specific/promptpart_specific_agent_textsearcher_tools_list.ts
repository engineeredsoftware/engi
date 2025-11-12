/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Agent semantic unit: Textsearcher Tools List"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */

import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment GA1.07.0 - PBV Industrial Text Search Tools List
 * @domain agent-textsearcher
 * @intent List concrete search tools using algorithmic implementations
 * @version GA1.07.0
 * @previous_versions ["1.0.0"]
 * @implementations elasticsearch-client, lucene-analyzer, vector-database, ml-classifier
 * @storage_old_version 'semanticSearchEngine: Advanced text search with intelligent understanding, contentIndexerTool: Multi-source content discovery and indexing optimization, patternMatcherTool: Intelligent pattern recognition and similarity analysis, relevanceScoreTool: Advanced relevance scoring and result ranking, queryExpanderTool: Semantic query enhancement and expansion, classificationTool: Content categorization and metadata extraction'
 */
export const PROMPTPART_SPECIFIC_AGENT_TEXTSEARCHER_TOOLS_LIST: PromptPart = 
  `- elasticsearchClient: Execute full-text queries via Elasticsearch REST API with BM25 scoring
- luceneIndexer: Build inverted indices using Apache Lucene StandardAnalyzer with term frequency calculations
- vectorSearchTool: Perform approximate nearest neighbor search using FAISS index with cosine similarity
- bm25RankingTool: Calculate BM25 relevance scores with configurable k1/b parameters for document ranking
- wordNetExpander: Query expansion via WordNet synset traversal and co-occurrence matrix lookups
- naiveBayesClassifier: Document classification using multinomial Naive Bayes with TF-IDF feature vectors` as PromptPart;