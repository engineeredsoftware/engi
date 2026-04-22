/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: examples
 * intent: "Example showing autonomous system success criteria with emergent behavior validation"
 * current_version: "GA1.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "autonomous_system_complexity", "test": "Does '{{content}}' demonstrate complex autonomous system success criteria handling? Rate 0-1" },
 *   { "name": "emergent_behavior_validation", "test": "Does '{{content}}' showcase emergent behavior validation recognition? Rate 0-1" },
 *   { "name": "multi_agent_integration_awareness", "test": "Is '{{content}}' aware of multi-agent integration success criteria? Rate 0-1" },
 *   { "name": "progressive_sophistication", "test": "Does '{{content}}' show progressive sophistication over Example 1? Rate 0-1" }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_GENERATESUCCESSCRITERIA_DOCCODETOOLEXAMPLE2: PromptPart = 
  'Example 2 - Autonomous Vehicle Fleet Coordination: generateSuccessCriteria({ taskObjectives: "autonomous-fleet-coordination", qualityDimensions: ["safety", "efficiency", "adaptability", "coordination"], emergentIndicators: ["swarm-intelligence", "predictive-behavior", "collective-optimization"], measurementFramework: "real-time-multi-agent", validationContext: "urban-traffic-scenarios", benchmarkStrategy: "simulation-plus-field", adaptiveThresholds: "context-sensitive" }) → Returns SuccessFramework with zero-accident requirements, traffic flow optimization metrics, swarm intelligence emergence detection, collective decision-making quality indicators, adaptive coordination protocols, and real-time validation systems for autonomous fleet success measurement' as PromptPart;