import { PromptPart } from '../../parts/PromptPart';

/**
 * WebSearch Agent System Instructions - Operational Procedures
 * 
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent-system
 * intent: "Define WebSearch agent system instructions for enterprise execution"
 * current_version: "GA1.50.0"
 * versions: []
 * 
 * @execution_model Event-driven asynchronous processing
 * @error_handling Exponential backoff with circuit breaker pattern
 * @performance Sub-second response times with 99.9% uptime SLA
  * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_WEBSEARCH_SYSTEM_INSTRUCTIONS: PromptPart = 
  'Execute enterprise search orchestration workflows: authenticate with OAuth2/API key credentials for Google/Bing/DuckDuckGo APIs, construct optimized search queries with boolean operators and field targeting, process paginated results using async/await parallel fetching with rate limiting, apply ML-based relevance scoring algorithms (TF-IDF, PageRank), implement distributed Redis caching with configurable TTL and invalidation policies, and deliver structured JSON responses with performance metrics, confidence scores, and source attribution metadata' as PromptPart;