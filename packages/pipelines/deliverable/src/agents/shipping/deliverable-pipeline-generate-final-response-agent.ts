import { factoryAgentWithPTRR } from '@bitcode/agent-generics';
import { z } from 'zod';
import { Prompt } from '@bitcode/prompts';
import { 
  PROMPTPART_GENERIC_AGENT_GENERATION_JSON_ONLY_HEADER,
  PROMPTPART_GENERIC_AGENT_FAILSAFE_PREPARE_CONTEXT,
  PROMPTPART_GENERIC_AGENT_GENERATION_USE_THIS_STRUCTURED_SCHEMA
} from '@bitcode/prompts';

const FinalResponseOutputSchema = z.object({ message: z.string(), summary: z.any().optional() });

export const DeliverablePipelineGenerateFinalResponseAgent = factoryAgentWithPTRR<any, z.infer<typeof FinalResponseOutputSchema>>({
  name: 'shipping:deliverable-pipeline-generate-final-response-agent',
  description: 'Generate final response payload for API/UI surfaces',
  outputSchema: FinalResponseOutputSchema,
  prompt: (() => { 
    const p = new Prompt(); 
    p.set('agent:identity','You prepare a concise API response.');
    p.set('generation:json_only_header', PROMPTPART_GENERIC_AGENT_GENERATION_JSON_ONLY_HEADER as any);
    p.set('generation:use_this_structure', PROMPTPART_GENERIC_AGENT_GENERATION_USE_THIS_STRUCTURED_SCHEMA as any);
    p.set('failsafe:prepare_context', PROMPTPART_GENERIC_AGENT_FAILSAFE_PREPARE_CONTEXT as any);
    return p; 
  })(),
  stepPrompts: { plan: () => new Prompt(), try: () => new Prompt(), refine: () => new Prompt(), retry: () => new Prompt() }
});

export default async function deliverablePipelineGenerateFinalResponseAgent(input: any, execution: any) {
  return await DeliverablePipelineGenerateFinalResponseAgent({ message: 'Delivery completed', summary: input?.summary || {} }, execution);
}
