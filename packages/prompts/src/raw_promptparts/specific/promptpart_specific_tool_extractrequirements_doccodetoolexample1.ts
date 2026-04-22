/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: examples
 * intent: "Example showing multi-stakeholder requirement extraction with cognitive depth"
 * current_version: "GA1.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "multi_stakeholder_demonstration", "test": "Does '{{content}}' demonstrate multi-stakeholder requirement processing capability? Rate 0-1" },
 *   { "name": "cognitive_depth_showcase", "test": "Does '{{content}}' showcase deep cognitive analysis beyond surface parsing? Rate 0-1" },
 *   { "name": "agent_integration_relevance", "test": "Is '{{content}}' relevant for task comprehension agent usage scenarios? Rate 0-1" },
 *   { "name": "transcendent_quality_example", "test": "Does '{{content}}' exemplify transcendent requirement extraction quality? Rate 0-1" }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_EXTRACTREQUIREMENTS_DOCCODETOOLEXAMPLE1: PromptPart = 
  'Example 1 - Multi-Stakeholder E-commerce Platform: extractRequirements({ taskDescription: [text: "Build scalable e-commerce platform", specs: "performance-requirements.pdf", stakeholders: ["developers", "users", "business"]], extractionDepth: "comprehensive", requirementTypes: ["functional", "performance", "security", "usability"], stakeholderPerspectives: "all", contextualFramework: "enterprise-web", implicitInferenceLevel: "deep" }) → Returns structured RequirementFramework with 47 functional requirements, 23 performance constraints, implicit scalability assumptions, stakeholder conflict analysis, and cognitive complexity stratification' as PromptPart;