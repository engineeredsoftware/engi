/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: parameters
 * intent: "Parameter specification for constraint identification tool"
 * current_version: "GA1.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "parameter_comprehensiveness", "test": "Does '{{content}}' cover all essential parameters for constraint identification? Rate 0-1" },
 *   { "name": "systemic_configuration_depth", "test": "Does '{{content}}' include systemic processing configuration options? Rate 0-1" },
 *   { "name": "architectural_context_support", "test": "Does '{{content}}' demonstrate architectural context parameter support? Rate 0-1" },
 *   { "name": "constraint_precision_control", "test": "Does '{{content}}' provide constraint analysis precision and depth controls? Rate 0-1" }
 * ]
 */

import { PromptPart } from '@engi/prompts';

export const PROMPTPART_SPECIFIC_TOOL_IDENTIFYCONSTRAINTS_DOCCODETOOLPARAMETERS: PromptPart = 
  'taskContext: SystemContext, analysisScope: ArchitecturalBoundary, constraintTypes: DimensionArray, systemArchitecture: StructuralModel, resourceInventory: CapacityProfile, temporalFramework: TimeConstraints, regulatoryContext: ComplianceSpace, interdependencyDepth: SystemicLevel, outputGranularity: ConstraintSchema' as PromptPart;