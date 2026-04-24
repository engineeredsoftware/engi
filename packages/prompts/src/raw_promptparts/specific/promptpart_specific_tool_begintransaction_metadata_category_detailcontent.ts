import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Doc-code metadata category for BeginTransaction helper"
 * current_version: "V26.70.0"
 * versions: []
 * benchmarks: [
 *   { "name": "category_precision", "test": "Does it specify the file-transaction category? Rate 0-1", "score": 0.95 },
 *   { "name": "doc_alignment", "test": "Is the category phrasing ready for doc-code metadata usage? Rate 0-1", "score": 0.94 }
 * ]
 */
export const PROMPTPART_SPECIFIC_TOOL_BEGINTRANSACTION_METADATA_CATEGORY_DETAILCONTENT: PromptPart =
  'file-transaction' as PromptPart;
