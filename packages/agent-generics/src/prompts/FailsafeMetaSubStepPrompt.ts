/**
 * Failsafe Meta SubStep Prompt - Minimal prompt for failsafe substeps
 * 
 * FailsafeMetaSubStepPrompt adds context for handling the three universal concerns:
 * - PrepareConciseContext: CONTEXT SIGNAL/NOISE
 * - ChunkThenSum: BIG INPUT
 * - StitchUntilComplete: CONVERSATIONSUTPUT
 * 
 * @doc-comment-developing-promptdevelopment
 * domain: agent
 * intent: "Provide failsafe handling instruction"
 * current_version: "GA1.50.0"
 */

import { Prompt } from '@engi/prompts';
import type { PromptPart } from '@engi/prompts';

export interface FailsafeMetaSubStepPromptConfig {
  // Just what this failsafe handles
  handle: PromptPart; // e.g., "Filter context noise" / "Process chunks" / "Complete output"
}

/**
 * FailsafeMetaSubStepPrompt - Minimal failsafe substep prompt
 * 
 * Contains only the handling instruction for this failsafe.
 * Each failsafe runs its generation substeps as children.
 */
export class FailsafeMetaSubStepPrompt extends Prompt {
  constructor(config: FailsafeMetaSubStepPromptConfig) {
    super();
    
    // Set only the handling instruction
    this.set('failsafe:handle', config.handle);
  }
  
  /**
   * Get the handling instruction
   */
  getHandle(): PromptPart {
    return this.get('failsafe:handle') as PromptPart;
  }
}