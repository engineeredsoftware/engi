/**
 * VCS Connections - Database persistence for VCS connections
 * 
 * Manages VCS authentication tokens and connection metadata.
 * Uses ORM for all database operations.
 * 
 * @doc-code
 * type: connections
 * category: vcs
 * pattern: connection-management
 */

import { UserConnectionsModel, type Database } from '@bitcode/orm';
import { VCSProviderType, VCSAuth, VCSError } from './types';
import { log } from '@bitcode/logger';
import { SupabaseClient } from '@supabase/supabase-js';

export interface SaveConnectionData {
  accessToken: string;
  refreshToken?: string;
  expiresAt?: Date;
  providerUserId: string;
  providerUsername: string;
  instanceUrl?: string;
  metadata?: Record<string, unknown>;
}

/**
 * Handles VCS connections in the database
 */
export class VCSConnections {
  private connections: UserConnectionsModel;
  
  constructor(supabaseClient?: SupabaseClient<Database>) {
    if (!supabaseClient) {
      throw new Error('VCSConnections requires a Supabase client');
    }
    this.connections = new UserConnectionsModel(supabaseClient);
  }
  
  /**
   * Save or update a VCS connection
   */
  async saveConnection(
    userId: string,
    provider: VCSProviderType,
    data: SaveConnectionData
  ): Promise<string> {
    try {
      const connection = await this.connections.upsert({
        user_id: userId,
        provider,
        connection_data: {
          connectionId: data.providerUserId,
          provider_user_id: data.providerUserId,
          provider_username: data.providerUsername,
          access_token: data.accessToken,
          refresh_token: data.refreshToken,
          token_expires_at: data.expiresAt?.toISOString(),
          instance_url: data.instanceUrl,
          ...data.metadata
        }
      });
      
      log('Connection saved', 'info', {
        userId,
        provider,
        providerUsername: data.providerUsername
      });
      
      return connection.id;
    } catch (error) {
      log('Failed to save connection', 'error', { error, userId, provider });
      throw new VCSError(
        `Failed to save ${provider} connection: ${error instanceof Error ? error.message : 'Unknown error'}`,
        'DB_ERROR'
      );
    }
  }
  
  /**
   * Get a VCS connection for a user
   */
  async getConnection(
    userId: string,
    provider?: VCSProviderType
  ): Promise<{ id: string; connectionData: any } | null> {
    try {
      log('Getting VCS connection', 'debug', { userId, provider });
      
      const connection = provider
        ? await this.connections.getByUserAndProvider(userId, provider)
        : (await this.connections.listByUserId(userId))[0];
      
      if (!connection) {
        log('No VCS connection found', 'info', { userId, provider });
        return null;
      }
      
      log('VCS connection found', 'info', { 
        userId, 
        provider: connection.provider,
        connectionId: connection.id,
        hasAccessToken: !!connection.connection_data?.access_token,
        providerUserId: connection.connection_data?.provider_user_id
      });
      
      return {
        id: connection.id,
        connectionData: connection.connection_data
      };
    } catch (error) {
      log('Failed to get connection', 'error', { error, userId, provider });
      return null;
    }
  }
  
  /**
   * Get auth data from connection
   */
  async getAuthFromConnection(connectionId: string): Promise<VCSAuth | null> {
    try {
      log('Getting auth from connection', 'debug', { connectionId });
      
      // Check if connectionId is a valid UUID (format: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)
      const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(connectionId);
      
      let connection = null;
      
      if (isUUID) {
        // Try to get by database UUID
        connection = await this.connections.getById(connectionId);
      }
      
      // If not found by UUID or not a UUID, and the connectionId looks like a number (GitHub installation ID)
      if (!connection && /^\d+$/.test(connectionId)) {
        log('Looking for connection by GitHub installation ID', 'debug', { connectionId });
        
        // Try by provider_user_id first
        connection = await this.connections.getByProviderUserId('github', connectionId);
        
        // If still not found, try the legacy approach with installation ID
        if (!connection) {
          const auth = await this.connections.getAuthFromConnectionByInstallationId(Number(connectionId));
          if (auth) {
            log('Found connection via legacy installation ID lookup', 'info', { connectionId });
            // Convert the legacy auth format to our standard format
            return {
              ...auth,
              provider: auth.provider as VCSProviderType
            };
          }
        }
      }
      
      if (!connection) {
        log('Connection not found by any method', 'warn', { connectionId, isUUID });
        return null;
      }
      
      // Check for access_token or ability to generate one
      let accessToken = connection.connection_data?.access_token;
      
      // For GitHub App installations, regenerate token if expired or missing
      if (connection.provider === 'github' && connection.connection_data?.connectionId) {
        const tokenExpiresAt = connection.connection_data?.installation_token_expires_at;
        const isExpired = tokenExpiresAt ? new Date(tokenExpiresAt) < new Date() : true;
        
        if (!accessToken || accessToken === '' || isExpired) {
          log('GitHub installation token missing or expired, regenerating', 'info', {
            connectionId,
            installationId: connection.connection_data.connectionId,
            hadToken: !!accessToken,
            isExpired
          });
          
          // Regenerate installation token
          try {
            const { GitHubAppAuth } = await import('@bitcode/github');
            const appId = process.env.GITHUB_APP_ID;
            const privateKey = process.env.GITHUB_PRIVATE_KEY;
            
            if (appId && privateKey) {
              const githubApp = new GitHubAppAuth({
                appId,
                privateKey,
                clientId: process.env.GITHUB_APP_CLIENT_ID,
                clientSecret: process.env.GITHUB_APP_CLIENT_SECRET
              });
              
              // Don't request specific permissions - use whatever the installation has granted
              // This avoids 422 errors when requesting permissions not available to the installation
              const tokenData = await githubApp.generateInstallationToken(
                Number(connection.connection_data.connectionId)
                // Omitting permissions parameter to use installation's granted permissions
              );
              
              accessToken = tokenData.token;
              
              // Update the connection with new token
              await this.updateTokens(connection.id, {
                accessToken: tokenData.token,
                expiresAt: tokenData.expiresAt
              });
              
              log('GitHub installation token regenerated successfully', 'info', {
                connectionId,
                expiresAt: tokenData.expiresAt
              });
            }
          } catch (error) {
            log('Failed to regenerate GitHub installation token', 'error', {
              connectionId,
              error
            });
            // Fall back to OAuth token if available
            accessToken = connection.connection_data?.oauth_token;
          }
        }
      }
      
      if (!accessToken || accessToken === '') {
        log('Connection exists but has no valid access token', 'warn', { 
          connectionId,
          hasConnectionData: !!connection.connection_data,
          connectionDataKeys: connection.connection_data ? Object.keys(connection.connection_data) : [],
          accessTokenValue: accessToken === '' ? 'empty string' : typeof accessToken
        });
        return null;
      }
      
      log('Auth retrieved successfully', 'info', { 
        connectionId,
        provider: connection.provider,
        hasRefreshToken: !!connection.connection_data.refresh_token
      });
      
      return {
        accessToken: accessToken,
        refreshToken: connection.connection_data.refresh_token,
        expiresAt: connection.connection_data.token_expires_at
          ? new Date(connection.connection_data.token_expires_at)
          : undefined,
        provider: connection.provider as VCSProviderType,
        connectionId: connection.id
      };
    } catch (error) {
      log('Failed to get auth from connection', 'error', { error, connectionId });
      return null;
    }
  }
  
  /**
   * Get auth by installation ID (legacy GitHub support)
   */
  async getAuthFromConnectionByInstallationId(
    installationId: number
  ): Promise<VCSAuth | null> {
    try {
      const auth = await this.connections.getAuthFromConnectionByInstallationId(installationId);
      if (!auth) return null;
      
      return {
        ...auth,
        provider: auth.provider as VCSProviderType
      };
    } catch (error) {
      log('Failed to get auth by installation ID', 'error', { error, installationId });
      return null;
    }
  }
  
  /**
   * Update connection tokens
   */
  async updateTokens(
    connectionId: string,
    tokens: {
      accessToken: string;
      refreshToken?: string;
      expiresAt?: Date;
    }
  ): Promise<void> {
    try {
      const connection = await this.connections.getById(connectionId);
      if (!connection) {
        throw new VCSError('Connection not found', 'NOT_FOUND');
      }
      
      await this.connections.update(connectionId, {
        connection_data: {
          ...connection.connection_data,
          access_token: tokens.accessToken,
          refresh_token: tokens.refreshToken || connection.connection_data.refresh_token,
          token_expires_at: tokens.expiresAt?.toISOString()
        }
      });
      
      log('Tokens updated', 'debug', { connectionId });
    } catch (error) {
      log('Failed to update tokens', 'error', { error, connectionId });
      throw new VCSError(
        `Failed to update tokens: ${error instanceof Error ? error.message : 'Unknown error'}`,
        'UPDATE_ERROR'
      );
    }
  }
  
  /**
   * Delete a connection
   */
  async deleteConnection(connectionId: string): Promise<void> {
    try {
      await this.connections.delete(connectionId);
      log('Connection deleted', 'info', { connectionId });
    } catch (error) {
      log('Failed to delete connection', 'error', { error, connectionId });
      throw new VCSError(
        `Failed to delete connection: ${error instanceof Error ? error.message : 'Unknown error'}`,
        'DELETE_ERROR'
      );
    }
  }
  
  /**
   * List all connections for a user
   */
  async listConnections(userId: string): Promise<Array<{
    id: string;
    provider: string;
    username: string;
    createdAt: Date;
  }>> {
    try {
      const connections = await this.connections.listByUserId(userId);
      
      return connections.map(c => ({
        id: c.id,
        provider: c.provider,
        username: c.provider_username,
        createdAt: new Date(c.created_at)
      }));
    } catch (error) {
      log('Failed to list connections', 'error', { error, userId });
      return [];
    }
  }
}