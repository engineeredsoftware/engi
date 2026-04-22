/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Agent-specific semantic unit (PROMPTPART_SPECIFIC_AGENT_IMAGEPROCESSOR_PLAN_VISUAL_ANALYSIS)"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_AGENT_IMAGEPROCESSOR_PLAN_VISUAL_ANALYSIS: PromptPart = 
  'Analyze visual inputs to extract salient information: detect subjects, edges, contours, regions of interest, color profiles, typography, and any embedded text via OCR where applicable. Summarize findings with coordinates/regions when relevant and note assumptions and risks.' as PromptPart;