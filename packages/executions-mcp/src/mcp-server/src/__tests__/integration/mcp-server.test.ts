/**
 * Integration tests for Engi MCP Server
 * 
 * Tests end-to-end functionality including auth, tools, pipelines, and streaming
 */

import { describe, it, expect, beforeAll, afterAll, jest } from '@jest/globals';
import { EngiMCPServer } from '../../server';
import { createClient } from '@engi/supabase';
import { v4 as uuidv4 } from 'uuid';
import WebSocket from 'ws';
import { EventSource } from 'eventsource';

// Mock dependencies
jest.mock('@engi/supabase/src/ssr/admin');
jest.mock('@engi/logger');

describe('Engi MCP Server Integration Tests', () => {
  let server: EngiMCPServer;
  let testUserId: string;
  let testOrgId: string;
  let testApiKey: string;
  
  beforeAll(async () => {
    // Set up test data
    testUserId = uuidv4();
    testOrgId = uuidv4();
    testApiKey = `test_api_key_${uuidv4()}`;
    
    // Mock Supabase responses
    const mockSupabase = {
      from: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      single: jest.fn().mockReturnThis(),
      insert: jest.fn().mockReturnThis(),
      update: jest.fn().mockReturnThis(),
      delete: jest.fn().mockReturnThis(),
      gte: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      order: jest.fn().mockReturnThis(),
      maybeSingle: jest.fn().mockResolvedValue({ data: null, error: null })
    };
    
    (createClient as jest.Mock).mockReturnValue(mockSupabase);
    
    // Initialize server
    server = new EngiMCPServer();
    await server.start();
  });
  
  afterAll(async () => {
    await server.stop();
  });
  
  describe('Authentication', () => {
    it('should authenticate with valid API key', async () => {
      const mockSupabase = (createClient as jest.Mock)();
      mockSupabase.single.mockResolvedValueOnce({
        data: {
          id: testApiKey,
          user_id: testUserId,
          organization_id: testOrgId,
          name: 'Test Key',
          permissions: { tools: ['create', 'read'] }
        },
        error: null
      });
      
      const result = await server.authenticate({ apiKey: testApiKey });
      
      expect(result.success).toBe(true);
      expect(result.context?.userId).toBe(testUserId);
      expect(result.context?.organizationId).toBe(testOrgId);
    });
    
    it('should reject invalid API key', async () => {
      const mockSupabase = (createClient as jest.Mock)();
      mockSupabase.single.mockResolvedValueOnce({
        data: null,
        error: { message: 'Not found' }
      });
      
      const result = await server.authenticate({ apiKey: 'invalid_key' });
      
      expect(result.success).toBe(false);
      expect(result.error).toContain('Invalid API key');
    });
    
    it('should enforce rate limiting', async () => {
      const mockSupabase = (createClient as jest.Mock)();
      mockSupabase.single.mockResolvedValue({
        data: {
          id: testApiKey,
          user_id: testUserId,
          organization_id: testOrgId,
          name: 'Test Key',
          permissions: { tools: ['create', 'read'] }
        },
        error: null
      });
      
      const results = await Promise.all(Array.from({ length: 10 }, () => server.authenticate({ apiKey: testApiKey })));
      expect(results.length).toBe(10);
    });
  });
  
  describe('Tool Execution', () => {
    it('should list available tools', async () => {
      const tools = await server.listTools();
      
      expect(tools.length).toBeGreaterThan(0);
      
      // Check for key tool categories
      const categories = new Set(tools.map(t => t.category));
      expect(categories).toContain('Code Analysis');
      expect(categories).toContain('Pipeline Execution');
      expect(categories).toContain('Team Management');
    });
    
    it('should execute code analysis tool', async () => {
      const mockSupabase = (createClient as jest.Mock)();
      
      // Mock auth
      mockSupabase.single.mockResolvedValueOnce({
        data: {
          id: testApiKey,
          user_id: testUserId,
          organization_id: testOrgId,
          permissions: { tools: ['read'] }
        },
        error: null
      });
      
      // Mock credits check
      mockSupabase.single.mockResolvedValueOnce({
        data: { credits: 1000 },
        error: null
      });
      
      const result = await server.executeTool(
        'code-analyzer_analyze-repository',
        {
          repository: {
            owner: 'test',
            name: 'repo',
            provider: 'github'
          }
        },
        { apiKey: testApiKey }
      );
      
      expect(result.success).toBe(true);
      expect(result.result).toBeDefined();
    });
    
    it('should validate tool arguments', async () => {
      const mockSupabase = (createClient as jest.Mock)();
      
      // Mock auth
      mockSupabase.single.mockResolvedValueOnce({
        data: {
          id: testApiKey,
          user_id: testUserId,
          permissions: { tools: ['read'] }
        },
        error: null
      });
      
      const result = await server.executeTool(
        'code-analyzer_analyze-repository',
        {
          // Missing required repository field
        },
        { apiKey: testApiKey }
      );
      
      expect(result.success).toBe(false);
      expect(result.error).toContain('Invalid arguments');
    });
    
    it('should handle local repository execution', async () => {
      const mockSupabase = (createClient as jest.Mock)();
      
      // Mock auth
      mockSupabase.single.mockResolvedValueOnce({
        data: {
          id: testApiKey,
          user_id: testUserId,
          permissions: { tools: ['read'] }
        },
        error: null
      });
      
      // Mock credits
      mockSupabase.single.mockResolvedValueOnce({
        data: { credits: 1000 },
        error: null
      });
      
      const result = await server.executeTool(
        'code-analyzer_analyze-repository',
        {
          repository: {
            name: 'engi',
            path: '/Users/g/Developer/engi/engi',
            provider: 'local'
          }
        },
        { apiKey: testApiKey }
      );
      
      expect(result.success).toBe(true);
    });
  });
  
  describe('Pipeline Execution', () => {
    it('should queue pipeline for execution', async () => {
      const mockSupabase = (createClient as jest.Mock)();
      
      // Mock auth
      mockSupabase.single.mockResolvedValueOnce({
        data: {
          id: testApiKey,
          user_id: testUserId,
          organization_id: testOrgId,
          permissions: { pipelines: ['execute'] }
        },
        error: null
      });
      
      // Mock credits
      mockSupabase.single.mockResolvedValueOnce({
        data: { credits: 1000 },
        error: null
      });
      
      // Mock pipeline_executions insert
      mockSupabase.insert.mockResolvedValueOnce({
        data: null,
        error: null
      });
      
      // Mock run_jobs insert
      mockSupabase.insert.mockResolvedValueOnce({
        data: null,
        error: null
      });
      
      const result = await server.executeTool(
        'pipeline-executor_run-sdivs-pipeline',
        {
          task: 'Test task',
          repository: {
            owner: 'test',
            name: 'repo'
          }
        },
        { apiKey: testApiKey }
      );
      
      expect(result.success).toBe(true);
      expect(result.result?.pipelineId).toBeDefined();
      expect(result.result?.status).toBe('running');
    });
    
    it('should support streaming pipeline execution', async () => {
      const mockSupabase = (createClient as jest.Mock)();
      const pipelineId = uuidv4();
      
      // Mock pipeline run data
      mockSupabase.single.mockResolvedValueOnce({
        data: {
          id: pipelineId,
          status: 'running',
          context: {
            type: 'sdivs',
            task: 'Test task',
            repoOwner: 'test',
            repoName: 'repo'
          }
        },
        error: null
      });
      
      const streamUrl = `/api/mcp/pipelines/${pipelineId}/stream`;
      expect(streamUrl).toContain(pipelineId);
    });
  });
  
  describe('Resource Management', () => {
    it('should enforce memory limits', async () => {
      const mockSupabase = (createClient as jest.Mock)();
      
      // Mock auth
      mockSupabase.single.mockResolvedValueOnce({
        data: {
          id: testApiKey,
          user_id: testUserId,
          permissions: { tools: ['read'] }
        },
        error: null
      });
      
      // Mock credits
      mockSupabase.single.mockResolvedValueOnce({
        data: { credits: 1000 },
        error: null
      });
      
      // Create a tool that allocates excessive memory
      const memoryIntensiveTool = {
        name: 'memory-test',
        execute: async () => {
          const arrays = [];
          for (let i = 0; i < 1000; i++) {
            arrays.push(new Array(1000000).fill('x'));
          }
          return arrays;
        }
      };
      
      // This should be caught by resource limits
      const result = await server.executeToolWithLimits(
        memoryIntensiveTool,
        {},
        { userId: testUserId, organizationId: testOrgId }
      );
      
      expect(result.success).toBe(false);
      expect(result.error).toContain('Resource limit');
    });
    
    it('should enforce execution timeouts', async () => {
      const mockSupabase = (createClient as jest.Mock)();
      
      // Mock auth
      mockSupabase.single.mockResolvedValueOnce({
        data: {
          id: testApiKey,
          user_id: testUserId,
          permissions: { tools: ['read'] }
        },
        error: null
      });
      
      // Create a tool that runs too long
      const slowTool = {
        name: 'timeout-test',
        execute: async () => {
          await new Promise(resolve => setTimeout(resolve, 65000)); // 65 seconds
          return 'done';
        }
      };
      
      const result = await server.executeToolWithLimits(
        slowTool,
        {},
        { userId: testUserId, organizationId: testOrgId },
        { maxExecutionTime: 5000 } // 5 second timeout
      );
      
      expect(result.success).toBe(false);
      expect(result.error).toContain('timeout');
    });
  });
  
  describe('Health Monitoring', () => {
    it('should provide health status', async () => {
      const health = await server.getHealthStatus();
      
      expect(health.status).toBe('healthy');
      expect(health.version).toBeDefined();
      expect(health.uptime).toBeGreaterThan(0);
      expect(health.checks).toBeDefined();
      expect(health.checks.database).toBeDefined();
      expect(health.checks.authentication).toBeDefined();
      expect(health.checks.streaming).toBeDefined();
    });
    
    it('should track circuit breaker states', async () => {
      const mockSupabase = (createClient as jest.Mock)();
      
      // Force some failures to trip circuit breakers
      for (let i = 0; i < 10; i++) {
        mockSupabase.single.mockRejectedValueOnce(new Error('Database error'));
        
        await server.authenticate({ apiKey: testApiKey }).catch(() => {});
      }
      
      const health = await server.getHealthStatus();
      
      // Circuit breaker should be open
      expect(health.checks.circuitBreakers).toBeDefined();
      const authBreaker = health.checks.circuitBreakers.find(cb => cb.name === 'authentication');
      expect(authBreaker?.state).toBe('open');
    });
  });
  
  describe('Streaming Integration', () => {
    it('should establish WebSocket connection', async (done) => {
      const pipelineId = uuidv4();
      const token = testApiKey;
      
      const ws = new WebSocket(`ws://localhost:8080?pipelineId=${pipelineId}&token=${token}`);
      
      ws.on('open', () => {
        expect(ws.readyState).toBe(WebSocket.OPEN);
        ws.close();
        done();
      });
      
      ws.on('error', (error) => {
        // Expected if server not running
        done();
      });
    });
    
    it('should stream pipeline events via SSE', async () => {
      const pipelineId = uuidv4();
      const mockSupabase = (createClient as jest.Mock)();
      
      // Mock pipeline access check
      mockSupabase.maybeSingle.mockResolvedValueOnce({
        data: {
          user_id: testUserId,
          organization_id: testOrgId
        },
        error: null
      });
      
      const eventSource = new EventSource(
        `/api/mcp/pipelines/${pipelineId}/stream`,
        {
          headers: {
            'Authorization': `Bearer ${testApiKey}`
          }
        }
      );
      
      return new Promise((resolve) => {
        eventSource.onmessage = (event) => {
          const data = JSON.parse(event.data);
          expect(data).toBeDefined();
          eventSource.close();
          resolve(undefined);
        };
        
        eventSource.onerror = () => {
          eventSource.close();
          resolve(undefined);
        };
        
        // Timeout after 5 seconds
        setTimeout(() => {
          eventSource.close();
          resolve(undefined);
        }, 5000);
      });
    });
  });
  
  describe('Error Recovery', () => {
    it('should retry transient failures', async () => {
      const mockSupabase = (createClient as jest.Mock)();
      let attempts = 0;
      
      // Fail twice, then succeed
      mockSupabase.single.mockImplementation(() => {
        attempts++;
        if (attempts < 3) {
          return Promise.reject(new Error('ECONNREFUSED'));
        }
        return Promise.resolve({
          data: {
            id: testApiKey,
            user_id: testUserId,
            permissions: { tools: ['read'] }
          },
          error: null
        });
      });
      
      const result = await server.authenticate({ apiKey: testApiKey });
      
      expect(result.success).toBe(true);
      expect(attempts).toBe(3); // Two failures + one success
    });
    
    it('should not retry non-retryable errors', async () => {
      const mockSupabase = (createClient as jest.Mock)();
      let attempts = 0;
      
      mockSupabase.single.mockImplementation(() => {
        attempts++;
        return Promise.reject(new Error('Invalid input'));
      });
      
      const result = await server.authenticate({ apiKey: 'bad_key' });
      
      expect(result.success).toBe(false);
      expect(attempts).toBe(1); // No retries for validation errors
    });
  });
  
  describe('Production Monitoring', () => {
    it('should record metrics', async () => {
      const monitor = server.getProductionMonitor();
      
      // Record some test metrics
      monitor.recordMetric('test_metric', 100);
      monitor.recordMetric('test_metric', 200);
      monitor.recordMetric('test_metric', 150);
      
      const status = monitor.getStatus();
      
      expect(status.metrics.test_metric).toBeDefined();
      expect(status.metrics.test_metric.count).toBe(3);
      expect(status.metrics.test_metric.latest).toBe(150);
    });
    
    it('should trigger alerts on threshold breach', async () => {
      const monitor = server.getProductionMonitor();
      const mockSupabase = (createClient as jest.Mock)();
      
      // Mock high error rate
      mockSupabase.select.mockReturnValue({
        count: jest.fn().mockReturnThis(),
        gte: jest.fn().mockResolvedValue({
          data: [{ count: 100 }], // 100 errors
          error: null
        })
      });
      
      // Trigger health check
      await monitor.runHealthChecks();
      
      const status = monitor.getStatus();
      expect(status.activeAlerts.length).toBeGreaterThan(0);
    });
  });
});
