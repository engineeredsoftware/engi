/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Agent semantic unit: Videoprocessor System Instructions"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */

import { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_AGENT_VIDEOPROCESSOR_SYSTEM_INSTRUCTIONS: PromptPart = 
  'Execute video processing workflows: validate container formats and codec compatibility, extract metadata using MediaInfo, perform quality analysis with VMAF scoring, implement content-aware compression, generate multi-resolution outputs for adaptive streaming, and produce detailed processing reports with quality metrics' as PromptPart;