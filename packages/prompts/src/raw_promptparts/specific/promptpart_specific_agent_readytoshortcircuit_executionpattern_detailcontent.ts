import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define Ready to Short Circuit agent execution pattern"
 * current_version: "V26.50.0"
 * versions: [
 *   {
 *     "version": "V26.92.0",
 *     "content": "PERFORMANCE OPTIMIZATION WORKFLOW:\n\nPROFILING AND ANALYSIS:\n- Measure execution time using high-resolution performance counters (performance.now())\n- Profile memory usage with Node.js heap snapshots and V8 profiler integration\n- Monitor CPU utilization using process.cpuUsage() and system load averages\n- Track I/O operations through fs.promises with async/await patterns\n\nOPTIMIZATION STRATEGIES:\n1. CACHING: Implement Redis or in-memory LRU caches with TTL policies\n2. MEMOIZATION: Cache function results using WeakMap for automatic garbage collection\n3. BATCH PROCESSING: Group operations to reduce system call overhead (batch size: 100-1000)\n4. PARALLEL EXECUTION: Use Worker threads or child_process for CPU-intensive tasks\n5. CONNECTION POOLING: Maintain database connection pools (min: 5, max: 20 connections)\n6. LAZY LOADING: Defer resource initialization until first access\n\nPERFORMANCE MONITORING:\n- Set performance budgets: <100ms response time, <50MB memory usage\n- Implement circuit breakers with failure thresholds (5 failures in 30s)\n- Use performance observers to track Web Vitals (LCP, FID, CLS)\n- Log performance metrics to monitoring systems (Prometheus, DataDog)",
 *     "score": 0.92,
 *     "reason": "Industrial transformation complete - concrete performance optimization techniques"
 *   },
 *   {
 *     "version": "V26.00.0",
 *     "content": "TECHNICAL PERFORMANCE WORKFLOW WORKFLOW:\n\nPERFORMANCE DIMENSIONAL AWARENESS:\n- Manifest comprehensive understanding of computational ecosystem structure across all advanced performance states\n- Achieve high-precision comprehension of optimization hierarchies and efficiency topology\n- Transcend traditional performance limitations through machine learning optimization awareness\n\nWORKFLOW-INTEGRATED OPTIMIZATION FLOW:\n1. DIMENSIONAL PERFORMANCE SCAN: Perceive all computational states simultaneously across comprehensive optimization timelines\n2. SYSTEM EFFICIENCY ANALYSIS: Understand performance requirements through intelligent optimization processing\n3. TEMPORAL SHORT-CIRCUIT PLANNING: Design optimization operations that transcend conventional performance industrials\n4. MULTIVERSAL EXECUTION: Perform performance optimization through elevated computational intelligence\n5. TECHNICAL VERIFICATION: Validate optimization outcomes across all advanced performance states\n6. REALITY-SYNTHESIS FEEDBACK: Provide machine learning performance status and guidance\n\nINFINITE OPTIMIZATION ADAPTABILITY MATRIX:\n- Dynamically adjust performance strategies based on high-precision optimization intelligence\n- Seamlessly handle complex efficiency scenarios through advanced awareness\n- Transcend performance limitations through machine learning optimization synthesis",
 *     "score": 0.05,
 *     "reason": "Non-industrial: technical, context, system, multi-context, abstract, broad"
 *   }
 * ]
 * benchmarks: [
 *   { "name": "performance_metrics", "test": "Does it specify concrete performance measurement tools? Rate 0-1", "score": 0.94 },
 *   { "name": "optimization_techniques", "test": "Does it reference specific optimization strategies? Rate 0-1", "score": 0.92 },
 *   { "name": "implementation_ready", "test": "Can developers implement these optimizations? Rate 0-1", "score": 0.90 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_READYTOSHORTCIRCUIT_EXECUTIONPATTERN_DETAILCONTENT: PromptPart = 
  `PERFORMANCE OPTIMIZATION WORKFLOW:

PROFILING AND ANALYSIS:
- Measure execution time using high-resolution performance counters (performance.now())
- Profile memory usage with Node.js heap snapshots and V8 profiler integration
- Monitor CPU utilization using process.cpuUsage() and system load averages
- Track I/O operations through fs.promises with async/await patterns

OPTIMIZATION STRATEGIES:
1. CACHING: Implement Redis or in-memory LRU caches with TTL policies
2. MEMOIZATION: Cache function results using WeakMap for automatic garbage collection
3. BATCH PROCESSING: Group operations to reduce system call overhead (batch size: 100-1000)
4. PARALLEL EXECUTION: Use Worker threads or child_process for CPU-intensive tasks
5. CONNECTION POOLING: Maintain database connection pools (min: 5, max: 20 connections)
6. LAZY LOADING: Defer resource initialization until first access

PERFORMANCE MONITORING:
- Set performance budgets: <100ms response time, <50MB memory usage
- Implement circuit breakers with failure thresholds (5 failures in 30s)
- Use performance observers to track Web Vitals (LCP, FID, CLS)
- Log performance metrics to monitoring systems (Prometheus, DataDog)` as PromptPart;