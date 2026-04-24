import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Example 3 for Vercel MCP DocCode"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Shows concrete Vercel usage", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Usable as-is in prompts", "score": 0.50 }
 * ]
 */
export const PROMPTPART_SPECIFIC_TOOL_VERCELMCP_DOCCODETOOLEXAMPLE3: PromptPart = 'Example: Fetch deployment events for a given deploymentId and print each event as "[ts] type: message".' as PromptPart;