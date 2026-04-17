/**
 * Unit tests for authentication middleware
 */

import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { authenticateMCPRequest, validatePermissions } from '../../auth/middleware';
import { createClient } from '@bitcode/supabase';
import { authCache } from '../../server';

// Mock dependencies
jest.mock('@bitcode/supabase/src/ssr/admin');
jest.mock('@bitcode/logger');

describe('Authentication Middleware', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    authCache.clear();
  });
  
  describe('authenticateMCPRequest', () => {
    it('should authenticate valid Bearer token', async () => {
      const mockSupabase = {
        auth: {
          getUser: jest.fn().mockResolvedValue({
            data: {
              user: {
                id: 'user123',
                user_metadata: {
                  organizationId: 'org123'
                }
              }
            },
            error: null
          })
        },
        from: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({
          data: {
            role: 'member',
            permissions: {
              organization: { viewAnalytics: true },
              project: { view: true }
            }
          },
          error: null
        })
      };
      
      (createClient as jest.Mock).mockReturnValue(mockSupabase);
      
      const result = await authenticateMCPRequest('Bearer valid_token', {
        resources: ['read']
      });
      
      expect(result.success).toBe(true);
      expect(result.context?.userId).toBe('user123');
      expect(result.context?.organizationId).toBe('org123');
      expect(result.context?.permissions).toBeDefined();
    });
    
    it('should authenticate valid API key', async () => {
      const mockSupabase = {
        from: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({
          data: {
            id: 'key123',
            user_id: 'user123',
            organization_id: 'org123',
            name: 'Test Key',
            permissions: {
              tools: ['create', 'read'],
              resources: ['read']
            }
          },
          error: null
        })
      };
      
      (createClient as jest.Mock).mockReturnValue(mockSupabase);
      
      const result = await authenticateMCPRequest('key_test123', {
        resources: ['read']
      });
      
      expect(result.success).toBe(true);
      expect(result.context?.userId).toBe('user123');
      expect(result.context?.organizationId).toBe('org123');
      expect(result.context?.apiKeyId).toBe('key123');
    });
    
    it('should cache authentication results', async () => {
      const mockSupabase = {
        from: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({
          data: {
            id: 'key123',
            user_id: 'user123',
            organization_id: 'org123',
            permissions: { tools: ['read'] }
          },
          error: null
        })
      };
      
      (createClient as jest.Mock).mockReturnValue(mockSupabase);
      
      // First call
      await authenticateMCPRequest('key_test123', { resources: ['read'] });
      
      // Second call should use cache
      await authenticateMCPRequest('key_test123', { resources: ['read'] });
      
      // Should only call database once
      expect(mockSupabase.from).toHaveBeenCalledTimes(1);
    });
    
    it('should reject invalid credentials', async () => {
      const mockSupabase = {
        auth: {
          getUser: jest.fn().mockResolvedValue({
            data: { user: null },
            error: { message: 'Invalid token' }
          })
        },
        from: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({
          data: null,
          error: { message: 'Not found' }
        })
      };
      
      (createClient as jest.Mock).mockReturnValue(mockSupabase);
      
      const result = await authenticateMCPRequest('invalid_token', {
        resources: ['read']
      });
      
      expect(result.success).toBe(false);
      expect(result.error).toContain('Authentication failed');
    });
    
    it('should handle rate limiting', async () => {
      // Make many rapid requests
      const promises = [];
      for (let i = 0; i < 150; i++) {
        promises.push(
          authenticateMCPRequest(`key_${i}`, { resources: ['read'] })
        );
      }
      
      const results = await Promise.all(promises);
      
      // Some should be rate limited
      const rateLimited = results.filter(r => 
        !r.success && r.error?.includes('rate limit')
      );
      
      expect(rateLimited.length).toBeGreaterThan(0);
    });
  });
  
  describe('validatePermissions', () => {
    it('should validate required permissions', () => {
      const context = {
        userId: 'user123',
        permissions: {
          tools: ['create', 'read', 'update'],
          resources: ['read']
        }
      };
      
      expect(
        validatePermissions(context, { tools: ['read'] })
      ).toBe(true);
      
      expect(
        validatePermissions(context, { tools: ['delete'] })
      ).toBe(false);
      
      expect(
        validatePermissions(context, { 
          tools: ['read'], 
          resources: ['read'] 
        })
      ).toBe(true);
    });
    
    it('should handle organization permissions', () => {
      const context = {
        userId: 'user123',
        permissions: {
          organization: {
            viewAnalytics: true,
            manageMembers: false
          }
        }
      };
      
      expect(
        validatePermissions(context, {
          organization: { viewAnalytics: true }
        })
      ).toBe(true);
      
      expect(
        validatePermissions(context, {
          organization: { manageMembers: true }
        })
      ).toBe(false);
    });
    
    it('should handle empty permissions', () => {
      const context = {
        userId: 'user123',
        permissions: {}
      };
      
      expect(
        validatePermissions(context, { tools: ['read'] })
      ).toBe(false);
      
      expect(
        validatePermissions(context, {})
      ).toBe(true); // No requirements = pass
    });
  });
});