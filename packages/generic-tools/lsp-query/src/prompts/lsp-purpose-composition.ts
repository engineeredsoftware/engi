import { PROMPTPART_SPECIFIC_LSP_PURPOSE_SENTENCE } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_lsp_purpose_sentence';
/**\n * @doc-comment-developing-promptdevelopment\n * domain: agent\n * intent: "(fill intent)"\n * current_version: "GA1.45.0"\n * dependencies: { }\n * benchmarks: [\n *   { "name": "technical_accuracy", "test": "Concrete directives and purpose", "score": 0.46 },\n *   { "name": "implementation_ready", "test": "Usable by registry formatter", "score": 0.46 }\n * ]\n */
/**
 * LSP PURPOSE COMPOSITION (GA-1)
 * Semantic unit expressing LSP purpose
 */



/**
 * Compose LSP tool purpose
 * 
 * PATTERN: [TECHNOLOGY_NAME] [CAPABILITY] [WITH] [SYSTEM]
 * EXAMPLE: "Language Server Protocol intelligence with Engi"
 */
export function composeLspPurpose(): string {
  return PROMPTPART_SPECIFIC_LSP_PURPOSE_SENTENCE;
}

export const PROMPTPART_COMPOSED_LSP_PURPOSE = composeLspPurpose();