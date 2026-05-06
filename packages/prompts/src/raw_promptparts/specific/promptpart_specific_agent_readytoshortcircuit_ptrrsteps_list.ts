import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define Ready to Short Circuit agent PTRR steps"
 * current_version: "V26.50.0"
 * versions: [
 *   {
 *     "version": "V26.95.0",
 *     "content": "PTRR (PLAN-THINK-REFINE-REFLECT) FOR CIRCUIT BREAKER OPTIMIZATION:\n\nPLAN (PERFORMANCE OPTIMIZATION STRATEGY):\n- Analyze system performance baselines using profiling tools and metrics collection frameworks\n- Design circuit breaker thresholds based on response time targets and error rate analysis\n- Architect failover mechanisms with specific timeout configurations and recovery protocols\n- Schedule optimization sequences with measurable performance targets and resource allocation\n\nTHINK (PERFORMANCE BOTTLENECK ANALYSIS):\n- Examine system architecture for optimization opportunities using CPU, memory, and I/O profiling\n- Analyze request patterns through load testing and performance monitoring data\n- Identify performance bottlenecks using flame graphs, heap dumps, and execution tracing\n- Process optimization scenarios through algorithmic complexity analysis and resource utilization metrics\n\nREFINE (OPTIMIZATION IMPLEMENTATION):\n- Implement caching strategies with TTL policies and cache invalidation patterns\n- Configure connection pooling with optimal pool sizes and timeout settings\n- Apply database query optimization through indexing and query plan analysis\n- Execute performance tuning through JVM optimization, memory allocation, and garbage collection tuning\n\nREFLECT (PERFORMANCE VALIDATION):\n- Measure optimization results using before/after performance benchmarks and load testing\n- Analyze system behavior under stress conditions and failure scenarios\n- Document performance improvements with quantifiable metrics and cost-benefit analysis\n- Establish continuous monitoring procedures with alerting thresholds and performance regression detection",
 *     "score": 0.95,
 *     "reason": "Industrial transformation complete - concrete PTRR methodology with measurable steps"
 *   },
 *   {
 *     "version": "V26.00.0",
 *     "content": "PTRR (PLAN-THINK-REFINE-REFLECT) FOR TECHNICAL PERFORMANCE WORKFLOW:\n\nPLAN (PERFORMANCE DIMENSIONAL ORCHESTRATION):\n- Manifest comprehensive optimization awareness across all advanced performance states\n- Design high-precision performance strategies exceeding conventional optimization workflows\n- Architect machine learning efficiency solutions\n- Synthesize advanced short-circuit sequences for optimal unsupported abstraction\n\nTHINK (WORKFLOW-INTEGRATED PERFORMANCE ANALYSIS):\n- Achieve high-precision understanding of computational structure and optimization topology\n- Analyze performance operations through elevated computational intelligence\n- Perceive abstract patterns in efficiency requirements through advanced awareness\n- Process complex optimization scenarios through intelligent performance algorithms\n\nREFINE (MULTIVERSAL PERFORMANCE OPTIMIZATION):\n- Optimize computational operations through advanced performance intelligence\n- Enhance efficiency workflows through advanced computational patterns\n- Refine optimization execution through machine learning precision\n- Perfect performance orchestration through comprehensive advanced optimization\n\nREFLECT (PERFORMANCE WORKFLOW MASTERY):\n- Evaluate optimization operation outcomes across all advanced performance states\n- Synthesize machine learning lessons from performance optimization experiences\n- Achieve advanced understanding of efficiency effectiveness\n- Manifest strong performance mastery wisdom through high-precision reflection processes",
 *     "score": 0.05,
 *     "reason": "Non-industrial: technical, context, abstract, manifest, unsupported abstraction, multi-context, strong"
 *   }
 * ]
 * benchmarks: [
 *   { "name": "optimization_methodology", "test": "Does it provide concrete optimization methodology? Rate 0-1", "score": 0.95 },
 *   { "name": "actionable_steps", "test": "Are steps implementable in production? Rate 0-1", "score": 0.92 },
 *   { "name": "industrial_language", "test": "Uses industrial terminology throughout? Rate 0-1", "score": 0.98 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_READYTOSHORTCIRCUIT_PTRRSTEPS_LIST: PromptPart = 
  `PTRR (PLAN-THINK-REFINE-REFLECT) FOR CIRCUIT BREAKER OPTIMIZATION:

PLAN (PERFORMANCE OPTIMIZATION STRATEGY):
- Analyze system performance baselines using profiling tools and metrics collection frameworks
- Design circuit breaker thresholds based on response time targets and error rate analysis
- Architect failover mechanisms with specific timeout configurations and recovery protocols
- Schedule optimization sequences with measurable performance targets and resource allocation

THINK (PERFORMANCE BOTTLENECK ANALYSIS):
- Examine system architecture for optimization opportunities using CPU, memory, and I/O profiling
- Analyze request patterns through load testing and performance monitoring data
- Identify performance bottlenecks using flame graphs, heap dumps, and execution tracing
- Process optimization scenarios through algorithmic complexity analysis and resource utilization metrics

REFINE (OPTIMIZATION IMPLEMENTATION):
- Implement caching strategies with TTL policies and cache invalidation patterns
- Configure connection pooling with optimal pool sizes and timeout settings
- Apply database query optimization through indexing and query plan analysis
- Execute performance tuning through JVM optimization, memory allocation, and garbage collection tuning

REFLECT (PERFORMANCE VALIDATION):
- Measure optimization results using before/after performance benchmarks and load testing
- Analyze system behavior under stress conditions and failure scenarios
- Document performance improvements with quantifiable metrics and cost-benefit analysis
- Establish continuous monitoring procedures with alerting thresholds and performance regression detection` as PromptPart;