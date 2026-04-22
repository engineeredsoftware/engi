/**
 * Active Execution Registry
 *
 * In-memory registry of running executions.
 * Required for instruction submission to access execution state.
 */
import { Execution } from './Execution';
export declare function registerExecution(id: string, execution: Execution): void;
export declare function getExecution(id: string): Execution | undefined;
export declare function unregisterExecution(id: string): void;
export declare function hasExecution(id: string): boolean;
export declare function getActiveExecutionCount(): number;
