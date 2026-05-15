import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode canonical comprehend-read PromptPart for read-first written-asset / asset-pack synthesis: agent assetpacksetupcomprehendread tools available"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "bitcode_read_semantics", "test": "Uses read-first asset-pack written-asset language", "score": 0.95 },
 *   { "name": "support_ready", "test": "AssetPack setup corridor can consume it without semantic drift", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_ASSETPACKSETUPCOMPREHENDREAD_TOOLS_AVAILABLE: PromptPart =
  "Available tools: file system operations, code analysis tools, multimodal comprehension tools, VCS integrations, validation utilities, parallel execution framework, state management, and error recovery." as PromptPart;
