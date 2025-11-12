import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Capabilities section for Vercel MCP DocCode"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Lists concrete operations", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Usable as-is in prompts", "score": 0.50 }
 * ]
 */
export const PROMPTPART_SPECIFIC_TOOL_VERCELMCP_DOCCODETOOLCAPABILITIES: PromptPart = 'Fetch deployment details by id; list deployment events; surface timestamps, states, and error messages.' as PromptPart;