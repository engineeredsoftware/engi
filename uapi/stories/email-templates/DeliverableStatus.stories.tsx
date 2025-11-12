import type { Meta, StoryObj } from '@storybook/react';
import { DeliverableStatusEmail } from '@engi/email-templates';
import { createEmailStory } from './_helpers';

const meta: Meta<typeof DeliverableStatusEmail> = {
  title: 'Email/DeliverableStatus',
  component: DeliverableStatusEmail,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    status: {
      control: { type: 'radio' },
      options: ['started', 'complete', 'failed', 'short_circuit'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof DeliverableStatusEmail>;

export const Started: Story = {
  args: {
    status: 'started',
    type: 'Pull Request',
    name: 'Add authentication flow',
    description: 'Initial draft implementing Supabase auth hooks',
    credits: 200,
    linkUrl: 'https://github.com/org/repo/pull/123',
  },
  render: createEmailStory(DeliverableStatusEmail),
};

export const Complete: Story = {
  args: {
    ...Started.args,
    status: 'complete',
  },
  render: createEmailStory(DeliverableStatusEmail),
};

export const Failed: Story = {
  args: {
    ...Started.args,
    status: 'failed',
  },
  render: createEmailStory(DeliverableStatusEmail),
};

export const Cancelled: Story = {
  args: {
    ...Started.args,
    status: 'short_circuit',
  },
  render: createEmailStory(DeliverableStatusEmail),
};
