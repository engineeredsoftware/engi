import { z } from 'zod';
import pLimit from 'p-limit';
import pRetry from 'p-retry';
import { log } from '@engi/logger';
import { telemetry } from '@engi/observability';

/**
 * Comprehensive Multimodal Processing Utilities
 * 
 * Provides:
 * - Error handling and retry logic for multimodal operations
 * - Performance optimizations and resource management
 * - Caching mechanisms for processed content
 * - Rate limiting and throttling for external APIs
 * - Memory and disk usage optimization
 * - Processing pipeline orchestration
 */

// Configuration interfaces
export interface MultimodalConfig {
  concurrency: {
    maxConcurrent: number;
    maxRetries: number;
    backoffMs: number;
  };
  caching: {
    enabled: boolean;
    ttlMs: number;
    maxSizeBytes: number;
  };
  performance: {
    timeoutMs: number;
    maxFileSizeBytes: number;
    memoryLimitMB: number;
  };
  apis: {
    openaiRateLimit: number; // requests per minute
    whisperTimeoutMs: number;
    visionTimeoutMs: number;
  };
}

export const DEFAULT_MULTIMODAL_CONFIG: MultimodalConfig = {
  concurrency: {
    maxConcurrent: 3,
    maxRetries: 2,
    backoffMs: 1000
  },
  caching: {
    enabled: true,
    ttlMs: 3600000, // 1 hour
    maxSizeBytes: 100 * 1024 * 1024 // 100MB
  },
  performance: {
    timeoutMs: 300000, // 5 minutes
    maxFileSizeBytes: 50 * 1024 * 1024, // 50MB
    memoryLimitMB: 512
  },
  apis: {
    openaiRateLimit: 60, // requests per minute
    whisperTimeoutMs: 300000, // 5 minutes
    visionTimeoutMs: 45000 // 45 seconds
  }
};

// Error types
export class MultimodalProcessingError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly details?: Record<string, any>
  ) {
    super(message);
    this.name = 'MultimodalProcessingError';
  }
}

export class RateLimitError extends MultimodalProcessingError {
  constructor(service: string, details?: Record<string, any>) {
    super(`Rate limit exceeded for ${service}`, 'RATE_LIMIT_EXCEEDED', details);
  }
}

export class FileSizeError extends MultimodalProcessingError {
  constructor(fileSize: number, maxSize: number) {
    super(`File size ${fileSize} exceeds maximum ${maxSize}`, 'FILE_TOO_LARGE', { fileSize, maxSize });
  }
}

export class TimeoutError extends MultimodalProcessingError {
  constructor(operation: string, timeoutMs: number) {
    super(`Operation ${operation} timed out after ${timeoutMs}ms`, 'OPERATION_TIMEOUT', { operation, timeoutMs });
  }
}

// Rate limiter for API calls
class RateLimiter {
  private tokens: number;
  private lastRefill: number;
  private readonly maxTokens: number;
  private readonly refillRate: number; // tokens per minute

  constructor(maxTokens: number, refillRate: number = maxTokens) {
    this.maxTokens = maxTokens;
    this.refillRate = refillRate;
    this.tokens = maxTokens;
    this.lastRefill = Date.now();
  }

  async acquire(): Promise<void> {
    this.refill();
    
    if (this.tokens >= 1) {
      this.tokens -= 1;
      return;
    }

    // Wait for next token
    const waitTime = (60000 / this.refillRate); // milliseconds per token
    await new Promise(resolve => setTimeout(resolve, waitTime));
    return this.acquire();
  }

  private refill(): void {
    const now = Date.now();
    const timePassed = now - this.lastRefill;
    const tokensToAdd = Math.floor((timePassed / 60000) * this.refillRate);
    
    if (tokensToAdd > 0) {
      this.tokens = Math.min(this.maxTokens, this.tokens + tokensToAdd);
      this.lastRefill = now;
    }
  }
}

// Memory-aware cache
class MultimodalCache {
  private cache = new Map<string, { data: any; timestamp: number; size: number }>();
  private totalSize = 0;

  constructor(
    private readonly maxSizeBytes: number,
    private readonly ttlMs: number
  ) {}

  get(key: string): any | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    if (Date.now() - entry.timestamp > this.ttlMs) {
      this.delete(key);
      return null;
    }

    return entry.data;
  }

  set(key: string, data: any): void {
    const size = this.estimateSize(data);
    
    // Remove old entries if needed
    while (this.totalSize + size > this.maxSizeBytes && this.cache.size > 0) {
      this.evictOldest();
    }

    if (size <= this.maxSizeBytes) {
      this.cache.set(key, { data, timestamp: Date.now(), size });
      this.totalSize += size;
    }
  }

  delete(key: string): void {
    const entry = this.cache.get(key);
    if (entry) {
      this.cache.delete(key);
      this.totalSize -= entry.size;
    }
  }

  clear(): void {
    this.cache.clear();
    this.totalSize = 0;
  }

  private evictOldest(): void {
    let oldestKey: string | null = null;
    let oldestTime = Date.now();

    for (const [key, entry] of this.cache.entries()) {
      if (entry.timestamp < oldestTime) {
        oldestTime = entry.timestamp;
        oldestKey = key;
      }
    }

    if (oldestKey) {
      this.delete(oldestKey);
    }
  }

  private estimateSize(data: any): number {
    try {
      return JSON.stringify(data).length * 2; // Rough estimate (UTF-16)
    } catch {
      return 1000; // Fallback estimate
    }
  }
}

// Main multimodal processor class
export class MultimodalProcessor {
  private readonly concurrencyLimiter: ReturnType<typeof pLimit>;
  private readonly cache: MultimodalCache;
  private readonly openaiRateLimiter: RateLimiter;
  private readonly config: MultimodalConfig;

  constructor(config: Partial<MultimodalConfig> = {}) {
    this.config = { ...DEFAULT_MULTIMODAL_CONFIG, ...config };
    this.concurrencyLimiter = pLimit(this.config.concurrency.maxConcurrent);
    this.cache = new MultimodalCache(this.config.caching.maxSizeBytes, this.config.caching.ttlMs);
    this.openaiRateLimiter = new RateLimiter(this.config.apis.openaiRateLimit);
  }

  /**
   * Process a file with error handling, retries, and performance optimizations
   */
  async processFile<T>(
    fileUrl: string,
    processor: () => Promise<T>,
    options: {
      cacheKey?: string;
      retryConfig?: { retries?: number; factor?: number };
      timeoutMs?: number;
    } = {}
  ): Promise<T> {
    const startTime = Date.now();
    const cacheKey = options.cacheKey || `file:${fileUrl}`;
    
    try {
      // Check cache first
      if (this.config.caching.enabled && options.cacheKey) {
        const cached = this.cache.get(cacheKey);
        if (cached) {
          log('Multimodal cache hit', 'debug', { cacheKey });
          telemetry.recordEvent('multimodal_cache_hit', { cacheKey });
          return cached;
        }
      }

      // Validate file size if possible
      await this.validateFileSize(fileUrl);

      // Process with concurrency limiting and retries
      const result = await this.concurrencyLimiter(async () => {
        return await pRetry(
          async () => {
            const timeoutMs = options.timeoutMs || this.config.performance.timeoutMs;
            return await this.withTimeout(processor(), timeoutMs);
          },
          {
            retries: options.retryConfig?.retries || this.config.concurrency.maxRetries,
            factor: options.retryConfig?.factor || 2,
            minTimeout: this.config.concurrency.backoffMs,
            onFailedAttempt: (error) => {
              log('Multimodal processing retry', 'warn', {
                attempt: error.attemptNumber,
                retriesLeft: error.retriesLeft,
                error: error.message
              });
            }
          }
        );
      });

      // Cache successful result
      if (this.config.caching.enabled && options.cacheKey) {
        this.cache.set(cacheKey, result);
      }

      const processingTime = Date.now() - startTime;
      telemetry.recordEvent('multimodal_processing_success', {
        fileUrl,
        processingTimeMs: processingTime,
        cached: false
      });

      return result;

    } catch (error) {
      const processingTime = Date.now() - startTime;
      const errorMessage = error instanceof Error ? error.message : String(error);
      
      log('Multimodal processing failed', 'error', {
        fileUrl,
        processingTimeMs: processingTime,
        error: errorMessage
      });

      telemetry.recordEvent('multimodal_processing_failed', {
        fileUrl,
        processingTimeMs: processingTime,
        error: errorMessage
      });

      throw new MultimodalProcessingError(
        `Failed to process file: ${errorMessage}`,
        'PROCESSING_FAILED',
        { fileUrl, originalError: errorMessage }
      );
    }
  }

  /**
   * Process multiple files in parallel with intelligent batching
   */
  async processFiles<T>(
    files: Array<{ url: string; processor: () => Promise<T>; cacheKey?: string }>,
    options: { batchSize?: number } = {}
  ): Promise<Array<{ url: string; result?: T; error?: Error }>> {
    const batchSize = options.batchSize || this.config.concurrency.maxConcurrent;
    const results: Array<{ url: string; result?: T; error?: Error }> = [];

    // Process in batches to manage memory usage
    for (let i = 0; i < files.length; i += batchSize) {
      const batch = files.slice(i, i + batchSize);
      
      const batchPromises = batch.map(async (file) => {
        try {
          const result = await this.processFile(file.url, file.processor, {
            cacheKey: file.cacheKey
          });
          return { url: file.url, result };
        } catch (error) {
          return { url: file.url, error: error as Error };
        }
      });

      const batchResults = await Promise.all(batchPromises);
      results.push(...batchResults);

      // Allow garbage collection between batches
      if (i + batchSize < files.length) {
        await new Promise(resolve => setImmediate(resolve));
      }
    }

    return results;
  }

  /**
   * Acquire rate limit token for OpenAI API calls
   */
  async acquireOpenAIToken(): Promise<void> {
    return this.openaiRateLimiter.acquire();
  }

  /**
   * Clear all cached data
   */
  clearCache(): void {
    this.cache.clear();
  }

  /**
   * Get cache statistics
   */
  getCacheStats(): { entries: number; totalSizeBytes: number; hitRate?: number } {
    return {
      entries: this.cache['cache'].size,
      totalSizeBytes: this.cache['totalSize']
    };
  }

  private async withTimeout<T>(promise: Promise<T>, timeoutMs: number): Promise<T> {
    return Promise.race([
      promise,
      new Promise<never>((_, reject) => 
        setTimeout(() => reject(new TimeoutError('operation', timeoutMs)), timeoutMs)
      )
    ]);
  }

  private async validateFileSize(fileUrl: string): Promise<void> {
    // For URLs, we can't always check size without downloading
    // This is a placeholder for size validation logic
    try {
      // Could make a HEAD request to check Content-Length header
      // For now, we'll rely on the processing timeout
    } catch (error) {
      log('File size validation skipped', 'debug', { fileUrl });
    }
  }
}

// Utility functions for multimodal processing
export const multimodalUtils = {
  /**
   * Create an optimized processor instance
   */
  createProcessor: (config?: Partial<MultimodalConfig>) => new MultimodalProcessor(config),

  /**
   * Determine the appropriate processing strategy based on file type
   */
  getProcessingStrategy: (filename: string): 'audio' | 'video' | 'image' | 'document' | 'text' => {
    const ext = filename.split('.').pop()?.toLowerCase() || '';
    
    if (['mp3', 'wav', 'mp4', 'm4a', 'aac', 'ogg', 'flac', 'wma'].includes(ext)) {
      return 'audio';
    }
    if (['mp4', 'avi', 'mov', 'wmv', 'flv', 'webm', 'mkv', 'm4v'].includes(ext)) {
      return 'video';
    }
    if (['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg', 'bmp', 'tiff'].includes(ext)) {
      return 'image';
    }
    if (['pdf', 'docx', 'doc', 'xlsx', 'xls', 'csv', 'pptx', 'ppt'].includes(ext)) {
      return 'document';
    }
    return 'text';
  },

  /**
   * Estimate processing time based on file type and size
   */
  estimateProcessingTime: (fileType: string, fileSizeBytes: number): number => {
    const sizeMB = fileSizeBytes / (1024 * 1024);
    
    switch (fileType) {
      case 'audio':
        return Math.max(30000, sizeMB * 5000); // ~5 seconds per MB
      case 'video':
        return Math.max(60000, sizeMB * 8000); // ~8 seconds per MB
      case 'image':
        return Math.max(5000, sizeMB * 2000); // ~2 seconds per MB
      case 'document':
        return Math.max(10000, sizeMB * 3000); // ~3 seconds per MB
      default:
        return 5000; // 5 seconds for text
    }
  },

  /**
   * Create a standardized error for multimodal operations
   */
  createError: (message: string, code: string, details?: Record<string, any>) => 
    new MultimodalProcessingError(message, code, details),

  /**
   * Check if an error is retryable
   */
  isRetryableError: (error: Error): boolean => {
    if (error instanceof RateLimitError) return true;
    if (error instanceof TimeoutError) return true;
    if (error.message.includes('network') || error.message.includes('timeout')) return true;
    if (error.message.includes('429') || error.message.includes('rate limit')) return true;
    return false;
  }
};

// Export types and classes
export {
  MultimodalCache,
  RateLimiter
};

// Default instance for easy usage
export const defaultMultimodalProcessor = new MultimodalProcessor();