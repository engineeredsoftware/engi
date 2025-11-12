import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import AccountOrbital from '@/app/orbitals/components/OrbitalAccount';

const meta = {
  title: 'Orbitals/Account/Orbital',
  component: AccountOrbital,
  parameters: { layout: 'fullscreen', backgrounds: { default: 'dark' } },
} satisfies Meta<typeof AccountOrbital>;

export default meta;
type Story = StoryObj<typeof meta>;

// Provide initialData so the component renders instantly without fetch.
const init = {
  profile: {
    email: 'engineer@example.com',
    username: 'engi-swe',
    display_name: 'Engi Engineer',
    bio: 'Dedicated to building autonomous software agents.',
  },
  githubConnection: { username: 'engi-swe' },
  credits: 42,
  modelPreferences: { model: 'gpt-4o' },
};

export const Default: Story = {
  render: () => <AccountOrbital onClose={() => {}} initialData={init} />,
};
