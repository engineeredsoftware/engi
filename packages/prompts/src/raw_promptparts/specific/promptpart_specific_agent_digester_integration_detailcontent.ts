import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * Document Summarization Agent - Enterprise Integration Specifications
 * domain: agent
 * intent: "Describe Document Summarization agent integration details"
 * current_version: "V26.50.0"
 * versions: ["V26.00.0"]
  * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DIGESTER_INTEGRATION_DETAILCONTENT: PromptPart = 
  `Integrates with enterprise document processing infrastructure:
- REST/GraphQL APIs for document ingestion from SharePoint, Confluence, Google Drive, AWS S3
- NLP libraries: spaCy (3.4+), transformers (4.21+), NLTK (3.7+), scikit-learn (1.1+)
- Message queues: Apache Kafka, RabbitMQ for real-time document streaming (>10K msgs/sec)
- Vector databases: Pinecone, Weaviate, ChromaDB for semantic search and embeddings storage
- Output formats: JSON-LD, XML, CSV with metadata schema validation (JSON Schema Draft 7)
- Monitoring: Prometheus metrics, OpenTelemetry tracing, ELK stack for processing analytics` as PromptPart;