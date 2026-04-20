import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import ExecutionTaskInput from '@/components/base/bitcode/execution/ExecutionTaskInput';

const meta = {
  title: 'Kitchen-Sink/ExecutionTaskInput',
  component: ExecutionTaskInput,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
  },
  argTypes: {
    isProcessing: { control: 'boolean' },
    task: { control: 'text' },
    placeholder: { control: 'text' },
  },
  args: {
    isProcessing: false,
    task: '',
    placeholder: 'Definition of Done…',
  },
} satisfies Meta<typeof ExecutionTaskInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => {
    const [value, setValue] = React.useState(args.task);
    return (
      <ExecutionTaskInput
        {...args}
        task={value}
        onChange={setValue}
        attachments={[]}
      />
    );
  },
};
