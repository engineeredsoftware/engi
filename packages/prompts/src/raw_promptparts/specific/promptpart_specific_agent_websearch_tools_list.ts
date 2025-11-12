import { PromptPart } from '../../parts/PromptPart';

/**
 * WebSearch Agent Tools - Production Implementation Stack
 * 
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "List Web Search agent tools for enterprise deployment"
 * current_version: "GA1.50.0"
 * versions: [
 *   {
 *     "version": "GA1.00.0",
 *     "content": "Google/Bing/DuckDuckGo API integration with fallback routing",
 *     "score": 0.95,
 *     "reason": "Industrial-grade API integration"
 *   },
 *   {
 *     "version": "GA1.00.0",
 *     "content": "Multi-engine web search with optimization and redundancy",
 *     "score": 0.75,
 *     "reason": "Non-industrial: consciousness-aware"
 *   }
 * ]
 * 
 * @implementation_stack Production-ready toolchain with enterprise SLAs
 * @monitoring Prometheus metrics, distributed tracing, performance dashboards
 * @security OAuth2/JWT authentication, input validation, rate limiting
 * 
 * benchmarks: [
 *   { "name": "tool_specificity", "test": "Does it describe concrete search tools? Rate 0-1", "score": 1.0 },
 *   { "name": "api_alignment", "test": "Do tools map to real search APIs? Rate 0-1", "score": 1.0 },
 *   { "name": "implementation_clarity", "test": "Can developers build these tools? Rate 0-1", "score": 1.0 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_WEBSEARCH_TOOLS_LIST: PromptPart = 
  `- webSearchAPIOrchestrator: Multi-provider API client (Google Custom Search v1, Bing Web Search v7, DuckDuckGo Instant Answer) with OAuth2 authentication and circuit breaker failover
- queryOptimizationEngine: Advanced query parser with boolean operators, field targeting, proximity search, and WordNet semantic expansion
- contentProcessingPipeline: Async content extraction using Playwright/Puppeteer with DOM parsing, text cleaning, and structured data extraction
- mlRankingService: Machine learning relevance scoring using TF-IDF, BM25, PageRank algorithms with confidence intervals and quality metrics
- dataValidationService: Multi-layer validation with domain authority checking, source credibility scoring, and content freshness analysis
- aggregationFramework: Real-time result synthesis with deduplication, cross-reference validation, and structured JSON output formatting` as PromptPart;