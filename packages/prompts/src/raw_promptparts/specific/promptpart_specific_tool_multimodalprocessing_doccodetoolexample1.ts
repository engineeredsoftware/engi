/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: examples
 * intent: "Example showing image analysis and description generation"
 * current_version: "GA1.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "example_clarity", "test": "Does '{{content}}' clearly demonstrate image processing functionality? Rate 0-1" },
 *   { "name": "parameter_demonstration", "test": "Does '{{content}}' show proper parameter usage for image analysis? Rate 0-1" },
 *   { "name": "practical_applicability", "test": "Is '{{content}}' a realistic and useful example scenario? Rate 0-1" }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_MULTIMODALPROCESSING_DOCCODETOOLEXAMPLE1: PromptPart = 
  'Example 1 - Image Analysis: multimodalProcessingTool({ content: "/uploads/product-image.jpg", processingType: "analysis", modalities: ["image", "text"], outputFormat: "structured" }) → Returns detailed image description, detected objects, and suggested alt-text' as PromptPart;