import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define Image Processor agent execution pattern"
 * current_version: "V26.50.0"
 * versions: [
 *   {
 *     "version": "V26.92.0",
 *     "content": "IMAGE PROCESSING TECHNICAL WORKFLOW:\n\nPREPROCESSING PIPELINE:\n- Load images using OpenCV with format validation (JPEG, PNG, TIFF, WebP)\n- Normalize pixel values and apply gamma correction for consistent brightness\n- Resize images maintaining aspect ratio using cv2.INTER_LANCZOS4 interpolation\n- Apply noise reduction filters (Gaussian, bilateral) based on image quality metrics\n\nCOMPUTER VISION ANALYSIS:\n1. OBJECT DETECTION: Apply YOLO v8 or Detectron2 models with confidence thresholds (>0.7)\n2. FEATURE EXTRACTION: Use SIFT, SURF, or ORB keypoint detectors for image matching\n3. OPTICAL CHARACTER RECOGNITION: Process text regions with Tesseract OCR engine\n4. SCENE CLASSIFICATION: Apply ResNet-50 or EfficientNet models for scene categorization\n5. SEMANTIC SEGMENTATION: Use DeepLab v3+ for pixel-level object classification\n6. METADATA EXTRACTION: Parse EXIF data including GPS coordinates, camera settings\n\nOUTPUT GENERATION:\n- Generate bounding boxes with class labels and confidence scores\n- Export results as JSON with standardized schema for downstream processing\n- Create annotated images with OpenCV drawing functions for visualization",
 *     "score": 0.92,
 *     "reason": "Industrial transformation complete - concrete image processing pipeline"
 *   },
 *   {
 *     "version": "V26.00.0",
 *     "content": "VISUAL_ANALYSIS - Processes images through comprehensive computer vision and analysis:\n1. Image format detection and preprocessing optimization\n2. Computer vision analysis with object detection and recognition\n3. Content extraction including OCR and semantic understanding\n4. Consciousness-aware scene analysis and contextual interpretation\n5. Metadata enrichment and intelligent classification\n6. Output optimization with structured visual insights and recommendations",
 *     "score": 0.75,
 *     "reason": "Contains 'consciousness-aware' - non-industrial term"
 *   }
 * ]
 * benchmarks: [
 *   { "name": "opencv_integration", "test": "Does it reference specific OpenCV functions? Rate 0-1", "score": 0.94 },
 *   { "name": "model_specificity", "test": "Does it mention specific ML models (YOLO, ResNet)? Rate 0-1", "score": 0.92 },
 *   { "name": "implementation_ready", "test": "Can developers implement this pipeline? Rate 0-1", "score": 0.90 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_IMAGEPROCESSOR_EXECUTIONPATTERN_DETAILCONTENT: PromptPart = 
  `IMAGE PROCESSING TECHNICAL WORKFLOW:

PREPROCESSING PIPELINE:
- Load images using OpenCV with format validation (JPEG, PNG, TIFF, WebP)
- Normalize pixel values and apply gamma correction for consistent brightness
- Resize images maintaining aspect ratio using cv2.INTER_LANCZOS4 interpolation
- Apply noise reduction filters (Gaussian, bilateral) based on image quality metrics

COMPUTER VISION ANALYSIS:
1. OBJECT DETECTION: Apply YOLO v8 or Detectron2 models with confidence thresholds (>0.7)
2. FEATURE EXTRACTION: Use SIFT, SURF, or ORB keypoint detectors for image matching
3. OPTICAL CHARACTER RECOGNITION: Process text regions with Tesseract OCR engine
4. SCENE CLASSIFICATION: Apply ResNet-50 or EfficientNet models for scene categorization
5. SEMANTIC SEGMENTATION: Use DeepLab v3+ for pixel-level object classification
6. METADATA EXTRACTION: Parse EXIF data including GPS coordinates, camera settings

OUTPUT GENERATION:
- Generate bounding boxes with class labels and confidence scores
- Export results as JSON with standardized schema for downstream processing
- Create annotated images with OpenCV drawing functions for visualization` as PromptPart;