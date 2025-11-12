import type { Meta, StoryObj } from '@storybook/react';
import Steps from '@/app/(root)/components/steps';

const meta: Meta<typeof Steps> = {
  title: 'Components/Steps',
  component: Steps,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Steps>;

export const Default: Story = {};