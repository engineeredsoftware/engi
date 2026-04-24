import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Section label for lint rules in Digest Code Styles prompt"
 * current_version: "V26.70.0"
 * versions: []
 * benchmarks: [
 *   { "name": "label_precision", "test": "Does it cover ESLint/TS rules and formatter integration? Rate 0-1", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_TOOL_DIGEST_CODESTYLES_STRUCTURE_LINT_LABEL: PromptPart =
  'Lint Rules & Configurations: Key ESLint/TypeScript rules and overrides; formatter integration.' as PromptPart;
