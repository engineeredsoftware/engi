/**
 * Reinitialize the log file path for subsequent writes.
 * Example: reinitLoggerFile('deliverables-request-<uuid>') → /tmp/.bitcode_logs/deliverables-request-<uuid>.log
 */
export declare function reinitLoggerFile(identifier: string, opts?: {
    prefix?: string;
    dir?: string;
    ext?: string;
}): void;
type LogLevel = 'debug' | 'info' | 'error' | 'warn';
export declare function log(message: string, level?: LogLevel, data?: Record<string, any>): Promise<void>;
type LoggerMethod = (message: string, data?: Record<string, any>) => Promise<void>;
type LoggerFn = typeof log & {
    debug: LoggerMethod;
    info: LoggerMethod;
    warn: LoggerMethod;
    error: LoggerMethod;
};
export declare const logger: LoggerFn;
export declare function writePromptIO(opts: {
    runId?: string;
    phase?: string;
    agent?: string;
    step?: string;
    sequence?: string;
    kind: 'input' | 'output';
    content: string;
    provider?: string;
    model?: string;
}): Promise<string | undefined>;
export declare function writeStepTraceJSON(opts: {
    runId?: string;
    phase?: string;
    agent?: string;
    step?: string;
    provider?: string;
    model?: string;
    summary: any;
    trace: any;
}): Promise<string | undefined>;
export {};
