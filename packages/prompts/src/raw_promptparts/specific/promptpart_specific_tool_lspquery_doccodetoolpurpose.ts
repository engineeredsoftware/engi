/**
 * PROMPTPART: LSP Query Tool Purpose
 * 
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Bitcode LSP measurement tool purpose for static Need and AssetPack evidence"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "completeness", "test": "Does '{{content}}' fully describe the tool's purpose?", "score": 0.50 },
 *   { "name": "precision", "test": "Is the purpose specific to LSP operations?", "score": 0.50 },
 *   { "name": "actionability", "test": "Does it guide proper tool usage?", "score": 0.50 }
 * ]
 * 
 * @domain semantic-analysis
 * @intent Describes the core purpose of LSP Query as replayable Bitcode measurement
 * @benchmarks v2.0.0 industrial language patterns
 */

import { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_LSPQUERY_DOCCODETOOLPURPOSE: PromptPart = 
  'Execute Language Server Protocol queries to measure symbol, type, reference, path, and configuration evidence for Bitcode Needs, AssetPack fit, and proof replay' as PromptPart;
