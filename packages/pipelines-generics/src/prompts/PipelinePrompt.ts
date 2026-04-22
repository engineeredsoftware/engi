/**
 * PipelinePrompt - Generic prompt for Pipeline Execution Entity
 * 
 * Pipelines are the top-level EEs that orchestrate phase sequences.
 * This prompt provides the base abstraction for pipeline-level prompting.
 */

import { Prompt } from '../../../prompts/src/prompt';
import {
  createPromptPart,
  type PromptPart,
} from '../../../prompts/src/parts/PromptPart';

/**
 * Base Pipeline Prompt
 * 
 * Specific pipeline implementations will extend this with their
 * domain-specific prompt parts and registry configurations.
 */
export class PipelinePrompt extends Prompt {
  constructor() {
    super();
    // Set base pipeline requirements
    this.require('generic_system');
    this.require('specific_execution');
  }

  /**
   * Set pipeline-specific prompt
   */
  setPipeline(path: string, prompt: PromptPart | string): this {
    const part = typeof prompt === 'string' ? createPromptPart(prompt) : prompt;
    return this.set(`specific_execution:pipeline:${path}`, part);
  }

  /**
   * Set phase-specific prompt
   */
  setPhase(path: string, prompt: PromptPart | string): this {
    const part = typeof prompt === 'string' ? createPromptPart(prompt) : prompt;
    return this.set(`specific_execution:phase:${path}`, part);
  }

  /**
   * Set agent-specific prompt
   */
  setAgent(path: string, prompt: PromptPart | string): this {
    const part = typeof prompt === 'string' ? createPromptPart(prompt) : prompt;
    return this.set(`specific_execution:agent:${path}`, part);
  }

  /**
   * Factory method for creating typed pipeline prompts
   */
  static create(name: string): PipelinePrompt {
    const prompt = new PipelinePrompt();
    prompt.setPipeline('name', name);
    return prompt;
  }
}
