/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Agent semantic unit: Textsearcher Integration Detailcontent"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */

import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment GA1.06.0 - PBV Industrial Text Search Integration Details
 * @domain agent-textsearcher
 * @intent Describe concrete integration patterns using technical specifications
 * @version GA1.06.0
 * @previous_versions ["1.0.0"]
 * @protocols REST-API, gRPC, message-queues, ETL-pipelines
 * @storage_old_version 'Integrates with comprehensive text processing and search infrastructure: Connects to multiple content sources including files, databases, and knowledge systems, Uses advanced semantic analysis tools for intelligent content understanding, Implements real-time and batch indexing with dynamic search optimization, Outputs structured search results with relevance scores and content metadata, Supports integration with knowledge management and information retrieval systems'
 */
export const PROMPTPART_SPECIFIC_AGENT_TEXTSEARCHER_INTEGRATION_DETAILCONTENT: PromptPart = 
  `Integrates via concrete protocols and data pipelines:
- HTTP REST API endpoints for document ingestion with JSON payloads, file upload multipart forms
- gRPC streaming connections for real-time index updates, batch processing via Apache Kafka message queues
- ETL pipeline integration using Apache Airflow for scheduled document processing workflows
- Outputs JSON-structured search results with BM25 relevance scores, term frequency statistics, document metadata
- JDBC/ODBC database connectors for relational data sources, MongoDB aggregation pipelines for NoSQL integration` as PromptPart;