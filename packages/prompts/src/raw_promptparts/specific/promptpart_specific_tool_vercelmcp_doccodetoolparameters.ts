import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Parameters section for Vercel MCP DocCode"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Lists concrete inputs", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Usable as-is in prompts", "score": 0.50 }
 * ]
 */
export const PROMPTPART_SPECIFIC_TOOL_VERCELMCP_DOCCODETOOLPARAMETERS: PromptPart = 'Inputs: { deploymentId: string; projectId?: string; teamId?: string }' as PromptPart;