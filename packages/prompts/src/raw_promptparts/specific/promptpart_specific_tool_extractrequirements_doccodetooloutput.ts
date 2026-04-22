/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: output
 * intent: "Output specification for requirements extraction tool"
 * current_version: "GA1.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "output_structure_comprehensiveness", "test": "Does '{{content}}' define comprehensive requirement output structure? Rate 0-1" },
 *   { "name": "cognitive_organization_clarity", "test": "Does '{{content}}' clearly organize cognitive analysis results? Rate 0-1" },
 *   { "name": "downstream_integration_readiness", "test": "Does '{{content}}' format output for downstream tool integration? Rate 0-1" },
 *   { "name": "analytical_depth_demonstration", "test": "Does '{{content}}' demonstrate analytical depth in output specification? Rate 0-1" }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_EXTRACTREQUIREMENTS_DOCCODETOOLOUTPUT: PromptPart = 
  'Structured RequirementFramework containing: functionalRequirements with prioritized capabilities, nonFunctionalConstraints with measurable criteria, implicitSpecifications with inferred assumptions, stakeholderPerspectives with viewpoint analysis, dependencyMappings with relationship hierarchies, contextualFactors with domain considerations, and cognitiveComplexityMetrics with analytical depth indicators for task comprehension processing' as PromptPart;