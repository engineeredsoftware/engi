import type { Meta, StoryObj } from '@storybook/react';
import MultiAgentsIcon from '@/components/base/engi/multi-agents-icon';

const meta = {
  title: 'UI/MultiAgentsIcon',
  component: MultiAgentsIcon,
  tags: ['autodocs'],
  argTypes: {
    strokeWidth: { control: 'number' },
    className: { control: 'text' },
  },
  parameters: { layout: 'centered' },
} satisfies Meta<typeof MultiAgentsIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    strokeWidth: 1,
    className: 'w-6 h-6',
  },
};

export const Thick: Story = {
  args: {
    strokeWidth: 3,
    className: 'w-6 h-6',
  },
};

export const Large: Story = {
  args: {
    strokeWidth: 1,
    className: 'w-12 h-12',
  },
};
