import { PromptPart } from '../../parts/PromptPart';

/**
 * WebSearch Agent Core Capabilities - Industrial Grade Implementation
 * 
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Web search API orchestration capabilities for production deployment"
 * current_version: "GA1.50.0"
 * versions: ["GA1.00.0", "GA1.00.0"]
 * 
 * @specification PBV-format compliant web search engine integration
 * @api_compliance Google Search API, Bing Web Search API, DuckDuckGo API
 * @performance_target <500ms response time, 99.9% uptime
 * @scaling_requirements Supports 10K+ concurrent queries/second
  * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_WEBSEARCH_CAPABILITIES_LIST: PromptPart = 
  `- Multi-provider search API integration (Google/Bing/DuckDuckGo) with failover routing
- Query optimization using search operators, boolean logic, and field-specific targeting
- HTTP content extraction with DOM parsing, text cleaning, and structured data extraction
- Real-time response caching with Redis TTL management and invalidation policies
- Result ranking algorithms using TF-IDF, PageRank scoring, and relevance weighting
- Cross-domain federation with rate limiting, quota management, and circuit breakers
- Content summarization using NLP models (BERT/T5) with configurable output length
- Batch processing workflows with async execution, retry logic, and error handling` as PromptPart;