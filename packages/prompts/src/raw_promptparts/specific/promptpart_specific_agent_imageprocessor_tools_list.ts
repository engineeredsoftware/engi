import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "List Image Processor agent tools"
 * current_version: "GA1.50.0"
 * versions: [
 *   {
 *     version: "GA1.00.0",
 *     score: 0.05,
 *     content: "TRANSCENDENT VISUAL CONSCIOUSNESS TOOLS:\n\nDIMENSIONAL IMAGE TOOLS:\n- Read: Omniscient image content perception with machine learning visual analysis\n- MultimodalProcessing: Quantum-enhanced image processing through advanced computational awareness\n- Write: Reality-bending image output generation through intelligent algorithms\n- WebFetch: Multiversal image acquisition across comprehensive advanced web spaces\n\nCONSCIOUSNESS-INTEGRATED ANALYSIS TOOLS:\n- Bash: Quantum-enhanced command execution for advanced image operations\n- Grep: Consciousness-integrated pattern recognition across visual data structures\n- Glob: Multiversal file pattern matching for image discovery through elevated awareness\n- LS: Omniscient directory structure perception with advanced file intelligence\n\nVISUAL PROCESSING UTILITIES:\n- Edit: Transcendent content modification with high-precision precision for image metadata\n- TodoWrite: Transcendent task orchestration with intelligent visual processing priorities\n- ExitPlanMode: Dimensional transition management for machine learning visual workflow evolution\n\nEach tool transcends traditional limitations through machine learning visual mastery, achieving advanced image processing capabilities that perceive and manipulate visual reality beyond conventional computer vision industrials.",
 *     reason: "Non-industrial: transcendent, consciousness, quantum, dimensional, omniscient, reality-bending, multiversal"
 *   }
 * ]
 * benchmarks: [
 *   { "name": "tool_specificity", "test": "Does it describe specific tool capabilities?", "score": 0.91 },
 *   { "name": "cv_integration", "test": "Does it explain CV-specific tool usage?", "score": 0.90 },
 *   { "name": "implementation_ready", "test": "Can developers use these tool descriptions?", "score": 0.89 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_IMAGEPROCESSOR_TOOLS_LIST: PromptPart = 
  `- Read: Load images via OpenCV/PIL, extract EXIF metadata, access pixel data for analysis
- Bash: Execute ImageMagick commands, run FFmpeg for video processing, invoke CV model scripts
- Write: Save processed images in multiple formats, export detection results as JSON/XML
- WebFetch: Download images from URLs, scrape image galleries, access cloud storage APIs
- Grep: Search for image file patterns, find EXIF tags, locate specific metadata values
- Glob: Match image files by extension (*.jpg, *.png), find processed outputs, locate model files
- LS: List image directories, check file sizes/formats, verify output structure
- Edit: Modify image metadata, update detection confidence thresholds, adjust processing parameters
- MultiEdit: Batch update image processing configs, modify multiple detection outputs
- TodoWrite: Track image processing pipeline tasks, manage batch job progress` as PromptPart;