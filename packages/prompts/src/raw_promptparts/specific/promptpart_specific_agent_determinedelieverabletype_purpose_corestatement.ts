import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define purpose of deliverable type determination agent"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "classification_accuracy", "test": "Correctly classifies into 4 types?", "score": 0.96 },
 *   { "name": "reasoning_clarity", "test": "Provides clear classification reasoning?", "score": 0.94 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DETERMINEDELIEVERABLETYPE_PURPOSE_CORESTATEMENT: PromptPart = 
  'Classify task into code-change, code-change-review, design-document, or design-document-review based on intent analysis and indicator patterns' as PromptPart;