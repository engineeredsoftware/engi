import { PROMPTPART_SPECIFIC_LSP_PURPOSE_SENTENCE } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_lsp_purpose_sentence';
/**
 * @doc-comment-developing-promptdevelopment
 * domain: tool
 * intent: "Bitcode LSP purpose composition for static Need measurement and AssetPack evidence"
 * current_version: "0.50.0"
 * dependencies: { "PROMPTPART_SPECIFIC_LSP_PURPOSE_SENTENCE": "0.50.0" }
 * benchmarks: [
 *   { "name": "measurement_specificity", "test": "Names Need measurement and AssetPack evidence", "score": 0.82 },
 *   { "name": "implementation_ready", "test": "Usable by DocCodeToolPrompt formatter", "score": 0.66 }
 * ]
 */
/**
 * LSP PURPOSE COMPOSITION
 * Semantic unit expressing LSP as Bitcode measurement infrastructure.
 */



/**
 * Compose LSP tool purpose.
 * 
 * PATTERN: [TECHNOLOGY_NAME] [CAPABILITY] [WITH] [SYSTEM]
 * EXAMPLE: "Language Server Protocol static measurement for Bitcode Need and AssetPack evidence"
 */
export function composeLspPurpose(): string {
  return PROMPTPART_SPECIFIC_LSP_PURPOSE_SENTENCE;
}

export const PROMPTPART_COMPOSED_LSP_PURPOSE = composeLspPurpose();
