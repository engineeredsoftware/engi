"use strict";
/**
 * Performance monitoring and optimization utilities for Conversations streaming
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.StreamHealthMonitor = exports.StreamRetryHandler = exports.StreamCircuitBreaker = exports.AdaptiveThrottle = exports.TokenBuffer = exports.StreamPerformanceMonitor = void 0;
/**
 * Performance monitoring for streaming conversations
 */
class StreamPerformanceMonitor {
    constructor() {
        this.tokenTimestamps = [];
        this.memoryCheckInterval = null;
        this.metrics = {
            startTime: 0,
            tokenCount: 0,
            totalBytes: 0,
            errorCount: 0,
            reconnectCount: 0,
            avgTokenLatency: 0,
            peakMemoryUsage: 0
        };
    }
    startStream() {
        this.metrics.startTime = performance.now();
        this.tokenTimestamps = [];
        // Monitor memory usage every 5 seconds
        this.memoryCheckInterval = setInterval(() => {
            if ('memory' in performance) {
                const memInfo = performance.memory;
                this.metrics.peakMemoryUsage = Math.max(this.metrics.peakMemoryUsage, memInfo.usedJSHeapSize || 0);
            }
        }, 5000);
    }
    recordToken(tokenLength) {
        this.metrics.tokenCount++;
        this.metrics.totalBytes += tokenLength;
        this.tokenTimestamps.push(performance.now());
        // Calculate average latency (between last 10 tokens)
        if (this.tokenTimestamps.length >= 2) {
            const recent = this.tokenTimestamps.slice(-10);
            const intervals = recent.slice(1).map((time, i) => time - recent[i]);
            this.metrics.avgTokenLatency = intervals.reduce((a, b) => a + b, 0) / intervals.length;
        }
    }
    recordError() {
        this.metrics.errorCount++;
    }
    recordReconnect() {
        this.metrics.reconnectCount++;
    }
    endStream() {
        if (this.memoryCheckInterval) {
            clearInterval(this.memoryCheckInterval);
            this.memoryCheckInterval = null;
        }
        const finalMetrics = { ...this.metrics };
        // Reset for next stream
        this.metrics = {
            startTime: 0,
            tokenCount: 0,
            totalBytes: 0,
            errorCount: 0,
            reconnectCount: 0,
            avgTokenLatency: 0,
            peakMemoryUsage: 0
        };
        return finalMetrics;
    }
    getMetrics() {
        return { ...this.metrics };
    }
}
exports.StreamPerformanceMonitor = StreamPerformanceMonitor;
/**
 * Memory-efficient token buffer with automatic pruning
 */
class TokenBuffer {
    constructor(maxSize = 1000, pruneThreshold = 0.8) {
        this.buffer = [];
        this.maxSize = maxSize;
        this.pruneThreshold = pruneThreshold;
    }
    append(token) {
        this.buffer.push(token);
        // Auto-prune when buffer gets too large
        if (this.buffer.length > this.maxSize * this.pruneThreshold) {
            this.prune();
        }
        return this.getContent();
    }
    getContent() {
        return this.buffer.join('');
    }
    prune() {
        // Keep the most recent half of tokens
        const keepCount = Math.floor(this.maxSize / 2);
        this.buffer = this.buffer.slice(-keepCount);
    }
    clear() {
        this.buffer = [];
    }
    size() {
        return this.buffer.length;
    }
    memoryUsage() {
        return this.buffer.reduce((total, token) => total + token.length * 2, 0); // ~2 bytes per char
    }
}
exports.TokenBuffer = TokenBuffer;
/**
 * Adaptive throttling based on performance metrics
 */
class AdaptiveThrottle {
    constructor(minDelay = 16, maxDelay = 100) {
        this.lastCall = 0;
        this.performanceHistory = [];
        this.minDelay = minDelay;
        this.maxDelay = maxDelay;
        this.currentDelay = minDelay;
    }
    shouldExecute() {
        const now = performance.now();
        if (now - this.lastCall >= this.currentDelay) {
            this.lastCall = now;
            return true;
        }
        return false;
    }
    adaptDelay(renderTime) {
        this.performanceHistory.push(renderTime);
        // Keep only recent samples
        if (this.performanceHistory.length > 10) {
            this.performanceHistory.shift();
        }
        // Calculate average render time
        const avgRenderTime = this.performanceHistory.reduce((a, b) => a + b, 0) / this.performanceHistory.length;
        // Adjust delay based on performance
        if (avgRenderTime > 16) { // Over 60 FPS target
            this.currentDelay = Math.min(this.maxDelay, this.currentDelay * 1.1);
        }
        else if (avgRenderTime < 8) { // Well under target
            this.currentDelay = Math.max(this.minDelay, this.currentDelay * 0.9);
        }
    }
    getCurrentDelay() {
        return this.currentDelay;
    }
}
exports.AdaptiveThrottle = AdaptiveThrottle;
/**
 * Circuit breaker for stream resilience
 */
class StreamCircuitBreaker {
    constructor(failureThreshold = 5, recoveryTimeout = 30000) {
        this.failureCount = 0;
        this.lastFailureTime = 0;
        this.state = 'closed';
        this.failureThreshold = failureThreshold;
        this.recoveryTimeout = recoveryTimeout;
    }
    canExecute() {
        const now = Date.now();
        switch (this.state) {
            case 'closed':
                return true;
            case 'open':
                if (now - this.lastFailureTime >= this.recoveryTimeout) {
                    this.state = 'half-open';
                    return true;
                }
                return false;
            case 'half-open':
                return true;
            default:
                return false;
        }
    }
    recordSuccess() {
        this.failureCount = 0;
        this.state = 'closed';
    }
    recordFailure() {
        this.failureCount++;
        this.lastFailureTime = Date.now();
        if (this.state === 'half-open') {
            this.state = 'open';
        }
        else if (this.failureCount >= this.failureThreshold) {
            this.state = 'open';
        }
    }
    getState() {
        return this.state;
    }
    reset() {
        this.failureCount = 0;
        this.state = 'closed';
        this.lastFailureTime = 0;
    }
}
exports.StreamCircuitBreaker = StreamCircuitBreaker;
class StreamRetryHandler {
    constructor(config = {}) {
        this.retryCount = 0;
        this.config = {
            maxRetries: 3,
            baseDelay: 1000,
            maxDelay: 10000,
            backoffMultiplier: 2,
            retryCondition: (error) => !error.message.includes('401') && !error.message.includes('403'),
            ...config
        };
    }
    async executeWithRetry(operation) {
        for (let attempt = 0; attempt <= this.config.maxRetries; attempt++) {
            try {
                const result = await operation();
                this.retryCount = 0; // Reset on success
                return result;
            }
            catch (error) {
                const err = error;
                // Don't retry if condition fails or max retries reached
                if (!this.config.retryCondition?.(err) || attempt === this.config.maxRetries) {
                    throw err;
                }
                // Calculate delay with exponential backoff
                const delay = Math.min(this.config.baseDelay * Math.pow(this.config.backoffMultiplier, attempt), this.config.maxDelay);
                // Add jitter to prevent thundering herd
                const jitteredDelay = delay + Math.random() * 1000;
                await new Promise(resolve => setTimeout(resolve, jitteredDelay));
                this.retryCount++;
            }
        }
        throw new Error('Max retries exceeded');
    }
    getRetryCount() {
        return this.retryCount;
    }
    reset() {
        this.retryCount = 0;
    }
}
exports.StreamRetryHandler = StreamRetryHandler;
/**
 * Comprehensive streaming health monitor
 */
class StreamHealthMonitor {
    constructor() {
        this.performanceMonitor = new StreamPerformanceMonitor();
        this.circuitBreaker = new StreamCircuitBreaker();
        this.retryHandler = new StreamRetryHandler();
        this.isHealthy = true;
        this.healthChecks = [];
    }
    addHealthCheck(check) {
        this.healthChecks.push(check);
    }
    startMonitoring() {
        this.performanceMonitor.startStream();
        this.circuitBreaker.reset();
        this.retryHandler.reset();
        this.isHealthy = true;
    }
    recordActivity(tokenLength) {
        this.performanceMonitor.recordToken(tokenLength);
    }
    recordError(error) {
        this.performanceMonitor.recordError();
        this.circuitBreaker.recordFailure();
        this.checkHealth();
    }
    recordSuccess() {
        this.circuitBreaker.recordSuccess();
        this.checkHealth();
    }
    checkHealth() {
        const metrics = this.performanceMonitor.getMetrics();
        // Check various health indicators
        const checks = [
            () => this.circuitBreaker.canExecute(),
            () => metrics.errorCount < 10,
            () => metrics.avgTokenLatency < 1000,
            () => metrics.peakMemoryUsage < 100 * 1024 * 1024, // 100MB
            ...this.healthChecks
        ];
        this.isHealthy = checks.every(check => check());
        return this.isHealthy;
    }
    getHealthStatus() {
        return {
            isHealthy: this.isHealthy,
            metrics: this.performanceMonitor.getMetrics(),
            circuitBreakerState: this.circuitBreaker.getState(),
            retryCount: this.retryHandler.getRetryCount()
        };
    }
    async executeHealthyOperation(operation) {
        if (!this.circuitBreaker.canExecute()) {
            throw new Error('Circuit breaker is open - stream unavailable');
        }
        try {
            const result = await this.retryHandler.executeWithRetry(operation);
            this.recordSuccess();
            return result;
        }
        catch (error) {
            this.recordError(error);
            throw error;
        }
    }
    stopMonitoring() {
        return this.performanceMonitor.endStream();
    }
}
exports.StreamHealthMonitor = StreamHealthMonitor;
