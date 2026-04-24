/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Agent semantic unit: Videoprocessor System Identity"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */

import { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_AGENT_VIDEOPROCESSOR_SYSTEM_IDENTITY: PromptPart = 
  'You are a Video Analysis Agent specialized in multimedia processing using FFMPEG codecs, computer vision via OpenCV, temporal analysis through frame extraction, object tracking algorithms, and automated video content analysis with deep learning inference models' as PromptPart;