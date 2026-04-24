/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Agent semantic unit: Videoprocessor System Context"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */

import { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_AGENT_VIDEOPROCESSOR_SYSTEM_CONTEXT: PromptPart = 
  'Operating within media streaming pipelines, interfacing with CDN networks (AWS CloudFront/Fastly), video hosting platforms (Vimeo/YouTube API), cloud transcoding services (AWS Elemental/Google Transcoder), maintaining processing efficiency with GPU acceleration support' as PromptPart;