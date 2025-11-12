import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define purpose of attachment comprehension agent"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "design_extraction", "test": "Extracts Figma/design requirements?", "score": 0.94 },
 *   { "name": "multimodal_processing", "test": "Handles images, docs, PDFs?", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_COMPREHENDATTACHMENTS_PURPOSE_CORESTATEMENT: PromptPart = 
  'Process Figma designs, images, and documents to extract visual specifications, components, and design requirements for implementation' as PromptPart;