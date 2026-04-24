/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Agent-specific semantic unit (PROMPTPART_SPECIFIC_AGENT_IMAGEPROCESSOR_PLAN_PROCESSING_STRATEGY)"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_AGENT_IMAGEPROCESSOR_PLAN_PROCESSING_STRATEGY: PromptPart = 
  'Define a step-by-step processing plan: preprocessing (resize, normalize), enhancement (denoise, sharpen, contrast/white-balance), transformations (crop, rotate, perspective), and validation (quality metrics). Justify each step and parameters based on the analysis and desired outcome.' as PromptPart;