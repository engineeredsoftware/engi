import { factoryAgentWithPTRR } from '@bitcode/agent-generics';
import { z } from 'zod';
import { Prompt } from '@bitcode/prompts/prompt';
import { createPromptPart } from '@bitcode/prompts/parts/PromptPart';
import { PROMPTPART_GENERIC_AGENT_GENERATION_JSON_ONLY_HEADER } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_json_only_header';
import { PROMPTPART_GENERIC_AGENT_GENERATION_USE_THIS_STRUCTURED_SCHEMA } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_use_this_structured_schema';
import { PROMPTPART_GENERIC_AGENT_FAILSAFE_PREPARE_CONTEXT } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_failsafe_prepare_context';

const SubmitReviewInputSchema = z.object({
  provider: z.enum(['github','gitlab','bitbucket']).describe('VCS provider'),
  connectionId: z.string().optional(),
  userId: z.string().optional(),
  owner: z.string(),
  repo: z.string(),
  number: z.number().describe('Pull request number'),
  body: z.string().describe('Review body/comment')
});

const SubmitReviewOutputSchema = z.object({ status: z.literal('submitted').default('submitted'), url: z.string().optional() });

const systemPrompt = (() => { 
  const p = new Prompt(); 
  p.set('agent:identity', createPromptPart('You deliver AssetPack review evidence by submitting a pull request review comment.'));
  p.set('generation:json_only_header', PROMPTPART_GENERIC_AGENT_GENERATION_JSON_ONLY_HEADER as any);
  p.set('generation:use_this_structure', PROMPTPART_GENERIC_AGENT_GENERATION_USE_THIS_STRUCTURED_SCHEMA as any);
  p.set('failsafe:prepare_context', PROMPTPART_GENERIC_AGENT_FAILSAFE_PREPARE_CONTEXT as any);
  return p; 
})();
const stepPrompts = { plan: () => new Prompt(), try: () => new Prompt(), refine: () => new Prompt(), retry: () => new Prompt() };

export const AssetPackFinishSubmitReviewDeliveryAgent = factoryAgentWithPTRR<
  z.infer<typeof SubmitReviewInputSchema>,
  z.infer<typeof SubmitReviewOutputSchema>
>({
  name: 'finish:asset-pack-submit-review-delivery-agent',
  description: 'Deliver AssetPack evidence through a pull request review-comment mechanism',
  outputSchema: SubmitReviewOutputSchema,
  tools: ['vcs_create_comment'],
  prompt: systemPrompt,
  stepPrompts,
});

export default async function assetPackFinishSubmitReviewDeliveryAgent(input: any, execution: any) {
  const owner = execution.get('source','owner') || '';
  const repo = execution.get('source','name') || '';
  const provider = execution.get('source','provider') || 'github';
  const number = input?.number || execution.get('finish','pullRequestNumber') || 1;
  const body = input?.body || 'Automated review submitted.';
  const connectionId = execution.get('source','connectionId');
  const args = SubmitReviewInputSchema.parse({ provider, connectionId, owner, repo, number, body });
  const result = await AssetPackFinishSubmitReviewDeliveryAgent(args, execution);
  try {
    if (result?.url) {
      execution.store('finish', 'reviewUrl', result.url);
    }
  } catch {}
  return {
    writtenAssetType: 'need-satisfaction-asset-pack',
    deliverableType: 'need-satisfaction-asset-pack',
    deliveryMechanismTemplate: 'review-comment',
    ...result,
  };
}
