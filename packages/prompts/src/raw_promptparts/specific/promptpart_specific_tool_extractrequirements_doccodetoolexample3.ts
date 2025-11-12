/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: examples
 * intent: "Example showing emergent AI system requirement extraction with meta-cognitive analysis"
 * current_version: "GA1.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "emergent_ai_complexity", "test": "Does '{{content}}' demonstrate emergent AI system requirement complexity? Rate 0-1" },
 *   { "name": "meta_cognitive_analysis", "test": "Does '{{content}}' showcase meta-cognitive requirement analysis capabilities? Rate 0-1" },
 *   { "name": "transcendent_architectural_insight", "test": "Does '{{content}}' demonstrate transcendent architectural requirement insights? Rate 0-1" },
 *   { "name": "tool_synergy_demonstration", "test": "Does '{{content}}' show synergy with other task comprehension tools? Rate 0-1" }
 * ]
 */

import { PromptPart } from '@engi/prompts';

export const PROMPTPART_SPECIFIC_TOOL_EXTRACTREQUIREMENTS_DOCCODETOOLEXAMPLE3: PromptPart = 
  'Example 3 - Emergent AI Agent Orchestration Platform: extractRequirements({ taskDescription: [research: "AGI-safety-papers/", vision: "autonomous-agent-ecosystem.md", constraints: "ethical-ai-frameworks/"], extractionDepth: "meta-cognitive", requirementTypes: ["emergent", "ethical", "safety", "scalability", "consciousness"], stakeholderPerspectives: ["humans", "agents", "society"], contextualFramework: "AGI-transition", implicitInferenceLevel: "transcendent" }) → Returns RequirementFramework with emergent behavior specifications, consciousness detection protocols, ethical constraint hierarchies, multi-agent coordination requirements, and meta-cognitive complexity patterns enabling task comprehension tool synergy for unprecedented AI system development' as PromptPart;