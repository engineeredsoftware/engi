import type { Meta, StoryObj } from '@storybook/react';
import { EmailChangeEmail } from '@engi/email-templates';
import { createEmailStory } from './_helpers';

const meta: Meta<typeof EmailChangeEmail> = {
  title: 'Email/EmailChange',
  component: EmailChangeEmail,
  parameters: { layout: 'fullscreen' },
};

export default meta;

type Story = StoryObj<typeof EmailChangeEmail>;

export const Default: Story = {
  args: {
    confirmationUrl: 'https://engi.dev/email-change?token=def',
    newEmail: 'new@example.com',
  },
  render: createEmailStory(EmailChangeEmail),
};
