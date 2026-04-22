import { PROMPTPART_GENERIC_DOCCODE_METADATA_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_metadata_label';
import { PROMPTPART_GENERIC_DOCCODE_PURPOSE_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_purpose_label';
import { PROMPTPART_GENERIC_DOCCODE_CAPABILITIES_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_capabilities_label';
import { PROMPTPART_GENERIC_DOCCODE_PARAMETERS_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_parameters_label';
import { PROMPTPART_GENERIC_DOCCODE_OUTPUT_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_output_label';
import { PROMPTPART_GENERIC_DOCCODE_EXAMPLES_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_examples_label';
import { PROMPTPART_SPECIFIC_TOOL_ANALYZETASKSEMANTICS_DOCCODETOOLNAME } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_analyzetasksemantics_doccodetoolname';
import { PROMPTPART_SPECIFIC_TOOL_ANALYZETASKSEMANTICS_DOCCODETOOLPURPOSE } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_analyzetasksemantics_doccodetoolpurpose';
import { PROMPTPART_SPECIFIC_TOOL_ANALYZETASKSEMANTICS_DOCCODETOOLCAPABILITIES } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_analyzetasksemantics_doccodetoolcapabilities';
import { PROMPTPART_SPECIFIC_TOOL_ANALYZETASKSEMANTICS_DOCCODETOOLPARAMETERS } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_analyzetasksemantics_doccodetoolparameters';
import { PROMPTPART_SPECIFIC_TOOL_ANALYZETASKSEMANTICS_DOCCODETOOLOUTPUT } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_analyzetasksemantics_doccodetooloutput';
import { PROMPTPART_SPECIFIC_TOOL_ANALYZETASKSEMANTICS_DOCCODETOOLEXAMPLE1 } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_analyzetasksemantics_doccodetoolexample1';
import { PROMPTPART_SPECIFIC_TOOL_ANALYZETASKSEMANTICS_DOCCODETOOLEXAMPLE2 } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_analyzetasksemantics_doccodetoolexample2';
import { PROMPTPART_SPECIFIC_TOOL_ANALYZETASKSEMANTICS_DOCCODETOOLEXAMPLE3 } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_analyzetasksemantics_doccodetoolexample3';
/**
 * ANALYZE TASK SEMANTICS DOC-CODE-TOOL PROMPT
 * 
 * Structured DocCodeToolPrompt for task semantic analysis tool runtime documentation.
 * This tool extracts semantic meaning, intent, and scope from task descriptions.
 */

import { DocCodeToolPrompt } from '@bitcode/tools-generics';
import { PromptPart } from '@bitcode/prompts/parts/PromptPart';

// Import generic labels from /raw_promptparts/generic/







// Import specific PromptParts from /raw_promptparts/specific/









/**
 * Analyze Task Semantics tool-specific DocCodeToolPrompt
 * 
 * @doc-comment-developing-promptdevelopment
 * versions: []
 * domain: tool
 * intent: "Semantic analysis tool for extracting intent, scope boundaries, and implied requirements from task descriptions"
 * 
 * Essential for task comprehension, this tool performs semantic analysis
 * to extract intent, scope boundaries, and implied requirements from
 * task descriptions for accurate planning and execution.
 */
export class AnalyzeTaskSemanticsDocCodeToolPrompt extends DocCodeToolPrompt {
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
    this.set('metadata:name', PROMPTPART_SPECIFIC_TOOL_ANALYZETASKSEMANTICS_DOCCODETOOLNAME);
    this.set('metadata:category', 'task-analysis' as PromptPart);
    this.set('metadata:version', 'GA1.00.0' as PromptPart);
    this.set('metadata:priority', 'high' as PromptPart);
    this.set('metadata:stability', 'stable' as PromptPart);
    
    // Set core documentation
    this.setPurpose(PROMPTPART_SPECIFIC_TOOL_ANALYZETASKSEMANTICS_DOCCODETOOLPURPOSE);
    this.setCapabilities(PROMPTPART_SPECIFIC_TOOL_ANALYZETASKSEMANTICS_DOCCODETOOLCAPABILITIES);
    this.setParameters(PROMPTPART_SPECIFIC_TOOL_ANALYZETASKSEMANTICS_DOCCODETOOLPARAMETERS);
    this.setOutput(PROMPTPART_SPECIFIC_TOOL_ANALYZETASKSEMANTICS_DOCCODETOOLOUTPUT);
    
    // Add examples - demonstrating semantic analysis patterns
    this.set('examples:1', PROMPTPART_SPECIFIC_TOOL_ANALYZETASKSEMANTICS_DOCCODETOOLEXAMPLE1);
    this.set('examples:2', PROMPTPART_SPECIFIC_TOOL_ANALYZETASKSEMANTICS_DOCCODETOOLEXAMPLE2);
    this.set('examples:3', PROMPTPART_SPECIFIC_TOOL_ANALYZETASKSEMANTICS_DOCCODETOOLEXAMPLE3);
  }
}

// Export singleton instance
export const ANALYZE_TASK_SEMANTICS_DOC_CODE_TOOL_PROMPT = new AnalyzeTaskSemanticsDocCodeToolPrompt();
