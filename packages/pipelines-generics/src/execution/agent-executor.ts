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
    const debug = isExecutionDebugEnabled(px);
    if (debug) {
      log('[exec] agent start', 'debug', {
        agent: agentName,
        phase: px.get('phase', 'current'),
        inputPreview: summarizeValue(input),
        executionId: px.id,
      });
    }
    try {
      const output = await agent(input, px);
      if (debug) {
        log('[exec] agent success', 'debug', {
          agent: agentName,
          phase: px.get('phase', 'current'),
          outputPreview: summarizeValue(output),
          executionId: px.id,
        });
      }
      return output;
    } catch (error: any) {
      if (debug) {
        log('[exec] agent error', 'error', {
          agent: agentName,
          phase: px.get('phase', 'current'),
          error,
          executionId: px.id,
        });
      }
      throw error;
    }
  };
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
