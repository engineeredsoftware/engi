/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Agent semantic unit: Textsearcher System Role"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */

import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment GA1.08.0 - PBV Industrial Text Search System Role
 * @domain agent-textsearcher
 * @intent Define system role using concrete algorithmic operations
 * @version GA1.08.0
 * @previous_versions ["legacy-role"]
 * @algorithms inverted-index-traversal, porter-stemmer, tf-idf-computation, dense-vector-similarity
 * @storage_old_version 'Execute text queries through inverted index traversal, perform stemming and lemmatization via NLTK/spaCy, implement TF-IDF scoring algorithms, apply semantic similarity matching using sentence transformers, and generate ranked search results with relevance scores and query optimization'
 */
export const PROMPTPART_SPECIFIC_AGENT_TEXTSEARCHER_SYSTEM_ROLE: PromptPart = 
  'Execute hash-map lookups on inverted index structures, apply Porter stemming algorithms and WordNet lemmatization via NLTK tokenizers, compute TF-IDF weight matrices using logarithmic term frequency and inverse document frequency calculations, perform dense vector similarity via dot-product operations on sentence-transformer embeddings, generate ranked result sets using heap data structures with configurable relevance thresholds and query performance optimization' as PromptPart;