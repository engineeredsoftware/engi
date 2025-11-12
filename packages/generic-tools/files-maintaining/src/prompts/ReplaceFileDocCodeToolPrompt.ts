import { PROMPTPART_SPECIFIC_TOOL_REPLACEFILE_DOCCODETOOLNAME } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_tool_replacefile_doccodetoolname';
import { PROMPTPART_SPECIFIC_TOOL_REPLACEFILE_DOCCODETOOLPURPOSE } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_tool_replacefile_doccodetoolpurpose';
import { PROMPTPART_SPECIFIC_TOOL_REPLACEFILE_DOCCODETOOLCAPABILITIES } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_tool_replacefile_doccodetoolcapabilities';
import { PROMPTPART_SPECIFIC_TOOL_REPLACEFILE_DOCCODETOOLPARAMETERS } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_tool_replacefile_doccodetoolparameters';
import { PROMPTPART_SPECIFIC_TOOL_REPLACEFILE_DOCCODETOOLOUTPUT } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_tool_replacefile_doccodetooloutput';
/**
 * REPLACE FILE DOC-CODE-TOOL PROMPT
 * 
 * @doc-comment-developing-promptdevelopment
 * versions: []
 * domain: tool
 * intent: "File management tool for atomic file replacement and backup operations"
 * 
 * Structured DocCodeToolPrompt for replace file tool runtime documentation.
 * Only meaningful content is imported as PromptParts from /raw_promptparts/.
 */

import { DocCodeToolPrompt } from '@engi/tools-generics';
import { PromptPart } from '@engi/prompts';

// Import meaningful PromptParts from /raw_promptparts/specific/






/**
 * Replace File tool-specific DocCodeToolPrompt
 */
export class ReplaceFileDocCodeToolPrompt extends DocCodeToolPrompt {
  constructor() {
    super();
    
    // Set metadata directly (not meaningful semantic units)
    this.set('metadata:name', PROMPTPART_SPECIFIC_TOOL_REPLACEFILE_DOCCODETOOLNAME);
    this.set('metadata:category', 'file-system' as PromptPart);
    this.set('metadata:version', 'GA1.00.0' as PromptPart);
    this.set('metadata:priority', 'high' as PromptPart);
    this.set('metadata:stability', 'stable' as PromptPart);
    
    // Set meaningful documentation content
    this.setPurpose(PROMPTPART_SPECIFIC_TOOL_REPLACEFILE_DOCCODETOOLPURPOSE);
    this.setCapabilities(PROMPTPART_SPECIFIC_TOOL_REPLACEFILE_DOCCODETOOLCAPABILITIES);
    this.setParameters(PROMPTPART_SPECIFIC_TOOL_REPLACEFILE_DOCCODETOOLPARAMETERS);
    this.setOutput(PROMPTPART_SPECIFIC_TOOL_REPLACEFILE_DOCCODETOOLOUTPUT);
  }
}

// Export singleton instance
export const REPLACE_FILE_DOC_CODE_TOOL_PROMPT = new ReplaceFileDocCodeToolPrompt();
