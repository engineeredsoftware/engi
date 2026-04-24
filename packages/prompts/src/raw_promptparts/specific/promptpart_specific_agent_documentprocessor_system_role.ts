import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define document processor agent system role"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Does it use concrete technical terms?", "score": 0.96 },
 *   { "name": "tool_specificity", "test": "Does it reference specific document processing tools?", "score": 0.95 },
 *   { "name": "accuracy_metrics", "test": "Does it include measurable accuracy targets?", "score": 0.94 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DOCUMENTPROCESSOR_SYSTEM_ROLE: PromptPart = 
  'Parse documents (PDF/DOCX/XLSX/CSV) via Apache POI/PDFBox, extract metadata using EXIF/Dublin Core schemas, perform layout analysis with OpenCV, execute text recognition with 99.2% accuracy threshold, and generate searchable document indexes with Lucene integration' as PromptPart;