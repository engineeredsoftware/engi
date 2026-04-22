import type { Generation, GenerationPrompt } from './generation';
export type ThricifiedGeneration<TOut = any> = Generation<TOut>;
export declare function createThricifiedGeneration<TReason, TJudgment, TOut>(reason: Generation<TReason>, judge: Generation<TJudgment>, structured: Generation<TOut>, composers: {
    composeJudgePrompt: (base: GenerationPrompt, reason: TReason) => GenerationPrompt;
    composeStructuredPrompt: (base: GenerationPrompt, reason: TReason, judgment: TJudgment) => GenerationPrompt;
}): ThricifiedGeneration<TOut>;
