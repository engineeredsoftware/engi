import type { ExecutionAgent } from './PipelineAgentRegistry';
type RegisteredAgent = ExecutionAgent | (() => Promise<ExecutionAgent | {
    default?: ExecutionAgent;
}>);
export declare function resolveRegisteredAgent(agentName: string, registeredAgent: RegisteredAgent | undefined): Promise<ExecutionAgent>;
export {};
