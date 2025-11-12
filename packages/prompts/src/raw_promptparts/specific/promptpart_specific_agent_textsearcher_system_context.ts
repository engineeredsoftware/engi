/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Agent semantic unit: Textsearcher System Context"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */

import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment GA1.03.0 - PBV Industrial Text Search System Context
 * @domain agent-textsearcher
 * @intent Define operational context with concrete performance metrics
 * @version GA1.03.0
 * @previous_versions ["legacy-context"]
 * @metrics latency-p99, throughput-docs-per-sec, index-size-gb
 * @storage_old_version 'Operating within content management platforms, interfacing with search engines (Elasticsearch/Algolia), document databases (MongoDB/CouchDB), knowledge graphs (Neo4j), maintaining search response times <200ms with indexing throughput >10K documents/minute'
 */
export const PROMPTPART_SPECIFIC_AGENT_TEXTSEARCHER_SYSTEM_CONTEXT: PromptPart = 
  'Executing within distributed search clusters via REST APIs (Elasticsearch 8.x/OpenSearch), interfacing B-tree indexed document stores (MongoDB 6.x sharded collections), traversing adjacency-list graph structures (Neo4j Cypher queries), maintaining P99 latency <150ms, indexing throughput >15K docs/sec, managing inverted index sizes <50GB per shard' as PromptPart;