/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: parameters
 * intent: "Parameter specifications for multimodal processing tool"
 * current_version: "GA1.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "parameter_completeness", "test": "Does '{{content}}' cover all necessary parameters for multimodal processing? Rate 0-1" },
 *   { "name": "type_specification", "test": "Does '{{content}}' clearly specify parameter types and requirements? Rate 0-1" },
 *   { "name": "practical_usability", "test": "Are the parameters in '{{content}}' practical and usable for real scenarios? Rate 0-1" }
 * ]
 */

import { PromptPart } from '@engi/prompts';

export const PROMPTPART_SPECIFIC_TOOL_MULTIMODALPROCESSING_DOCCODETOOLPARAMETERS: PromptPart = 
  'content (required): Input content or file path, processingType (required): analysis|extraction|conversion|synthesis, modalities (optional): Array of target modalities to process, outputFormat (optional): Desired output format, options (optional): Processing-specific configuration object' as PromptPart;