/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: parameters
 * intent: "Parameter specification for requirements extraction tool"
 * current_version: "GA1.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "parameter_comprehensiveness", "test": "Does '{{content}}' cover all essential parameters for requirement extraction? Rate 0-1" },
 *   { "name": "cognitive_configuration_depth", "test": "Does '{{content}}' include cognitive processing configuration options? Rate 0-1" },
 *   { "name": "multi_modal_support", "test": "Does '{{content}}' demonstrate multi-modal input parameter support? Rate 0-1" },
 *   { "name": "analytical_precision_control", "test": "Does '{{content}}' provide analytical precision and depth controls? Rate 0-1" }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_EXTRACTREQUIREMENTS_DOCCODETOOLPARAMETERS: PromptPart = 
  'taskDescription: MultiModalInput, extractionDepth: AnalyticalLevel, requirementTypes: CategoryArray, stakeholderPerspectives: ViewpointSet, contextualFramework: DomainContext, prioritizationStrategy: HierarchyMethod, implicitInferenceLevel: CognitiveDepth, outputStructure: RequirementSchema' as PromptPart;