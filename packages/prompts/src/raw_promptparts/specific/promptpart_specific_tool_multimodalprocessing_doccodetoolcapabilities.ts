/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: capabilities
 * intent: "Capabilities description for multimodal processing tool"
 * current_version: "GA1.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "capability_completeness", "test": "Does '{{content}}' cover all major multimodal processing capabilities? Rate 0-1" },
 *   { "name": "technical_specificity", "test": "Does '{{content}}' provide specific technical capabilities rather than vague descriptions? Rate 0-1" },
 *   { "name": "modality_coverage", "test": "Does '{{content}}' clearly list supported content modalities? Rate 0-1" }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_MULTIMODALPROCESSING_DOCCODETOOLCAPABILITIES: PromptPart = 
  'Text analysis and extraction, image recognition and description, audio transcription and analysis, video frame analysis, cross-modal content correlation, format conversion between modalities, content summarization and synthesis, metadata extraction across all supported formats' as PromptPart;