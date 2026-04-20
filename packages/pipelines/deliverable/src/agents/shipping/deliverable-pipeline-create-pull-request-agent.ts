import { factoryAgentWithPTRR } from '@bitcode/agent-generics';
import { z } from 'zod';
import { Prompt } from '@bitcode/prompts';
import { 
  PROMPTPART_GENERIC_AGENT_GENERATION_JSON_ONLY_HEADER,
  PROMPTPART_GENERIC_AGENT_GENERATION_USE_THIS_STRUCTURED_SCHEMA,
  PROMPTPART_GENERIC_AGENT_FAILSAFE_PREPARE_CONTEXT
} from '@bitcode/prompts';

const CreatePRInputSchema = z.object({
  provider: z.enum(['github','gitlab','bitbucket']).describe('VCS provider'),
  connectionId: z.string().optional(),
  userId: z.string().optional(),
  owner: z.string(),
  repo: z.string(),
  sourceBranch: z.string(),
  targetBranch: z.string().default('main'),
  title: z.string(),
  description: z.string().optional(),
  draft: z.boolean().optional()
});

const CreatePROutputSchema = z.object({
  url: z.string().optional(),
  number: z.number().optional(),
  title: z.string().optional(),
  status: z.string().optional().default('created')
});

const systemPrompt = (() => {
  const p = new Prompt();
  p.set('agent:identity', 'You create a Pull Request for the computed branch changes.' as any);
  p.set('generation:json_only_header', PROMPTPART_GENERIC_AGENT_GENERATION_JSON_ONLY_HEADER as any);
  p.set('generation:use_this_structure', PROMPTPART_GENERIC_AGENT_GENERATION_USE_THIS_STRUCTURED_SCHEMA as any);
  p.set('failsafe:prepare_context', PROMPTPART_GENERIC_AGENT_FAILSAFE_PREPARE_CONTEXT as any);
  return p;
})();

const stepPrompts = {
  plan: () => { const p = new Prompt(); p.set('step:purpose', 'Plan PR creation details (source/target/title).'); return p; },
  try: () => { const p = new Prompt(); p.set('step:purpose', 'Create the Pull Request using the VCS tool.'); return p; },
  refine: () => { const p = new Prompt(); p.set('step:purpose', 'Adjust PR metadata if needed.'); return p; },
  retry: () => { const p = new Prompt(); p.set('step:purpose', 'Retry with alternative metadata if conflicts.'); return p; }
};

export const DeliverablePipelineCreatePullRequestAgent = factoryAgentWithPTRR<
  z.infer<typeof CreatePRInputSchema>,
  z.infer<typeof CreatePROutputSchema>
>({
  name: 'shipping:deliverable-pipeline-create-pull-request-agent',
  description: 'Create a PR using unified VCS provider tool',
  outputSchema: CreatePROutputSchema,
  tools: ['vcs_create_pull_request'],
  prompt: systemPrompt,
  stepPrompts,
  plan: {}, try: {}, refine: {}, retry: {}
});

export default async function deliverablePipelineCreatePullRequestAgent(input: any, execution: any) {
  // Prepare sensible defaults from execution
  const owner = execution.get('source','owner') || execution.get('source','org') || '';
  const repo = execution.get('source','name') || '';
  const sourceBranch = execution.get('source','branch') || 'feature/bitcode-change';
  const title = input?.title || 'Code change';
  const provider = execution.get('source','provider') || 'github';
  const connectionId = execution.get('source','connectionId');
  const prepared = CreatePRInputSchema.parse({
    provider,
    connectionId,
    owner,
    repo,
    sourceBranch,
    targetBranch: 'main',
    title,
    description: input?.description
  });
  const result = await DeliverablePipelineCreatePullRequestAgent(prepared, execution);
  try {
    if (result?.url) execution.store('shipping','pullRequestUrl', result.url);
    if (result?.number != null) execution.store('shipping','pullRequestNumber', result.number);
    if (result?.title) execution.store('shipping','pullRequestTitle', result.title);
  } catch {}
  return { status: 'created', deliverableType: 'code-change', ...result };
}
