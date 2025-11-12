import type { Meta, StoryObj } from '@storybook/react';
import { PasswordRecoveryEmail } from '@engi/email-templates';
import { createEmailStory } from './_helpers';

const meta: Meta<typeof PasswordRecoveryEmail> = {
  title: 'Email/PasswordRecovery',
  component: PasswordRecoveryEmail,
  parameters: { layout: 'fullscreen' },
};

export default meta;

type Story = StoryObj<typeof PasswordRecoveryEmail>;

export const Default: Story = {
  args: {
    resetUrl: 'https://engi.dev/reset?token=xyz',
    firstName: 'Linus',
  },
  render: createEmailStory(PasswordRecoveryEmail),
};
