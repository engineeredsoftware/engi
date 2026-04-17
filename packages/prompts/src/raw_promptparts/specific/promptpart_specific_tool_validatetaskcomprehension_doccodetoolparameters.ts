/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: parameters
 * intent: "Parameter specification for task comprehension validation tool"
 * current_version: "GA1.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "parameter_comprehensiveness", "test": "Does '{{content}}' cover all essential parameters for comprehension validation? Rate 0-1" },
 *   { "name": "meta_cognitive_configuration_depth", "test": "Does '{{content}}' include meta-cognitive processing configuration options? Rate 0-1" },
 *   { "name": "holistic_context_support", "test": "Does '{{content}}' demonstrate holistic context parameter support? Rate 0-1" },
 *   { "name": "validation_precision_control", "test": "Does '{{content}}' provide comprehension validation precision and depth controls? Rate 0-1" }
 * ]
 */

import { PromptPart } from '@bitcode/prompts';

export const PROMPTPART_SPECIFIC_TOOL_VALIDATETASKCOMPREHENSION_DOCCODETOOLPARAMETERS: PromptPart = 
  'comprehensionArtifacts: CognitiveBundle, validationDepth: MetaCognitiveLevel, coherenceThreshold: AlignmentCriteria, integrationScope: HolisticBoundary, gapDetectionSensitivity: CognitivePrecision, verificationFramework: ValidationSchema, outputCompleteness: ComprehensionAssurance' as PromptPart;