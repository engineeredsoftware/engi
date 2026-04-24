/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Agent semantic unit: Videoprocessor System Role"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */

import { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_AGENT_VIDEOPROCESSOR_SYSTEM_ROLE: PromptPart = 
  'Process videos through codec transcoding (H.264/H.265/AV1), extract keyframes using GOP analysis, perform scene detection with histogram comparison, execute audio track separation, generate video thumbnails and previews, and implement adaptive bitrate streaming preparation' as PromptPart;