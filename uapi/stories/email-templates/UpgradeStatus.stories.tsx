import type { Meta, StoryObj } from '@storybook/react';
import { UpgradeStatusEmail } from '@bitcode/email-templates';
import { createEmailStory } from './_helpers';

const meta: Meta<typeof UpgradeStatusEmail> = {
  title: 'Email/UpgradeStatus',
  component: UpgradeStatusEmail,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    status: {
      control: { type: 'radio' },
      options: ['started', 'complete', 'failed', 'short_circuit'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof UpgradeStatusEmail>;

export const Started: Story = {
  args: {
    status: 'started',
    name: 'Upgrade GPT model',
    description: 'Migrating from gpt-4 to gpt-4o',
    credits: 500,
    linkUrl: 'https://app.bitcode.ai/executions?type=pipeline:upgrades&runId=42',
  },
  render: createEmailStory(UpgradeStatusEmail),
};

export const Complete: Story = {
  args: {
    ...Started.args,
    status: 'complete',
  },
  render: createEmailStory(UpgradeStatusEmail),
};

export const Failed: Story = {
  args: {
    ...Started.args,
    status: 'failed',
  },
  render: createEmailStory(UpgradeStatusEmail),
};

export const Cancelled: Story = {
  args: {
    ...Started.args,
    status: 'short_circuit',
  },
  render: createEmailStory(UpgradeStatusEmail),
};
