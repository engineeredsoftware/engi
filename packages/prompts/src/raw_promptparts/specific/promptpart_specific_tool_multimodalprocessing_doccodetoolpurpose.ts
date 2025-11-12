/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: purpose
 * intent: "Purpose statement for multimodal processing tool"
 * current_version: "GA1.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "purpose_clarity", "test": "Does '{{content}}' clearly explain what this tool does? Rate 0-1" },
 *   { "name": "multimodal_emphasis", "test": "Does '{{content}}' emphasize the multimodal content processing capability? Rate 0-1" },
 *   { "name": "use_case_indication", "test": "Does '{{content}}' indicate practical use cases for the tool? Rate 0-1" }
 * ]
 */

import { PromptPart } from '@engi/prompts';

export const PROMPTPART_SPECIFIC_TOOL_MULTIMODALPROCESSING_DOCCODETOOLPURPOSE: PromptPart = 
  'Process and analyze content across multiple modalities including text, images, audio, and video for comprehensive content understanding and transformation' as PromptPart;