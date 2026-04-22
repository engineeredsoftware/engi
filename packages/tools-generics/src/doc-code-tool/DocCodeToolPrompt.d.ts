import { Prompt } from '@bitcode/prompts/prompt';
import type { PromptPart } from '@bitcode/prompts/parts/PromptPart';
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
export declare class DocCodeToolPrompt extends Prompt {
    constructor();
    private initializeStructure;
    /**
     * Set tool metadata
     * CRITICAL: All metadata values MUST be PromptParts imported from /raw_promptparts/
     */
    setMetadata(name: PromptPart, category: PromptPart, version: PromptPart, priority: PromptPart, stability: PromptPart): this;
    /**
     * Set tool purpose
     */
    setPurpose(purpose: PromptPart): this;
    /**
     * Set tool capabilities
     */
    setCapabilities(capabilities: PromptPart): this;
    /**
     * Set tool parameters
     */
    setParameters(parameters: PromptPart): this;
    /**
     * Set tool output
     */
    setOutput(output: PromptPart): this;
}
