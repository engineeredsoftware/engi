import { factoryAgentWithPTRR } from '@bitcode/agent-generics';
import { z } from 'zod';
import { Prompt } from '@bitcode/prompts/prompt';
import { createPromptPart } from '@bitcode/prompts/parts/PromptPart';
import { PROMPTPART_GENERIC_AGENT_GENERATION_JSON_ONLY_HEADER } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_json_only_header';
import { PROMPTPART_GENERIC_AGENT_GENERATION_USE_THIS_STRUCTURED_SCHEMA } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_use_this_structured_schema';
import { PROMPTPART_GENERIC_AGENT_FAILSAFE_PREPARE_CONTEXT } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_failsafe_prepare_context';

const CreateIssueInputSchema = z.object({
  provider: z.enum(['github','gitlab','bitbucket']).describe('VCS provider'),
  connectionId: z.string().optional(),
  userId: z.string().optional(),
  owner: z.string(),
  repo: z.string(),
  title: z.string(),
  body: z.string().optional(),
  labels: z.array(z.string()).optional()
});

const CreateIssueOutputSchema = z.object({ status: z.literal('created').default('created'), url: z.string().optional(), title: z.string().optional() });

const systemPrompt = (() => { 
  const p = new Prompt(); 
  p.set('agent:identity', createPromptPart('You deliver AssetPack design-document evidence by creating an issue.'));
  p.set('generation:json_only_header', PROMPTPART_GENERIC_AGENT_GENERATION_JSON_ONLY_HEADER as any);
  p.set('generation:use_this_structure', PROMPTPART_GENERIC_AGENT_GENERATION_USE_THIS_STRUCTURED_SCHEMA as any);
  p.set('failsafe:prepare_context', PROMPTPART_GENERIC_AGENT_FAILSAFE_PREPARE_CONTEXT as any);
  return p; 
})();
const stepPrompts = { plan: () => new Prompt(), try: () => new Prompt(), refine: () => new Prompt(), retry: () => new Prompt() };

export const AssetPackFinishCreateIssueDeliveryAgent = factoryAgentWithPTRR<
  z.infer<typeof CreateIssueInputSchema>,
  z.infer<typeof CreateIssueOutputSchema>
>({
  name: 'finish:asset-pack-create-issue-delivery-agent',
  description: 'Deliver AssetPack design-document evidence by creating an issue',
  outputSchema: CreateIssueOutputSchema,
  tools: ['vcs_create_issue'],
  prompt: systemPrompt,
  stepPrompts,
});

export default async function assetPackFinishCreateIssueDeliveryAgent(input: any, execution: any) {
  const owner = execution.get('source','owner') || '';
  const repo = execution.get('source','name') || '';
  const provider = execution.get('source','provider') || 'github';
  const title = input?.title || 'Design Document';
  const body = input?.body;
  const connectionId = execution.get('source','connectionId');
  const args = CreateIssueInputSchema.parse({ provider, connectionId, owner, repo, title, body });
  const result = await AssetPackFinishCreateIssueDeliveryAgent(args, execution);
  try {
    if (result?.url) {
      execution.store('finish', 'issueUrl', result.url);
      execution.store('shipping', 'issueUrl', result.url);
    }
    if (result?.title) {
      execution.store('finish', 'issueTitle', result.title);
      execution.store('shipping', 'issueTitle', result.title);
    }
  } catch {}
  return {
    writtenAssetType: 'design-document',
    deliverableType: 'design-document',
    ...result,
  };
}
