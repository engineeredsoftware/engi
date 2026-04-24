/**
 * AssetPack Finish Phase - Deliver Agent (PTRR)
 *
 * Executes final Delivering actions depending on written-asset type:
 * - code-change: use VCS delivery mechanisms after written assets are already synthesized
 * - code-change-review: submit review comment via VCS tool
 * - design-document: create issue via VCS tool
 * - design-document-review: add comment via VCS tool
 */
import { factoryAgentWithPTRR } from '@bitcode/agent-generics';
import { z } from 'zod';
import { Prompt } from '@bitcode/prompts/prompt';
import { PROMPTPART_GENERIC_AGENT_GENERATION_JSON_ONLY_HEADER } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_json_only_header';
import { PROMPTPART_GENERIC_AGENT_FAILSAFE_PREPARE_CONTEXT } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_failsafe_prepare_context';
import { PROMPTPART_GENERIC_AGENT_GENERATION_USE_THIS_STRUCTURED_SCHEMA } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_use_this_structured_schema';
import { resolveWrittenAssetTypeFromExecution } from '../../semantic-resolution';

const FinishDeliveryOutputSchema = z.object({
  status: z.enum(['delivered','partial']).default('delivered'),
  writtenAssetType: z.string().optional(),
  deliverableType: z.string().optional(),
  prUrl: z.string().optional(),
  issueUrl: z.string().optional(),
  commentUrl: z.string().optional(),
});

const systemPrompt = (() => {
  const p = new Prompt();
  p.set('agent:identity', 'You are the Finish Deliver agent. Based on written-asset type, save useful result state and provide AssetPacks or AssetPackPartials to requested third-party destinations using available tools.' as any);
  p.set('generation:json_only_header', PROMPTPART_GENERIC_AGENT_GENERATION_JSON_ONLY_HEADER as any);
  p.set('generation:use_this_structure', PROMPTPART_GENERIC_AGENT_GENERATION_USE_THIS_STRUCTURED_SCHEMA as any);
  p.set('failsafe:prepare_context', PROMPTPART_GENERIC_AGENT_FAILSAFE_PREPARE_CONTEXT as any);
  return p;
})();

const stepPrompts = {
  plan: () => { const p = new Prompt(); p.set('step:purpose', 'Plan the exact Finish/Delivering actions based on written-asset type and requested delivery destination.' as any); return p; },
  try: () => {
    const p = new Prompt();
    p.set('step:purpose', 'Execute Delivering actions through VCS tools after written assets are already synthesized.' as any);
    // Instruction for tool selection
    p.set('tools:policy', 'If written-asset type is code-change: call vcs_create_pull_request using the prepared written-asset context. For design-document: call vcs_create_issue. For reviews: call vcs_create_comment with appropriate target. Computer use is reserved for internal Need-measurement evidence and is not a V26 Delivering tool.' as any);
    return p;
  },
  refine: () => { const p = new Prompt(); p.set('step:purpose', 'Adjust actions if initial attempts failed (e.g., branch exists).' as any); return p; },
  retry: () => { const p = new Prompt(); p.set('step:purpose', 'Retry Delivering with fallback strategies.' as any); return p; }
};

export const DeliverablePipelineFinishPhaseDeliverAgent = factoryAgentWithPTRR<any, z.infer<typeof FinishDeliveryOutputSchema>>({
  name: 'finish:deliver-asset-pack-to-destination-agent',
  description: 'Perform final Delivering actions per written-asset type',
  outputSchema: FinishDeliveryOutputSchema as any,
  // Tools available to this agent
  tools: [
    'vcs_create_pull_request',
    'vcs_create_issue',
    'vcs_create_comment'
  ],
  prompt: systemPrompt,
  stepPrompts,
});

export default async function deliverAssetPackToDestination(input: any, execution: any) {
  // Prepare context from execution
  const dtype = resolveWrittenAssetTypeFromExecution(execution);
  const workspacePath = execution.get?.('repository','workspacePath');
  const owner = execution.get?.('repository','owner') || '';
  const repo = execution.get?.('repository','name') || '';
  const provider = execution.get?.('repository','provider') || 'github';
  const connectionId = execution.get?.('repository','connectionId');

  // Build tool plan via output.useTools using agent PTRR Try step instructions
  // This executor calls the agent; ToolsExecution handles tool invocation and
  // the Finish store preserves the operator-facing delivery evidence.
  const result = await DeliverablePipelineFinishPhaseDeliverAgent(
    {
      writtenAssetType: dtype,
      deliverableType: dtype,
      workspacePath,
      owner,
      repo,
      provider,
      connectionId,
      input,
    },
    execution
  );

  // Best-effort: infer URLs from usedTools (if any)
  try {
    const used = (result as any)?.usedTools as Array<any> | undefined;
    if (Array.isArray(used)) {
      for (const u of used) {
        if (u?.tool === 'vcs_create_pull_request' && u?.output?.url) {
          execution.store('finish','pullRequestUrl', String(u.output.url));
          execution.store('shipping','pullRequestUrl', String(u.output.url));
          result.prUrl = String(u.output.url);
        }
        if (u?.tool === 'vcs_create_issue' && u?.output?.url) {
          execution.store('finish','issueUrl', String(u.output.url));
          execution.store('shipping','issueUrl', String(u.output.url));
          result.issueUrl = String(u.output.url);
        }
        if (u?.tool === 'vcs_create_comment' && u?.output?.url) {
          execution.store('finish','commentUrl', String(u.output.url));
          execution.store('shipping','commentUrl', String(u.output.url));
          result.commentUrl = String(u.output.url);
        }
      }
    }
  } catch {}

  return {
    status: result?.status || 'delivered',
    writtenAssetType: dtype,
    deliverableType: dtype,
    prUrl: (result as any)?.prUrl,
    issueUrl: (result as any)?.issueUrl,
    commentUrl: (result as any)?.commentUrl,
  };
}
