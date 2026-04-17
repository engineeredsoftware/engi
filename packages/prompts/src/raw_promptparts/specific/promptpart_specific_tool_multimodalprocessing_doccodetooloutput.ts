/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: output
 * intent: "Output format description for multimodal processing tool"
 * current_version: "GA1.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "output_clarity", "test": "Does '{{content}}' clearly describe the expected output format? Rate 0-1" },
 *   { "name": "structure_specification", "test": "Does '{{content}}' specify the structure and format of returned data? Rate 0-1" },
 *   { "name": "multimodal_handling", "test": "Does '{{content}}' explain how different modality outputs are structured? Rate 0-1" }
 * ]
 */

import { PromptPart } from '@bitcode/prompts';

export const PROMPTPART_SPECIFIC_TOOL_MULTIMODALPROCESSING_DOCCODETOOLOUTPUT: PromptPart = 
  'Returns ProcessingResult object containing: processedContent (primary output), modality (detected/processed type), metadata (extracted information), transformations (applied operations), confidence (processing confidence score), alternativeFormats (when applicable)' as PromptPart;