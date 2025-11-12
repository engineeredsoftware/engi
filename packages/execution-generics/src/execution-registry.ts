/**
 * Active Execution Registry
 *
 * In-memory registry of running executions.
 * Required for instruction submission to access execution state.
 */

import { Execution } from './Execution';

const activeExecutions = new Map<string, Execution>();

export function registerExecution(id: string, execution: Execution): void {
  activeExecutions.set(id, execution);
}

export function getExecution(id: string): Execution | undefined {
  return activeExecutions.get(id);
}

export function unregisterExecution(id: string): void {
  activeExecutions.delete(id);
}

export function hasExecution(id: string): boolean {
  return activeExecutions.has(id);
}

export function getActiveExecutionCount(): number {
  return activeExecutions.size;
}
