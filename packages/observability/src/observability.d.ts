export declare function trace<T>(name: string, fn: () => Promise<T>): Promise<T>;
export declare function generateTextTraced(args: any): Promise<any>;
export declare function traceRoute<T extends (...args: any[]) => any>(name: string, fn: T): T;
export declare function traceStep<T>(name: string, fn: () => Promise<T>): Promise<T>;
type ObservabilityPayload = Record<string, unknown> | number | string | boolean | Error | undefined;
declare function init(config?: Record<string, unknown>): Promise<void>;
declare function recordMetric(name: string, payload?: ObservabilityPayload): void;
declare function recordError(name: string, payload?: ObservabilityPayload): void;
declare function recordEvent(name: string, payload?: ObservabilityPayload): void;
type CompatibilitySpan = {
    id: string;
    name: string;
    payload: Record<string, unknown>;
    recordException: (error: Error) => void;
    setAttribute: (key: string, value: unknown) => void;
    setStatus: (status: string) => void;
    end: () => void;
    finish: () => void;
};
declare function startCompatibilitySpan(name: string, payload?: ObservabilityPayload): CompatibilitySpan;
declare function createSpan(name: string, payload?: ObservabilityPayload): CompatibilitySpan;
export declare const observability: {
    init: typeof init;
    recordMetric: typeof recordMetric;
    recordError: typeof recordError;
    recordEvent: typeof recordEvent;
    startSpan: typeof startCompatibilitySpan;
    createSpan: typeof createSpan;
};
export declare const metrics: {
    increment(name: string, value?: number, tags?: Record<string, unknown>): void;
    recordToolExecution(payload: Record<string, unknown>): void;
    recordMetric: typeof recordMetric;
    recordEvent: typeof recordEvent;
    recordError: typeof recordError;
};
export declare const telemetry: {
    recordEvent: typeof recordEvent;
    recordMetric: typeof recordMetric;
    recordError: typeof recordError;
};
export {};
