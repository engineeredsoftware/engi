import { PromptPart } from '../../parts/PromptPart';

/**
 * WebSearch Agent Integration - Enterprise Architecture
 * 
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Describe Web Search agent integration for enterprise deployment"
 * current_version: "GA1.50.0"
 * versions: ["GA1.00.0"]
 * 
 * @architecture Microservices with API Gateway pattern
 * @protocols REST/GraphQL/gRPC multi-protocol support
 * @security OAuth2/JWT authentication with role-based access
  * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_WEBSEARCH_INTEGRATION_DETAILCONTENT: PromptPart = 
  `Integrates with enterprise search infrastructure through standardized APIs:
- Multi-provider search APIs (Google Custom Search, Bing Web Search, DuckDuckGo) with authentication and quota management
- Content processing pipelines using NLP services (spaCy, NLTK, transformers) for text analysis and extraction
- Real-time caching layer (Redis Cluster) with distributed session management and result invalidation
- Structured JSON/XML output with OpenAPI schema validation and response formatting
- Enterprise service mesh integration (Istio/Consul) with service discovery, load balancing, and monitoring` as PromptPart;