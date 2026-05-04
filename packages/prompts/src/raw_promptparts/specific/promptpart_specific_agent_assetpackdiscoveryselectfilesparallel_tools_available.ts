/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: auto
 * intent: "Bitcode AssetPack discovery PromptPart for selecting source files relevant to Need satisfaction and AssetPack scope: agent assetpackdiscoveryselectfilesparallel tools available"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */

import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode AssetPack discovery PromptPart for selecting source files relevant to Need satisfaction and AssetPack scope: agent assetpackdiscoveryselectfilesparallel tools available"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "tools_available_clarity", "test": "Clear tools available?", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_ASSETPACKDISCOVERYSELECTFILESPARALLEL_TOOLS_AVAILABLE: PromptPart = 
  'Available tools: attachment parsing, multimodal evidence extraction, file-system reads, code analysis tools, VCS integrations, validation utilities, state management, error handling and recovery' as PromptPart;