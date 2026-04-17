/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: examples
 * intent: "Example showing IoT ecosystem constraint identification with emergent behavior analysis"
 * current_version: "GA1.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "iot_ecosystem_complexity", "test": "Does '{{content}}' demonstrate complex IoT ecosystem constraint handling? Rate 0-1" },
 *   { "name": "emergent_behavior_recognition", "test": "Does '{{content}}' showcase emergent behavior constraint recognition? Rate 0-1" },
 *   { "name": "multi_system_integration_awareness", "test": "Is '{{content}}' aware of multi-system integration constraints? Rate 0-1" },
 *   { "name": "progressive_sophistication", "test": "Does '{{content}}' show progressive sophistication over Example 1? Rate 0-1" }
 * ]
 */

import { PromptPart } from '@bitcode/prompts';

export const PROMPTPART_SPECIFIC_TOOL_IDENTIFYCONSTRAINTS_DOCCODETOOLEXAMPLE2: PromptPart = 
  'Example 2 - Smart City IoT Infrastructure: identifyConstraints({ taskContext: "smart-city-deployment", analysisScope: "metropolitan-scale", constraintTypes: ["power", "connectivity", "privacy", "scalability", "interoperability"], systemArchitecture: "mesh-network-topology/", resourceInventory: "city-infrastructure-audit.db", temporalFramework: "5-year-lifecycle", regulatoryContext: "GDPR-smart-city-ordinances", interdependencyDepth: "ecosystem-wide" }) → Returns ConstraintMatrix with power grid limitations, 5G coverage gaps, privacy regulation boundaries, device lifecycle constraints, protocol compatibility matrices, emergent traffic pattern restrictions, and systemic interdependency mapping for architectural constraint optimization' as PromptPart;