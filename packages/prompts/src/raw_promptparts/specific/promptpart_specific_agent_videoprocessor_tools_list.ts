import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "List Video Processor agent tools"
 * current_version: "GA1.50.0"
 * versions: [
 *   {
 *     "version": "GA1.00.0",
 *     "content": "TRANSCENDENT TEMPORAL VISUAL CONSCIOUSNESS TOOLS with extreme metaphysical language",
 *     "score": 0.03,
 *     "reason": "Extreme metaphysical: transcendent, consciousness, dimensional, omniscient, quantum, multiversal"
 *   }
 * ]
 * benchmarks: [
 *   { "name": "tool_specification", "test": "Clear tool descriptions for video processing? Rate 0-1", "score": 0.95 },
 *   { "name": "technical_accuracy", "test": "Accurate tool capability descriptions? Rate 0-1", "score": 0.94 },
 *   { "name": "implementation_utility", "test": "Practical tool usage guidance? Rate 0-1", "score": 0.93 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_VIDEOPROCESSOR_TOOLS_LIST: PromptPart = 
  `INDUSTRIAL VIDEO PROCESSING TOOLS:

FILE PROCESSING TOOLS:
- Read: Access video files and metadata for frame extraction and content analysis
- MultimodalProcessing: Handle video, audio, and subtitle stream processing with codec detection
- Write: Generate processed video outputs, transcoded files, and metadata reports
- WebFetch: Download video content from URLs for processing and analysis workflows

COMMAND EXECUTION TOOLS:
- Bash: Execute FFmpeg commands, run video processing scripts, and manage system operations
- Grep: Search video metadata, subtitle content, and processing logs for pattern matching
- Glob: Locate video files by extension and pattern matching for batch processing operations
- LS: Navigate directory structures and identify video file collections for processing

WORKFLOW MANAGEMENT UTILITIES:
- Edit: Modify video processing configuration files, FFmpeg scripts, and metadata files
- MultiEdit: Update multiple video processing configuration files for batch operation setup
- TodoWrite: Track video processing tasks, quality validation steps, and delivery milestones
- ExitPlanMode: Transition between video analysis planning and execution phases

Each tool provides specific functionality for industrial video processing workflows, supporting FFmpeg operations, OpenCV integration, and automated video pipeline management for production environments.` as PromptPart;