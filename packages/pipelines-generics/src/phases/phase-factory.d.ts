/**
 * Phase Factory - Creates PhaseDelegator Executors that delegate to Agents
 *
 * PhaseDelegators are Executors that coordinate agent execution within
 * a pipeline phase. They delegate work to agents and accumulate results.
 *
 * The generic phase abstraction is reusable. The canonical retained phased
 * family is now SDIVF: Setup -> Discovery -> Implementation -> Validation
 * -> Finish. SDIVS survives only as a compatibility import surface.
 */
import { Executor } from '@bitcode/execution-generics';
import { Agent } from '@bitcode/agent-generics';
/**
 * PhaseDelegator - An Executor that delegates to Agents
 */
export type PhaseDelegator<TInput = any, TOutput = any> = Executor<TInput, TOutput>;
/**
 * Create a PhaseDelegator that delegates to a single Agent
 */
export declare function factoryPhaseDelegator<TInput, TOutput>(name: string, agent: Agent<TInput, TOutput>): PhaseDelegator<TInput, TOutput>;
/**
 * Create a PhaseDelegator that delegates to multiple Agents in sequence
 */
export declare function factorySequentialPhaseDelegator<TInput, TOutput>(name: string, agents: Agent<any, any>[]): PhaseDelegator<TInput, TOutput>;
/**
 * Create a PhaseDelegator that delegates to multiple Agents in parallel
 */
export declare function factoryParallelPhaseDelegator<TInput, TOutput>(name: string, agents: Agent<TInput, any>[], combiner: (results: any[]) => TOutput): PhaseDelegator<TInput, TOutput>;
/**
 * The canonical retained SDIVF reference phases.
 */
export declare enum SDIVFPhase {
    SETUP = "setup",
    DISCOVERY = "discovery",
    IMPLEMENTATION = "implementation",
    VALIDATION = "validation",
    FINISH = "finish"
}
/**
 * Deprecated SDIVS spelling retained for external callers. Its final member
 * resolves to the canonical Finish phase.
 */
export declare enum SDIVSPhase {
    SETUP = "setup",
    DISCOVERY = "discovery",
    IMPLEMENTATION = "implementation",
    VALIDATION = "validation",
    SHIPPING = "finish"
}
/**
 * Create canonical retained SDIVF reference phase delegators.
 */
export declare function factorySDIVFPhaseDelegators<TInput, TOutput>(config: {
    setup: Agent<TInput, any>;
    discovery: Agent<any, any>;
    implementation: Agent<any, any>;
    validation: Agent<any, any>;
    finish: Agent<any, TOutput>;
}): PhaseDelegator<TInput, TOutput>[];
/**
 * Deprecated compatibility wrapper for the old SDIVS final-phase name.
 */
export declare function factorySDIVSPhaseDelegators<TInput, TOutput>(config: {
    setup: Agent<TInput, any>;
    discovery: Agent<any, any>;
    implementation: Agent<any, any>;
    validation: Agent<any, any>;
    shipping: Agent<any, TOutput>;
}): PhaseDelegator<TInput, TOutput>[];
