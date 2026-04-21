/**
 * PipelineExecutor - Orchestrates pipeline execution with short-circuit support
 * 
 * Provides phase sequencing, agent execution, and automatic short-circuit
 * detection with refund handling.
 */

import { PipelineExecution } from './PipelineExecution';
// No direct stream adapter usage here; rely on store() + adapter inference
import { 
  ShortCircuitError, 
  hasShortCircuitSignal,
  ShortCircuitSignal 
} from '@bitcode/execution-generics';
import { Executor } from '@bitcode/execution-generics';

export interface PhaseConfig {
  phaseName: string;
  sequence: AgentStep[];
  allowShortCircuit?: boolean;
  shortCircuitHandler?: (signal: ShortCircuitSignal) => Promise<void>;
}

export interface AgentStep {
  agent: string;
  parallel?: AgentStep[];
  input?: any;
}

export interface PhaseResult {
  success: boolean;
  shortCircuited?: boolean;
  shortCircuitReason?: string;
  metrics: {
    duration: number;
    agentsExecuted: number;
  };
}

/**
 * Pipeline executor that handles phase sequencing and short-circuits
 */
export class PipelineExecutor {
  constructor(
    private execution: PipelineExecution
  ) {}
  
  /**
   * Execute a single agent with short-circuit detection
   */
  async executeAgent(agentName: string, input: any): Promise<any> {
    // Get agent from registry
    const agent = this.execution.agents.getAgent(agentName);
    if (!agent) {
      throw new Error(`Agent not found: ${agentName}`);
    }
    
    // Note: Agent start/complete events are emitted at step level via store()
    
    // Execute agent with error envelope
    let output: any;
    try {
      output = await agent(input, this.execution);
    } catch (error) {
      // Non-fatal: streaming for errors handled elsewhere via status/error writes
      throw error;
    }
    
    // Check for short-circuit signal
    if (hasShortCircuitSignal(output)) {
      // Store short-circuit information
      this.execution.store('pipeline/short-circuit', 'signal', output.signal as any);
      this.execution.store('pipeline/short-circuit', 'agent', agentName);
      this.execution.store('pipeline/short-circuit', 'timestamp', Date.now());
      // Step-level store emits handle agent-complete with step context
      
      // Throw short-circuit error for phase runner to catch
      throw new ShortCircuitError(output.signal);
    }
    
    // Emit end
    // Step-level store emits handle agent-complete with step context
    
    // Return normal result
    return output.result || output;
  }
  
  /**
   * Execute an agent step (single or parallel)
   */
  async executeStep(step: AgentStep): Promise<any> {
    if (step.parallel) {
      // Execute parallel agents
      return await Promise.all(
        step.parallel.map(subStep => this.executeStep(subStep))
      );
    } else {
      // Execute single agent
      return await this.executeAgent(step.agent, step.input);
    }
  }
  
  /**
   * Execute a complete phase with its sequence
   */
  async executePhase(config: PhaseConfig): Promise<PhaseResult> {
    const start = Date.now();
    let agentsExecuted = 0;
    
    try {
      // Store phase start
      this.execution.store('phase', 'current', config.phaseName);
      this.execution.store(`phase/${config.phaseName}`, 'started', Date.now());
      // Initialize per-phase counter
      const globalCount = this.execution.get<number>('metrics', 'agentsExecuted') || 0;
      this.execution.store('metrics', 'agentsExecuted', globalCount);
      this.execution.store(`metrics/phase:${config.phaseName}`, 'agentsExecuted', 0);
      // Store phase start; stream adapter infers 'phase-start'
      this.execution.store('phase', 'start', { phase: config.phaseName });
      
      // Execute each step in sequence
      for (const step of config.sequence) {
        await this.executeStep(step);
        agentsExecuted++;
        // Increment counters
        const prevGlobal = this.execution.get<number>('metrics', 'agentsExecuted') || 0;
        this.execution.store('metrics', 'agentsExecuted', prevGlobal + 1);
        const prevPhase = this.execution.get<number>(`metrics/phase:${config.phaseName}`, 'agentsExecuted') || 0;
        this.execution.store(`metrics/phase:${config.phaseName}`, 'agentsExecuted', prevPhase + 1);
      }
      
      // Store phase completion
      this.execution.store(`phase/${config.phaseName}`, 'completed', Date.now());
      // Store phase completion; stream adapter infers 'phase-complete'
      this.execution.store('phase', 'complete', { phase: config.phaseName });
      
      return {
        success: true,
        metrics: {
          duration: Date.now() - start,
          agentsExecuted
        }
      };
      
    } catch (error) {
      // Handle short-circuit
      if (error instanceof ShortCircuitError) {
        // Store phase short-circuit
        this.execution.store(`phase/${config.phaseName}`, 'shortCircuited', true);
        this.execution.store(`phase/${config.phaseName}`, 'shortCircuitReason', error.signal.reason);
        // Store phase completion with short-circuit metadata
        this.execution.store('phase', 'complete', { phase: config.phaseName, shortCircuited: true, reason: error.signal.reason });
        
        // Call handler if provided
        if (config.shortCircuitHandler) {
          await config.shortCircuitHandler(error.signal);
        }
        
        // Return short-circuit result
        return {
          success: false,
          shortCircuited: true,
          shortCircuitReason: error.signal.reason,
          metrics: {
            duration: Date.now() - start,
            agentsExecuted
          }
        };
      }
      
      // Re-throw other errors
      throw error;
    }
  }
}

/**
 * Create a phase runner function
 */
export function createPhaseRunner(config: PhaseConfig): Executor<any, PhaseResult> {
  return async (input: any, execution: any): Promise<PhaseResult> => {
    const executor = new PipelineExecutor(execution as PipelineExecution);
    return await executor.executePhase(config);
  };
}
