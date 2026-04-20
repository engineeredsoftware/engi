/**
 * Agent Factories - Factory functions for agents
 * 
 * These factories create agent executors that implement
 * the PTRR pattern with 7 substeps.
 * 
 * @doc-code
 * type: agent-factories
 * purpose: Create type-safe agent executors
 * pattern: factory-functions
 */

import { Executor, Execution } from '@bitcode/execution-generics';
import { 
  AgentExecution, 
  StepExecution 
} from '../execution';
import { Agent, AgentStep, AgentVariationStep } from '../types';
import { factoryPlanStep, factoryTryStep, factoryRefineStep, factoryRetryStep } from '../steps/factories';
import { z } from 'zod';

// ==================== AGENT FACTORY ====================

/**
 * Create an Agent - Builds an executor that sequences PTRR steps
 */
export function factoryAgent<TInput = any, TOutput = any>(config: {
  name: string;
  description?: string;
  steps: AgentStep<any, any>[];
}): Agent<TInput, TOutput> {
  const executor = async (input: TInput, execution: Execution) => {
    // Create agent execution
    const agentExec = new AgentExecution(`agent:${config.name}`, execution);
    try { agentExec.store('agent', 'name', config.name); } catch {}
    
    // Store agent metadata
    agentExec.store('agent', 'name', config.name);
    agentExec.store('agent', 'startTime', Date.now());
    
    // Execute steps in sequence (PTRR)
    let result: any = input;
    for (const step of config.steps) {
      result = await step(result, agentExec);
    }
    
    // Store completion
    agentExec.store('agent', 'endTime', Date.now());
    agentExec.store('agent', 'output', result as any);
    
    return result;
  };
  
  // Create the agent object with all required properties
  // Use defineProperty for 'name' since it's read-only on functions
  Object.defineProperty(executor, 'name', {
    value: config.name,
    writable: false,
    enumerable: true,
    configurable: true
  });
  
  const agent = Object.assign(executor, {
    description: config.description,
    steps: config.steps,
    generations: config.steps
  }) as Agent<TInput, TOutput>;
  
  return agent;
}

// ==================== AGENT WITH PTRR FACTORY ====================

/**
 * Create Agent with PTRR Steps - Creates a complete agent implementation
 * 
 * This factory creates an Agent that implements the full PTRR pattern.
 * Agents are executors that sequence PTRR steps with 7 substeps.
 */
export function factoryAgentWithPTRR<TInput, TOutput>(config: {
  name: string;
  description?: string;
  outputSchema: z.ZodType<TOutput>;
  prompt?: any; // Agent system prompt (AgentPrompt)
  stepPrompts?: { // Step-specific prompts
    plan?: () => any;
    try?: () => any;
    refine?: () => any;
    retry?: () => any;
  };
  tools?: any[]; // Available tools
  // Optional: Sanity checks for registries
  requiredTools?: string[];
  enforceLLM?: boolean; // default true: warn if default LLM missing
  plan?: {
    chunkThreshold?: number;
  };
  try?: {
    chunkThreshold?: number;
    enableParallelChunks?: boolean;
  };
  refine?: {
    maxAttempts?: number;
  };
  retry?: {
    maxAttempts?: number;
    backoff?: number;
  };
}): Agent<TInput, TOutput> {
  const stepPrompts = (config.stepPrompts || (config as any).prompts) || {};
  // Debug pattern (env-gated): prefer skip semantics via ONLY_* filters
  const stopAfterPlan = String(process?.env?.BITCODE_DEBUG_STOP_AFTER_PLAN || '0') === '1';
  const onlyStepEnv = String(process?.env?.BITCODE_DEBUG_ONLY_STEP || '').toLowerCase();

  const steps: AgentStep<any, any>[] = [
    // Plan step - failsafe understanding
    factoryPlanStep(config.outputSchema, {
      prompt: typeof stepPrompts.plan === 'function' ? stepPrompts.plan() : stepPrompts.plan,
      tools: config.tools,
      chunkThreshold: config.plan?.chunkThreshold
    }),
    // Try step - initial generation attempt
    factoryTryStep(config.outputSchema, {
      ...config.try,
      prompt: typeof stepPrompts.try === 'function' ? stepPrompts.try() : stepPrompts.try,
      tools: config.tools
    }),
    
    // Refine step - improve if needed
    factoryRefineStep(config.outputSchema, {
      prompt: typeof stepPrompts.refine === 'function' ? stepPrompts.refine() : stepPrompts.refine,
      tools: config.tools,
      maxAttempts: config.refine?.maxAttempts
    }),
    
    // Retry step - failsafe completion
    factoryRetryStep(config.outputSchema, {
      ...config.retry,
      prompt: typeof stepPrompts.retry === 'function' ? stepPrompts.retry() : stepPrompts.retry,
      tools: config.tools
    })
  ];
  // If only a single step is requested for debugging, keep only that step
  if (onlyStepEnv) {
    const map: Record<string, AgentVariationStep> = {
      plan: AgentVariationStep.PLAN,
      try: AgentVariationStep.TRY,
      refine: AgentVariationStep.REFINE,
      retry: AgentVariationStep.RETRY
    };
    const wanted = map[onlyStepEnv];
    if (wanted !== undefined) {
      const keep: AgentStep<any, any>[] = [];
      for (const s of steps) {
        const t = (s as any)?.type as AgentVariationStep | undefined;
        if (t === wanted) { keep.push(s); break; }
      }
      if (keep.length) (steps as any).splice(0, steps.length, ...keep);
    }
  }
  
  // Inline agent creation to avoid bundling issues
  const executor = async (input: TInput, execution: Execution) => {
    // Phase/agent filters: no-op the agent if it doesn't match filters
    try {
      const phase = (execution as any).findUp?.('phase', 'current');
      const onlyPhase = process?.env?.BITCODE_DEBUG_ONLY_PHASE;
      if (onlyPhase && String(phase || '').toLowerCase() !== String(onlyPhase).toLowerCase()) {
        return input as any;
      }
    } catch {}
    try {
      const onlyAgent = process?.env?.BITCODE_DEBUG_ONLY_AGENT;
      if (onlyAgent && !String(config.name).toLowerCase().includes(String(onlyAgent).toLowerCase())) {
        return input as any;
      }
    } catch {}
    // Create agent execution
    const agentExec = new AgentExecution(`agent:${config.name}`, execution);
    // Attach agent-level system prompt if provided
    if ((config as any).prompts?.system && !config.prompt) {
      // Legacy shape: use prompts.system as agent-level prompt
      const sys = (config as any).prompts.system;
      try {
        const paths = sys.getAllPaths?.() || [];
        for (const p of paths) {
          const part = sys.get(p);
          if (part) agentExec.prompt.setSpecificExecution(`specific_execution:${p}`, part);
        }
      } catch {
        agentExec.prompt.setSpecificExecution('specific_execution:agent:identity', sys);
      }
    }
    if (config.prompt) {
      // Prefer explicit path mapping for clarity
      const get = (k: string) => (typeof config.prompt.get === 'function' ? config.prompt.get(k) : undefined);
      const namePart = get('agent:name');
      const identityPart = get('agent:identity');
      if (namePart) agentExec.prompt.setSpecificExecution('specific_execution:agent:name', namePart);
      if (identityPart) agentExec.prompt.setSpecificExecution('specific_execution:agent:identity', identityPart);

      // Merge any remaining parts conservatively under specific_execution
      try {
        const paths = config.prompt.getAllPaths?.() || [];
        for (const p of paths) {
          if (p === 'agent:name' || p === 'agent:identity') continue;
          const part = config.prompt.get(p);
          if (part) {
            agentExec.prompt.setSpecificExecution(`specific_execution:${p}`, part);
          }
        }
      } catch {
        // Fallback: set identity if structure unknown
        if (!identityPart) {
          agentExec.prompt.setSpecificExecution('specific_execution:agent:identity', config.prompt);
        }
      }
    }

    // Store agent metadata
    agentExec.store('agent', 'name', config.name);
    agentExec.store('agent', 'startTime', Date.now());

    // Registry sanity checks (hard enforcement for GA-1)
    const enforceLLM = config.enforceLLM !== false;
    if (enforceLLM) {
      agentExec.llms.ensureDefaultConfigured({ throw: true });
    }
    if (config.requiredTools?.length) {
      agentExec.tools.ensureTools(config.requiredTools, { throw: true });
    }

    // After ensuring required tools exist, restrict accessible tools to that subset if provided
    if (config.requiredTools?.length) {
      agentExec.tools.restrictTo(config.requiredTools);
    }

    // Execute steps in sequence (PTRR)
    let result: any = input;
    for (const step of steps) {
      result = await step(result, agentExec);
    }
    
    // Store completion
    agentExec.store('agent', 'endTime', Date.now());
    agentExec.store('agent', 'output', result as any);
    
    return result;
  };
  
  // Use defineProperty for 'name' since it's read-only on functions
  Object.defineProperty(executor, 'name', {
    value: config.name,
    writable: false,
    enumerable: true,
    configurable: true
  });
  
  const agent = Object.assign(executor, {
    description: config.description,
    steps,
    generations: steps
  }) as Agent<TInput, TOutput>;
  
  return agent;
}

// ==================== AGENT WITH SINGLE STEP FACTORY ====================

/**
 * Create Agent with Single Step - Creates a minimal agent implementation
 * 
 * This factory creates an Agent with a single execution step.
 * For simple agents that don't need full PTRR.
 */
export function factoryAgentWithSingleStep<TInput, TOutput>(config: {
  name: string;
  description?: string;
  execute: (input: TInput, execution: Execution) => Promise<TOutput>;
}): Agent<TInput, TOutput> {
  const stepExecutor: Executor<TInput, TOutput> = async (input, execution) => {
    const stepExec = new StepExecution('execute', execution);
    return await config.execute(input, stepExec);
  };
  
  const step = Object.assign(stepExecutor, {
    type: AgentVariationStep.TRY,
    description: config.description || 'Direct execution'
  }) as AgentStep<TInput, TOutput>;
  
  // Inline the agent creation to avoid potential circular reference
  const executor: Executor<TInput, TOutput> = async (input, execution) => {
    const agentExec = new AgentExecution(config.name, execution);
    
    // Store agent metadata
    agentExec.store('agent', 'name', config.name);
    agentExec.store('agent', 'startTime', Date.now());
    
    // Execute the single step
    const result = await step(input, agentExec);
    
    // Store completion
    agentExec.store('agent', 'endTime', Date.now());
    agentExec.store('agent', 'output', result as any);
    
    return result;
  };
  
  // Use defineProperty for 'name' since it's read-only on functions
  Object.defineProperty(executor, 'name', {
    value: config.name,
    writable: false,
    enumerable: true,
    configurable: true
  });
  
  const agent = Object.assign(executor, {
    description: config.description,
    steps: [step],
    generations: [step]
  }) as Agent<TInput, TOutput>;
  
  return agent;
}

// ==================== AGENT WITH GENERATIONS (PREFERRED) ====================
/**
 * factoryAgentWithGenerations - Preferred ergonomic: pass Generations directly.
 * Back-compat: also sets 'steps' to the same array.
 */
export function factoryAgentWithGenerations<TInput, TOutput>(config: {
  name: string;
  description?: string;
  generations: AgentStep<any, any>[];
}): Agent<TInput, TOutput> {
  const executor = async (input: TInput, execution: Execution) => {
    const agentExec = new (require('../execution').AgentExecution)(`agent:${config.name}`, execution);
    agentExec.store('agent', 'name', config.name);
    agentExec.store('agent', 'startTime', Date.now());
    let result: any = input;
    for (const gen of config.generations) {
      result = await gen(result, agentExec);
    }
    agentExec.store('agent', 'endTime', Date.now());
    agentExec.store('agent', 'output', result as any);
    return result;
  };
  Object.defineProperty(executor, 'name', { value: config.name, writable: false, enumerable: true, configurable: true });
  return Object.assign(executor, {
    description: config.description,
    generations: config.generations,
    steps: config.generations
  }) as Agent<TInput, TOutput>;
}

/**
 * factoryAgentWithPTRRGenerations - Same as factoryAgentWithPTRR but accepts
 * generationPrompts instead of stepPrompts. Internally maps to PTRR factories.
 */
export function factoryAgentWithPTRRGenerations<TInput, TOutput>(config: {
  name: string;
  description?: string;
  outputSchema: z.ZodType<TOutput>;
  generationPrompts?: { plan?: () => any; try?: () => any; refine?: () => any; retry?: () => any };
  tools?: any[];
  requiredTools?: string[];
  enforceLLM?: boolean;
  plan?: { chunkThreshold?: number };
  try?: { chunkThreshold?: number; enableParallelChunks?: boolean };
  refine?: { maxAttempts?: number };
  retry?: { maxAttempts?: number; backoff?: number };
}): Agent<TInput, TOutput> {
  const stepPrompts = config.generationPrompts;
  return factoryAgentWithPTRR<TInput, TOutput>({
    name: config.name,
    description: config.description,
    outputSchema: config.outputSchema,
    stepPrompts,
    tools: config.tools,
    requiredTools: config.requiredTools,
    enforceLLM: config.enforceLLM,
    plan: config.plan,
    try: config.try,
    refine: config.refine,
    retry: config.retry
  });
}

// ==================== QUICK AGENT FACTORY ====================
/**
 * factoryQuickAgent - Preferred minimal agent for simple, single-step behaviors.
 *
 * This formalizes the "QuickAgent" concept: an executor with a name/description
 * that does not orchestrate PTRR. It wraps a single typed executor and uses
 * standard AgentExecution/StepExecution for consistent statefulness.
 *
 * Note: factoryAgentWithSingleStep remains for compatibility; this is the
 * canonical name to use going forward.
 */
export function factoryQuickAgent<TInput, TOutput>(config: {
  name: string;
  description?: string;
  execute: (input: TInput, execution: Execution) => Promise<TOutput>;
}) {
  const stepExecutor: Executor<TInput, TOutput> = async (input, execution) => {
    const stepExec = new StepExecution('execute', execution);
    return await config.execute(input, stepExec);
  };

  const executor = (async (input, execution) => {
    const agentExec = new AgentExecution(config.name, execution);
    try {
      agentExec.store('agent', 'name', config.name);
      agentExec.store('agent', 'startTime', Date.now());
    } catch {}
    const result = await stepExecutor(input, agentExec);
    try {
      agentExec.store('agent', 'endTime', Date.now());
      agentExec.store('agent', 'output', result as any);
    } catch {}
    return result;
  }) as Executor<TInput, TOutput>;

  Object.defineProperty(executor, 'name', {
    value: config.name,
    writable: false,
    enumerable: true,
    configurable: true
  });

  // Tag as quick agent and attach metadata
  (executor as any).description = config.description;
  (executor as any).kind = 'quick-agent';

  return executor;
}
