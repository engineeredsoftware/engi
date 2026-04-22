/**
 * PIPE EXECUTOR - Type-safe sequential composition
 *
 * Compose executors with different types across type boundaries.
 * Essential for building complex flows with type safety.
 *
 * Example:
 * pipe(
 *   parseString,      // string → ParsedData
 *   validateData,     // ParsedData → ValidData
 *   transformData,    // ValidData → Result
 * )
 */
import { Executor } from '../types';
export declare function pipe<A, B>(e1: Executor<A, B>): Executor<A, B>;
export declare function pipe<A, B, C>(e1: Executor<A, B>, e2: Executor<B, C>): Executor<A, C>;
export declare function pipe<A, B, C, D>(e1: Executor<A, B>, e2: Executor<B, C>, e3: Executor<C, D>): Executor<A, D>;
export declare function pipe<A, B, C, D, E>(e1: Executor<A, B>, e2: Executor<B, C>, e3: Executor<C, D>, e4: Executor<D, E>): Executor<A, E>;
