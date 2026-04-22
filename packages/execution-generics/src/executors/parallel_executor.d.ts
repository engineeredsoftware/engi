/**
 * PARALLEL EXECUTOR - Run executors concurrently
 *
 * All executors receive the same input. Results array in order.
 * Creates execution tree: par-0, par-1, par-2 (concurrent)
 *
 * Powers:
 * - Multi-agent phases: parallel(...agentSteppers)
 * - Concurrent analysis: parallel(security, quality, performance)
 * - Chunk processing: parallel(...chunkProcessors)
 */
import { Executor } from '../types';
export declare const parallel: <T, R>(...executors: Executor<T, R>[]) => Executor<T, R[]>;
