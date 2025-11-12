/**
 * Conversation Streaming Service
 * 
 * Centralized streaming abstraction for conversations with proper cleanup,
 * backpressure handling, and memory management.
 * 
 * Architecture:
 * - Server-Sent Events (SSE) for real-time streaming
 * - Automatic cleanup on disconnect
 * - Backpressure handling to prevent client overflow
 * - Pipeline event integration
 * - Memory-efficient token buffering
 */

import { log } from '@engi/logger';
import type { Execution } from '@engi/execution-generics';

/**
 * Stream event types for conversation streaming
 */
export type StreamEventType = 
  | 'token'              // Text token for assistant response
  | 'message_complete'   // Full message completed
  | 'pipeline_triggered' // Pipeline execution started
  | 'pipeline_event'     // Pipeline progress update
  | 'pipeline_complete'  // Pipeline execution finished
  | 'error'             // Error occurred
  | 'heartbeat';        // Keep-alive ping

/**
 * Stream event structure
 */
export interface StreamEvent {
  type: StreamEventType;
  data: any;
  timestamp?: string;
  metadata?: Record<string, any>;
}

/**
 * Streaming configuration options
 */
export interface StreamConfig {
  heartbeatInterval?: number;  // Milliseconds between heartbeats (default: 30000)
  bufferSize?: number;         // Maximum events to buffer (default: 1000)
  throttleMs?: number;         // Throttle token events (default: 50ms)
  maxConnections?: number;     // Max concurrent connections per user (default: 5)
}

/**
 * Active stream connection
 */
interface StreamConnection {
  id: string;
  userId: string;
  conversationId: string;
  controller: ReadableStreamDefaultController;
  heartbeatTimer?: NodeJS.Timer;
  createdAt: Date;
  lastActivity: Date;
  eventCount: number;
}

/**
 * Conversation Streaming Service
 * 
 * Manages all streaming connections with proper lifecycle management
 */
export class ConversationStreamingService {
  private connections: Map<string, StreamConnection> = new Map();
  private userConnectionCounts: Map<string, number> = new Map();
  private config: Required<StreamConfig>;
  private encoder = new TextEncoder();

  constructor(config: StreamConfig = {}) {
    this.config = {
      heartbeatInterval: config.heartbeatInterval ?? 30000,
      bufferSize: config.bufferSize ?? 1000,
      throttleMs: config.throttleMs ?? 50,
      maxConnections: config.maxConnections ?? 5
    };

    // Cleanup stale connections every minute
    setInterval(() => this.cleanupStaleConnections(), 60000);
  }

  /**
   * Create a new streaming connection
   */
  createStream(
    userId: string,
    conversationId: string,
    requestId: string
  ): ReadableStream {
    // Check connection limit
    const userCount = this.userConnectionCounts.get(userId) || 0;
    if (userCount >= this.config.maxConnections) {
      throw new Error(`Maximum connections (${this.config.maxConnections}) reached for user`);
    }

    const connectionId = `${userId}-${conversationId}-${requestId}`;
    
    return new ReadableStream({
      start: (controller) => {
        // Create connection record
        const connection: StreamConnection = {
          id: connectionId,
          userId,
          conversationId,
          controller,
          createdAt: new Date(),
          lastActivity: new Date(),
          eventCount: 0
        };

        // Store connection
        this.connections.set(connectionId, connection);
        this.userConnectionCounts.set(userId, userCount + 1);

        // Start heartbeat
        connection.heartbeatTimer = setInterval(() => {
          this.sendHeartbeat(connectionId);
        }, this.config.heartbeatInterval);

        // Send initial connection event
        this.emitEvent(connectionId, {
          type: 'message_complete',
          data: { 
            message: 'Stream connected',
            connectionId,
            timestamp: new Date().toISOString()
          }
        });

        log('[streaming] Connection opened', 'info', {
          connectionId,
          userId,
          conversationId,
          activeConnections: this.connections.size
        });
      },

      cancel: () => {
        this.closeConnection(connectionId);
      }
    });
  }

  /**
   * Emit an event to a specific connection
   */
  emitEvent(connectionId: string, event: StreamEvent): boolean {
    const connection = this.connections.get(connectionId);
    if (!connection) {
      log('[streaming] Connection not found', 'warn', { connectionId });
      return false;
    }

    try {
      // Check buffer size
      if (connection.eventCount >= this.config.bufferSize) {
        log('[streaming] Buffer overflow, closing connection', 'warn', {
          connectionId,
          eventCount: connection.eventCount
        });
        this.closeConnection(connectionId);
        return false;
      }

      // Format as SSE
      const sseData = `data: ${JSON.stringify(event)}\n\n`;
      const chunk = this.encoder.encode(sseData);

      // Send to client
      connection.controller.enqueue(chunk);
      
      // Update stats
      connection.lastActivity = new Date();
      connection.eventCount++;

      return true;
    } catch (error) {
      log('[streaming] Failed to emit event', 'error', {
        connectionId,
        error,
        eventType: event.type
      });
      this.closeConnection(connectionId);
      return false;
    }
  }

  /**
   * Emit a token with throttling
   */
  private tokenThrottles = new Map<string, NodeJS.Timeout>();
  
  emitToken(connectionId: string, token: string): void {
    // Clear existing throttle
    const existingThrottle = this.tokenThrottles.get(connectionId);
    if (existingThrottle) {
      clearTimeout(existingThrottle);
    }

    // Set new throttle
    const throttle = setTimeout(() => {
      this.emitEvent(connectionId, {
        type: 'token',
        data: token
      });
      this.tokenThrottles.delete(connectionId);
    }, this.config.throttleMs);

    this.tokenThrottles.set(connectionId, throttle);
  }

  /**
   * Attach pipeline execution to stream
   */
  attachPipelineExecution(
    connectionId: string,
    execution: Execution,
    pipelineId: string,
    pipelineType: string
  ): void {
    const connection = this.connections.get(connectionId);
    if (!connection) return;

    // Emit pipeline triggered
    this.emitEvent(connectionId, {
      type: 'pipeline_triggered',
      data: { pipelineId, pipelineType }
    });

    // Forward execution events
    execution.on('log', (data) => {
      this.emitEvent(connectionId, {
        type: 'pipeline_event',
        data: {
          pipelineId,
          event: { type: 'log', ...data }
        }
      });
    });

    execution.on('phase', (data) => {
      this.emitEvent(connectionId, {
        type: 'pipeline_event',
        data: {
          pipelineId,
          event: { type: 'phase', ...data }
        }
      });
    });

    execution.on('complete', (data) => {
      this.emitEvent(connectionId, {
        type: 'pipeline_complete',
        data: {
          pipelineId,
          success: data.success,
          summary: data.summary
        }
      });
    });

    execution.on('error', (error) => {
      this.emitEvent(connectionId, {
        type: 'error',
        data: {
          pipelineId,
          message: error.message,
          code: error.code
        }
      });
    });
  }

  /**
   * Send heartbeat to keep connection alive
   */
  private sendHeartbeat(connectionId: string): void {
    const connection = this.connections.get(connectionId);
    if (!connection) return;

    try {
      const heartbeat = `: heartbeat ${Date.now()}\n\n`;
      connection.controller.enqueue(this.encoder.encode(heartbeat));
      connection.lastActivity = new Date();
    } catch (error) {
      // Connection likely closed
      this.closeConnection(connectionId);
    }
  }

  /**
   * Close a streaming connection
   */
  closeConnection(connectionId: string): void {
    const connection = this.connections.get(connectionId);
    if (!connection) return;

    // Clear heartbeat
    if (connection.heartbeatTimer) {
      clearInterval(connection.heartbeatTimer);
    }

    // Clear token throttle
    const throttle = this.tokenThrottles.get(connectionId);
    if (throttle) {
      clearTimeout(throttle);
      this.tokenThrottles.delete(connectionId);
    }

    // Close controller
    try {
      connection.controller.close();
    } catch (error) {
      // Already closed
    }

    // Update user count
    const userCount = this.userConnectionCounts.get(connection.userId) || 1;
    if (userCount <= 1) {
      this.userConnectionCounts.delete(connection.userId);
    } else {
      this.userConnectionCounts.set(connection.userId, userCount - 1);
    }

    // Remove connection
    this.connections.delete(connectionId);

    log('[streaming] Connection closed', 'info', {
      connectionId,
      userId: connection.userId,
      conversationId: connection.conversationId,
      duration: Date.now() - connection.createdAt.getTime(),
      eventCount: connection.eventCount,
      activeConnections: this.connections.size
    });
  }

  /**
   * Clean up stale connections (no activity for 5 minutes)
   */
  private cleanupStaleConnections(): void {
    const staleThreshold = Date.now() - 5 * 60 * 1000; // 5 minutes
    const staleConnections: string[] = [];

    for (const [id, connection] of this.connections) {
      if (connection.lastActivity.getTime() < staleThreshold) {
        staleConnections.push(id);
      }
    }

    if (staleConnections.length > 0) {
      log('[streaming] Cleaning up stale connections', 'info', {
        count: staleConnections.length
      });

      for (const id of staleConnections) {
        this.closeConnection(id);
      }
    }
  }

  /**
   * Get streaming statistics
   */
  getStats(): {
    activeConnections: number;
    userCounts: Record<string, number>;
    connectionDetails: Array<{
      id: string;
      userId: string;
      conversationId: string;
      duration: number;
      eventCount: number;
    }>;
  } {
    const connectionDetails = Array.from(this.connections.values()).map(conn => ({
      id: conn.id,
      userId: conn.userId,
      conversationId: conn.conversationId,
      duration: Date.now() - conn.createdAt.getTime(),
      eventCount: conn.eventCount
    }));

    return {
      activeConnections: this.connections.size,
      userCounts: Object.fromEntries(this.userConnectionCounts),
      connectionDetails
    };
  }
}

// Export singleton instance
export const streamingService = new ConversationStreamingService();

// Export helper for route handlers
export function createStreamResponse(stream: ReadableStream): Response {
  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
      'X-Accel-Buffering': 'no', // Disable Nginx buffering
      'Transfer-Encoding': 'chunked'
    }
  });
}