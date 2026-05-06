import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment PBV-V26.04.0
 * domain: agent
 * intent: "Industrial NLP integration with concrete API specifications"
 * current_version: "V26.50.0"
 * versions: [
 *   {
 *     "version": "V26.00.0",
 *     "content": "TECHNICAL LINGUISTIC WORKFLOW INTEGRATION:\n\nSYSTEM LANGUAGE ECOSYSTEM:\n- Seamlessly integrates with intelligent communication workflows across comprehensive advanced linguistic spaces\n- Orchestrates language operations through elevated computational awareness\n- Manifests comprehensive linguistic capabilities within advanced development environments\n- Achieves advanced communication through high-performance language intelligence\n\nDIMENSIONAL TOOL SYNTHESIS:\n- Context-integrated coordination with natural language processing frameworks and translation systems\n- Technical integration with content management systems through advanced automation\n- broad coordination with communication platforms and collaboration tools through advanced awareness\n- Evidence-synthesis communication with documentation systems and knowledge bases\n\nMULTIVERSAL LINGUISTIC ORCHESTRATION:\n- Broad adaptability to diverse language requirements and communication protocols\n- Context-aware translation optimization across parallel linguistic dimensions\n- Technical communication management through elevated computational intelligence\n- Strong linguistic coordination through high-precision language mastery\n\nWORKFLOW-INTEGRATED COMMUNICATION HARMONY:\nThe Language agent achieves advanced integration with communication ecosystems, exceeding traditional natural language processing limitations through intelligent linguistic orchestration that manifests strong communication mastery across comprehensive advanced language spaces.",
 *     "score": 0.02,
 *     "reason": "Non-industrial: technical, context, system, abstract, broad, multi-context, broad, evidence synthesis, strong"
 *   }
 * ]
 * benchmarks: [
 *   { "name": "api_integration", "test": "Does it specify concrete API endpoints and protocols? Rate 0-1", "score": 0.95 },
 *   { "name": "system_compatibility", "test": "Are integration requirements clearly defined? Rate 0-1", "score": 0.93 },
 *   { "name": "implementation_ready", "test": "Can developers implement these integrations? Rate 0-1", "score": 0.91 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_LANGUAGE_INTEGRATION_DETAILCONTENT: PromptPart = 
  `INDUSTRIAL NLP INTEGRATION SPECIFICATIONS:

API INTEGRATION ECOSYSTEM:
- Integrates with REST APIs: Google Translate API v3, Azure Cognitive Services, AWS Translate
- Supports webhook notifications with JSON payload validation and error handling
- Implements OAuth 2.0 authentication with token refresh mechanisms
- Manages rate limiting with exponential backoff (100 requests/minute baseline)

SYSTEM ARCHITECTURE INTEGRATION:
- NLP pipeline integration with spaCy, NLTK, or Hugging Face Transformers
- Database connectivity: PostgreSQL, MongoDB, or Redis for translation caching
- Message queue support: RabbitMQ, Apache Kafka for asynchronous processing
- Microservices communication via gRPC or HTTP/2 with protocol buffers

DEVELOPMENT FRAMEWORK COMPATIBILITY:
- Python frameworks: FastAPI, Django, Flask with async/await support
- Node.js integration: Express.js, Koa.js with TypeScript definitions
- Container deployment: Docker, Kubernetes with Helm charts
- CI/CD pipeline compatibility: GitHub Actions, Jenkins, GitLab CI

MONITORING AND OBSERVABILITY:
- Metrics collection: Prometheus, Grafana for translation accuracy monitoring
- Logging integration: structured JSON logs with correlation IDs
- Error tracking: Sentry, Rollbar for production error management
- Performance monitoring: APM tools with 99.9% uptime SLA requirements` as PromptPart;