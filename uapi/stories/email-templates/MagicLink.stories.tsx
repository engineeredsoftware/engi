import type { Meta, StoryObj } from '@storybook/react';
import { MagicLinkEmail } from '@bitcode/email-templates';
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
    confirmationUrl: 'https://app.bitcode.ai/auth/confirm?token=abcdef',
    firstName: 'Ada',
    email: 'ada@example.com',
    siteUrl: 'https://app.bitcode.ai',
  },
  render: createEmailStory(MagicLinkEmail),
};
