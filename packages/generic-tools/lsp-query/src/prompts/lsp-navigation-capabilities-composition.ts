import { PROMPTPART_SPECIFIC_TOOL_CAPABILITIES_LSP_HEADER } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_capabilities_lsp_header';
import { PROMPTPART_SPECIFIC_TOOL_CAPABILITIES_FEATURES } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_capabilities_features';
import { PROMPTPART_SPECIFIC_TOOL_CAPABILITIES_LSP_FOOTER } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_capabilities_lsp_footer';
/**
 * @doc-comment-developing-promptdevelopment
 * domain: tool
 * intent: "Bitcode LSP navigation composition for static symbol evidence in Need measurement"
 * current_version: "0.50.0"
 * dependencies: {
 *   "PROMPTPART_SPECIFIC_TOOL_CAPABILITIES_LSP_HEADER": "0.50.0",
 *   "PROMPTPART_SPECIFIC_TOOL_CAPABILITIES_FEATURES": "0.50.0",
 *   "PROMPTPART_SPECIFIC_TOOL_CAPABILITIES_LSP_FOOTER": "0.50.0"
 * }
 * benchmarks: [
 *   { "name": "measurement_specificity", "test": "Names symbol evidence and Need measurement", "score": 0.82 },
 *   { "name": "implementation_ready", "test": "Usable by DocCodeToolPrompt formatter", "score": 0.66 }
 * ]
 */
/**
 * LSP NAVIGATION CAPABILITIES COMPOSITION
 * Composes atomic prompt parts for LSP measurement capabilities.
 * 
 * The retained navigation operations are useful because they produce evidence
 * that can be replayed into Need, AssetPack, and proof decisions.
 */





/**
 * Compose LSP navigation capabilities
 * 
 * Pattern: [HEADER] [ADJECTIVE] [NOUN] [NOUN] [WITH] [FEATURE_LIST] [FOOTER]
 */
export function composeLspNavigationCapabilities(): string {
  return [
    PROMPTPART_SPECIFIC_TOOL_CAPABILITIES_LSP_HEADER,
    PROMPTPART_SPECIFIC_TOOL_CAPABILITIES_FEATURES,
    PROMPTPART_SPECIFIC_TOOL_CAPABILITIES_LSP_FOOTER
  ].join(' ');
}

export const PROMPTPART_COMPOSED_LSP_NAVIGATION_CAPABILITIES = composeLspNavigationCapabilities();
