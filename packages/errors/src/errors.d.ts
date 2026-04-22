export interface BitcodeErrorOptions {
    /**
     * Stable machine-readable code (e.g. "NOT_FOUND") used to power feature
     * flags, retries, etc.  Always UPPER_SNAKE_CASE.
     */
    code: string;
    /** Optional HTTP status code for API responses */
    status?: number;
    /** End-user friendly message (defaults to message) */
    userMessage?: string;
    /** Arbitrary diagnostic context (included as Sentry extra) */
    meta?: Record<string, unknown>;
}
export declare class BitcodeError extends Error {
    readonly code: string;
    readonly status?: number;
    readonly userMessage?: string;
    readonly meta?: Record<string, unknown>;
    constructor(message: string, opts: BitcodeErrorOptions);
    toJSON(): {
        code: string;
        message: string;
        userMessage: string;
        status: number;
    };
}
export declare function asBitcodeError(err: unknown): BitcodeError;
/**
 * Capture an error with Sentry, returning the normalized BitcodeError so callers
 * can propagate further.
 */
export declare function reportError(err: unknown): BitcodeError;
export declare function invariant(condition: unknown, message?: string): asserts condition;
export declare function unreachable(value: never): never;
export declare function toHttpResponse(err: unknown): {
    status: number;
    body: any;
};
declare const _default: {
    BitcodeError: typeof BitcodeError;
    asBitcodeError: typeof asBitcodeError;
    reportError: typeof reportError;
    invariant: typeof invariant;
    unreachable: typeof unreachable;
    toHttpResponse: typeof toHttpResponse;
};
export default _default;
