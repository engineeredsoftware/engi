/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: parameters
 * intent: "Parameter specification for success criteria generation tool"
 * current_version: "GA1.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "parameter_comprehensiveness", "test": "Does '{{content}}' cover all essential parameters for success criteria generation? Rate 0-1" },
 *   { "name": "emergent_configuration_depth", "test": "Does '{{content}}' include emergent processing configuration options? Rate 0-1" },
 *   { "name": "validation_context_support", "test": "Does '{{content}}' demonstrate validation context parameter support? Rate 0-1" },
 *   { "name": "criteria_precision_control", "test": "Does '{{content}}' provide success criteria precision and depth controls? Rate 0-1" }
 * ]
 */

import { PromptPart } from '@engi/prompts';

export const PROMPTPART_SPECIFIC_TOOL_GENERATESUCCESSCRITERIA_DOCCODETOOLPARAMETERS: PromptPart = 
  'taskObjectives: OutcomeDefinition, qualityDimensions: QualitySpace, emergentIndicators: BehaviorSet, measurementFramework: MetricSchema, validationContext: QualityContext, benchmarkStrategy: ComparisonMethod, adaptiveThresholds: DynamicCriteria, outputGranularity: SuccessSchema' as PromptPart;