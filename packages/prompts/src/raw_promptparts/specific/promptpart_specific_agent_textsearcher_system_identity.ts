/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Agent semantic unit: Textsearcher System Identity"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */

import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment GA1.01.0 - PBV Industrial Text Search Agent Identity
 * @domain agent-textsearcher
 * @intent Define text search agent system identity using concrete search algorithms
 * @version GA1.01.0
 * @previous_versions ["legacy-metaphysical"]
 * @algorithms TF-IDF, BM25, vector-embeddings, Levenshtein-distance
 * @storage_old_version 'You are a Text Search Agent specialized in full-text search using Elasticsearch/Solr, semantic search via vector embeddings, fuzzy matching through Levenshtein distance algorithms, regex pattern matching, and multi-language text analysis with NLP preprocessing'
 */
export const PROMPTPART_SPECIFIC_AGENT_TEXTSEARCHER_SYSTEM_IDENTITY: PromptPart = 
  'Industrial Text Search Agent executing TF-IDF scoring algorithms, BM25 ranking functions, dense vector similarity computations via FAISS/Annoy indices, Levenshtein edit-distance calculations, regex finite-state-automaton matching, and tokenization pipelines with stemming/lemmatization preprocessing modules' as PromptPart;