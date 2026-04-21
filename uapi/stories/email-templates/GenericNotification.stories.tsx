import type { Meta, StoryObj } from '@storybook/react';
import { GenericNotificationEmail } from '@bitcode/email-templates';
import { createEmailStory } from './_helpers';

const meta: Meta<typeof GenericNotificationEmail> = {
  title: 'Email/GenericNotification',
  component: GenericNotificationEmail,
  parameters: { layout: 'fullscreen' },
};

export default meta;

type Story = StoryObj<typeof GenericNotificationEmail>;

export const Default: Story = {
  args: {
    subject: 'Service maintenance on Saturday',
    body: `We’ll be performing a brief scheduled maintenance window on <strong>Saturday at 09:00 UTC</strong>. <br/><br/>No action is required on your part, but some API calls may return 503 for up to 3 minutes.`,
    actionLabel: 'View status page',
    actionUrl: 'https://status.bitcode.ai',
  },
  render: createEmailStory(GenericNotificationEmail),
};
