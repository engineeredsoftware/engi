import { PROMPTPART_GENERIC_DOCCODE_METADATA_LABEL } from '@engi/prompts/raw_promptparts/generic/promptpart_generic_doccode_metadata_label';
import { PROMPTPART_GENERIC_DOCCODE_PURPOSE_LABEL } from '@engi/prompts/raw_promptparts/generic/promptpart_generic_doccode_purpose_label';
import { PROMPTPART_GENERIC_DOCCODE_CAPABILITIES_LABEL } from '@engi/prompts/raw_promptparts/generic/promptpart_generic_doccode_capabilities_label';
import { PROMPTPART_GENERIC_DOCCODE_PARAMETERS_LABEL } from '@engi/prompts/raw_promptparts/generic/promptpart_generic_doccode_parameters_label';
import { PROMPTPART_GENERIC_DOCCODE_OUTPUT_LABEL } from '@engi/prompts/raw_promptparts/generic/promptpart_generic_doccode_output_label';
import { PROMPTPART_GENERIC_DOCCODE_EXAMPLES_LABEL } from '@engi/prompts/raw_promptparts/generic/promptpart_generic_doccode_examples_label';
import { PROMPTPART_SPECIFIC_TOOL_CRAWLWEBSITE_DOCCODETOOLNAME } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_tool_crawlwebsite_doccodetoolname';
import { PROMPTPART_SPECIFIC_TOOL_CRAWLWEBSITE_DOCCODETOOLPURPOSE } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_tool_crawlwebsite_doccodetoolpurpose';
import { PROMPTPART_SPECIFIC_TOOL_CRAWLWEBSITE_DOCCODETOOLCAPABILITIES } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_tool_crawlwebsite_doccodetoolcapabilities';
import { PROMPTPART_SPECIFIC_TOOL_CRAWLWEBSITE_DOCCODETOOLPARAMETERS } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_tool_crawlwebsite_doccodetoolparameters';
import { PROMPTPART_SPECIFIC_TOOL_CRAWLWEBSITE_DOCCODETOOLOUTPUT } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_tool_crawlwebsite_doccodetooloutput';
import { PROMPTPART_SPECIFIC_TOOL_CRAWLWEBSITE_DOCCODETOOLEXAMPLE1 } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_tool_crawlwebsite_doccodetoolexample1';
import { PROMPTPART_SPECIFIC_TOOL_CRAWLWEBSITE_DOCCODETOOLEXAMPLE2 } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_tool_crawlwebsite_doccodetoolexample2';
import { PROMPTPART_SPECIFIC_TOOL_CRAWLWEBSITE_DOCCODETOOLEXAMPLE3 } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_tool_crawlwebsite_doccodetoolexample3';
/**
 * CRAWL WEBSITE DOC-CODE-TOOL PROMPT
 * 
 * @doc-comment-developing-promptdevelopment
 * versions: []
 * domain: tool
 * intent: "Website crawling tool for systematic content extraction and analysis"
 * 
 * Structured DocCodeToolPrompt for website crawling tool runtime documentation.
 */

import { DocCodeToolPrompt } from '@engi/tools-generics';
import { PromptPart } from '@engi/prompts';

// Import generic labels from /raw_promptparts/generic/







// Import specific PromptParts from /raw_promptparts/specific/









/**
 * Crawl Website tool-specific DocCodeToolPrompt
 */
export class CrawlWebsiteDocCodeToolPrompt extends DocCodeToolPrompt {
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
    this.set('metadata:name', PROMPTPART_SPECIFIC_TOOL_CRAWLWEBSITE_DOCCODETOOLNAME);
    this.set('metadata:category', 'web-scraping' as PromptPart);
    this.set('metadata:version', 'GA1.00.0' as PromptPart);
    this.set('metadata:priority', 'medium' as PromptPart);
    this.set('metadata:stability', 'stable' as PromptPart);
    
    // Set core documentation
    this.setPurpose(PROMPTPART_SPECIFIC_TOOL_CRAWLWEBSITE_DOCCODETOOLPURPOSE);
    this.setCapabilities(PROMPTPART_SPECIFIC_TOOL_CRAWLWEBSITE_DOCCODETOOLCAPABILITIES);
    this.setParameters(PROMPTPART_SPECIFIC_TOOL_CRAWLWEBSITE_DOCCODETOOLPARAMETERS);
    this.setOutput(PROMPTPART_SPECIFIC_TOOL_CRAWLWEBSITE_DOCCODETOOLOUTPUT);
    
    // Add examples - these demonstrate common and diverse uses
    this.set('examples:1', PROMPTPART_SPECIFIC_TOOL_CRAWLWEBSITE_DOCCODETOOLEXAMPLE1);
    this.set('examples:2', PROMPTPART_SPECIFIC_TOOL_CRAWLWEBSITE_DOCCODETOOLEXAMPLE2);
    this.set('examples:3', PROMPTPART_SPECIFIC_TOOL_CRAWLWEBSITE_DOCCODETOOLEXAMPLE3);
  }
}

// Export singleton instance
export const CRAWL_WEBSITE_DOC_CODE_TOOL_PROMPT = new CrawlWebsiteDocCodeToolPrompt();
