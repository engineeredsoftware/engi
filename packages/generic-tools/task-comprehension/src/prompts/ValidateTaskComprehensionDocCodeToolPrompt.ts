import { PROMPTPART_GENERIC_DOCCODE_METADATA_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_metadata_label';
import { PROMPTPART_GENERIC_DOCCODE_PURPOSE_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_purpose_label';
import { PROMPTPART_GENERIC_DOCCODE_CAPABILITIES_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_capabilities_label';
import { PROMPTPART_GENERIC_DOCCODE_PARAMETERS_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_parameters_label';
import { PROMPTPART_GENERIC_DOCCODE_OUTPUT_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_output_label';
import { PROMPTPART_GENERIC_DOCCODE_EXAMPLES_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_examples_label';
import { PROMPTPART_SPECIFIC_TOOL_VALIDATETASKCOMPREHENSION_DOCCODETOOLNAME } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_validatetaskcomprehension_doccodetoolname';
import { PROMPTPART_SPECIFIC_TOOL_VALIDATETASKCOMPREHENSION_DOCCODETOOLPURPOSE } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_validatetaskcomprehension_doccodetoolpurpose';
import { PROMPTPART_SPECIFIC_TOOL_VALIDATETASKCOMPREHENSION_DOCCODETOOLCAPABILITIES } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_validatetaskcomprehension_doccodetoolcapabilities';
import { PROMPTPART_SPECIFIC_TOOL_VALIDATETASKCOMPREHENSION_DOCCODETOOLPARAMETERS } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_validatetaskcomprehension_doccodetoolparameters';
import { PROMPTPART_SPECIFIC_TOOL_VALIDATETASKCOMPREHENSION_DOCCODETOOLOUTPUT } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_validatetaskcomprehension_doccodetooloutput';
import { PROMPTPART_SPECIFIC_TOOL_VALIDATETASKCOMPREHENSION_DOCCODETOOLEXAMPLE1 } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_validatetaskcomprehension_doccodetoolexample1';
import { PROMPTPART_SPECIFIC_TOOL_VALIDATETASKCOMPREHENSION_DOCCODETOOLEXAMPLE2 } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_validatetaskcomprehension_doccodetoolexample2';
import { PROMPTPART_SPECIFIC_TOOL_VALIDATETASKCOMPREHENSION_DOCCODETOOLEXAMPLE3 } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_validatetaskcomprehension_doccodetoolexample3';
/**
 * VALIDATE NEED COMPREHENSION DOC-CODE-TOOL PROMPT
 *
 * Retained compatibility DocCodeToolPrompt for Bitcode need-comprehension
 * validation. The task-named class remains a wrapper while validation checks
 * canonical need, written-asset, asset-pack, and shipping-wrapper meaning.
 */

import { DocCodeToolPrompt } from '@bitcode/tools-generics';
import { PromptPart } from '@bitcode/prompts/parts/PromptPart';

// Import generic labels from /raw_promptparts/generic/







// Import specific PromptParts from /raw_promptparts/specific/









/**
 * Validate Need Comprehension tool-specific DocCodeToolPrompt
 * 
 * @doc-comment-developing-promptdevelopment
 * versions: []
 * domain: tool
 * intent: "Compatibility tool for validating Bitcode need comprehension before synthesis proceeds"
 *
 * This retained tool detects old-label residue, missing satisfaction criteria,
 * ambiguous written-asset expectations, and incoherent shipping wrappers.
 */
export class ValidateTaskComprehensionDocCodeToolPrompt extends DocCodeToolPrompt {
  constructor() {
    super();
    
    // Set labels
    this.set('metadata:label', PROMPTPART_GENERIC_DOCCODE_METADATA_LABEL);
    this.set('purpose:label', PROMPTPART_GENERIC_DOCCODE_PURPOSE_LABEL);
    this.set('capabilities:label', PROMPTPART_GENERIC_DOCCODE_CAPABILITIES_LABEL);
    this.set('parameters:label', PROMPTPART_GENERIC_DOCCODE_PARAMETERS_LABEL);
    this.set('output:label', PROMPTPART_GENERIC_DOCCODE_OUTPUT_LABEL);
    this.set('examples:label', PROMPTPART_GENERIC_DOCCODE_EXAMPLES_LABEL);
    
    // Set metadata directly
    this.set('metadata:name', PROMPTPART_SPECIFIC_TOOL_VALIDATETASKCOMPREHENSION_DOCCODETOOLNAME);
    this.set('metadata:category', 'need-comprehension' as PromptPart);
    this.set('metadata:version', 'GA1.00.0' as PromptPart);
    this.set('metadata:priority', 'high' as PromptPart);
    this.set('metadata:stability', 'stable' as PromptPart);
    
    // Set core documentation
    this.setPurpose(PROMPTPART_SPECIFIC_TOOL_VALIDATETASKCOMPREHENSION_DOCCODETOOLPURPOSE);
    this.setCapabilities(PROMPTPART_SPECIFIC_TOOL_VALIDATETASKCOMPREHENSION_DOCCODETOOLCAPABILITIES);
    this.setParameters(PROMPTPART_SPECIFIC_TOOL_VALIDATETASKCOMPREHENSION_DOCCODETOOLPARAMETERS);
    this.setOutput(PROMPTPART_SPECIFIC_TOOL_VALIDATETASKCOMPREHENSION_DOCCODETOOLOUTPUT);
    
    // Add examples that validate Bitcode need comprehension, not old task ceremony.
    this.set('examples:1', PROMPTPART_SPECIFIC_TOOL_VALIDATETASKCOMPREHENSION_DOCCODETOOLEXAMPLE1);
    this.set('examples:2', PROMPTPART_SPECIFIC_TOOL_VALIDATETASKCOMPREHENSION_DOCCODETOOLEXAMPLE2);
    this.set('examples:3', PROMPTPART_SPECIFIC_TOOL_VALIDATETASKCOMPREHENSION_DOCCODETOOLEXAMPLE3);
  }
}

// Export singleton instance
export const VALIDATE_TASK_COMPREHENSION_DOC_CODE_TOOL_PROMPT = new ValidateTaskComprehensionDocCodeToolPrompt();
