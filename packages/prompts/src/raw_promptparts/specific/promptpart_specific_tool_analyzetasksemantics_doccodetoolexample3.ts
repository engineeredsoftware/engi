/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: examples
 * intent: "Example showing pipeline integration and layered semantic output"
 * current_version: "GA1.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "pipeline_integration_demonstration", "test": "Does '{{content}}' demonstrate seamless pipeline integration capabilities? Rate 0-1" },
 *   { "name": "layered_output_sophistication", "test": "Does '{{content}}' show sophisticated layered semantic output? Rate 0-1" },
 *   { "name": "agent_workflow_readiness", "test": "Is '{{content}}' ready for complex agent workflow consumption? Rate 0-1" },
 *   { "name": "cognitive_evolution_potential", "test": "Does '{{content}}' suggest potential for cognitive evolution and learning? Rate 0-1" }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_ANALYZETASKSEMANTICS_DOCCODETOOLEXAMPLE3: PromptPart = 
  'Example 3 - Pipeline Integration with Cognitive Layers: analyzeTaskSemantics({ taskDescription: "Implement AI-driven user personalization engine", analysisDepth: "cognitive", contextualMetadata: { domain: "machine-learning", stakeholders: ["users", "data-scientists", "product"] }, outputGranularity: "layered" }) → Returns stratified semantic analysis with surface intent (feature implementation), semantic layer (personalization architecture), cognitive layer (user behavior modeling), enabling downstream Task Comprehension Agent to apply PTRR methodology with full dimensional understanding' as PromptPart;