/**
 * Agent Generation SubStep Prompt - Minimal prompt for generation substeps
 * 
 * AgentGenerationSubStepPrompt adds the generation instruction for
 * Reason/Judge/StructuredOutput substeps. At this lowest level,
 * tools_doc_code_tools and output_schema are AUTOMATICALLY added
 * by the execution system.
 * 
 * @doc-comment-developing-promptdevelopment
 * domain: agent
 * intent: "Provide generation instruction for substep execution"
 * current_version: "GA1.50.0"
 */

import { Prompt } from '@bitcode/prompts/prompt';
import type { PromptPart } from '@bitcode/prompts/parts/PromptPart';

export interface AgentGenerationSubStepPromptConfig {
  // Just the generation instruction
  generate: PromptPart; // What to generate (reason/judge/structured output)
}

/**
 * AgentGenerationSubStepPrompt - Minimal generation substep prompt
 * 
 * Contains only the generation instruction. The execution system
 * automatically adds:
 * - tools_doc_code_tools: Documentation for available tools
 * - output_schema: Expected output schema (for StructuredOutput)
 * 
 * These are NOT manually set - they're injected at execution time
 * based on what's available to this specific substep.
 */
export class AgentGenerationSubStepPrompt extends Prompt {
  constructor(config: AgentGenerationSubStepPromptConfig) {
    super();
    
    // Set only the generation instruction
    this.set('substep:generate', config.generate);
    
    // tools_doc_code_tools and output_schema are added AUTOMATICALLY
    // at execution time - we don't set them here!
  }
  
  /**
   * Get the generation instruction
   */
  getGenerate(): PromptPart {
    return this.get('substep:generate') as PromptPart;
  }
  
  /**
   * Called by execution system to inject tool documentation
   * @internal
   */
  injectToolDocs(toolDocs: PromptPart): void {
    this.set('auto:tools_doc_code_tools', toolDocs);
  }
  
  /**
   * Called by execution system to inject output schema
   * @internal
   */
  injectOutputSchema(schema: PromptPart): void {
    this.set('auto:output_schema', schema);
  }
}
