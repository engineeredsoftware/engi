/**
 * Short Circuit Signal - Pipeline termination primitive
 *
 * Enables agents to signal pipeline termination with automatic refund handling.
 * This is an AssetPack-pipeline pattern implemented as a
 * generic execution primitive for elegant composition.
 */
import { z } from 'zod';
/**
 * Short circuit signal that agents can return to terminate pipeline
 */
export interface ShortCircuitSignal {
    type: 'SHORT_CIRCUIT';
    reason: string;
    refundType: 'full' | 'partial';
    confidence: number;
    metadata?: {
        phase?: string;
        agent?: string;
        iterationCount?: number;
        [key: string]: any;
    };
}
/**
 * Zod schema for short circuit signal validation
 */
export declare const ShortCircuitSignalSchema: z.ZodObject<{
    type: z.ZodLiteral<"SHORT_CIRCUIT">;
    reason: z.ZodString;
    refundType: z.ZodEnum<["full", "partial"]>;
    confidence: z.ZodNumber;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
}, "strip", z.ZodTypeAny, {
    metadata?: Record<string, any>;
    type?: "SHORT_CIRCUIT";
    reason?: string;
    confidence?: number;
    refundType?: "full" | "partial";
}, {
    metadata?: Record<string, any>;
    type?: "SHORT_CIRCUIT";
    reason?: string;
    confidence?: number;
    refundType?: "full" | "partial";
}>;
/**
 * Agent output wrapper that can include optional signals
 */
export interface AgentOutput<T> {
    result: T;
    signal?: ShortCircuitSignal;
}
/**
 * Type guard to check if output has short circuit signal
 */
export declare function hasShortCircuitSignal<T>(output: T | AgentOutput<T>): output is AgentOutput<T>;
/**
 * Short circuit error thrown when signal detected
 */
export declare class ShortCircuitError extends Error {
    readonly signal: ShortCircuitSignal;
    readonly code = "SHORT_CIRCUIT";
    constructor(signal: ShortCircuitSignal);
    /**
     * Whether this is a full refund (vs partial)
     */
    get isFullRefund(): boolean;
    /**
     * Get refund percentage based on type
     */
    get refundPercentage(): number;
}
