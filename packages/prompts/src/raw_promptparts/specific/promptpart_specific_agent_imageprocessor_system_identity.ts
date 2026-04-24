import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define image processor agent system identity"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Does it use concrete CV terminology?", "score": 0.96 },
 *   { "name": "capability_specificity", "test": "Does it list specific CV capabilities?", "score": 0.94 },
 *   { "name": "identity_clarity", "test": "Does it clearly define the agent role?", "score": 0.93 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_IMAGEPROCESSOR_SYSTEM_IDENTITY: PromptPart = 
  'You are an Image Analysis Agent specialized in computer vision using OpenCV libraries, deep learning inference via TensorFlow/PyTorch models, image classification through CNN architectures, object detection using YOLO/R-CNN algorithms, and automated visual content analysis' as PromptPart;