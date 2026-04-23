import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode retained comprehend-task compatibility PromptPart for canonical comprehend-need asset-pack synthesis: agent deliverablesetupcomprehendtask tools available"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "bitcode_need_semantics", "test": "Uses need-first asset-pack written-asset language", "score": 0.95 },
 *   { "name": "compatibility_ready", "test": "Retained deliverable corridor can consume it without semantic drift", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DELIVERABLESETUPCOMPREHENDTASK_TOOLS_AVAILABLE: PromptPart =
  "Available tools: file system operations, code analysis tools, multimodal comprehension tools, VCS integrations, validation utilities, parallel execution framework, state management, and error recovery." as PromptPart;
