/**
 * Agent Executor - minimal adapter turning an agent registry entry
 * into an Executor compatible with execution-generics composition.
 */
import { Executor } from '@bitcode/execution-generics';
export declare function createAgentExecutor(agentName: string): Executor<any, any>;
