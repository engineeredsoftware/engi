import type { Meta, StoryObj } from '@storybook/react';
import { InviteEmail } from '@bitcode/email-templates';
import { createEmailStory } from './_helpers';

const meta: Meta<typeof InviteEmail> = {
  title: 'Email/Invite',
  component: InviteEmail,
  parameters: { layout: 'fullscreen' },
};

export default meta;

type Story = StoryObj<typeof InviteEmail>;

export const Default: Story = {
  args: {
    inviteUrl: 'https://app.bitcode.ai/invite?token=abc',
    inviterName: 'Grace Hopper',
    workspaceName: 'Compiler Team',
  },
  render: createEmailStory(InviteEmail),
};
