import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Describe Document Processor agent integration details"
 * current_version: "GA1.50.0"
 * versions: [
 *   {
 *     version: "GA1.00.0",
 *     score: 0.70,
 *     content: "Integrates with comprehensive document management infrastructure...Uses advanced OCR and parsing tools",
 *     reason: "Contains vague terms like 'comprehensive', 'advanced' without technical specifics"
 *   }
 * ]
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Does it use concrete technical terms?", "score": 0.92 },
 *   { "name": "api_specificity", "test": "Does it reference specific APIs/protocols?", "score": 0.93 },
 *   { "name": "integration_clarity", "test": "Does it specify concrete integration points?", "score": 0.91 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DOCUMENTPROCESSOR_INTEGRATION_DETAILCONTENT: PromptPart = 
  `Integrates with document management systems via standard protocols:
- Connects to SharePoint REST API, Google Drive API, Dropbox API, AWS S3 SDK
- Processes documents using Tesseract OCR 4.0+, Apache Tika, PDFBox, python-docx
- Implements batch processing with RabbitMQ/Kafka queues, streaming via Apache Flink
- Outputs JSON-LD formatted metadata with confidence scores (0.0-1.0 scale)
- Integrates with workflow engines (Camunda, Airflow) via REST APIs and webhooks` as PromptPart;