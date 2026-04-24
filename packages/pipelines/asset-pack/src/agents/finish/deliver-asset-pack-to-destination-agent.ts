/**
 * AssetPack Finish Phase - Deliver Agent (PTRR)
 *
 * Executes final Delivering actions based on the requested delivery mechanism,
 * after written assets have already been synthesized and validated.
 */
import { factoryAgentWithPTRR } from '@bitcode/agent-generics';
import { z } from 'zod';
import { Prompt } from '@bitcode/prompts/prompt';
import { PROMPTPART_GENERIC_AGENT_GENERATION_JSON_ONLY_HEADER } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_json_only_header';
import { PROMPTPART_GENERIC_AGENT_FAILSAFE_PREPARE_CONTEXT } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_failsafe_prepare_context';
import { PROMPTPART_GENERIC_AGENT_GENERATION_USE_THIS_STRUCTURED_SCHEMA } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_use_this_structured_schema';
import {
  resolveDeliveryMechanismTemplateFromExecution,
  resolveWrittenAssetTypeFromExecution,
} from '../../semantic-resolution';

const FinishDeliveryOutputSchema = z.object({
  status: z.enum(['delivered','partial']).default('delivered'),
  writtenAssetType: z.string().optional(),
  deliverableType: z.string().optional(),
  deliveryMechanismTemplate: z.string().optional(),
  prUrl: z.string().optional(),
  issueUrl: z.string().optional(),
  commentUrl: z.string().optional(),
});

const systemPrompt = (() => {
  const p = new Prompt();
  p.set('agent:identity', 'You are the Finish Deliver agent. Deliver shippables: connected-interface objects that wrap saved AssetPacks or AssetPackPartials for requested third-party destinations using delivery-mechanism tools.' as any);
  p.set('generation:json_only_header', PROMPTPART_GENERIC_AGENT_GENERATION_JSON_ONLY_HEADER as any);
  p.set('generation:use_this_structure', PROMPTPART_GENERIC_AGENT_GENERATION_USE_THIS_STRUCTURED_SCHEMA as any);
  p.set('failsafe:prepare_context', PROMPTPART_GENERIC_AGENT_FAILSAFE_PREPARE_CONTEXT as any);
  return p;
})();

const stepPrompts = {
  plan: () => { const p = new Prompt(); p.set('step:purpose', 'Plan the exact Finish/Delivering actions and shippable evidence required for the requested destination.' as any); return p; },
  try: () => {
    const p = new Prompt();
    p.set('step:purpose', 'Execute Delivering actions through VCS tools after AssetPack synthesis artifacts are already saved.' as any);
    // Instruction for tool selection
    p.set('tools:policy', 'Use the requested delivery mechanism template after the AssetPack is synthesized: pull-request uses vcs_create_pull_request, issue uses vcs_create_issue, and comment templates use vcs_create_comment. Computer use is reserved for internal Need-measurement evidence and is not a V26 Delivering tool.' as any);
    return p;
  },
  refine: () => { const p = new Prompt(); p.set('step:purpose', 'Adjust shippable delivery actions if initial attempts failed, such as an existing branch or unavailable destination.' as any); return p; },
  retry: () => { const p = new Prompt(); p.set('step:purpose', 'Retry Delivering shippables with fallback strategies.' as any); return p; }
};

export const AssetPackFinishDeliverAgent = factoryAgentWithPTRR<any, z.infer<typeof FinishDeliveryOutputSchema>>({
  name: 'finish:deliver-asset-pack-to-destination-agent',
  description: 'Deliver final shippables through requested delivery mechanisms',
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
  const deliveryMechanismTemplate = resolveDeliveryMechanismTemplateFromExecution(execution);
  const workspacePath = execution.get?.('repository','workspacePath');
  const owner = execution.get?.('repository','owner') || '';
  const repo = execution.get?.('repository','name') || '';
  const provider = execution.get?.('repository','provider') || 'github';
  const connectionId = execution.get?.('repository','connectionId');

  // Build tool plan via output.useTools using agent PTRR Try step instructions
  // This executor calls the agent; ToolsExecution handles tool invocation and
  // the Finish store preserves the operator-facing delivery evidence.
  const result = await AssetPackFinishDeliverAgent(
    {
      writtenAssetType: dtype,
      deliverableType: dtype,
      deliveryMechanismTemplate,
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
          result.prUrl = String(u.output.url);
        }
        if (u?.tool === 'vcs_create_issue' && u?.output?.url) {
          execution.store('finish','issueUrl', String(u.output.url));
          result.issueUrl = String(u.output.url);
        }
        if (u?.tool === 'vcs_create_comment' && u?.output?.url) {
          execution.store('finish','commentUrl', String(u.output.url));
          result.commentUrl = String(u.output.url);
        }
      }
    }
  } catch {}

  return {
    status: result?.status || 'delivered',
    writtenAssetType: dtype,
    deliverableType: dtype,
    deliveryMechanismTemplate,
    prUrl: (result as any)?.prUrl,
    issueUrl: (result as any)?.issueUrl,
    commentUrl: (result as any)?.commentUrl,
  };
}
