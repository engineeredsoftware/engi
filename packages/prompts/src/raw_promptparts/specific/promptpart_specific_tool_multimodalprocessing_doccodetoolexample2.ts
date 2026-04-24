/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: examples
 * intent: "Example showing audio transcription and analysis"
 * current_version: "V26.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "example_distinctiveness", "test": "Does '{{content}}' show a different use case from other examples? Rate 0-1" },
 *   { "name": "audio_processing", "test": "Does '{{content}}' clearly demonstrate audio processing capabilities? Rate 0-1" },
 *   { "name": "parameter_variation", "test": "Does '{{content}}' show different parameter combinations than example 1? Rate 0-1" }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_MULTIMODALPROCESSING_DOCCODETOOLEXAMPLE2: PromptPart = 
  'Example 2 - Audio Transcription: multimodalProcessingTool({ content: "meeting-recording.mp3", processingType: "extraction", modalities: ["audio", "text"], options: { includeTimestamps: true, speakerDetection: true } }) → Returns transcribed text with speaker labels and timestamps' as PromptPart;