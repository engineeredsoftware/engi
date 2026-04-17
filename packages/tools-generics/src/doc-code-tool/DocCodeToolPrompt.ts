import { Prompt, PromptPart } from '@bitcode/prompts';
import { PROMPTPART_GENERIC_DOCCODE_METADATA_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_metadata_label';
import { PROMPTPART_GENERIC_DOCCODE_PURPOSE_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_purpose_label';
import { PROMPTPART_GENERIC_DOCCODE_CAPABILITIES_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_capabilities_label';
import { PROMPTPART_GENERIC_DOCCODE_PARAMETERS_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_parameters_label';
import { PROMPTPART_GENERIC_DOCCODE_OUTPUT_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_output_label';






/**
 * Structured prompt for doc-code-tool documentation.
 * Composes atomic PromptParts for each documentation section.
 * 
 * @doc-comment-developing-promptdevelopment
 * domain: tool
 * intent: "Base prompt class for doc-code-tool documentation composition"
 * current_version: "GA1.70.0"
 * versions: []
 * benchmarks: [
 *   { "name": "section_alignment", "test": "Does the base class enforce all doc-code-tool sections? Rate 0-1", "score": 0.96 },
 *   { "name": "promptpart_purity", "test": "Does it ensure every slot is filled with PromptParts? Rate 0-1", "score": 0.95 }
 * ]
 * 
 * CRITICAL: ALL strings MUST be imported PromptParts from /raw_promptparts/
 */
export class DocCodeToolPrompt extends Prompt {
  constructor() {
    super();
    
    // Initialize with standard doc-code-tool structure
    this.initializeStructure();
  }
  
  private initializeStructure() {
    // Tool metadata section - ALL labels imported from /raw_promptparts/
    this.set('metadata:label', PROMPTPART_GENERIC_DOCCODE_METADATA_LABEL);
    
    // Documentation sections - ALL labels imported from /raw_promptparts/
    this.set('sections:purpose:label', PROMPTPART_GENERIC_DOCCODE_PURPOSE_LABEL);
    this.set('sections:capabilities:label', PROMPTPART_GENERIC_DOCCODE_CAPABILITIES_LABEL);
    this.set('sections:parameters:label', PROMPTPART_GENERIC_DOCCODE_PARAMETERS_LABEL);
    this.set('sections:output:label', PROMPTPART_GENERIC_DOCCODE_OUTPUT_LABEL);
  }
  
  /**
   * Set tool metadata
   * CRITICAL: All metadata values MUST be PromptParts imported from /raw_promptparts/
   */
  setMetadata(
    name: PromptPart, 
    category: PromptPart, 
    version: PromptPart, 
    priority: PromptPart, 
    stability: PromptPart
  ) {
    this.set('metadata:name', name);
    this.set('metadata:category', category);
    this.set('metadata:version', version);
    this.set('metadata:priority', priority);
    this.set('metadata:stability', stability);
    return this;
  }
  
  /**
   * Set tool purpose
   */
  setPurpose(purpose: PromptPart) {
    this.set('sections:purpose:content', purpose);
    return this;
  }
  
  /**
   * Set tool capabilities
   */
  setCapabilities(capabilities: PromptPart) {
    this.set('sections:capabilities:content', capabilities);
    return this;
  }
  
  /**
   * Set tool parameters
   */
  setParameters(parameters: PromptPart) {
    this.set('sections:parameters:content', parameters);
    return this;
  }
  
  /**
   * Set tool output
   */
  setOutput(output: PromptPart) {
    this.set('sections:output:content', output);
    return this;
  }
}
