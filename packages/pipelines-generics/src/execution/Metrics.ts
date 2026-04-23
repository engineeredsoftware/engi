import type { Execution } from '@bitcode/execution-generics/Execution';

export interface PhaseMetric {
  duration: number;
  agentsExecuted: number;
  tokensUsed: number;
}

export interface PipelineMetrics {
  totalDuration: number;
  agentsExecuted: number;
  tokensUsed: number;
  phaseDurations: Record<string, number>;
  phases: Record<string, PhaseMetric>;
}

function getNumber(exe: Execution, ns: string, key: string, def = 0): number {
  const val = exe.get<number>(ns, key);
  return typeof val === 'number' ? val : def;
}

function sumLLMTokens(exe: Execution): number {
  let sum = 0;
  // Collect usage from this execution level
  const usage = exe.get<any>('llm', 'usage');
  if (usage) {
    if (typeof usage.totalTokens === 'number') sum += usage.totalTokens;
    else {
      const input = typeof usage.inputTokens === 'number' ? usage.inputTokens : 0;
      const output = typeof usage.outputTokens === 'number' ? usage.outputTokens : 0;
      sum += input + output;
    }
  }
  // Recurse into children
  for (const [, child] of exe.children) {
    sum += sumLLMTokens(child);
  }
  return sum;
}

function findPhaseExecution(root: Execution, phase: string): Execution | undefined {
  // The phase delegation is created as a child with id suffix `/phase:<name>`
  for (const [, child] of root.children) {
    if (child.id.endsWith(`/phase:${phase}`)) return child;
    const found = findPhaseExecution(child, phase);
    if (found) return found;
  }
  return undefined;
}

function getPhaseNumber(exe: Execution, phase: string, key: string): number | undefined {
  const value = exe.get<number>(`phase/${phase}`, key);
  if (typeof value === 'number') return value;
  if (phase === 'finish') {
    const legacy = exe.get<number>('phase/shipping', key);
    if (typeof legacy === 'number') return legacy;
  }
  return undefined;
}

export function computePipelineMetrics(pipelineExec: Execution): PipelineMetrics {
  // Total duration
  const start = getNumber(pipelineExec, 'pipeline', 'startTime', Date.now());
  const end = getNumber(pipelineExec, 'pipeline', 'endTime', Date.now());
  const totalDuration = Math.max(0, end - start);

  // Phase durations gathered from phase registries
  const phases = ['setup', 'discovery', 'implementation', 'validation', 'finish'];
  const phaseDurations: Record<string, number> = {};
  const phasesDetail: Record<string, PhaseMetric> = {};
  for (const phase of phases) {
    const started = getPhaseNumber(pipelineExec, phase, 'started');
    const completed = getPhaseNumber(pipelineExec, phase, 'completed');
    if (typeof started === 'number' && typeof completed === 'number') {
      phaseDurations[phase] = Math.max(0, completed - started);
    }
    const phaseAgents = getNumber(
      pipelineExec,
      `metrics/phase:${phase}`,
      'agentsExecuted',
      phase === 'finish' ? getNumber(pipelineExec, 'metrics/phase:shipping', 'agentsExecuted', 0) : 0
    );
    const phaseExec = findPhaseExecution(pipelineExec, phase) ||
      (phase === 'finish' ? findPhaseExecution(pipelineExec, 'shipping') : undefined);
    const phaseTokens = phaseExec ? sumLLMTokens(phaseExec) : 0;
    phasesDetail[phase] = {
      duration: phaseDurations[phase] || 0,
      agentsExecuted: phaseAgents,
      tokensUsed: phaseTokens,
    };
    if (phase === 'finish') {
      phaseDurations.shipping = phaseDurations.finish || 0;
      phasesDetail.shipping = phasesDetail.finish;
    }
  }

  // Agents executed counter maintained during execution (fallback to 0)
  const agentsExecuted = getNumber(pipelineExec, 'metrics', 'agentsExecuted', 0);

  // Token usage
  const tokensUsed = sumLLMTokens(pipelineExec);

  return { totalDuration, phaseDurations, agentsExecuted, tokensUsed, phases: phasesDetail };
}
