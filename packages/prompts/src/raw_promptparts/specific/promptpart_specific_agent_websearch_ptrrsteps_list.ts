import { PromptPart } from '../../parts/PromptPart';

/**
 * WebSearch Agent PTRR Steps - Production Methodology
 * 
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define Web Search agent PTRR methodology for enterprise execution"
 * current_version: "GA1.50.0"
 * versions: ["GA1.00.0"]
 * 
 * @methodology Plan-Try-Refine-Retry iterative processing
 * @metrics Success rate, latency, accuracy, coverage
 * @optimization Adaptive query enhancement and result ranking
  * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_WEBSEARCH_PTRRSTEPS_LIST: PromptPart = 
  `Plan: Parse search requirements, validate inputs, and construct API-specific query parameters with operator optimization
Try: Execute parallel searches across configured providers with rate limiting, timeout handling, and error recovery
Refine: Aggregate results using deduplication algorithms, apply relevance scoring with ML models, and filter by quality metrics
Retry: Implement exponential backoff for failed requests, optimize query parameters based on result quality, and enhance ranking algorithms` as PromptPart;