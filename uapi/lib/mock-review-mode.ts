import type { User } from '@supabase/supabase-js';
import type { VCSProviderType, VCSRepository } from '@bitcode/vcs';

import { ENABLE_MOCKS, MOCK_USER_ORBITAL, MOCK_USER_ORBITAL_SCENARIO } from '@/config/featureFlags';

const REVIEW_USER_ID = 'mock-bitcode-review-user';
const REVIEW_TIMESTAMP = '2026-04-16T12:00:00.000Z';
const REVIEW_COMPLETED_STEPS = ['profile', 'connects', 'interfaces', 'btd'] as const;

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
  const onboardedPanes = [...REVIEW_COMPLETED_STEPS];

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
      onboarded_steps: onboardedPanes,
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
      account: 'bitcode',
      login: 'bitcode',
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
    onboardedPanes,
    onboarded_steps: onboardedPanes,
    isOnboardingComplete: true,
  };
}

export function buildMockOnboardingData() {
  return {
    completedPanes: [...REVIEW_COMPLETED_STEPS],
    completedSteps: [...REVIEW_COMPLETED_STEPS],
    currentPane: 'profile',
    currentStep: 'profile',
    isOnboardingComplete: true,
  };
}

export function buildMockVcsConnectionStatus(provider: VCSProviderType) {
  if (provider !== 'github') {
    return {
      connected: false,
      provider,
      valid: false,
      metadata: {
        mock_mode: true,
        supported: false,
      },
    };
  }

  const orbitalData = buildMockOrbitalData();
  const githubConnection = orbitalData.githubConnection;

  return {
    connected: true,
    provider,
    valid: true,
    username: githubConnection?.login || githubConnection?.account || 'bitcode',
    instanceUrl: undefined,
    metadata: {
      mock_mode: true,
      repositories: githubConnection?.repositories || 0,
      account: githubConnection?.account || 'bitcode',
      status: githubConnection?.status || 'connected',
    },
  };
}

export function buildMockVcsRepositories(provider: VCSProviderType): VCSRepository[] {
  if (provider !== 'github') {
    return [];
  }

  return [
    {
      id: 'mock-repo-bitcode',
      name: 'bitcode',
      fullName: 'bitcode/bitcode',
      description: 'Primary Bitcode application workspace and route-local composition carrier.',
      private: true,
      defaultBranch: 'main',
      url: 'https://github.com/bitcode/bitcode',
      cloneUrl: 'https://github.com/bitcode/bitcode.git',
      sshUrl: 'git@github.com:bitcode/bitcode.git',
      owner: {
        id: 'bitcode',
        username: 'bitcode',
        type: 'organization',
      },
      createdAt: new Date(REVIEW_TIMESTAMP),
      updatedAt: new Date(REVIEW_TIMESTAMP),
      language: 'TypeScript',
      topics: ['bitcode', 'application', 'v26'],
      archived: false,
      fork: false,
      forksCount: 0,
      starsCount: 0,
      size: 2048,
    },
    {
      id: 'mock-repo-core',
      name: 'bitcode-core',
      fullName: 'bitcode/bitcode-core',
      description: 'System specification, proof, and pipeline-core integration surface for Bitcode.',
      private: true,
      defaultBranch: 'main',
      url: 'https://github.com/bitcode/bitcode-core',
      cloneUrl: 'https://github.com/bitcode/bitcode-core.git',
      sshUrl: 'git@github.com:bitcode/bitcode-core.git',
      owner: {
        id: 'bitcode',
        username: 'bitcode',
        type: 'organization',
      },
      createdAt: new Date(REVIEW_TIMESTAMP),
      updatedAt: new Date(REVIEW_TIMESTAMP),
      language: 'TypeScript',
      topics: ['bitcode', 'proof', 'pipelines'],
      archived: false,
      fork: false,
      forksCount: 0,
      starsCount: 0,
      size: 1024,
    },
    {
      id: 'mock-repo-economics',
      name: 'economic-ledger',
      fullName: 'bitcode/economic-ledger',
      description: 'Settlement, accounting, and proof-publishing surfaces feeding the V26 application.',
      private: true,
      defaultBranch: 'main',
      url: 'https://github.com/bitcode/economic-ledger',
      cloneUrl: 'https://github.com/bitcode/economic-ledger.git',
      sshUrl: 'git@github.com:bitcode/economic-ledger.git',
      owner: {
        id: 'bitcode',
        username: 'bitcode',
        type: 'organization',
      },
      createdAt: new Date(REVIEW_TIMESTAMP),
      updatedAt: new Date(REVIEW_TIMESTAMP),
      language: 'Rust',
      topics: ['bitcode', 'settlement', 'proof'],
      archived: false,
      fork: false,
      forksCount: 0,
      starsCount: 0,
      size: 1536,
    },
  ];
}
