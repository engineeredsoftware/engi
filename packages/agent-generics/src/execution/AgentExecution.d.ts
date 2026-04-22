/**
 * AgentExecution - Execution class with all registries for agents
 *
 * Extends base Execution with domain-specific registries:
 * - prompts: Prompt registry for agent LLM interactions
 * - tools: Tool registry for agent tool usage
 * - llms: LLM registry for agent LLM configuration
 * - agents: Agent registry for sub-agent delegation
 *
 * This provides agents with full access to all registries,
 * enabling complex multi-agent orchestration and tool usage.
 *
 * @doc-code
 * type: execution
 * purpose: Agent execution with full registry support
 * pattern: layered-registry-execution
 */
import { Execution } from '@bitcode/execution-generics';
import { ExecutionPrompt } from '@bitcode/execution-generics';
import { AgentPromptsRegistry } from './AgentPromptsRegistry';
import { AgentToolsRegistry } from './AgentToolsRegistry';
import { AgentLLMsRegistry } from './AgentLLMsRegistry';
import { AgentAgentsRegistry } from './AgentAgentsRegistry';
/**
 * AgentExecution - Agent-level execution with all registries
 *
 * Provides agents with:
 * - Prompt management for LLM interactions
 * - Tool access for external operations
 * - LLM configuration for model selection
 * - Sub-agent delegation for complex workflows
 *
 * This is the execution type used by Agent executors.
 */
export declare class AgentExecution extends Execution {
    readonly prompt: ExecutionPrompt;
    readonly prompts: AgentPromptsRegistry;
    readonly tools: AgentToolsRegistry;
    readonly llms: AgentLLMsRegistry;
    readonly agents: AgentAgentsRegistry;
    constructor(id: string, parent?: Execution);
    /**
     * Create a child AgentExecution
     *
     * Maintains registry hierarchy through execution tree.
     * Child agents can access parent registries.
     */
    child(id: string): AgentExecution;
}
/**
 * Factory function for creating agent executions
 */
export declare function createAgentExecution(agentName: string, parent?: Execution): AgentExecution;
