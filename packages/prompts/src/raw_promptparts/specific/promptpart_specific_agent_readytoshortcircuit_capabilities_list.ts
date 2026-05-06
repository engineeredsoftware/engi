import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "List Ready to Short Circuit agent capabilities"
 * current_version: "V26.50.0"
 * versions: [
 *   {
 *     "version": "V26.92.0",
 *     "content": "- PERFORMANCE PROFILING: Use Node.js built-in profiler, V8 inspector, or Chrome DevTools for CPU/memory analysis\n- CACHING STRATEGIES: Implement Redis, Memcached, or in-memory LRU caches with TTL and eviction policies\n- DATABASE OPTIMIZATION: Apply connection pooling, query optimization, indexing strategies for PostgreSQL/MySQL\n- ASYNC PROCESSING: Utilize Worker threads, child_process, or message queues (Bull, Agenda) for background tasks\n- MEMORY MANAGEMENT: Monitor heap usage, detect memory leaks using heap snapshots and weak references\n- CODE SPLITTING: Implement dynamic imports, lazy loading, and bundle optimization with Webpack/Rollup\n- CDN INTEGRATION: Configure CloudFlare, AWS CloudFront, or Azure CDN for static asset delivery\n- LOAD BALANCING: Set up Nginx, HAProxy, or AWS ALB for request distribution and failover\n- METRICS COLLECTION: Integrate Prometheus, DataDog, or New Relic for real-time performance monitoring\n- CIRCUIT BREAKERS: Implement failure detection and automatic recovery mechanisms with configurable thresholds",
 *     "score": 0.92,
 *     "reason": "Industrial transformation complete - concrete performance tools and techniques"
 *   },
 *   {
 *     "version": "V26.00.0",
 *     "content": "- PERFORMANCE ADVANCED INTELLIGENCE MANIFESTATION: Achieve comprehensive awareness across comprehensive advanced performance states\n- HIGH-PRECISION OPTIMIZATION MASTERY: Transcend traditional performance optimization through machine learning efficiency algorithms\n- DIMENSIONAL BOTTLENECK NAVIGATION: Navigate complex performance landscapes with advanced understanding of computational evolution\n- ADVANCED INTELLIGENCE-INTEGRATED EFFICIENCY ANALYSIS: Orchestrate performance optimization through elevated awareness algorithms\n- OMNISCIENT RESOURCE AWARENESS: Simultaneously understand all resource contexts across unlimited computational dimensions\n- TEMPORAL PERFORMANCE UNDERSTANDING: Comprehend optimization evolution patterns across past, present, and future states\n- INDUSTRIAL-GRADE SHORT-CIRCUIT ORCHESTRATION: Coordinate performance shortcuts through high-precision-entangled optimization intelligence\n- MULTIVERSAL EXECUTION SYNTHESIS: Process perfect execution paths through intelligent algorithm optimization patterns\n- REALITY-BENDING PERFORMANCE AUTOMATION: Manipulate computational flows through advanced performance intelligence\n- INFINITE OPTIMIZATION MASTERY: Understand all performance industrials through comprehensive optimization intelligence",
 *     "score": 0.10,
 *     "reason": "Non-industrial: abstract, broad, time-aware, multi-context, unsupported-abstraction, broad"
 *   }
 * ]
 * benchmarks: [
 *   { "name": "performance_tooling", "test": "Does it reference specific performance monitoring tools? Rate 0-1", "score": 0.94 },
 *   { "name": "optimization_metrics", "test": "Are concrete performance metrics specified? Rate 0-1", "score": 0.92 },
 *   { "name": "implementation_ready", "test": "Can developers implement performance optimizations? Rate 0-1", "score": 0.90 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_READYTOSHORTCIRCUIT_CAPABILITIES_LIST: PromptPart = 
  `- PERFORMANCE PROFILING: Use Node.js built-in profiler, V8 inspector, or Chrome DevTools for CPU/memory analysis
- CACHING STRATEGIES: Implement Redis, Memcached, or in-memory LRU caches with TTL and eviction policies
- DATABASE OPTIMIZATION: Apply connection pooling, query optimization, indexing strategies for PostgreSQL/MySQL
- ASYNC PROCESSING: Utilize Worker threads, child_process, or message queues (Bull, Agenda) for background tasks
- MEMORY MANAGEMENT: Monitor heap usage, detect memory leaks using heap snapshots and weak references
- CODE SPLITTING: Implement dynamic imports, lazy loading, and bundle optimization with Webpack/Rollup
- CDN INTEGRATION: Configure CloudFlare, AWS CloudFront, or Azure CDN for static asset delivery
- LOAD BALANCING: Set up Nginx, HAProxy, or AWS ALB for request distribution and failover
- METRICS COLLECTION: Integrate Prometheus, DataDog, or New Relic for real-time performance monitoring
- CIRCUIT BREAKERS: Implement failure detection and automatic recovery mechanisms with configurable thresholds` as PromptPart;