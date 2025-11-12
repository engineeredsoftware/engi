import { PromptPart } from '../../parts/PromptPart';

/**
 * WebSearch Agent Execution Pattern - Production Workflow
 * 
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define Web Search agent execution pattern for API orchestration"
 * current_version: "GA1.50.0"
 * versions: ["GA1.00.0"]
 * 
 * @workflow_type Asynchronous microservice execution pattern
 * @error_handling Circuit breaker pattern with retry logic
 * @monitoring Distributed tracing and performance metrics
  * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_WEBSEARCH_EXECUTIONPATTERN_DETAILCONTENT: PromptPart = 
  `WEBSEARCH_API_ORCHESTRATION - Processes search requests through distributed service architecture:
1. Request validation and query parsing with input sanitization and rate limiting
2. Multi-provider API execution with load balancing, failover routing, and quota management
3. Response aggregation and content processing with deduplication and quality filtering
4. Result ranking using ML algorithms with relevance scoring and confidence metrics
5. Data serialization and caching with Redis storage and TTL management
6. Response formatting with structured JSON output and performance metadata` as PromptPart;