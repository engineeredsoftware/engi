/**
 * PipelinePrompt - Generic prompt for Pipeline Execution Entity
 *
 * Pipelines are the top-level EEs that orchestrate phase sequences.
 * This prompt provides the base abstraction for pipeline-level prompting.
 */
import { Prompt, type PromptPart } from '@bitcode/prompts';
/**
 * Base Pipeline Prompt
 *
 * Specific pipeline implementations will extend this with their
 * domain-specific prompt parts and registry configurations.
 */
export declare class PipelinePrompt extends Prompt {
    constructor();
    /**
     * Set pipeline-specific prompt
     */
    setPipeline(path: string, prompt: PromptPart | string): this;
    /**
     * Set phase-specific prompt
     */
    setPhase(path: string, prompt: PromptPart | string): this;
    /**
     * Set agent-specific prompt
     */
    setAgent(path: string, prompt: PromptPart | string): this;
    /**
     * Factory method for creating typed pipeline prompts
     */
    static create(name: string): PipelinePrompt;
}
