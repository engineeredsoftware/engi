/**
 * Deliverables Shipping Phase – Ship Agent (PTRR)
 *
 * Executes final delivery actions depending on deliverable type:
 * - code-change: commit + push with use-computer (git), then create PR via VCS tool
 * - code-change-review: submit review comment via VCS tool
 * - design-document: create issue via VCS tool
 * - design-document-review: add comment via VCS tool
 */
import { factoryAgentWithPTRR } from '@bitcode/agent-generics';
import { z } from 'zod';
import { Prompt } from '@bitcode/prompts';
import { 
  PROMPTPART_GENERIC_AGENT_GENERATION_JSON_ONLY_HEADER,
  PROMPTPART_GENERIC_AGENT_FAILSAFE_PREPARE_CONTEXT,
  PROMPTPART_GENERIC_AGENT_GENERATION_USE_THIS_STRUCTURED_SCHEMA
} from '@bitcode/prompts';

const ShipOutputSchema = z.object({
  status: z.enum(['shipped','partial']).default('shipped'),
  deliverableType: z.string().optional(),
  prUrl: z.string().optional(),
  issueUrl: z.string().optional(),
  commentUrl: z.string().optional(),
});

const systemPrompt = (() => {
  const p = new Prompt();
  p.set('agent:identity', 'You are the Ship agent. Based on deliverable type, perform final delivery actions using available tools.' as any);
  p.set('generation:json_only_header', PROMPTPART_GENERIC_AGENT_GENERATION_JSON_ONLY_HEADER as any);
  p.set('generation:use_this_structure', PROMPTPART_GENERIC_AGENT_GENERATION_USE_THIS_STRUCTURED_SCHEMA as any);
  p.set('failsafe:prepare_context', PROMPTPART_GENERIC_AGENT_FAILSAFE_PREPARE_CONTEXT as any);
  return p;
})();

const stepPrompts = {
  plan: () => { const p = new Prompt(); p.set('step:purpose', 'Plan the exact shipping actions based on deliverable type.' as any); return p; },
  try: () => {
    const p = new Prompt();
    p.set('step:purpose', 'Execute shipping actions. Prefer VCS tools. For code-change, commit+push with use-computer then create PR.' as any);
    // Instruction for tool selection
    p.set('tools:policy', 'If deliverable type is code-change: use use-computer to run git commands in workspacePath, then call vcs_create_pull_request. For design-document: call vcs_create_issue. For reviews: call vcs_create_comment with appropriate target.' as any);
    return p;
  },
  refine: () => { const p = new Prompt(); p.set('step:purpose', 'Adjust actions if initial attempts failed (e.g., branch exists).' as any); return p; },
  retry: () => { const p = new Prompt(); p.set('step:purpose', 'Retry shipping with fallback strategies.' as any); return p; }
};

export const DeliverablePipelineShippingPhaseShipAgent = factoryAgentWithPTRR<any, z.infer<typeof ShipOutputSchema>>({
  name: 'shipping:deliverable-pipeline-ship-agent',
  description: 'Perform final shipping actions per deliverable type',
  outputSchema: ShipOutputSchema as any,
  // Tools available to this agent
  tools: [
    'deliverable-pipeline-use-computer-tool',
    'vcs_create_pull_request',
    'vcs_create_issue',
    'vcs_create_comment'
  ],
  prompt: systemPrompt,
  stepPrompts,
});

export default async function ship(input: any, execution: any) {
  // Prepare context from execution
  const dtype = execution.findUp?.('pipeline','deliverableType') || execution.get?.('pipeline','deliverableType') || execution.get?.('setup','deliverableType') || 'code-change';
  const workspacePath = execution.get?.('repository','workspacePath');
  const owner = execution.get?.('repository','owner') || '';
  const repo = execution.get?.('repository','name') || '';
  const provider = execution.get?.('repository','provider') || 'github';
  const connectionId = execution.get?.('repository','connectionId');

  // Build tool plan via output.useTools using agent PTRR Try step instructions
  // This wrapper just calls the agent; ToolsExecution handles the rest. Afterward, store useful URLs.
  const result = await DeliverablePipelineShippingPhaseShipAgent({ deliverableType: dtype, workspacePath, owner, repo, provider, connectionId, input }, execution);

  // Best-effort: infer URLs from usedTools (if any)
  try {
    const used = (result as any)?.usedTools as Array<any> | undefined;
    if (Array.isArray(used)) {
      for (const u of used) {
        if (u?.tool === 'vcs_create_pull_request' && u?.output?.url) {
          execution.store('shipping','pullRequestUrl', String(u.output.url));
          result.prUrl = String(u.output.url);
        }
        if (u?.tool === 'vcs_create_issue' && u?.output?.url) {
          execution.store('shipping','issueUrl', String(u.output.url));
          result.issueUrl = String(u.output.url);
        }
        if (u?.tool === 'vcs_create_comment' && u?.output?.url) {
          execution.store('shipping','commentUrl', String(u.output.url));
          result.commentUrl = String(u.output.url);
        }
      }
    }
  } catch {}

  return { status: result?.status || 'shipped', deliverableType: dtype, prUrl: (result as any)?.prUrl, issueUrl: (result as any)?.issueUrl, commentUrl: (result as any)?.commentUrl };
}
