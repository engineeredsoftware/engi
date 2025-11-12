import React from 'react';
import { renderToString } from 'react-dom/server';
import ProfileStep from '@/app/orbitals/components/OrbitalProfileStep';

describe('ProfileStep (SSR)', () => {
  it('renders initial user profile fields and team members', () => {
    const initialTeamMembers = [
      {
        id: 'tm1',
        username: 'user1',
        displayName: 'User One',
        avatarUrl: 'http://example.com/avatar1.png',
        role: 'admin',
        creditBudget: 5000
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
    // Check avatar image URL appears in inline style or src
    expect(html).toContain('avatar1.png');
    // Team member table should include the member displayName and role
    expect(html).toContain('User One');
    expect(html).toContain('admin');
  });
});
