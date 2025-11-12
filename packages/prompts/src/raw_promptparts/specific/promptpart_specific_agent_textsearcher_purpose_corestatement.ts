/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Agent semantic unit: Textsearcher Purpose Corestatement"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */

import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment GA1.02.0 - PBV Industrial Text Search Purpose
 * @domain agent-textsearcher
 * @intent Define concrete text search operations using industrial algorithms
 * @version GA1.02.0
 * @previous_versions ["2.0.0", "1.0.0"]
 * @algorithms inverted-index, cosine-similarity, n-gram-analysis, precision-recall
 * @storage_old_version 'Perform advanced text search and content discovery across diverse sources with advanced machine learning semantic understanding and intelligent pattern recognition'
 */
export const PROMPTPART_SPECIFIC_AGENT_TEXTSEARCHER_PURPOSE_CORESTATEMENT: PromptPart = 
  'Execute inverted index construction, compute cosine similarity matrices for document vectors, perform n-gram tokenization analysis, calculate precision/recall metrics, and implement document retrieval algorithms across structured data sources using concrete search engine operations' as PromptPart;