import type { User } from '@supabase/supabase-js';

import { ENABLE_MOCKS, MOCK_USER_ORBITAL, MOCK_USER_ORBITAL_SCENARIO } from '@/config/featureFlags';

const REVIEW_USER_ID = 'mock-bitcode-review-user';
const REVIEW_TIMESTAMP = '2026-04-16T12:00:00.000Z';
const REVIEW_COMPLETED_STEPS = ['profile', 'connects', 'models', 'credits'] as const;

export function isUserOrbitalMockMode() {
  return ENABLE_MOCKS && MOCK_USER_ORBITAL;
}

export function getUserOrbitalMockScenario() {
  return MOCK_USER_ORBITAL_SCENARIO || 'default';
}

export function buildMockReviewUser(): User {
  return {
    id: REVIEW_USER_ID,
    aud: 'authenticated',
    role: 'authenticated',
    email: 'reviewer@bitcode.ai',
    email_confirmed_at: REVIEW_TIMESTAMP,
    phone: '',
    confirmed_at: REVIEW_TIMESTAMP,
    last_sign_in_at: REVIEW_TIMESTAMP,
    app_metadata: {
      provider: 'mock',
      providers: ['mock'],
      reviewScenario: getUserOrbitalMockScenario(),
    },
    user_metadata: {
      full_name: 'Avery Mercer',
      avatar_url: 'https://avatars.githubusercontent.com/u/9919?v=4',
      company_name: 'Bitcode Review Lab',
    },
    identities: [],
    created_at: REVIEW_TIMESTAMP,
    updated_at: REVIEW_TIMESTAMP,
    is_anonymous: false,
  } as User;
}

export function buildMockOrbitalData() {
  return {
    profile: {
      user_id: REVIEW_USER_ID,
      username: 'avery-mercer',
      display_name: 'Avery Mercer',
      bio: 'Reviewing the Bitcode application surface in deterministic mock mode.',
      company_name: 'Bitcode Review Lab',
      avatar_url: 'https://avatars.githubusercontent.com/u/9919?v=4',
      email: 'reviewer@bitcode.ai',
      is_verified: true,
      onboarded_steps: [...REVIEW_COMPLETED_STEPS],
      team_members: [
        { id: 'tm-1', username: 'lin', display_name: 'Lin Ortega', role: 'admin' },
        { id: 'tm-2', username: 'sora', display_name: 'Sora Ames', role: 'reviewer' },
      ],
      mock_mode: true,
      mock_scenario: getUserOrbitalMockScenario(),
    },
    githubConnection: {
      installationId: 424242,
      provider: 'github',
      account: 'bitcode-labs',
      login: 'bitcode-labs',
      status: 'connected',
      repositories: 7,
      mock_mode: true,
    },
    credits: 1200,
    modelPreferences: {
      preferred_model: 'claude-3-7-sonnet',
      temperature: 0.4,
      max_tokens: 3200,
      review_profile: 'bitcode-application-demo',
    },
    onboarded_steps: [...REVIEW_COMPLETED_STEPS],
    isOnboardingComplete: true,
  };
}

export function buildMockOnboardingData() {
  return {
    completedSteps: [...REVIEW_COMPLETED_STEPS],
    currentStep: 'profile',
    isOnboardingComplete: true,
  };
}
