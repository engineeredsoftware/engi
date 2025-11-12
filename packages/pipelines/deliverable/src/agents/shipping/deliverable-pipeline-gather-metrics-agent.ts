import { factoryAgentWithPTRR } from '@engi/agent-generics';
import { z } from 'zod';
import { Prompt } from '@engi/prompts';

const GatherMetricsOutputSchema = z.object({
  metrics: z.object({
    agentsExecuted: z.number().nullable().optional(),
    durationMs: z.number().nullable().optional()
  })
});

export const DeliverablePipelineGatherMetricsAgent = factoryAgentWithPTRR<any, z.infer<typeof GatherMetricsOutputSchema>>({
  name: 'shipping:deliverable-pipeline-gather-metrics-agent',
  description: 'Gather execution metrics for finalization',
  outputSchema: GatherMetricsOutputSchema,
  prompt: (() => { const p = new Prompt(); p.set('agent:identity','You summarize metrics from execution.'); return p; })(),
  stepPrompts: { plan: () => new Prompt(), try: () => new Prompt(), refine: () => new Prompt(), retry: () => new Prompt() }
});

export default async function deliverablePipelineGatherMetricsAgent(_input: any, execution: any) {
  const agentsExecuted = execution?.get?.('metrics', 'agentsExecuted') || null;
  // Duration can be computed from pipeline start/end if available
  const start = execution?.get?.('pipeline','startTime');
  const end = execution?.get?.('pipeline','endTime');
  const durationMs = typeof start === 'number' && typeof end === 'number' ? (end - start) : null;
  return await DeliverablePipelineGatherMetricsAgent({ metrics: { agentsExecuted, durationMs } }, execution);
}
