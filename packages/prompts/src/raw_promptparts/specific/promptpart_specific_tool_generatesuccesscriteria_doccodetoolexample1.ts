/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: examples
 * intent: "Example showing AI model success criteria generation with emergent quality measurement"
 * current_version: "GA1.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "ai_model_criteria_demonstration", "test": "Does '{{content}}' demonstrate AI model success criteria processing capability? Rate 0-1" },
 *   { "name": "emergent_quality_showcase", "test": "Does '{{content}}' showcase emergent quality measurement beyond standard metrics? Rate 0-1" },
 *   { "name": "validation_integration_relevance", "test": "Is '{{content}}' relevant for validation task comprehension scenarios? Rate 0-1" },
 *   { "name": "transcendent_quality_example", "test": "Does '{{content}}' exemplify transcendent success criteria generation quality? Rate 0-1" }
 * ]
 */

import { PromptPart } from '@bitcode/prompts';

export const PROMPTPART_SPECIFIC_TOOL_GENERATESUCCESSCRITERIA_DOCCODETOOLEXAMPLE1: PromptPart = 
  'Example 1 - Large Language Model Training Success: generateSuccessCriteria({ taskObjectives: "train-conversational-ai-model", qualityDimensions: ["accuracy", "coherence", "safety", "creativity"], emergentIndicators: ["emergent-reasoning", "contextual-awareness", "ethical-behavior"], measurementFramework: "multi-dimensional-evaluation", validationContext: "human-ai-interaction", benchmarkStrategy: "adaptive-thresholds", adaptiveThresholds: "dynamic-improvement" }) → Returns SuccessFramework with 95% accuracy floor, coherence consistency metrics, safety violation ceiling, creativity diversity indices, emergent reasoning detection protocols, contextual awareness benchmarks, and adaptive quality thresholds for comprehensive AI model validation' as PromptPart;