/**
 * User API Route Handlers
 * 
 * Clean orchestration for user management operations.
 * All database operations use ORM models.
 * 
 * @doc-code
 * type: route-handlers
 * category: user-management
 */

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@engi/supabase/ssr/server';
import { traceRoute } from '@engi/observability';
import { log } from '@engi/logger';
import { createAdminClient } from '@engi/orm';
import { sendServerEvent } from '@engi/google-analytics';
import { createJsonResponse, createErrorResponse, createAuthErrorResponse } from '@engi/responses';
import * as crypto from 'crypto';

// Initialize ORM models (admin client for server routes)
const orm = createAdminClient();
const userProfiles = orm.userProfiles;
const userCredits = orm.userCredits;
const creditUsages = orm.userCreditUsages;
const modelPreferences = orm.userModelPreferences;
const apiKeys = new (require('@engi/orm').UserApiKeysModel as any)( (require('@engi/supabase').supabaseAdmin) );
const notifications = orm.notifications;

/**
 * GET /api/user/profile
 * Get authenticated user's profile
 */
export const getProfile = traceRoute('/user/profile', async (request: NextRequest) => {
  const requestId = crypto.randomUUID();

  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      log('[user/profile] Authentication failed', 'warn', { requestId });
      return createAuthErrorResponse();
    }

    const profile = await userProfiles.getByUserId(user.id);
    return createJsonResponse(profile || {});

  } catch (error) {
    log('[user/profile] Error', 'error', { requestId, error });
    return createErrorResponse(error);
  }
});

/**
 * POST /api/user/profile
 * Update user profile
 */
export const updateProfile = traceRoute('/user/profile', async (request: NextRequest) => {
  const requestId = crypto.randomUUID();

  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      log('[user/profile] Authentication failed', 'warn', { requestId });
      return createAuthErrorResponse();
    }

    const body = await request.json();
    const { username, displayName, bio, companyName, avatarUrl, teamMembers, isVerified } = body;

    // Validate required fields
    if (!username) {
      return createJsonResponse({ error: 'Username is required' }, 400);
    }

    // Upsert profile
    await userProfiles.upsert({
      user_id: user.id,
      username,
      display_name: displayName,
      bio,
      company_name: companyName,
      avatar_url: avatarUrl,
      team_members: teamMembers
    });

    // Track update
    await sendServerEvent('user_profile_updated', {
      user_id: user.id,
      has_company: !!companyName,
      has_bio: !!bio,
      team_size: teamMembers || 0
    });

    return createJsonResponse({ success: true }, 201);

  } catch (error) {
    log('[user/profile] Update error', 'error', { requestId, error });
    return createErrorResponse(error);
  }
});

/**
 * GET /api/user/credits
 * Get user credit balance and recent usage
 */
export const getCredits = traceRoute('/user/credits', async (request: NextRequest) => {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return createAuthErrorResponse();
    }

    // Get balance
    const credits = await userCredits.getByUserId(user.id);
    const balance = credits?.credits || 0;

    // Get recent usage
    const usage = await creditUsages.getRecentByUserId(user.id, 10);

    return createJsonResponse({
      balance,
      recentUsage: usage
    });

  } catch (error) {
    log('[user/credits] Error', 'error', { error });
    return createErrorResponse(error);
  }
});

/**
 * POST /api/user/credits
 * Add credits to user account (admin only)
 */
export const addCredits = traceRoute('/user/credits', async (request: NextRequest) => {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return createAuthErrorResponse();
    }

    // Check admin status
    const profile = await userProfiles.getByUserId(user.id);
    if (!profile?.is_admin) {
      return createJsonResponse({ error: 'Admin access required' }, 403);
    }

    const body = await request.json();
    const { userId, amount, description } = body;

    if (!userId || !amount) {
      return createJsonResponse({ error: 'User ID and amount required' }, 400);
    }

    // Add credits
    const newBalance = await userCredits.addCredits(
      userId, 
      amount, 
      description || `Admin credit adjustment by ${user.id}`
    );

    // Track event
    await sendServerEvent('admin_credits_added', {
      admin_id: user.id,
      target_user_id: userId,
      amount,
      new_balance: newBalance
    });

    return createJsonResponse({ balance: newBalance });

  } catch (error) {
    log('[user/credits] Add error', 'error', { error });
    return createErrorResponse(error);
  }
});

/**
 * GET /api/user/model-preferences
 * Get model preferences
 */
export const getModelPreferences = traceRoute('/user/model-preferences', async (request: NextRequest) => {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return createAuthErrorResponse();
    }

    const prefs = await modelPreferences.getByUserId(user.id);
    return createJsonResponse(prefs?.preferences || {});

  } catch (error) {
    log('[user/model-preferences] Error', 'error', { error });
    return createErrorResponse(error);
  }
});

/**
 * POST /api/user/model-preferences
 * Update model preferences
 */
export const updateModelPreferences = traceRoute('/user/model-preferences', async (request: NextRequest) => {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return createAuthErrorResponse();
    }

    const preferences = await request.json();

    await modelPreferences.upsert({
      user_id: user.id,
      preferences
    });

    // Track update
    await sendServerEvent('model_preferences_updated', {
      user_id: user.id,
      default_provider: preferences.defaultProvider,
      default_model: preferences.defaultModel
    });

    return createJsonResponse({ success: true });

  } catch (error) {
    log('[user/model-preferences] Update error', 'error', { error });
    return createErrorResponse(error);
  }
});

/**
 * GET /api/user/api-keys
 * List user's API keys
 */
export const getApiKeys = traceRoute('/user/api-keys', async (request: NextRequest) => {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return createAuthErrorResponse();
    }

    const keys = await apiKeys.listByUserId(user.id);
    
    // Never return the actual key hash
    const safeKeys = keys.map(k => ({
      id: k.id,
      name: k.name,
      key_preview: k.key_preview,
      created_at: k.created_at,
      last_used_at: k.last_used_at,
      expires_at: k.expires_at
    }));

    return createJsonResponse(safeKeys);

  } catch (error) {
    log('[user/api-keys] Error', 'error', { error });
    return createErrorResponse(error);
  }
});

/**
 * POST /api/user/api-keys
 * Create new API key
 */
export const createApiKey = traceRoute('/user/api-keys', async (request: NextRequest) => {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return createAuthErrorResponse();
    }

    const body = await request.json();
    const { name, expiresIn } = body;

    if (!name) {
      return createJsonResponse({ error: 'API key name is required' }, 400);
    }

    // Generate key
    const apiKey = `engi_${crypto.randomBytes(32).toString('hex')}`;
    const keyPreview = `${apiKey.substring(0, 8)}...${apiKey.substring(apiKey.length - 4)}`;

    // Calculate expiration
    const expiresAt = expiresIn 
      ? new Date(Date.now() + expiresIn * 24 * 60 * 60 * 1000)
      : undefined;

    // Store hashed key
    const hashedKey = crypto
      .createHash('sha256')
      .update(apiKey)
      .digest('hex');

    const newKey = await apiKeys.create({
      user_id: user.id,
      name,
      key_hash: hashedKey,
      key_preview: keyPreview,
      expires_at: expiresAt
    });

    // Track creation
    await sendServerEvent('api_key_created', {
      user_id: user.id,
      key_id: newKey.id,
      has_expiration: !!expiresAt
    });

    return createJsonResponse({
      ...newKey,
      key: apiKey // Only return full key on creation
    }, 201);

  } catch (error) {
    log('[user/api-keys] Create error', 'error', { error });
    return createErrorResponse(error);
  }
});

/**
 * DELETE /api/user/api-keys/:keyId
 * Delete API key
 */
export const deleteApiKey = traceRoute('/user/api-keys', async (
  request: NextRequest,
  { params }: { params: { keyId: string } }
) => {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return createAuthErrorResponse();
    }

    await apiKeys.deleteByIdAndUser(params.keyId, user.id);
    return createJsonResponse({ success: true });

  } catch (error) {
    log('[user/api-keys] Delete error', 'error', { error });
    return createErrorResponse(error);
  }
});

/**
 * GET /api/user/notifications
 * Get user notifications
 */
export const getNotifications = traceRoute('/user/notifications', async (request: NextRequest) => {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return createAuthErrorResponse();
    }

    const { searchParams } = new URL(request.url);
    const unreadOnly = searchParams.get('unreadOnly') === 'true';
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');

    const result = await notifications.listByUserId(user.id, {
      unreadOnly,
      limit,
      offset
    });

    return createJsonResponse({
      notifications: result.data,
      total: result.count
    });

  } catch (error) {
    log('[user/notifications] Error', 'error', { error });
    return createErrorResponse(error);
  }
});

/**
 * PATCH /api/user/notifications/:notificationId
 * Mark notification as read
 */
export const markNotificationRead = traceRoute('/user/notifications', async (
  request: NextRequest,
  { params }: { params: { notificationId: string } }
) => {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return createAuthErrorResponse();
    }

    await notifications.markAsRead(params.notificationId, user.id);
    return createJsonResponse({ success: true });

  } catch (error) {
    log('[user/notifications] Mark read error', 'error', { error });
    return createErrorResponse(error);
  }
});

/**
 * GET /api/user/usage
 * Get usage statistics
 */
export const getUsage = traceRoute('/user/usage', async (request: NextRequest) => {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return createAuthErrorResponse();
    }

    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') || '30d';

    // Calculate date range
    const periodDays = period === '7d' ? 7 : period === '30d' ? 30 : 90;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - periodDays);

    // Get usage stats
    const creditUsage = await creditUsages.getUsageStats(user.id, startDate);

    return createJsonResponse({
      period,
      creditsUsed: creditUsage.total,
      dailyStats: creditUsage.daily
    });

  } catch (error) {
    log('[user/usage] Error', 'error', { error });
    return createErrorResponse(error);
  }
});
