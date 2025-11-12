import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import LoginPane from '@/app/orbitals/components/OrbitalLoginPane';

// NOTE: LoginPane already embeds the animated headline, quantum bg and the
// LoginForm with its multi-stage flow.  For Storybook we simply mount it – the
// internal state machine can be exercised manually by typing an email, hitting
// the “DO” button, etc.

const meta = {
  title: 'Orbitals/Auth/Login',
  component: LoginPane,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
  },
} satisfies Meta<typeof LoginPane>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Login Pane',
  render: () => <LoginPane onToggle={() => {}} />,
};
