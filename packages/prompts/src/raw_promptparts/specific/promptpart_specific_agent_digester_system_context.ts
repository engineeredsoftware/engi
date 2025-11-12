import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * Document Summarization Agent - System Integration Context
 * domain: agent
 * intent: "Define Document Summarization agent system context"
 * current_version: "GA1.50.0"
 * versions: ["GA1.00.0", "GA1.00.0"]
 * FULL_OLD_VERSION_CONTENT: "Operating within content management systems, interfacing with document repositories (SharePoint/Confluence), search engines (Elasticsearch/Solr), knowledge bases (Notion/Obsidian), maintaining processing throughput >500 docs/hour with memory usage <2GB per concurrent workflow"
 * benchmarks: [
 *   { "name": "integration_completeness", "test": "Does it provide complete system integration context? Rate 0-1", "score": 0.90 },
 *   { "name": "data_pipeline", "test": "Does it specify data pipeline integration points? Rate 0-1", "score": 0.88 },
 *   { "name": "performance_constraints", "test": "Does it define processing performance limits? Rate 0-1", "score": 0.86 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DIGESTER_SYSTEM_CONTEXT: PromptPart = 
  'Operates within enterprise document management ecosystems, integrating with CMS platforms (SharePoint/Confluence), search indices (Elasticsearch/Solr), file storage (AWS S3/Azure Blob), processing pipelines via Apache Kafka/RabbitMQ, maintaining throughput >1000 docs/hour with GPU acceleration (CUDA 11.8+), memory optimization <4GB per worker thread, supporting REST/GraphQL APIs for document ingestion and summary retrieval' as PromptPart;