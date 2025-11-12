import type { Meta, StoryObj } from '@storybook/react';
import { MagicLinkEmail } from '@engi/email-templates';
import { createEmailStory } from './_helpers';

const meta: Meta<typeof MagicLinkEmail> = {
  title: 'Email/MagicLink',
  component: MagicLinkEmail,
  parameters: {
    layout: 'fullscreen',
    // Render full-height so we can see the entire email
    viewport: {
      defaultViewport: 'responsive',
    },
  },
};

export default meta;

type Story = StoryObj<typeof MagicLinkEmail>;

export const Default: Story = {
  args: {
    confirmationUrl: 'https://engi.dev/auth/confirm?token=abcdef',
    firstName: 'Ada',
    email: 'ada@example.com',
    siteUrl: 'https://engi.dev',
  },
  render: createEmailStory(MagicLinkEmail),
};
