import { factoryAgentWithPTRR } from '@bitcode/agent-generics';
import { z } from 'zod';
import { Prompt } from '@bitcode/prompts/prompt';
import { createPromptPart } from '@bitcode/prompts/parts/PromptPart';
import { PROMPTPART_GENERIC_AGENT_GENERATION_JSON_ONLY_HEADER } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_json_only_header';
import { PROMPTPART_GENERIC_AGENT_GENERATION_USE_THIS_STRUCTURED_SCHEMA } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_use_this_structured_schema';
import { PROMPTPART_GENERIC_AGENT_FAILSAFE_PREPARE_CONTEXT } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_failsafe_prepare_context';

const AddCommentInputSchema = z.object({
  provider: z.enum(['github','gitlab','bitbucket']).describe('VCS provider'),
  connectionId: z.string().optional(),
  userId: z.string().optional(),
  owner: z.string(),
  repo: z.string(),
  type: z.enum(['issue','pr']).default('issue'),
  number: z.number().describe('Issue or PR number'),
  body: z.string().describe('Comment body')
});

const AddCommentOutputSchema = z.object({ status: z.literal('commented').default('commented'), url: z.string().optional(), title: z.string().optional() });

const systemPrompt = (() => { 
  const p = new Prompt(); 
  p.set('agent:identity', createPromptPart('You add a comment to an issue/PR.'));
  p.set('generation:json_only_header', PROMPTPART_GENERIC_AGENT_GENERATION_JSON_ONLY_HEADER as any);
  p.set('generation:use_this_structure', PROMPTPART_GENERIC_AGENT_GENERATION_USE_THIS_STRUCTURED_SCHEMA as any);
  p.set('failsafe:prepare_context', PROMPTPART_GENERIC_AGENT_FAILSAFE_PREPARE_CONTEXT as any);
  return p; 
})();
const stepPrompts = { plan: () => new Prompt(), try: () => new Prompt(), refine: () => new Prompt(), retry: () => new Prompt() };

export const DeliverablePipelineAddCommentAgent = factoryAgentWithPTRR<
  z.infer<typeof AddCommentInputSchema>,
  z.infer<typeof AddCommentOutputSchema>
>({
  name: 'shipping:deliverable-pipeline-add-comment-agent',
  description: 'Add a comment to an issue or PR',
  outputSchema: AddCommentOutputSchema,
  tools: ['vcs_create_comment'],
  prompt: systemPrompt,
  stepPrompts,
});

export default async function deliverablePipelineAddCommentAgent(input: any, execution: any) {
  const owner = execution.get('source','owner') || '';
  const repo = execution.get('source','name') || '';
  const provider = execution.get('source','provider') || 'github';
  const number = input?.number || 1;
  const body = input?.body || 'Design review comment.';
  const type = input?.type || 'issue';
  const connectionId = execution.get('source','connectionId');
  const args = AddCommentInputSchema.parse({ provider, connectionId, owner, repo, type, number, body });
  const result = await DeliverablePipelineAddCommentAgent(args, execution);
  try { if (result?.url) execution.store('shipping','commentUrl', result.url); if (result?.title) execution.store('shipping','commentTitle', result.title); } catch {}
  return {
    writtenAssetType: 'design-document-review',
    deliverableType: 'design-document-review',
    ...result,
  };
}
