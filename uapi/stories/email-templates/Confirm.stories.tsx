import type { Meta, StoryObj } from '@storybook/react';
import { ConfirmEmail } from '@bitcode/email-templates';
import { createEmailStory } from './_helpers';

const meta: Meta<typeof ConfirmEmail> = {
  title: 'Email/Confirm',
  component: ConfirmEmail,
  parameters: { layout: 'fullscreen' },
};

export default meta;

type Story = StoryObj<typeof ConfirmEmail>;

export const Default: Story = {
  args: {
    confirmationUrl: 'https://engi.dev/auth/confirm?token=123',
    firstName: 'Grace',
  },
  render: createEmailStory(ConfirmEmail),
};
