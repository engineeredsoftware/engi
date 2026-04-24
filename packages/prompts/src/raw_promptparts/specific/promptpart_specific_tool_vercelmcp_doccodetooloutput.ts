import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Output section for Vercel MCP DocCode"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Describes structured result", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Usable as-is in prompts", "score": 0.50 }
 * ]
 */
export const PROMPTPART_SPECIFIC_TOOL_VERCELMCP_DOCCODETOOLOUTPUT: PromptPart = 'Output: { id: string; state: string; createdAt: string; events?: Array<{ type: string; message?: string; ts: string }>; error?: string }' as PromptPart;