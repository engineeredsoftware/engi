/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: parameters
 * intent: "Parameter specification for implementation complexity analysis tool"
 * current_version: "GA1.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "parameter_comprehensiveness", "test": "Does '{{content}}' cover all essential parameters for complexity analysis? Rate 0-1" },
 *   { "name": "strategic_configuration_depth", "test": "Does '{{content}}' include strategic processing configuration options? Rate 0-1" },
 *   { "name": "implementation_context_support", "test": "Does '{{content}}' demonstrate implementation context parameter support? Rate 0-1" },
 *   { "name": "complexity_precision_control", "test": "Does '{{content}}' provide complexity analysis precision and depth controls? Rate 0-1" }
 * ]
 */

import { PromptPart } from '@bitcode/prompts';

export const PROMPTPART_SPECIFIC_TOOL_ANALYZEIMPLEMENTATIONCOMPLEXITY_DOCCODETOOLPARAMETERS: PromptPart = 
  'implementationScope: ArchitecturalSpace, complexityDimensions: AnalysisVector, strategicContext: PlanningFramework, resourceConstraints: CapacityModel, temporalFactors: TimeComplexity, riskProfile: UncertaintySpace, optimizationTargets: StrategicGoals, outputGranularity: ComplexitySchema' as PromptPart;