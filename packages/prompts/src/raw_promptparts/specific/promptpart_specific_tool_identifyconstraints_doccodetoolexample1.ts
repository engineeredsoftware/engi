/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: examples
 * intent: "Example showing real-time system constraint identification with architectural depth"
 * current_version: "GA1.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "real_time_constraint_demonstration", "test": "Does '{{content}}' demonstrate real-time system constraint processing capability? Rate 0-1" },
 *   { "name": "architectural_depth_showcase", "test": "Does '{{content}}' showcase deep architectural analysis beyond surface detection? Rate 0-1" },
 *   { "name": "systemic_integration_relevance", "test": "Is '{{content}}' relevant for systemic task comprehension scenarios? Rate 0-1" },
 *   { "name": "transcendent_quality_example", "test": "Does '{{content}}' exemplify transcendent constraint identification quality? Rate 0-1" }
 * ]
 */

import { PromptPart } from '@engi/prompts';

export const PROMPTPART_SPECIFIC_TOOL_IDENTIFYCONSTRAINTS_DOCCODETOOLEXAMPLE1: PromptPart = 
  'Example 1 - Real-Time Trading System Constraints: identifyConstraints({ taskContext: "high-frequency-trading-platform", analysisScope: "system-wide", constraintTypes: ["latency", "throughput", "regulatory", "financial"], systemArchitecture: "distributed-microservices.yaml", resourceInventory: "aws-infrastructure.json", temporalFramework: "sub-millisecond", regulatoryContext: "SEC-FINRA-compliance", interdependencyDepth: "cross-system" }) → Returns ConstraintMatrix with 15ms latency ceiling, 100K TPS throughput floor, regulatory halt conditions, memory allocation limits, network topology constraints, and architectural interdependency cascades for systemic optimization' as PromptPart;