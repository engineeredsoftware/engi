/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: output
 * intent: "Output specification for constraint identification tool"
 * current_version: "GA1.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "output_structure_comprehensiveness", "test": "Does '{{content}}' define comprehensive constraint output structure? Rate 0-1" },
 *   { "name": "systemic_organization_clarity", "test": "Does '{{content}}' clearly organize systemic analysis results? Rate 0-1" },
 *   { "name": "downstream_integration_readiness", "test": "Does '{{content}}' format output for downstream architectural integration? Rate 0-1" },
 *   { "name": "constraint_depth_demonstration", "test": "Does '{{content}}' demonstrate constraint analysis depth in output specification? Rate 0-1" }
 * ]
 */

import { PromptPart } from '@bitcode/prompts';

export const PROMPTPART_SPECIFIC_TOOL_IDENTIFYCONSTRAINTS_DOCCODETOOLOUTPUT: PromptPart = 
  'Structured ConstraintMatrix containing: technicalLimitations with system boundaries, resourceConstraints with capacity restrictions, temporalRestrictions with time-bound dependencies, regulatoryRequirements with compliance obligations, architecturalDependencies with structural interdependencies, emergentBehaviors with system-wide constraint implications, conflictAnalysis with constraint incompatibilities, and systemicComplexityMetrics with architectural constraint depth indicators for task planning optimization' as PromptPart;