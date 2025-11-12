/**
 * Multi-Deliverables Pipeline (Quick Loop)
 *
 * Elegant demonstration of executor primitives: repeatedly executes the
 * deliverable pipeline and checks readiness to finish. Aggregates each
 * iteration's postprocessed result into a `series`, and stores a unified
 * postprocessed result at the top level.
 */

import type { Executor } from '@engi/execution-generics';
import { sequential } from '@engi/execution-generics';
import { factoryQuickPipeline, type QuickPhase } from '@engi/pipelines-generics';
import deliverablePipeline from '@engi/pipeline-deliverable';

type Input = any;
type Output = any;

// Agent 1: Execute one deliverable (delegates to deliverables pipeline)
const executeOnce: Executor<Input, any> = async (input, exec) => {
  const result = await deliverablePipeline(input, exec);
  // Try to read the just-produced postprocessed result
  let postprocessed: any = undefined;
  try { postprocessed = (exec as any).get?.('postprocessed', 'result'); } catch {}
  // Maintain a series array under multi/series
  try {
    const series = (exec as any).get?.('multi', 'series') || [];
    if (postprocessed) series.push(postprocessed);
    (exec as any).store?.('multi', 'series', series);
  } catch {}
  return result;
};

// Agent 2: Decide whether to continue looping (simple strategy)
const readyToDone: Executor<any, boolean> = async (_input, exec) => {
  // Stop if iteration limit reached (from config.iterationCount)
  const max = Number((exec as any).get?.('config', 'iterationCount') || 3) || 3;
  const series = ((exec as any).get?.('multi', 'series') || []) as any[];
  if (series.length >= max) return true;
  // Simple heuristic: stop if we have at least one deliverable and next would be redundant
  return false;
};

// Compose a quick loop: [executeOnce -> readyToDone]*
const quickPhase: QuickPhase<Input, Output> = async (input, exec) => {
  const loop = sequential(executeOnce, async (_o, e) => ({ done: await readyToDone(_o, e) }));
  const max = Number((exec as any).get?.('config', 'iterationCount') || 3) || 3;
  let i = 0;
  let last: any = undefined;
  while (i < max) {
    i++;
    const res = await loop(input, exec);
    last = res;
    if (res?.done) break;
  }
  // Synthesize unified postprocessed result as multi-deliverable with entries
  try {
    const series = (exec as any).get?.('multi', 'series') || [];
    const first = series[0] || {};
    const unified = {
      executionId: String((exec as any).get?.('execution', 'id') || ''),
      kind: 'multi-deliverable' as const,
      title: first?.title || `Deliverables (${series.length})`,
      repository: first?.repository || ((exec as any).get?.('repository','name') || ''),
      summary: `Produced ${series.length} deliverable(s).` ,
      artifacts: null,
      entries: series,
    };
    (exec as any).store?.('postprocessed', 'result', unified);
  } catch {}
  return last as Output;
};

export const multiDeliverablesPipeline: Executor<Input, Output> = factoryQuickPipeline<Input, Output>(
  'multi-deliverables',
  { phase: quickPhase }
);

export default multiDeliverablesPipeline;
