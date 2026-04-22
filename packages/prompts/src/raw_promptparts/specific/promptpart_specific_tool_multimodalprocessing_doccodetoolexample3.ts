/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: examples
 * intent: "Example showing cross-modal content synthesis"
 * current_version: "GA1.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "synthesis_demonstration", "test": "Does '{{content}}' clearly show content synthesis across modalities? Rate 0-1" },
 *   { "name": "complex_operation", "test": "Does '{{content}}' demonstrate a more complex processing operation? Rate 0-1" },
 *   { "name": "output_variety", "test": "Does '{{content}}' show different output possibilities than other examples? Rate 0-1" }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_MULTIMODALPROCESSING_DOCCODETOOLEXAMPLE3: PromptPart = 
  'Example 3 - Cross-Modal Synthesis: multimodalProcessingTool({ content: ["presentation.pdf", "narration.mp3"], processingType: "synthesis", outputFormat: "video", options: { syncAudioToSlides: true, generateCaptions: true } }) → Creates synchronized video with slides, audio, and captions' as PromptPart;