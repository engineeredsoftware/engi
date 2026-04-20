/**
 * Unit tests for authentication middleware
 */

import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { authenticateMCPRequest, authCache, validatePermissions } from '../../auth/middleware';
import { createClient } from '@bitcode/supabase';
import {
  OrganizationsModel,
  OrganizationMembersModel,
  UserApiKeysModel,
  UserCreditsModel,
  UsersModel
} from '@bitcode/orm';

jest.mock('@bitcode/logger');
jest.mock('@bitcode/supabase', () => ({
  createClient: jest.fn()
}));
jest.mock('@bitcode/orm', () => ({
  UsersModel: jest.fn(),
  UserProfilesModel: jest.fn(),
  UserApiKeysModel: jest.fn(),
  UserCreditsModel: jest.fn(),
  OrganizationsModel: jest.fn(),
  OrganizationMembersModel: jest.fn()
}));

const mockGetByKeyHash = jest.fn();
const mockUpdateLastUsed = jest.fn();
const mockGetById = jest.fn();
const mockGetCreditsByUserId = jest.fn();
const mockGetMembership = jest.fn();

const resetOrmMocks = () => {
  (createClient as jest.Mock).mockReturnValue({ supabase: 'test' });

  (UserApiKeysModel as unknown as jest.Mock).mockImplementation(() => ({
    getByKeyHash: mockGetByKeyHash,
    updateLastUsed: mockUpdateLastUsed
  }));

  (UsersModel as unknown as jest.Mock).mockImplementation(() => ({
    getById: mockGetById
  }));

  (UserCreditsModel as unknown as jest.Mock).mockImplementation(() => ({
    getByUserId: mockGetCreditsByUserId
  }));

  (OrganizationsModel as unknown as jest.Mock).mockImplementation(() => ({
    getById: mockGetById
  }));

  (OrganizationMembersModel as unknown as jest.Mock).mockImplementation(() => ({
    getMembership: mockGetMembership
  }));
};

describe('Authentication Middleware', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    authCache.clear();
    resetOrmMocks();
  });

  describe('authenticateMCPRequest', () => {
    it('authenticates a valid API key and derives current Bitcode permissions', async () => {
      mockGetByKeyHash.mockResolvedValue({
        id: 'key123',
        user_id: 'user123',
        name: 'Bitcode Test Key',
        scopes: ['pipelines:create', 'resources:read'],
        expires_at: null
      });
      mockUpdateLastUsed.mockResolvedValue(undefined);
      mockGetById
        .mockResolvedValueOnce({
          id: 'user123',
          email: 'operator@example.com',
          full_name: 'Bitcode Operator',
          organization_id: 'org123'
        })
        .mockResolvedValueOnce({
          id: 'org123',
          name: 'Bitcode Labs',
          slug: 'bitcode-labs'
        });
      mockGetMembership.mockResolvedValue({
        role: 'member',
        permissions: {
          organization: ['viewAnalytics'],
          pipelines: ['create', 'read'],
          resources: ['read']
        }
      });
      mockGetCreditsByUserId.mockResolvedValue({ balance: 120 });

      const result = await authenticateMCPRequest('Bearer key_test123', {
        requireOrganization: true,
        requiredPermissions: {
          pipelines: ['create'],
          resources: ['read']
        }
      });

      expect(result.success).toBe(true);
      expect(result.context).toMatchObject({
        userId: 'user123',
        organizationId: 'org123',
        apiKeyId: 'key123',
        apiKeyName: 'Bitcode Test Key',
        organizationName: 'Bitcode Labs',
        organizationSlug: 'bitcode-labs',
        creditBalance: 120
      });
      expect(result.context?.permissions.pipelines.create).toBe(true);
      expect(result.context?.permissions.organization.viewAnalytics).toBe(true);
      expect(mockGetByKeyHash).toHaveBeenCalledTimes(1);
      expect(mockUpdateLastUsed).toHaveBeenCalledWith('key123');
    });

    it('reuses cached auth context across repeated requests', async () => {
      mockGetByKeyHash.mockResolvedValue({
        id: 'key123',
        user_id: 'user123',
        name: 'Bitcode Test Key',
        scopes: ['resources:read'],
        expires_at: null
      });
      mockUpdateLastUsed.mockResolvedValue(undefined);
      mockGetById
        .mockResolvedValueOnce({
          id: 'user123',
          email: 'operator@example.com',
          full_name: 'Bitcode Operator',
          organization_id: undefined
        });
      mockGetCreditsByUserId.mockResolvedValue({ balance: 50 });

      const first = await authenticateMCPRequest('Bearer key_test123', {
        requiredPermissions: { resources: ['read'] }
      });
      const second = await authenticateMCPRequest('Bearer key_test123', {
        requiredPermissions: { resources: ['read'] }
      });

      expect(first.success).toBe(true);
      expect(second.success).toBe(true);
      expect(mockGetByKeyHash).toHaveBeenCalledTimes(1);
      expect(mockUpdateLastUsed).toHaveBeenCalledTimes(1);
      expect(mockGetById).toHaveBeenCalledTimes(1);
    });

    it('fails closed when the authorization header does not contain a Bearer API key', async () => {
      const result = await authenticateMCPRequest('invalid_token');

      expect(result.success).toBe(false);
      expect(result.error).toMatchObject({
        code: 'MISSING_API_KEY',
        statusCode: 401
      });
    });

    it('fails closed on insufficient derived permissions', async () => {
      mockGetByKeyHash.mockResolvedValue({
        id: 'key123',
        user_id: 'user123',
        name: 'Bitcode Test Key',
        scopes: ['resources:read'],
        expires_at: null
      });
      mockUpdateLastUsed.mockResolvedValue(undefined);
      mockGetById.mockResolvedValueOnce({
        id: 'user123',
        email: 'operator@example.com',
        full_name: 'Bitcode Operator',
        organization_id: undefined
      });
      mockGetCreditsByUserId.mockResolvedValue({ balance: 50 });

      const result = await authenticateMCPRequest('Bearer key_test123', {
        requiredPermissions: { pipelines: ['create'] }
      });

      expect(result.success).toBe(false);
      expect(result.error).toMatchObject({
        code: 'INSUFFICIENT_PERMISSIONS',
        statusCode: 403
      });
      expect(result.error?.message).toContain('pipelines.create');
    });

    it('fails closed when minimum credits are not satisfied', async () => {
      mockGetByKeyHash.mockResolvedValue({
        id: 'key123',
        user_id: 'user123',
        name: 'Bitcode Test Key',
        scopes: ['resources:read'],
        expires_at: null
      });
      mockUpdateLastUsed.mockResolvedValue(undefined);
      mockGetById.mockResolvedValueOnce({
        id: 'user123',
        email: 'operator@example.com',
        full_name: 'Bitcode Operator',
        organization_id: undefined
      });
      mockGetCreditsByUserId.mockResolvedValue({ balance: 10 });

      const result = await authenticateMCPRequest('Bearer key_test123', {
        minimumCredits: 100
      });

      expect(result.success).toBe(false);
      expect(result.error).toMatchObject({
        code: 'INSUFFICIENT_CREDITS',
        statusCode: 402
      });
    });
  });

  describe('validatePermissions', () => {
    it('validates the current structured permission shape', () => {
      const context = {
        permissions: {
          pipelines: {
            create: true,
            read: true,
            cancel: false,
            retry: false
          },
          organization: {
            manageMembers: false,
            viewAnalytics: true,
            manageCredits: false
          },
          resources: {
            read: true,
            export: false
          }
        }
      };

      expect(
        validatePermissions(context as any, {
          pipelines: ['read'],
          resources: ['read']
        })
      ).toBe(true);

      expect(
        validatePermissions(context as any, {
          pipelines: ['cancel']
        })
      ).toBe(false);
    });

    it('treats empty requirements as satisfied', () => {
      const context = {
        permissions: {
          pipelines: {
            create: false,
            read: false,
            cancel: false,
            retry: false
          },
          organization: {
            manageMembers: false,
            viewAnalytics: false,
            manageCredits: false
          },
          resources: {
            read: false,
            export: false
          }
        }
      };

      expect(validatePermissions(context as any, {})).toBe(true);
    });
  });
});
