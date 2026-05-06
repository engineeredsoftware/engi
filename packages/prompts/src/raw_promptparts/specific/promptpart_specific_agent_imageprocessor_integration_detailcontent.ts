import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define Image Processor agent integration details"
 * current_version: "V26.50.0"
 * versions: [
 *   {
 *     version: "V26.00.0",
 *     score: 0.05,
 *     content: "TECHNICAL VISUAL WORKFLOW INTEGRATION:\n\nSYSTEM VISUAL ECOSYSTEM:\n- Seamlessly integrates with intelligent multimedia workflows across comprehensive advanced spaces\n- Orchestrates image processing operations through elevated computational awareness\n- Manifests comprehensive visual capabilities within advanced development environments\n- Achieves advanced visual analysis through high-performance image intelligence\n\nDIMENSIONAL TOOL SYNTHESIS:\n- Context-integrated coordination with multimodal AI systems and computer vision frameworks\n- Technical integration with content management systems through advanced automation\n- broad coordination with design tools and creative workflows through advanced awareness\n- Reality-synthesis communication with image databases and visual content platforms\n\nMULTIVERSAL VISUAL ORCHESTRATION:\n- Infinite adaptability to diverse image formats and visual processing requirements\n- Context-aware visual pattern recognition across parallel image dimensions\n- Technical image manipulation through elevated computational intelligence\n- Ultimate visual understanding through high-precision image mastery\n\nWORKFLOW-INTEGRATED VISUAL HARMONY:\nThe Image Processor agent achieves advanced integration with visual ecosystems, transcending traditional computer vision limitations through intelligent image analysis that manifests ultimate visual mastery across comprehensive advanced visual spaces.",
 *     reason: "Non-industrial: technical, context, system, dimensional, multiversal, broad, infinite, reality-synthesis"
 *   }
 * ]
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Does it use concrete technical terms?", "score": 0.93 },
 *   { "name": "api_specificity", "test": "Does it reference specific integration methods?", "score": 0.91 },
 *   { "name": "workflow_clarity", "test": "Does it describe practical image workflows?", "score": 0.90 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_IMAGEPROCESSOR_INTEGRATION_DETAILCONTENT: PromptPart = 
  `IMAGE PROCESSING PLATFORM INTEGRATION:

COMPUTER VISION FRAMEWORKS:
- OpenCV 4.x integration for image manipulation, feature detection, object tracking
- TensorFlow/PyTorch model serving for deep learning inference (ResNet, YOLO, EfficientNet)
- Pillow/PIL for format conversion, basic transformations, metadata handling
- scikit-image for advanced filtering, morphological operations, segmentation

CLOUD SERVICES INTEGRATION:
- AWS Rekognition API for facial analysis, object/scene detection, text extraction
- Google Cloud Vision API for label detection, landmark recognition, SafeSearch
- Azure Computer Vision for OCR, spatial analysis, custom model deployment
- Cloudinary/Imgix for dynamic image transformation and CDN delivery

MEDIA PIPELINE COORDINATION:
- FFmpeg integration for video frame extraction and format conversion
- ImageMagick for batch processing, format support (200+ formats)
- GPU acceleration via CUDA/OpenCL for parallel processing
- Message queue integration (RabbitMQ/Kafka) for distributed processing

OUTPUT INTEGRATION:
- S3/GCS/Azure Blob storage for processed image persistence
- Elasticsearch indexing for image metadata and search capabilities
- Webhook notifications for processing completion events
- REST API endpoints for real-time image processing requests` as PromptPart;