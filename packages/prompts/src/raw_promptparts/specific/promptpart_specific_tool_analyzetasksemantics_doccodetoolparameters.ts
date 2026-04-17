/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: parameters
 * intent: "Parameter specification for task semantic analysis tool"
 * current_version: "GA1.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "multi_modal_input_support", "test": "Does '{{content}}' support multi-modal task description inputs? Rate 0-1" },
 *   { "name": "semantic_depth_configuration", "test": "Does '{{content}}' allow configurable semantic analysis depth? Rate 0-1" },
 *   { "name": "cognitive_layer_targeting", "test": "Does '{{content}}' enable targeting specific cognitive analysis layers? Rate 0-1" },
 *   { "name": "pipeline_integration_flexibility", "test": "Does '{{content}}' provide flexibility for various pipeline integrations? Rate 0-1" }
 * ]
 */

import { PromptPart } from '@bitcode/prompts';

export const PROMPTPART_SPECIFIC_TOOL_ANALYZETASKSEMANTICS_DOCCODETOOLPARAMETERS: PromptPart = 
  'taskDescription: string | multimodal content, analysisDepth: "surface" | "semantic" | "cognitive" | "transcendent", targetDimensions: string[], contextualMetadata?: object, cognitiveFramework?: "PTRR" | "custom", outputGranularity: "structured" | "layered" | "graph"' as PromptPart;