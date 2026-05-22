import React from 'react';
import { renderToString } from 'react-dom/server';
import ProfileStep from '@/app/auxillaries/components/AuxillariesProfileStep';

describe('ProfileStep (SSR)', () => {
  it('renders initial user profile fields and team members', () => {
    const initialTeamMembers = [
      {
        id: 'tm1',
        username: 'user1',
        displayName: 'User One',
        avatarUrl: 'http://example.com/avatar1.png',
        role: 'admin',
        btcFeeBudget: 5000
      }
    ];
    const html = renderToString(
      <ProfileStep
        onSave={() => {}}
        loading={false}
        initialTeamMembers={initialTeamMembers}
        initialUsername="user1"
        initialDisplayName="User One"
        initialBio="Bio text"
        initialCompanyName="ACME Corp"
        initialAvatarUrl="http://example.com/avatar1.png"
        initialIsVerified={true}
        profileState={{
          kind: 'AuxillariesProfileState',
          userId: 'user-1',
          username: 'user1',
          displayName: 'User One',
          email: 'user1@example.com',
          companyName: 'ACME Corp',
          role: 'admin',
          accountReadiness: 'degraded',
          accountIdentity: {
            userId: 'user-1',
            username: 'user1',
            displayName: 'User One',
            email: 'user1@example.com',
            emailVerified: true,
            companyName: 'ACME Corp',
            role: 'admin',
          },
          profileCompleteness: {
            complete: false,
            blockers: [],
            issues: [
              {
                id: 'preferences.templates_missing',
                severity: 'recoverable',
                summary: 'Template preference is not configured.',
                requiredAction: 'Configure shippable and evidence templates.',
                repairRoute: {
                  issueId: 'preferences.templates_missing',
                  pane: 'interfaces',
                  route: '/terminal?auxillary-open-to=interfaces',
                  label: 'Configure Templates',
                  retryPolicy: 'after_repair',
                },
              },
            ],
            repairRoutes: [],
          },
          walletBinding: null,
          modelPreferencesConfigured: true,
          templatePreferencesConfigured: false,
          preferences: {
            model: {
              configured: true,
              provider: 'openai',
              model: 'gpt-4.1',
              preferenceRoot: 'model-root',
            },
            templates: {
              configured: false,
              shippableTemplateCount: 0,
              evidenceDocumentTemplateCount: 0,
              autoSaveTemplates: false,
              preferenceRoot: 'template-root',
            },
          },
          notificationPosture: {
            state: 'ready',
            email: 'user1@example.com',
            emailVerified: true,
            unreadCount: 0,
            latestNotificationAt: null,
            sourceSafetyClass: 'secret_free_summary',
            notificationRoot: 'notification-root',
          },
          dataSharingPosture: {
            state: 'configured',
            repositoryCount: 1,
            enabledRepositoryCount: 1,
            disabledRepositoryCount: 0,
            sourceSafetyClass: 'source_safe',
            dataSharingRoot: 'sharing-root',
          },
          sourceSafetyClass: 'source_safe',
          profileCompletenessRoot: 'profile-root',
        }}
        isFirstTimeUser={false}
        onCompletionStatusChange={() => {}}
        isDevMode={false}
      />
    );
    // Check text fields
    expect(html).toContain('user1');
    expect(html).toContain('User One');
    expect(html).toContain('Bio text');
    expect(html).toContain('ACME Corp');
    expect(html).toContain('auxillaries-profile-readiness');
    expect(html).toContain('Needs repair');
    expect(html).toContain('Template preference is not configured.');
    expect(html).toContain('/terminal?auxillary-open-to=interfaces');
    // Avatar choices render from the pane-owned generated palette.
    expect(html).toContain('Select avatar 1');
    // Team member table should include the member displayName and role
    expect(html).toContain('User One');
    expect(html).toContain('admin');
  });
});
