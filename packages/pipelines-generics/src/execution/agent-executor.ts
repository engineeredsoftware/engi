/**
 * Agent Executor - minimal adapter turning an agent registry entry
 * into an Executor compatible with execution-generics composition.
 */

import { Executor } from '@bitcode/execution-generics';
import { PipelineExecution } from './PipelineExecution';
import { log } from '@bitcode/logger';
import { isExecutionDebugEnabled } from './debug';

export function createAgentExecutor(agentName: string): Executor<any, any> {
  return async (input: any, execution: any) => {
    const px = execution as PipelineExecution;
    const agent = px.agents.getAgent(agentName);
    if (!agent) throw new Error(`Agent not found: ${agentName}`);
    const phase = String(px.get('phase', 'current') || 'setup');
    const step = 'try';
    px.store('agent', 'name', agentName);
    px.store('step', 'name', step);
    px.store(`agent:${agentName}`, 'start', {
      phase,
      currentPhase: phase,
      agent: agentName,
      currentAgent: agentName,
      step,
      currentStep: step,
      status: 'running',
      input: summarizeValue(input),
      startedAt: new Date().toISOString(),
    } as any);
    const debug = isExecutionDebugEnabled(px);
    if (debug) {
      log('[exec] agent start', 'debug', {
        agent: agentName,
        phase,
        inputPreview: summarizeValue(input),
        executionId: px.id,
      });
    }
    try {
      const output = await agent(input, px);
      px.store(`agent:${agentName}`, 'complete', {
        phase,
        currentPhase: phase,
        agent: agentName,
        currentAgent: agentName,
        step,
        currentStep: step,
        status: 'completed',
        output: summarizeValue(output),
        completedAt: new Date().toISOString(),
      } as any);
      if (debug) {
        log('[exec] agent success', 'debug', {
          agent: agentName,
          phase,
          outputPreview: summarizeValue(output),
          executionId: px.id,
        });
      }
      return output;
    } catch (error: any) {
      px.store(`agent:${agentName}`, 'complete', {
        phase,
        currentPhase: phase,
        agent: agentName,
        currentAgent: agentName,
        step,
        currentStep: step,
        status: 'failed',
        error: summarizeError(error),
        completedAt: new Date().toISOString(),
      } as any);
      if (debug) {
        log('[exec] agent error', 'error', {
          agent: agentName,
          phase,
          error,
          executionId: px.id,
        });
      }
      throw error;
    }
  };
}

function summarizeError(error: any): Record<string, any> {
  if (error instanceof Error) {
    return {
      name: error.name,
      message: error.message,
      stack: error.stack ? error.stack.split('\n').slice(0, 6).join('\n') : undefined,
    };
  }
  return { message: String(error) };
}

function summarizeValue(v: any): any {
  try {
    if (v == null) return v;
    if (typeof v === 'string') return v.length > 500 ? v.slice(0, 500) + '… [truncated]' : v;
    if (Array.isArray(v)) return { type: 'array', length: v.length, sample: summarizeValue(v[0]) };
    if (typeof v === 'object') {
      const keys = Object.keys(v);
      const sample: Record<string, any> = {};
      for (const k of keys.slice(0, 8)) sample[k] = summarizeValue(v[k]);
      return { type: 'object', keys: keys.slice(0, 20), sample };
    }
    return v;
  } catch {
    return '[unserializable]';
  }
}
