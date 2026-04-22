/**
 * Generation Primitives (framework-agnostic)
 *
 * A Generation is a pure async function that turns a typed input into a typed
 * output by formatting an LLM request, invoking a provider, and parsing the
 * structured result.
 */
import type { LLM, LLMInput, LLMOutput } from './index';
import type { Prompt as PromptRegistry } from '@bitcode/prompts/prompt';
export type GenerationPrompt = PromptRegistry;
export type Generation<TOutput = any> = (prompt: GenerationPrompt) => Promise<TOutput>;
export interface GenerationAdapters<TOutput> {
    llm: LLM;
    format: (prompt: GenerationPrompt) => LLMInput;
    parse: (output: LLMOutput) => Promise<TOutput> | TOutput;
}
export declare function createGeneration<TOutput>(adapters: GenerationAdapters<TOutput>): Generation<TOutput>;
