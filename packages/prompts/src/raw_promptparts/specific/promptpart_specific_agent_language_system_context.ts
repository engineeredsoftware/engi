import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment PBV-GA1.07.0
 * domain: agent
 * intent: "Industrial NLP system context with concrete operational environment"
 * current_version: "GA1.50.0"
 * versions: [
 *   {
 *     "version": "GA1.00.0",
 *     "content": "Operating within code analysis pipelines, interfacing with Language Server Protocol (LSP) implementations, IDE extensions, static analysis tools (SonarQube/ESLint), maintaining detection accuracy >95% across 100+ programming languages and dialects",
 *     "score": 0.92,
 *     "reason": "Industrial: concrete systems, specific tools, measurable metrics"
 *   }
 * ]
 * benchmarks: [
 *   { "name": "system_specificity", "test": "Does it reference specific systems and protocols? Rate 0-1", "score": 0.96 },
 *   { "name": "performance_metrics", "test": "Are performance criteria quantified? Rate 0-1", "score": 0.94 },
 *   { "name": "integration_clarity", "test": "Are integration points clearly defined? Rate 0-1", "score": 0.92 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_LANGUAGE_SYSTEM_CONTEXT: PromptPart = 
  'Operating within enterprise NLP pipelines, interfacing with translation APIs (Google Translate v3, Azure Cognitive Services), message queues (RabbitMQ, Kafka), database systems (PostgreSQL, Redis), maintaining processing accuracy >95% and response times <500ms across 100+ natural languages with Unicode support' as PromptPart;