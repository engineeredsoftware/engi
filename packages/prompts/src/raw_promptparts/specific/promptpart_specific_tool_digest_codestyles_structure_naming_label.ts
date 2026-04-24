import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Section label for naming conventions in Digest Code Styles prompt"
 * current_version: "V26.70.0"
 * versions: []
 * benchmarks: [
 *   { "name": "label_precision", "test": "Does it enumerate the naming coverage (variables, classes, React components)? Rate 0-1", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_TOOL_DIGEST_CODESTYLES_STRUCTURE_NAMING_LABEL: PromptPart =
  'Naming Conventions: Variables, functions, classes, interfaces, modules, React components/hooks.' as PromptPart;
