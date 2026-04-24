/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Agent-specific semantic unit (PROMPTPART_SPECIFIC_AGENT_IMAGEPROCESSOR_TRY_PROCESSING_TECHNIQUES)"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_AGENT_IMAGEPROCESSOR_TRY_PROCESSING_TECHNIQUES: PromptPart = 
  'Allowed techniques: Gaussian/bilateral denoise, unsharp mask, CLAHE (contrast-limited histogram equalization), color correction/white balance, adaptive thresholding, edge-aware resize, smart crop, rotation/perspective correction. Choose minimally destructive methods first.' as PromptPart;