/**
 * Phase Factory - Creates PhaseDelegator Executors that delegate to Agents
 *
 * PhaseDelegators are Executors that coordinate agent execution within
 * a pipeline phase. They delegate work to agents and accumulate results.
 *
 * The generic phase abstraction is reusable. The retained SDIVS phase family
 * below is a reference orchestration family until Bitcode explicitly promotes
 * it into live product behavior.
 */

import { sequential, parallel } from '@bitcode/execution-generics';
import type { Executor } from '@bitcode/execution-generics';
import type { Execution } from '@bitcode/execution-generics/Execution';
import { Agent } from '@bitcode/agent-generics';
import { PhaseDelegation, factoryPhaseDelegation } from '../execution/pipeline-types';

// ==================== PHASE DELEGATOR ====================

/**
 * PhaseDelegator - An Executor that delegates to Agents
 */
export type PhaseDelegator<TInput = any, TOutput = any> = Executor<TInput, TOutput>;

/**
 * Create a PhaseDelegator that delegates to a single Agent
 */
export function factoryPhaseDelegator<TInput, TOutput>(
  name: string,
  agent: Agent<TInput, TOutput>
): PhaseDelegator<TInput, TOutput> {
  return async (input: TInput, execution: Execution): Promise<TOutput> => {
    // Create phase delegation
    const phaseDelegation = factoryPhaseDelegation(name, execution);
    
    // Store phase metadata
    phaseDelegation.store('phase', 'name', name);
    phaseDelegation.store('phase', 'startTime', Date.now());
    
    // Delegate to agent
    const result = await agent(input, phaseDelegation);
    
    // Store completion
    phaseDelegation.store('phase', 'endTime', Date.now());
    phaseDelegation.store('phase', 'output', result as any);
    
    return result;
  };
}

/**
 * Create a PhaseDelegator that delegates to multiple Agents in sequence
 */
export function factorySequentialPhaseDelegator<TInput, TOutput>(
  name: string,
  agents: Agent<any, any>[]
): PhaseDelegator<TInput, TOutput> {
  return async (input: TInput, execution: Execution): Promise<TOutput> => {
    // Create phase delegation
    const phaseDelegation = factoryPhaseDelegation(name, execution);
    
    // Store phase metadata
    phaseDelegation.store('phase', 'name', name);
    phaseDelegation.store('phase', 'startTime', Date.now());
    phaseDelegation.store('phase', 'agentCount', agents.length);
    
    // Create sequential executor from agents
    const sequentialAgents = sequential(...agents);
    
    // Execute agents in sequence
    const result = await sequentialAgents(input, phaseDelegation);
    
    // Store completion
    phaseDelegation.store('phase', 'endTime', Date.now());
    phaseDelegation.store('phase', 'output', result as any);
    
    return result as TOutput;
  };
}

/**
 * Create a PhaseDelegator that delegates to multiple Agents in parallel
 */
export function factoryParallelPhaseDelegator<TInput, TOutput>(
  name: string,
  agents: Agent<TInput, any>[],
  combiner: (results: any[]) => TOutput
): PhaseDelegator<TInput, TOutput> {
  return async (input: TInput, execution: Execution): Promise<TOutput> => {
    // Create phase delegation
    const phaseDelegation = factoryPhaseDelegation(name, execution);
    
    // Store phase metadata
    phaseDelegation.store('phase', 'name', name);
    phaseDelegation.store('phase', 'startTime', Date.now());
    phaseDelegation.store('phase', 'agentCount', agents.length);
    phaseDelegation.store('phase', 'parallel', true);
    
    // Create parallel executor from agents
    const parallelAgents = parallel(...agents);
    
    // Execute agents in parallel
    const results = await parallelAgents(input, phaseDelegation);
    
    // Combine results
    const output = combiner(results);
    
    // Store completion
    phaseDelegation.store('phase', 'endTime', Date.now());
    phaseDelegation.store('phase', 'output', output as any);
    
    return output;
  };
}

/**
 * The retained SDIVS reference phases
 */
export enum SDIVSPhase {
  SETUP = 'setup',
  DISCOVERY = 'discovery',
  IMPLEMENTATION = 'implementation',
  VALIDATION = 'validation',
  SHIPPING = 'shipping'
}

/**
 * Create retained SDIVS reference phase delegators
 */
export function factorySDIVSPhaseDelegators<TInput, TOutput>(config: {
  setup: Agent<TInput, any>;
  discovery: Agent<any, any>;
  implementation: Agent<any, any>;
  validation: Agent<any, any>;
  shipping: Agent<any, TOutput>;
}): PhaseDelegator<TInput, TOutput>[] {
  return [
    factoryPhaseDelegator(SDIVSPhase.SETUP, config.setup),
    factoryPhaseDelegator(SDIVSPhase.DISCOVERY, config.discovery),
    factoryPhaseDelegator(SDIVSPhase.IMPLEMENTATION, config.implementation),
    factoryPhaseDelegator(SDIVSPhase.VALIDATION, config.validation),
    factoryPhaseDelegator(SDIVSPhase.SHIPPING, config.shipping)
  ];
}
