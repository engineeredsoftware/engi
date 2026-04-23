import { PROMPTPART_SPECIFIC_TOOL_REPLACEFILE_DOCCODETOOLNAME } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_replacefile_doccodetoolname';
import { PROMPTPART_SPECIFIC_TOOL_REPLACEFILE_DOCCODETOOLPURPOSE } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_replacefile_doccodetoolpurpose';
import { PROMPTPART_SPECIFIC_TOOL_REPLACEFILE_DOCCODETOOLCAPABILITIES } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_replacefile_doccodetoolcapabilities';
import { PROMPTPART_SPECIFIC_TOOL_REPLACEFILE_DOCCODETOOLPARAMETERS } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_replacefile_doccodetoolparameters';
import { PROMPTPART_SPECIFIC_TOOL_REPLACEFILE_DOCCODETOOLOUTPUT } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_replacefile_doccodetooloutput';
/**
 * REPLACE FILE DOC-CODE-TOOL PROMPT
 * 
 * @doc-comment-developing-promptdevelopment
 * versions: []
 * domain: tool
 * intent: "Bitcode written-asset file mutation support prompt for atomic file replacement and backup evidence"
 * current_version: "V26"
 * 
 * Structured DocCodeToolPrompt for Bitcode written-asset replacement runtime documentation.
 * Only meaningful content is imported as PromptParts from /raw_promptparts/.
 */

import { DocCodeToolPrompt } from '@bitcode/tools-generics';
import { PromptPart } from '@bitcode/prompts/parts/PromptPart';

// Import meaningful PromptParts from /raw_promptparts/specific/






/**
 * Replace File tool-specific DocCodeToolPrompt
 */
export class ReplaceFileDocCodeToolPrompt extends DocCodeToolPrompt {
  constructor() {
    super();
    
    // Set metadata directly (not meaningful semantic units)
    this.set('metadata:name', PROMPTPART_SPECIFIC_TOOL_REPLACEFILE_DOCCODETOOLNAME);
    this.set('metadata:category', 'written-asset-file-mutation' as PromptPart);
    this.set('metadata:version', 'V26' as PromptPart);
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
