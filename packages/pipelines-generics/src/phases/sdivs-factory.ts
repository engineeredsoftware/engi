/**
 * Retained SDIVS reference pipeline factory with built-in DIV iteration
 *
 * Creates the retained Setup-[Discovery-Implementation-Validation]*-Shipping
 * pattern with automatic iteration support.
 *
 * This file survives as a reference orchestration family for Bitcode pipeline
 * porting and admissibility work. It is not itself the proof of current
 * Bitcode-native pipeline canon.
 */

import { Executor, Execution, sequential } from '@bitcode/execution-generics';
import { PhaseDelegator } from './phase-factory';
import { PipelineExecution, factoryPipelineExecution } from '../execution/pipeline-types';
import { Pipeline } from '../pipeline-factory';
import { descendExecution } from '../execution/resume';

// ==================== SDIVS CONFIGURATION ====================

export interface SDIVSConfig<TInput = any, TOutput = any> {
  // Required phases
  setup: PhaseDelegator<TInput, any>;
  discovery: PhaseDelegator<any, any>;
  implementation: PhaseDelegator<any, any>;
  validation: PhaseDelegator<any, any>;
  shipping: PhaseDelegator<any, TOutput>;
  
  // Optional decision agents
  readyToIterate?: Executor<any, boolean>; // After Setup - decides if we should iterate
  readyToShip?: Executor<any, boolean>;     // After Validation - decides if ready to ship
  
  // Iteration configuration
  maxIterations?: number;  // Max DIV iterations (default: 3)
  iterationStrategy?: 'sequential' | 'adaptive'; // How to iterate (default: sequential)
  
  // Optional: Initialization hook to configure registries/prompts/tools
  initialize?: (execution: PipelineExecution, input: TInput) => void | Promise<void>;
}

// ==================== SDIVS PIPELINE FACTORY ====================

/**
 * Create a retained SDIVS reference pipeline with built-in DIV iteration
 *
 * Pattern: Setup -> [Discovery -> Implementation -> Validation]* -> Shipping
 * 
 * The DIV loop iterates until:
 * 1. Validation passes (readyToShip returns true)
 * 2. Max iterations reached
 * 3. Error occurs (handled gracefully)
 */
export function factorySDIVSPipeline<TInput, TOutput>(
  name: string,
  config: SDIVSConfig<TInput, TOutput>
): Pipeline<TInput, TOutput> {
  const maxIterations = config.maxIterations || 3;
  
  return async (input: TInput, execution: Execution): Promise<TOutput> => {
    // Create pipeline execution
    const pipelineExec = factoryPipelineExecution(name, execution);
    pipelineExec.store('pipeline', 'start', { name });
    
    // Optional resume-at (deep execution) support: if caller provides a
    // resume descriptor under execution.get('resume','startAt'), record a resume
    // marker at the precise nested execution node for visibility and tooling.
    try {
      const startAt: any = (execution as any).get?.('resume', 'startAt');
      if (startAt && Array.isArray(startAt.path)) {
        const node = descendExecution(execution, startAt.path);
        await node.store('status', 'resumed', {
          ...startAt.state,
          message: 'resumed_at_node'
        } as any);
      }
    } catch {}
    
    // Initialize pipeline-level registries/prompts/tools if provided
    if (typeof config.initialize === 'function') {
      await config.initialize(pipelineExec, input);
    }
    
    // Store SDIVS metadata
    pipelineExec.store('pipeline', 'pattern', 'SDIVS');
    pipelineExec.store('pipeline', 'name', name);
    pipelineExec.store('pipeline', 'startTime', Date.now());
    pipelineExec.store('pipeline', 'maxIterations', maxIterations);
    
    // ========== SETUP PHASE ==========
    pipelineExec.store('phase', 'current', 'setup');
    let result = await config.setup(input, pipelineExec);
    
    // Check if we should iterate (optional)
    if (config.readyToIterate) {
      const shouldProceed = await config.readyToIterate(result, pipelineExec);
      if (!shouldProceed) {
        pipelineExec.store('pipeline', 'earlyExit', 'setup');
        throw new Error('Not ready to iterate after setup');
      }
    }
    
    // ========== DIV ITERATION LOOP ==========
    let iterations = 0;
    let validationPassed = false;
    
    while (iterations < maxIterations && !validationPassed) {
      iterations++;
      pipelineExec.store('pipeline', 'currentIteration', iterations);
      
      // Discovery Phase
      pipelineExec.store('phase', 'current', 'discovery');
      pipelineExec.store('phase', 'iteration', iterations);
      result = await config.discovery(result, pipelineExec);
      
      // Implementation Phase
      pipelineExec.store('phase', 'current', 'implementation');
      pipelineExec.store('phase', 'iteration', iterations);
      result = await config.implementation(result, pipelineExec);
      
      // Validation Phase
      pipelineExec.store('phase', 'current', 'validation');
      pipelineExec.store('phase', 'iteration', iterations);
      result = await config.validation(result, pipelineExec);
      
      // Check if ready to ship
      if (config.readyToShip) {
        validationPassed = await config.readyToShip(result, pipelineExec);
      } else {
        // Default: check if validation.passed is true
        validationPassed = pipelineExec.get('validation', 'passed') === true ||
                          (result as any).passed === true ||
                          (result as any).ready === true;
      }
      
      pipelineExec.store('iteration', String(iterations), {
        passed: validationPassed,
        result: result
      } as any);
      
      // If not passing and not last iteration, continue loop
      if (!validationPassed && iterations < maxIterations) {
        pipelineExec.store('pipeline', 'iterating', true);
        // Optionally transform result for next iteration
        if (config.iterationStrategy === 'adaptive') {
          // In adaptive mode, we might modify approach based on validation feedback
          const feedback = pipelineExec.get('validation', 'feedback');
          if (feedback) {
            (result as any).previousFeedback = feedback;
          }
        }
      }
    }
    
    // Check if we succeeded
    if (!validationPassed) {
      pipelineExec.store('pipeline', 'maxIterationsReached', true);
      // Could throw or continue to shipping with partial results
      // throw new Error(`Max iterations (${maxIterations}) reached without validation passing`);
    }
    
    // ========== SHIPPING PHASE ==========
    pipelineExec.store('phase', 'current', 'shipping');
    const output = await config.shipping(result, pipelineExec);
    
    // Store completion metadata
    pipelineExec.store('pipeline', 'endTime', Date.now());
    pipelineExec.store('pipeline', 'totalIterations', iterations);
    pipelineExec.store('pipeline', 'success', validationPassed);
    pipelineExec.store('pipeline', 'output', output as any);
    
    pipelineExec.store('pipeline', 'completion', { name, success: validationPassed });
    return output;
  };
}

// ==================== COMPOSED SDIVS EXECUTOR ====================

export interface SDIVSExecutorConfig<TInput = any, TOutput = any> {
  // Phase executors (already-resolved functions)
  setup: Executor<TInput, any>;
  discovery?: Executor<any, any>;
  implementation?: Executor<any, any>;
  validation?: Executor<any, any>;
  shipping?: Executor<any, TOutput>;
  // Loop controls
  maxIterations?: number; // default: 3
  // Optional preprocess/postprocess hooks
  preprocess?: Executor<TInput, TInput>;
  // Runs at the start of each DIV loop iteration (before Discovery)
  iterationPreprocess?: Executor<any, any>;
  postprocess?: Executor<TOutput, TOutput>;
}

/**
 * factorySDIVSExecutorPipeline - Build a complete retained SDIVS reference
 * pipeline as a pure Executor using execution-generics composition. This mirrors the intended
 * [preprocess] -> Setup -> [Discovery → Implementation → Validation]* -> Shipping -> [postprocess]
 * pattern without requiring call-site abstractions.
 */
export function factorySDIVSExecutorPipeline<TInput, TOutput>(
  name: string,
  cfg: SDIVSExecutorConfig<TInput, TOutput>
): Executor<TInput, TOutput> {
  const maxIter = cfg.maxIterations ?? 3;

  // Optional preprocess/postprocess
  const preprocess = cfg.preprocess ?? (async (i) => i);
  const postprocess = cfg.postprocess ?? (async (o) => o as TOutput);

  // Optional phases default to identity if absent
  const discovery = cfg.discovery ?? (async (x) => x);
  const implementation = cfg.implementation ?? (async (x) => x);
  const validation = cfg.validation ?? (async (x) => x);
  const shipping = cfg.shipping ?? (async (x) => x as TOutput);

  // DIV loop executor
  const div = sequential(discovery, implementation, validation);

  // Compose complete pipeline
  const pipelineExec: Executor<TInput, TOutput> = sequential<any>(
    preprocess as any,
    // Optional resume-at marker for visibility before setup runs
    async (input, exec) => {
      try {
        const startAt: any = (exec as any).get?.('resume', 'startAt');
        if (startAt && Array.isArray(startAt.path)) {
          const node = descendExecution(exec as any, startAt.path);
          await node.store('status', 'resumed', {
            ...startAt.state,
            message: 'resumed_at_node'
          } as any);
        }
      } catch {}
      return input;
    },
    cfg.setup as any,
    // Repeat DIV sequence up to max iterations
    async (input, exec) => {
      let current: any = input;
      for (let i = 0; i < maxIter; i++) {
        // Optional per-iteration preprocess (e.g., fetch AI Document updates for context)
        if (cfg.iterationPreprocess) {
          try { current = await cfg.iterationPreprocess(current, exec); } catch {}
        }
        current = await div(current, exec);
      }
      return current;
    },
    shipping as any,
    postprocess as any
  ) as Executor<TInput, TOutput>;

  return pipelineExec;
}
