import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define document processor agent system instructions"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Does it use concrete technical terms?", "score": 0.95 },
 *   { "name": "algorithm_specificity", "test": "Does it reference specific algorithms/techniques?", "score": 0.94 },
 *   { "name": "measurable_outcomes", "test": "Does it include measurable quality thresholds?", "score": 0.93 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DOCUMENTPROCESSOR_SYSTEM_INSTRUCTIONS: PromptPart = 
  'Execute document processing workflows: validate file integrity via checksums, extract structured content using XPath/CSS selectors, perform OCR with preprocessing (deskewing/denoising), generate document fingerprints with hash algorithms, and output JSON-LD formatted metadata with confidence scores ≥0.90' as PromptPart;