/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Agent-specific semantic unit (PROMPTPART_SPECIFIC_AGENT_IMAGEPROCESSOR_REFINE_QUALITY_CRITERIA)"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_AGENT_IMAGEPROCESSOR_REFINE_QUALITY_CRITERIA: PromptPart = 
  'Quality criteria: sharpness (e.g., variance of Laplacian), noise level (SNR), color fidelity (delta-E), artifact suppression, readable text (OCR confidence), accurate crop/geometry, and consistent dimensions. Specify acceptance thresholds with brief rationale.' as PromptPart;