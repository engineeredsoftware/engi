import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define image processor agent system role"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Does it use specific CV operations?", "score": 0.96 },
 *   { "name": "role_clarity", "test": "Does it clearly define image processing role?", "score": 0.94 },
 *   { "name": "implementation_ready", "test": "Can developers implement this role?", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_IMAGEPROCESSOR_SYSTEM_ROLE: PromptPart = 
  'Process images through format conversion (JPEG/PNG/WebP/HEIC), apply enhancement filters using histogram equalization, perform facial recognition via dlib/face_recognition, execute OCR on embedded text, and generate image embeddings with feature vector extraction for similarity matching' as PromptPart;