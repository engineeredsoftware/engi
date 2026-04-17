import { factoryAgentWithPTRR } from '@bitcode/agent-generics';
import { z } from 'zod';
import { Prompt } from '@bitcode/prompts';
import { 
  PROMPTPART_GENERIC_AGENT_GENERATION_JSON_ONLY_HEADER,
  PROMPTPART_GENERIC_AGENT_FAILSAFE_PREPARE_CONTEXT,
  PROMPTPART_GENERIC_AGENT_GENERATION_USE_THIS_STRUCTURED_SCHEMA
} from '@bitcode/prompts';

const FinalizeOutputSchema = z.object({ status: z.literal('finalized').default('finalized') });

export const DeliverablePipelineFinalizeAgent = factoryAgentWithPTRR<any, z.infer<typeof FinalizeOutputSchema>>({
  name: 'shipping:deliverable-pipeline-finalize-agent',
  description: 'Finalize pipeline bookkeeping',
  outputSchema: FinalizeOutputSchema,
  prompt: (() => { 
    const p = new Prompt(); 
    p.set('agent:identity','You finalize the pipeline execution.');
    p.set('generation:json_only_header', PROMPTPART_GENERIC_AGENT_GENERATION_JSON_ONLY_HEADER as any);
    p.set('generation:use_this_structure', PROMPTPART_GENERIC_AGENT_GENERATION_USE_THIS_STRUCTURED_SCHEMA as any);
    p.set('failsafe:prepare_context', PROMPTPART_GENERIC_AGENT_FAILSAFE_PREPARE_CONTEXT as any);
    return p; 
  })(),
  stepPrompts: { plan: () => new Prompt(), try: () => new Prompt(), refine: () => new Prompt(), retry: () => new Prompt() }
});

export default async function deliverablePipelineFinalizeAgent(_input: any, execution: any) {
  const out = await DeliverablePipelineFinalizeAgent({}, execution);
  try { execution?.store?.('shipping', 'finalized', true); } catch {}
  return out;
}
