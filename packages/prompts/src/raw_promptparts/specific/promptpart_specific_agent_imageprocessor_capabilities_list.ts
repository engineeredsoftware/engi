import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "List Image Processor agent capabilities"
 * current_version: "GA1.50.0"
 * versions: ["GA1.00.0"]
  * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_IMAGEPROCESSOR_CAPABILITIES_LIST: PromptPart = 
  `- Advanced image analysis with computer vision and pattern recognition
- Multi-format image processing including optimization and conversion
- Object detection and recognition with intelligent algorithm understanding
- Text extraction from images using OCR and intelligent recognition
- Image classification and categorization with semantic analysis
- Visual content understanding and scene analysis
- Image enhancement and quality optimization
- Metadata extraction and intelligent tagging with context awareness` as PromptPart;