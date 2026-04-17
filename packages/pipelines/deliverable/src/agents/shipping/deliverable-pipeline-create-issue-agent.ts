import { factoryAgentWithPTRR } from '@bitcode/agent-generics';
import { z } from 'zod';
import { Prompt } from '@bitcode/prompts';
import { 
  PROMPTPART_GENERIC_AGENT_GENERATION_JSON_ONLY_HEADER,
  PROMPTPART_GENERIC_AGENT_GENERATION_USE_THIS_STRUCTURED_SCHEMA,
  PROMPTPART_GENERIC_AGENT_FAILSAFE_PREPARE_CONTEXT
} from '@bitcode/prompts';

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
  p.set('agent:identity','You create a design document issue.'); 
  p.set('generation:json_only_header', PROMPTPART_GENERIC_AGENT_GENERATION_JSON_ONLY_HEADER as any);
  p.set('generation:use_this_structure', PROMPTPART_GENERIC_AGENT_GENERATION_USE_THIS_STRUCTURED_SCHEMA as any);
  p.set('failsafe:prepare_context', PROMPTPART_GENERIC_AGENT_FAILSAFE_PREPARE_CONTEXT as any);
  return p; 
})();
const stepPrompts = { plan: () => new Prompt(), try: () => new Prompt(), refine: () => new Prompt(), retry: () => new Prompt() };

export const DeliverablePipelineCreateIssueAgent = factoryAgentWithPTRR<
  z.infer<typeof CreateIssueInputSchema>,
  z.infer<typeof CreateIssueOutputSchema>
>({
  name: 'shipping:deliverable-pipeline-create-issue-agent',
  description: 'Create a design document issue',
  outputSchema: CreateIssueOutputSchema,
  tools: ['vcs_create_issue'],
  prompt: systemPrompt,
  stepPrompts,
});

export default async function deliverablePipelineCreateIssueAgent(input: any, execution: any) {
  const owner = execution.get('source','owner') || '';
  const repo = execution.get('source','name') || '';
  const provider = execution.get('source','provider') || 'github';
  const title = input?.title || 'Design Document';
  const body = input?.body;
  const connectionId = execution.get('source','connectionId');
  const args = CreateIssueInputSchema.parse({ provider, connectionId, owner, repo, title, body });
  const result = await DeliverablePipelineCreateIssueAgent(args, execution);
  try { if (result?.url) execution.store('shipping','issueUrl', result.url); if (result?.title) execution.store('shipping','issueTitle', result.title); } catch {}
  return { deliverableType: 'design-document', ...result };
}
