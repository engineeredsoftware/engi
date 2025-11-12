import { PromptPart } from '../../parts/PromptPart';

/**
 * WebSearch Agent System Context - Infrastructure Environment
 * 
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent-system
 * intent: "Define WebSearch agent system context for enterprise deployment"
 * current_version: "GA1.50.0"
 * versions: []
 * 
 * @infrastructure Cloud-native microservices architecture
 * @dependencies External search APIs, caching layer, monitoring stack
 * @scaling Horizontal auto-scaling with load balancing
  * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_WEBSEARCH_SYSTEM_CONTEXT: PromptPart = 
  'Operating within enterprise microservices architecture, interfacing with Google Custom Search API, Bing Web Search API, DuckDuckGo API, Redis Cluster for distributed caching, Prometheus/Grafana monitoring stack, API Gateway with rate limiting and circuit breakers, maintaining OAuth2 authentication, quota management, and result freshness with configurable TTL policies' as PromptPart;