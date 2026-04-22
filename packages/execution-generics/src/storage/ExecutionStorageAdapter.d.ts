/**
 * EXECUTION STORAGE ADAPTER - Bridge to artifact storage
 *
 * Integrates with the artifacts package for persistent storage.
 * Execution-generics knows nothing about S3 - that's artifacts' job.
 */
import { ExecutionStorageConfig } from './StorageDestination';
/**
 * Adapter for persistent storage
 *
 * Uses the artifacts package which handles S3/Supabase fallback
 */
export declare class ExecutionStorageAdapter {
    /**
     * Store data persistently
     */
    static store(key: string, value: any, config?: ExecutionStorageConfig): Promise<{
        url: string;
        size: number;
    }>;
}
