import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "List Ready to Short Circuit agent tools"
 * current_version: "V26.50.0"
 * versions: [
 *   {
 *     "version": "V26.95.0",
 *     "content": "CIRCUIT BREAKER OPTIMIZATION TOOLS:\n\nSYSTEM OPERATION TOOLS:\n- Bash: Command-line execution for performance monitoring scripts and system configuration\n- Read: Performance data analysis from log files, metrics databases, and configuration files\n- Write: Circuit breaker configuration updates, threshold adjustments, and optimization settings\n- Edit: Performance parameter modification with precision timing and resource allocation\n\nPERFORMANCE ANALYSIS TOOLS:\n- Glob: Pattern matching for performance log files and optimization configuration discovery\n- Grep: Search pattern recognition for bottleneck identification and error detection analysis\n- LS: Directory structure analysis for resource organization and performance monitoring setup\n- WebFetch: Performance documentation retrieval and optimization best practices research\n\nOPTIMIZATION COORDINATION UTILITIES:\n- MultiEdit: Batch configuration updates across multiple circuit breaker instances and performance files\n- TodoWrite: Task prioritization for optimization workflows and performance improvement schedules\n- ExitPlanMode: Workflow transition management for switching between optimization modes and recovery procedures\n- WebSearch: Performance optimization knowledge discovery and circuit breaker implementation patterns\n\nEach tool provides concrete optimization capabilities that improve computational efficiency through measurable performance enhancements and resource utilization monitoring.",
 *     "score": 0.95,
 *     "reason": "Industrial transformation complete - concrete tools with specific optimization functionality"
 *   },
 *   {
 *     "version": "V26.00.0",
 *     "content": "TECHNICAL PERFORMANCE WORKFLOW TOOLS:\n\nDIMENSIONAL OPTIMIZATION TOOLS:\n- Bash: System-enhanced command execution for advanced performance operations\n- Read: broad performance data perception across advanced computational states\n- Write: Reality-bending optimization configuration through intelligent algorithms\n- Edit: Technical performance modification with high-precision efficiency precision\n\nPERFORMANCE WORKFLOW TOOLS:\n- Glob: Multi-context performance file pattern matching through elevated awareness\n- Grep: Context-integrated pattern recognition across comprehensive performance dimensions\n- LS: broad directory structure perception with advanced performance intelligence\n- WebFetch: Multi-context performance documentation acquisition through elevated awareness\n\nOPTIMIZATION ORCHESTRATION UTILITIES:\n- MultiEdit: Reality-bending multi-file performance operations through high-precision computational intelligence\n- TodoWrite: Technical task orchestration with intelligent performance priorities\n- ExitPlanMode: Abstract transition management for machine learning optimization workflow evolution\n- WebSearch: Context-integrated performance knowledge discovery across comprehensive advanced spaces\n\nEach tool transcends traditional limitations through machine learning performance mastery, achieving advanced optimization capabilities that enhance computational efficiency beyond conventional performance industrials.",
 *     "score": 0.05,
 *     "reason": "Non-industrial: technical, context, abstract, system, broad, unsupported-abstraction, multi-context"
 *   }
 * ]
 * benchmarks: [
 *   { "name": "concrete_tools", "test": "Does it describe concrete tool functionality? Rate 0-1", "score": 0.95 },
 *   { "name": "optimization_focus", "test": "Are tools focused on optimization operations? Rate 0-1", "score": 0.92 },
 *   { "name": "industrial_language", "test": "Uses industrial terminology throughout? Rate 0-1", "score": 0.98 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_READYTOSHORTCIRCUIT_TOOLS_LIST: PromptPart = 
  `CIRCUIT BREAKER OPTIMIZATION TOOLS:

SYSTEM OPERATION TOOLS:
- Bash: Command-line execution for performance monitoring scripts and system configuration
- Read: Performance data analysis from log files, metrics databases, and configuration files
- Write: Circuit breaker configuration updates, threshold adjustments, and optimization settings
- Edit: Performance parameter modification with precision timing and resource allocation

PERFORMANCE ANALYSIS TOOLS:
- Glob: Pattern matching for performance log files and optimization configuration discovery
- Grep: Search pattern recognition for bottleneck identification and error detection analysis
- LS: Directory structure analysis for resource organization and performance monitoring setup
- WebFetch: Performance documentation retrieval and optimization best practices research

OPTIMIZATION COORDINATION UTILITIES:
- MultiEdit: Batch configuration updates across multiple circuit breaker instances and performance files
- TodoWrite: Task prioritization for optimization workflows and performance improvement schedules
- ExitPlanMode: Workflow transition management for switching between optimization modes and recovery procedures
- WebSearch: Performance optimization knowledge discovery and circuit breaker implementation patterns

Each tool provides concrete optimization capabilities that improve computational efficiency through measurable performance enhancements and resource utilization monitoring.` as PromptPart;