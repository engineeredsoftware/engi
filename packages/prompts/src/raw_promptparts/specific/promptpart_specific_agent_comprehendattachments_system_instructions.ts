import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define Comprehend Attachments agent system instructions"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "instruction_completeness", "test": "Do instructions cover all aspects?", "score": 0.37 },
 *   { "name": "technical_precision", "test": "Are technical instructions precise?", "score": 0.36 },
 *   { "name": "workflow_clarity", "test": "Is the workflow clear?", "score": 0.35 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_COMPREHENDATTACHMENTS_SYSTEM_INSTRUCTIONS: PromptPart = 
  'Comprehend attachments by: parsing various file formats and media types, extracting text and metadata from documents, analyzing images and diagrams for context, processing spreadsheets and data files, understanding referenced external resources, correlating attachment content with main task, generating unified context model' as PromptPart;