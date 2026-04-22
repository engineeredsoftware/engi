export type ContextSelector = {
    namespace: string;
    key: string;
    sizeEstimate: number;
};
export type PreparedContext = Partial<{
    files: string[];
    dependencies: string[];
    constraints: string[];
    context: Record<string, any>;
    metadata: Record<string, any>;
}>;
export interface PrepareConciseContextOptions {
    /** Maximum tokens downstream LLM can ingest. */
    tokenLimit: number;
    /**
     * Approximate characters per token. Defaults to 4 which maps well to GPT-style
     * tokenisers and keeps chunk sizes conservative.
     */
    approxCharsPerToken?: number;
}
export interface PrepareConciseContextResult {
    preparedContexts: PreparedContext[];
    chunked: boolean;
    chunkCount: number;
    contextSize: number;
}
export declare function estimateSerializedSize(value: unknown): number;
export declare function createContextSelectors(namespaces: Array<{
    namespace: string;
    data?: Map<string, unknown> | Record<string, unknown> | null | undefined;
}>, extras?: Array<{
    namespace: string;
    key: string;
    value: unknown;
}>): ContextSelector[];
export declare function chunkContext<T extends Record<string, any>>(context: T, options: PrepareConciseContextOptions): Array<T & {
    id: string;
}>;
export declare function prepareConciseContext<T extends Record<string, any>>(context: T, options: PrepareConciseContextOptions): PrepareConciseContextResult;
