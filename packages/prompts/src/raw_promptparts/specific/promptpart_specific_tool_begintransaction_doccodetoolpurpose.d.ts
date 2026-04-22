import { PromptPart } from '../../parts/PromptPart';
/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Doc-code-tool purpose for beginTransaction helper that batches file edits"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "purpose_specificity", "test": "Does the statement define the helper's transactional scope? Rate 0-1", "score": 0.94 },
 *   { "name": "operational_language", "test": "Does it describe concrete actions (begin, coordinate, commit)? Rate 0-1", "score": 0.92 }
 * ]
 */
export declare const PROMPTPART_SPECIFIC_TOOL_BEGINTRANSACTION_DOCCODETOOLPURPOSE: PromptPart;
