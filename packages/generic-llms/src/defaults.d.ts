export type BitcodeLLMEnvironment = Record<string, string | undefined>;
export declare function resolveDefaultLLMProvider(env?: BitcodeLLMEnvironment): string;
export declare function resolveDefaultLLMModel(provider?: string, env?: BitcodeLLMEnvironment): string;
export declare function resolveDefaultLLMConfig(env?: BitcodeLLMEnvironment): {
    provider: string;
    model: string;
};
