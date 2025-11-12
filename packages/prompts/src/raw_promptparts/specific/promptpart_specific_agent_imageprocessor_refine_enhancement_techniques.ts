import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Agent-specific semantic unit (PROMPTPART_SPECIFIC_AGENT_IMAGEPROCESSOR_REFINE_ENHANCEMENT_TECHNIQUES)"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_AGENT_IMAGEPROCESSOR_REFINE_ENHANCEMENT_TECHNIQUES: PromptPart = 
  'Refine using targeted enhancements: localized denoise, local contrast (CLAHE), unsharp mask tuning, selective color correction, gamma/white-balance adjustment, halo/ringing suppression. Avoid over-processing; preserve natural detail.' as PromptPart;