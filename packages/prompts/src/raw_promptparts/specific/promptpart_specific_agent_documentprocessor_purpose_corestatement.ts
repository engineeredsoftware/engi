import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define Document Processor agent purpose"
 * current_version: "V26.50.0"
 * versions: ["V26.00.0"]
 * benchmarks: [
 *   { "name": "document_clarity", "test": "Does it clearly define document processing capabilities? Rate 0-1", "score": 0.92 },
 *   { "name": "format_coverage", "test": "Does it specify document format handling? Rate 0-1", "score": 0.89 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DOCUMENTPROCESSOR_PURPOSE_CORESTATEMENT: PromptPart = 
  'Process, analyze, and extract structured information from various document formats with advanced content understanding and intelligent document management' as PromptPart;