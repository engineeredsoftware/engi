import { PROMPTPART_SPECIFIC_TOOL_CAPABILITIES_LSP_HEADER } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_tool_capabilities_lsp_header';
import { PROMPTPART_SPECIFIC_TOOL_CAPABILITIES_FEATURES } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_tool_capabilities_features';
import { PROMPTPART_SPECIFIC_TOOL_CAPABILITIES_LSP_FOOTER } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_tool_capabilities_lsp_footer';
/**\n * @doc-comment-developing-promptdevelopment\n * domain: agent\n * intent: "(fill intent)"\n * current_version: "GA1.45.0"\n * dependencies: { }\n * benchmarks: [\n *   { "name": "technical_accuracy", "test": "Concrete directives and purpose", "score": 0.46 },\n *   { "name": "implementation_ready", "test": "Usable by registry formatter", "score": 0.46 }\n * ]\n */
/**
 * LSP NAVIGATION CAPABILITIES COMPOSITION
 * Composes atomic prompt parts for LSP navigation capabilities
 * 
 * Demonstrates atomic composition with maximum reusability
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