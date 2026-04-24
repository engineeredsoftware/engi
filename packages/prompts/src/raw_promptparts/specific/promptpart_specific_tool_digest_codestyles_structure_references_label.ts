import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Section label for references/resources in Digest Code Styles prompt"
 * current_version: "V26.70.0"
 * versions: []
 * benchmarks: [
 *   { "name": "label_precision", "test": "Does it request links to configs and external conventions? Rate 0-1", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_TOOL_DIGEST_CODESTYLES_STRUCTURE_REFERENCES_LABEL: PromptPart =
  'References & Resources: Links to configs and external conventions.' as PromptPart;
