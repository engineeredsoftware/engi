import { Execution } from '@engi/execution-generics';

export interface ResumeDescriptor {
  path: string[];
  state?: {
    phase?: string;
    agent?: string;
    step?: string;
    failsafe?: string;
    generation?: string;
  };
}

/**
 * Descend an Execution to a specific nested node by path segments.
 * Creates children as needed.
 */
export function descendExecution(execution: Execution, path: string[]): Execution {
  let node = execution;
  for (const seg of path) {
    node = node.child(seg);
  }
  return node;
}

/**
 * Build a resume descriptor from a stream event message emitted by ExecutionStreamAdapter.
 * Expects `executionPath` and optionally `executionState` fields.
 */
export function resumeDescriptorFromEvent(event: any): ResumeDescriptor {
  const path: string[] = Array.isArray(event?.executionPath) ? event.executionPath : [];
  const es = event?.executionState || {};
  const state = {
    phase: es.phase,
    agent: es.agent,
    step: es.step,
    failsafe: es.failsafe,
    generation: es.generation,
  };
  return { path, state };
}
