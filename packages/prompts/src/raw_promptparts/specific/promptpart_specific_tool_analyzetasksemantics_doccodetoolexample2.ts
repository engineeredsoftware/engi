/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: examples
 * intent: "Example showing emergent behavior detection in complex task semantics"
 * current_version: "GA1.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "emergent_behavior_detection", "test": "Does '{{content}}' demonstrate detection of emergent semantic behaviors? Rate 0-1" },
 *   { "name": "temporal_complexity_analysis", "test": "Does '{{content}}' show temporal and conditional complexity analysis? Rate 0-1" },
 *   { "name": "transcendent_pattern_recognition", "test": "Does '{{content}}' exhibit transcendent pattern recognition beyond basic NLP? Rate 0-1" },
 *   { "name": "cognitive_framework_integration", "test": "Does '{{content}}' integrate sophisticated cognitive frameworks? Rate 0-1" }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_ANALYZETASKSEMANTICS_DOCCODETOOLEXAMPLE2: PromptPart = 
  'Example 2 - Emergent Behavior Analysis: analyzeTaskSemantics({ taskDescription: "Optimize performance while maintaining backward compatibility, considering user experience impact and future scalability", analysisDepth: "transcendent", targetDimensions: ["emergent_conflicts", "temporal_dependencies", "stakeholder_vectors"], outputGranularity: "graph" }) → Identifies semantic tensions between performance and compatibility, maps temporal decision cascades, detects unstated quality emergences, and surfaces cognitive complexity patterns for strategic task comprehension' as PromptPart;