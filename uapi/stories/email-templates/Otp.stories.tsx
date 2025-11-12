import type { Meta, StoryObj } from '@storybook/react';
import { OtpEmail } from '@engi/email-templates';
import { createEmailStory } from './_helpers';

const meta: Meta<typeof OtpEmail> = {
  title: 'Email/Otp',
  component: OtpEmail,
  parameters: { layout: 'fullscreen' },
};

export default meta;

type Story = StoryObj<typeof OtpEmail>;

export const Default: Story = {
  args: {
    code: '123456',
    firstName: 'Ada',
  },
  render: createEmailStory(OtpEmail),
};
